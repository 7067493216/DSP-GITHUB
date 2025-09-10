import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DownloadFeestypeReciept } from '../postlogin/user-modules/models/downloadFeestypeReciept';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { NewApplicationService } from '../postlogin/consumer-modules/services/new-application.service';
import { NotificationService } from '../shared-services/notification.service';
import { ApiService } from '../track-application/track/services/api.service';
import { ConsumerApplicationService } from '../postlogin/user-modules/services/consumer-application.service';

@Component({
  selector: 'app-payment-reciept',
  templateUrl: './payment-reciept.component.html',
  styleUrls: ['./payment-reciept.component.css']
})
export class PaymentRecieptComponent implements OnInit {

  PaymentForm: FormGroup;
  downloadFeestypeReciept: DownloadFeestypeReciept = new DownloadFeestypeReciept();
  consumerApplicationDetailNew: any;
  registrationBooleanShow: boolean = false
  demandBooleanShow: boolean = false
  reviseDemandBooleanShow: boolean = false
  poseMachinePaymentDataBoolean: boolean = false;
  poseMachinePaymentData: any;
  manualPaymentDataBoolean: boolean = false;
  manualPaymentData: any

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private url: GenerateUrl,
    private newApplicationService: NewApplicationService,
    private notification: NotificationService,
    private consumerApplicationService: ConsumerApplicationService
  ) {
    this.PaymentForm = this.fb.group({
      applicationNumber: ["", Validators.required]
    })
  }

  consumerApplicationDetails() {
    this.apiService.getApplicationDetails(this.PaymentForm.value.applicationNumber).subscribe((response: any) => {
      console.log(response, "response...........................................");
      if (response.code == "200") {
        this.consumerApplicationDetailNew = response.list[0][0]
      }
    })
  }

  onSubmit() {
    if (this.PaymentForm.invalid) {
      this.notification.error("Please Enter Application Number");
      return
    } else {

      this.consumerApplicationService.checkingDemandPaymentExistInBilldeskPaymentTableOrNot(this.PaymentForm.value.applicationNumber).subscribe((res: any) => {
        console.log(res, "res.............................................................");
        if (res.message == "Demand Payment Not Found In Billdesk Table") {
          this.consumerApplicationService.payemntRecievedInPoseMachineAndManualPayment(this.PaymentForm.value.applicationNumber).subscribe((resp: any) => {
            console.log(resp, "resp............................");
            if (resp?.code == "200" && resp?.message == "Data found in Pose Machine") {
              this.poseMachinePaymentDataBoolean = true;
              this.manualPaymentDataBoolean = false;
              this.poseMachinePaymentData = resp.list[0];
              this.manualPaymentData = null
            } else if (resp?.code == "200" && resp?.message == "Data found in Manual Payment") {
              this.manualPaymentDataBoolean = true;
              this.poseMachinePaymentDataBoolean = false;
              this.manualPaymentData = resp.list[0];
              this.poseMachinePaymentData = null;
            } else {
              this.poseMachinePaymentDataBoolean = false;
              this.manualPaymentDataBoolean = false;
              this.poseMachinePaymentData = null;
              this.manualPaymentData = null
            }

          })
        } else {
          /////////////////////////////////////////////////////////////////////////////////////////////
          this.consumerApplicationService.getConsumerApplicationDetailsByApplicationNumber(this.PaymentForm.value.applicationNumber).subscribe((response: any) => {
            console.log(response, "response...........................................");
            if (response.code == "200") {
              this.consumerApplicationDetailNew = response.list[0];

              console.log(this.consumerApplicationDetailNew, "consumerApplicationDetailNew...");

              if (this.consumerApplicationDetailNew?.applicationStatus?.applicationStatusId >= 6) {
                this.registrationBooleanShow = true;
                this.demandBooleanShow = false;
                this.reviseDemandBooleanShow = false;
              }

              if (this.consumerApplicationDetailNew?.applicationStatus?.applicationStatusId >= 12
                // && this.consumerApplicationDetailNew?.applicationStatus?.applicationStatusId!=24 
                && this.consumerApplicationDetailNew?.applicationStatus?.applicationStatusId != 36
                && this.consumerApplicationDetailNew?.applicationStatus?.applicationStatusId != 38
                && this.consumerApplicationDetailNew?.revisedErpNumber == null) {
                this.registrationBooleanShow = true;
                this.demandBooleanShow = true;
                this.reviseDemandBooleanShow = false;
              }

              if (this.consumerApplicationDetailNew?.revisedErpNumber != null) {
                this.registrationBooleanShow = true;
                this.demandBooleanShow = true;
                this.reviseDemandBooleanShow = true;
              }
            }
          })
          ////////////////////////////////////////////////////////////////////////////////////////////
        }

      })








    }

    console.log(
      this.registrationBooleanShow, ",,,,,,,,,,",
      this.demandBooleanShow, ",,,,,,,,,,",
      this.reviseDemandBooleanShow, ",,,,,,,,,,"
    );



    // console.log(consumerApplicationNo, "consumerApplicationNo1111111111111111111111111111111111",this.url.consumerContextPath + '/bill-desk/fees_genreted_recipt/'+ this.downloadFeestypeReciept.consumerApplicationNumber + '/' + this.downloadFeestypeReciept.slipGenretatedId);
  }

  onDownload(id: number) {
    console.log(id, "iiiiddddd//////////uuuuuuuuuuuuu");
    this.downloadFeestypeReciept.consumerApplicationNumber = this.PaymentForm.value.applicationNumber;
    this.downloadFeestypeReciept.slipGenretatedId = JSON.stringify(id);
    window.open(this.url.consumerContextPath + '/bill-desk/fees_genreted_recipt/' + this.downloadFeestypeReciept.consumerApplicationNumber + '/' + this.downloadFeestypeReciept.slipGenretatedId);

  }

  ngOnInit(): void {
  }


}
