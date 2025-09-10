import { Component, Inject, OnInit } from '@angular/core';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-duplicate-refund-confirmation-by-gm',
  templateUrl: './duplicate-refund-confirmation-by-gm.component.html',
  styleUrls: ['./duplicate-refund-confirmation-by-gm.component.css']
})
export class DuplicateRefundConfirmationByGmComponent implements OnInit {

  consumerApplicationDetail:any
  token:any
  paymentsDetails:any
  bankDetailsFormShowBoolean:boolean=false
  bankDetails: any;
  accessLeveOfUser:any
  checkedBooleanVariable:boolean = false
  // duplicatePaymentRefundPayload: DuplicatePaymentRefundPayload = new DuplicatePaymentRefundPayload()

  constructor(
     private consumerApplicationService: ConsumerApplicationService,
        private notification: NotificationService,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<DuplicateRefundConfirmationByGmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.consumerApplicationDetail = this.data.row
    this.token = sessionStorage.getItem("usertoken");

    this.accessLeveOfUser = JSON.parse(sessionStorage.getItem("accessLeveOfUser"));
    console.log(this.accessLeveOfUser, "v............");
  }

  ngOnInit(): void {
    this.getDuplicateRefundList(this.consumerApplicationDetail?.consumerApplicationNo)
  }

  onClose() {
    this.dialogRef.close();
  }

  getBankDetails() {
    this.consumerApplicationService.getConsumerAccountDetails(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((resp: any) => {
      console.log(resp, "resp......................................");
      if (resp?.code == "200") {
        this.notification.success(resp?.message);
        this.bankDetails = resp?.list[0];
      } else {
        this.notification.warn(resp?.message);
        return
      }

    })
  }


  getDuplicateRefundList(consumerApplicationNo: any) {
    this.consumerApplicationService.getDuplicateRefundList(consumerApplicationNo).subscribe((response: any) => {
      console.log(response, "response");
      if (response?.code == "200") {
        if (response?.list[0].remainingRegistrationRefund == 0 && response?.list[0].remainingDemandRefund == 0) {
this.notification.error("इस आवेदन पर कोई डुप्लिकेट प्रविष्टियाँ नहीं हैं।")
        } else {
          this.notification.success(response?.message);
          this.paymentsDetails = response?.list[0];
          this.bankDetailsFormShowBoolean = true;
         this.getBankDetails()
        }

       
      } else {
        this.notification.error(response?.message);
        this.bankDetailsFormShowBoolean = false;
        return
      }
    })
  }

  onCheckboxChange(e:any){
    console.log(e.checked, "eeeeee..................checkbox.....................");
    this.checkedBooleanVariable = e.checked;
  }


  onSubmit(){

    this.consumerApplicationService.updateDuplicateRefundPaymentByGm(this.consumerApplicationDetail?.consumerApplicationNo, true, this.accessLeveOfUser?.userId, this.accessLeveOfUser?.userName, this.token).subscribe((resp:any)=>{
      if(resp?.code=="200"){
        this.notification.success(resp?.message);
        this.onClose();
      }else{
        this.notification.warn(resp?.message);
        return
      }
    })

    
  }


}
