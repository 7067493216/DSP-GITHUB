import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared-services/notification.service';

@Component({
  selector: 'app-new-payment-refund-request-rejected-popup',
  templateUrl: './new-payment-refund-request-rejected-popup.component.html',
  styleUrls: ['./new-payment-refund-request-rejected-popup.component.css']
})
export class NewPaymentRefundRequestRejectedPopupComponent implements OnInit {

  remarkForm:FormGroup

  constructor(
    private fb:FormBuilder,
    private notificationService:NotificationService,
     public dialogRef: MatDialogRef<NewPaymentRefundRequestRejectedPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.remarkForm = this.fb.group({
      remark:["",Validators.required]
    })
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit(){
    console.log(this.remarkForm,"this.remarkForm..........................................................");
    this.dialogRef.close(this.remarkForm.value.remark);
  }

}
