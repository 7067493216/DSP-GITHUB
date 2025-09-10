import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { NewApplicationService } from '../../services/new-application.service';
import { RefundOfApplicationCancellationModel } from '../../models/refundOfApplicationCancellationModel';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankDetailsPayload } from '../../models/BankDetailsPayload';

@Component({
  selector: 'app-refund-request-generate',
  templateUrl: './refund-request-generate.component.html',
  styleUrls: ['./refund-request-generate.component.css']
})
export class RefundRequestGenerateComponent implements OnInit {
  consumerApplicationDetail: any;
  checkboxBoolean: boolean = false;
  token: any;
  consumerDetails: any;
  idForPaymentDetails: Number;
  paymentDetails: any;
  erpReviseData: any;
  tabularData: any;
  refundableObject: any;
  revisePaymentShowBoolean: boolean = false;
  refundOfApplicationCancellationModel: RefundOfApplicationCancellationModel = new RefundOfApplicationCancellationModel();
  RequestPaymentType: any;
  returnAmountPayableBoolean: boolean = false;
  paymentView: any;
  refundRequestForm: FormGroup;
  checkBookFile: any;
  bankList: Array<any> = [];
  bankDetailsPayload: BankDetailsPayload = new BankDetailsPayload();
  selectedBankCode: string = ''; // Store selected bank's IFSC code
  ifscError: boolean = false;
  bankDetails: any;
  bankDetailsCheckboxBoolean: boolean = false;
  natureOfWorkTypeId: any
  mkmyAmountData: any;
  refundApplicationDetails: any
  panCardFile: any;
  addressProofFile: any;
  addressProofNumberVar: any;
  showDocNotryFile: boolean = false
  notryFile: any
  govtAuthorizedLetterFile: any
  pvtRequestLetterFile: any
  bankDetailsAlreadyAvailableBoolean:boolean=false
  bankDetailsObject:any
  applicationDocumentData:any

  constructor(
    private url: GenerateUrl,
    private fb: FormBuilder,
    private http: HttpClient,
    private notification: NotificationService,
    private newApplicationService: NewApplicationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RefundRequestGenerateComponent>
  ) {
    this.token = this.newApplicationService.getToken();
    this.consumerDetails = this.newApplicationService.getConsumerDetails();
    console.log(this.consumerDetails, "this.consumerDetails.................................");
    console.log(this.data, "data................................................");
    this.consumerApplicationDetail = this.data.row;
    console.log(this.consumerApplicationDetail, "this.consumerApplicationDetail............................");
    if (this.data?.RequestPaymentTypeId == 1) {
      this.RequestPaymentType = "ReturnMaterialAmountPayment";
      // this.checkForReturnPaymentwillbeRefundableOrNot()
    } else {
      this.RequestPaymentType = "CancellationPayment";
    }
    console.log(this.RequestPaymentType, "RequestPaymentTypeId.......");

    this.http.get('https://survey.mpcz.in:8080/ssp-web/demo/getBank').subscribe((response: any) => {
      console.log(response, "response.........................");
      this.bankList = response;
    })

    this.natureOfWorkTypeId = this.data.row.natureOfWorkType?.natureOfWorkTypeId
    this.getApplicationDocumentData();
  }


  refundHolderForm() {
    this.refundRequestForm = this.fb.group({
      creditorName: ["", Validators.required],
      bankName: ["", Validators.required],
      ifscCode: ["", Validators.required],
      accountNumber: ["", [Validators.required, Validators.maxLength(16), Validators.pattern('^[0-9]*$')]],
      panNumber: ["", [
        Validators.required,
        Validators.maxLength(10),
      ]],
      docCheckOrPassBook: ["", Validators.required],
      panCardFile: ["", Validators.required],
      addressProofNumber: ["", Validators.required],
      addressProofFile: ["", Validators.required],
      notryFile: [""],
      docAuthorizedLetter: [""],
      docRequestLetterPrivate: [""]
    })
  }




  /////////////////////////////////////////////////////////

