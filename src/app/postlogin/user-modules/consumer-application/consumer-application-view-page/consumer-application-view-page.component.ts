import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as html2pdf from 'html2pdf.js';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-consumer-application-view-page',
  templateUrl: './consumer-application-view-page.component.html',
  styleUrls: ['./consumer-application-view-page.component.css']
})
export class ConsumerApplicationViewPageComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  consumerApplicationDetail: any;
  supplyVoltageString: string = '';
  supplyVolageName: Array<any> = [];
  consumerSurveyData: any
  consumerDemandData: any
  geoLocationData: any
  applicationDocumentData: any
  maskAadhaarNo: string = null;
  paymentView: any;
  headingBoolean: boolean = false;
  // @ViewChild('componentView', { static: true }) componentView: ElementRef;
  ngbPunchingDetails: any;
  complainList:any;
  feedbackList:any;
  token:any

  constructor(
    private spinnerService: SpinnerService,
    private url: GenerateUrl,
    private http: HttpClient,
    private consumerApplicationService: ConsumerApplicationService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConsumerApplicationViewPageComponent>,
    private pdfService: PdfService
  ) {
    console.log(this.data.row, "ttttttttttttyyyyyyyyyyuuuuuuuuuuu");
    // this.consumerApplicationDetails();
    this.consumerApplicationDetail = this.data.row
    this.token = sessionStorage.getItem("usertoken");
  }

  consumerApplicationDetails() {
    this.consumerApplicationService.getNewApplicationById(this.data.row.consumerApplicationId).subscribe((response: any) => {
      console.log(response, "response...........................................");
      if (response.code == "200") {
        this.consumerApplicationDetail = response.list[0][0]
      }
    })
  }

  getConnectionPradaaiDetailsForNgb() {
    this.consumerApplicationService.getFinalConnectionPradaaiDetailsForApplicationView(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data: any) => {
      console.log(data, "dddaaaaaaatttttttttaaaaaaaaaaaa.....................................................");
      if (data.code == "200") {
        this.ngbPunchingDetails = data.list[0];
      }

    })
  }

  getAllComplainOfConsumer(){
    this.consumerApplicationService.getAllComplainByConsumerAndUser(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((resp:any)=>{
      if(resp.code=="200"){
        this.complainList = resp.list;
      }else{
       // return
      }
    })
  }

  getAllFeedbackOfConsumer(){
    this.consumerApplicationService.getAllApplicantFeedback(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((res:any)=>{
if(res.code=="201"){
  this.feedbackList = res.list;
}
    },(error:any)=>{
      this.notificationService.error(error);
      //return
    }
  )
  }

  ngOnInit(): void {

    if (this.consumerApplicationDetail?.natureOfWorkTypeId == 8 && this.consumerApplicationDetail?.applicationStatusId == 33) {
      this.getConnectionPradaaiDetailsForNgb();
    }

    if (this.consumerApplicationDetail != undefined || this.consumerApplicationDetail != null) {
      console.log('**********************************************', this.consumerApplicationDetail) //this.consumerApplicationDetail.consumers.consumerLoginId
      if (this.consumerApplicationDetail.dtr !== null) {
        this.supplyVolageName.push("DTR");
      }
      if (this.consumerApplicationDetail.ptr !== null) {
        this.supplyVolageName.push("PTR");
      }
      if (this.consumerApplicationDetail.lt !== null) {
        this.supplyVolageName.push("LT");
      }
      if (this.consumerApplicationDetail.ht11Kv !== null) {
        this.supplyVolageName.push("HT 11 KV");
      }
      if (this.consumerApplicationDetail.ht33Kv !== null) {
        this.supplyVolageName.push("ht33Kv");
      }
      if (this.consumerApplicationDetail.ht132Kv !== null) {
        this.supplyVolageName.push("HT 132 KV");
      }
      console.log(this.supplyVolageName);
      for (let i = 0; i < this.supplyVolageName.length; i++) {
        this.supplyVoltageString += this.supplyVolageName[i] + " , ";
      }
      this.supplyVoltageString = this.supplyVoltageString.slice(0, -1);

      this.supplyVoltageString = this.supplyVoltageString.substring(0, this.supplyVoltageString.length - 1);
      console.log('supply voltage String:::::::::-', this.supplyVoltageString);
    }


    this.getConsumerSurveyData();
    // this.getConsumerDemandData();
    this.getGeoLocationData();
    if (this.consumerApplicationDetail?.natureOfWorkTypeId != 8) {
      this.getApplicationDocumentData();
    } else {

    }
    this.getPymentView()
    // this.getResponse();

    this.getAllComplainOfConsumer();
    this.getAllFeedbackOfConsumer();

  };



  // getResponse(){
  //   let abc = 2024030506148
  //   this.http.get("http://isampark.mpcz.in/statusEscSearchByComp.aspx?comp="+abc).subscribe((data:any)=>{
  //     console.log(data,"response......sssoouurraabbhh  ssirrrrr");

  //   },(error:any)=>{
  //     console.log(error,"sssooouurraabbbhh  sssiir r  errrroorr");

  //   }
  //   )
  // }

  formatDate(inputDate) {
    const date = new Date(inputDate);

    // Get year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');

    // Create the formatted date string
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }
  //const formattedDateString = formatDate(inputDateString);
  formatDateNew(inputDate) {
    const date = new Date(inputDate);

    // Get day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    // Create the formatted date string
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  }


  getPymentView() {
    this.consumerApplicationService.getPaymentDetailsDuringView(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data: any) => {
      console.log(data, "rrrrrrrrrrrrrrrrrrrrrrrrrrrr*********************rrrrrrrrrrrrrrrrrrrrrrrrrr");
      if (data.code == "200") {
        // const formattedDateStringRegistration = this.formatDate(data.list[0][0].DATE_OF_REGISTRATION)
        // console.log(formattedDateStringRegistration, "formattedDateStringRegistration................");

        // const formattedDateStringNewRegistration = this.formatDateNew(formattedDateStringRegistration);
        // console.log(formattedDateStringNewRegistration, "formattedDateStringNewRegistration.....................");

        // data.list[0][0].DATE_OF_REGISTRATION = formattedDateStringNewRegistration;

        // // Demand
        // const formattedDateStringDeemand = this.formatDate(data.list[0][0].DATE_OF_SUPERVISION_PAYMENT)
        // console.log(formattedDateStringDeemand, "formattedDateStringDeemand................");

        // const formattedDateStringNewDeemand = this.formatDateNew(formattedDateStringDeemand);
        // console.log(formattedDateStringNewDeemand, "formattedDateStringNewDeemand.....................");

        // data.list[0][0].DATE_OF_SUPERVISION_PAYMENT = formattedDateStringNewDeemand;

         if (data.list[0][0].DATE_OF_REGISTRATION != null) {
          const formattedDateStringRegistration = this.formatDate(data.list[0][0].DATE_OF_REGISTRATION)
          console.log(formattedDateStringRegistration, "formattedDateStringRegistration................");

          const formattedDateStringNewRegistration = this.formatDateNew(formattedDateStringRegistration);
          console.log(formattedDateStringNewRegistration, "formattedDateStringNewRegistration.....................");

          data.list[0][0].DATE_OF_REGISTRATION = formattedDateStringNewRegistration;
        }


        // Demand
        if (data.list[0][0].DATE_OF_SUPERVISION_PAYMENT != null) {
          const formattedDateStringDeemand = this.formatDate(data.list[0][0].DATE_OF_SUPERVISION_PAYMENT)
          console.log(formattedDateStringDeemand, "formattedDateStringDeemand................");

          const formattedDateStringNewDeemand = this.formatDateNew(formattedDateStringDeemand);
          console.log(formattedDateStringNewDeemand, "formattedDateStringNewDeemand.....................");

          data.list[0][0].DATE_OF_SUPERVISION_PAYMENT = formattedDateStringNewDeemand;
        }

        this.paymentView = data.list[0][0]
      } else {
        return
      }
    })
  }

  getConsumerSurveyData() {
    this.consumerApplicationService.getConsumerSurveyData(this.consumerApplicationDetail?.consumerApplicationId).subscribe((consumerSurveyData: any) => {
      console.log(consumerSurveyData, "consumerSurveyData.........................");

      if (consumerSurveyData['code'] == "200") {
        this.consumerSurveyData = consumerSurveyData['list'][0];
      } else {
        this.consumerSurveyData = null
        return
      }


    })
    console.log(this.consumerSurveyData, "consumerSurveyData??????????????????????????????");
  }

  getConsumerDemandData() {
    this.consumerApplicationService.getConsumerDemandData(this.consumerApplicationDetail?.consumerApplicationId).subscribe((consumerDemandData: any) => {
      if (consumerDemandData['code'] == "200") {
        this.consumerDemandData = consumerDemandData['list'][0];
      }
    })
  }

  getGeoLocationData() {
    this.consumerApplicationService.getGeoLocationData(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((geoLocationData: any) => {
      console.log('geoLocationData', geoLocationData);
      if (geoLocationData['code'] == "200") {
        this.geoLocationData = geoLocationData['list'][0];
      } else {
        this.geoLocationData = null
        return
      }

    })
    console.log('geoLocationData////////////////////////////////////', this.geoLocationData);
  }

  getApplicationDocumentData() {
    this.consumerApplicationService.getApplicationDocumentData(this.consumerApplicationDetail.consumerApplicationId).subscribe((applicationDocumentData: any) => {
      console.log('applicationDocumentData', applicationDocumentData);
      if (applicationDocumentData['code'] == "200") {
        this.applicationDocumentData = applicationDocumentData['list'][0];
        console.log('applicationDocumentData:>-  !!!', applicationDocumentData);


      } else {
        this.applicationDocumentData = null;
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
    // window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + 'anonymousUser_AADHAR_CARD_1671019924859')
    // anonymousUser_AADHAR_CARD_1671019924859
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
    // window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
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

  ////////////////////////////////  gstFile ///////////////////////////////////////////////////////////////////////////////////////////
  getDownloaddocGstFile() {
    let filePathWithBackslashes = this.applicationDocumentData.docGst.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    // console.log(filePathWithForwardSlashes);
    // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }
  ////////////////////////////////  gstFile ///////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////// group file //////////////////////////////////////////////
  getDownloaddocGroupFile() {
    let filePathWithBackslashes = this.applicationDocumentData.docGroup.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    // console.log(filePathWithForwardSlashes);
    // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }

  ////////////////////////////////////// group file //////////////////////////////////////////////////////////////////

  ///////////////////////////////////////energyBill file /////////////////////////////////////////////////////////

  getDownloaddocEnergyBillFile() {    // getDownloaddocEnergyBillFile()  docEnergyBillFile  documentPath
    let filePathWithBackslashes = this.applicationDocumentData.docEnergyBillFile.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    // console.log(filePathWithForwardSlashes);
    // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }

  ////////////////////////////////////////energy Bill File   ///////////////////////////////////////////////

  getDownloaddocLoadSheetFile(){
 let filePathWithBackslashes = this.applicationDocumentData?.docLoadSheet?.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    // console.log(filePathWithForwardSlashes);
    // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }

  getDownloaddocMapFile(){
 let filePathWithBackslashes = this.applicationDocumentData?.docMap?.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    // console.log(filePathWithForwardSlashes);
    // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }

  //////////////////////////// group file end ///////////////////////////////////////////////////



  getFile(uploadId) {

    console.log("upload Id: " + uploadId);

    this.consumerApplicationService.getFile(uploadId).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (file: HttpResponse<Blob>) => {
        this.downloadFile(file);
      }
    );

  }

  downloadFile(file) {
    if (file.body.size > 3) {
      window.location.href = file.url
    } else {
      this.notificationService.warn('No data available')
    }
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  filedMaskFormat() {

    console.log("maskFormat call !!!");
    // let aadhaarNo = String(646799434921);

    let aadhaarNo = this.consumerApplicationDetail.consumers.aadharNo;
    let sliced = aadhaarNo?.slice(-4);
    // let sliced = aadhaarNo.slice(-4);
    this.maskAadhaarNo = String(sliced).padStart(aadhaarNo?.length, "*")
    console.log('maskAadhaarNo :- ', this.maskAadhaarNo);
    return this.maskAadhaarNo;
  }

  // downloadHtmlView() {

  //   // const htmlContent = this.componentView.nativeElement.innerHTML;
  //   // const blob = new Blob([htmlContent], { type: 'text/html' });
  //   // const url = URL.createObjectURL(blob);
  //   // const a = document.createElement('a');
  //   // a.href = url;
  //   // a.download = 'componentView.html';
  //   // a.click();
  //   // URL.revokeObjectURL(url);






  //   const content = this.componentView.nativeElement;

  //   const options = {
  //     margin: 10,
  //     filename: 'Application-Details.pdf',
  //     image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  //   };

  //   html2pdf().from(content).set(options).outputPdf(pdf => {
  //     // You can save the PDF or trigger a download
  //     pdf.save();
  //   });
  // }

  // downloadPdf(): void {
  //   this.headingBoolean = true;
  //   // this.pdfService.generatePdf('elementIdToCapture', 'your-filename');
  //   // this.headingBoolean = false;
  //   setTimeout(() => {
  //     this.pdfService.generatePdf('elementIdToCapture', 'Application-Details.pdf');                 // <<<---using ()=> syntax
  //     this.headingBoolean = false;
  //   }, 1000);

  // }

  onClose() {
    this.dialogRef.close();
  }



}
