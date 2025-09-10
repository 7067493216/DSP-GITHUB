import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Inject, OnDestroy, ɵConsole, Input, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { PdfService } from '../../services/pdf.service';
import * as html2pdf from 'html2pdf.js';


@Component({
    selector: 'consumer-application-view',
    templateUrl: './consumer-application-view.component.html',
    styleUrls: ['./consumer-application-view.component.css']
})
export class ConsumerApplicationViewComponent implements OnInit, OnDestroy {
    unsubscribe$: Subject<void> = new Subject();
    consumerApplicationDetail: any;
    consumerSurveyData: any;
    consumerDemandData: any;
    geoLocationData: any;
    applicationDocumentData: any;
    userRoles: Array<any> = [];
    userApplicationUrl: string = this.url.userApplicationUrl;
    userSurveyUrl: string = this.url.userSurveyUrl;
    userDemandUrl: string = this.url.userDemandUrl;
    mastersUrl: string = this.url.mastersUrl;
    @Input() consumerApplicationId = '';
    maskAadhaarNo: string = null;

    supplyVolageName: Array<any> = [];
    supplyVoltageString: string = '';
    @ViewChild('componentView', { static: true }) componentView: ElementRef;

    constructor(
        private spinnerService: SpinnerService,
        private url: GenerateUrl,
        private http: HttpClient,
        private consumerApplicationService: ConsumerApplicationService,
        private notificationService: NotificationService,
        private pdfService: PdfService
    ) {


        
     }

    async ngOnInit() {
        console.log('starts');
        let consumerApplicationData = await this.http.get(this.userApplicationUrl + '/get/' + this.consumerApplicationId).toPromise();
        console.log('consumerApplicationData', consumerApplicationData);
        if (consumerApplicationData['code'] == "200") {
            this.consumerApplicationDetail = consumerApplicationData['list'][0];
            if (consumerApplicationData['code'] == "200") {
                this.consumerApplicationDetail = consumerApplicationData['list'][0];


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
                // this.filedMaskFormat();

            }
            this.filedMaskFormat();
        }
        let consumerSurveyData = await this.http.get(this.userSurveyUrl + '/get/' + this.consumerApplicationId).toPromise();
        console.log('consumerSurveyData', consumerSurveyData);
        if (consumerSurveyData['code'] == "200") {
            this.consumerSurveyData = consumerSurveyData['list'][0];
        }

        let consumerDemandData = await this.http.get(this.userDemandUrl + '/get/' + this.consumerApplicationId).toPromise();
        console.log('consumerDemandData', consumerDemandData);
        if (consumerDemandData['code'] == "200") {
            this.consumerDemandData = consumerDemandData['list'][0];
        }


        let geoLocationData = await this.http.get(this.mastersUrl + '/getGeolocationDetails/' + this.consumerApplicationDetail.consumerApplicationNo).toPromise();
        console.log('geoLocationData', geoLocationData);
        if (geoLocationData['code'] == "200") {
            this.geoLocationData = geoLocationData['list'][0];
        }

        if (this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId != 8) {
            let applicationDocumentData = await this.http.get(this.mastersUrl + '/getAllApplicationDocument/' + this.consumerApplicationDetail.consumerApplicationId).toPromise();
            console.log('applicationDocumentData', applicationDocumentData);
            if (applicationDocumentData['code'] == "200") {
                this.applicationDocumentData = applicationDocumentData['list'][0];
                console.log('applicationDocumentData:>-  !!!', applicationDocumentData);
            } else {
                this.applicationDocumentData = null;
            }
        }


        console.log('ngOnInit ends !!!');

        console.log('ends');
        // this.getDownloadEstimateFile();
    }
    // viewConsumerApplicationById() {
    //     this.consumerApplicationService.getNewApplicationById(this.data.consumerApplicationId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
    //         this.consumerApplicationDetail = data['list'][0];
    //     });
    // }


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

    downloadHtmlView() {

        // const htmlContent = this.componentView.nativeElement.innerHTML;
        // const blob = new Blob([htmlContent], { type: 'text/html' });
        // const url = URL.createObjectURL(blob);
        // const a = document.createElement('a');
        // a.href = url;
        // a.download = 'componentView.html';
        // a.click();
        // URL.revokeObjectURL(url);






        const content = this.componentView.nativeElement;

        const options = {
            margin: 10,
            filename: 'Application-Details.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().from(content).set(options).outputPdf(pdf => {
            // You can save the PDF or trigger a download
            pdf.save();
        });
    }



    downloadPdf(): void {
        this.pdfService.generatePdf('elementIdToCapture', 'your-filename');
    }

}
















