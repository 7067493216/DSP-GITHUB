



// <form class="form" method="post"  id="myForm">
//   <div class="row">
    
//         <div class="col-md-4">
//             <div class="form-group">
//                 <label for="applicationNumber">Application Number:</label>
//                 <input type="text" class="form-control" name="customerId" id="applicationNumber" value="<?php echo $data['applicationNumber']; ?>" readonly>
//             </div>
//         </div>

//         <div class="col-md-4">
//             <div class="form-group">
//                 <label for="address1">Address:</label>
//                 <input type="text" class="form-control" name="address1" id="address1" value="<?php echo $data['address1']; ?>" readonly>
//             </div>
//         </div>

//         <div class="col-md-4">
//             <div class="form-group">
//                 <label for="consumerName">Consumer Name:</label>
//                 <input type="text" class="form-control" name="customerName" id="consumerName" value="<?php echo $data['consumerName']; ?>" readonly>
//             </div>
//         </div>

//   </div>


// <div class="row">

//     <div class="col-md-4">
//         <div class="form-group">
//             <label for="mobileNumber">Mobile Number:</label>
//             <input type="text" class="form-control" name="mobileNo" id="mobileNumber" value="<?php echo $data['mobileNumber']; ?>" readonly>
//         </div>
//     </div>

//     <div class="col-md-4">
//         <div class="form-group">
//             <label for="city">City:</label>
//             <input type="text" class="form-control" name="city" id="city" value="<?php echo $data['city']; ?>" readonly>
//         </div>
//     </div>

//     <div class="col-md-4">
//         <div class="form-group">
//             <label for="dc">DC:</label>
//             <input type="text" class="form-control" name="dcCode" id="dc" value="<?php echo $data['dc']; ?>" readonly>
//         </div>
//     </div>

// </div>

// <div class="row">

//         <div class="col-md-4">
//             <div class="form-group">
//                 <label for="dcCode">DC Code:</label>
//                 <input type="text" class="form-control" name="dcCode" id="dcCode" value="<?php echo $data['ngbDcCode']; ?>" readonly>
//             </div>
//         </div>

//         <div class="col-md-4">
//             <div class="form-group">
//                 <label for="cgst">CGST:</label>
//                 <input type="text" class="form-control" name="cgst" id="cgst" value="<?php echo $data['cgst']; ?>" readonly>
//             </div>
//         </div>

//         <div class="col-md-4">
//             <div class="form-group">
//                 <label for="sgst">SGST:</label>
//                 <input type="text" class="form-control" name="sgst" id="sgst" value="<?php echo $data['sgst']; ?>" readonly>
//             </div>
//         </div>

// </div>

// <div class="row">

//         <div class="col-md-4">
//             <div class="form-group">
//                 <label for="superVisionAmount">Supervision Amount:</label>
//                 <input type="text" class="form-control" name="superVisionAmount" id="superVisionAmount" value="<?php echo $data['superVisionAmount']; ?>" readonly>
//             </div>
//         </div>

//         <div class="col-md-4">
//             <div class="form-group">
//                 <label for="depositAmount">Deposit Amount:</label>
//                 <input type="text" class="form-control" name="depositAmount" id="depositAmount" value="<?php echo $data['depositAmount']; ?>" readonly>
//             </div>
//         </div>

//         <div class="col-md-4">
//             <div class="form-group">
//                 <label for="systemDevelopmentCharge">System Development Charge:</label>
//                 <input type="text" class="form-control" name="systemDevelopmentCharge" id="systemDevelopmentCharge" value="<?php echo $data['systemDevelopmentCharge']; ?>" readonly>
//             </div>
//         </div>

// </div>

// <div class="row">

//         <div class="col-md-4">
//             <div class="form-group">
//                 <label for="supplyAffordingCharge">Supply Affording Charge:</label>
//                 <input type="text" class="form-control" name="supplyAffordingCharge" id="supplyAffordingCharge" value="<?php echo $data['supplyAffordingCharge']; ?>" readonly>
//             </div>
//         </div>

//         <div class="col-md-4">
//             <div class="form-group">
//                 <label for="colonyOrSlum">Colony or Slum:</label>
//                 <input type="text" class="form-control" name="colonyOrSlum" id="colonyOrSlum" value="<?php echo $data['colonyOrSlum']; ?>" readonly>
//             </div>
//         </div>

//         <div class="col-md-4">
//             <div class="form-group">
//                 <label for="jeReturnAmount">JE Return Amount:</label>
//                 <input type="text" class="form-control" name="jeReturnAmount" id="jeReturnAmount" value="<?php echo $data['jeReturnAmount']; ?>" readonly>

//                 <input type="hidden" class="form-control" name="ngbDcCode" id="ngbDcCode" value="<?php echo $data['ngbDcCode']; ?>" readonly>
        
//             </div>
//         </div>


// </div>

// <div class="row">

//         <div class="col-md-4">
//             <div class="form-group">

//             <label for="totalBalanceSupervisionAmount">Total Balance <?php
//             if ($data['applicationType'] == "Deposit") {
//                 echo "Deposit";
//             } else if ($data['applicationType'] == "Supervision") {
//                 echo "Supervision";
//             } else if (!empty($data['payableAmount']) && $data['payableAmount'] != NULL) {
//                 echo "MKMY";
//             }
//         ?> Amount:</label>

//                     <input type="text" class="form-control" name="totalBalanceSupervisionAmount" id="totalBalanceSupervisionAmount" value="<?php
//             if ($data['applicationType'] == "Deposit") {
//                 echo $data['totalBalanceDepositAmount'];
//             } else if ($data['applicationType'] == "Supervision") {
//                 echo $data['totalBalanceSupervisionAmount'];
//             } else if (!empty($data['payableAmount']) && $data['payableAmount'] != NULL) {
//                 echo $data['mkmyTotalAmount'];
//             }
//         ?>" readonly>
//             </div>
//         </div>


//         <div class="col-md-4">
//             <div class="form-group">
//                 <label for="govMafBill">Gov MAF Bill:</label>
//                 <input type="text" class="form-control" name="govMafBill" id="govMafBill" value="<?php echo $data['govMafBill']; ?>" readonly>
//             </div>
//         </div>

//         <div class="col-md-4">
//             <div class="form-group">
//                 <label for="mpmkMafBill">MPMK MAF Bill:</label>
//                 <input type="text" class="form-control" name="mpmkMafBill" id="mpmkMafBill" value="<?php echo $data['mpmkMafBill']; ?>" readonly>
//             </div>
//         </div>


// </div>


// <div class="row">

//         <div class="col-md-4">
//             <div class="form-group">
//                 <label for="avedanShulk">Avedan Shulk:</label>
//                 <input type="text" class="form-control" name="avedanShulk" id="avedanShulk" value="<?php echo $data['avedanShulk']; ?>" readonly>
//             </div>
//         </div>

//         <div class="col-md-4">
//             <div class="form-group">
//                 <label for="avedanShulk">Avedan Shulk Five Rupees:</label>
//                 <input type="text" class="form-control" name="avedanShulkFiveRupees" id="avedanShulkFiveRupees" value="<?php echo $data['avedanShulkFiveRupee'] ?? '' ?>" readonly>
//             </div>
//         </div>


//         <div class="col-md-4">
//             <div class="form-group">
//                 <label for="avedanShulk">Security Deposit:</label>
//                 <input type="text" class="form-control" name="securityDeposit" id="securityDeposit" value="<?php echo $data['mkmySecurityDeposit'] ?? ''  ?>" readonly>
//             </div>
//         </div>


// </div>

// <div class="row">

//         <div class="col-md-4">
//         <div class="form-group">
//         <label for="difference">Difference:</label>
//         <input type="text" name="diff_payable_and_deposit" id="diff_payable_and_deposit" class="form-control"   readonly>
//         </div>
//         </div>


//         <div class="col-md-4">
//             <div class="form-group">
//                 <label for="payableAmount">Payable Amount:</label>
//                 <input type="text" class="form-control" name="amount" id="payableAmount" value="<?php echo $data['dsSvMkPayAmount']; ?>" readonly>
//             </div>
//         </div>
//         <!-- added 4-4-2024 -->
//         <?php
//         if(isset($data['dsSvMkPayAmount'])){
//             $onth_share=$data['dsSvMkPayAmount']/100;  //1%
//             $ninety_percent=$onth_share*90; //90%
//             $max_amount_condition=$data['dsSvMkPayAmount']+10;
//         }
//         else{
        
//             $ninety_percent=0; 
//             $max_amount_condition=0;
//         }
//         ?>
//         <div class="col-md-4">
//             <div class="form-group">
//                 <label for="depositedAmount">Deposited Amount:<span class="text-danger" style="font-size:15px;">*</span></label>
//                 <input type="number" class="form-control" name="depositedAmount" id="depositedAmount" min="<?php echo floor($ninety_percent); ?>" max="<?php echo $max_amount_condition; ?>" required>
//             </div>
//         </div>

// </div>


// <div class="row" id="if_difference_get">

//         <div class="col-md-6">
//         <div class="form-group">
//         <label for="TDS">TDS AMOUNT:</label>
//         <input type="number" name="tds" id="tds" class="form-control"  placeholder="Enter TDS" >
//         </div>
//         </div>

//         <!-- <div class="col-md-4">
//         <div class="form-group">
//         <label for="GST">GST AMOUNT:</label>
//         <input type="number" name="gst" id="gst" class="form-control"  placeholder="Enter GST" >
//         </div>
//         </div> -->

//         <div class="col-md-6">
//         <div class="form-group">
//         <label for="other">OTHER AMOUNT:</label>
//         <input type="number" name="other" id="other" class="form-control"  placeholder="Other" >
//         </div>
//         </div>

// </div>


// <div class="row">

//         <div class="col-md-4">
//         <div class="form-group">
//         <label for="sel1">UTR No/Reference No:<span class="text-danger" style="font-size:15px;">*</span></label>
//         <input type="text" name="ddNumber" id="ddNumber" class="form-control"  placeholder="Enter UTR No/Reference No" required>
//         <label class="text-danger">If Multiple UTR Seperate with Comma(,)</label>
//         </div>
//         </div>


//         <div class="col-md-4" id="paymentmethod">
//         <div class="form-group">
//             <label for="sel1">Select Payment Method:<span class="text-danger" style="font-size:15px;">*</span></label>
//             <select class="form-control" id="paymentMode" onchange="togglePaymentFields()" name="paymentMode" required>
//             <option value="" selected disabled>Select</option>
//             <option value="NEFT">NEFT</option>
//             <option value="RTGS">RTGS</option>
//             <option value="TREASURY">TREASURY</option>
//             </select>
//         </div>
//         </div>

//         <div class="col-md-4" >
//         <label for="sel1">Bank Name:<span class="text-danger" style="font-size:15px;">*</span></label>
//         <select class="form-control" id="paymentselector"   name="bankName" 	required >
//             <option selected value="" Disable>Select Bank</option>
//             <?php 
//         require_once 'dbConfig.php';
//         $sql = "select * from bank_master where is_active='Y'";
//         $result = mysqli_query($con, $sql);
//         while($row = mysqli_fetch_assoc($result)) {
        

//         ?>
//             <option value="<?=$row['BANK_NAME'];?>"><?=$row['BANK_NAME'];?></option>
//         <?php 
//         }
//         ?>
//         </select>
//         </div>
// </div>



// <div class="row">

//         <div class="col-md-4">
//         <div class="form-group">
//         <label for="sel1">Date:<span class="text-danger" style="font-size:15px;">*</span></label>
//         <input type="date" name="ddDate" id="ddDate" class="form-control" min="2017-04-01" onkeydown="return false" required>
//         </div>
//         </div>

//         <div class="col-md-4">
//         <div class="form-group">
//         <label for="sel1">GST Number:</label>
//         <input type="text" name="gstNumber" id="gstNumber" value="<?=$data['gstNumber']?? ''?>" class="form-control" readonly>
//         </div>
//         </div>

//         <div class="col-md-4">
//         <div class="form-group">
//         <label for="sel1">Account Number in Which payment Made:<span class="text-danger" style="font-size:15px;">*</span></label>
//         <input type="number" name="bankAccNo" id="bankAccNo" maxlength="30" class="form-control" required>
//         </div>
//         </div>

// </div>











































































// // import { HttpClient, HttpResponse } from "@angular/common/http";
// // import { Component, Inject, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
// // import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
// // import { Subject } from "rxjs";
// // import { takeUntil } from "rxjs/operators";
// // import { NotificationService } from "src/app/shared-services/notification.service";
// // import { SpinnerService } from "src/app/shared-services/spinner.service";
// // import { GenerateUrl } from "src/environments/generate-url.model";
// // import { PaymentChargesModel } from "../../models/payment-charges-model";
// // import { PayuFormModel } from "../../models/payuFormModel";
// // import { NewApplicationService } from "../../services/new-application.service";
// // import { RedirectGatewayService } from "../../services/redirect-gateway.service";
// // import { BillDeskFromModel } from "../../models/BillDeskFromModel";
// // import { BillPaymentService } from "../../services/payment.service";
// // import { MkmyPaymentService } from "../../services/mkmy-payment.service";
// // import { MkmyGetOidAndAuthTokenModel } from "../../models/mkmyPaymentoidandAuthtokengetPayloadModel";
// // import { ConsumerApplicationService } from "src/app/postlogin/user-modules/services/consumer-application.service";
// // import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// // import { MatRadioGroup } from "@angular/material/radio";

