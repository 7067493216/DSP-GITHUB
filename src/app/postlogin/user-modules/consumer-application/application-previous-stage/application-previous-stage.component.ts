import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';
import { Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';

@Component({
    selector: 'application-previous-stage',
    templateUrl: './application-previous-stage.component.html',
    styleUrls: ['./application-previous-stage.component.css']
})
export class ApplicationPreviousStageComponent implements OnInit, OnDestroy {
    previousStageFg: FormGroup;
    unsubscribe$: Subject<void> = new Subject();
    cancelReason: Array<any> = [];
    consumerApplicationId = this.data.consumerApplicationId;
    constructor(
        private spinnerService: SpinnerService,
        private consumerApplicationService: ConsumerApplicationService,
        public dialogRef: MatDialogRef<ApplicationPreviousStageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private router: Router,
        public role: RoleConstantsService,
        public notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.previousStageFg = this.formBuilder.group({
            consumersApplicationDetailId: [this.data.consumerApplicationId, Validators.required],
            remark: ['', Validators.required]
        });
    }
    submitPreviousStageForm() {
        this.consumerApplicationService.saveBackToPreviousStage(this.previousStageFg.value).pipe(takeUntil(this.unsubscribe$))
            .subscribe(data => {
                if (data['code'] === '201') {
                    this.onClose();
                    this.notificationService.success(data['message'])
                } else {
                    this.notificationService.error(data['message'])
                }
            });
    }
    onClose() {
        this.dialogRef.close();
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}