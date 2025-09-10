import { Component, Inject, OnInit } from '@angular/core';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicationRejectionHandOverToGm } from '../../models/RejectionPerposalHandoverToGmModel';
import { GenerateUrl } from 'src/environments/generate-url.model';
// import { ApplicationRejectionHandOverToGm } from '../../models/RejectionPerposalHandoverToGmModel';

@Component({
  selector: 'app-application-rejection-handover-to-gm',
  templateUrl: './application-rejection-handover-to-gm.component.html',
  styleUrls: ['./application-rejection-handover-to-gm.component.css']
})
export class ApplicationRejectionHandoverToGMComponent implements OnInit {
  consumerApplicationDetails: any;
  checkBoxValue: string = '';
  exForm: FormGroup;
  payLoad:ApplicationRejectionHandOverToGm = new ApplicationRejectionHandOverToGm();
  applicationDate: Date;
  // fillDate:boolean = false;
  todayDate:any;
  userName:any;
  downloadFilePath:any;

  constructor(
    private consumerApplicationService: ConsumerApplicationService,
    private notification: NotificationService,
    private fb: FormBuilder,
    private url: GenerateUrl,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ApplicationRejectionHandoverToGMComponent>,
  ) { 
    console.log(data, "data.......................................................................................................");
    let userDetails = JSON.parse(sessionStorage.getItem('accessLeveOfUser'));
    console.log(userDetails?.userName,"ddddddddddd..........................dddddddddddddd");
    this.userName = userDetails?.userName
  }

  ngOnInit(): void {
    const today = new Date();
console.log(today,"today");
const currentDate = today.getDate();
console.log(currentDate,"currentDate");
const currentMonths = today.getMonth() + 1;
console.log(currentMonths,"currentMonths");
const currentYear = today.getFullYear();
console.log(currentYear,"currentYear");



const todayDate = (`${currentYear}-${currentMonths}-${currentDate}`);
console.log(JSON.stringify(todayDate),"todayDate");
this.todayDate=  todayDate;
    
    this.consumerApplicationService.getConsumerApplicationDetailsByConsumerApplicationNumber(this.data.consumerApplicationNo).subscribe((response: any) => {
      console.log(response, "response....response");
      if(response.code == "200"){
        this.consumerApplicationDetails = response.list[0];
        console.log(this.consumerApplicationDetails, "this.consumerApplicationDetailsthis.consumerApplicationDetailsthis.consumerApplicationDetailsthis.consumerApplicationDetails..........");
                    //rejectionProrposalFilePath
                    this.downloadFilePath = this.consumerApplicationDetails.rejectionProrposalFilePath;
      }else{

      }
     
    })
   // this.applicationDate = new Date("1947-08-15");
    this.exForm = this.fb.group({
      acceptRejectField:['',Validators.required],
      remark: ['', Validators.required],
    
    })
  }

  // checkBoxSelection(e: any) {
  //   console.log(e.target.checked, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  //   this.checkBoxValue = e.target.checked;

  // }

  onGMAction(e:any){
    console.log(e,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    this.checkBoxValue = e.value;

  }

  downloadFile(){
if(this.downloadFilePath==null){
this.notification.warn("File not available !");
return
}else{
  let filePathWithBackslashes = this.downloadFilePath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    //    /erp/downloadpdf?path=D:/UploadDocsNew/
}
  
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit(){
    // if (this.checkBoxValue == true) {
      if (this.exForm.invalid) {
        this.notification.warn("Invalid form ! please fill remark first");
        return
      } else {
       
        let formData:FormData = new FormData();
        formData.append('consumerApplicationNumber',this.data.consumerApplicationNo);
        formData.append('rejectedApplicationDate',this.todayDate);
        formData.append('rejectedRemark',this.exForm.value.remark);
        formData.append('rejectApplicationGMName',this.userName);
        formData.append('gmAccepted',this.checkBoxValue)
        console.log(formData,"formData.....");
        
        console.log(this.payLoad,"this.payLoadthis.payLoadthis.payLoad");

         this.consumerApplicationService.rejectionPerposalAcceptOrRejectByGM(formData).subscribe((data:any)=>{
          console.log(data.code,"dattatttatattatatattatat");
          if(data.code == "200"){
            this.notification.success("submitted successfully");
            this.onClose();
          }else{
            this.notification.warn("Something went wrong !")
          }
          
         })
      }
    // } else {
    //   this.notification.error("! Please select checkbox first")
    //   return
    // }
  }



}