// // @Component({
// //   selector: "application-payment",
// //   templateUrl: "./application-payment.component.html",
// //   styleUrls: ["./application-payment.component.css"],
// // })
// // export class ApplicationPaymentComponent implements OnInit, OnDestroy {
// //   unsubscribe$: Subject<void> = new Subject();
// //   userRoles: Array<any> = [];
// //   externalHtml: any;
// //   payuUrl = this.url.payuUrl;
// //   consumerPaymentUrl = this.url.consumerPaymentUrl;
// //   consumerContextPath = this.url.consumerContextPath;
// //   masterUrl = this.url.mastersUrl;
// //   consumerPaymentData: any;
// //   consumerPaymentDetailsss: any;
// //   consumerApplicationDetail: any;
// //   applicationPaymentChargesList: any;
// //   modalTitle = this.data.modalTitle;
// //   btnTitle: string;
// //   consumerApplicationNo: string;
// //   oid: any;
// //   authTok: any;
// //   paymentTypeId: number;
// //   erp = this.url.erp;
// //   erpEstimateCalculations: any;
// //   sdkDetails: any;
// //   paymentChargesList: Array<PaymentChargesModel> = [];
// //   payuformModel: PayuFormModel;
// //   bildeskmodel: BillDeskFromModel;
// //   paymentButtonClick: boolean = false;
// //   amount: number;
// //   consumerDemandData: any;
// //   mastersUrl: string = this.url.mastersUrl;
// //   consumerApplicationId = this.data.consumerApplicationId;
// //   mkmyGetOidAndAuthTokenModel: MkmyGetOidAndAuthTokenModel = new MkmyGetOidAndAuthTokenModel()
// //   newOid: any;
// //   newAuthTok: any;
// //   natureOfWorkTypeId: any;
// //   applicationStatusId: any;
// //   mkmyAmountData: any;
// //   oidAndAuthTokenData: any;
// //   erpEstimateDataForMkmyArray: any
// //   erpReviseData: any;
// //   openTableBoolean: boolean = false;
// //   tdsForm: FormGroup;
// //   tdsConfirmedBoolean: boolean = false;
// //   underSelection194jBoolean: boolean = false;
// //   undercgstSgstBoolean: boolean = false;
// //   payButtonBoolean: boolean = false
// //   @ViewChild(MatRadioGroup) radioGroup: MatRadioGroup;
// //   tdsOninitBoolean: boolean = false;
// //   paymentDetailAfterTds: any
// //   Act51SownBoolean: boolean = false;
// //   nevershowboolean: boolean = false;

// //   tdsSubmitPayload: any

// //   constructor(
// //     private billPaymentService: BillPaymentService,
// //     private redirectGateway: RedirectGatewayService,
// //     private spinnerService: SpinnerService,
// //     private url: GenerateUrl,
// //     private http: HttpClient,
// //     private fb: FormBuilder,
// //     // private consumerApplicationService: ConsumerApplicationService,
// //     private newApplicationService: NewApplicationService,
// //     private mkmyPaymentService: MkmyPaymentService,
// //     private notificationService: NotificationService,
// //     @Inject(MAT_DIALOG_DATA) public data: any,
// //     public dialogRef: MatDialogRef<ApplicationPaymentComponent>
// //   ) {
// //     this.paymentChargesList = [];
// //     this.modalTitle = this.data.modalTitle;
// //     this.btnTitle = this.data.btnTitle;
// //     this.consumerApplicationNo = this.data.consumerApplicationNo;
// //     this.paymentTypeId = this.data.paymentTypeId;
// //     this.mkmyGetOidAndAuthTokenModel.consumerAppllicationNo = this.consumerApplicationNo;
// //     this.natureOfWorkTypeId = this.data.natureOfWorkTypeId
// //     this.applicationStatusId = this.data.applicationStatusId

// //     this.consumerApplicationDetail = this.data.row;
// //     console.log(
// //       "consumer Application Detail BY get list",
// //       this.consumerApplicationDetail
// //     );
// //     // consumerApplicationDetail.gstNumber
// //   }


// //   async ngOnInit() {
// //     console.log(
// //       "Demand Fee Payment Details !!shamshad***************************!!!! , ngOnInit ",
// //       this.data
// //     );
// //     console.log("this.consumerApplicationNo::::", this.consumerApplicationNo);
// //     console.log(this.natureOfWorkTypeId, "this.natureOfWorkTypeId.......");
// //     if (this.consumerApplicationDetail?.applicationStatus?.applicationStatusId == 5) {

// //       this.http.post(this.consumerContextPath + "/bill-desk/billPaymentProcess", { consumerAppllicationNo: this.consumerApplicationNo, }).subscribe((consumerPaymentData: any) => {
// //         console.log("consumer PaymentData *******", consumerPaymentData);
// //         if (consumerPaymentData["code"] == "200") {
// //           // this.consumerPaymentData = consumerPaymentData['list'][1];
// //           // console.log('consumervPayment Data BY List 0', this.consumerPaymentData);
// //           this.consumerPaymentDetailsss = consumerPaymentData["list"][0];
// //           console.log(
// //             " consumer Payment Data BY List 1",
// //             this.consumerPaymentDetailsss
// //           );
// //           console.log(
// //             "this consumer Payment Detailsss txn Amount",
// //             this.consumerPaymentDetailsss.txnAmount
// //           );

// //           this.billPaymentService.consumerPaymentDataDetails(this.consumerPaymentDetailsss?.billdeskPaymentRequestId).subscribe((sdk: any) => {
// //             console.log("sdk Details for consumer", sdk);
// //             if (sdk["code"] == "200") {
// //               this.sdkDetails = sdk["list"][0];
// //               console.log("sdk Details By list", this.sdkDetails);
// //               console.log("this.sdkDetails.bdorderid", this.sdkDetails.bdorderid);
// //               console.log(
// //                 "this.sdkDetails.authorizationToken",
// //                 this.sdkDetails.authorizationToken
// //               );
// //               this.oid = this.sdkDetails.bdorderid;
// //               this.authTok = this.sdkDetails.authorizationToken;
// //               console.log(
// //                 this.oid,
// //                 "",
// //                 this.authTok,
// //                 "oooooooooooooooooooooooooooooooooooooooooooooooooooo66666666666666666666666666666666666666666666666666666666"
// //               );
// //             } else if (sdk["code"] == "406") {
// //               this.notificationService.error("Decimal Value Not Allowed For Payment");
// //               return
// //             } else {
// //               this.notificationService.error("Something went wrong !");
// //               return
// //             }
// //           }, (error: any) => {
// //             this.notificationService.error(error);
// //           })
// //           // this.newOid = this.consumerPaymentDetailsss.orderId;
// //           // this.newAuthTok = this.consumerPaymentDetailsss.tokenId;
// //           this.amount = Number(this.consumerPaymentDetailsss.txnAmount);
// //         } else if (consumerPaymentData["code"] == "406") {
// //           this.notificationService.error("Payment cannot be processed as you have already made a request within the last 5 minutes.");
// //           return;
// //         } else {
// //           this.notificationService.error(consumerPaymentData["message"]);
// //           return;
// //         }

// //         console.log(
// //           this.consumerApplicationDetail?.consumerApplicationId,
// //           "this.erp"
// //         );

// //       }, (error: any) => {
// //         console.log(error.error.message);

// //         this.notificationService.warn(error.error.message);
// //         return
// //       })




// //       // let consumerPaymentData = await this.http.post(this.consumerContextPath + "/bill-desk/billPaymentProcess", { consumerAppllicationNo: this.consumerApplicationNo, }).toPromise();
// //       // console.log("consumer PaymentData *******", consumerPaymentData);
// //       // if (consumerPaymentData["code"] == "200") {
// //       //   // this.consumerPaymentData = consumerPaymentData['list'][1];
// //       //   // console.log('consumervPayment Data BY List 0', this.consumerPaymentData);
// //       //   this.consumerPaymentDetailsss = consumerPaymentData["list"][0];
// //       //   console.log(
// //       //     " consumer Payment Data BY List 1",
// //       //     this.consumerPaymentDetailsss
// //       //   );
// //       //   console.log(
// //       //     "this consumer Payment Detailsss txn Amount",
// //       //     this.consumerPaymentDetailsss.txnAmount
// //       //   );

// //       //   this.billPaymentService.consumerPaymentDataDetails(this.consumerPaymentDetailsss?.billdeskPaymentRequestId).subscribe((sdk: any) => {
// //       //     console.log("sdk Details for consumer", sdk);
// //       //     if (sdk["code"] == "200") {
// //       //       this.sdkDetails = sdk["list"][0];
// //       //       console.log("sdk Details By list", this.sdkDetails);
// //       //       console.log("this.sdkDetails.bdorderid", this.sdkDetails.bdorderid);
// //       //       console.log(
// //       //         "this.sdkDetails.authorizationToken",
// //       //         this.sdkDetails.authorizationToken
// //       //       );
// //       //       this.oid = this.sdkDetails.bdorderid;
// //       //       this.authTok = this.sdkDetails.authorizationToken;
// //       //       console.log(
// //       //         this.oid,
// //       //         "",
// //       //         this.authTok,
// //       //         "oooooooooooooooooooooooooooooooooooooooooooooooooooo66666666666666666666666666666666666666666666666666666666"
// //       //       );
// //       //     } else if (sdk["code"] == "406") {
// //       //       this.notificationService.error("Decimal Value Not Allowed For Payment");
// //       //       return
// //       //     } else {
// //       //       this.notificationService.error("Something went wrong !");
// //       //       return
// //       //     }
// //       //   },(error:any)=>{

// //       //   })
// //       //   // this.newOid = this.consumerPaymentDetailsss.orderId;
// //       //   // this.newAuthTok = this.consumerPaymentDetailsss.tokenId;
// //       //   this.amount = Number(this.consumerPaymentDetailsss.txnAmount);
// //       // }else if(consumerPaymentData["code"] == "406"){
// //       //   this.notificationService.error(consumerPaymentData["message"]);
// //       //   return;
// //       // }else{
// //       //   this.notificationService.error(consumerPaymentData["message"]);
// //       //   return;
// //       // }

// //       // console.log(
// //       //   this.consumerApplicationDetail?.consumerApplicationId,
// //       //   "this.erp"
// //       // );






// //     } else {

// //       ///********************************************************************************************************************************************************************************************************************************************************************* */

// //       if (this.consumerApplicationDetail?.applicationStatus?.applicationStatusId == 30) {

// //         this.billPaymentService.getErpRevisedData(JSON.parse(this.consumerApplicationDetail.revisedErpNumber), this.consumerApplicationDetail.consumerApplicationNo, 1).subscribe((response: any) => {
// //           console.log(response, "response...response");
// //           if (response?.code == "200") {
// //             this.erpReviseData = response.list[0];
// //             this.notificationService.success("! Data Retrieve Successfully")
// //             console.log(this.erpReviseData, "erpReviseData............");
// //             this.openTableBoolean = true

// //             if (this.natureOfWorkTypeId == 8) {
// //               if (this.erpReviseData?.remSupervisionAmt >= 250000) {
// //                 this.Act51SownBoolean = true;
// //               } else {
// //                 this.Act51SownBoolean = false;
// //               }
// //             } else {
// //               if (this.consumerApplicationDetail?.schemeType?.schemeTypeId == 1 || this.consumerApplicationDetail?.schemeType?.schemeTypeId == 2) {
// //                 if (this.erpReviseData?.remSupervisionAmt >= 250000) {
// //                   this.Act51SownBoolean = true;
// //                 } else {
// //                   this.Act51SownBoolean = false;
// //                 }

// //               } else {

// //               }

// //             }

// //           } else {
// //             this.openTableBoolean = false;
// //             this.erpReviseData = null;
// //             this.notificationService.error("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
// //             return
// //           }
// //         });

// //         if (this.natureOfWorkTypeId == 8) {
// //           this.mkmyPaymentService.getMkmyOidAndAuthToken({
// //             "consumerAppllicationNo": this.consumerApplicationNo
// //           }).subscribe((resp: any) => {
// //             console.log(resp, "mkmy.....reessppp.............");
// //             if (resp.code == "200") {
// //               this.oidAndAuthTokenData = resp.list[0];

// //               this.billPaymentService.getOIDtOKENforMkmy(resp.list[0].billdeskPaymentRequestId).subscribe((sdk: any) => {
// //                 console.log("sdk Details for consumer", sdk);
// //                 if (sdk["code"] == "200") {
// //                   this.sdkDetails = sdk["list"][0];
// //                   console.log("sdk Details By list", this.sdkDetails);
// //                   console.log("this.sdkDetails.bdorderid", this.sdkDetails.bdorderid);
// //                   console.log(
// //                     "this.sdkDetails.authorizationToken",
// //                     this.sdkDetails.authorizationToken
// //                   );
// //                   this.oid = this.sdkDetails.bdorderid;
// //                   this.authTok = this.sdkDetails.authorizationToken;
// //                   console.log(
// //                     this.oid,
// //                     "",
// //                     this.authTok,
// //                     "oooooooooooooooooooooooooooooooooooooooooooooooooooo66666666666666666666666666666666666666666666666666666666"
// //                   );
// //                 } else if (sdk["code"] == "406") {
// //                   this.notificationService.error("Decimal Value Not Allowed For Payment");
// //                   return
// //                 } else {
// //                   this.notificationService.error("Something went wrong !");
// //                   return
// //                 }
// //               })
// //             }
// //           });
// //         } else {

// //           let consumerPaymentData = await this.http.post(this.consumerContextPath + "/bill-desk/billPaymentProcess", { consumerAppllicationNo: this.consumerApplicationNo, }).toPromise();
// //           console.log("consumer PaymentData *******", consumerPaymentData);
// //           if (consumerPaymentData["code"] == "200") {
// //             // this.consumerPaymentData = consumerPaymentData['list'][1];
// //             // console.log('consumervPayment Data BY List 0', this.consumerPaymentData);
// //             this.consumerPaymentDetailsss = consumerPaymentData["list"][0];
// //             console.log(
// //               " consumer Payment Data BY List 1",
// //               this.consumerPaymentDetailsss
// //             );
// //             console.log(
// //               "this consumer Payment Detailsss txn Amount",
// //               this.consumerPaymentDetailsss.txnAmount
// //             );

// //             this.billPaymentService.consumerPaymentDataDetails(this.consumerPaymentDetailsss?.billdeskPaymentRequestId).subscribe((sdk: any) => {
// //               console.log("sdk Details for consumer", sdk);
// //               if (sdk["code"] == "200") {
// //                 this.sdkDetails = sdk["list"][0];
// //                 console.log("sdk Details By list", this.sdkDetails);
// //                 console.log("this.sdkDetails.bdorderid", this.sdkDetails.bdorderid);
// //                 console.log(
// //                   "this.sdkDetails.authorizationToken",
// //                   this.sdkDetails.authorizationToken
// //                 );
// //                 this.oid = this.sdkDetails.bdorderid;
// //                 this.authTok = this.sdkDetails.authorizationToken;
// //                 console.log(
// //                   this.oid,
// //                   "",
// //                   this.authTok,
// //                   "oooooooooooooooooooooooooooooooooooooooooooooooooooo66666666666666666666666666666666666666666666666666666666"
// //                 );
// //               } else if (sdk["code"] == "406") {
// //                 this.notificationService.error("Decimal Value Not Allowed For Payment");
// //                 return
// //               } else {
// //                 this.notificationService.error("Something went wrong !");
// //                 return
// //               }
// //             })


