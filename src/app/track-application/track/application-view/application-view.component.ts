import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { GenerateUrl } from 'src/environments/generate-url.model';

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.css']
})
export class ApplicationViewComponent implements OnInit {
  consumerApplicationDetail:any
  consumerApplicationDetailNew:any
  applicationDocumentData:any
  paymentDetails:any

  constructor(
    private apiService: ApiService,
    private url: GenerateUrl,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ApplicationViewComponent>,
  ) { 

    console.log(this.data.row,"ttttttttttttyyyyyyyyyyuuuuuuuuuuu");
    this.consumerApplicationDetail = this.data.row
  }

  ngOnInit() {
this.consumerApplicationDetails();
this.getAllDocumentPath()
this.getAllPaymentDetails();

  }

  getAllPaymentDetails(){
    let xyz = 'DS1706787200263'
    this.apiService.getAllPaymentDetails(xyz).subscribe((responces: any) => {
      console.log(responces, "responces...........mmmooonnnndddaaayy..................");
      if (responces.code == "200") {
          this.paymentDetails = responces.list[0];
      } else {
      }
  });
  }

  getAllDocumentPath(){
    this.apiService.getAllDocumentPath(this.consumerApplicationDetail?.consumerApplicationId).subscribe((applicationDocumentData:any)=>{
      console.log(applicationDocumentData,"applicationDocumentData....................");
      if (applicationDocumentData['code'] == "200") {
        this.applicationDocumentData = applicationDocumentData['list'][0];
        console.log('applicationDocumentData:>-  !!!', applicationDocumentData);
    } else {
        this.applicationDocumentData = null;
    }
    })
  }

  consumerApplicationDetails(){
    this.apiService.getApplicationDetails(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((response:any)=>{
      console.log(response,"response...........................................");
      if(response.code=="200"){
        this.consumerApplicationDetailNew = response.list[0][0]
      }
    })
  }


   /////////////  Administrative file download ********************************////////************************ Start ***//////////////
   getDownloaddocAdministrativeFile() {
    let filePathWithBackslashes = this.applicationDocumentData.docAdministrative.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    // console.log(filePathWithForwardSlashes);
    // console.log(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
}
/////////////  Administrative file download ********************************////////************************ end ***//////////////


//////////////// Estimate file Download *********************************//////////////////*********start************************ */
getDownloaddocEstimateFile() {
    let filePathWithBackslashes = this.applicationDocumentData.docEstimate.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
}
//////////////// Estimate file Download *********************************//////////////////*************end************************ */

/////////////  Noc file download ********************************////////************************ end ***//////////////
getDownloaddocNocFile() {
    let filePathWithBackslashes = this.applicationDocumentData.docNoc.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    // console.log(filePathWithForwardSlashes);
    // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
}
/////////////  Noc file download ********************************////////************************ end ***//////////////


/////////////  Registry file download ********************************////////************************ end ***//////////////
getDownloaddocRegistryFile() {
    let filePathWithBackslashes = this.applicationDocumentData.docRegistry.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    // console.log(filePathWithForwardSlashes);
    // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
}
/////////////  Registry file download ********************************////////************************ end ***//////////////

/////////////  ReraPermission file download ********************************////////************************ end ***//////////////
getDownloaddocReraPermissionFile() {
    let filePathWithBackslashes = this.applicationDocumentData.docReraPermission.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    // console.log(filePathWithForwardSlashes);
    // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
}
/////////////  ReraPermission file download ********************************////////************************ end ***//////////////

/////////////  docT$cpPermission file download ********************************////////************************ end ***//////////////
getDownloaddocT$cpPermissionFile() {
    let filePathWithBackslashes = this.applicationDocumentData.docT$cpPermission.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    // console.log(filePathWithForwardSlashes);
    // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
}
/////////////  docT$cpPermission file download ********************************////////************************ end ***//////////////

/////////////  docKhasraKhatoni file download ********************************////////************************ end ***//////////////
getDownloaddocKhasraKhatoniFile() {
    let filePathWithBackslashes = this.applicationDocumentData.docKhasraKhatoni.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    // console.log(filePathWithForwardSlashes);
    // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
}
/////////////  docKhasraKhatoni file download ********************************////////************************ end ***//////////////



  onClose() {
    this.dialogRef.close();
}

}
