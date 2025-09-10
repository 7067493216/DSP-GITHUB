import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Inject, OnDestroy, ɵConsole, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { CrudType } from 'src/app/shared-enum/crudType';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';


@Component({
    selector: 'application-demand-approve',
    templateUrl: './application-demand-approve.component.html',
    styleUrls: ['./application-demand-approve.component.css']
})
export class ApplicationDemandApprove implements OnInit, OnDestroy {
    unsubscribe$: Subject<void> = new Subject();
    consumerApplicationDetail: any;
    consumerSurveyData: any;
    userRoles: Array<any> = [];
    applicationServeyFg: FormGroup;
    userApplicationUrl: string = this.url.userApplicationUrl;
    consumerDemandData: any;
    userDemandUrl: string = this.url.userDemandUrl;
    // userSurveyUrl: string = this.url.userSurveyUrl;

   
  geoLocationData: any
  applicationDocumentData: any
  maskAadhaarNo: string = null;

    maxDate = new Date();
    minDate = new Date();

    @ViewChild('surveyDoc') surveyDocElement: ElementRef;

    isFormSubmit: boolean = false;

    // isRejected;

    surveyRequired: boolean = true;
    surveyUploaded: boolean = false;

    surveyFileName: string = 'Select Survey File... ';

    surveyDoc;
    crudType = this.data.crudType;

    userSurveyUrl: string = this.url.userSurveyUrl;

    consumerApplicationId = this.data.consumerApplicationId;
    @ViewChild('componentView') htmlData!: ElementRef;
    token:any
    downloadHideBoolean:boolean = false;
    paymentView:any
    paymentDetails:any

    constructor(
        private spinnerService: SpinnerService,
        private url: GenerateUrl,
        private http: HttpClient,
        private fb: FormBuilder,
        private consumerApplicationService: ConsumerApplicationService,
        private notificationService: NotificationService,


        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ApplicationDemandApprove>,
    ) { 
      this.token = sessionStorage.getItem("usertoken");
    }

