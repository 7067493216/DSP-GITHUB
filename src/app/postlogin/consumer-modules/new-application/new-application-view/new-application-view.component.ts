import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { NewApplicationService } from '../../services/new-application.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
    selector: 'new-application-view',
    templateUrl: './new-application-view.component.html',
    styleUrls: ['./new-application-view.component.css']
})
export class NewApplicationViewComponent implements OnInit, OnDestroy {
    unsubscribe$: Subject<void> = new Subject();
    consumerApplicationDetail: any;
    consumerSurveyData: any;
    consumerDemandData: any;
    geoLocationData: any;
    applicationDocumentData: any;
    userRoles: Array<any> = [];
    consumerApplicationUrl: string = this.url.consumerApplicationUrl;
    mastersUrl: string = this.url.mastersUrl;
    @Input() consumerApplicationId = '';
    maskAadhaarNo: string = null;

    supplyVolageName: Array<any> = [];
    supplyVoltageString: string = '';
    ngbPunchingDetails: any;


    constructor(
        private spinnerService: SpinnerService,
        private url: GenerateUrl,
        private http: HttpClient,
        private newApplicationService: NewApplicationService,
        private notificationService: NotificationService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<NewApplicationViewComponent>,
    ) {

        this.consumerApplicationDetail = this.data.row;
    }

    //  if (this.consumerApplicationDetail.natureOfWorkTypeId == 8 && this.consumerApplicationDetail.applicationStatusId == 33) {
    //     this.getConnectionPradaaiDetailsForNgb();
    //   }


    // getConnectionPradaaiDetailsForNgb() {
    //     this.consumerApplicationService.getFinalConnectionPradaaiDetailsForApplicationView(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data: any) => {
    //       console.log(data, "dddaaaaaaatttttttttaaaaaaaaaaaa.....................................................");
    //       if (data.code == "200") {
    //         this.ngbPunchingDetails = data.list[0];
    //       }

    //     })
    //   }

    async ngOnInit() {

        console.log('ngOnInit call NewApplicationViewComponent !!!');

      //  let consumerApplicationData = await this.http.get(this.consumerApplicationUrl + '/get/' + this.consumerApplicationId).toPromise();
        if ( this.consumerApplicationDetail !=undefined) {
           // this.consumerApplicationDetail = consumerApplicationData['list'][0];

            if (this.consumerApplicationDetail.natureOfWorkTypeId == 8 && this.consumerApplicationDetail.applicationStatusId == 33) {
                this.newApplicationService.getFinalConnectionPradaaiDetailsForApplicationView(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data: any) => {
                    console.log(data, "dddaaaaaaatttttttttaaaaaaaaaaaa.....................................................");
                    if (data.code == "200") {
                        this.ngbPunchingDetails = data.list[0];
                    }

                })
            }

            console.log('**********************************************', this.consumerApplicationDetail)
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
                this.supplyVolageName.push("HT 33 KV");
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

        let consumerSurveyData = await this.http.get(this.mastersUrl + '/getApplicationSurvey/' + this.consumerApplicationId).toPromise();
        console.log('consumerSurveyData', consumerSurveyData);
        if (consumerSurveyData['code'] == "200") {
            this.consumerSurveyData = consumerSurveyData['list'][0];
            console.log(this.consumerSurveyData, "this.consumerSurveyData");

        }

        if (this.consumerApplicationDetail?.applicationStatus?.applicationStatusId > 11) {
            let consumerDemandData = await this.http.get(this.mastersUrl + '/getApplicationdDemand/' + this.consumerApplicationId).toPromise();
            console.log('consumerDemandData', consumerDemandData);
            if (consumerDemandData['code'] == "200") {
                this.consumerDemandData = consumerDemandData['list'][0];
            }
        }
        let geoLocationData = await this.http.get(this.mastersUrl + '/getGeolocationDetails/' + this.consumerApplicationDetail?.consumerApplicationNo).toPromise();
        console.log('geoLocationData', geoLocationData);
        if (geoLocationData['code'] == "200") {
            this.geoLocationData = geoLocationData['list'][0];
        }

        let applicationDocumentData = await this.http.get(this.mastersUrl + '/getAllApplicationDocument/' + this.consumerApplicationDetail?.consumerApplicationId).toPromise();
        console.log('applicationDocumentData', applicationDocumentData);
        if (applicationDocumentData['code'] == "200") {
            this.applicationDocumentData = applicationDocumentData['list'][0];
            console.log('applicationDocumentData:>-  !!!', this.applicationDocumentData);
        }

        console.log('ngOnInit ends !!!');
    }
    // viewConsumerApplicationById() {
    //     this.newApplicationService.getNewApplicationById(this.data.consumerApplicationId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
    //         this.consumerApplicationDetail = data['list'][0];
    //     });
    // }

