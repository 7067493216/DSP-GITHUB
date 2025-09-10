import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { BankDetailsPayload } from '../../models/bankAccountDetailsModel';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { NewPaymentRefundRequestRejectedPopupComponent } from '../new-payment-refund-request-rejected-popup/new-payment-refund-request-rejected-popup.component';
import { PdfService } from '../../services/pdf.service';
import html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-new-payment-refund-verification-by-dgm',
  templateUrl: './new-payment-refund-verification-by-dgm.component.html',
  styleUrls: ['./new-payment-refund-verification-by-dgm.component.css']
})
export class NewPaymentRefundVerificationByDgmComponent implements OnInit {
  revisePaymentShowBoolean: boolean = false;
  paymentDetails: any;
  erpReviseData: any;
  tabularData: any;
  refundableObject: any;
  idForPaymentDetails: Number;
  consumerApplicationDetail: any;
  checkedBooleanVariable: boolean = false;
  accessLeveOfUser: any;
  dgmId: any;
  paymentView: any
  refundRequestForm: FormGroup;
  checkBookFile: any;
  bankList: Array<any> = [];
  bankDetailsPayload: BankDetailsPayload = new BankDetailsPayload();
  selectedBankCode: string = ''; // Store selected bank's IFSC code
  ifscError: boolean = false;
  bankDetails: any;
  applicationDocumentData: any
  refundApplicationDetails: any
  mkmyAmountData: any;
  bankDetailsverificationBooleanByDiscomUsers: boolean = false;

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

  debitSlipForm: FormGroup
  docDebitSlipFile: any;
  @ViewChild('componentView', { static: false }) pdfTable: ElementRef;
  @ViewChild('componentView') htmlData!: ElementRef;

  constructor(
    private consumerApplicationService: ConsumerApplicationService,
    private notification: NotificationService,
    private fb: FormBuilder,
    private url: GenerateUrl,
    private http: HttpClient,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<NewPaymentRefundVerificationByDgmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.accessLeveOfUser = JSON.parse(sessionStorage.getItem("accessLeveOfUser"));
    console.log(this.accessLeveOfUser, "v............");

    this.dgmId = this.accessLeveOfUser?.userId;
    console.log(this.dgmId, "this.dgmId........");

    console.log(this.data, "data,,,,,,,,,,,,,,,,,,,,,");
    // this.data.row.refundType = "CancellationPayment";
    // if (this.data.row.refundType !== "CancellationPayment") {
    //   this.idForPaymentDetails = 2
    // }
    this.getApplicationDocumentData(this.data.row.consumerApplicationId);
    this.consumerApplicationDetail = this.data.row;


    this.http.get('https://survey.mpcz.in:8080/ssp-web/demo/getBank').subscribe((response: any) => {
      console.log(response, "response.........................");
      this.bankList = response;
    })


    this.consumerApplicationService.checkReturnMaterialTotalRowsBalanceAmountZeroOrNotGetApi(this.consumerApplicationDetail?.erpWorkFlowNumber).subscribe((res: any) => {
      console.log(res, "res.............");
      if (res?.statusCode == "200") {
        this.returnMaterialsRowList = res?.list;
      } else {

      }
    });

  }