  onBankCheckbookFileSelect(event: any) {
    console.log(event.target.files[0], "ccchhheeeecccckkkkkbbbboooookkkk...........");
    if (event.target.files[0].type == "application/pdf") {
      if (event.target.files[0].size > 2097152) {
        this.notification.error("PDF file should be less then 2 MB");
        this.refundRequestForm.controls['docCheckOrPassBook'].reset();
        return
      }
      this.checkBookFile = event.target.files[0]
    } else {
      this.notification.warn("file must be pdf only and file size must be Maximum 2MB !")
      this.refundRequestForm.controls['docCheckOrPassBook'].reset();
      return
    }

  }

  onPanCardFileSelect(event: any) {
    console.log(event.target.files[0], "ccchhheeeecccckkkkkbbbboooookkkk...........");
    if (event.target.files[0].type == "application/pdf") {
      if (event.target.files[0].size > 2097152) {
        this.notification.error("PDF file should be less then 2 MB");
        this.refundRequestForm.controls['panCardFile'].reset();
        return
      }
      this.panCardFile = event.target.files[0]
    } else {
      this.notification.warn("file must be pdf only and file size must be Maximum 2MB !")
      this.refundRequestForm.controls['panCardFile'].reset();
      return
    }

  }

  onAddressProofFileSelect(event: any) {
    console.log(event.target.files[0], "ccchhheeeecccckkkkkbbbboooookkkk...........");

    if (event.target.files[0].type == "application/pdf") {
      if (event.target.files[0].size > 2097152) {
        this.notification.error("PDF file should be less then 2 MB");
        this.refundRequestForm.controls['addressProofFile'].reset();
        return
      }
      this.addressProofFile = event.target.files[0]
    } else {
      this.notification.warn("file must be pdf only and file size must be Maximum 2MB !")
      this.refundRequestForm.controls['addressProofFile'].reset();
      return
    }
  }

  onDocAuthorizedLetterFileSelect(event: any) {
    console.log(event.target.files[0], "ccchhheeeecccckkkkkbbbboooookkkk...........");

    if (event.target.files[0].type == "application/pdf") {
      if (event.target.files[0].size > 2097152) {
        this.notification.error("PDF file should be less then 2 MB");
        this.refundRequestForm.controls['docAuthorizedLetter'].reset();
        return
      }
      this.govtAuthorizedLetterFile = event.target.files[0]
    } else {
      this.notification.warn("file must be pdf only and file size must be Maximum 2MB !")
      this.refundRequestForm.controls['docAuthorizedLetter'].reset();
      return
    }
  }

  ondocRequestLetterPrivateFileSelect(event: any) {
    console.log(event.target.files[0], "ccchhheeeecccckkkkkbbbboooookkkk...........");


    if (event.target.files[0].type == "application/pdf") {
      if (event.target.files[0].size > 2097152) {
        this.notification.error("PDF file should be less then 2 MB");
        this.refundRequestForm.controls['docRequestLetterPrivate'].reset();
        return
      }
      this.pvtRequestLetterFile = event.target.files[0]
    } else {
      this.notification.warn("file must be pdf only and file size must be Maximum 2MB !")
      this.refundRequestForm.controls['docRequestLetterPrivate'].reset();
      return
    }

  }

  onNotryFileSelect(event: any) {
    console.log(event.target.files[0], "ccchhheeeecccckkkkkbbbboooookkkk...........");


    if (event.target.files[0].type == "application/pdf") {
      if (event.target.files[0].size > 2097152) {
        this.notification.error("PDF file should be less then 2 MB");
        this.refundRequestForm.controls['notryFile'].reset();
        return
      }
      this.notryFile = event.target.files[0]
    } else {
      this.notification.warn("file must be pdf only and file size must be Maximum 2MB !")
      this.refundRequestForm.controls['notryFile'].reset();
      return
    }
  }



  //////////////////////////////////////////////////////////








  onSelectBankName(event: any) {
    this.selectedBankCode = "";

    console.log(this.refundRequestForm.value, "Refund Request Form");
    this.selectedBankCode = this.refundRequestForm.value.bankName.code;


  }

