import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';

@Component({
  selector: 'app-update-application-status',
  templateUrl: './update-application-status.component.html',
  styleUrls: ['./update-application-status.component.css']
})
export class UpdateApplicationStatusComponent implements OnInit {

  ApplicationStatusList: Array<any> = [];
  applicationStatusUpdateForm: FormGroup;
  applicationDetails:any;
  detailShowBoolean:boolean = false;
  applicationStatusId:any;
  userToken:any;
  submitButtonDisableBoolean:boolean = false;
  userDataAll:any

  constructor(
    private spinnerService: SpinnerService,
    private url: GenerateUrl,
    private http: HttpClient,
    private fb: FormBuilder,
    private consumerApplicationService: ConsumerApplicationService,
    private notificationService: NotificationService,
  ) { 
    let token = sessionStorage.getItem('consumertoken');
    this.userToken = token;

    let abc = sessionStorage.getItem('accessLeveOfUser');
        let xyz = JSON.parse(abc);
        console.log(xyz, "xxxxxxxxxxxxxyyyyyyyyyyyyyyyzzzzzzzzzzzzzz///////////////////");
        this.userDataAll = xyz;
        console.log(this.userDataAll,"this.userDataAll.......");
        
  }

  ngOnInit(): void {
    this.getApplicationStatus();
    this.buildForm();
  }

  buildForm() {
    this.applicationStatusUpdateForm = this.fb.group({
      applicationNumber:["",Validators.required],
      applicationStatus: ["", Validators.required],
      remark:["",Validators.required]
    })
  }

  onGetDetails() {
    this.consumerApplicationService.getConsumerApplicationDetailsByApplicationNumber(this.applicationStatusUpdateForm.value.applicationNumber).subscribe((resp: any) => {
      console.log(resp, "resp...........................................");
      if(resp?.code=="200"){
         this.notificationService.success("Data Retreive Successfully...");
         this.applicationDetails = resp?.list[0];
         this.detailShowBoolean = true;

         if(this.applicationStatusUpdateForm.valid){
          this.submitButtonDisableBoolean = true;
        }

      }else{
         this.notificationService.warn(resp?.message);
         this.detailShowBoolean = false;
         return
      }

    })

    

  }

  getApplicationStatus() {
    this.consumerApplicationService.getAll_Application_Status().subscribe(
      (res) => {
        console.log(res, "resssssssssssssssssssssssssss");
        if (res?.code == "200") {
          this.notificationService.success("Data Retrieve Successfully !")
          console.log(
            res.list,
            "lllllllllllllllllllllllllllllllllllllllllllllllllll"
          );
         // this.ApplicationStatusList = res.list

          this.ApplicationStatusList = res.list.filter((y:any)=>{
           return (y.applicationStatusId==6 || y.applicationStatusId==7 || y.applicationStatusId==9)
          })
        } else {
          this.notificationService.warn(res?.message);
          return
        }

      },
      (error) => { }
    );
  }

  onStatusSelection(e:any){
    console.log(e,"eeeeeeeeeeeeeee.....................");
    this.applicationStatusId = e;
    this.applicationStatusId

    if(this.applicationStatusUpdateForm.valid){
      this.submitButtonDisableBoolean = true;
    }
  }

  changeConsumerApplicationStatus() {

    // consumerApplicationNo	 :   SV202307016
    // applicationStatusNo		 :      6
    // userAdminId				 :    112233
    // adminRemark				 :  revert application

    let formData:FormData = new FormData();
    formData.append("consumerApplicationNo",this.applicationDetails?.consumerApplicationNo);
    formData.append("applicationStatusNo",this.applicationStatusId);
    formData.append("userAdminId",this.userDataAll?.userId);
    formData.append("adminRemark",this.applicationStatusUpdateForm.value.remark);


    this.consumerApplicationService.changeStatusOfConsumerApplicationByAdmin(formData).subscribe((data: any) => {
        console.log(data, "changeConsumerApplicationStatus.......................................");
        if (data?.code == "204") {
           this.onGetDetails();
            this.notificationService.success(data?.message);
           // location.reload();
           this.submitButtonDisableBoolean = false;
        } else {
          this.submitButtonDisableBoolean = true;
            this.notificationService.warn(data?.message);
            return
        }
    })
}


}