    getPymentView(){
      this.consumerApplicationService.getAllPaymentDetails(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data:any)=>{
        console.log(data,"rrrrrrrrrrrrrrrrrrrrrrrrrrrr*********************rrrrrrrrrrrrrrrrrrrrrrrrrr");
        if(data?.code=="200" && data?.list!=null){
          this.paymentView = data?.list[0];
          console.log( this.paymentView," this.paymentView.........................???????????????????????????");
          
        }else{
          return
        }
      })
    }

     ngOnInit() {
        this.loadForm();
        this.consumerApplicationDetail = this.data.row
        console.log(this.consumerApplicationDetail);
        
        this.consumerApplicationService.getDemandPaymentDetails(this.consumerApplicationDetail.consumerApplicationId).subscribe((data:any)=>{
          console.log(data,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
          this.paymentDetails = data;
          console.log(this.paymentDetails,"this.paymentDetails...uuuuuuu");
          
          this.getPymentView();
          })
        this.applicationServeyFg.get('consumerApplicationId').setValue(this.consumerApplicationDetail.consumerApplicationId);
       
        // this.consumerApplicationService.getConsumerDemandData(this.consumerApplicationDetail.consumerApplicationId).subscribe((consumerDemandData:any)=>{
        //     console.log('consumerDemandData', consumerDemandData);
        //     if (consumerDemandData['code'] == "200") {
        //         this.consumerDemandData = consumerDemandData['list'][0];
        //     }
        // })

      
        if (this.consumerApplicationDetail?.natureOfWorkTypeId != 8) {
          this.getApplicationDocumentData();
        }
    }



    loadForm() {
        this.applicationServeyFg = this.fb.group({
            consumerApplicationId: ['', Validators.compose([Validators.required])],
            isRejected: ['', Validators.compose([Validators.required])],
            rejectedRemark: ['']
        });
    }
    // loadEditForm(consumerSurveyData) {

    //     console.log('consumerSurveyData:::', consumerSurveyData);
    //     const surveyDateStr = moment(consumerSurveyData['surveyDate'], "DD-MM-YYYY").format();
    //     this.applicationServeyFg.controls['surveyDate'].setValue(consumerSurveyData['surveyDate']);

    //     if (consumerSurveyData['surveyStatus'] == "REJECTED") {
    //         this.applicationServeyFg.controls['isRejected'].setValue('true');
    //         this.applicationServeyFg.controls['rejectedRemark'].setValue(consumerSurveyData['rejectedReason']);
    //     } else {
    //         this.applicationServeyFg.controls['isRejected'].setValue('false');
    //     }
    //     if (this.crudType == CrudType.update) {
    //         this.surveyRequired = false;
    //     }

    // }




    get applicationSurveyFormControls() {
        return this.applicationServeyFg.controls;
    }


    onIsRejectedChange(ob: MatRadioChange) {


        let mrButton: MatRadioButton = ob.source;

        var isApplicationRejected: boolean;
        if (mrButton.value == "true") {
            isApplicationRejected = true;
        } else if (mrButton.value == "false") {
            isApplicationRejected = false;
        }


        if (isApplicationRejected) {

            console.log("true ----gmc changed radio value: " + ob.value);
            // this.isRejected = true;

        } else if (!isApplicationRejected) {

            console.log("false ----gmc changed radio value: " + ob.value);
            this.applicationServeyFg.controls['rejectedRemark'].clearValidators();
            this.applicationServeyFg.controls['rejectedRemark'].setValue('');


        } else {
            console.log("some other value:  " + ob.value);
        }
    }


    getConsumerSurveyData() {
        this.consumerApplicationService.getConsumerSurveyData(this.consumerApplicationDetail?.consumerApplicationId).subscribe((consumerSurveyData: any) => {
          if (consumerSurveyData['code'] == "200") {
            this.consumerSurveyData = consumerSurveyData['list'][0];
          }
        })
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
          }
    
        })
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
    
      ///fhha,mdishddnggg]}}}}}}}jdfdufhijdih 
    
      /////////////  Administrative file download ********************************////////************************ Start ***//////////////
      getDownloaddocAdministrativeFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docAdministrative.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        // console.log(filePathWithForwardSlashes);
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes);
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes)
      }
      /////////////  Administrative file download ********************************////////************************ end ***//////////////
    
    
      //////////////// Estimate file Download *********************************//////////////////*********start************************ */
      getDownloaddocEstimateFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docEstimate.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes)
      }
      //////////////// Estimate file Download *********************************//////////////////*************end************************ */
    
      /////////////  Noc file download ********************************////////************************ end ***//////////////
      getDownloaddocNocFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docNoc.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        // console.log(filePathWithForwardSlashes);
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes);
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes)
      }
      /////////////  Noc file download ********************************////////************************ end ***//////////////
    
    
      /////////////  Registry file download ********************************////////************************ end ***//////////////
      getDownloaddocRegistryFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docRegistry.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        // console.log(filePathWithForwardSlashes);
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes);
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes)
      }
      /////////////  Registry file download ********************************////////************************ end ***//////////////
    
      /////////////  ReraPermission file download ********************************////////************************ end ***//////////////
      getDownloaddocReraPermissionFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docReraPermission.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        // console.log(filePathWithForwardSlashes);
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes);
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes)
      }
      /////////////  ReraPermission file download ********************************////////************************ end ***//////////////
    
      /////////////  docT$cpPermission file download ********************************////////************************ end ***//////////////
      getDownloaddocT$cpPermissionFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docT$cpPermission.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        // console.log(filePathWithForwardSlashes);
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes);
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes)
      }
      /////////////  docT$cpPermission file download ********************************////////************************ end ***//////////////
    
      /////////////  docKhasraKhatoni file download ********************************////////************************ end ***//////////////
      getDownloaddocKhasraKhatoniFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docKhasraKhatoni.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        // console.log(filePathWithForwardSlashes);
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes);
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes)
      }
      /////////////  docKhasraKhatoni file download ********************************////////************************ end ***//////////////
    

    onClose() {
        this.dialogRef.close();
    }


    onSubmit() {
        console.log('submit button clicked');
        this.isFormSubmit = true;

      //  this.downloadPdf();
      //  return

        const demandApprovalData = this.applicationServeyFg.value;

        if (this.applicationServeyFg.valid) {



                console.log('demandApprovalData', demandApprovalData);


                this.consumerApplicationService.saveDemandApprovalData(demandApprovalData).subscribe(
                    data => {
                        console.log(data);
                        if (data['code'] == "201") {
                            
                            this.notificationService.success(data['message']);
                            this.downloadHideBoolean = true
                            this.downloadPdf();
                            this.onClose();
                        } else {
                            alert(data['message']);
                        }
                    });


           







        }


    }




    async ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    downloadPdf() {
      this.downloadHideBoolean = true
      const options = {
        margin: 0.5,
        filename: `Application-Demand(${this.consumerApplicationDetail?.consumerApplicationNo}).pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
    
      const content = this.htmlData.nativeElement;
    
      // Generate the PDF and handle the Blob
      html2pdf()
        .set(options)
        .from(content)
        .save()
        .toPdf() // Ensure PDF generation
        .outputPdf('blob') // Get the PDF as a Blob
        .then((pdfBlob: Blob) => {
          console.log(pdfBlob, 'Generated PDF Blob');
    
          // Prepare form data for upload
          const formDataNew: FormData = new FormData();
          formDataNew.append('docDemandNote', pdfBlob,  `Application-Demand(${this.consumerApplicationDetail?.consumerApplicationNo}).pdf`); // Add a filename for clarity
          formDataNew.append(
            'consumerApplicationNo',
            this.consumerApplicationDetail?.consumerApplicationNo || ''
          );
    
          // Upload the form data via the service
          this.consumerApplicationService.uploadDemand(formDataNew, this.token).subscribe({
            next: (res: any) => {
              console.log(res, 'Upload response');
            },
            error: (err: any) => {
              console.error('Error uploading work order:', err);
            },
          });
        })
        .catch((error) => {
          console.error('Error generating or uploading PDF:', error);
        });

        
    }
    



}
