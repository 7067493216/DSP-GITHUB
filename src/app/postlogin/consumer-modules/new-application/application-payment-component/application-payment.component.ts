import { HttpClient, HttpResponse } from "@angular/common/http";
import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { NotificationService } from "src/app/shared-services/notification.service";
import { SpinnerService } from "src/app/shared-services/spinner.service";
import { GenerateUrl } from "src/environments/generate-url.model";
import { PaymentChargesModel } from "../../models/payment-charges-model";
import { PayuFormModel } from "../../models/payuFormModel";
import { NewApplicationService } from "../../services/new-application.service";
import { RedirectGatewayService } from "../../services/redirect-gateway.service";
import { BillDeskFromModel } from "../../models/BillDeskFromModel";
import { BillPaymentService } from "../../services/payment.service";
import { MkmyPaymentService } from "../../services/mkmy-payment.service";
import { MkmyGetOidAndAuthTokenModel } from "../../models/mkmyPaymentoidandAuthtokengetPayloadModel";
import { ConsumerApplicationService } from "src/app/postlogin/user-modules/services/consumer-application.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatRadioGroup } from "@angular/material/radio";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';
import { SanchaiPortalPaymentRequestmodelPayload } from "../../models/sanchaiPortalPaymentRequestPayload";
import { PaymentRequestOfSanchaiPortalAtDspPortalPayload } from "../../models/paymentRequestOfsanchaiPortalAtDspPortalModel";
import { DatePipe } from "@angular/common";
import { MeterialItemCostDetailsComponent } from "../meterial-item-cost-details/meterial-item-cost-details.component";

