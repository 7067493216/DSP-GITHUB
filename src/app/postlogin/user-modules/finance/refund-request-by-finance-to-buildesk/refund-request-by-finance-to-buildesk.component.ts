import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { PopupComponent } from 'src/app/postlogin/popup/popup.component';
import { takeUntil } from 'rxjs/operators';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { NewPaymentRefundRequestRejectedPopupComponent } from '../../consumer-application/new-payment-refund-request-rejected-popup/new-payment-refund-request-rejected-popup.component';

@Component({
  selector: 'app-refund-request-by-finance-to-buildesk',
  templateUrl: './refund-request-by-finance-to-buildesk.component.html',
  styleUrls: ['./refund-request-by-finance-to-buildesk.component.css']
})

export class RefundRequestByFinanceToBuildeskComponent implements OnInit {
  consumerApplicationDetail: any;
  checkboxBoolean: boolean = false;
  token: any;
  refundableObject: any;
  idForPaymentDetails: any;
  revisePaymentShowBoolean: boolean = false;
  paymentDetails: any;
  erpReviseData: any;
  tabularData: any;
  consumerApplicationDetailRestList: any;
  paymentView: any;
  accessLeveOfUser: any;
  bankDetails: any;
  applicationDocumentData: any
  mkmyAmountData: any
  bankDetailsverificationBooleanByDiscomUsers: boolean = false
  returnMaterialsRowList: Array<any> = [];
  displayedColumns: string[] = [
    'PROJECT_NUMBER',
    'ITEM_CODE',
    'DESCRIPTION',
    'INV_UOM_CODE',
    'PROJECT_QTY',
    'RETURN_QTY',
    'BAL_QTY'
  ];


  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private consumerApplicationService: ConsumerApplicationService,
    private url: GenerateUrl,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RefundRequestByFinanceToBuildeskComponent>
  ) {
    this.accessLeveOfUser = JSON.parse(sessionStorage.getItem("accessLeveOfUser"));
    console.log(this.accessLeveOfUser, "v............");

    this.token = sessionStorage.getItem('usertoken');
    console.log(this.data, "data................................................");
    this.consumerApplicationDetail = this.data.row;
    console.log(this.consumerApplicationDetail, "this.consumerApplicationDetail.....................");
    this.getNatureOfWorkTypeAndSchemeTpe(this.data.row.consumerApplicationNo);
    let erpWorkFlowNumber: any;
    if (this.data.row.reviseErpNo != null) {
      erpWorkFlowNumber = this.data.row.reviseErpNo
    } else {
      erpWorkFlowNumber = this.data.row.demandErpNo
    }
    this.consumerApplicationService.checkReturnMaterialTotalRowsBalanceAmountZeroOrNotGetApi(erpWorkFlowNumber).subscribe((res: any) => {
      console.log(res, "res.............");
      if (res?.statusCode == "200") {
        this.returnMaterialsRowList = res?.list;
      } else {
        this.notificationService.warn(res?.message);
      }
    });
  }



  getNatureOfWorkTypeAndSchemeTpe(consumerApplicationNo:any) {
    this.consumerApplicationService.getNatureOfWorkTypeAndSchemeTpe(consumerApplicationNo).subscribe((rest: any) => {
      console.log(rest, "rest....................");
      if (rest?.code == "200") {

        this.consumerApplicationDetailRestList = rest?.list[0];
        this.checkNoOfPayment();
        this.getApplicationDocumentData()
      } else {
        // consumerApplicationDetailRestList?.consumerApplicationId
        this.notificationService.warn(rest?.message);
        return
      }
    })
  }

  ngOnInit(): void {
    this.getPymentView();
    this.getBankDetails();
    // this.getApplicationDocumentData()
  }

  getApplicationDocumentData() {
    this.consumerApplicationService.getApplicationDocumentData(this.consumerApplicationDetailRestList?.consumerApplicationId).subscribe((applicationDocumentData: any) => {
      console.log('applicationDocumentData', applicationDocumentData);
      if (applicationDocumentData['code'] == "200") {
        this.applicationDocumentData = applicationDocumentData['list'][0];
        console.log('applicationDocumentData:>-  !!!', applicationDocumentData);
      } else {
        this.applicationDocumentData = null;
      }
    })
  }

  getDownloaddocCheckOrPassBookFileFile() {
    let filePathWithBackslashes = this.applicationDocumentData.docCheckOrPassBookFile.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }


  getDownloaddocPanNoFileFile() {
    let filePathWithBackslashes = this.applicationDocumentData.docPanNoFile.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    //  console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }

  getDownloaddocNotryFile() {
    let filePathWithBackslashes = this.applicationDocumentData.docNotry.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    //  console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }

  getDownloaddocAddressProofFileFile() {
    let filePathWithBackslashes = this.applicationDocumentData.docAddressProofFile.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    //  console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }

  getDownloaddocRequestLetterFile() {
    let filePathWithBackslashes = this.applicationDocumentData.docRequestLetter.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    //  console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }

  getDownloaddocGovAuthorizedLetterFileFile() {
    let filePathWithBackslashes = this.applicationDocumentData.docGovAuthorizedLetterFile.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    //  console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }

  getDownloaddocMraFileFile() {
    let filePathWithBackslashes = this.applicationDocumentData.docMraFile.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    //  console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }



  getBankDetails() {
    this.consumerApplicationService.getConsumerAccountDetails(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((resp: any) => {
      console.log(resp, "resp......................................");
      if (resp?.code == "200") {
        this.notificationService.success(resp?.message);
        this.bankDetails = resp?.list[0];
      } else {
        this.notificationService.warn(resp?.message);
        return
      }

    })
  }

  getPymentView() {
    this.consumerApplicationService.getAllPaymentDetails(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data: any) => {
      console.log(data, "rrrrrrrrrrrrrrrrrrrrrrrrrrrr*********************rrrrrrrrrrrrrrrrrrrrrrrrrr");
      if (data.code == "200") {


        this.paymentView = data?.list[0];
        console.log(this.paymentView, " this.paymentView.........................???????????????????????????");

      } else {
        return
      }
    })
  }

  checkNoOfPayment() {
    this.consumerApplicationService.checkNoOfPayment(this.data.row.consumerApplicationNo).subscribe((resp: any) => {
      console.log(resp, "rrrrreeesssssppppppppp....................................................");
      if (resp?.code == "200") {
        // resp.list[0].Payment_Type = "revise_payment"
        if (resp?.list[0]?.Payment_Type == "Demand_fees") {
          if (this.data.row.refundType == "Cancellation_Amount") {

            this.idForPaymentDetails = 1;
            this.revisePaymentShowBoolean = false;
          } else {
            this.idForPaymentDetails = 2;
          }
          this.DemandPaymentDetails();
          this.getPaymentDetails(this.idForPaymentDetails)

        } else {

          if (this.data.row.refundType == "Cancellation_Amount") {
            this.idForPaymentDetails = 1;
            this.getRevisePaymentDetails();
            this.revisePaymentShowBoolean = true;
          } else {
            this.idForPaymentDetails = 2;
          }
          this.getPaymentDetails(this.idForPaymentDetails)

        }
      } else {
        this.notificationService.warn(resp?.message);
        return
      }
    })
  }




  // DemandPaymentDetails() {
  //   this.consumerApplicationService.getDemandPaymentDetails(this.consumerApplicationDetailRestList?.consumerApplicationId).subscribe((data: any) => {
  //     console.log(data, "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
  //     this.paymentDetails = data;
  //     console.log(this.paymentDetails, "this.paymentDetails...uuuuuuu");

  //   })
  // }

  DemandPaymentDetails() {
    console.log(this.data.row.consumerApplicationNo, "this.data.row.consumerApplicationNo..........................");

    if (this.consumerApplicationDetailRestList?.natureOfWorkTypeId == 8) {
      this.consumerApplicationService.getDemandPaymentDetailsNewForMkmy(this.data.row.consumerApplicationNo).subscribe((data: any) => {
        console.log(data, "uuuuuuuuuuuuuuuuuuuuuu for mkmy uuuuuuuuuuuuuuuuuuuuu");
        if (data?.code == "200") {
          this.mkmyAmountData = data?.list[0];
        }
      })
    } else {
      this.consumerApplicationService.getDemandPaymentDetails(this.data.row.consumerAppId).subscribe((data: any) => {
        console.log(data, "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
        this.paymentDetails = data;
        console.log(this.paymentDetails, "this.paymentDetails...uuuuuuu");

      })
    }

  }

  getRevisePaymentDetails() {
    this.consumerApplicationService.getErpRevisedData(this.data.row.revisedErpNumber, this.data.row.consumerApplicationNo, 1).subscribe((response: any) => {
      console.log(response, "addddddddddddddddddaaaaaaaaaaaaattttttttttttttaaaaaaaaaaaaaaa............................");
      if (response?.code == "200") {
        this.erpReviseData = response.list[0];
        this.notificationService.success("! Data Retrieve Successfully")
        console.log(this.erpReviseData, "erpReviseData............");
        if (this.erpReviseData?.payAmt < 0) {
          console.log("bbbaaasss....................................................");

          this.getPaymentDataOfReviseForNegitive();
        } else {
          console.log(this.erpReviseData?.payAmt, "this.erpReviseData?.payAmt");
        }

      } else {

        this.erpReviseData = null;
        this.notificationService.error("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
        return
      }
    })
  }


  getPaymentDataOfReviseForNegitive() {
    this.consumerApplicationService.getPaymentDataOfReviseForNegitive(this.data.row.consumerApplicationNo).subscribe((ress: any) => {
      console.log(ress);
      if (ress.code == "200") {
        this.tabularData = ress.list[0];
      } else {
        this.notificationService.warn(ress?.message);
        return
      }
    })
  }

  getPaymentDetails(id: any) {

    this.consumerApplicationService.refundPayableAmountTable(this.data.row.consumerApplicationNo, id).subscribe((res: any) => {
      console.log(res, "rreesssss......................................................");
      if (res.code == "200") {
        this.refundableObject = res.list[0];

      } else {
        this.notificationService.warn(res?.message);
        console.log(res, "res......................................");
        return

      }

    })
  }




  onSubmit() {

    let message;
    message = "ईआरपी एकीकरण संबंधी प्रक्रिया प्रगति पर है। ईआरपी से पूर्ण रूप से एकीकृत होने तक, आप मैन्युअल रूप से भुगतान कर सकते हैं।"

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = '35vh';


    dialogConfig.data = { message: message, applicationNo: this.consumerApplicationDetail?.consumerApplicationNo };
    const dialogRef = this.dialog.open(PopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result, "resulttt................");
      if (result == true) {
        this.consumerApplicationService.refundRequestconfirmationByFinance(this.consumerApplicationDetail?.consumerApplicationNo, this.accessLeveOfUser.userId, true, this.accessLeveOfUser.userName, "").subscribe((resp: any) => {
          console.log(resp, "rrrrreeeeeesssssssssspppppppppp....................................");
          if (resp?.code == "204") {
            this.notificationService.success(resp?.message);
            this.onClose();
          } else {
            this.notificationService.warn(resp?.message);
            return
          }
        })
        // 
      } else {

      }
    });
  }

  onReject() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = '40vh';
    // dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(NewPaymentRefundRequestRejectedPopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result, "resssuuulltttt.................");
      if (result != null) {
        this.consumerApplicationService.refundRequestconfirmationByFinance(this.consumerApplicationDetail?.consumerApplicationNo, this.accessLeveOfUser.userId, false, this.accessLeveOfUser.userName, result).subscribe((resp: any) => {
          console.log(resp, "rrrrreeeeeesssssssssspppppppppp....................................");
          if (resp?.code == "204") {
            this.notificationService.success(resp?.message);
            this.onClose();
          } else {
            this.notificationService.warn(resp?.message);
            return
          }
        })
      } else {
        this.notificationService.warn("Please give the remark for rejection !");
        return
      }
    });

  }


  onClose() {
    this.dialogRef.close();
  }


  onCheckboxChange(e: any) {
    console.log(e.checked, "e..................................");
    this.checkboxBoolean = e.checked;
  }

  onCheckboxSelectionForBankDetails(e: any) {
    this.bankDetailsverificationBooleanByDiscomUsers = e.checked;
  }

}