// //             // this.newOid = this.consumerPaymentDetailsss.orderId;
// //             // this.newAuthTok = this.consumerPaymentDetailsss.tokenId;
// //             this.amount = Number(this.consumerPaymentDetailsss.txnAmount);
// //           }

// //           console.log(
// //             this.consumerApplicationDetail.consumerApplicationId,
// //             "this.erp"
// //           );

// //           let erpEstimateCalculations = await this.http.get(this.erp + "/erpEstimateCalculations/" + this.consumerApplicationDetail.consumerApplicationId).toPromise();
// //           console.log(erpEstimateCalculations, "erpEstimateCalculations&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
// //           if (erpEstimateCalculations["code"] == "200") {
// //             this.erpEstimateCalculations = erpEstimateCalculations["list"][0];
// //             console.log("erpEstimateCalculations----", this.erpEstimateCalculations);
// //           }


// //           // let sdk = await this.http.get(this.consumerContextPath + "/bill-desk/billPaymentsProcess/" + this.consumerPaymentDetailsss?.billdeskPaymentRequestId).toPromise();
// //           // console.log("sdk Details for consumer", sdk);
// //           // if (sdk["code"] == "200") {
// //           //   this.sdkDetails = sdk["list"][0];
// //           //   console.log("sdk Details By list", this.sdkDetails);
// //           //   console.log("this.sdkDetails.bdorderid", this.sdkDetails.bdorderid);
// //           //   console.log(
// //           //     "this.sdkDetails.authorizationToken",
// //           //     this.sdkDetails.authorizationToken
// //           //   );
// //           //   this.oid = this.sdkDetails.bdorderid;
// //           //   this.authTok = this.sdkDetails.authorizationToken;
// //           //   console.log(
// //           //     this.oid,
// //           //     "",
// //           //     this.authTok,
// //           //     "oooooooooooooooooooooooooooooooooooooooooooooooooooo66666666666666666666666666666666666666666666666666666666"
// //           //   );
// //           // }


// //         }




// //       }
// //       else {

// //         if (this.natureOfWorkTypeId == 8) {
// //           this.mkmyPaymentService.getMkmyAmountByConsumerApplicationNumber(this.consumerApplicationNo).subscribe((data: any) => {
// //             console.log(data, "mkmy...data..................");
// //             if (data.code == "200") {
// //               this.mkmyAmountData = data.list[0];

// //               if (this.mkmyAmountData?.remSupervisionAmt >= 250000) {
// //                 this.Act51SownBoolean = true;
// //               } else {
// //                 this.Act51SownBoolean = false
// //               }

// //               this.newApplicationService.getErpDetailsByErpNumber(JSON.parse(this.mkmyAmountData.erpNumber), this.consumerApplicationNo).subscribe((data: any) => {
// //                 console.log(data, "Mkmy........Data.....................");
// //                 if (data.code == "200") {
// //                   this.erpEstimateDataForMkmyArray = data.list;
// //                   // this.mkmyerpConfirmationVariable = true
// //                   // this.erpNoOfMkmyVariable = this.applicationServeyErpFgOfMkmy.value.erpNo;
// //                   this.notificationService.success("Data retrive Successfully");
// //                 } else {
// //                   this.notificationService.warn("something went wrong !");
// //                   return;
// //                 }
// //                 // this.erpEstimateDataForMkmyArray = data.list[0];
// //                 // this.mkmyerpConfirmationVariable = true
// //                 // this.erpNoOfMkmyVariable = this.applicationServeyErpFgOfMkmy.value.erpNo

// //               })


// //             }


// //           });


// //           this.mkmyPaymentService.getMkmyOidAndAuthToken({
// //             "consumerAppllicationNo": this.consumerApplicationNo
// //           }).subscribe((resp: any) => {
// //             console.log(resp, "mkmy.....reessppp.............");
// //             if (resp.code == "200") {
// //               this.oidAndAuthTokenData = resp.list[0];

// //               this.billPaymentService.getOIDtOKENforMkmy(resp.list[0].billdeskPaymentRequestId).subscribe((sdk: any) => {
// //                 console.log("sdk Details for consumer", sdk);
// //                 if (sdk["code"] == "200") {
// //                   this.sdkDetails = sdk["list"][0];
// //                   console.log("sdk Details By list", this.sdkDetails);
// //                   console.log("this.sdkDetails.bdorderid", this.sdkDetails.bdorderid);
// //                   console.log(
// //                     "this.sdkDetails.authorizationToken",
// //                     this.sdkDetails.authorizationToken
// //                   );
// //                   this.oid = this.sdkDetails.bdorderid;
// //                   this.authTok = this.sdkDetails.authorizationToken;
// //                   console.log(
// //                     this.oid,
// //                     "",
// //                     this.authTok,
// //                     "oooooooooooooooooooooooooooooooooooooooooooooooooooo66666666666666666666666666666666666666666666666666666666"
// //                   );
// //                 } else if (sdk["code"] == "406") {
// //                   this.notificationService.error("Decimal Value Not Allowed For Payment");
// //                   return
// //                 } else {
// //                   this.notificationService.error("Something went wrong !");
// //                   return
// //                 }
// //               })
// //             }
// //           });



// //         }
// //         else {

// //           console.log(this.tdsOninitBoolean, "this.tdsOninitBoolean..................this.tdsOninitBoolean");

// //           // if (this.tdsOninitBoolean == false) {
// //           //   let erpEstimateCalculations = await this.http.get(this.erp + "/erpEstimateCalculations/" + this.consumerApplicationDetail.consumerApplicationId).toPromise();
// //           //   console.log(erpEstimateCalculations, "erpEstimateCalculations&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
// //           //   if (erpEstimateCalculations["code"] == "200") {
// //           //     this.erpEstimateCalculations = erpEstimateCalculations["list"][0];
// //           //     console.log("erpEstimateCalculations----", this.erpEstimateCalculations);

// //           //     // *************************************** ///
// //           //     if (this.consumerApplicationDetail?.schemeType?.schemeTypeId == 1) {
// //           //       if (this.erpEstimateCalculations?.superVisionAmount >= 250000) {
// //           //         this.Act51SownBoolean = true;
// //           //       } else {
// //           //         this.Act51SownBoolean = false;
// //           //       }
// //           //       //this.Act51SownBoolean = true;
// //           //     }
// //           //     else if (this.consumerApplicationDetail?.schemeType?.schemeTypeId == 2) {
// //           //       if (this.erpEstimateCalculations?.superVisionAmount >= 250000) {
// //           //         this.Act51SownBoolean = true;
// //           //       } else if (this.erpEstimateCalculations?.superVisionAmount < 250000) {
// //           //         this.Act51SownBoolean = false
// //           //       } else {
// //           //         this.Act51SownBoolean = false
// //           //       }
// //           //     }
// //           //     //********************************************* */

// //           //     let consumerPaymentData = await this.http.post(this.consumerContextPath + "/bill-desk/billPaymentProcess", { consumerAppllicationNo: this.consumerApplicationNo, }).toPromise();
// //           //     console.log("consumer PaymentData *******", consumerPaymentData);
// //           //     if (consumerPaymentData["code"] == "200") {
// //           //       // this.consumerPaymentData = consumerPaymentData['list'][1];
// //           //       // console.log('consumervPayment Data BY List 0', this.consumerPaymentData);
// //           //       this.consumerPaymentDetailsss = consumerPaymentData["list"][0];
// //           //       console.log(
// //           //         " consumer Payment Data BY List 1",
// //           //         this.consumerPaymentDetailsss
// //           //       );
// //           //       console.log(
// //           //         "this consumer Payment Detailsss txn Amount",
// //           //         this.consumerPaymentDetailsss.txnAmount
// //           //       );

// //           //       this.billPaymentService.consumerPaymentDataDetails(this.consumerPaymentDetailsss?.billdeskPaymentRequestId).subscribe((sdk: any) => {
// //           //         console.log("sdk Details for consumer", sdk);
// //           //         if (sdk["code"] == "200") {
// //           //           this.sdkDetails = sdk["list"][0];
// //           //           console.log("sdk Details By list", this.sdkDetails);
// //           //           console.log("this.sdkDetails.bdorderid", this.sdkDetails.bdorderid);
// //           //           console.log(
// //           //             "this.sdkDetails.authorizationToken",
// //           //             this.sdkDetails.authorizationToken
// //           //           );
// //           //           this.oid = this.sdkDetails.bdorderid;
// //           //           this.authTok = this.sdkDetails.authorizationToken;
// //           //           console.log(
// //           //             this.oid,
// //           //             "",
// //           //             this.authTok,
// //           //             "oooooooooooooooooooooooooooooooooooooooooooooooooooo66666666666666666666666666666666666666666666666666666666"
// //           //           );
// //           //         } else if (sdk["code"] == "406") {
// //           //           this.notificationService.error("Decimal Value Not Allowed For Payment");
// //           //           return
// //           //         } else {
// //           //           this.notificationService.error("Something went wrong !");
// //           //           return
// //           //         }
// //           //       })
// //           //       // this.newOid = this.consumerPaymentDetailsss.orderId;
// //           //       // this.newAuthTok = this.consumerPaymentDetailsss.tokenId;
// //           //       this.amount = Number(this.consumerPaymentDetailsss.txnAmount);
// //           //     }

// //           //     console.log(
// //           //       this.consumerApplicationDetail?.consumerApplicationId,
// //           //       "this.erp"
// //           //     );
// //           //   }

// //           // } else {

// //             let consumerPaymentData = await this.http.post(this.consumerContextPath + "/bill-desk/billPaymentProcess", { consumerAppllicationNo: this.consumerApplicationNo, }).toPromise();
// //             console.log("consumer PaymentData *******", consumerPaymentData);
// //             if (consumerPaymentData["code"] == "200") {
// //               // this.consumerPaymentData = consumerPaymentData['list'][1];
// //               // console.log('consumervPayment Data BY List 0', this.consumerPaymentData);
// //               this.consumerPaymentDetailsss = consumerPaymentData["list"][0];
// //               console.log(
// //                 " consumer Payment Data BY List 1",
// //                 this.consumerPaymentDetailsss
// //               );
// //               console.log(
// //                 "this consumer Payment Detailsss txn Amount",
// //                 this.consumerPaymentDetailsss.txnAmount
// //               );

// //               this.billPaymentService.consumerPaymentDataDetails(this.consumerPaymentDetailsss?.billdeskPaymentRequestId).subscribe((sdk: any) => {
// //                 console.log("sdk Details for consumer", sdk);
// //                 if (sdk["code"] == "200") {
// //                   this.sdkDetails = sdk["list"][0];
// //                   console.log("sdk Details By list", this.sdkDetails);
// //                   console.log("this.sdkDetails.bdorderid", this.sdkDetails.bdorderid);
// //                   console.log(
// //                     "this.sdkDetails.authorizationToken",
// //                     this.sdkDetails.authorizationToken
// //                   );
// //                   this.oid = this.sdkDetails.bdorderid;
// //                   this.authTok = this.sdkDetails.authorizationToken;
// //                   console.log(
// //                     this.oid,
// //                     "",
// //                     this.authTok,
// //                     "oooooooooooooooooooooooooooooooooooooooooooooooooooo66666666666666666666666666666666666666666666666666666666"
// //                   );
// //                 } else if (sdk["code"] == "406") {
// //                   this.notificationService.error("Decimal Value Not Allowed For Payment");
// //                   return
// //                 } else {
// //                   this.notificationService.error("Something went wrong !")
// //                   return
// //                 }
// //               })
// //               // this.newOid = this.consumerPaymentDetailsss.orderId;
// //               // this.newAuthTok = this.consumerPaymentDetailsss.tokenId;
// //               this.amount = Number(this.consumerPaymentDetailsss.txnAmount);
// //             }

// //             console.log(
// //               this.consumerApplicationDetail?.consumerApplicationId,
// //               "this.erp"
// //             );
// //          // }


// //         }
// //       }

// //       ///********************************************************************************************************************************************************************************************************************************************************************************** */
// //     }

// //     if (this.consumerApplicationDetail.avedakKaPrakar == 'Government' && this.consumerApplicationDetail?.applicationStatus.applicationStatusId != 5) {
// //       this.tdsFormBuild()
// //     }


// //     // this.tdsFormBuild();

// //     // if(this.tdsOninitBoolean==true){
// //     //   this.mkmyPaymentService.paymentDetailsAfterTds(this.consumerApplicationNo).subscribe((res:any)=>{
// //     //     console.log(res,"resssssssssssssssss.............................................");
// //     //     if(res.code=="200"){
// //     //     this.paymentDetailAfterTds = res.list[0];
// //     //     console.log(this.paymentDetailAfterTds,"neeewwwww   tttttaaaabbbbbblllleeeeeee...................this.paymentDetailAfterTds");

// //     //     }else{
// //     //       this.notificationService.error("something went wrong !");
// //     //       return
// //     //     }

// //     //   },
// //     //   (error:any)=>{
// //     //     console.log(error,"error.............................................");

// //     //   }
// //     //   )
// //     // }


// //   }


// //   tdsFormBuild() {
// //     this.tdsForm = this.fb.group({
// //       selection194j: ['', Validators.required],
// //       // cgstSgstAct: ['', Validators.required],
// //       // radioOtion: ['', Validators.required],
// //     })
// //   }

// //   dtsConfirmationCheckBox(c: any) {
// //     console.log(c.checked, "ccccccccccccc");
// //     this.tdsConfirmedBoolean = c.checked;
// //     if (c.checked == true) {
// //       //this.tdsFormBuild();
// //       this.payButtonBoolean = true;
// //     } else {
// //       this.payButtonBoolean = false;
// //     }
// //     // this.radioGroup.value = null;
// //   }

// //   under194jCheckBox(e: any) {
// //     console.log(e.checked, "eeeeeeeeeeeeeeeeeeeeeeee");
// //     this.underSelection194jBoolean = e.checked
// //     if (this.underSelection194jBoolean == true) {

// //       let formData: FormData = new FormData();
// //       formData.append("consumerAppNo", this.consumerApplicationNo);
// //       formData.append("section194", "true");
// //       formData.append("section51", null);
// //       formData.append("tds2", "true");
// //       formData.append("tds10", null);
// //       this.tdsSubmitPayload = formData
// //     } else {
// //       let formData: FormData = new FormData();
// //       this.tdsSubmitPayload = formData
// //     }

// //   }