  refundHolderForm() {
    this.refundRequestForm = this.fb.group({
      creditorName: ["", Validators.required],
      bankName: ["", Validators.required],
      ifscCode: ["", Validators.required],
      accountNumber: ["", Validators.required],
      panNumber: ["", Validators.required],
      docCheckOrPassBook: ["", Validators.required]
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



  ngOnInit(): void {
    this.checkNoOfPayment();
    this.getPymentView();
    this.getBankDetails();
    // this.getApplicationDocumentData();
    // this.refundHolderForm();

    this.getRefundApplicationDetails(this.consumerApplicationDetail?.consumerApplicationNo);

    this.debitSlipForm = this.fb.group({
      debitSlipFile: ["", Validators.required]
    })
  }

  getRefundApplicationDetails(appNo: any) {
    this.consumerApplicationService.getRefundApplicationDetails(appNo).subscribe((resp: any) => {
      console.log(resp, "resp.........................................");
      if (resp?.code == "200") {
        this.refundApplicationDetails = resp?.list[0];
      }

    })
  }

  getApplicationDocumentData(consumerApplicationId: any) {
    this.consumerApplicationService.getApplicationDocumentData(consumerApplicationId).subscribe((applicationDocumentData: any) => {
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
    console.log(filePathWithBackslashes, "filePathWithBackslashes.....");

    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    console.log(filePathWithForwardSlashes, "filePathWithForwardSlashes.....");

    console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);

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
        this.notification.warn(resp?.message);
        return
      }
    })
  }




  DemandPaymentDetails() {
    if (this.data.row.natureOfWorkTypeId == 8) {
      this.consumerApplicationService.getDemandPaymentDetailsNewForMkmy(this.data.row.consumerApplicationNo).subscribe((data: any) => {
        console.log(data, "uuuuuuuuuuuuuuuuuuuuuu for mkmy uuuuuuuuuuuuuuuuuuuuu");
        if (data?.code == "200") {
          this.mkmyAmountData = data?.list[0];
        }
      })
    } else {
      this.consumerApplicationService.getDemandPaymentDetails(this.data.row.consumerApplicationId).subscribe((data: any) => {
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
        this.notification.success("! Data Retrieve Successfully")
        console.log(this.erpReviseData, "erpReviseData............");
        if (this.erpReviseData?.payAmt < 0) {
          console.log("bbbaaasss....................................................");

          this.getPaymentDataOfReviseForNegitive();
        } else {
          console.log(this.erpReviseData?.payAmt, "this.erpReviseData?.payAmt");

        }

      } else {

        this.erpReviseData = null;
        this.notification.error("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
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
        this.notification.warn(ress?.message);
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
        this.notification.warn(res?.message);
        console.log(res, "res......................................");
        return

      }

    })
  }

  onClose() {
    this.dialogRef.close();
  }



  onCheckboxSelection(e: any) {
    console.log(e.checked, "eeeeee..................checkbox.....................");
    this.checkedBooleanVariable = e.checked;
  }

  onCheckboxSelectionForBankDetails(e: any) {
    this.bankDetailsverificationBooleanByDiscomUsers = e.checked;
  }

  onSubmitBankDetail() {
    this.bankDetailsPayload.accountHolderName = this.refundRequestForm.value.creditorName
    this.bankDetailsPayload.accountNo = this.refundRequestForm.value.accountNumber
    this.bankDetailsPayload.bankName = this.refundRequestForm.value.bankName.name
    this.bankDetailsPayload.consumerApplicationNo = this.consumerApplicationDetail?.consumerApplicationNo
    this.bankDetailsPayload.ifscCode = this.refundRequestForm.value.ifscCode
    this.bankDetailsPayload.panNo = this.refundRequestForm.value.panNumber

    console.log(this.bankDetailsPayload, "this.bankDetailsPayload,,,,,,,,,,,,,,,,,,,,,,");
    let formData: FormData = new FormData();
    formData.append('consumerAccountDetails', JSON.stringify(this.bankDetailsPayload));
    formData.append('chequeBookOrPaasbook', this.checkBookFile);

    this.consumerApplicationService.consumerBankDetailSubmit(formData).subscribe((res: any) => {
      console.log(res, "res..................................................");
      if (res?.code == "201") {
        this.notification.success(res?.message)
      } else {
        this.notification.warn(res?.message);
        return
      }
    })

  }

  onSubitByDgm() {

    if (this.debitSlipForm.invalid) {
      this.debitSlipForm.markAllAsTouched();
      this.notification.error("Please select Debit Slip File First")
      return;
    }

    let newFormData: FormData = new FormData();
    newFormData.append("docDebitSlipFile", this.docDebitSlipFile);
    newFormData.append("consumerApplicationNo", this.consumerApplicationDetail?.consumerApplicationNo);
    this.consumerApplicationService.saveAddressProofData(newFormData).subscribe((response: any) => {
      console.log(response, "response.........................");
      if (response?.code == "200" || response?.code == "201" || response?.code == "204") {
        ////////////////////////////////////////////////////////////////////////////////////////
        let formData: FormData = new FormData();
        formData.append("consumerApplicationNo", this.consumerApplicationDetail?.consumerApplicationNo);
        formData.append("dgmApproval", "true");
        formData.append("dgmId", this.dgmId);
        formData.append("dgmName", this.accessLeveOfUser?.userName);
        formData.append("dgmRemark", null);
        this.consumerApplicationService.dgmApprovalForRefundApplication(formData).subscribe((respData: any) => {
          console.log(respData, "respData......................");
          if (respData?.code == "204") {
            if (this.idForPaymentDetails == 2) {
              this.notification.success("आवेदन स्वीकृति एवं आवश्यक कार्यवाही हेतु वित्त अनुभाग को अग्रेषित कर दिया गया है।");
            } else {
              this.notification.success("आवेदन स्वीकृति एवं आवश्यक कार्यवाही हेतु महाप्रबंधक (संचालन एवं रखरखाव) को अग्रेषित कर दिया गया है।");
            }
            // this.onSubmitBankDetail()

            this.onClose();

          } else {
            this.notification.warn(respData?.message);
            return;

          }

        })
        ////////////////////////////////////////////////////////////////////////////////////////
        // this.notification.success(response?.message)
      } else {
        this.notification.warn(response?.message);
        return
      }

    })


    // let formData: FormData = new FormData();
    // formData.append("consumerApplicationNo", this.consumerApplicationDetail?.consumerApplicationNo);
    // formData.append("dgmApproval", "true");
    // formData.append("dgmId", this.dgmId);
    // formData.append("dgmName", this.accessLeveOfUser?.userName);
    // formData.append("dgmRemark", null);
    // this.consumerApplicationService.dgmApprovalForRefundApplication(formData).subscribe((respData: any) => {
    //   console.log(respData, "respData......................");
    //   if (respData?.code == "204") {
    //     if (this.idForPaymentDetails == 2) {
    //       this.notification.success("आवेदन स्वीकृति एवं आवश्यक कार्यवाही हेतु वित्त अनुभाग को अग्रेषित कर दिया गया है।");
    //     } else {
    //       this.notification.success("आवेदन स्वीकृति एवं आवश्यक कार्यवाही हेतु महाप्रबंधक (संचालन एवं रखरखाव) को अग्रेषित कर दिया गया है।");
    //     }
    //     // this.onSubmitBankDetail()

    //     this.onClose();

    //   } else {
    //     this.notification.warn(respData?.message);
    //     return;

    //   }

    // })

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
        let formData: FormData = new FormData();
        formData.append("consumerApplicationNo", this.consumerApplicationDetail?.consumerApplicationNo);
        formData.append("dgmApproval", "false");
        formData.append("dgmId", this.dgmId);
        formData.append("dgmName", this.accessLeveOfUser?.userName);
        formData.append("dgmRemark", result);
        this.consumerApplicationService.dgmApprovalForRefundApplication(formData).subscribe((respData: any) => {
          console.log(respData, "respData......................");
          if (respData?.code == "204") {
            this.notification.success(respData?.message);
            this.onClose();

          } else {
            this.notification.warn(respData?.message);
            return;
          }
        })
      } else {
        this.notification.warn("Please give the remark for rejection !");
        return
      }
    });




  }


  onDownloadDebitSlipFormat() {



  }

  onDebitSlipFileSelection(event: Event): void {

    console.log(event, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (input.files[0].size <= 2097152) {
        this.docDebitSlipFile = input.files[0]
        this.debitSlipForm.patchValue({ debitSlipFile: this.docDebitSlipFile });
        this.debitSlipForm.get('debitSlipFile')?.updateValueAndValidity();
      } else {
        this.notification.error("File maximum size should be 2MB or less than 2MB");
        this.debitSlipForm.get("debitSlipFile").reset();
        return
      }
    }

  }

  downloadPDF() {
    const options = {
      margin: 0.3,
      filename: 'Payment-Refund-By-DGM.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const content = this.htmlData.nativeElement;

    html2pdf()
      .set(options)
      .from(content)
      .save()
      .toPdf() // Ensure PDF generation
      .outputPdf('blob') // Get the PDF as a Blob
      .then((pdfBlob: Blob) => {
        console.log(pdfBlob, 'Generated PDF Blob');

        ///////////////////////////////////////////////////////////
        // Prepare form data for upload
        const formDataNew: FormData = new FormData();
        // consumerApplicationNo: SV17073980233926
        // consumerUploadPdfForRefundTime = file
        // DgmUploadPdfForRefundTime = file
        // StcUploadPdfForRefundTime = file
        // GmUploadPdfForRefundTime = file
        // StcUploadPdfForRefundTime = file
        formDataNew.append('DgmUploadPdfForRefundTime', pdfBlob, `Payment-Refund-By-DGM.pdf`); 
       
        formDataNew.append('consumerApplicationNo', this.consumerApplicationDetail?.consumerApplicationNo)
        this.consumerApplicationService.refundPaymentDetailsUploadByDiscomUser(formDataNew).subscribe((resp: any) => {
          console.log(resp, "rrreeessssspppppp............");

        })
        ////////////////////////////////////////////////////////////



      })
  }




}