    /////////////  Administrative file download ********************************////////************************ Start ***//////////////
    getDownloaddocAdministrativeFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docAdministrative.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        // console.log(filePathWithForwardSlashes);
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes);
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocs/" + filePathWithForwardSlashes)
    }
    /////////////  Administrative file download ********************************////////************************ end ***//////////////


    /////////////  Noc file download ********************************////////************************ end ***//////////////
    getDownloaddocNocFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docNoc.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        // console.log(filePathWithForwardSlashes);
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes);
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocs/" + filePathWithForwardSlashes)
    }
    /////////////  Noc file download ********************************////////************************ end ***//////////////


    /////////////  Registry file download ********************************////////************************ end ***//////////////
    getDownloaddocRegistryFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docRegistry.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        // console.log(filePathWithForwardSlashes);
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocs/" + filePathWithForwardSlashes);
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocs/" + filePathWithForwardSlashes)
    }
    /////////////  Registry file download ********************************////////************************ end ***//////////////

    /////////////  ReraPermission file download ********************************////////************************ end ***//////////////
    getDownloaddocReraPermissionFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docReraPermission.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        // console.log(filePathWithForwardSlashes);
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocs/" + filePathWithForwardSlashes);
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocs/" + filePathWithForwardSlashes)
    }
    /////////////  ReraPermission file download ********************************////////************************ end ***//////////////

    /////////////  docT$cpPermission file download ********************************////////************************ end ***//////////////
    getDownloaddocTcpPermissionFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docT$cpPermission.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        // console.log(filePathWithForwardSlashes);
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocs/" + filePathWithForwardSlashes);
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocs/" + filePathWithForwardSlashes)
    }
    /////////////  docT$cpPermission file download ********************************////////************************ end ***//////////////

    /////////////  docKhasraKhatoni file download ********************************////////************************ end ***//////////////
    getDownloaddocKhasraKhatoniFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docKhasraKhatoni.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        // console.log(filePathWithForwardSlashes);
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocs/" + filePathWithForwardSlashes);
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocs/" + filePathWithForwardSlashes)
    }
    /////////////  docKhasraKhatoni file download ********************************////////************************ end ***//////////////



    getFile(uploadId) {


        console.log('getFile call !!! upload Id:- ' + uploadId);

        this.newApplicationService.getFile(uploadId).pipe(takeUntil(this.unsubscribe$)).subscribe(
            (file: HttpResponse<Blob>) => {
                this.downloadFile(file);
            }
        );

    }

    downloadFile(file) {

        console.log('downloadFile call !!!');

        if (file.body.size > 3) {
            window.location.href = file.url
        } else {
            this.notificationService.warn('No data available')
        }
    }


    ngOnDestroy() {

        console.log('ngOnDestroy call !!!');

        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    filedMaskFormat() {

        console.log("maskFormat call !!!");
        // let aadhaarNo = String(646799434921);

        let aadhaarNo = this.consumerApplicationDetail.consumers.aadharNo;
        let sliced = aadhaarNo.slice(-4);
        this.maskAadhaarNo = String(sliced).padStart(aadhaarNo.length, "*")
        console.log('maskAadhaarNo :- ', this.maskAadhaarNo);
        return this.maskAadhaarNo;
    }
}
