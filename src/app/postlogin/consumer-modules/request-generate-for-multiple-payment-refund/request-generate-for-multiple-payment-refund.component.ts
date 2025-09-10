import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsumerApplicationService } from '../../user-modules/services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { HttpClient } from '@angular/common/http';
import { NewApplicationService } from '../services/new-application.service';
import { BankDetailsPayload } from '../models/BankDetailsPayload';
import { DuplicatePaymentRefundPayload } from '../models/duplicatePaymentRefundPayload';

@Component({
  selector: 'app-request-generate-for-multiple-payment-refund',
  templateUrl: './request-generate-for-multiple-payment-refund.component.html',
  styleUrls: ['./request-generate-for-multiple-payment-refund.component.css']
})
export class RequestGenerateForMultiplePaymentRefundComponent implements OnInit {

  refundRequestForm: FormGroup;
  checkBookFile: any;
  selectedBankCode: string = ''; // Store selected bank's IFSC code
  ifscError: boolean = false;
  bankList: Array<any> = [];
  searchForm: FormGroup;
  bankDetailsFormShowBoolean: boolean = false;
  paymentsDetails: any
  bankDetailsPayload: BankDetailsPayload = new BankDetailsPayload();
  bankDetails: any
  checkboxBoolean: boolean = false
  duplicatePaymentRefundPayload: DuplicatePaymentRefundPayload = new DuplicatePaymentRefundPayload()
  token: any
  doneBoolean: boolean = false
  closeSaveBankDetailsBoolean: boolean = false;
  panCardFile:any