// //   resetSelection(radioGroup: MatRadioGroup) {
// //     // radioGroup.value = null;
// //     // Or radioGroup.value = '';


// //   }
// //   // matButtonChange(e: any) {
// //   //   console.log(e, "mmaattttbbbuuuuttttoooonnnnn.............");
// //   //   console.log(this.tdsForm.value, "this.tdsForm.value..............");
// //   //   this.tdsForm.controls['selection194j'].setValidators(Validators.required);
// //   //   this.tdsForm.controls['radioOtion'].setValidators(Validators.required);
// //   //   this.tdsForm.controls['cgstSgstAct'].clearValidators;
// //   //   this.tdsForm.controls['selection194j'].updateValueAndValidity();
// //   //   this.tdsForm.controls['radioOtion'].updateValueAndValidity();
// //   //   this.tdsForm.controls['cgstSgstAct'].updateValueAndValidity();
// //   //   console.log(this.tdsForm, "this.tdsForm.value..............");

// //   // }

// //   onTdsSubmit() {


// //     this.mkmyPaymentService.tdsSubmitPostApi(this.tdsSubmitPayload).subscribe((respo: any) => {
// //       console.log(respo, "respo.....................");
// //       if (respo?.code == "201") {

// //         this.notificationService.success(respo.message);



// //         this.mkmyPaymentService.paymentDetailsAfterTds(this.consumerApplicationNo).subscribe((res: any) => {
// //           console.log(res, "resssssssssssssssss.............................................");
// //           if (res.code == "200") {
// //             this.paymentDetailAfterTds = res.list[0];
// //             this.notificationService.success(res.message);
// //             console.log(this.paymentDetailAfterTds, "neeewwwww   tttttaaaabbbbbblllleeeeeee...................this.paymentDetailAfterTds");
// //            // this.ngOnInit();
// //             this.tdsOninitBoolean = true;
// //             this.payButtonBoolean = false
// //           } else {
// //             this.notificationService.error(res.message);
// //             return
// //           }

// //         },
// //           (error: any) => {
// //             console.log(error, "error.............................................");
// //             this.notificationService.error("Something went wrong !");
// //             return
// //           }
// //         )

// //       } else {
// //         this.payButtonBoolean = true
// //         this.notificationService.warn(respo.message);
// //         return
// //       }
// //     })
// //     // }

// //   }


// //   submitBillDetail() {
// //     this.paymentButtonClick = true;
// //     //   let oidd=undefined
// //     //   let authTokken = undefined
// //     //   //    window.open("http://localhost:4200/deposit-scheme/SDKUAt.html?oid="+this.oid+"&aut="+this.authTok, "_blank", "popup=yes");
// //     //   // forproduction
// //     //      window.open("https://dsp.mpcz.in:8888/deposit-scheme/SDKUAt.html?oid=" + this.oid + "&aut=" + this.authTok, "_blank", "popup=yes");
// //     //   // for rooftop uat
// //     //    window.open("https://rooftop-uat.mpcz.in:8888/deposit-scheme/SDKUAt.html?oid=" + this.oid + "&aut=" + this.authTok, "_blank", "popup=yes");


// //     if (this.url.initialBasUrl == 'https://rooftop-uat.mpcz.in:8888') {
// //       window.open("assets/images/sdk-uat/SDKUAt.html?oid=" + this.oid + "&aut=" + this.authTok, "_blank", "popup=yes")
// //     } else if (this.url.initialBasUrl == 'https://dsp.mpcz.in:8888') {
// //       window.open("assets/images/sdk-prod/SDKUAt.html?oid=" + this.oid + "&aut=" + this.authTok, "_blank", "popup=yes")
// //     } else {

// //     }

// //   }

// //   private sendToPayu() { }

// //   onClose() {
// //     this.dialogRef.close();
// //   }

// //   ngOnDestroy() {
// //     console.log("ngOnDestroy call !!!");
// //     this.unsubscribe$.next();
// //     this.unsubscribe$.complete();
// //   }
// // }




















// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// hhhhttttttmmmllllll/////////////////////////////////////////////////////////////////////////////////////////////////////////














// // <!-- <mat-card class="my-card"> -->

// // <mat-card class="my-card custom-scroll-enable-1">
// //     <h2 style="color: crimson;font-weight: 900;"> कृपया ध्यान दे : </h2>
// //     <h3 style="color: crimson;font-weight: 900;">
// //         * अगर आपने पोर्टल पर भुगतान किया है और किसी तकनीकी समस्या के कारण पोर्टल पर समायोजित नही हुआ है तो
// //         पुनः भुगतान
// //         से पहले आवेदन क्रमांक dsp.mpcz000@gmail.com पर ईमेल करे।</h3>

// //     <h3 style="color: crimson; font-weight: 900;">
// //         * भुगतान करने के लिए दिए गए भुगतान विकल्प का उपयोग करे,किसी भी अन्य माध्यम / ऑफलाइन के माध्यम से किया गया भुगतान
// //         स्वीकार नहीं किया जायेगा।
// //     </h3>

// //     <br>
// //     <mat-toolbar>

// //         <span>{{modalTitle}}</span>
// //         <span class="fill-remaining-space"></span>
// //         <button class="close-btn" mat-stroked-button (click)="onClose()" tabIndex="-1">
// //             <mat-icon>clear</mat-icon>
// //         </button>
// //     </mat-toolbar>

// //     <div>
// //         <div *ngIf="consumerApplicationDetail?.applicationStatus?.applicationStatusId!=30">
// //             <!--this is  other option div -->
// //             <div class="row custom-row">

// //                 <div class="col-md-12 custom-col-md-12">

// //                     <table id="tableID" border="1" width="100%" cellspacing="1" #scrollBottom>

// //                         <tbody id="tablebody">
// //                             <tr class="col-md-12">
// //                                 <td class="tableHeaders col-md-4">Application Number</td>
// //                                 <td class="tabledatas col-md-8">{{consumerApplicationNo}}</td>
// //                             </tr>
// //                             <!-- <tr class="col-md-12">
// //                         <td class="tableHeaders col-md-4">Name</td>
// //                         <td class="tabledatas col-md-8">{{consumerPaymentData.firstName}}
// //                             {{consumerPaymentData.lastName}}
// //                         </td>
// //                     </tr> -->
// //                             <tr class="col-md-12">
// //                                 <td class="tableHeaders col-md-4">Name</td>
// //                                 <td class="tabledatas col-md-8">{{consumerApplicationDetail?.consumerName
// //                                     }}
// //                                 </td>
// //                             </tr>
// //                             <!-- <tr class="col-md-12">
// //                         <td class="tableHeaders col-md-4">Email</td>
// //                         <td class="tabledatas col-md-8">{{consumerPaymentData.email}}</td>
// //                     </tr> -->
// //                             <tr class="col-md-12">
// //                                 <td class="tableHeaders col-md-4">Email</td>
// //                                 <td class="tabledatas col-md-8">
// //                                     {{consumerApplicationDetail?.consumers?.consumerEmailId}}
// //                                 </td>
// //                             </tr>
// //                             <tr class="col-md-12">
// //                                 <td class="tableHeaders col-md-4">Mobile No.</td>
// //                                 <td class="tabledatas col-md-8">
// //                                     {{consumerApplicationDetail?.consumers?.consumerMobileNo}}
// //                                 </td>
// //                             </tr>


// //                             <!-- <tr class="col-md-12">
// //                         <td class="tableHeaders col-md-4">Payment particular</td>
// //                         <td class="tabledatas col-md-8">{{consumerPaymentData.prductInfo}}</td>
// //                     </tr> -->

// //                             <tr class="col-md-12">
// //                                 <td class="tableHeaders col-md-4">Payment particular</td>
// //                                 <td class="tabledatas col-md-8">
// //                                     <div *ngIf=" natureOfWorkTypeId==8">
// //                                         {{oidAndAuthTokenData?.additionalInfo7}}
// //                                     </div>
// //                                     <div *ngIf="natureOfWorkTypeId!=8">
// //                                         {{consumerPaymentDetailsss?.additionalInfo7}}
// //                                     </div>

// //                                 </td>
// //                             </tr>
// //                             <!-- <tr class="col-md-12">
// //                         <td class="tableHeaders col-md-4">Transaction ID</td>
// //                         <td class="tabledatas col-md-8">{{consumerPaymentData.txnId}}</td>
// //                     </tr> -->

// //                             <tr class="col-md-12">
// //                                 <td class="tableHeaders col-md-4">Transaction ID</td>
// //                                 <td class="tabledatas col-md-8">
// //                                     <div *ngIf=" natureOfWorkTypeId==8">{{oidAndAuthTokenData?.orderId}}</div>
// //                                     <div *ngIf=" natureOfWorkTypeId!=8">{{consumerPaymentDetailsss?.orderId}}</div>
// //                                 </td>
// //                             </tr>

// //                             <tr *ngIf="consumerApplicationDetail.gstNumber!=null">
// //                                 <td class="tableHeaders col-md-4">GST Number</td>
// //                                 <td class="tabledatas col-md-8">
// //                                     {{consumerApplicationDetail.gstNumber}}
// //                                 </td>
// //                             </tr>

// //                             <!-- <tr class="col-md-12">
// //                         <td class="tableHeaders col-md-4">Registration Fees (in ₹)</td>
// //                         <td class="tabledatas col-md-8">{{amount | currency:"INR":"symbol"}}</td>
// //                     </tr> -->
// //                             <tr *ngIf="consumerApplicationDetail?.applicationStatus.applicationStatusId==5"
// //                                 class="col-md-12">
// //                                 <th class="tableHeaders col-md-4"> Fees (in ₹)</th>
// //                                 <td class="tabledatas col-md-8">1000</td>
// //                             </tr>
// //                             <tr *ngIf="consumerApplicationDetail?.applicationStatus.applicationStatusId==5"
// //                                 class="col-md-12">
// //                                 <th class="tableHeaders col-md-4">CGST-9%</th>
// //                                 <td class="tabledatas col-md-8">90</td>
// //                             </tr>
// //                             <tr *ngIf="consumerApplicationDetail?.applicationStatus.applicationStatusId==5"
// //                                 class="col-md-12">
// //                                 <th class="tableHeaders col-md-4">SGST-9%</th>
// //                                 <td class="tabledatas col-md-8">90</td>
// //                             </tr>

// //                             <tr class="col-md-12">
// //                                 <td class="tableHeaders col-md-4">
// //                                     <div *ngIf="consumerApplicationDetail?.applicationStatus.applicationStatusId==5">
// //                                         Total
// //                                         Amount (in ₹)</div>
// //                                     <div
// //                                         *ngIf="consumerApplicationDetail?.applicationStatus.applicationStatusId==12 || consumerApplicationDetail?.applicationStatus.applicationStatusId==30">
// //                                         Fees (in ₹)</div>

// //                                 </td>

// //                                 <!-- <td class="tabledatas col-md-8">{{amount | currency:"INR":"symbol"}}</td> -->
// //                                 <td class="tabledatas col-md-8">
// //                                     <!-- this.consumerPaymentDetailsss.txnAmount -->
// //                                     <div *ngIf="consumerApplicationDetail?.applicationStatus.applicationStatusId==5">
// //                                         {{consumerPaymentDetailsss?.txnAmount}}
// //                                     </div>

// //                                     <div
// //                                         *ngIf="(consumerApplicationDetail?.applicationStatus.applicationStatusId==12 || consumerApplicationDetail?.applicationStatus.applicationStatusId==30) && natureOfWorkTypeId!=8">
// //                                         <div *ngIf="erpEstimateCalculations?.totalamountOfSupervision == null">
// //                                             {{erpEstimateCalculations?.totaldepositAmount | currency:"INR":"symbol"}}

// //                                         </div>
// //                                         <div *ngIf="erpEstimateCalculations?.totaldepositAmount == null">
// //                                             {{erpEstimateCalculations?.totalamountOfSupervision |
// //                                             currency:"INR":"symbol"}}
// //                                         </div>
// //                                     </div>
// //                                     <div
// //                                         *ngIf=" natureOfWorkTypeId==8 && (applicationStatusId==12 || applicationStatusId==30)">
// //                                         {{mkmyAmountData?.payableAmount}}
// //                                     </div>

// //                                 </td>
// //                             </tr>
// //                         </tbody>
// //                     </table>

// //                 </div>
// //             </div>

// //             <mat-divider class="custom-mat-divider">

// //             </mat-divider>
// //             <!-- sandeep, end -->

// //             <div style="margin-top:20px;" *ngIf="paymentChargesList && paymentChargesList.length > 0 ">
// //                 <hr />

// //                 <div style="border-bottom: dashed 1px solid black;"></div>

// //                 <table class="table table-striped" style="line-height:5px;font-size: 15px;">
// //                     <thead>
// //                         <th style="text-align: left;" class="col-md-4"><b>Charges Name</b></th>
// //                         <!-- <th style="text-align: left;" class="col-md-4"><b>Rate</b></th> -->
// //                         <th style="text-align: left;" class="col-md-4"><b>Amount (in ₹.)</b></th>
// //                     </thead>
// //                     <tbody>
// //                         <tr *ngFor="let chargeData of paymentChargesList">
// //                             <td class="tabledatas">{{chargeData.name}} </td>
// //                             <!-- <td class="tabledatas"> {{(chargeData.id != 1 && chargeData.id != 4) ? chargeData.rate : 'NA' }}
// //                     </td> -->
// //                             <td class="tabledatas">{{chargeData.amount | currency:"INR":"symbol"}} </td>
// //                         </tr>
// //                     </tbody>
// //                 </table>
// //             </div>
// //             <!-- mkmy table start -->
// //             <div *ngIf=" natureOfWorkTypeId==8 && applicationStatusId==12">


// //                 <table class="demandApproveTable table table-bordered">
// //                     <thead>

// //                         <tr>


// //                             <th>आवेदन क्रमांक</th>
// //                             <th>कुल प्राकलन राशि</th>
// //                             <th>म.प्र द्वारा दी गई अनुदान राशि(40%)</th>
// //                             <th>म.प्र विद्युत कंपनी द्वारा दी गई अनुदान राशि(10%)</th>
// //                             <th>सिक्योरिटी डिपाजिट </th>
// //                             <th>आवेदन शुल्क </th>
// //                             <th>उपभोक्ता द्वारा वहन की गई राशि (50%)</th>
// //                             <th>इ. आर. पी. नंबर </th>
// //                             <th>स्कीम कोड </th>


// //                         </tr>
// //                     </thead>

