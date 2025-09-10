import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { ConsumerApplicationService } from '../../../services/consumer-application.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.css']
})
export class FileDownloadComponent implements OnInit {
  applicationDocumentData:any
  applicationId:any

  constructor(
     @Inject(MAT_DIALOG_DATA) public data: any,
        private notificationService: NotificationService,
        public dialogRef: MatDialogRef<FileDownloadComponent>,
        private spinnerService: SpinnerService,
        private fb: FormBuilder,
        private consumerApplicationService: ConsumerApplicationService,
         private url: GenerateUrl,
            private http: HttpClient,
  ) {
    console.log(this.data,"dddddddddaaaaaatttttttttttaaaaaaa........................");
    this.applicationId = this.data.row.applicationId;
   }

onClose() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getApplicationDocumentData(this.applicationId);
  }

   getApplicationDocumentData(consumerApplicationId:any) {
    this.consumerApplicationService.getApplicationDocumentData(consumerApplicationId).subscribe((applicationDocumentData: any) => {
      console.log('applicationDocumentData', applicationDocumentData);
      if (applicationDocumentData['code'] == "200") {
        this.applicationDocumentData = applicationDocumentData['list'][0];
        console.log('applicationDocumentData:>-  !!!', applicationDocumentData);
        
      } else {
        this.applicationDocumentData = null;
      }
    })
  }


  onGatePassDownload(){
let filePathWithBackslashes = this.applicationDocumentData?.getPassfile?.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    // console.log(filePathWithForwardSlashes);
    // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }


  onTrfDownload(){
let filePathWithBackslashes = this.applicationDocumentData?.trffile?.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    // console.log(filePathWithForwardSlashes);
    // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }


   onReportFileDownload(){
let filePathWithBackslashes = this.applicationDocumentData?.testReportFile?.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    // console.log(filePathWithForwardSlashes);
    // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }


}