  constructor(
    private consumerApplicationService: ConsumerApplicationService,
    private notification: NotificationService,
    private fb: FormBuilder,
    private http: HttpClient,
    private newApplicationService: NewApplicationService
  ) {

    let consumertoken = sessionStorage.getItem('consumertoken');
    this.token = consumertoken;

    this.http.get('https://survey.mpcz.in:8080/ssp-web/demo/getBank').subscribe((response: any) => {
      console.log(response, "response.........................");
      this.bankList = response;
    })
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      applicationNumber: ["", Validators.required]
    })
  }

  onSearch() {
    console.log(this.searchForm.value.applicationNumber, "this.searchForm");

    this.getDuplicateRefundList(this.searchForm.value.applicationNumber);
  }



  refundHolderForm() {
    this.refundRequestForm = this.fb.group({
      creditorName: ["", Validators.required],
      bankName: ["", Validators.required],
      ifscCode: ["", Validators.required],
      accountNumber: ["", Validators.required],
      panNumber: ["", Validators.required],
      docCheckOrPassBook: ["", Validators.required],
      panCardFile:["",Validators.required]
    })
  }

  onBankCheckbookFileSelect(event: any) {
    console.log(event.target.files[0], "ccchhheeeecccckkkkkbbbboooookkkk...........");
    this.checkBookFile = event.target.files[0]
  }

  onSelectBankName(event: any) {
    this.selectedBankCode = "";
    console.log(this.refundRequestForm.value, "Refund Request Form");
    this.selectedBankCode = this.refundRequestForm.value.bankName.code;

  }

  onIfscCode(enteredCode: string) {
    console.log(enteredCode, "iiifffssccccc");
    console.log(this.refundRequestForm, "this.refundRequestForm.............on input field................");
    if (enteredCode.length <= this.selectedBankCode.length) {
      this.ifscError = enteredCode !== this.selectedBankCode;
    }

  }

  onPanCardFileSelect(event: any) {
    console.log(event.target.files[0], "ccchhheeeecccckkkkkbbbboooookkkk...........");
    this.panCardFile = event.target.files[0]
  }

  onEdit() {
    this.refundRequestForm.get('creditorName').enable();
    this.refundRequestForm.get('bankName').enable();
    this.refundRequestForm.get('ifscCode').enable();
    this.refundRequestForm.get('accountNumber').enable();
    this.refundRequestForm.get('panNumber').enable();
    this.refundRequestForm.get('docCheckOrPassBook').enable();
    this.closeSaveBankDetailsBoolean = false;
  }

  onSubmitBankDetail() {
    if (this.refundRequestForm.invalid) {
      this.notification.warn("Invalid Form");
      return
    }
    this.bankDetailsPayload.accountHolderName = this.refundRequestForm.value.creditorName
    this.bankDetailsPayload.accountNo = this.refundRequestForm.value.accountNumber
    this.bankDetailsPayload.bankName = this.refundRequestForm.value.bankName.name
    this.bankDetailsPayload.consumerApplicationNo = this.searchForm.value.applicationNumber
    this.bankDetailsPayload.ifscCode = this.refundRequestForm.value.ifscCode
    this.bankDetailsPayload.panNo = this.refundRequestForm.value.panNumber

    console.log(this.bankDetailsPayload, "this.bankDetailsPayload,,,,,,,,,,,,,,,,,,,,,,");

    this.refundRequestForm.get('creditorName').disable();
    this.refundRequestForm.get('bankName').disable();
    this.refundRequestForm.get('ifscCode').disable();
    this.refundRequestForm.get('accountNumber').disable();
    this.refundRequestForm.get('panNumber').disable();
    this.refundRequestForm.get('docCheckOrPassBook').disable();
    this.closeSaveBankDetailsBoolean = true;
    this.newGetBankDetails();
  }

  newGetBankDetails() {
    this.bankDetails = this.bankDetailsPayload
  }

  getDuplicateRefundList(consumerApplicationNo: any) {
    this.newApplicationService.getDuplicateRefundList(consumerApplicationNo).subscribe((response: any) => {
      console.log(response, "response");
      if (response?.code == "200") {
        if (response?.list[0].remainingRegistrationRefund == 0 && response?.list[0].remainingDemandRefund == 0) {
this.notification.error("इस आवेदन पर कोई डुप्लिकेट प्रविष्टियाँ नहीं हैं।")
        } else {
          this.notification.success(response?.message);
          this.refundHolderForm();
          this.bankDetailsFormShowBoolean = true;
          this.paymentsDetails = response?.list[0];
          this.bankDetailsPayload.consumerApplicationNo = this.searchForm.value.applicationNumber
        }


       
      } else {
        this.notification.error(response?.message);
        this.bankDetailsFormShowBoolean = false;
        return
      }
    })
  }


  onCheckboxChange(e: any) {

    console.log(e.checked, "e..................................");
    this.checkboxBoolean = e.checked;
  }

  onFinalSubmit() {
    if (this.closeSaveBankDetailsBoolean == false) {
      this.notification.error("please fill bank details first");
      return
    }
    this.duplicatePaymentRefundPayload.accountNo = this.refundRequestForm.value.accountNumber
    this.duplicatePaymentRefundPayload.accountHolderName = this.refundRequestForm.value.creditorName
    this.duplicatePaymentRefundPayload.active = "";
    this.duplicatePaymentRefundPayload.bankName = this.refundRequestForm.value.bankName.name
    this.duplicatePaymentRefundPayload.consumerApplicationNo = this.searchForm.value.applicationNumber
    this.duplicatePaymentRefundPayload.created = "";
    this.duplicatePaymentRefundPayload.deleted = "";
    this.duplicatePaymentRefundPayload.dgmApproval = "";
    this.duplicatePaymentRefundPayload.dgmApprovedDate = "";
    this.duplicatePaymentRefundPayload.dgmApprovedId = "";
    this.duplicatePaymentRefundPayload.dgmName = "";
    this.duplicatePaymentRefundPayload.financeApproval = "";
    this.duplicatePaymentRefundPayload.financeApprovedDate = "";
    this.duplicatePaymentRefundPayload.financeId = "";
    this.duplicatePaymentRefundPayload.financeName = "";
    this.duplicatePaymentRefundPayload.gmApproval = "";
    this.duplicatePaymentRefundPayload.gmApprovedDate = "";
    this.duplicatePaymentRefundPayload.gmApprovedId = "";
    this.duplicatePaymentRefundPayload.gmName = "";
    this.duplicatePaymentRefundPayload.id = "";
    this.duplicatePaymentRefundPayload.ifscCode = this.refundRequestForm.value.ifscCode
    this.duplicatePaymentRefundPayload.panNo = this.refundRequestForm.value.panNumber

    if (this.paymentsDetails?.remainingRegistrationRefund > 0 && this.paymentsDetails?.remainingDemandRefund == 0) {
      this.duplicatePaymentRefundPayload.refundAmount = this.paymentsDetails?.registrationDto[0]?.registrationRefundableAmount
      this.duplicatePaymentRefundPayload.refundType = "Registration"
      this.duplicatePaymentRefundPayload.transactionId = this.paymentsDetails?.registrationDto[0]?.registrationTransactionId
    } else if (this.paymentsDetails?.remainingRegistrationRefund == 0 && this.paymentsDetails?.remainingDemandRefund > 0) {
      this.duplicatePaymentRefundPayload.refundAmount = this.paymentsDetails?.demandDto[0]?.demandRefundableAmount
      this.duplicatePaymentRefundPayload.refundType = "Demand"
      this.duplicatePaymentRefundPayload.transactionId = this.paymentsDetails?.demandDto[0]?.demandTransactionId
    } else {
      // bydefault demand refund
      this.duplicatePaymentRefundPayload.refundAmount = this.paymentsDetails?.demandDto[0]?.demandRefundableAmount
      this.duplicatePaymentRefundPayload.refundType = "Demand"
      this.duplicatePaymentRefundPayload.transactionId = this.paymentsDetails?.demandDto[0]?.demandTransactionId
    }


    this.newApplicationService.submitDuplicateRefundRequest(this.duplicatePaymentRefundPayload, this.token).subscribe((response: any) => {
      console.log(response, "response..............................................");
      if (response?.code == "201") {
        this.doneBoolean = true;
        /// bank details submit start  //////////////
        let formData: FormData = new FormData();
        formData.append('consumerAccountDetails', JSON.stringify(this.bankDetailsPayload));
        formData.append('chequeBookOrPaasbook', this.checkBookFile);
        formData.append('docPanNo', this.panCardFile);
        this.newApplicationService.consumerBankDetailSubmit(formData).subscribe((res: any) => {
          console.log(res, "res..................................................");
          if (res?.code == "201") {
            this.notification.success(response?.message);
          } else {
            this.notification.warn(res?.message);
            return
          }
        })
        /// bank details submit end  //////////////

      } else {
        this.doneBoolean = false;
        this.notification.warn(response?.message);
        return
      }
    })
  }



}
