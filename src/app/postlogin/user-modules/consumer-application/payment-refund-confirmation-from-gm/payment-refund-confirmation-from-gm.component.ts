import { Component, Inject, OnInit } from '@angular/core';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GenerateUrl } from 'src/environments/generate-url.model';

@Component({
  selector: 'app-payment-refund-confirmation-from-gm',
  templateUrl: './payment-refund-confirmation-from-gm.component.html',
  styleUrls: ['./payment-refund-confirmation-from-gm.component.css']
})
export class PaymentRefundConfirmationFromGmComponent implements OnInit {
  token: any;
  refundPaymentDetails: any;
  gmConfirmationForm: FormGroup;
  userName:any;
  applicationDocumentData:any

  constructor(
    private consumerApplicationService: ConsumerApplicationService,
    private notification: NotificationService,
    private fb: FormBuilder,
    private url: GenerateUrl,
    public dialogRef: MatDialogRef<PaymentRefundConfirmationFromGmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.token = sessionStorage.getItem('usertoken');
    console.log(this.token, "token......");
    this.userName = sessionStorage.getItem("currentUserName");
    console.log(this.userName,"userName..........");
    

    console.log(this.data, "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");

  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getRefundDetails();
    this.buildForm();
    this.getApplicationDocumentData();
  }


  buildForm() {
    this.gmConfirmationForm = this.fb.group({
      consumerApplicationNumber: [this.data.row.consumerApplicationNo, Validators.required],
      refundApplicationDate: ["", Validators.required],
      refundRemark: ["", Validators.required],
      refundApplicationGMName: [this.userName, Validators.required],
      gmRefundAccepted: ["", Validators.required]
    })
  }


  getRefundDetails() {
    this.consumerApplicationService.getPaymentRefundConfirmationDetailsAtGm(this.data.row.consumerApplicationNo, this.token).subscribe((response: any) => {
      console.log(response, "response....................................................");
      if (response.code == "200") {
        this.notification.success(response.message);
        this.refundPaymentDetails = response.list[0];
      }
      // this.refundPaymentDetails = 
    })

    // getPaymentRefundConfirmationDetailsAtGm(consumerApplicationNo:any,token:any)
  }


  onSubmit() {

    if(this.gmConfirmationForm.invalid){
      this.notification.warn("Invalid Form !");
      return;
    }
    
    let formData: FormData = new FormData();
    formData.append("consumerApplicationNumber", this.gmConfirmationForm.value.consumerApplicationNumber);
    formData.append("refundApplicationDate", this.gmConfirmationForm.value.refundApplicationDate);
    formData.append("refundRemark", this.gmConfirmationForm.value.refundRemark);
    formData.append("refundApplicationGMName", this.gmConfirmationForm.value.refundApplicationGMName);
    formData.append("gmRefundAccepted", this.gmConfirmationForm.value.gmRefundAccepted);

    console.log(formData,"formData.....................................");
    

    this.consumerApplicationService.confirmPaymentRefundByGM(formData, this.token).subscribe((resp: any) => {
      console.log(resp, ".......rreeesssppppp");
      if(resp?.code=="200"){
        this.notification.success(resp?.message);
        this.onClose();
      }
    })
  }


  onDownloadRefundLetter(){
   
      let filePathWithBackslashes = this.applicationDocumentData.docRefundLetterFile.documentPath;
      let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
      // console.log(filePathWithForwardSlashes);
      // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
      window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
    
  }


  onDownloadCheckbook(){
   
      let filePathWithBackslashes = this.applicationDocumentData.docCheckOrPassBookFile.documentPath;
      let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
      // console.log(filePathWithForwardSlashes);
      // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
      window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
    
  }

  getApplicationDocumentData() {
    this.consumerApplicationService.getApplicationDocumentData(this.data.row.consumerApplicationId).subscribe((applicationDocumentData: any) => {
      console.log('applicationDocumentData', applicationDocumentData);
      if (applicationDocumentData['code'] == "200") {
        this.applicationDocumentData = applicationDocumentData['list'][0];
        console.log('applicationDocumentData:>-  !!!', applicationDocumentData);
      } else {
        this.applicationDocumentData = null;
      }
    })
  }
}