// //                     <tbody>
// //                         <tr *ngFor="let item of erpEstimateDataForMkmyArray">


// //                             <td>{{item?.consumerApplicationNumber}}</td>
// //                             <td>{{item?.totalAmount}}</td>
// //                             <td>{{item?.govMafBill}}</td>
// //                             <td>{{item?.mpmkMafBill}}</td>
// //                             <td>{{item?.securityDeposit}}</td>
// //                             <td>{{item?.avedanShulk}}</td>
// //                             <td>{{item?.carryAmountByApplicant}}</td>
// //                             <td>{{item?.erpNumber}}</td>
// //                             <td>{{item?.schemeCode}}</td>

// //                         </tr>
// //                     </tbody>

// //                 </table>

// //                 <br>
// //                 <br>

// //                 <table class="table table-bordered">
// //                     <thead>
// //                         <tr>
// //                             <th colspan="3" class="custom-particulatr" align="center">डिमांड नोट</th>
// //                         </tr>
// //                         <tr>
// //                             <th class="custom-particulatr">मद</th>
// //                             <th class="custom-amount">एकाउंट कोड</th>
// //                             <th class="custom-amount">राशि</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>


// //                         <tr>
// //                             <td class="custom-particular-td">&nbsp;1. उपभोक्ता द्वारा वहन की गई राशि।(प्राकलन राशि की
// //                                 50% )
// //                             </td>
// //                             <td class="custom-td">&nbsp;47.345
// //                             </td>
// //                             <td>
// //                                 {{mkmyAmountData?.carryAmountByApplicant}}
// //                             </td>
// //                         </tr>

// //                         <tr>
// //                             <td rowspan="2" class="custom-particular-td">&nbsp;2. आवेदन शुल्क</td>
// //                             <td class="custom-td">&nbsp;62.936
// //                             </td>
// //                             <td>
// //                                 <!-- {{mkmyAmountData?.avedanShulk}} -->
// //                                 5
// //                             </td>
// //                         </tr>

// //                         <tr>
// //                             <td class="custom-td">&nbsp;47.310
// //                             </td>
// //                             <td>
// //                                 <!-- {{mkmyAmountData?.avedanShulk}} -->
// //                                 2495
// //                             </td>
// //                         </tr>


// //                         <tr>
// //                             <td class="custom-particular-td">&nbsp;3. सुरक्षा निधि राशि प्रति HP 600 ( कुल भार )</td>
// //                             <!-- सारे उपभोक्ता द्वारा भरा -->
// //                             <td class="custom-td">&nbsp;48.150
// //                             </td>
// //                             <td>
// //                                 {{mkmyAmountData?.securityDeposit}}
// //                             </td>
// //                         </tr>


// //                         <tr>
// //                             <td>&nbsp; <strong> कुल राशि</strong></td>
// //                             <td class="custom-td">&nbsp;
// //                                 <strong>

// //                                 </strong>
// //                             </td>
// //                             <td>
// //                                 {{ mkmyAmountData?.payableAmount | currency:"INR":"symbol"}}
// //                             </td>
// //                         </tr>

// //                     </tbody>
// //                 </table>
// //                 <br>

// //                 <ul>

// //                     <li>मध्य प्रदेश शासन द्वारा दी गई अनुदान राशि (प्राकलन राशि की 40%)</li>
// //                     <li>मध्य प्रदेश विद्युत वितरण कम्पनी द्वारा दी गई अनुदान राशि (प्राकलन राशि की 10%)</li>

// //                 </ul>

// //                 <br>
// //                 <div style="font-weight: 900;">Note: कृपया ध्यान दें डिमांड नोट जारी होने के ३० दिन के भीतर ही वैध
// //                     होंगे।</div>

// //             </div>
// //             <!-- mkmy table end -->

// //             <div *ngIf=" natureOfWorkTypeId!=8">
// //                 <table class="demandApproveTable"
// //                     *ngIf="consumerApplicationDetail?.applicationStatus?.applicationStatusId ==+ 12 && consumerApplicationDetail?.schemeType?.schemeTypeId == 1 ">
// //                     <thead>
// //                         <tr>
// //                             <th class="custom-srno">Sr. No.</th>
// //                             <th class="custom-particulatr">Particular</th>
// //                             <th class="custom-amount">Account Code <span class="required"></span></th>
// //                             <th class="custom-amount">Amount (in ₹)<span class="required"></span></th>
// //                             <!-- <th class="custom-amount"> Applicant allready Deposit (in ₹) </th>
// //                 <th class="custom-amount">Balance Amount to be deposited by applicant (in ₹)</th> -->

// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         <tr>
// //                             <td>1.</td>
// //                             <td class="custom-particular-td">&nbsp; Supervision Charges on Cost of Material (Excluding
// //                                 Service Tax Amount)</td>
// //                             <td class="custom-td">&nbsp;
// //                                 <!-- {{consumerDemandData?.supervisionChargesOnCostOfMaterial | number: '1.2-2' |
// //                     currency:"INR":"symbol"}} -->
// //                                 62.925
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpEstimateCalculations?.superVisionAmount!=null">
// //                                     {{erpEstimateCalculations?.superVisionAmount}}
// //                                 </div>

// //                                 <div *ngIf="erpEstimateCalculations?.superVisionAmount==null">
// //                                     0.00
// //                                 </div>

// //                             </td>
// //                             <!-- <td>00.00</td>
// //                 <td>{{erpEstimateCalculations?.supervisionBalanceRemaining}}</td> -->
// //                         </tr>
// //                         <tr>
// //                             <td>&nbsp;2.</td>
// //                             <td class="custom-particular-td">&nbsp;CGST-9%</td>
// //                             <td class="custom-td">&nbsp;
// //                                 <!-- {{consumerDemandData?.cgst | number: '1.2-2' | currency:"INR":"symbol"}} -->
// //                                 46.948
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpEstimateCalculations?.cgst!=null">
// //                                     {{erpEstimateCalculations?.cgst}}
// //                                 </div>

// //                                 <div *ngIf="erpEstimateCalculations?.cgst==null">
// //                                     0.00
// //                                 </div>

// //                                 <!-- {{erpEstimateCalculations?.cgst}}</td> -->
// //                                 <!-- <td>0</td>
// //                 <td>{{erpEstimateCalculations?.cgst}}</td> -->
// //                         </tr>
// //                         <tr>
// //                             <td>&nbsp;3.</td>
// //                             <td class="custom-particular-td">&nbsp;SGST-9%</td>
// //                             <td class="custom-td">&nbsp;
// //                                 <!-- {{consumerDemandData?.sgst | number: '1.2-2' | currency:"INR":"symbol"}} -->
// //                                 46.949
// //                             </td>
// //                             <td class="custom-td"> &nbsp;
// //                                 <div *ngIf="erpEstimateCalculations?.sgst!=null">
// //                                     {{erpEstimateCalculations?.sgst}}
// //                                 </div>

// //                                 <div *ngIf="erpEstimateCalculations?.sgst==null">
// //                                     0.00
// //                                 </div>

// //                                 <!-- {{erpEstimateCalculations?.sgst}}</td> -->
// //                                 <!-- <td>0</td>
// //                 <td>{{erpEstimateCalculations?.sgst}}</td> -->
// //                         </tr>


// //                         <tr>
// //                             <td>&nbsp;4.</td>
// //                             <td class="custom-particular-td">&nbsp;System Development Charges
// //                                 <!-- {{consumerApplicationDetail.loadRequested}} kw @ 500/- Per KW for KW Load -->
// //                             </td>
// //                             <td class="custom-td">&nbsp;
// //                                 <!-- {{consumerDemandData?.systemDevelopmentCharges | number: '1.2-2' | currency:"INR":"symbol"}} -->
// //                                 55.160
// //                             </td>
// //                             <!-- <td>0.00</td> -->
// //                             <!-- <td>{{erpEstimateCalculations?.kwLoadAmount}}</td> -->
// //                             <td>
// //                                 <div *ngIf="erpEstimateCalculations?.kwLoadAmount!=null">
// //                                     {{erpEstimateCalculations?.kwLoadAmount}}</div>
// //                                 <div *ngIf="erpEstimateCalculations?.kwLoadAmount==null">0.00</div>

// //                             </td>
// //                         </tr>
// //                         <tr>
// //                             <td>&nbsp;5.</td>
// //                             <td class="custom-particular-td">&nbsp;Deposit Charges(Excluding Supervision Charges and
// //                                 CGST,SGST
// //                                 on Supervision Charges)</td>
// //                             <td class="custom-td">&nbsp;
// //                                 <!-- {{consumerDemandData?.costOfEstimate | number: '1.2-2' | currency:"INR":"symbol"}} -->
// //                                 47.320
// //                             </td>
// //                             <td>0.00</td>
// //                             <!-- <td>0.00</td>
// //                 <td>0.00</td> -->
// //                         </tr>
// //                         <tr>
// //                             <td>&nbsp;6.</td>
// //                             <td class="custom-particular-td">&nbsp;Other Infrastructure related cost</td>
// //                             <td class="custom-td">&nbsp;
// //                                 0.00 <!-- {{consumerDemandData?.otherInfraStrucRelatedCost | number: '1.2-2' |
// //                     currency:"INR":"symbol"}} -->
// //                             </td>
// //                             <td>0.00</td>
// //                             <!-- <td>0.00</td>
// //                 <td>0.00</td> -->
// //                         </tr>
// //                         <tr>
// //                             <td>&nbsp;7.</td>
// //                             <td class="custom-particular-td">&nbsp;Supply Affording Charges @850 per KVA
// //                             </td>
// //                             <td class="custom-td">&nbsp;
// //                                 55.150
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpEstimateCalculations?.kvaLoadAmount != null">
// //                                     {{erpEstimateCalculations?.kvaLoadAmount}}</div>
// //                                 <div *ngIf="erpEstimateCalculations?.kvaLoadAmount == null">0.00</div>
// //                             </td>
// //                         </tr>

// //                         <tr>
// //                             <td>&nbsp;8.</td>
// //                             <td class="custom-particular-td">&nbsp;Deposit for Electrification of illegal Colony/Slum
// //                             </td>
// //                             <td class="custom-td">&nbsp; 47.337
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpEstimateCalculations?.colonyOrSlum != null">

// //                                     {{erpEstimateCalculations?.colonyOrSlum}}
// //                                 </div>
// //                                 <div *ngIf="erpEstimateCalculations?.colonyOrSlum == null">0.00</div>
// //                             </td>
// //                         </tr>

// //                         <tr
// //                             *ngIf="natureOfWorkTypeId==7 ||natureOfWorkTypeId==1 || natureOfWorkTypeId==2 || natureOfWorkTypeId==6">
// //                             <td>&nbsp;9.</td>
// //                             <td class="custom-particular-td">&nbsp;
// //                                 <!-- <div *ngIf="natureOfWorkTypeId==7">
// //                     Return Material amount in estimate
// //                 </div> -->


// //                                 Return Material amount in estimate


// //                             </td>
// //                             <td class="custom-td">&nbsp; 46.115
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpEstimateCalculations?.jeReturnAmount != null">

// //                                     {{erpEstimateCalculations?.jeReturnAmount}}
// //                                 </div>
// //                                 <div *ngIf="erpEstimateCalculations?.jeReturnAmount == null">0.00</div>
// //                             </td>
// //                         </tr>

// //                         <!-- extension with augmentation -->

// //                         <!-- Deposit for Electrification of illegal Colony/Slum -->
// //                         <!-- <tr>
// //             <td>&nbsp;10.</td>
// //             <td class="custom-particular-td">&nbsp;Return Material amount in estimate</td>
// //             <td class="custom-td">&nbsp;
// //                 0.00
// //             </td>
// //             <td>
// //                 <div *ngIf="erpEstimateCalculations?.jeReturnAmount != null">

// //                     {{erpEstimateCalculations?.jeReturnAmount}}
// //                 </div>
// //                 <div *ngIf="erpEstimateCalculations?.jeReturnAmount == null">0.00</div>
// //             </td>
// //         </tr> -->

// //                         <tr>
// //                             <td colspan="2">&nbsp; <strong>Total Amount (in ₹.) </strong></td>
// //                             <td class="custom-td">&nbsp;
// //                                 <strong>
// //                                     {{consumerDemandData?.demandRs | currency:"INR":"symbol"}}</strong>
// //                             </td>
// //                             <td>{{erpEstimateCalculations?.totalamountOfSupervision}}</td>
// //                         </tr>

// //                     </tbody>
// //                 </table>

// //                 <table class="demandApproveTable"
// //                     *ngIf="consumerApplicationDetail?.applicationStatus?.applicationStatusId ==+ 12 && consumerApplicationDetail?.schemeType?.schemeTypeId == 2 ">
// //                     <thead>
// //                         <tr>
// //                             <th class="custom-srno">Sr. No.</th>
// //                             <th class="custom-particulatr">Particular</th>
// //                             <th class="custom-amount">Account Code <span class="required"></span></th>
// //                             <th class="custom-amount">Amount (in ₹.)<span class="required"></span></th>
// //                             <!-- <th class="custom-amount"> Applicant allready Deposit (in ₹) </th>
// //                 <th class="custom-amount">Balance Amount to be deposited by applicant (in ₹)</th> -->

// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         <tr>
// //                             <td>1.</td>
// //                             <td class="custom-particular-td">&nbsp;Supervision Charges on Cost of Material (Excluding
// //                                 Service Tax Amount)</td>
// //                             <td class="custom-td">&nbsp;
// //                                 <!-- {{consumerDemandData?.supervisionChargesOnCostOfMaterial | number: '1.2-2' |
// //                     currency:"INR":"symbol"}} -->
// //                                 62.925
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpEstimateCalculations?.superVisionAmount!=null">
// //                                     {{erpEstimateCalculations?.superVisionAmount}}</div>
// //                                 <div *ngIf="erpEstimateCalculations?.superVisionAmount==null">0.00</div>

// //                             </td>
// //                             <!-- <td>0.00</td>
// //                 <td>0.00</td> -->
// //                         </tr>
// //                         <tr>
// //                             <td>&nbsp;2.</td>
// //                             <td class="custom-particular-td">&nbsp;CGST-9%</td>
// //                             <td class="custom-td">&nbsp;
// //                                 <!-- {{consumerDemandData?.cgst | number: '1.2-2' | currency:"INR":"symbol"}} -->
// //                                 46.948
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpEstimateCalculations?.cgst!=null"> {{erpEstimateCalculations?.cgst}}
// //                                 </div>
// //                                 <div *ngIf="erpEstimateCalculations?.cgst==null">0.00</div>

