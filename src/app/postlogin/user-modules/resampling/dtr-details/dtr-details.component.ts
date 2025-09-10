import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { ConsumerApplicationService } from '../../services/consumer-application.service';

@Component({
  selector: 'app-dtr-details',
  templateUrl: './dtr-details.component.html',
  styleUrls: ['./dtr-details.component.css']
})
export class DtrDetailsComponent implements OnInit {

  dtrArray:any[] = [];

  constructor(
     @Inject(MAT_DIALOG_DATA) public data: any,
        private notificationService: NotificationService,
        public dialogRef: MatDialogRef<DtrDetailsComponent>,
        private spinnerService: SpinnerService,
        private fb: FormBuilder,
        private datePipe: DatePipe,
        private consumerApplicationService: ConsumerApplicationService
  ) {
this.dtrArray = this.data.array;
   }

  ngOnInit(): void {

  }

  onClose() {
    this.dialogRef.close();
  }

}
