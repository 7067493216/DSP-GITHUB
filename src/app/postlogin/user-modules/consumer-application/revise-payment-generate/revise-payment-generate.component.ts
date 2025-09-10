import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReviseLoadPayload } from '../../models/reviseLoadModel';
import { ReviseErpestimatenegitiveAmountRefundConfirmationModel } from '../../models/reviseErpestimatenegitiveAmountRefundConfirmationModel';
import { BankDetailsPayload } from '../../models/bankAccountDetailsModel';
import { AavedakKaPrakarConfirmationByDGM } from '../../models/aavedakKaPrakarConfirmationByDGM';
// import { error } from 'console';

@Component({
  selector: 'app-revise-payment-generate',
  templateUrl: './revise-payment-generate.component.html',
  styleUrls: ['./revise-payment-generate.component.css']
})
export class RevisePaymentGenerateComponent implements OnInit {
  consumerApplicationDetail: any
  modalTitle: any
  btnTitle: any
  erpReviseData: any
  natureOfWorkTypeId: any
  erpForm: FormGroup;
  openTableBoolean: boolean = false
  oldErpData: any;
  fileForm: FormGroup;
  DocFile: any
  fileLength: any;
  fileBooleanFile: boolean = false
  loadForm: FormGroup
  isFormSubmit: boolean = false;
  reviseLoadPayload: ReviseLoadPayload = new ReviseLoadPayload()
  SubmitLoadBoolean: boolean = false
  loadUnitCheckBoolean: boolean = true;
  checkedBoolean: boolean = false
  checkedBooleanNew: boolean = false
  token: any;
  refundRequestForm: FormGroup;
  checkBookFile: any;
  bankList: Array<any> = [];
  bankDetailsPayload: BankDetailsPayload = new BankDetailsPayload();
  selectedBankCode: string = ''; // Store selected bank's IFSC code
  ifscError: boolean = false;
  bankDetails: any;
  bankDetailsCheckboxBoolean: boolean = false
  aageBadheBoolean: boolean = false;
  panCardFile: any
  reviseErpestimatenegitiveAmountRefundConfirmationPayload: ReviseErpestimatenegitiveAmountRefundConfirmationModel = new ReviseErpestimatenegitiveAmountRefundConfirmationModel()
  radioButtonBoolean: boolean = false;

  constructor(
    private spinnerService: SpinnerService,
    private url: GenerateUrl,
    private http: HttpClient,
    private fb: FormBuilder,
    private consumerApplicationService: ConsumerApplicationService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RevisePaymentGenerateComponent>,
  ) {
    this.consumerApplicationDetail = this.data.row;
    console.log(this.consumerApplicationDetail, "this.consumerApplicationDetail ............");
    this.modalTitle = this.data.modalTitle;
    this.btnTitle = this.data.btnTitle;
    this.natureOfWorkTypeId = this.consumerApplicationDetail.natureOfWorkTypeId;

    let userDetails = JSON.parse(sessionStorage.getItem('accessLeveOfUser'));
    console.log(userDetails, "ddddddddddd..........................dddddddddddddd");
    this.reviseErpestimatenegitiveAmountRefundConfirmationPayload.consumerApplicationNo = this.consumerApplicationDetail.consumerApplicationNo;
    this.reviseErpestimatenegitiveAmountRefundConfirmationPayload.dgmIdRaisedRequest = userDetails?.userId;
    this.reviseErpestimatenegitiveAmountRefundConfirmationPayload.dgmRaisedRequestName = userDetails?.userName;
    this.reviseErpestimatenegitiveAmountRefundConfirmationPayload.consumerName = this.consumerApplicationDetail?.consumerName;
    this.token = sessionStorage.getItem('consumertoken');

    this.http.get('https://survey.mpcz.in:8080/ssp-web/demo/getBank').subscribe((response: any) => {
      console.log(response, "response.........................");
      this.bankList = response;
    })





  }

