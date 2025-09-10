import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RejectionRequestGenerateModelForJe } from '../../models/rejectionPerposalGenerateModel';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-application-rejection-proposal-by-je',
  templateUrl: './application-rejection-proposal-by-je.component.html',
  styleUrls: ['./application-rejection-proposal-by-je.component.css']
})
export class ApplicationRejectionProposalByJeComponent implements OnInit {

 consumerApplicationDetails: any;
   exForm: FormGroup;
   checkBoxValue:any;
   payLoad: RejectionRequestGenerateModelForJe = new RejectionRequestGenerateModelForJe();
   filechoose:any;
   filechooseBoolean:boolean =false;
   userDetails:any;
   currentRoleOfUser:any
 
   constructor(
     private consumerApplicationService: ConsumerApplicationService,
     private notification: NotificationService,
     private fb: FormBuilder,
     @Inject(MAT_DIALOG_DATA) public data: any,
     public dialogRef: MatDialogRef<ApplicationRejectionProposalByJeComponent>,
   ) {
     console.log(data, "data.......................................................................................................");
 this.userDetails = JSON.parse(sessionStorage.getItem('accessLeveOfUser'));
 console.log(this.userDetails,"this.userDetails..................................");
 this.currentRoleOfUser = JSON.parse(sessionStorage.getItem('currentRoleOfUser'));
 
 
   }
 
   ngOnInit(): void {
     this.consumerApplicationService.getConsumerApplicationDetailsByConsumerApplicationNumber(this.data.consumerApplicationNo).subscribe((response: any) => {
       console.log(response, "response....response");
       this.consumerApplicationDetails = response.list[0];
       console.log(this.consumerApplicationDetails, "this.consumerApplicationDetailsthis.consumerApplicationDetailsthis.consumerApplicationDetailsthis.consumerApplicationDetails..........");
 
     })
 
     this.exForm = this.fb.group({
       remark: ['', Validators.required]
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

            // String consumerApplicationNumber, 
            // String rejectionProposal,
            //  String rejectionRemark, 
            // MultipartFile docRejectProposal, 
            // String userid, 
            // String userName,
            //  String role


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

}
