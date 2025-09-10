import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RejectionRequestGenerateModel } from '../../models/rejectionPerposalGenerateModel';
import { GenerateUrl } from 'src/environments/generate-url.model';

@Component({
  selector: 'app-application-rejection-proposal',
  templateUrl: './application-rejection-proposal.component.html',
  styleUrls: ['./application-rejection-proposal.component.css']
})
export class ApplicationRejectionProposalComponent implements OnInit {

  consumerApplicationDetails: any;
  exForm: FormGroup;
  exFormForGm:FormGroup
  checkBoxValue:any;
  payLoad: RejectionRequestGenerateModel = new RejectionRequestGenerateModel();
  filechoose:any;
  filechooseBoolean:boolean =false;
  currentRoleOfUser:any;
  userDetails:any
  todayDate:any;
  downloadFilePath:any

  constructor(
    private consumerApplicationService: ConsumerApplicationService,
    private notification: NotificationService,
    private fb: FormBuilder,
     private url: GenerateUrl,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ApplicationRejectionProposalComponent>,
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('accessLeveOfUser'));
 console.log(this.userDetails,"this.userDetails..................................");
 this.currentRoleOfUser = JSON.parse(sessionStorage.getItem('currentRoleOfUser'));
    console.log(data, "data.......................................................................................................");

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
      this.consumerApplicationDetails = response.list[0];
      console.log(this.consumerApplicationDetails, "this.consumerApplicationDetailsthis.consumerApplicationDetailsthis.consumerApplicationDetailsthis.consumerApplicationDetails..........");
      this.downloadFilePath = this.consumerApplicationDetails.rejectionProrposalFilePath;
    })

    this.exForm = this.fb.group({
      remark: ['', Validators.required]
    })

    this.exFormForGm = this.fb.group({
      acceptRejectField:['',Validators.required],
      remark: ['', Validators.required],
    
    })

  }


  checkBoxSelection(e: any) {
    console.log(e.target.checked, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    this.checkBoxValue = e.target.checked;

  }

  uploadFile(e:any){
    console.log(e.target.files[0], "e.target.files[0] for samagra-id-file");
    this.filechoose = e.target.files[0];
    // this.samagrafileLength = e.target.files.length;

    if(e.target.files[0].type == "application/pdf" && e.target.files[0].size <= 2000000){
      this.filechooseBoolean = false;
    }else{
      this.filechooseBoolean = true;
      this.notification.warn("please choose file 'pdf' type and size must be less than '2MB'")
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {

    if (this.filechoose == undefined ) {
      this.notification.error("! Please select file first");
      return
    }
    if (this.checkBoxValue == true) {
      if (this.exForm.invalid) {
        this.notification.warn("Invalid form ! please fill remark first");
        return
      } else {
        if(this.filechooseBoolean==true){
            this.notification.error(" file must be 'pdf' type and size must be less than '2MB'");
            return;
        }else{
           //payLoad
          let formData:FormData = new FormData();
          formData.append('docRejectProposal',this.filechoose);
          formData.append('consumerApplicationNumber',this.data.consumerApplicationNo);
          formData.append('rejectionProposal', this.checkBoxValue);
          formData.append('rejectionRemark',this.exForm.value.remark);
          formData.append('userid',this.userDetails.userId);
          formData.append('userName',this.userDetails.userName);
          formData.append('role',this.currentRoleOfUser.roleCode);
          console.log(formData,"ssssssssssssssssssss");
          
           this.consumerApplicationService.rejectionPerposalGenerateByDgmOandMorDgmHtm(formData).subscribe((data:any)=>{
            console.log(data,"dattatttatattatatattatat");
            if(data.code == "200"){
              this.notification.success("submitted successfully");
              this.onClose();
            }else{
              this.notification.error('something went wrong !');
            }
            
           })
        }
       

       
      }
    } else {
      this.notification.error("! Please select checkbox first")
      return
    }


  }




  /////////////////////////////////////////////////////////////////

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

onSubmitByGm(){
  // if (this.checkBoxValue == true) {
    if (this.exFormForGm.invalid) {
      this.notification.warn("Invalid form ! please fill remark first");
      return
    } else {
     
      let formData:FormData = new FormData();
      formData.append('consumerApplicationNumber',this.data.consumerApplicationNo);
      formData.append('rejectedApplicationDate',this.todayDate);
      formData.append('rejectedRemark',this.exFormForGm.value.remark);
      formData.append('rejectApplicationGMName',JSON.stringify(this.userDetails.userName));
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
