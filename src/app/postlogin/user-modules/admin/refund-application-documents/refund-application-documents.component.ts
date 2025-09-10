import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManageUserService } from '../services/manage-user.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { NotificationService } from 'src/app/shared-services/notification.service';

@Component({
  selector: 'app-refund-application-documents',
  templateUrl: './refund-application-documents.component.html',
  styleUrls: ['./refund-application-documents.component.css']
})
export class RefundApplicationDocumentsComponent implements OnInit {

  consumerApplicationId: any
  applicationDocumentData: any;
  consumerApplicationNumber:any;
  bankDetails:any



  constructor(
    private manageUserService: ManageUserService,
    private url: GenerateUrl,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RefundApplicationDocumentsComponent>
  ) {
    console.log(this.data.row, "ddddddddddddddddddd");
    this.consumerApplicationId = this.data.row.CONSUMER_APP_ID;
    this.consumerApplicationNumber = this.data.row.CONSUMER_APPLICATION_NO;
    this.getApplicationDocumentData(this.consumerApplicationId);
  }

  getApplicationDocumentData(consumerAppId: any) {
    this.manageUserService.getApplicationDocumentData(consumerAppId).subscribe((applicationDocumentData: any) => {
      console.log('applicationDocumentData', applicationDocumentData);
      if (applicationDocumentData['code'] == "200") {
        this.applicationDocumentData = applicationDocumentData['list'][0];
        console.log('applicationDocumentData:>-  !!!', applicationDocumentData);
      } else {
        this.applicationDocumentData = null;
      }
    })
  }


   getDownloaddocCheckOrPassBookFileFile() {
    let filePathWithBackslashes = this.applicationDocumentData.docCheckOrPassBookFile.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }

  
  getDownloaddocPanNoFileFile() {
 let filePathWithBackslashes = this.applicationDocumentData.docPanNoFile.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    //  console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }

  getDownloaddocNotryFile() {
 let filePathWithBackslashes = this.applicationDocumentData.docNotry.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    //  console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }

  getDownloaddocAddressProofFileFile() {
 let filePathWithBackslashes = this.applicationDocumentData.docAddressProofFile.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    //  console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }

  getDownloaddocRequestLetterFile() {
 let filePathWithBackslashes = this.applicationDocumentData.docRequestLetter.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    //  console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }

  getDownloaddocGovAuthorizedLetterFileFile() {
 let filePathWithBackslashes = this.applicationDocumentData.docGovAuthorizedLetterFile.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    //  console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }

   getDownloaddocMraFileFile(){
     let filePathWithBackslashes = this.applicationDocumentData.docMraFile.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    //  console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }



  getBankDetails() {
    this.manageUserService.getConsumerAccountDetails(this.consumerApplicationNumber).subscribe((resp: any) => {
      console.log(resp, "resp......................................");
      if (resp?.code == "200") {
        this.notificationService.success(resp?.message);
        this.bankDetails = resp?.list[0];
      } else {
        this.notificationService.warn(resp?.message);
        return
      }

    })
  }

  ngOnInit(): void {
    this.getBankDetails();
  }

  onClose() {
    this.dialogRef.close();
  }




}
