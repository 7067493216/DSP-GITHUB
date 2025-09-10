import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { NewApplicationService } from '../../services/new-application.service';


@Component({
    selector: 'new-application-detail',
    templateUrl: './new-application-detail.component.html',
    styleUrls: ['./new-application-detail.component.css']
})
export class NewApplicationDetailComponent implements OnInit, OnDestroy {
    unsubscribe$: Subject<void> = new Subject();
    consumerApplicationDetail: any;
    consumerSurveyData: any;
    userRoles: Array<any> = [];
    consumerApplicationUrl: string = this.url.consumerApplicationUrl;
    userSurveyUrl: string = this.url.userSurveyUrl;


    constructor(
        private spinnerService: SpinnerService,
        private url: GenerateUrl,
        private http: HttpClient,
        private newApplicationService: NewApplicationService,
        private notificationService: NotificationService,


        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<NewApplicationDetailComponent>,
    ) { 
        this.consumerApplicationDetail = this.data.row
    }

     ngOnInit() {

        // console.log('ngOnInit call NewApplicationDetailComponent !!!');

        // let consumerApplicationData = await this.http.get(this.consumerApplicationUrl + '/get/' + this.data.consumerApplicationId).toPromise();
        // console.log('consumerApplicationData', consumerApplicationData);
        // if (consumerApplicationData['code'] == "200") {
        //     this.consumerApplicationDetail = consumerApplicationData['list'][0];
        // }


        // let consumerSurveyData = await this.http.get(this.userSurveyUrl + '/get/' + this.data.consumerApplicationId).toPromise();
        // console.log('consumerSurveyData', consumerSurveyData);
        // if (consumerSurveyData['code'] == "200") {
        //     this.consumerSurveyData = consumerSurveyData['list'][0];
        // }


        console.log('ends');

        // this.viewConsumerApplicationById();
    }
    // viewConsumerApplicationById() {
    //     this.newApplicationService.getNewApplicationById(this.data.consumerApplicationId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
    //         this.consumerApplicationDetail = data['list'][0];
    //     });
    // }

    getFile(uploadId) {

        console.log("upload Id: " + uploadId);

        // this.consumerApplicationService.getFile(uploadId).pipe(takeUntil(this.unsubscribe$)).subscribe(
        //     (file: HttpResponse<Blob>) => {
        //         this.downloadFile(file);
        //     }
        // );

    }

    downloadFile(file) {
        if (file.body.size > 3) {
            window.location.href = file.url
        } else {
            this.notificationService.warn('No data available')
        }
    }

    onClose() {
        this.dialogRef.close();
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