  onSubmitBankDetail() {
    console.log(this.refundRequestForm, "this.refundRequestForm");
    console.log(this.refundRequestForm.controls["docAuthorizedLetter"].status);

    if (this.refundRequestForm.controls["docAuthorizedLetter"].status == "INVALID") {
      this.notification.error("Goverment Authorized Letter is Required");
      return
    }

    if (this.refundRequestForm.controls["notryFile"].status == "INVALID") {
      this.notification.error("Notry Document is Required");
      return
    }


    if (this.refundRequestForm.invalid) {
      this.notification.warn("Invalid Form");
      return
    }
    this.bankDetailsPayload.accountHolderName = this.refundRequestForm.value.creditorName
    this.bankDetailsPayload.accountNo = this.refundRequestForm.value.accountNumber
    this.bankDetailsPayload.bankName = this.refundRequestForm.value.bankName.name
    this.bankDetailsPayload.consumerApplicationNo = this.consumerApplicationDetail?.consumerApplicationNo
    this.bankDetailsPayload.ifscCode = this.refundRequestForm.value.ifscCode
    this.bankDetailsPayload.panNo = this.refundRequestForm.value.panNumber
    this.bankDetailsPayload.addressProofNo = this.refundRequestForm.value.addressProofNumber
    console.log(this.bankDetailsPayload, "this.bankDetailsPayload,,,,,,,,,,,,,,,,,,,,,,");

    this.refundRequestForm.get('creditorName').disable();
    this.refundRequestForm.get('bankName').disable();
    this.refundRequestForm.get('ifscCode').disable();
    this.refundRequestForm.get('accountNumber').disable();
    this.refundRequestForm.get('panNumber').disable();
    this.refundRequestForm.get('docCheckOrPassBook').disable();
    this.refundRequestForm.get('panCardFile').disable();
    this.refundRequestForm.get('addressProofNumber').disable();
    this.refundRequestForm.get('addressProofFile').disable();
    this.refundRequestForm.get('notryFile').disable();
    this.refundRequestForm.get('docAuthorizedLetter').disable();
    this.refundRequestForm.get('docRequestLetterPrivate').disable();

    this.newGetBankDetails();

     /// bank details submit start  //////////////
          let formData: FormData = new FormData();
          formData.append('consumerAccountDetails', JSON.stringify(this.bankDetailsPayload));
          formData.append('chequeBookOrPaasbook', this.checkBookFile);
          formData.append('docPanNo', this.panCardFile);
          formData.append("docAddressProof", this.addressProofFile);
          if (this.showDocNotryFile == true) {
            formData.append("docNotry", this.notryFile)
          } else {
            this.refundRequestForm.get('notryFile')?.reset();
          }

          if (this.consumerApplicationDetail?.avedakKaPrakar == 'Government') {
            formData.append("docAuthorizedLetter", this.govtAuthorizedLetterFile);
            this.refundRequestForm.get('docRequestLetterPrivate')?.reset();
          } else {
            formData.append("docRequestLetter", this.pvtRequestLetterFile);
            this.refundRequestForm.get('docAuthorizedLetter')?.reset();
          }

          this.newApplicationService.consumerBankDetailSubmit(formData).subscribe((res: any) => {
            console.log(res, "res..................................................");
            if (res?.code == "201" || res?.code == "200" || res?.code == "204") {
              this.notification.success(res?.message);

            } else {
              this.notification.warn(res?.message);
              return
            }
          })
          /// bank details submit end  //////////////



  }

  onEdit() {
    this.refundRequestForm.get('creditorName').enable();
    this.refundRequestForm.get('bankName').enable();
    this.refundRequestForm.get('ifscCode').enable();
    this.refundRequestForm.get('accountNumber').enable();
    this.refundRequestForm.get('panNumber').enable();
    this.refundRequestForm.get('docCheckOrPassBook').enable();
    this.refundRequestForm.get('panCardFile').enable();
    this.refundRequestForm.get('addressProofNumber').enable();
    this.refundRequestForm.get('addressProofFile').enable();
  }