  onPanCardFileSelect(event: any) {
    console.log(event.target.files[0], "ccchhheeeecccckkkkkbbbboooookkkk...........");
    this.panCardFile = event.target.files[0]
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
      panCardFile: ["", Validators.required]
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

  onSubmitBankDetail() {
    if (this.refundRequestForm.invalid) {
      this.notificationService.warn("Invalid Form");
      return
    }
    this.bankDetailsPayload.accountHolderName = this.refundRequestForm.value.creditorName
    this.bankDetailsPayload.accountNo = this.refundRequestForm.value.accountNumber
    this.bankDetailsPayload.bankName = this.refundRequestForm.value.bankName.name
    this.bankDetailsPayload.consumerApplicationNo = this.consumerApplicationDetail?.consumerApplicationNo
    this.bankDetailsPayload.ifscCode = this.refundRequestForm.value.ifscCode
    this.bankDetailsPayload.panNo = this.refundRequestForm.value.panNumber

    console.log(this.bankDetailsPayload, "this.bankDetailsPayload,,,,,,,,,,,,,,,,,,,,,,");

    this.refundRequestForm.get('creditorName').disable();
    this.refundRequestForm.get('bankName').disable();
    this.refundRequestForm.get('ifscCode').disable();
    this.refundRequestForm.get('accountNumber').disable();
    this.refundRequestForm.get('panNumber').disable();
    this.refundRequestForm.get('docCheckOrPassBook').disable();

    this.newGetBankDetails();
    this.aageBadheBoolean = true
    // let formData: FormData = new FormData();
    // formData.append('consumerAccountDetails', JSON.stringify(this.bankDetailsPayload));
    // formData.append('chequeBookOrPaasbook', this.checkBookFile);

    // this.newApplicationService.consumerBankDetailSubmit(formData).subscribe((res: any) => {
    //   console.log(res, "res..................................................");
    //   if (res?.code == "201") {
    //     this.notification.success(res?.message);

    //     this.getBankDetails(this.consumerApplicationDetail?.consumerApplicationNo);
    //   } else {
    //     this.notification.warn(res?.message);
    //     return
    //   }
    // })

  }

  onEdit() {
    this.refundRequestForm.get('creditorName').enable();
    this.refundRequestForm.get('bankName').enable();
    this.refundRequestForm.get('ifscCode').enable();
    this.refundRequestForm.get('accountNumber').enable();
    this.refundRequestForm.get('panNumber').enable();
    this.refundRequestForm.get('docCheckOrPassBook').enable();
  }

  onBankDetailsCheckboxChange(e: any) {
    console.log(e.checked, "e..................................");
    this.bankDetailsCheckboxBoolean = e.checked;
  }

  getBankDetails(applicationNo: any) {
    this.consumerApplicationService.getConsumerAccountDetails(applicationNo).subscribe((resp: any) => {
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

    if (this.consumerApplicationDetail?.jeLoadUnitKwYaKva == null) {
      this.loadUnitCheckBoolean = false;
    } else {
      this.loadUnitCheckBoolean = true
    }

    this.BuildErpNumber();
    this.buildFileForm();
    this.loadFormBuild();
    this.refundHolderForm()
  }

  loadFormBuild() {
    this.loadForm = this.fb.group({
      load: [this.consumerApplicationDetail?.jeLoad, Validators.required],
      loadUnit: [this.consumerApplicationDetail?.jeLoadUnitKwYaKva, Validators.required],
      // returnAmount: [this.consumerApplicationDetail?.jeReturnAmount, [Validators.required, Validators.pattern('^[0-9][0-9]*$')]],
    })


    if (this.consumerApplicationDetail.natureOfWorkTypeId == 4 && this.consumerApplicationDetail.individualOrGroupId == 2) {
      this.loadForm.get('loadUnit').setValue("KVA");
    }else if(this.consumerApplicationDetail.natureOfWorkTypeId == 4 && this.consumerApplicationDetail.individualOrGroupId == 1){
this.loadForm.get('loadUnit').setValue("KW");
    }else if(this.consumerApplicationDetail.natureOfWorkTypeId == 4 && this.consumerApplicationDetail.colonyIllegalSelectionType == 1){
 this.loadForm.get('loadUnit').setValue("KVA");
    }else{
      
    }

  }


  checkValue(e: any) {
    let number = document.getElementById("returnAmount");
    //number.onkeydown = function(e) {
    if (
      !(
        (e.keyCode > 95 && e.keyCode < 106) ||
        (e.keyCode > 47 && e.keyCode < 58) ||
        e.keyCode == 8
      )
    ) {
      return false;
    }
    // }
  }

  onLoadSubmit() {
    console.log(this.loadForm, "this.loadForm........................");
    this.isFormSubmit = true
    if (this.loadForm.invalid) {
      this.notificationService.warn("Invalid Form !")
      return
    }
    else {
      // if(this.loadForm.value.returnAmount< this.consumerApplicationDetail?.jeReturnAmount){
      //   this.notificationService.error("Return Amount must be greater than or Equal to JE Return Amount !");
      //   return
      // }
      if (this.loadForm.value.load < this.consumerApplicationDetail?.jeLoad) {
        this.notificationService.error("Load must be greater than or Equal to JE Load !");
        return
      }


      this.reviseLoadPayload.consumerAppNo = this.consumerApplicationDetail.consumerApplicationNo
      this.reviseLoadPayload.oAndMLoad = this.loadForm.value.load
      this.reviseLoadPayload.oAndMLoadUnit = this.loadForm.value.loadUnit
      this.reviseLoadPayload.oAndMReturnAmt = 0

      this.consumerApplicationService.ReviseLoadSubmit(this.reviseLoadPayload).subscribe((responce: any) => {
        console.log(responce, "responce.....................");
        if (responce.code == "200") {
          this.notificationService.success('Data Submitted Successfully');
          this.SubmitLoadBoolean = true
        } else {
          this.notificationService.warn(responce.message);
          this.SubmitLoadBoolean = false;
          return
        }
      })

    }

  }

  buildFileForm() {
    this.fileForm = this.fb.group({
      file: ['', Validators.required],
      // returnAmount: ['', Validators.required]
    })
  }

  selectFile(e: any) {
    console.log(e.target.files[0], "e.target.files[0] for samagra-id-file");
    this.DocFile = e.target.files[0];
    this.fileLength = e.target.files.length;

    if (e.target.files[0].type == "application/pdf" && e.target.files[0].size <= 2000000) {
      this.fileBooleanFile = false;
    } else {
      this.fileBooleanFile = true;
      this.notificationService.warn("please choose file 'pdf' type and size must be less than '2MB'")
    }

  }

  BuildErpNumber() {
    this.erpForm = this.fb.group({
      erpNumber: ['', Validators.required]
    })
  }

  onClose() {
    this.dialogRef.close();
  }
  getPaymentDetails() {

    if (this.consumerApplicationDetail?.natureOfWorkTypeId != 5 && this.radioButtonBoolean == false) {
      this.notificationService.warn("Please confirm first, Aaavedak Ka prakar is right/wrong");
      return
    }

    console.log(this.erpForm.value, "eeeeeeeeeeeeeeeeeeeeeeeee");
    if (this.erpForm.invalid) {
      this.notificationService.error("! Please Enter Erp Number First");
      return
    } else {

      if ((this.consumerApplicationDetail?.natureOfWorkTypeId != 1 && this.consumerApplicationDetail?.natureOfWorkTypeId != 6) && this.SubmitLoadBoolean == false) {
        this.notificationService.error("Please Submit Load and Return Amount First !")
        return
      } else {

        if (this.consumerApplicationDetail?.natureOfWorkTypeId != 5) {
          let formData: FormData = new FormData();
          formData.append("consumerApplicationNo", this.aavedakKaPrakarConfirmationByDGM.consumerApplicationNo)
          formData.append("isAvedakGovernmentRevise", this.aavedakKaPrakarConfirmationByDGM.isAvedakGovernmentRevise)
          // formData.append("isAvedakGovernmentRevise", this.aavedakKaPrakarConfirmationByDGM.isAvedakGovernmentRevise)
          this.consumerApplicationService.aavedakKaPrakarConfirmationByDgm(formData).subscribe((respo: any) => {
            if (respo?.code == "204") {
              this.consumerApplicationService.getErpRevisedData(this.erpForm.value.erpNumber, this.consumerApplicationDetail.consumerApplicationNo, 1).subscribe((response: any) => {
                console.log(response, "response...response");
                if (response?.code == "200") {
                  this.erpReviseData = response.list[0];
                  this.notificationService.success("! Data Retrieve Successfully")
                  console.log(this.erpReviseData, "erpReviseData............");
                  this.openTableBoolean = true
                } else {
                  this.openTableBoolean = false;
                  this.erpReviseData = null;
                  this.notificationService.error(response?.message);
                  return
                }
              })
            } else {
              this.notificationService.error(respo?.message);
              return
            }
          })
        } else {
          this.consumerApplicationService.getErpRevisedData(this.erpForm.value.erpNumber, this.consumerApplicationDetail.consumerApplicationNo, 1).subscribe((response: any) => {
            console.log(response, "response...response");
            if (response?.code == "200") {
              this.erpReviseData = response.list[0];
              this.notificationService.success("! Data Retrieve Successfully")
              console.log(this.erpReviseData, "erpReviseData............");
              this.openTableBoolean = true
            } else {
              this.openTableBoolean = false;
              this.erpReviseData = null;
              this.notificationService.error(response?.message);
              return
            }
          })
        }





      }


    }

  }

  onCheckBoxChange(e: any) {
    this.checkedBoolean = e.checked
  }

  onCheckBoxChangeNew(e: any) {
    this.checkedBooleanNew = e.checked
  }


  onSubmit() {
    if (this.fileForm.invalid || this.DocFile == null || this.DocFile == null == undefined) {
      this.notificationService.error("Please Upload Erp Estimate File");
      return
    }
    if (this.fileBooleanFile == true) {
      this.notificationService.warn("please choose file 'pdf' type and size must be less than '2MB'")
      return
    }
    let formData: FormData = new FormData();
    formData.append('consumerApplicationNumber', this.consumerApplicationDetail.consumerApplicationNo);
    formData.append('docErpRevise ', this.DocFile);
    this.consumerApplicationService.uploadFieForReviseEstimate(formData).subscribe((response: any) => {
      console.log(response, "response.......");
      if (response.code == "200") {
        this.consumerApplicationService.getErpRevisedData(this.erpForm.value.erpNumber, this.consumerApplicationDetail.consumerApplicationNo, 2).subscribe((resp: any) => {
          if (resp?.code == "200") {
            this.notificationService.success("Data Submitted Successfully");
            location.reload();
          } else {
            this.notificationService.warn("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
            return
          }
        })
      } else {
        this.notificationService.error("Please Upload Erp Estimate File");
        return
      }
    })
  }


  onSubmitNext() {
    if (this.erpReviseData?.consumerRefundableAmnt < 0 && this.refundRequestForm.invalid) {
      this.notificationService.error("Please feel bank details first !");
      return
    }



    if (this.erpReviseData?.consumerRefundableAmnt < 0 && this.aageBadheBoolean == false) {
      this.notificationService.error("Please feel bank details first !");
      return
    }

    if (this.bankDetailsCheckboxBoolean == false && this.erpReviseData?.consumerRefundableAmnt < 0) {
      this.notificationService.error("Please select checkbox first !");
      return
    }
    if (this.fileForm.invalid || this.DocFile == null || this.DocFile == null == undefined) {
      this.notificationService.error("Please Upload Erp Estimate File");
      return
    }
    if (this.fileBooleanFile == true) {
      this.notificationService.warn("please choose file 'pdf' type and size must be less than '2MB'")
      return
    }

    if (this.erpReviseData?.consumerRefundableAmnt < 0) {

      /////////////////////////////////
      this.consumerApplicationService.getErpRevisedData(this.erpForm.value.erpNumber, this.consumerApplicationDetail.consumerApplicationNo, 2).subscribe((response: any) => {
        console.log(response, "response......................................................");
        if (response?.code == "200") {
          this.consumerApplicationService.erpEstimateNegitiveAmountRefundConfirmation(this.reviseErpestimatenegitiveAmountRefundConfirmationPayload, this.token).subscribe((response: any) => {
            console.log(response, "response............................");
            if (response?.code == "201") {
              this.notificationService.success(response?.message);
              /// bank details submit start  //////////////
              let formData: FormData = new FormData();
              formData.append('consumerAccountDetails', JSON.stringify(this.bankDetailsPayload));
              formData.append('chequeBookOrPaasbook', this.checkBookFile);
              formData.append('docPanNo', this.panCardFile);

              this.consumerApplicationService.consumerBankDetailSubmit(formData).subscribe((res: any) => {
                console.log(res, "res..................................................");
                if (res?.code == "201") {
                  this.notificationService.success(res?.message);


                  ///////////////////////////////////////////////////////////////////FILE UPLOAD START SUBMIT////////////////////////////////////////////////////////////////////////////
                  formData.append('consumerApplicationNumber', this.consumerApplicationDetail.consumerApplicationNo);
                  formData.append('docErpRevise ', this.DocFile);
                  this.consumerApplicationService.uploadFieForReviseEstimate(formData).subscribe((response: any) => {
                    console.log(response, "response.......");
                    if (response.code == "200") {
                      this.notificationService.success(response?.message);
                      location.reload();
                      // this.consumerApplicationService.getErpRevisedData(this.erpForm.value.erpNumber, this.consumerApplicationDetail.consumerApplicationNo, 2).subscribe((resp: any) => {
                      //   if (resp?.code == "200") {
                      //     this.notificationService.success("Data Submitted Successfully");
                      //    // location.reload();
                      //   } else {
                      //     this.notificationService.warn("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
                      //     return
                      //   }
                      // })

                    } else {
                      this.notificationService.error("Please Upload Erp Estimate File");
                      return
                    }
                  })
                  ////////////////////////////////////////////////////////////////////FILE UPLOAD END SUBMIT///////////////////////////////////////////////////////////////////////////////
                } else {
                  this.notificationService.warn(res?.message);
                  return
                }
              })
              /// bank details submit end  //////////////
              this.onClose();
            } else {
              this.notificationService.warn(response?.message);
              return
            }
          })
        } else {
          this.notificationService.warn(response?.message);
          return
        }

      })
      /////////////////////////////////

    } else {
      this.consumerApplicationService.getErpRevisedData(this.erpForm.value.erpNumber, this.consumerApplicationDetail.consumerApplicationNo, 2).subscribe((response: any) => {
        console.log(response, "response......................................................");
        if (response?.code == "200") {
          this.notificationService.success(response?.message);
          this.onClose();
        } else {
          this.notificationService.warn(response?.message);
          return
        }

      })
    }



  }


  aavedakKaPrakarConfirmationByDGM: AavedakKaPrakarConfirmationByDGM = new AavedakKaPrakarConfirmationByDGM()
  onRadioButtonCredit(e: any) {
    this.radioButtonBoolean = true;
    console.log(e, "eeeeeeeeeeeeeeeeeeeee");
    this.aavedakKaPrakarConfirmationByDGM.isAvedakGovernmentERP = null
    this.aavedakKaPrakarConfirmationByDGM.consumerApplicationNo = this.consumerApplicationDetail?.consumerApplicationNo
    this.aavedakKaPrakarConfirmationByDGM.isAvedakGovernmentRevise = e.value
    console.log(this.aavedakKaPrakarConfirmationByDGM, "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

  }


}
