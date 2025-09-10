import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Inject, OnDestroy, ɵConsole } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';


@Component({
    selector: 'consumer-application-detail',
    templateUrl: './consumer-application-detail.component.html',
    styleUrls: ['./consumer-application-detail.component.css']
})
export class ConsumerApplicationDetailComponent implements OnInit, OnDestroy {
    unsubscribe$: Subject<void> = new Subject();
    consumerApplicationDetail: any;
    consumerSurveyData: any;
    userRoles: Array<any> = [];
    userApplicationUrl: string = this.url.userApplicationUrl;
    userSurveyUrl: string = this.url.userSurveyUrl;


    constructor(
        private spinnerService: SpinnerService,
        private url: GenerateUrl,
        private http: HttpClient,
        private consumerApplicationService: ConsumerApplicationService,
        private notificationService: NotificationService,


        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ConsumerApplicationDetailComponent>,
    ) { 
        console.log(this.data.row,"ttttttttttttyyyyyyyyyyuuuuuuuuuuu");
        this.consumerApplicationDetail = this.data.row
        
    }

    async ngOnInit() {
        // console.log('starts');
        // let consumerApplicationData = await this.http.get(this.userApplicationUrl + '/get/' + this.data.consumerApplicationId).toPromise();
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
    //     this.consumerApplicationService.getNewApplicationById(this.data.consumerApplicationId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
    //         this.consumerApplicationDetail = data['list'][0]; 
    //     });
    // }

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

    onClose() {
        this.dialogRef.close();
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
