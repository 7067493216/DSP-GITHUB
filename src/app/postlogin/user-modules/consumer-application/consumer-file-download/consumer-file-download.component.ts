import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';

@Component({
  selector: 'app-consumer-file-download',
  templateUrl: './consumer-file-download.component.html',
  styleUrls: ['./consumer-file-download.component.css']
})
export class ConsumerFileDownloadComponent implements OnInit {
  applicationDocumentData:any;
  userApplicationUrl: string = this.url.userApplicationUrl;
  userSurveyUrl: string = this.url.userSurveyUrl;
  userDemandUrl: string = this.url.userDemandUrl;
  mastersUrl: string = this.url.mastersUrl;

  constructor(
    private spinnerService: SpinnerService,
    private url: GenerateUrl,
    private http: HttpClient,
    private consumerApplicationService: ConsumerApplicationService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConsumerFileDownloadComponent>,
  ) {
    console.log(data, "datattat....................");

  }

  async ngOnInit() {

    //  this.consumerApplicationService.getNewApplicationById(this.data.consumerApplicationId).subscribe((res:any)=>{
    //   console.log(res,"rrrrrrrrrrrrrrrreeeeeeeeeeessssssssssssssssssss//////////////////////");
    //    this.applicationDocumentData = res.list[0];
    //    console.log( this.applicationDocumentData.consumerApplicationId,"jjjjjjjjjjjjjjoooooooooooooooo");
    //   //  if(res.code == "200"){
    //   //   this.consumerApplicationService.getAllApplicationDocumentFile(this.applicationDocumentData.consumerApplicationId).subscribe((response:any)=>{
    //   //     console.log(response,"response.ppppp...iiiii");
          
    //   //    })
    //   //  }
    //  });

   //  console.log( this.applicationDocumentData,"jjjjjjjjjjjjjj");
     
     let applicationDocumentData = await this.http.get(this.mastersUrl + '/getAllApplicationDocument/' + this.data.consumerApplicationId).toPromise();
    //  console.log('applicationDocumentData', applicationDocumentData);
     if (applicationDocumentData['code'] == "200") {
         this.applicationDocumentData = applicationDocumentData['list'][0];
         console.log('applicationDocumentData:>-  !!!', applicationDocumentData);
     }

    
  }


 /////////////  Administrative file download ********************************////////************************ Start ***//////////////
getDownloaddocAdministrativeFile(){
  let filePathWithBackslashes = this.applicationDocumentData.docAdministrative.documentPath;
  let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
  // console.log(filePathWithForwardSlashes);
  // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
  window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }
  /////////////  Administrative file download ********************************////////************************ end ***//////////////
  
  
  //////////////// Estimate file Download *********************************//////////////////*********start************************ */
  getDownloaddocEstimateFile(){
      let filePathWithBackslashes = this.applicationDocumentData.docEstimate.documentPath;
      let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
     window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }
  //////////////// Estimate file Download *********************************//////////////////*************end************************ */
  
  /////////////  Noc file download ********************************////////************************ end ***//////////////
  getDownloaddocNocFile(){
      let filePathWithBackslashes = this.applicationDocumentData.docNoc.documentPath;
      let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
      // console.log(filePathWithForwardSlashes);
      // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
      window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }
  /////////////  Noc file download ********************************////////************************ end ***//////////////
  
  
  /////////////  Registry file download ********************************////////************************ end ***//////////////
  getDownloaddocRegistryFile(){
      let filePathWithBackslashes = this.applicationDocumentData.docRegistry.documentPath;
      let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
      // console.log(filePathWithForwardSlashes);
      // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
      window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }
  /////////////  Registry file download ********************************////////************************ end ***//////////////
  
  /////////////  ReraPermission file download ********************************////////************************ end ***//////////////
  getDownloaddocReraPermissionFile(){
      let filePathWithBackslashes = this.applicationDocumentData.docReraPermission.documentPath;
      let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
      // console.log(filePathWithForwardSlashes);
      // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
      window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }
  /////////////  ReraPermission file download ********************************////////************************ end ***//////////////
  
  /////////////  docT$cpPermission file download ********************************////////************************ end ***//////////////
  getDownloaddocT$cpPermissionFile(){
      let filePathWithBackslashes = this.applicationDocumentData.docT$cpPermission.documentPath;
      let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
      // console.log(filePathWithForwardSlashes);
      // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
      window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }
  /////////////  docT$cpPermission file download ********************************////////************************ end ***//////////////
  
  /////////////  docKhasraKhatoni file download ********************************////////************************ end ***//////////////
  getDownloaddocKhasraKhatoniFile(){
      let filePathWithBackslashes = this.applicationDocumentData.docKhasraKhatoni.documentPath;
      let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
      // console.log(filePathWithForwardSlashes);
      // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
      window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }
  /////////////  docKhasraKhatoni file download ********************************////////************************ end ***//////////////
  

   ////////////////////////////////  gstFile ///////////////////////////////////////////////////////////////////////////////////////////
   getDownloaddocGstFile(){
    let filePathWithBackslashes = this.applicationDocumentData.docGst.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    // console.log(filePathWithForwardSlashes);
    // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }
  ////////////////////////////////  gstFile ///////////////////////////////////////////////////////////////////////////////////////////



  onClose() {
    this.dialogRef.close();
  }

}