// //                             </td>
// //                             <!-- <td>0.00</td>
// //                 <td>0.00</td> -->
// //                         </tr>
// //                         <tr>
// //                             <td>&nbsp;3.</td>
// //                             <td class="custom-particular-td">&nbsp;SGST-9%</td>
// //                             <td class="custom-td">&nbsp;
// //                                 <!-- {{consumerDemandData?.sgst | number: '1.2-2' | currency:"INR":"symbol"}} -->
// //                                 46.949
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpEstimateCalculations?.sgst!=null">{{erpEstimateCalculations?.sgst}}</div>
// //                                 <div *ngIf="erpEstimateCalculations?.sgst==null">0.00</div>

// //                             </td>
// //                             <!-- <td>0.00</td>
// //                 <td>0.00</td> -->
// //                         </tr>

// //                         <tr>
// //                             <td>&nbsp;4.</td>
// //                             <td class="custom-particular-td">&nbsp;System Development Charges
// //                             </td>
// //                             <td class="custom-td">&nbsp;
// //                                 <!-- {{consumerDemandData?.systemDevelopmentCharges | number: '1.2-2' | currency:"INR":"symbol"}} -->
// //                                 55.160
// //                             </td>
// //                             <td>0.00</td>
// //                             <!-- <td>0.00</td>
// //                 <td>0.00</td> -->
// //                         </tr>
// //                         <tr>
// //                             <td>&nbsp;5.</td>
// //                             <td class="custom-particular-td">&nbsp;Deposit Charges(Excluding Supervision Charges and
// //                                 CGST,SGST
// //                                 on Supervision Charges)</td>
// //                             <td class="custom-td">&nbsp;
// //                                 <!-- {{consumerDemandData?.costOfEstimate | number: '1.2-2' | currency:"INR":"symbol"}} -->
// //                                 47.320
// //                             </td>
// //                             <!-- <td>{{erpEstimateCalculations.depositAmount | number: '1.2-2' | currency:"INR":"symbol"}}</td> -->
// //                             <td>
// //                                 <div *ngIf="erpEstimateCalculations?.superVisionAmount == null">
// //                                     {{erpEstimateCalculations?.depositAmount | currency:"INR":"symbol"}}

// //                                 </div>
// //                                 <div *ngIf="erpEstimateCalculations?.depositAmount == null">
// //                                     {{erpEstimateCalculations?.superVisionAmount | currency:"INR":"symbol"}}
// //                                 </div>

// //                                 <div
// //                                     *ngIf="erpEstimateCalculations?.depositAmount != null && erpEstimateCalculations?.superVisionAmount != null">
// //                                     {{erpEstimateCalculations?.depositAmount | currency:"INR":"symbol"}}
// //                                 </div>

// //                                 <div
// //                                     *ngIf="erpEstimateCalculations?.depositAmount == null && erpEstimateCalculations?.superVisionAmount == null">
// //                                     0.00
// //                                 </div>


// //                             </td>
// //                             <!-- <td>1000.00</td>
// //                 <td>{{erpEstimateCalculations?.balanceRemaining}}</td> -->
// //                         </tr>
// //                         <tr>
// //                             <td>&nbsp;6.</td>
// //                             <td class="custom-particular-td">&nbsp;Other Infrastructure related cost</td>
// //                             <td class="custom-td">&nbsp;
// //                                 <!-- {{consumerDemandData?.otherInfraStrucRelatedCost | number: '1.2-2' |
// //                     currency:"INR":"symbol"}} -->
// //                             </td>
// //                             <td>0.00</td>
// //                             <!-- <td>0.00</td>
// //                 <td>0.00</td> -->
// //                         </tr>

// //                         <tr>
// //                             <td>&nbsp;7.</td>
// //                             <td class="custom-particular-td">&nbsp;Deposit for Electrification of illegal Colony/Slum
// //                             </td>
// //                             <td class="custom-td">&nbsp; 47.337
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpEstimateCalculations?.colonyOrSlum != null">

// //                                     {{erpEstimateCalculations?.colonyOrSlum}}
// //                                 </div>
// //                                 <div *ngIf="erpEstimateCalculations?.colonyOrSlum == null">0.00</div>
// //                             </td>
// //                         </tr>


// //                         <tr>
// //                             <td>&nbsp;8.</td>
// //                             <td class="custom-particular-td">&nbsp;Supply Affording Charges @850 per KVA
// //                             </td>
// //                             <td class="custom-td">&nbsp;
// //                                 55.150
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpEstimateCalculations?.kvaLoadAmount != null">
// //                                     {{erpEstimateCalculations?.kvaLoadAmount}}</div>
// //                                 <div *ngIf="erpEstimateCalculations?.kvaLoadAmount == null">0.00</div>
// //                             </td>
// //                         </tr>

// //                         <tr
// //                             *ngIf="natureOfWorkTypeId==2 || natureOfWorkTypeId==1 || natureOfWorkTypeId==7 || natureOfWorkTypeId==6">
// //                             <td>&nbsp;9.</td>
// //                             <td class="custom-particular-td">&nbsp;
// //                                 <!-- <div *ngIf="natureOfWorkTypeId==7">
// //                     Return Material amount in estimate
// //                 </div> -->

// //                                 <span
// //                                     *ngIf="natureOfWorkTypeId==2 || natureOfWorkTypeId==7 || natureOfWorkTypeId==1 || natureOfWorkTypeId==6">
// //                                     Return Material amount in estimate
// //                                 </span>

// //                             </td>
// //                             <td class="custom-td">&nbsp; 46.115
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpEstimateCalculations?.jeReturnAmount != null">

// //                                     {{erpEstimateCalculations?.jeReturnAmount}}
// //                                 </div>
// //                                 <div *ngIf="erpEstimateCalculations?.jeReturnAmount == null">0.00</div>
// //                             </td>
// //                         </tr>

// //                         <tr>
// //                             <td colspan="2">&nbsp; <strong>Total Amount (in ₹) </strong></td>
// //                             <td class="custom-td">&nbsp;
// //                                 <!-- <strong>
// //                         {{consumerDemandData?.demandRs | currency:"INR":"symbol"}}</strong> -->
// //                             </td>
// //                             <td>
// //                                 <!-- {{erpEstimateCalculations?.balanceRemaining}} -->
// //                                 <div *ngIf="erpEstimateCalculations?.totalamountOfSupervision == null">
// //                                     {{erpEstimateCalculations?.totaldepositAmount | currency:"INR":"symbol"}}

// //                                 </div>
// //                                 <div *ngIf="erpEstimateCalculations?.totaldepositAmount == null">
// //                                     {{erpEstimateCalculations?.totalamountOfSupervision | currency:"INR":"symbol"}}
// //                                 </div>
// //                             </td>
// //                         </tr>
// //                     </tbody>
// //                 </table>
// //             </div>

// //             <mat-divider class="custom-mat-divider">

// //             </mat-divider>
// //             <!-- sandeep, end -->

// //             <br>
// //         </div>

// //         <div *ngIf="consumerApplicationDetail?.applicationStatus?.applicationStatusId==30">
// //             <div>

// //                 <div class="row custom-row">

// //                     <div class="col-md-12 custom-col-md-12">

// //                         <table id="tableID" border="1" width="100%" cellspacing="1" #scrollBottom>

// //                             <tbody id="tablebody">
// //                                 <tr class="col-md-12">
// //                                     <td class="tableHeaders col-md-4">Application Number</td>
// //                                     <td class="tabledatas col-md-8">{{consumerApplicationDetail?.consumerApplicationNo}}
// //                                     </td>
// //                                 </tr>

// //                                 <tr class="col-md-12">
// //                                     <td class="tableHeaders col-md-4">Name</td>
// //                                     <td class="tabledatas col-md-8">{{consumerApplicationDetail?.consumerName
// //                                         }}
// //                                     </td>
// //                                 </tr>

// //                                 <tr class="col-md-12">
// //                                     <td class="tableHeaders col-md-4">Email</td>
// //                                     <td class="tabledatas col-md-8">
// //                                         {{consumerApplicationDetail?.consumers?.consumerEmailId}}
// //                                     </td>
// //                                 </tr>
// //                                 <tr class="col-md-12">
// //                                     <td class="tableHeaders col-md-4">Mobile No.</td>
// //                                     <td class="tabledatas col-md-8">
// //                                         {{consumerApplicationDetail?.consumers?.consumerMobileNo}}
// //                                     </td>
// //                                 </tr>

// //                                 <tr *ngIf="consumerApplicationDetail.gstNumber!=null">
// //                                     <td class="tableHeaders col-md-4">GST Number</td>
// //                                     <td class="tabledatas col-md-8">
// //                                         {{consumerApplicationDetail.gstNumber}}
// //                                     </td>
// //                                 </tr>

// //                                 <tr class="col-md-12">
// //                                     <td class="tableHeaders col-md-4">Payment particular</td>
// //                                     <td class="tabledatas col-md-8">
// //                                         Revise Demand Note
// //                                     </td>
// //                                 </tr>

// //                                 <!-- <tr *ngIf="erpReviseData!=null || erpReviseData!=undefined" class="col-md-12">
// //                                     <th class="tableHeaders col-md-4">CGST-9%</th>
// //                                     <td class="tabledatas col-md-8"> {{erpReviseData?.remCgst}}</td>
// //                                 </tr>
// //                                 <tr *ngIf="erpReviseData!=null || erpReviseData!=undefined" class="col-md-12">
// //                                     <th class="tableHeaders col-md-4">SGST-9%</th>
// //                                     <td class="tabledatas col-md-8">{{erpReviseData?.remSgst}}</td>
// //                                 </tr>
        
// //                                 <tr class="col-md-12" *ngIf="erpReviseData!=null || erpReviseData!=undefined">
// //                                     <td class="tableHeaders col-md-4" *ngIf="erpReviseData!=null || erpReviseData!=undefined">
// //                                         Total
// //                                         Amount (in ₹)
// //                                     </td>
// //                                     <td class="tableHeaders col-md-4"
// //                                         *ngIf="consumerApplicationDetail?.applicationStatus.applicationStatusId==12">Fees (in ₹)
// //                                     </td>
        
// //                                     <td class="tabledatas col-md-8">
// //                                         {{erpReviseData?.payAmt}}
        
// //                                     </td>
// //                                 </tr> -->
// //                             </tbody>
// //                         </table>

// //                     </div>
// //                 </div>

// //                 <br>
// //                 <br>


// //                 <mat-divider class="custom-mat-divider">

// //                 </mat-divider>


// //                 <br>

// //                 <div *ngIf="openTableBoolean">


// //                     <table class="table table-bordered"
// //                         *ngIf="consumerApplicationDetail?.schemeType?.schemeTypeId == 1  && natureOfWorkTypeId!=8">
// //                         <tr aria-rowspan="3" style="justify-content: center; align-items: center;">

// //                             <th colspan="5">
// //                                 <h2 style="display: flex; justify-content: center; align-items: center;"> Total Payment
// //                                     Details
// //                                 </h2>
// //                             </th>

// //                         </tr>

// //                         <tr>
// //                             <th scope="col">S.NO.</th>
// //                             <th scope="col"> Particular</th>
// //                             <th scope="col">Account Head</th>
// //                             <th scope="col">Old Demand Payment Details</th>
// //                             <th scope="col">New Demand Payment Details</th>
// //                             <th scope="col">Amount Difference</th>
// //                         </tr>

// //                         <tr>
// //                             <td>1</td>
// //                             <td scope="row">&nbsp; Supervision Charges on Cost of Material (Excluding
// //                                 Service Tax Amount)</td>
// //                             <td>
// //                                 62.925
// //                             </td>

// //                             <td>
// //                                 <div *ngIf="erpReviseData?.oldSupervision!=null">
// //                                     {{erpReviseData?.oldSupervision}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.oldSupervision==null">
// //                                     0.00
// //                                 </div>

// //                             </td>

// //                             <td>
// //                                 <div *ngIf="erpReviseData?.newSupervisionAmt!=null">
// //                                     {{erpReviseData?.newSupervisionAmt}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.newSupervisionAmt==null">
// //                                     0.00
// //                                 </div>
// //                             </td>

// //                             <td>
// //                                 <div *ngIf="erpReviseData?.remSupervisionAmt!=null">
// //                                     {{erpReviseData?.remSupervisionAmt}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.remSupervisionAmt==null">
// //                                     0.00
// //                                 </div>
// //                             </td>

// //                         </tr>


// //                         <tr>
// //                             <td>2</td>
// //                             <td scope="row">&nbsp;CGST-9%</td>
// //                             <td> 46.948</td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.oldCgst!=null">
// //                                     {{erpReviseData?.oldCgst}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.oldCgst==null">
// //                                     0.00
// //                                 </div>
// //                             </td>

// //                             <td>
// //                                 <div *ngIf="erpReviseData?.newCgst!=null">
// //                                     {{erpReviseData?.newCgst}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.newCgst==null">
// //                                     0.00
// //                                 </div>

// //                                 <!-- <div *ngIf="erpReviseData?.cgst!=null">
// //                                     {{erpReviseData?.cgst}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.cgst==null">
// //                                     0.00
// //                                 </div> -->
// //                             </td>

// //                             <td>
// //                                 <div *ngIf="erpReviseData?.remCgst!=null">
// //                                     {{erpReviseData?.remCgst}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.remCgst==null">
// //                                     0.00
// //                                 </div>

// //                             </td>
// //                         </tr>

// //                         <tr>
// //                             <td>3</td>
// //                             <td scope="row">&nbsp;SGST-9%</td>
// //                             <td>46.949</td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.oldSgst!=null">
// //                                     {{erpReviseData?.oldSgst}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.oldSgst==null">
// //                                     0.00
// //                                 </div>

// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.newSgst!=null">
// //                                     {{erpReviseData?.newSgst}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.newSgst==null">
// //                                     0.00
// //                                 </div>

// //                                 <!-- <div *ngIf="erpReviseData?.sgst!=null">
// //                                     {{erpReviseData?.sgst}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.sgst==null">
// //                                     0.00
// //                                 </div> -->
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.remSgst!=null">
// //                                     {{erpReviseData?.remSgst}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.remSgst==null">
// //                                     0.00
// //                                 </div>

// //                             </td>
// //                         </tr>