@Component({
  selector: "application-payment",
  templateUrl: "./application-payment.component.html",
  styleUrls: ["./application-payment.component.css"],
})
export class ApplicationPaymentComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject();
  userRoles: Array<any> = [];
  externalHtml: any;
  payuUrl = this.url.payuUrl;
  consumerPaymentUrl = this.url.consumerPaymentUrl;
  consumerContextPath = this.url.consumerContextPath;
  masterUrl = this.url.mastersUrl;
  consumerPaymentData: any;
  consumerPaymentDetailsss: any;
  consumerApplicationDetail: any;
  applicationPaymentChargesList: any;
  modalTitle = this.data.modalTitle;
  btnTitle: string;
  consumerApplicationNo: string;
  oid: any;
  authTok: any;
  paymentTypeId: number;
  erp = this.url.erp;
  erpEstimateCalculations: any;
  sdkDetails: any;
  paymentChargesList: Array<PaymentChargesModel> = [];
  payuformModel: PayuFormModel;
  bildeskmodel: BillDeskFromModel;
  paymentButtonClick: boolean = false;
  amount: number;
  consumerDemandData: any;
  mastersUrl: string = this.url.mastersUrl;
  consumerApplicationId = this.data.consumerApplicationId;
  mkmyGetOidAndAuthTokenModel: MkmyGetOidAndAuthTokenModel = new MkmyGetOidAndAuthTokenModel()
  newOid: any;
  newAuthTok: any;
  natureOfWorkTypeId: any;
  applicationStatusId: any;
  mkmyAmountData: any;
  oidAndAuthTokenData: any;
  erpEstimateDataForMkmyArray: any
  erpReviseData: any;
  openTableBoolean: boolean = false;
  tdsForm: FormGroup;
  tdsConfirmedBoolean: boolean = false;
  underSelection194jBoolean: boolean = false;
  undercgstSgstBoolean: boolean = false;
  payButtonBoolean: boolean = false
  @ViewChild(MatRadioGroup) radioGroup: MatRadioGroup;
  tdsOninitBoolean: boolean = false;
  paymentDetailAfterTds: any
  Act51SownBoolean: boolean = false;
  nevershowboolean: boolean = false;
  tdsSubmitPayload: any
  @ViewChild('componentView') htmlData!: ElementRef;
  token: any;
  downloadHideBoolean: boolean = false;
  yellowHideLine: boolean = false;
  portalList: Array<any> = [
    { "id": 1, "name": "BillDesk Payment Gateway (Online)" },
    { "id": 2, "name": "RTGS/NEFT/TREASURY (Offline)" }
  ];

  paymentMethods: Array<any> = [
    { "name": "NEFT" },
    { "name": "RTGS" },
    { "name": "TREASURY" }
  ];
  bankList: Array<any> = [];
  paymentPortalSelectionForm: FormGroup;
  validInputPaymentBoolean: boolean = false;
  invalidInputPaymentBoolean: boolean = false;

  sanchaiPortalPaymentRequestmodelPayload: SanchaiPortalPaymentRequestmodelPayload = new SanchaiPortalPaymentRequestmodelPayload();
  paymentRequestOfSanchaiPortalAtDspPortalPayload: PaymentRequestOfSanchaiPortalAtDspPortalPayload = new PaymentRequestOfSanchaiPortalAtDspPortalPayload();
  formPatchingData: any;
  tdsVariable: number = 0;
  payButtonEnableBoolean: boolean = false;
  otherAmountShowBoolean: boolean = false;
  underLineOytDataTable: Array<any> = [];
  section194C: boolean = false;
  section194J: boolean = false;
  tds10: any;
  tds2: any


  constructor(
    private billPaymentService: BillPaymentService,
    private redirectGateway: RedirectGatewayService,
    private spinnerService: SpinnerService,
    private url: GenerateUrl,
    private http: HttpClient,
    private fb: FormBuilder,
    // private consumerApplicationService: ConsumerApplicationService,
    private newApplicationService: NewApplicationService,
    private mkmyPaymentService: MkmyPaymentService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ApplicationPaymentComponent>,
    private dialog: MatDialog,
    private datePipe: DatePipe
  ) {
    this.consumerApplicationDetail = this.data.row;
    console.log(
      "consumer Application Detail BY get list",
      this.consumerApplicationDetail
    );
    this.paymentChargesList = [];
    this.modalTitle = this.data.modalTitle;
    this.btnTitle = this.data.btnTitle;
    this.consumerApplicationNo = this.data.consumerApplicationNo;
    this.paymentTypeId = this.data.paymentTypeId;
    this.mkmyGetOidAndAuthTokenModel.consumerAppllicationNo = this.consumerApplicationNo;
    this.natureOfWorkTypeId = this.data.natureOfWorkTypeId
    this.applicationStatusId = this.data.applicationStatusId



    this.token = sessionStorage.getItem("consumertoken");

    if (this.consumerApplicationDetail?.avedakKaPrakar == 'Government') {
      this.payButtonEnableBoolean = false;
    } else {
      this.payButtonEnableBoolean = true;
    }
    console.log(this.payButtonEnableBoolean, "this.payButtonEnableBoolean...");


    this.paymentPortalSelectionForm = this.fb.group({
      portalOptions: [null],
      applicationNumber: [''],
      mobileNumber: [''],
      utrReference: ['', Validators.required],
      date: ['', Validators.required],
      consumerName: [''],
      address: ['', Validators.required],
      payableAmount: [''],
      paymentMethod: ['', Validators.required],
      depositedAmount: ['', Validators.required],
      bankName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      gstNumber: [''],
      dcCode: [''],
      supervisionAmount: [''],
      supplyAffordingCharge: [''],
      totalBalanceSupervisionAmount: [''],
      avedanShulk: [''],
      difference: [''],

      dc: [''],
      sgst: [''],

      city: [''],
      cgst: [''],
      depositAmount: [''],
      sytemDevelopmentCharges: [''],
      jeReturnAmount: [''],
      mpmkMafBill: [''],
      secuirityDeposit: [''],
      colonyOrSlum: [''],
      // totalBalanceDepositAmount:[''],
      govMafBill: [''],
      // avedanShulk5: [''],
      avedanShulkFiveRupees: [''],

      otherAmount: [''],
      gst: [''],
      paymentType: ['']
    })

    this.http.get('https://survey.mpcz.in:8080/ssp-web/demo/getBank').subscribe((response: any) => {
      console.log(response, "response.........................");
      this.bankList = response;
    })

  }

  convertDate(dateadata: Date) {
    const rawDate = dateadata;
    const formatted = this.datePipe.transform(rawDate, 'dd-MMM-yyyy HH:mm');
    console.log(formatted);  // Example: "01-Jul-2025 15:03"
  }

  onSelectPaymentMaadhyam(e: any) {
    console.log(e, "eeee..............");
    if (e.value == 2) {
      this.newApplicationService.getFormDataForSanchaiPortalApplicationForm(this.consumerApplicationNo).subscribe((resp: any) => {
        console.log(resp, "getFormDataForSanchaiPortalApplicationForm(this.consumerApplicationNo)..................");
        if (resp?.code == "200") {
          this.formPatchingData = resp?.list[0];
          this.sanchaiPortalPaymentRequestmodelPayload.trxId = this.formPatchingData?.transactionId
          this.paymentRequestOfSanchaiPortalAtDspPortalPayload.trxId = this.formPatchingData?.transactionId
          this.loadFormOfSanchaiPortal(this.formPatchingData)
        } else {
          this.notificationService.warn(resp?.message);
          return
        }

      })
    } else {
      this.payButtonEnableBoolean = true;
    }

  }

  //  {
  //           "applicationNumber": "SV1750658381960",
  //           "address1": "Mendhi wali gali chhatri mandi gwalior",
  //           "consumerName": "ANURAG",
  //           "mobileNumber": "9340302532",
  //           "city": "Bhopal",
  //           "dc": "Anand Nagar Zone",
  //           "dcCode": "203020501",
  //           "cgst": 209771,
  //           "sgst": 209771,
  //           "superVisionAmount": 2330792,
  //           "depositAmount": null,
  //           "systemDevelopmentCharge": null,
  //           "supplyAffordingCharge": null,
  //           "colonyOrSlum": null,
  //           "jeReturnAmount": 4220302,
  //           "totalBalanceSupervisionAmount": 6970636.00,
  //           "totalBalanceDepositAmount": null,
  //           "mkmyTotalAmount": null,
  //           "govMafBill": null,
  //           "mpmkMafBill": null,
  //           "payableAmount": null,
  //           "applicationType": "Supervision",
  //           "ngbDcCode": "2304402",
  //           "mkmySecurityDeposit": null,
  //           "avedanShulkFiveRupee": null,
  //           "gstNumber": "27ABCDE1234F1Z5",
  //           "registrationFees": null,
  //           "dsSvMkPayAmount": 6970636.00,
  //           "avedanShulk": null
  //       }

  loadFormOfSanchaiPortal(formPatchingData: any) {
    console.log(formPatchingData, "formPatchingData........");

    this.paymentPortalSelectionForm.controls['applicationNumber'].setValue(formPatchingData?.applicationNumber);
    this.paymentPortalSelectionForm.controls['mobileNumber'].setValue(formPatchingData?.mobileNumber);
    this.paymentPortalSelectionForm.controls['dcCode'].setValue(formPatchingData?.ngbDcCode);
    this.paymentPortalSelectionForm.controls['supervisionAmount'].setValue(formPatchingData?.superVisionAmount);
    this.paymentPortalSelectionForm.controls['supplyAffordingCharge'].setValue(formPatchingData?.supplyAffordingCharge);
    if (formPatchingData?.applicationType == "Deposit") {
      this.paymentPortalSelectionForm.controls['totalBalanceSupervisionAmount'].setValue(formPatchingData?.totalBalanceDepositAmount);
    } else if (formPatchingData?.applicationType == "Supervision") {
      this.paymentPortalSelectionForm.controls['totalBalanceSupervisionAmount'].setValue(formPatchingData?.totalBalanceSupervisionAmount);
    } else if (formPatchingData?.applicationType != "Deposit" && formPatchingData?.applicationType != "Supervision" && formPatchingData?.applicationType != null && formPatchingData?.applicationType != undefined) {
      this.paymentPortalSelectionForm.controls['totalBalanceSupervisionAmount'].setValue(formPatchingData?.mkmyTotalAmount);
    }
    this.paymentPortalSelectionForm.controls['avedanShulk'].setValue(formPatchingData?.avedanShulk);
    this.paymentPortalSelectionForm.controls['dc'].setValue(formPatchingData?.dc);
    this.paymentPortalSelectionForm.controls['sgst'].setValue(formPatchingData?.sgst);
    this.paymentPortalSelectionForm.controls['consumerName'].setValue(formPatchingData?.consumerName);
    this.paymentPortalSelectionForm.controls['address'].setValue(formPatchingData?.address1);
    this.paymentPortalSelectionForm.controls['city'].setValue(formPatchingData?.city);
    this.paymentPortalSelectionForm.controls['cgst'].setValue(formPatchingData?.cgst);
    this.paymentPortalSelectionForm.controls['depositAmount'].setValue(formPatchingData?.depositAmount);
    this.paymentPortalSelectionForm.controls['sytemDevelopmentCharges'].setValue(formPatchingData?.systemDevelopmentCharge);
    this.paymentPortalSelectionForm.controls['jeReturnAmount'].setValue(formPatchingData?.jeReturnAmount);
    this.paymentPortalSelectionForm.controls['mpmkMafBill'].setValue(formPatchingData?.mpmkMafBill);
    this.paymentPortalSelectionForm.controls['secuirityDeposit'].setValue(formPatchingData?.mkmySecurityDeposit);
    this.paymentPortalSelectionForm.controls['colonyOrSlum'].setValue(formPatchingData?.colonyOrSlum);
    this.paymentPortalSelectionForm.controls['govMafBill'].setValue(formPatchingData?.govMafBill);
    this.paymentPortalSelectionForm.controls['avedanShulkFiveRupees'].setValue(formPatchingData?.avedanShulkFiveRupees);
    this.paymentPortalSelectionForm.controls['gstNumber'].setValue(formPatchingData?.gstNumber);
    this.paymentPortalSelectionForm.controls['gst'].setValue(formPatchingData?.sgst + formPatchingData?.cgst);
    this.paymentPortalSelectionForm.controls['accountNumber'].setValue('41697125613');
    this.paymentPortalSelectionForm.controls['bankName'].setValue("STATE BANK OF INDIA");
    this.paymentPortalSelectionForm.controls['paymentType'].setValue(formPatchingData?.paymentType);

  }

  onSanchaiPortalSubmit() {

    if (this.paymentPortalSelectionForm.invalid) {
      this.notificationService.error("Invalid Form !");
      return
    }

    if (this.invalidInputPaymentBoolean == true) {
      this.notificationService.error("Invalid Amount !");
      return
    }



    const rawDate = this.paymentPortalSelectionForm.get('date')?.value;
    const now = new Date();
    rawDate.setHours(now.getHours());
    rawDate.setMinutes(now.getMinutes()); const formatted = this.datePipe.transform(rawDate, 'dd-MMM-yyyy HH:mm');
    console.log(formatted); // 👉 "01-Jul-2025 17:16"


    const rawDateNew = this.paymentPortalSelectionForm.get('date')?.value;
    // const formattedNew = this.datePipe.transform(rawDateNew, 'dd-MM-yyyy');
    const formattedNew = this.datePipe.transform(rawDateNew, 'yyyy-MM-dd');



    // sanchai portal payload
    this.sanchaiPortalPaymentRequestmodelPayload.customerId = this.paymentPortalSelectionForm.value.applicationNumber

    this.sanchaiPortalPaymentRequestmodelPayload.dateOfPayment = formatted
    this.sanchaiPortalPaymentRequestmodelPayload.amount = this.paymentPortalSelectionForm.value.payableAmount
    this.sanchaiPortalPaymentRequestmodelPayload.mobileNo = this.paymentPortalSelectionForm.value.mobileNumber
    this.sanchaiPortalPaymentRequestmodelPayload.customerName = this.paymentPortalSelectionForm.value.consumerName
    this.sanchaiPortalPaymentRequestmodelPayload.dcCode = this.paymentPortalSelectionForm.value.dcCode
    this.sanchaiPortalPaymentRequestmodelPayload.deviceId = "DSP-PORTAL"
    this.sanchaiPortalPaymentRequestmodelPayload.paymentMode = this.paymentPortalSelectionForm.value.paymentMethod
    this.sanchaiPortalPaymentRequestmodelPayload.instrumentNo = this.paymentPortalSelectionForm.value.utrReference
    this.sanchaiPortalPaymentRequestmodelPayload.instrumentDate = formattedNew
    this.sanchaiPortalPaymentRequestmodelPayload.appVersion = null
    this.sanchaiPortalPaymentRequestmodelPayload.bankName = this.paymentPortalSelectionForm.value.bankName
    this.sanchaiPortalPaymentRequestmodelPayload.depositedAmount = this.paymentPortalSelectionForm.value.depositedAmount
    this.sanchaiPortalPaymentRequestmodelPayload.tds = this.tdsVariable
    this.sanchaiPortalPaymentRequestmodelPayload.gst = this.paymentPortalSelectionForm.value.gst
    this.sanchaiPortalPaymentRequestmodelPayload.bankAccNo = this.paymentPortalSelectionForm.value.accountNumber
    this.sanchaiPortalPaymentRequestmodelPayload.otherAmt = this.paymentPortalSelectionForm.value.otherAmount
    this.sanchaiPortalPaymentRequestmodelPayload.paymentType = this.paymentPortalSelectionForm.value.paymentType


    // #monika payload 
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.customerId = this.paymentPortalSelectionForm.value.applicationNumber
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.dateOfPayment = formatted
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.amount = this.paymentPortalSelectionForm.value.payableAmount
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.mobileNo = this.paymentPortalSelectionForm.value.mobileNumber
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.customerName = this.paymentPortalSelectionForm.value.consumerName
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.dcCode = this.paymentPortalSelectionForm.value.dcCode
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.deviceId = "DSP-PORTAL"
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.paymentMode = this.paymentPortalSelectionForm.value.paymentMethod
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.instrumentNo = this.paymentPortalSelectionForm.value.utrReference
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.instrumentDate = formattedNew
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.appVersion = null
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.bankName = this.paymentPortalSelectionForm.value.bankName
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.depositedAmount = this.paymentPortalSelectionForm.value.depositedAmount
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.tds = this.tdsVariable
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.gst = this.paymentPortalSelectionForm.value.gst
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.bankAccNo = this.paymentPortalSelectionForm.value.accountNumber
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.otherAmt = this.paymentPortalSelectionForm.value.otherAmount
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.aoRemark = null
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.rejectDate = null
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.aoDetail = null
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.paymentType = this.paymentPortalSelectionForm.value.paymentType
    this.paymentRequestOfSanchaiPortalAtDspPortalPayload.consumerApplicationNo = this.paymentPortalSelectionForm.value.applicationNumber


    console.log(this.sanchaiPortalPaymentRequestmodelPayload, "this.sanchaiPortalPaymentRequestmodelPayload......................");
    console.log(this.paymentRequestOfSanchaiPortalAtDspPortalPayload, "this.paymentRequestOfSanchaiPortalAtDspPortalPayload................");


    this.newApplicationService.sanchaiPortalPaymentRequestSubmit(this.sanchaiPortalPaymentRequestmodelPayload).subscribe((response: any) => {
      if (response?.code == "200") {
        this.newApplicationService.sanchayPaymentDataForDspPortal(this.paymentRequestOfSanchaiPortalAtDspPortalPayload).subscribe((resp: any) => {
          if (resp?.code == "201") {
            this.notificationService.success(resp?.message);
            this.payButtonEnableBoolean = true;
            this.onClose();
          } else {
            this.notificationService.warn(resp?.message);
            return
          }
        })
      } else {
        this.notificationService.warn(response?.message);
        return
      }
    })
  }


  dtsConfirmationCheckBoxNew(event: any) {
    console.log(event.checked, "event.......................................");



    if (event.checked == true) {

      if (this.consumerApplicationDetail?.applicationStatus?.applicationStatusId == 5) {
        this.tdsVariable = 0;
        // this.consumerPaymentDetailsss.txnAmount
        this.paymentPortalSelectionForm.controls['payableAmount'].setValue(this.roundCustom(this.consumerPaymentDetailsss.txnAmount));
      }
      else if (this.consumerApplicationDetail?.applicationStatus?.applicationStatusId == 12) {

        if (this.consumerApplicationDetail?.schemeType?.schemeTypeId == 1) {
          let tdsValue: number = this.roundCustom(parseFloat(((this.erpEstimateCalculations?.superVisionAmount * 2) / 100).toFixed(5)));
          this.tdsVariable = tdsValue
          this.paymentPortalSelectionForm.controls['payableAmount'].setValue(this.roundCustom(this.erpEstimateCalculations?.totalamountOfSupervision - parseFloat(((this.erpEstimateCalculations?.superVisionAmount * 2) / 100).toFixed(5))));

          if (this.natureOfWorkTypeId == 5) {
            // this.getOytMetarialDetailsWithCgstAndSgst()
          }
        } else {
          if (this.erpEstimateCalculations?.totalamountOfSupervision == null) {
            this.tdsVariable = this.roundCustom(parseFloat(((this.erpEstimateCalculations?.superVisionAmount * 2) / 100).toFixed(5)));
            this.paymentPortalSelectionForm.controls['payableAmount'].setValue(this.roundCustom(this.erpEstimateCalculations?.totaldepositAmount - parseFloat(((this.erpEstimateCalculations?.superVisionAmount * 2) / 100).toFixed(5))))
          } else if (this.erpEstimateCalculations?.totaldepositAmount == null) {
            this.tdsVariable = this.roundCustom(parseFloat(((this.erpEstimateCalculations?.superVisionAmount * 2) / 100).toFixed(5)));
            this.paymentPortalSelectionForm.controls['payableAmount'].setValue(this.roundCustom(this.erpEstimateCalculations?.totalamountOfSupervision - parseFloat(((this.erpEstimateCalculations?.superVisionAmount * 2) / 100).toFixed(5))))
          } else {

          }
        }

      }
      else if (this.consumerApplicationDetail?.applicationStatus?.applicationStatusId == 30) {

        if (this.consumerApplicationDetail?.schemeType?.schemeTypeId == 1) {
          // this.erpReviseData?.payAmt
          // erpReviseData?.remSupervisionAmt
          this.tdsVariable = parseFloat(((this.erpReviseData?.remSupervisionAmt * 2) / 100).toFixed(5))
          this.paymentPortalSelectionForm.controls['payableAmount'].setValue(this.roundCustom(this.erpReviseData?.payAmt - parseFloat(((this.erpReviseData?.remSupervisionAmt * 2) / 100).toFixed(5))));
        } else {
          this.tdsVariable = parseFloat(((this.erpReviseData?.remSupervisionAmt * 2) / 100).toFixed(5));
          this.paymentPortalSelectionForm.controls['payableAmount'].setValue(this.roundCustom(this.erpReviseData?.payAmt - parseFloat(((this.erpReviseData?.remSupervisionAmt * 2) / 100).toFixed(5))));
        }

      } else {

      }

      this.paymentPortalSelectionForm.controls['difference'].setValue(this.tdsVariable);
      this.onDepositedAmountInput(this.paymentPortalSelectionForm.value.depositedAmount);
      // **********************************************************************************************************************************************
    } else {
      this.tdsVariable = 0;

      if (this.consumerApplicationDetail?.applicationStatus?.applicationStatusId == 5) {
        // this.consumerPaymentDetailsss.txnAmount
        this.paymentPortalSelectionForm.controls['payableAmount'].setValue(this.roundCustom(this.consumerPaymentDetailsss.txnAmount));
      }
      else if (this.consumerApplicationDetail?.applicationStatus?.applicationStatusId == 12) {

        if (this.consumerApplicationDetail?.schemeType?.schemeTypeId == 1) {

          this.paymentPortalSelectionForm.controls['payableAmount'].setValue(this.roundCustom(this.erpEstimateCalculations?.totalamountOfSupervision));
        } else {
          if (this.erpEstimateCalculations?.totalamountOfSupervision == null) {
            this.paymentPortalSelectionForm.controls['payableAmount'].setValue(this.roundCustom(this.erpEstimateCalculations?.totaldepositAmount))
          } else if (this.erpEstimateCalculations?.totaldepositAmount == null) {
            this.paymentPortalSelectionForm.controls['payableAmount'].setValue(this.roundCustom(this.erpEstimateCalculations?.totalamountOfSupervision))
          } else {

          }
        }

      }
      else if (this.consumerApplicationDetail?.applicationStatus?.applicationStatusId == 30) {

        if (this.consumerApplicationDetail?.schemeType?.schemeTypeId == 1) {

          this.paymentPortalSelectionForm.controls['payableAmount'].setValue(this.roundCustom(this.erpReviseData?.payAmt));
        } else {
          this.paymentPortalSelectionForm.controls['payableAmount'].setValue(this.roundCustom(this.erpReviseData?.payAmt));
        }

      } else {

      }

      this.onDepositedAmountInput(this.paymentPortalSelectionForm.value.depositedAmount);
      this.paymentPortalSelectionForm.controls['difference'].setValue(0);
    }

  }

  onDepositedAmountInput(e: any) {
    console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeee");

    let a = e;
    let lengthOfA = a.toString().length;

    let b = this.paymentPortalSelectionForm.value.payableAmount;
    let lengthOfB = b.toString().length;
    if (lengthOfA >= lengthOfB) {

      if (e < this.paymentPortalSelectionForm.value.payableAmount) {
        this.paymentPortalSelectionForm.controls['otherAmount'].setValue(0);
        this.invalidInputPaymentBoolean = true;
        this.validInputPaymentBoolean = false;
        this.otherAmountShowBoolean = false;
      } else if (e == this.paymentPortalSelectionForm.value.payableAmount) {
        this.paymentPortalSelectionForm.controls['otherAmount'].setValue(0);
        this.validInputPaymentBoolean = true;
        this.invalidInputPaymentBoolean = false;
        this.otherAmountShowBoolean = true;
      } else if (e <= this.paymentPortalSelectionForm.value.payableAmount + 10) {
        this.paymentPortalSelectionForm.controls['otherAmount'].setValue(e - this.paymentPortalSelectionForm.value.payableAmount);
        this.validInputPaymentBoolean = true;
        this.invalidInputPaymentBoolean = false;
        this.otherAmountShowBoolean = true;
      } else {
        this.paymentPortalSelectionForm.controls['otherAmount'].setValue(0);
        this.invalidInputPaymentBoolean = true;
        this.validInputPaymentBoolean = false;
        this.otherAmountShowBoolean = false;
      }

    } else {
      this.invalidInputPaymentBoolean = true;
      this.validInputPaymentBoolean = false;
      this.otherAmountShowBoolean = false;
    }




  }

  downloadPDF() {
    this.yellowHideLine = true
    const options = {
      margin: 0.5,
      filename: 'demand-payment.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }


    };

    const content = this.htmlData.nativeElement;

    html2pdf()
      .set(options)
      .from(content)
      .save();

    setTimeout(() => {
      this.yellowHideLine = false;
    }, 3000);


  }

  roundCustom(value: number): number {
    const decimalPart = value - Math.floor(value);
    if (decimalPart >= 0.5) {
      return Math.floor(value) + 1;
    } else {
      return Math.floor(value);
    }
  }


  async ngOnInit() {
    console.log(
      "Demand Fee Payment Details !!shamshad***************************!!!! , ngOnInit ",
      this.data
    );
    console.log("this.consumerApplicationNo::::", this.consumerApplicationNo);
    console.log(this.natureOfWorkTypeId, "this.natureOfWorkTypeId.......");
    if (this.consumerApplicationDetail?.applicationStatus?.applicationStatusId == 5) {

      this.http.post(this.consumerContextPath + "/bill-desk/billPaymentProcess", { consumerAppllicationNo: this.consumerApplicationNo, "isTdsTaken": false }).subscribe((consumerPaymentData: any) => {
        console.log("consumer PaymentData *******", consumerPaymentData);
        if (consumerPaymentData["code"] == "200") {
          // this.consumerPaymentData = consumerPaymentData['list'][1];
          // console.log('consumervPayment Data BY List 0', this.consumerPaymentData);
          this.consumerPaymentDetailsss = consumerPaymentData["list"][0];
          console.log(
            " consumer Payment Data BY List 1",
            this.consumerPaymentDetailsss
          );
          console.log(
            "this consumer Payment Detailsss txn Amount",
            this.consumerPaymentDetailsss.txnAmount
          );

          if (this.consumerApplicationDetail?.avedakKaPrakar == 'Government') {

            this.paymentPortalSelectionForm.controls['payableAmount'].setValue(this.roundCustom(this.consumerPaymentDetailsss.txnAmount));
          }

          this.billPaymentService.consumerPaymentDataDetails(this.consumerPaymentDetailsss?.billdeskPaymentRequestId).subscribe((sdk: any) => {
            console.log("sdk Details for consumer", sdk);
            if (sdk["code"] == "200") {
              this.sdkDetails = sdk["list"][0];
              console.log("sdk Details By list", this.sdkDetails);
              console.log("this.sdkDetails.bdorderid", this.sdkDetails.bdorderid);
              console.log(
                "this.sdkDetails.authorizationToken",
                this.sdkDetails.authorizationToken
              );
              this.oid = this.sdkDetails.bdorderid;
              this.authTok = this.sdkDetails.authorizationToken;
              console.log(
                this.oid,
                "",
                this.authTok,
                "oooooooooooooooooooooooooooooooooooooooooooooooooooo66666666666666666666666666666666666666666666666666666666"
              );
            } else if (sdk["code"] == "406") {
              this.notificationService.error("Decimal Value Not Allowed For Payment");
              return
            } else {
              this.notificationService.error("Something went wrong !");
              return
            }
          }, (error: any) => {
            this.notificationService.error(error);
          })
          // this.newOid = this.consumerPaymentDetailsss.orderId;
          // this.newAuthTok = this.consumerPaymentDetailsss.tokenId;
          this.amount = Number(this.consumerPaymentDetailsss.txnAmount);
        } else if (consumerPaymentData["code"] == "406") {
          this.notificationService.error("Payment cannot be processed as you have already made a request within the last 5 minutes.");
          return;
        } else {
          this.notificationService.error(consumerPaymentData["message"]);
          return;
        }

        console.log(
          this.consumerApplicationDetail?.consumerApplicationId,
          "this.erp"
        );

      }, (error: any) => {
        console.log(error.error.message);

        this.notificationService.warn(error.error.message);
        return
      })

    } else {

      ///********************************************************************************************************************************************************************************************************************************************************************* */

      if (this.consumerApplicationDetail?.applicationStatus?.applicationStatusId == 30) {

        this.billPaymentService.getErpRevisedData(JSON.parse(this.consumerApplicationDetail.revisedErpNumber), this.consumerApplicationDetail.consumerApplicationNo, 1).subscribe((response: any) => {
          console.log(response, "response...response");
          if (response?.code == "200") {
            this.erpReviseData = response.list[0];
            this.notificationService.success("! Data Retrieve Successfully")
            console.log(this.erpReviseData, "erpReviseData............");
            this.openTableBoolean = true

            if (this.consumerApplicationDetail?.avedakKaPrakar == 'Government') {
              this.paymentPortalSelectionForm.controls['payableAmount'].setValue(this.roundCustom(this.erpReviseData?.payAmt));
            }

            if (this.natureOfWorkTypeId == 8) {
              if (this.erpReviseData?.remSupervisionAmt >= 250000) {
                this.Act51SownBoolean = true;
              } else {
                this.Act51SownBoolean = false;
              }
            } else {
              if (this.consumerApplicationDetail?.schemeType?.schemeTypeId == 1 || this.consumerApplicationDetail?.schemeType?.schemeTypeId == 2) {
                if (this.erpReviseData?.remSupervisionAmt >= 250000) {
                  this.Act51SownBoolean = true;
                } else {
                  this.Act51SownBoolean = false;
                }

              } else {

              }

            }

          } else {
            this.openTableBoolean = false;
            this.erpReviseData = null;
            this.notificationService.error("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
            return
          }
        });

        if (this.natureOfWorkTypeId == 8) {
          this.mkmyPaymentService.getMkmyOidAndAuthToken({
            "consumerAppllicationNo": this.consumerApplicationNo
          }).subscribe((resp: any) => {
            console.log(resp, "mkmy.....reessppp.............");
            if (resp.code == "200") {
              this.oidAndAuthTokenData = resp.list[0];

              this.billPaymentService.getOIDtOKENforMkmy(resp.list[0].billdeskPaymentRequestId).subscribe((sdk: any) => {
                console.log("sdk Details for consumer", sdk);
                if (sdk["code"] == "200") {
                  this.sdkDetails = sdk["list"][0];
                  console.log("sdk Details By list", this.sdkDetails);
                  console.log("this.sdkDetails.bdorderid", this.sdkDetails.bdorderid);
                  console.log(
                    "this.sdkDetails.authorizationToken",
                    this.sdkDetails.authorizationToken
                  );
                  this.oid = this.sdkDetails.bdorderid;
                  this.authTok = this.sdkDetails.authorizationToken;
                  console.log(
                    this.oid,
                    "",
                    this.authTok,
                    "oooooooooooooooooooooooooooooooooooooooooooooooooooo66666666666666666666666666666666666666666666666666666666"
                  );
                } else if (sdk["code"] == "406") {
                  this.notificationService.error("Decimal Value Not Allowed For Payment");
                  return
                } else {
                  this.notificationService.error("Something went wrong !");
                  return
                }
              })
            }
          });
        } else {

          let consumerPaymentData = await this.http.post(this.consumerContextPath + "/bill-desk/billPaymentProcess", { consumerAppllicationNo: this.consumerApplicationNo, "isTdsTaken": false }).toPromise();
          console.log("consumer PaymentData *******", consumerPaymentData);
          if (consumerPaymentData["code"] == "200") {
            // this.consumerPaymentData = consumerPaymentData['list'][1];
            // console.log('consumervPayment Data BY List 0', this.consumerPaymentData);
            this.consumerPaymentDetailsss = consumerPaymentData["list"][0];
            console.log(
              " consumer Payment Data BY List 1",
              this.consumerPaymentDetailsss
            );
            console.log(
              "this consumer Payment Detailsss txn Amount",
              this.consumerPaymentDetailsss.txnAmount
            );

            this.billPaymentService.consumerPaymentDataDetails(this.consumerPaymentDetailsss?.billdeskPaymentRequestId).subscribe((sdk: any) => {
              console.log("sdk Details for consumer", sdk);
              if (sdk["code"] == "200") {
                this.sdkDetails = sdk["list"][0];
                console.log("sdk Details By list", this.sdkDetails);
                console.log("this.sdkDetails.bdorderid", this.sdkDetails.bdorderid);
                console.log(
                  "this.sdkDetails.authorizationToken",
                  this.sdkDetails.authorizationToken
                );
                this.oid = this.sdkDetails.bdorderid;
                this.authTok = this.sdkDetails.authorizationToken;
                console.log(
                  this.oid,
                  "",
                  this.authTok,
                  "oooooooooooooooooooooooooooooooooooooooooooooooooooo66666666666666666666666666666666666666666666666666666666"
                );
              } else if (sdk["code"] == "406") {
                this.notificationService.error("Decimal Value Not Allowed For Payment");
                return
              } else {
                this.notificationService.error("Something went wrong !");
                return
              }
            })


            // this.newOid = this.consumerPaymentDetailsss.orderId;
            // this.newAuthTok = this.consumerPaymentDetailsss.tokenId;
            this.amount = Number(this.consumerPaymentDetailsss.txnAmount);
          }

          console.log(
            this.consumerApplicationDetail.consumerApplicationId,
            "this.erp"
          );

          // let erpEstimateCalculations = await this.http.get(this.erp + "/erpEstimateCalculations/" + this.consumerApplicationDetail.consumerApplicationId).toPromise();
          // console.log(erpEstimateCalculations, "erpEstimateCalculations&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
          // if (erpEstimateCalculations["code"] == "200") {
          //   this.erpEstimateCalculations = erpEstimateCalculations["list"][0];
          //   console.log("erpEstimateCalculations----", this.erpEstimateCalculations);
          // }


          // let sdk = await this.http.get(this.consumerContextPath + "/bill-desk/billPaymentsProcess/" + this.consumerPaymentDetailsss?.billdeskPaymentRequestId).toPromise();
          // console.log("sdk Details for consumer", sdk);
          // if (sdk["code"] == "200") {
          //   this.sdkDetails = sdk["list"][0];
          //   console.log("sdk Details By list", this.sdkDetails);
          //   console.log("this.sdkDetails.bdorderid", this.sdkDetails.bdorderid);
          //   console.log(
          //     "this.sdkDetails.authorizationToken",
          //     this.sdkDetails.authorizationToken
          //   );
          //   this.oid = this.sdkDetails.bdorderid;
          //   this.authTok = this.sdkDetails.authorizationToken;
          //   console.log(
          //     this.oid,
          //     "",
          //     this.authTok,
          //     "oooooooooooooooooooooooooooooooooooooooooooooooooooo66666666666666666666666666666666666666666666666666666666"
          //   );
          // }


        }




      }

      else {
        if (this.natureOfWorkTypeId == 8) {
          this.mkmyPaymentService.getMkmyAmountByConsumerApplicationNumber(this.consumerApplicationNo).subscribe((data: any) => {
            console.log(data, "mkmy...data..................");
            if (data.code == "200") {
              this.mkmyAmountData = data.list[0];

              if (this.mkmyAmountData?.remSupervisionAmt >= 250000) {
                this.Act51SownBoolean = true;
              } else {
                this.Act51SownBoolean = false
              }

              this.newApplicationService.getErpDetailsByErpNumber(JSON.parse(this.mkmyAmountData.erpNumber), this.consumerApplicationNo).subscribe((data: any) => {
                console.log(data, "Mkmy........Data.....................");
                if (data.code == "200") {
                  this.erpEstimateDataForMkmyArray = data.list;
                  // this.mkmyerpConfirmationVariable = true
                  // this.erpNoOfMkmyVariable = this.applicationServeyErpFgOfMkmy.value.erpNo;
                  this.notificationService.success("Data retrive Successfully");
                } else {
                  this.notificationService.warn("something went wrong !");
                  return;
                }
                // this.erpEstimateDataForMkmyArray = data.list[0];
                // this.mkmyerpConfirmationVariable = true
                // this.erpNoOfMkmyVariable = this.applicationServeyErpFgOfMkmy.value.erpNo

              })


            }


          });


          this.mkmyPaymentService.getMkmyOidAndAuthToken({
            "consumerAppllicationNo": this.consumerApplicationNo, "isTdsTaken": false
          }).subscribe((resp: any) => {
            console.log(resp, "mkmy.....reessppp.............");
            if (resp.code == "200") {
              this.oidAndAuthTokenData = resp.list[0];

              this.billPaymentService.getOIDtOKENforMkmy(resp.list[0].billdeskPaymentRequestId).subscribe((sdk: any) => {
                console.log("sdk Details for consumer", sdk);
                if (sdk["code"] == "200") {
                  this.sdkDetails = sdk["list"][0];
                  console.log("sdk Details By list", this.sdkDetails);
                  console.log("this.sdkDetails.bdorderid", this.sdkDetails.bdorderid);
                  console.log(
                    "this.sdkDetails.authorizationToken",
                    this.sdkDetails.authorizationToken
                  );
                  this.oid = this.sdkDetails.bdorderid;
                  this.authTok = this.sdkDetails.authorizationToken;
                  console.log(
                    this.oid,
                    "",
                    this.authTok,
                    "oooooooooooooooooooooooooooooooooooooooooooooooooooo66666666666666666666666666666666666666666666666666666666"
                  );
                } else if (sdk["code"] == "406") {
                  this.notificationService.error("Decimal Value Not Allowed For Payment");
                  return
                } else {
                  this.notificationService.error("Something went wrong !");
                  return
                }
              })
            }
          });



        }
        else {

          console.log(this.tdsOninitBoolean, "this.tdsOninitBoolean..................this.tdsOninitBoolean");

          if (this.tdsOninitBoolean == false) {
            let erpEstimateCalculations = await this.http.get(this.erp + "/erpEstimateCalculations/" + this.consumerApplicationDetail.consumerApplicationId).toPromise();
            console.log(erpEstimateCalculations, "erpEstimateCalculations&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
            if (erpEstimateCalculations["code"] == "200") {
              this.erpEstimateCalculations = erpEstimateCalculations["list"][0];
              console.log("erpEstimateCalculations----", this.erpEstimateCalculations);


              //////////////////////////////////////////////////////////////payment for sachai portal////////////////////////////////////////////////////////////////////////////////
              if (this.consumerApplicationDetail?.avedakKaPrakar == 'Government') {

                if (this.consumerApplicationDetail?.schemeType?.schemeTypeId == 1) {
                  // let tdsValue: number = parseFloat(((this.erpEstimateCalculations?.superVisionAmount * 2) / 100).toFixed(5));
                  console.log(this.erpEstimateCalculations?.totalamountOfSupervision, "this.erpEstimateCalculations?.totalamountOfSupervision.......");
                  this.paymentPortalSelectionForm.controls['payableAmount'].setValue(this.roundCustom(this.erpEstimateCalculations?.totalamountOfSupervision));
                  console.log(this.paymentPortalSelectionForm.value.payableAmount);


                } else {

                  if (this.erpEstimateCalculations?.totalamountOfSupervision == null) {
                    this.paymentPortalSelectionForm.controls['payableAmount'].setValue(this.roundCustom(this.erpEstimateCalculations?.totaldepositAmount));
                  } else if (this.erpEstimateCalculations?.totaldepositAmount == null) {
                    this.paymentPortalSelectionForm.controls['payableAmount'].setValue(this.roundCustom(this.erpEstimateCalculations?.totalamountOfSupervision));
                  } else {

                  }

                }

                //this.paymentPortalSelectionForm.controls['payableAmount'].setValue(this.erpEstimateCalculations?.superVisionAmount);
              }



              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

              // *************************************** ///
              if (this.consumerApplicationDetail?.schemeType?.schemeTypeId == 1) {
                if (this.erpEstimateCalculations?.superVisionAmount >= 250000) {
                  this.Act51SownBoolean = true;
                } else {
                  this.Act51SownBoolean = false;
                }
                //this.Act51SownBoolean = true;
              }
              else if (this.consumerApplicationDetail?.schemeType?.schemeTypeId == 2) {
                if (this.erpEstimateCalculations?.superVisionAmount >= 250000) {
                  this.Act51SownBoolean = true;
                } else if (this.erpEstimateCalculations?.superVisionAmount < 250000) {
                  this.Act51SownBoolean = false
                } else {
                  this.Act51SownBoolean = false
                }
              }
              //********************************************* */

              let consumerPaymentData = await this.http.post(this.consumerContextPath + "/bill-desk/billPaymentProcess", { consumerAppllicationNo: this.consumerApplicationNo, "isTdsTaken": false }).toPromise();
              console.log("consumer PaymentData *******", consumerPaymentData);
              if (consumerPaymentData["code"] == "200") {
                // this.consumerPaymentData = consumerPaymentData['list'][1];
                // console.log('consumervPayment Data BY List 0', this.consumerPaymentData);
                this.consumerPaymentDetailsss = consumerPaymentData["list"][0];
                console.log(
                  " consumer Payment Data BY List 1",
                  this.consumerPaymentDetailsss
                );
                console.log(
                  "this consumer Payment Detailsss txn Amount",
                  this.consumerPaymentDetailsss.txnAmount
                );

                this.billPaymentService.consumerPaymentDataDetails(this.consumerPaymentDetailsss?.billdeskPaymentRequestId).subscribe((sdk: any) => {
                  console.log("sdk Details for consumer", sdk);
                  if (sdk["code"] == "200") {
                    this.sdkDetails = sdk["list"][0];
                    console.log("sdk Details By list", this.sdkDetails);
                    console.log("this.sdkDetails.bdorderid", this.sdkDetails.bdorderid);
                    console.log(
                      "this.sdkDetails.authorizationToken",
                      this.sdkDetails.authorizationToken
                    );
                    this.oid = this.sdkDetails.bdorderid;
                    this.authTok = this.sdkDetails.authorizationToken;
                    console.log(
                      this.oid,
                      "",
                      this.authTok,
                      "oooooooooooooooooooooooooooooooooooooooooooooooooooo66666666666666666666666666666666666666666666666666666666"
                    );
                  } else if (sdk["code"] == "406") {
                    this.notificationService.error("Decimal Value Not Allowed For Payment");
                    return
                  } else {
                    this.notificationService.error("Something went wrong !");
                    return
                  }
                })
                // this.newOid = this.consumerPaymentDetailsss.orderId;
                // this.newAuthTok = this.consumerPaymentDetailsss.tokenId;
                this.amount = Number(this.consumerPaymentDetailsss.txnAmount);
              }

              console.log(
                this.consumerApplicationDetail?.consumerApplicationId,
                "this.erp"
              );
            }

          } else {

            let consumerPaymentData = await this.http.post(this.consumerContextPath + "/bill-desk/billPaymentProcess", { consumerAppllicationNo: this.consumerApplicationNo, "isTdsTaken": true }).toPromise();
            console.log("consumer PaymentData *******", consumerPaymentData);
            if (consumerPaymentData["code"] == "200") {
              // this.consumerPaymentData = consumerPaymentData['list'][1];
              // console.log('consumervPayment Data BY List 0', this.consumerPaymentData);
              this.consumerPaymentDetailsss = consumerPaymentData["list"][0];
              console.log(
                " consumer Payment Data BY List 1",
                this.consumerPaymentDetailsss
              );
              console.log(
                "this consumer Payment Detailsss txn Amount",
                this.consumerPaymentDetailsss.txnAmount
              );

              this.billPaymentService.consumerPaymentDataDetails(this.consumerPaymentDetailsss?.billdeskPaymentRequestId).subscribe((sdk: any) => {
                console.log("sdk Details for consumer", sdk);
                if (sdk["code"] == "200") {
                  this.sdkDetails = sdk["list"][0];
                  console.log("sdk Details By list", this.sdkDetails);
                  console.log("this.sdkDetails.bdorderid", this.sdkDetails.bdorderid);
                  console.log(
                    "this.sdkDetails.authorizationToken",
                    this.sdkDetails.authorizationToken
                  );
                  this.oid = this.sdkDetails.bdorderid;
                  this.authTok = this.sdkDetails.authorizationToken;
                  console.log(
                    this.oid,
                    "",
                    this.authTok,
                    "oooooooooooooooooooooooooooooooooooooooooooooooooooo66666666666666666666666666666666666666666666666666666666"
                  );
                } else if (sdk["code"] == "406") {
                  this.notificationService.error("Decimal Value Not Allowed For Payment");
                  return
                } else {
                  this.notificationService.error("Something went wrong !")
                  return
                }
              })
              // this.newOid = this.consumerPaymentDetailsss.orderId;
              // this.newAuthTok = this.consumerPaymentDetailsss.tokenId;
              this.amount = Number(this.consumerPaymentDetailsss.txnAmount);
            }

            console.log(
              this.consumerApplicationDetail?.consumerApplicationId,
              "this.erp"
            );
          }


        }
      }

      ///********************************************************************************************************************************************************************************************************************************************************************************** */
    }



    this.tdsFormBuild();

    // if(this.tdsOninitBoolean==true){
    //   this.mkmyPaymentService.paymentDetailsAfterTds(this.consumerApplicationNo).subscribe((res:any)=>{
    //     console.log(res,"resssssssssssssssss.............................................");
    //     if(res.code=="200"){
    //     this.paymentDetailAfterTds = res.list[0];
    //     console.log(this.paymentDetailAfterTds,"neeewwwww   tttttaaaabbbbbblllleeeeeee...................this.paymentDetailAfterTds");

    //     }else{
    //       this.notificationService.error("something went wrong !");
    //       return
    //     }

    //   },
    //   (error:any)=>{
    //     console.log(error,"error.............................................");

    //   }
    //   )
    // }


  }


  tdsFormBuild() {
    this.tdsForm = this.fb.group({
      selection194j: ['', Validators.required],

    })
  }

  dtsConfirmationCheckBox(c: any) {
    console.log(c.checked, "ccccccccccccc");
    this.tdsConfirmedBoolean = c.checked;
    if (c.checked == true) {
      //this.tdsFormBuild();
      this.payButtonBoolean = true;
      if (this.consumerApplicationDetail?.schemeType?.schemeTypeId == 1) {
        this.section194J = true;
        this.section194C = null;
        this.tds2 = 'true';
        this.tds10 = null
      } else {
        this.section194J = null;
        this.section194C = true;
        this.tds2 = null;
        this.tds10 = null
      }
    } else {
      this.payButtonBoolean = false;
    }
    // this.radioGroup.value = null;
  }

  under194jCheckBox(e: any) {
    console.log(e.checked, "eeeeeeeeeeeeeeeeeeeeeeee");
    this.underSelection194jBoolean = e.checked
    if (this.underSelection194jBoolean == true) {

      let formData: FormData = new FormData();
      formData.append("consumerAppNo", this.consumerApplicationNo);
      formData.append("section194", "true");
      formData.append("section51", null);
      formData.append("tds2", "true");
      formData.append("tds10", null);
      this.tdsSubmitPayload = formData
    } else {
      let formData: FormData = new FormData();
      this.tdsSubmitPayload = formData
    }

  }

  resetSelection(radioGroup: MatRadioGroup) {
    // radioGroup.value = null;
    // Or radioGroup.value = '';


  }
  matButtonChange(e: any) {
    console.log(e, "mmaattttbbbuuuuttttoooonnnnn.............");
    console.log(this.tdsForm.value, "this.tdsForm.value..............");
    this.tdsForm.controls['selection194j'].setValidators(Validators.required);
    this.tdsForm.controls['radioOtion'].setValidators(Validators.required);
    this.tdsForm.controls['cgstSgstAct'].clearValidators;
    this.tdsForm.controls['selection194j'].updateValueAndValidity();
    this.tdsForm.controls['radioOtion'].updateValueAndValidity();
    this.tdsForm.controls['cgstSgstAct'].updateValueAndValidity();
    console.log(this.tdsForm, "this.tdsForm.value..............");

  }
  onSection194JSelect(e: any) {
    console.log(e, "eeeeee...................");

  }

  OnXyzSelect(e: any) {
    console.log(e, "eeeeee.............................");

  }

  onTdsSubmit() {

    // consumerAppNo:any,section194j:any,section194C:any,section51:any,tds10:any,tds2:any

    this.mkmyPaymentService.tdsSubmitPostApi(this.consumerApplicationNo, this.section194J, this.section194C, null, this.tds10, this.tds2).subscribe((respo: any) => {
      console.log(respo, "respo.....................");
      if (respo?.code == "201") {
        this.notificationService.success(respo.message);
        this.mkmyPaymentService.paymentDetailsAfterTds(this.consumerApplicationNo).subscribe((res: any) => {
          console.log(res, "resssssssssssssssss.............................................");
          if (res.code == "200") {
            this.paymentDetailAfterTds = res.list[0];
            this.notificationService.success(res.message);
            console.log(this.paymentDetailAfterTds, "neeewwwww   tttttaaaabbbbbblllleeeeeee...................this.paymentDetailAfterTds");
            // 
            this.tdsOninitBoolean = true;
            this.payButtonBoolean = false
            this.ngOnInit();
          } else {
            this.tdsOninitBoolean = false;
            this.notificationService.error(res.message);
            return
          }

        },
          (error: any) => {
            console.log(error, "error.............................................");
            this.notificationService.error("Something went wrong !");
            return
          }
        )

      } else {
        this.payButtonBoolean = true
        this.notificationService.warn(respo.message);
        return
      }
    })
    // }

  }


  submitBillDetail() {
    this.paymentButtonClick = true;

    //   let oidd=undefined
    //   let authTokken = undefined
    //   //    window.open("http://localhost:4200/deposit-scheme/SDKUAt.html?oid="+this.oid+"&aut="+this.authTok, "_blank", "popup=yes");
    //   // forproduction
    //      window.open("https://dsp.mpcz.in:8888/deposit-scheme/SDKUAt.html?oid=" + this.oid + "&aut=" + this.authTok, "_blank", "popup=yes");
    //   // for rooftop uat
    //    window.open("https://rooftop-uat.mpcz.in:8888/deposit-scheme/SDKUAt.html?oid=" + this.oid + "&aut=" + this.authTok, "_blank", "popup=yes");

    if (this.oid != undefined && this.authTok != undefined) {
      this.yellowHideLine = true;
      this.downloadPdf()
      // alert("hii");
    }

    if (this.url.initialBasUrl == 'https://rooftop-uat.mpcz.in:8888') {
      window.open("assets/images/sdk-uat/SDKUAt.html?oid=" + this.oid + "&aut=" + this.authTok, "_blank", "popup=yes")
    } else if (this.url.initialBasUrl == 'https://dsp.mpcz.in:8888') {
      window.open("assets/images/sdk-prod/SDKUAt.html?oid=" + this.oid + "&aut=" + this.authTok, "_blank", "popup=yes")
    } else {

    }

  }

  private sendToPayu() { }

  onClose() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    console.log("ngOnDestroy call !!!");
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  downloadPdf() {

    const options = {
      margin: 0.5,
      filename: `Application-Demand(${this.consumerApplicationNo}).pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    const content = this.htmlData.nativeElement;

    // Generate the PDF and handle the Blob
    html2pdf()
      .set(options)
      .from(content)
      .save()
      .toPdf() // Ensure PDF generation
      .outputPdf('blob') // Get the PDF as a Blob
      .then((pdfBlob: Blob) => {
        console.log(pdfBlob, 'Generated PDF Blob');

        // Prepare form data for upload
        const formDataNew: FormData = new FormData();
        formDataNew.append('docDemandNote', pdfBlob, `Application-Demand(${this.consumerApplicationNo}).pdf`); // Add a filename for clarity
        formDataNew.append(
          'consumerApplicationNo',
          this.consumerApplicationNo || ''
        );

        // Upload the form data via the service
        this.newApplicationService.uploadDemand(formDataNew, this.token).subscribe({
          next: (res: any) => {
            if (res?.code == "200") {
              console.log(res, 'Upload response');
              if (this.url.initialBasUrl == 'https://rooftop-uat.mpcz.in:8888') {
                window.open("assets/images/sdk-uat/SDKUAt.html?oid=" + this.oid + "&aut=" + this.authTok, "_blank", "popup=yes")
              } else if (this.url.initialBasUrl == 'https://dsp.mpcz.in:8888') {
                window.open("assets/images/sdk-prod/SDKUAt.html?oid=" + this.oid + "&aut=" + this.authTok, "_blank", "popup=yes")
              } else {

              }
            } else {
              this.notificationService.warn(res?.message);
              return
            }

          },
          error: (err: any) => {
            console.error('Error uploading work order:', err);
          },
        });
      })
      .catch((error) => {
        console.error('Error generating or uploading PDF:', error);
      });


  }


  onMeterialItemDetails() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = '70vh';
    dialogConfig.data = { consumerApplicationNo: this.consumerApplicationNo };
    const dialogRef = this.dialog.open(MeterialItemCostDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  getOytMetarialDetailsWithCgstAndSgst() {
    this.newApplicationService.getOytMetarialDetailsWithCgstAndSgst(this.consumerApplicationNo).subscribe((resp: any) => {
      if (resp?.code == "200") {
        this.underLineOytDataTable = resp?.list;
      }
    })
  }

}
