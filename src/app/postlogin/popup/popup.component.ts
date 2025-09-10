import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConsumerApplicationService } from '../user-modules/services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  statusChangeBoolean: Boolean = false;
  token: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<PopupComponent>,
    private consumerApplicationService: ConsumerApplicationService,
  ) {
    console.log(data.message, "data................................................");
    this.token = sessionStorage.getItem('usertoken');
  }

  ngOnInit(): void {

  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.consumerApplicationService.changeStatusAfterFinanceSubmission(this.data.applicationNo, this.token).subscribe((resp: any) => {
      console.log(resp, "resp.....................");
      if (resp?.code == "204") {
        this.statusChangeBoolean = true;
        this.dialogRef.close(this.statusChangeBoolean);
      } else {
        this.notificationService.warn(resp?.message);
        return
      }
    })
  }

}