// //                         <tr>
// //                             <td>4</td>
// //                             <td scope="row">&nbsp;System Development Charges</td>
// //                             <td>55.160</td>
// //                             <td>

// //                                 <div *ngIf="erpReviseData?.oldkWloadAmt!=null">
// //                                     {{erpReviseData?.oldkWloadAmt}}</div>
// //                                 <div *ngIf="erpReviseData?.oldkWloadAmt==null">0.00</div>

// //                             </td>
// //                             <td>

// //                                 <div *ngIf="erpReviseData?.newKwAmt!=null">
// //                                     {{erpReviseData?.newKwAmt}}</div>
// //                                 <div *ngIf="erpReviseData?.newKwAmt==null">0.00</div>

// //                                 <!-- <div *ngIf="erpReviseData?.kwAmt!=null">
// //                                     {{erpReviseData?.kwAmt}}</div>
// //                                 <div *ngIf="erpReviseData?.kwAmt==null">0.00</div> -->

// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.remKwAmt!=null">
// //                                     {{erpReviseData?.remKwAmt}}</div>
// //                                 <div *ngIf="erpReviseData?.remKwAmt==null">0.00</div>
// //                                 <!-- remKwAmt -->
// //                             </td>
// //                         </tr>

// //                         <tr>
// //                             <td>5</td>
// //                             <td scope="row">&nbsp;Deposit Charges(Excluding Supervision Charges and CGST,SGST on
// //                                 Supervision
// //                                 Charges)</td>
// //                             <td> 47.320</td>
// //                             <td>0.00</td>
// //                             <td>0.00</td>
// //                             <td>
// //                                 0.00
// //                             </td>
// //                         </tr>

// //                         <tr>
// //                             <td>6</td>
// //                             <td scope="row">&nbsp;Other Infrastructure related cost</td>
// //                             <td>0.00</td>
// //                             <td>0.00</td>
// //                             <td>0.00</td>
// //                             <td>0.00</td>
// //                         </tr>

// //                         <tr>
// //                             <td>7</td>
// //                             <td scope="row">&nbsp;Supply Affording Charges @850 per KVA</td>
// //                             <td> 55.150</td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.oldkvaloadAmt != null">
// //                                     {{erpReviseData?.oldkvaloadAmt}}</div>
// //                                 <div *ngIf="erpReviseData?.oldkvaloadAmt == null">0.00</div>
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.newKvaAmt!=null">
// //                                     {{erpReviseData?.newKvaAmt}}</div>
// //                                 <div *ngIf="erpReviseData?.newKvaAmt==null">0.00</div>

// //                                 <!-- <div *ngIf="erpReviseData?.kvaAmt!=null">
// //                                     {{erpReviseData?.kvaAmt}}</div>
// //                                 <div *ngIf="erpReviseData?.kvaAmt==null">0.00</div> -->
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.remKvaAmt!=null">
// //                                     {{erpReviseData?.remKvaAmt}}</div>
// //                                 <div *ngIf="erpReviseData?.remKvaAmt==null">0.00</div>
// //                             </td>
// //                         </tr>

// //                         <tr>
// //                             <td>8</td>
// //                             <td scope="row">&nbsp;Deposit for Electrification of illegal Colony/Slum</td>
// //                             <td>47.337</td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.oldColonyOrSlum != null">

// //                                     {{erpReviseData?.oldColonyOrSlum}}
// //                                 </div>
// //                                 <div *ngIf="erpReviseData?.oldColonyOrSlum == null">0.00</div>

// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.newColonyOrSlum!=null">
// //                                     {{erpReviseData?.newColonyOrSlum}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.newColonyOrSlum==null">
// //                                     0.00
// //                                 </div>

// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.remColonyOrSlum!=null">
// //                                     {{erpReviseData?.remColonyOrSlum}}
// //                                 </div>
// //                                 <div *ngIf="erpReviseData?.remColonyOrSlum==null">
// //                                     0.00
// //                                 </div>

// //                             </td>
// //                         </tr>

// //                         <!-- <tr>
// //                         <td>9</td>
// //                         <td> Return Material amount in estimate</td>
// //                         <td>0.00</td>
// //                         <td>
// //                             <div *ngIf="erpReviseData?.oldJeReturnAmt != null">
    
// //                                 {{erpReviseData?.oldJeReturnAmt}}
// //                             </div>
// //                             <div *ngIf="erpReviseData?.oldJeReturnAmt == null">0.00</div>
                           
// //                         </td>
// //                         <td>0.00</td>
// //                         <td>
// //                             0.00
// //                         </td>
// //                     </tr> -->


// //                         <tr>
// //                             <!-- h111111111111 -->
// //                             <td>9</td>
// //                             <!-- h2222222 -->
// //                             <td>
// //                                 &nbsp;

// //                                 Return Material amount in estimate

// //                             </td>
// //                             <td>46.115</td>

// //                             <td>
// //                                 <div *ngIf="erpReviseData?.oldJeReturnAmt != null">
// //                                     <!-- h3333333333333333333333333333333333333333333 -->
// //                                     {{erpReviseData?.oldJeReturnAmt}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.oldJeReturnAmt == null">0.00 </div>

// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.oAndMReturnAmt != null">
// //                                     <!-- h3333333333333333333333333333333333333333333 -->
// //                                     {{erpReviseData?.oAndMReturnAmt}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.oAndMReturnAmt == null">0.00 </div>
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.remReturnAmt != null">
// //                                     <!-- h3333333333333333333333333333333333333333333 -->
// //                                     {{erpReviseData?.remReturnAmt}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.remReturnAmt == null">0.00 </div>
// //                             </td>
// //                         </tr>


// //                         <tr>

// //                             <td colspan="3">
// //                                 Total Paid Amount
// //                             </td>
// //                             <td>
// //                                 {{erpReviseData?.oldPayableAmt | currency:"INR":"symbol"}}
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="natureOfWorkTypeId!=8">
// //                                     {{erpReviseData?.newPayAmt | currency:"INR":"symbol"}}
// //                                 </div>
// //                                 <div *ngIf="natureOfWorkTypeId==8"> {{erpReviseData?.mkmyPayAmt}}</div>
// //                             </td>
// //                             <td>{{erpReviseData?.payAmt | currency:"INR":"symbol"}}</td>
// //                         </tr>

// //                         <tr>
// //                             <td colspan="3" scope="row">&nbsp; <strong>Total Amount to be Paid (in ₹.) </strong></td>
// //                             <td colspan="3">&nbsp; <strong> {{erpReviseData?.payAmt}} </strong></td>
// //                         </tr>

// //                     </table>


// //                     <table class="table table-bordered"
// //                         *ngIf="consumerApplicationDetail?.schemeType?.schemeTypeId == 2  && natureOfWorkTypeId!=8">
// //                         <!-- && natureOfWorkTypeId!=8 -->
// //                         <tr aria-rowspan="3" style="justify-content: center; align-items: center;">

// //                             <th colspan="5">
// //                                 <h2 style="display: flex; justify-content: center; align-items: center;"> Total Payment
// //                                     Details
// //                                 </h2>
// //                             </th>

// //                         </tr>

// //                         <tr>
// //                             <th>S.NO.</th>
// //                             <th> Particular</th>
// //                             <th>Account Code</th>
// //                             <th>Old Demand Payment Details</th>
// //                             <th>New Demand Payment Details</th>
// //                             <th>Amount Difference</th>
// //                         </tr>

// //                         <tr>
// //                             <td>1</td>
// //                             <td>&nbsp;Supervision Charges on Cost of Material (Excluding
// //                                 Service Tax Amount)</td>
// //                             <td> 62.925</td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.oldSupervision!=null">{{erpReviseData?.oldSupervision}}</div>
// //                                 <div *ngIf="erpReviseData?.oldSupervision==null">0.00</div>
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.newSupervisionAmt!=null">{{erpReviseData?.newSupervisionAmt}}
// //                                 </div>
// //                                 <div *ngIf="erpReviseData?.newSupervisionAmt==null">0.00</div>
// //                                 <!-- <div *ngIf="erpReviseData?.supervisionAmt!=null">{{erpReviseData?.supervisionAmt}}
// //                                 </div>
// //                                 <div *ngIf="erpReviseData?.supervisionAmt==null">0.00</div> -->
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.remSupervisionAmt!=null">{{erpReviseData?.remSupervisionAmt}}
// //                                 </div>
// //                                 <div *ngIf="erpReviseData?.remSupervisionAmt==null">0.00</div>
// //                             </td>
// //                         </tr>

// //                         <tr>
// //                             <td>2</td>
// //                             <td>&nbsp;CGST-9%</td>
// //                             <td>46.948</td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.oldCgst!=null"> {{erpReviseData?.oldCgst}}</div>
// //                                 <div *ngIf="erpReviseData?.oldCgst==null">0.00</div>
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.newCgst!=null"> {{erpReviseData?.newCgst}}</div>
// //                                 <div *ngIf="erpReviseData?.newCgst==null">0.00</div>

// //                                 <!-- <div *ngIf="erpReviseData?.cgst!=null"> {{erpReviseData?.cgst}}</div>
// //                                 <div *ngIf="erpReviseData?.cgst==null">0.00</div> -->
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.remCgst!=null">
// //                                     {{erpReviseData?.remCgst}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.remCgst==null">
// //                                     0.00
// //                                 </div>
// //                             </td>
// //                         </tr>

// //                         <tr>
// //                             <td>3</td>
// //                             <td>&nbsp;SGST-9%</td>
// //                             <td>46.949</td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.oldSgst!=null"> {{erpReviseData?.oldSgst}}</div>
// //                                 <div *ngIf="erpReviseData?.oldSgst==null">0.00</div>
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.newSgst!=null"> {{erpReviseData?.newSgst}}</div>
// //                                 <div *ngIf="erpReviseData?.newSgst==null">0.00</div>

// //                                 <!-- <div *ngIf="erpReviseData?.sgst!=null"> {{erpReviseData?.sgst}}</div>
// //                                 <div *ngIf="erpReviseData?.sgst==null">0.00</div> -->
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.remSgst!=null">
// //                                     {{erpReviseData?.remSgst}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.remSgst==null">
// //                                     0.00
// //                                 </div>
// //                             </td>
// //                         </tr>

// //                         <tr>
// //                             <td>4</td>
// //                             <td>&nbsp;System Development Charges</td>
// //                             <td> 55.160</td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.oldkWloadAmt!=null">
// //                                     {{erpReviseData?.oldkWloadAmt}}</div>
// //                                 <div *ngIf="erpReviseData?.oldkWloadAmt==null">0.00</div>
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.newKwAmt!=null">
// //                                     {{erpReviseData?.newKwAmt}}</div>
// //                                 <div *ngIf="erpReviseData?.newKwAmt==null">0.00</div>

// //                                 <!-- <div *ngIf="erpReviseData?.kwAmt!=null">
// //                                     {{erpReviseData?.kwAmt}}</div>
// //                                 <div *ngIf="erpReviseData?.kwAmt==null">0.00</div> -->
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.remKwAmt!=null">
// //                                     {{erpReviseData?.remKwAmt}}</div>
// //                                 <div *ngIf="erpReviseData?.remKwAmt==null">0.00</div>
// //                             </td>
// //                         </tr>

// //                         <tr>
// //                             <td>5</td>
// //                             <td>&nbsp;Deposit Charges(Excluding Supervision Charges and CGST,SGST on Supervision
// //                                 Charges)</td>
// //                             <td>47.320</td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.oldSupervision == null">
// //                                     {{erpReviseData?.oldDeposit | currency:"INR":"symbol"}}

// //                                 </div>
// //                                 <div *ngIf="erpReviseData?.oldDeposit == null">
// //                                     {{erpReviseData?.oldSupervision | currency:"INR":"symbol"}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.oldDeposit != null && erpReviseData?.oldSupervision != null">
// //                                     {{erpReviseData?.oldDeposit | currency:"INR":"symbol"}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.oldDeposit == null && erpReviseData?.oldSupervision == null">
// //                                     0.00
// //                                 </div>

// //                             </td>

// //                             <td>

// //                                 <div *ngIf="erpReviseData?.supervisionAmt == null">
// //                                     {{erpReviseData?.newDepositAmt | currency:"INR":"symbol"}}

// //                                 </div>
// //                                 <div *ngIf="erpReviseData?.newDepositAmt == null">
// //                                     {{erpReviseData?.supervisionAmt | currency:"INR":"symbol"}}
// //                                 </div>

// //                                 <div
// //                                     *ngIf="erpReviseData?.newDepositAmt != null && erpReviseData?.supervisionAmt != null">
// //                                     {{erpReviseData?.newDepositAmt | currency:"INR":"symbol"}}
// //                                 </div>

// //                                 <div
// //                                     *ngIf="erpReviseData?.newDepositAmt == null && erpReviseData?.supervisionAmt == null">
// //                                     0.00
// //                                 </div>

// //                                 <!-- <div *ngIf="erpReviseData?.supervisionAmt == null">
// //                                     {{erpReviseData?.DepositAmt | currency:"INR":"symbol"}}

// //                                 </div>
// //                                 <div *ngIf="erpReviseData?.DepositAmt == null">
// //                                     {{erpReviseData?.supervisionAmt | currency:"INR":"symbol"}}
// //                                 </div>

// //                                 <div
// //                                     *ngIf="erpReviseData?.DepositAmt != null && erpReviseData?.supervisionAmt != null">
// //                                     {{erpReviseData?.DepositAmt | currency:"INR":"symbol"}}
// //                                 </div>

// //                                 <div
// //                                     *ngIf="erpReviseData?.DepositAmt == null && erpReviseData?.supervisionAmt == null">
// //                                     0.00
// //                                 </div> -->
// //                             </td>

// //                             <td>
// //                                 <div *ngIf="erpReviseData?.remSupervisionAmt == null">
// //                                     {{erpReviseData?.remmDepositAmt | currency:"INR":"symbol"}}

// //                                 </div>
// //                                 <div *ngIf="erpReviseData?.remmDepositAmt == null">
// //                                     {{erpReviseData?.remSupervisionAmt | currency:"INR":"symbol"}}
// //                                 </div>

// //                                 <div
// //                                     *ngIf="erpReviseData?.remmDepositAmt != null && erpReviseData?.remSupervisionAmt != null">
// //                                     {{erpReviseData?.remmDepositAmt | currency:"INR":"symbol"}}
// //                                 </div>

// //                                 <div
// //                                     *ngIf="erpReviseData?.remmDepositAmt == null && erpReviseData?.remSupervisionAmt == null">
// //                                     0.00
// //                                 </div>