  onBankDetailsCheckboxChange(e: any) {
    console.log(e.checked, "e..................................");
    this.bankDetailsCheckboxBoolean = e.checked;
  }

  getBankDetails(applicationNo: any) {
    this.newApplicationService.getConsumerAccountDetails(applicationNo).subscribe((resp: any) => {
      console.log(resp, "resp......................................");
      if (resp?.code == "200") {
        this.notification.success(resp?.message);
        this.bankDetailsObject = resp?.list[0];
        this.bankDetailsAlreadyAvailableBoolean=true
      } else {
        // this.notification.warn(resp?.message);
        this.bankDetailsAlreadyAvailableBoolean=false
       
        return
      }

    })
  }

  getApplicationDocumentData() {
    this.newApplicationService.getApplicationDocumentData(this.consumerApplicationDetail.consumerApplicationId).subscribe((applicationDocumentData: any) => {
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
    console.log(filePathWithBackslashes,"filePathWithBackslashes.....");
    
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    console.log(filePathWithForwardSlashes,"filePathWithForwardSlashes.....");
    
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

  newGetBankDetails() {
    this.bankDetails = this.bankDetailsPayload
  }

  onIfscCode(enteredCode: string) {
    console.log(enteredCode, "iiifffssccccc");
    console.log(this.refundRequestForm, "this.refundRequestForm.............on input field................");
    if (enteredCode.length <= this.selectedBankCode.length) {
      this.ifscError = enteredCode !== this.selectedBankCode;
    }

  }

  ngOnInit(): void {
    console.log("......................ngOnInIt....................");
    this.getRefundApplicationDetails(this.consumerApplicationDetail?.consumerApplicationNo)


    this.checkNoOfPayment()
    this.getPymentView();
    this.getBankDetails(this.consumerApplicationDetail?.consumerApplicationNo)
    this.refundHolderForm();
    if (this.consumerApplicationDetail?.avedakKaPrakar == 'Government') {
      this.refundRequestForm.get('docAuthorizedLetter')?.setValidators(Validators.required);
      this.refundRequestForm.get('docAuthorizedLetter')?.updateValueAndValidity();

      this.refundRequestForm.get('docRequestLetterPrivate')?.clearValidators();
      this.refundRequestForm.get('docRequestLetterPrivate')?.updateValueAndValidity();
    } else {

      this.refundRequestForm.get('docRequestLetterPrivate')?.setValidators(Validators.required);
      this.refundRequestForm.get('docRequestLetterPrivate')?.updateValueAndValidity();

      this.refundRequestForm.get('docAuthorizedLetter')?.clearValidators();
      this.refundRequestForm.get('docAuthorizedLetter')?.updateValueAndValidity();
    }


  }

  getRefundApplicationDetails(appNo: any) {
    this.newApplicationService.getRefundApplicationDetails(appNo).subscribe((resp: any) => {
      console.log(resp, "resp.........................................");
      if (resp?.code == "200") {
        this.refundApplicationDetails = resp?.list[0];
      }

    })
  }

  getPymentView() {
    this.newApplicationService.getAllPaymentDetailsNew(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data: any) => {
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
    this.newApplicationService.checkNoOfPayment(this.data.row.consumerApplicationNo).subscribe((resp: any) => {
      console.log(resp, "rrrrreeesssssppppppppp....................................................");
      if (resp?.code == "200") {
        // resp.list[0].Payment_Type = "revise_payment"
        if (resp?.list[0]?.Payment_Type == "Demand_fees") {
          if (this.RequestPaymentType == "CancellationPayment") {

            this.idForPaymentDetails = 1;
            this.revisePaymentShowBoolean = false;
          } else {
            this.idForPaymentDetails = 2;
          }
          this.DemandPaymentDetails();
          this.getPaymentDetails(this.idForPaymentDetails)


        } else {

          if (this.RequestPaymentType == "CancellationPayment") {
            this.idForPaymentDetails = 1;
            // this.getRevisePaymentDetails();
            this.revisePaymentShowBoolean = true;
          } else {
            this.idForPaymentDetails = 2;
            // this.getRevisePaymentDetails();
          }
          this.getRevisePaymentDetails();
          this.getPaymentDetails(this.idForPaymentDetails)

        }
      } else {
        this.notification.warn(resp?.message);
        return
      }
    })
  }

  DemandPaymentDetails() {
    if (this.natureOfWorkTypeId == 8) {
      this.newApplicationService.getDemandPaymentDetailsNewForMkmy(this.data.row.consumerApplicationNo).subscribe((data: any) => {
        console.log(data, "uuuuuuuuuuuuuuuuuuuuuu for mkmy uuuuuuuuuuuuuuuuuuuuu");
        if (data?.code == "200") {
          this.mkmyAmountData = data?.list[0];
        }
      })
    } else {
      this.newApplicationService.getDemandPaymentDetails(this.data.row.consumerApplicationId).subscribe((data: any) => {
        console.log(data, "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
        this.paymentDetails = data;
        console.log(this.paymentDetails, "this.paymentDetails...uuuuuuu");
      })
    }
  }

  getRevisePaymentDetails() {
    this.newApplicationService.getErpRevisedData(this.data.row.revisedErpNumber, this.data.row.consumerApplicationNo, 1).subscribe((response: any) => {
      console.log(response, "addddddddddddddddddaaaaaaaaaaaaattttttttttttttaaaaaaaaaaaaaaa............................");
      if (response?.code == "200") {
        this.erpReviseData = response.list[0];
        this.notification.success("! Data Retrieve Successfully")
        console.log(this.erpReviseData, "erpReviseData............");
        if (this.erpReviseData?.payAmt < 0) {
          console.log("bbbaaasss....................................................");

          this.getPaymentDataOfReviseForNegitive();
        }

      } else {
        console.log(response, "response....................................");

        this.erpReviseData = null;
        this.notification.error("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
        return
      }
    })
  }


  getPaymentDataOfReviseForNegitive() {
    this.newApplicationService.getPaymentDataOfReviseForNegitive(this.data.row.consumerApplicationNo).subscribe((ress: any) => {
      console.log(ress, "ressssssss. get paymentDetails for revise-demand-negitive   .........");
      if (ress.code == "200") {
        this.tabularData = ress.list[0];
      } else {
        this.notification.warn(ress?.message);
        return;
      }
    })
  }

  getPaymentDetails(id: any) {
    this.newApplicationService.refundPayableAmountTable(this.data.row.consumerApplicationNo, id).subscribe((res: any) => {
      console.log(res, "rreesssss......................................................");
      if (res.code == "200") {
        this.refundableObject = res.list[0];
      } else {
        console.log(res, "res......................................");
        this.notification.warn(res?.message);
        return
      }
    })
  }

  onClose() {
    this.dialogRef.close();
  }

  onCheckboxChange(e: any) {

    console.log(e.checked, "e..................................");
    this.checkboxBoolean = e.checked;
  }

  onSubmit() {

if(this.bankDetailsAlreadyAvailableBoolean==false){
 if (this.refundRequestForm.invalid || this.bankDetailsCheckboxBoolean == false || this.bankDetails == undefined) {
      this.notification.error("Please Enter Bank Details first and select checkbox for bank details confirmation")
      return
    }
}
   

    console.log(this.data?.RequestPaymentTypeId, "this.data?.RequestPaymentTypeId................");
    if (this.data?.RequestPaymentTypeId == 1) {
      this.refundOfApplicationCancellationModel.consumerApplicationNo = this.consumerApplicationDetail?.consumerApplicationNo;
      this.refundOfApplicationCancellationModel.consumerName = this.consumerApplicationDetail?.consumerName
      this.refundOfApplicationCancellationModel.dgmApproval = null
      this.refundOfApplicationCancellationModel.dgmApprovedId = null
      this.refundOfApplicationCancellationModel.dgmIdRaisedRequest = null
      this.refundOfApplicationCancellationModel.dgmRaisedRequestName = null
      this.refundOfApplicationCancellationModel.gmApproval = null
      this.refundOfApplicationCancellationModel.gmApprovedId = null
      this.refundOfApplicationCancellationModel.refundAmount = null
      this.refundOfApplicationCancellationModel.refundType = this.RequestPaymentType;
      this.refundOfApplicationCancellationModel.refundVoucherNo = null
      this.newApplicationService.refundRequestSubmitOfReturnMaterialsApplicationByConsumer(this.refundOfApplicationCancellationModel, this.token).subscribe((res: any) => {
        console.log(res, "res.......................................");
        if (res?.code == "201") {
          this.notification.success("आवेदन स्वीकृति एवं आवश्यक कार्यवाही हेतु DGM-STC  को अग्रेषित कर दिया गया है।");
         
          this.onClose();
        } else {
          this.notification.warn(res?.message);
          return
        }
      })
    } else {
      this.refundOfApplicationCancellationModel.consumerApplicationNo = this.consumerApplicationDetail?.consumerApplicationNo;
      this.refundOfApplicationCancellationModel.consumerName = this.consumerApplicationDetail?.consumerName
      this.refundOfApplicationCancellationModel.dgmApproval = null
      this.refundOfApplicationCancellationModel.dgmApprovedId = null
      this.refundOfApplicationCancellationModel.dgmIdRaisedRequest = null
      this.refundOfApplicationCancellationModel.dgmRaisedRequestName = null
      this.refundOfApplicationCancellationModel.gmApproval = null
      this.refundOfApplicationCancellationModel.gmApprovedId = null
      this.refundOfApplicationCancellationModel.refundAmount = null
      this.refundOfApplicationCancellationModel.refundType = this.RequestPaymentType;
      this.refundOfApplicationCancellationModel.refundVoucherNo = null
      this.newApplicationService.refundRequestSubmitOfCancellationApplicationByConsumer(this.refundOfApplicationCancellationModel, this.token).subscribe((res: any) => {
        console.log(res, "res...................................................");
        if (res?.code == "201") {
          console.log(res?.list, "res......liisttt");
          this.notification.success("आवेदन स्वीकृति एवं आवश्यक कार्यवाही हेतु उप महाप्रबंधक (संचालन एवं रखरखाव) को अग्रेषित कर दिया गया है।");
         
          this.onClose();
        } else {
          this.notification.warn(res?.message);
          return;
        }
      })
    }
  }



  onNameInput(e: any) {
    const inputName = e.target.value;
    console.log(inputName, "e...................................................");

    if (inputName !== this.consumerApplicationDetail?.consumerName) {
      this.showDocNotryFile = true
      this.refundRequestForm.get('notryFile')?.setValidators(Validators.required);
      this.refundRequestForm.get('notryFile')?.updateValueAndValidity();

    } else {
      this.showDocNotryFile = false;
      this.refundRequestForm.get('notryFile')?.clearValidators();
      this.refundRequestForm.get('notryFile')?.updateValueAndValidity();

    }
  }


}





























// <table class="table table-bordered">
//               <thead class="table-secondary">
//                   <tr>
//                       <th colspan="4" class="text-center fs-4 fw-bold">
//                           बैंक संबंधी विवरण
//                       </th>
//                   </tr>
//               </thead>

//               <tbody>
//                   <tr>
//                       <td colspan="4">
//                           <form [formGroup]="refundRequestForm">
//                               <div class="row g-3">

//                                   <div class="col-md-6">
//                                       <label class="form-label fw-semibold">खाता धारक का नाम (Account Holder Name)
//                                           <span class="text-danger">*</span></label>
//                                       <input type="text" class="form-control" placeholder="Account Holder Name"
//                                           formControlName="creditorName" (input)="onNameInput($event)">
//                                   </div>

//                                   <div class="col-md-6" *ngIf="showDocNotryFile">
//                                       <label class="form-label fw-semibold">नोटरी फाइल (Notary File - image/pdf) <span
//                                               class="text-danger">*</span></label>
//                                       <input type="file" class="form-control" (change)="onNotryFileSelect($event)"
//                                           formControlName="notryFile">
//                                       <div class="text-danger"
//                                           *ngIf="refundRequestForm.controls['notryFile']?.status=='INVALID'">
//                                           नोटराइज्ड हलफ़नामा आवश्यक है क्योंकि आवेदक और खाता धारक के नाम अलग हैं।
//                                       </div>
//                                   </div>

//                                   <div class="col-md-6">
//                                       <label class="form-label fw-semibold">खाता संख्या (Account Number) <span
//                                               class="text-danger">*</span></label>
//                                       <input type="text" class="form-control" placeholder="Account Number"
//                                           maxlength="16" pattern="^[0-9]*$" formControlName="accountNumber"
//                                           onkeypress="return event.charCode >= 48 && event.charCode <= 57">
//                                       <div class="text-danger"
//                                           *ngIf="refundRequestForm.controls['accountNumber'].errors?.pattern">केवल
//                                           अंकीय मान स्वीकार्य हैं।</div>
//                                   </div>

//                                   <div class="col-md-6">
//                                       <label class="form-label fw-semibold">बैंक का नाम (Bank Name) <span
//                                               class="text-danger">*</span></label>
//                                       <select class="form-select" formControlName="bankName"
//                                           (change)="onSelectBankName($event)">
//                                           <option disabled selected value="">बैंक का चयन करें</option>
//                                           <option *ngFor="let bank of bankList" [ngValue]="bank">{{ bank.name }}
//                                           </option>
//                                       </select>
//                                   </div>

//                                   <div class="col-md-6">
//                                       <label class="form-label fw-semibold">आईएफएससी कोड (IFSC Code) <span
//                                               class="text-danger">*</span></label>
//                                       <input type="text" class="form-control" placeholder="IFSC Code"
//                                           formControlName="ifscCode" (input)="onIfscCode($event.target.value)">
//                                       <small *ngIf="ifscError" class="text-danger">Invalid IFSC Code. Expected: {{
//                                           selectedBankCode }}</small>
//                                   </div>

//                                   <div class="col-md-6">
//                                       <label class="form-label fw-semibold">रद्द चेक / पासबुक (Cancelled Cheque /
//                                           Passbook) <span class="text-danger">*</span></label>
//                                       <input type="file" class="form-control"
//                                           (change)="onBankCheckbookFileSelect($event)"
//                                           formControlName="docCheckOrPassBook">
//                                   </div>

//                                   <div class="col-md-6">
//                                       <label class="form-label fw-semibold">पैन संख्या (PAN Number) <span
//                                               class="text-danger">*</span></label>
//                                       <input type="text" class="form-control" placeholder="PAN Number" maxlength="10"
//                                           formControlName="panNumber">
//                                   </div>

//                                   <div class="col-md-6">
//                                       <label class="form-label fw-semibold">पैन कार्ड (PAN Card - image/pdf) <span
//                                               class="text-danger">*</span></label>
//                                       <input type="file" class="form-control" (change)="onPanCardFileSelect($event)"
//                                           formControlName="panCardFile">
//                                   </div>

//                                   <div class="col-md-6">
//                                       <label class="form-label fw-semibold">पता विवरण (Address Details) <span
//                                               class="text-danger">*</span></label>
//                                       <input type="text" class="form-control" placeholder="Address"
//                                           formControlName="addressProofNumber">
//                                   </div>

//                                   <div class="col-md-6">
//                                       <label class="form-label fw-semibold">पता प्रमाण (Address Proof - image/pdf)
//                                           <span class="text-danger">*</span></label>
//                                       <input type="file" class="form-control"
//                                           (change)="onAddressProofFileSelect($event)"
//                                           formControlName="addressProofFile">
//                                   </div>

//                                   <div class="col-md-6"
//                                       *ngIf="consumerApplicationDetail?.avedakKaPrakar == 'Government'">
//                                       <label class="form-label fw-semibold">सरकारी अधिकृत पत्र (Authorized Letter -
//                                           image/pdf) <span class="text-danger">*</span></label>
//                                       <input type="file" class="form-control"
//                                           (change)="onDocAuthorizedLetterFileSelect($event)"
//                                           formControlName="docAuthorizedLetter">
//                                       <div class="text-danger"
//                                           *ngIf="refundRequestForm.controls['docAuthorizedLetter']?.status=='INVALID'">
//                                           सरकारी पत्र आवश्यक है।</div>
//                                   </div>

//                                   <div class="col-md-6"
//                                       *ngIf="consumerApplicationDetail?.avedakKaPrakar != 'Government'">
//                                       <label class="form-label fw-semibold">प्राइवेट रिक्वेस्ट लेटर (Private Request
//                                           Letter - image/pdf) <span class="text-danger">*</span></label>
//                                       <input type="file" class="form-control"
//                                           (change)="ondocRequestLetterPrivateFileSelect($event)"
//                                           formControlName="docRequestLetterPrivate">
//                                       <div class="text-danger"
//                                           *ngIf="refundRequestForm.controls['docRequestLetterPrivate']?.status=='INVALID'">
//                                           प्राइवेट रिक्वेस्ट लेटर आवश्यक है।</div>
//                                   </div>

//                               </div>
//                           </form>
//                       </td>
//                   </tr>

//                   <tr *ngIf="bankDetails">
//                       <td colspan="4">
//                           <table class="table table-bordered mt-4">
//                               <tbody>
//                                   <tr>
//                                       <th>खाता धारक का नाम :</th>
//                                       <td>{{ bankDetails?.accountHolderName }}</td>
//                                       <th>खाता संख्या :</th>
//                                       <td>{{ bankDetails?.accountNo }}</td>
//                                   </tr>
//                                   <tr>
//                                       <th>बैंक का नाम :</th>
//                                       <td>{{ bankDetails?.bankName }}</td>
//                                       <th>आईएफएससी कोड :</th>
//                                       <td>{{ bankDetails?.ifscCode }}</td>
//                                   </tr>
//                                   <tr>
//                                       <th>पैन संख्या :</th>
//                                       <td>{{ bankDetails?.panNo }}</td>
//                                       <th>आवेदन क्रमांक :</th>
//                                       <td>{{ bankDetails?.consumerApplicationNo }}</td>
//                                   </tr>
//                                   <tr>
//                                       <th>पता विवरण :</th>
//                                       <td colspan="3">{{ addressProofNumberVar }}</td>
//                                   </tr>
//                               </tbody>
//                           </table>
//                       </td>
//                   </tr>

//                   <tr>
//                       <td colspan="4" class="text-center">
//                           <button type="button" class="btn btn-secondary mx-2" (click)="onEdit()">सुधार करें</button>
//                           <button type="button" class="btn btn-primary" (click)="onSubmitBankDetail()">बैंक विवरण सही
//                               हैं, आगे बढ़ें</button>
//                       </td>
//                   </tr>

//                   <tr>
//                       <td colspan="4">
//                           <br>
//                           <div>

//                               <mat-checkbox class="example-margin mx-2"
//                                   (change)="onBankDetailsCheckboxChange($event)">
//                               </mat-checkbox>
//                               <span style="font-size: 1.2em; font-weight: 700;">मैं, घोषणा करता/करती हूं कि मेरे
//                                   द्वारा
//                                   [उद्देश्य, जैसे कि रिफंड, भुगतान] के लिए प्रदान किया गया बैंक विवरण सत्य एवं सही एवं
//                                   इसी
//                                   आवेदन से सम्बन्धित है। और यदि इसमें किसी भी प्रकार की त्रुटि होती है, तो उसके लिए
//                                   मैं
//                                   स्वयं उत्तरदायी रहूंगा/रहूंगी। किसी भी गलत जानकारी के कारण होने वाली असुविधा या
//                                   वित्तीय
//                                   हानि के लिए विद्युत वितरण कंपनी जिम्मेदार नहीं होगी। </span>

//                           </div>
//                       </td>
//                   </tr>
//               </tbody>
//           </table>


