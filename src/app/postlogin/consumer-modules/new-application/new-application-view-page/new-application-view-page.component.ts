import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { NewApplicationService } from '../../services/new-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-new-application-view-page',
  templateUrl: './new-application-view-page.component.html',
  styleUrls: ['./new-application-view-page.component.css']
})
export class NewApplicationViewPageComponent implements OnInit {
  consumerApplicationDetail: any;
  ngbPunchingDetails: any;
  complainList: any;
  feedbackList: any;
  supplyVoltageString: string = '';
  supplyVolageName: Array<any> = [];
  consumerSurveyData: any
  consumerDemandData: any
  geoLocationData: any
  applicationDocumentData: any
  maskAadhaarNo: string = null;
  paymentView: any;
  unsubscribe$: Subject<void> = new Subject();
  @ViewChild('componentView', { static: false }) pdfTable: ElementRef;
  @ViewChild('componentView') htmlData!: ElementRef;
  headingBoolean: boolean = false;
  token: any

  constructor(
    private spinnerService: SpinnerService,
    private url: GenerateUrl,
    private http: HttpClient,
    private newApplicationService: NewApplicationService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewApplicationViewPageComponent>,
  ) {

    this.consumerApplicationDetail = this.data.row;
    console.log(this.consumerApplicationDetail, "consumerApplicationDetail...........................");
    this.token = sessionStorage.getItem("consumertoken");
  }


  onClose() {
    this.dialogRef.close();
  }


  consumerApplicationDetails() {
    this.newApplicationService.getNewApplicationById(this.data.row.consumerApplicationId).subscribe((response: any) => {
      console.log(response, "response...........................................");
      return
      if (response.code == "200") {
        this.consumerApplicationDetail = response.list[0][0]
      }
    })
  }

  getConnectionPradaaiDetailsForNgb() {
    this.newApplicationService.getFinalConnectionPradaaiDetailsForApplicationView(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data: any) => {
      console.log(data, "dddaaaaaaatttttttttaaaaaaaaaaaa.....................................................");
      if (data.code == "200") {
        this.ngbPunchingDetails = data.list[0];
      }

    })
  }

  getAllComplainOfConsumer() {
    this.newApplicationService.getAllComplainByConsumerAndUser(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((resp: any) => {
      if (resp.code == "200") {
        this.complainList = resp.list;
      } else {
        // return
      }
    })
  }

  getAllFeedbackOfConsumer() {
    this.newApplicationService.getAllApplicantFeedback(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((res: any) => {
      if (res.code == "201") {
        this.feedbackList = res.list;
      }
    }, (error: any) => {
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
    this.newApplicationService.getPaymentDetailsDuringView(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data: any) => {
      console.log(data, "rrrrrrrrrrrrrrrrrrrrrrrrrrrr*********************rrrrrrrrrrrrrrrrrrrrrrrrrr");
      if (data.code == "200") {
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
        console.log(this.paymentView, " this.paymentView...............");

      } else {
        return
      }
    })
  }

  getConsumerSurveyData() {
    this.newApplicationService.getConsumerSurveyData(this.consumerApplicationDetail?.consumerApplicationId).subscribe((consumerSurveyData: any) => {
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
    this.newApplicationService.getConsumerDemandData(this.consumerApplicationDetail?.consumerApplicationId).subscribe((consumerDemandData: any) => {
      if (consumerDemandData['code'] == "200") {
        this.consumerDemandData = consumerDemandData['list'][0];
      }
    })
  }

  getGeoLocationData() {
    this.newApplicationService.getGeoLocationData(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((geoLocationData: any) => {
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
    this.newApplicationService.getApplicationDocumentData(this.consumerApplicationDetail.consumerApplicationId).subscribe((applicationDocumentData: any) => {
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


  //  getDownloaddocEstimateFile() {    // getDownloaddocEnergyBillFile()  docEnergyBillFile  documentPath
  //   let filePathWithBackslashes = this.applicationDocumentData.docEnergyBillFile.documentPath;
  //   let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
  //   // console.log(filePathWithForwardSlashes);
  //   // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
  //   window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  // }

  ////////////////////////////////////////energy Bill File   ///////////////////////////////////////////////


  //////////////////////////// group file end ///////////////////////////////////////////////////



  getFile(uploadId) {

    console.log("upload Id: " + uploadId);

    this.newApplicationService.getFile(uploadId).pipe(takeUntil(this.unsubscribe$)).subscribe(
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





  downloadPDF() {
    const options = {
      margin: 0.5,
      filename: 'Consumer-Application-Details.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const content = this.htmlData.nativeElement;

    html2pdf()
      .set(options)
      .from(content)
      .save();
  }






}