// //                             </td>
// //                         </tr>

// //                         <tr>
// //                             <td>6</td>
// //                             <td>&nbsp;Other Infrastructure related cost</td>
// //                             <td>0.00</td>
// //                             <td>0.00</td>
// //                             <td>0.00</td>
// //                             <td>0.00</td>
// //                         </tr>

// //                         <tr>
// //                             <td>7</td>
// //                             <td>&nbsp;Deposit for Electrification of illegal Colony/Slum</td>
// //                             <td> 47.337</td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.oldColonyOrSlum != null">

// //                                     {{erpReviseData?.oldColonyOrSlum}}
// //                                 </div>
// //                                 <div *ngIf="erpReviseData?.oldColonyOrSlum == null">0.00</div>

// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.newColonyOrSlum!=null">
// //                                     {{erpReviseData?.newColonyOrSlum}}
// //                                 </div>
// //                                 <div *ngIf="erpReviseData?.newColonyOrSlum==null">
// //                                     0.00
// //                                 </div>

// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.remColonyOrSlum!=null">
// //                                     {{erpReviseData?.remColonyOrSlum}}
// //                                 </div>
// //                                 <div *ngIf="erpReviseData?.remColonyOrSlum==null">
// //                                     0.00
// //                                 </div>

// //                             </td>
// //                         </tr>

// //                         <tr>
// //                             <td>8</td>
// //                             <td>&nbsp;Supply Affording Charges @850 per KVA</td>
// //                             <td> 55.150</td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.oldkvaloadAmt != null">
// //                                     {{erpReviseData?.oldkvaloadAmt}}</div>
// //                                 <div *ngIf="erpReviseData?.oldkvaloadAmt == null">0.00</div>
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.newKvaAmt != null">
// //                                     {{erpReviseData?.newKvaAmt}}</div>
// //                                 <div *ngIf="erpReviseData?.newKvaAmt == null">0.00</div>

// //                                 <!-- <div *ngIf="erpReviseData?.kvaAmt != null">
// //                                     {{erpReviseData?.kvaAmt}}</div>
// //                                 <div *ngIf="erpReviseData?.kvaAmt == null">0.00</div> -->
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.remKvaAmt != null">
// //                                     {{erpReviseData?.remKvaAmt}}</div>
// //                                 <div *ngIf="erpReviseData?.remKvaAmt == null">0.00</div>
// //                             </td>
// //                         </tr>

// //                         <tr>
// //                             <!-- h111111111111 -->
// //                             <td>9</td>
// //                             <!-- h2222222 -->
// //                             <td>
// //                                 &nbsp;

// //                                 Return Material amount in estimate

// //                             </td>
// //                             <td>46.115</td>

// //                             <td>
// //                                 <div *ngIf="erpReviseData?.oldJeReturnAmt != null">
// //                                     <!-- h3333333333333333333333333333333333333333333 -->
// //                                     {{erpReviseData?.oldJeReturnAmt}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.oldJeReturnAmt == null">0.00 </div>

// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.oAndMReturnAmt != null">
// //                                     <!-- h3333333333333333333333333333333333333333333 -->
// //                                     {{erpReviseData?.oAndMReturnAmt}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.oAndMReturnAmt == null">0.00 </div>
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="erpReviseData?.remReturnAmt != null">
// //                                     <!-- h3333333333333333333333333333333333333333333 -->
// //                                     {{erpReviseData?.remReturnAmt}}
// //                                 </div>

// //                                 <div *ngIf="erpReviseData?.remReturnAmt == null">0.00 </div>
// //                             </td>
// //                         </tr>

// //                         <tr>

// //                             <td colspan="3">
// //                                 Total Paid Amount
// //                             </td>
// //                             <td>
// //                                 {{erpReviseData?.oldPayableAmt | currency:"INR":"symbol"}}
// //                             </td>
// //                             <td>
// //                                 <div *ngIf="natureOfWorkTypeId!=8">
// //                                     {{erpReviseData?.newPayAmt | currency:"INR":"symbol"}}
// //                                 </div>
// //                                 <div *ngIf="natureOfWorkTypeId==8"> {{erpReviseData.mkmyPayAmt}}</div>
// //                             </td>
// //                             <td>{{erpReviseData?.payAmt | currency:"INR":"symbol"}}</td>

// //                         </tr>

// //                         <tr>
// //                             <td colspan="3">&nbsp; <strong>Total Amount to be Paid (in ₹) </strong></td>
// //                             <td colspan="3">&nbsp;
// //                                 {{erpReviseData?.payAmt}}
// //                                 <strong>

// //                                 </strong>
// //                             </td>

// //                         </tr>




// //                     </table>

// //                     <table class="table table-bordered" *ngIf=" natureOfWorkTypeId==8">
// //                         <tr aria-rowspan="3" style="justify-content: center; align-items: center;">

// //                             <th colspan="5">
// //                                 <h2 style="display: flex; justify-content: center; align-items: center;"> Total Payment
// //                                     Details
// //                                 </h2>
// //                             </th>

// //                         </tr>

// //                         <tr>
// //                             <th scope="col">S.NO.</th>
// //                             <th scope="col"> Particular</th>
// //                             <th scope="col">Account Head</th>
// //                             <th scope="col">Old Demand Payment Details</th>
// //                             <th scope="col">New Demand Payment Details</th>
// //                             <th scope="col">Amount Difference</th>
// //                         </tr>

// //                         <!-- <th>आवेदन क्रमांक</th>
// //                     <th>कुल प्राकलन राशि</th>
// //                     <th>म.प्र द्वारा दी गई अनुदान राशि(40%)</th>
// //                     <th>म.प्र विद्युत कंपनी द्वारा दी गई अनुदान राशि(10%)</th>
// //                     <th>सिक्योरिटी डिपाजिट </th>
// //                     <th>आवेदन शुल्क </th>
// //                     <th>उपभोक्ता द्वारा वहन की गई राशि (50%)</th>
// //                     <th>इ. आर. पी. नंबर </th>
// //                     <th>स्कीम कोड </th> -->

// //                         <tr>
// //                             <td>1</td>
// //                             <td scope="row">&nbsp; कुल प्राकलन राशि</td>
// //                             <td></td>
// //                             <td>{{erpReviseData?.oldEstimate}}</td>
// //                             <td>{{erpReviseData?.newEstimateAmt}}</td>
// //                             <!-- <td>{{erpReviseData?.estimateAmt}}</td> -->
// //                             <td>{{erpReviseData?.remEstimateAmt}}</td>
// //                         </tr>

// //                         <tr>
// //                             <td>2</td>
// //                             <td scope="row">&nbsp;म.प्र द्वारा दी गई अनुदान राशि(40%)</td>
// //                             <td></td>
// //                             <td>{{erpReviseData?.oldGovMafAmt}}</td>
// //                             <td>{{erpReviseData?.govMafAmt}}</td>
// //                             <td>{{erpReviseData?.remGovMafAmt}}</td>

// //                         </tr>

// //                         <tr>
// //                             <td>3</td>
// //                             <td scope="row">&nbsp;म.प्र विद्युत कंपनी द्वारा दी गई अनुदान राशि(10%)</td>
// //                             <td></td>
// //                             <td>{{erpReviseData?.oldMpmkMafAmt}}</td>
// //                             <td>{{erpReviseData?.mpmkMafAmt}}</td>
// //                             <td>{{erpReviseData?.remMpmkMafAmt}}</td>

// //                         </tr>

// //                         <tr>
// //                             <td>4</td>
// //                             <td scope="row">&nbsp;सिक्योरिटी डिपाजिट </td>
// //                             <td></td>
// //                             <td>{{erpReviseData?.oldMkmySecurityDeposit}}</td>
// //                             <td>NA</td>
// //                             <td>NA</td>

// //                         </tr>

// //                         <tr>
// //                             <td rowspan="2">5</td>
// //                             <td scope="row" rowspan="2">&nbsp;आवेदन शुल्क</td>
// //                             <td>62.936</td>
// //                             <td>5</td>
// //                             <td>NA</td>
// //                             <td>NA</td>

// //                         </tr>

// //                         <tr>
// //                             <td>47.310</td>
// //                             <td>2495</td>
// //                             <td>NA</td>
// //                             <td>NA</td>
// //                         </tr>

// //                         <tr>
// //                             <td>6</td>
// //                             <td scope="row">&nbsp;उपभोक्ता द्वारा वहन की गई राशि (50%)</td>
// //                             <td>47.345</td>
// //                             <td>{{erpReviseData?.oldCarryAmt }}</td>
// //                             <td>{{erpReviseData?.mkmyPayAmt}}</td>
// //                             <td>{{erpReviseData?.remMkmyPayAmt}}</td>

// //                         </tr>



// //                         <tr>
// //                             <td>7</td>
// //                             <td scope="row">&nbsp;स्कीम कोड</td>
// //                             <td></td>
// //                             <td>KMY</td>
// //                             <td>KMY</td>
// //                             <td>KMY</td>
// //                         </tr>

// //                         <tr>
// //                             <td colspan="3">&nbsp; <strong>Total Amount to be Paid (in ₹) </strong></td>
// //                             <td colspan="3">&nbsp;
// //                                 {{erpReviseData?.remMkmyPayAmt}}
// //                                 <strong>

// //                                 </strong>
// //                             </td>

// //                         </tr>

// //                     </table>



// //                 </div>

// //             </div>




// //         </div>

// //         <!-- <div *ngIf="consumerApplicationDetail.avedakKaPrakar=='Government' && consumerApplicationDetail?.applicationStatus.applicationStatusId!=5 ">
// //             <form [formGroup]="tdsForm" >
// //                 <div>
// //                     <div style="font-size: 1.5em; font-weight: 900;">
// //                         <mat-checkbox class="example-margin" (change)="dtsConfirmationCheckBox($event)">क्या आप टीडीएस
// //                             काट कर
// //                             भुगतान करना चाहते
// //                             है</mat-checkbox>
// //                     </div>
// //                     <br>

// //                     <div  *ngIf="tdsConfirmedBoolean==true">
// //                         <div style="font-size: 1em; font-weight: 900;">
// //                             <mat-checkbox class="example-margin" formControlName="selection194j"
                               
// //                                 (change)="under194jCheckBox($event)">Under Section
// //                                 194J  (2%) </mat-checkbox>
// //                         </div>
                       
// //                         <br>
// //                         <div align="center" *ngIf="underSelection194jBoolean">
// //                             <button type="button" class="btn btn-primary" [disable]="tdsOninitBoolean==true?true:false"
// //                                 (click)="onTdsSubmit()">Submit</button>
// //                         </div>
// //                     </div>

// //                 </div>
// //             </form>
// //         </div> -->



// //         <div *ngIf="tdsOninitBoolean==true">
// //             <table class="table table-bordered">
// //                 <tr rowspan="2">
// //                     <th colspan="3" style="font-size: 1.5em;font-weight: 900;">
// //                         <div align="center">New Pay Demand After Tds Selection</div>

// //                     </th>
// //                 </tr>
// //                 <tr>
// //                     <th>U-sec-194J-Tds(2%)</th>
// //                     <td colspan="2" align="center">
// //                         <div *ngIf="paymentDetailAfterTds?.u_sec_194J_tds2!=null">
// //                             {{paymentDetailAfterTds?.u_sec_194J_tds2}}</div>
// //                         <div *ngIf="paymentDetailAfterTds?.u_sec_194J_tds2==null">0.00</div>

// //                     </td>
// //                 </tr>
// //                 <!-- <tr>
// //                     <th>U-sec-194J-Tds(10%)</th>
// //                     <td colspan="2" align="center">
// //                         <div *ngIf="paymentDetailAfterTds?.u_sec_194J_tds10!=null">
// //                             {{paymentDetailAfterTds?.u_sec_194J_tds10}}</div>
// //                         <div *ngIf="paymentDetailAfterTds?.u_sec_194J_tds10==null">0.00</div>
                       
// //                     </td>
// //                 </tr>
// //                 <tr>
// //                     <th>Under Selection Of CGST & SGST ACT</th>
// //                     <td colspan="2" align="center">
// //                         <div *ngIf="paymentDetailAfterTds?.u_sec_51_tds2!=null">
// //                             {{paymentDetailAfterTds?.u_sec_51_tds2}}</div>
// //                         <div *ngIf="paymentDetailAfterTds?.u_sec_51_tds2==null">0.00</div>
                        
// //                     </td>
// //                 </tr> -->
// //                 <tr>
// //                     <th style="font-size: 1em;font-weight: 900;" colspan="2">
// //                         <div align="center">Final Payable Amount</div>
// //                     </th>
// //                     <td align="center" style="font-size: 1em;font-weight: 900;">
// //                         <div *ngIf="consumerApplicationDetail?.schemeType?.schemeTypeId == 1">
// //                             <div *ngIf="paymentDetailAfterTds?.totalBalanceSupervisionAmount!=null">
// //                                 {{paymentDetailAfterTds?.totalBalanceSupervisionAmount}}</div>
// //                             <div *ngIf="paymentDetailAfterTds?.totalBalanceSupervisionAmount==null">0.00</div>
// //                         </div>

// //                         <!-- {{paymentDetailAfterTds?.totalBalanceSupervisionAmount}}    totalBalanceDepositAmount -->
// //                         <div *ngIf="consumerApplicationDetail?.schemeType?.schemeTypeId == 2">
// //                             <div *ngIf="paymentDetailAfterTds?.totalBalanceDepositAmount!=null">
// //                                 {{paymentDetailAfterTds?.totalBalanceDepositAmount}}</div>
// //                             <div *ngIf="paymentDetailAfterTds?.totalBalanceDepositAmount==null">0.00</div>
// //                         </div>
// //                     </td>
// //                 </tr>
// //             </table>
// //         </div>

// //         <div class="custom-div-action" align="center" *ngIf="!paymentButtonClick">
// //             <mat-card-actions>
// //                 <button mat-raised-button color="primary" type="submit" [disabled]="payButtonBoolean==true?true:false"
// //                     (click)="submitBillDetail()">{{btnTitle}}</button>
// //             </mat-card-actions>
// //         </div>
// //         <div align="center" *ngIf="paymentButtonClick">
// //             <p class="badge badge-warning" style="margin-top: 20px;font-size: 16px;">
// //                 Your transaction is being initiated. If your transaction gets failed kindly retry after 5 minutes.
// //             </p>
// //         </div>
// //     </div>


// // </mat-card>