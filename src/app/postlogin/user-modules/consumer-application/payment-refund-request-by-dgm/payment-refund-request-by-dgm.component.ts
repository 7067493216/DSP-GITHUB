import { Component, Inject, OnInit } from '@angular/core';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RefundPaymentModelDto } from '../../models/refundPaymentModel';

@Component({
  selector: 'app-payment-refund-request-by-dgm',
  templateUrl: './payment-refund-request-by-dgm.component.html',
  styleUrls: ['./payment-refund-request-by-dgm.component.css']
})
export class PaymentRefundRequestByDGMComponent implements OnInit {

  RefundForm: FormGroup;
  refundRequestForm: FormGroup;
  refundTypeForm:FormGroup
  refundPaymentModelDto: RefundPaymentModelDto = new RefundPaymentModelDto();
  refundLetterFile: any;
  checkBookFile: any;
  ConsumerRefundLetterFile:any;
  token: any;
  paymentDetails: any;
  erpReviseData: any;
  refundableObject: any;
  tabularData: any
  revisePaymentShowBoolean:boolean = false;

  constructor(
    private consumerApplicationService: ConsumerApplicationService,
    private notification: NotificationService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PaymentRefundRequestByDGMComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    let token = sessionStorage.getItem('usertoken');
    console.log(token, "token......");

    console.log(this.data, "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");

  }



 

  getPaymentDataOfReviseForNegitive() {
    this.consumerApplicationService.getPaymentDataOfReviseForNegitive(this.data.row.consumerApplicationNo).subscribe((ress: any) => {
      console.log(ress);
      if (ress.code == "200") {
        this.tabularData = ress.list[0];
      }
    })
  }

  checkNoOfPayment(){
    this.consumerApplicationService.checkNoOfPayment(this.data.row.consumerApplicationNo).subscribe((resp:any)=>{
      console.log(resp,"rrrrreeesssssppppppppp....................................................");
      if(resp?.code=="200"){
        if(resp?.list[0]==4){
this.revisePaymentShowBoolean = true;
this.getRevisePaymentDetails();
        }else{
          this.revisePaymentShowBoolean = false;
        }
      }
    })
  }

  refundTypeFormBuild(){
    this.refundTypeForm = this.fb.group({
      refundType:["",Validators.required]
    })
  }

  ngOnInit(): void {
    this.refundTypeFormBuild();
    this.buildForm();
    this.buildRefundRequestForm();
    this.DemandPaymentDetails();
   
    this.checkNoOfPayment();
  }

  DemandPaymentDetails() {
    this.consumerApplicationService.getDemandPaymentDetails(this.data.row.consumerApplicationId).subscribe((data: any) => {
      console.log(data, "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
      this.paymentDetails = data;
      console.log(this.paymentDetails, "this.paymentDetails...uuuuuuu");

    })
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
        }

      } else {

        this.erpReviseData = null;
        this.notification.error("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
        return
      }
    })
  }

  buildRefundRequestForm() {
    this.refundRequestForm = this.fb.group({
      creditorName: ["", Validators.required],
      accountNumber: ["", Validators.required],
      bankName: ["", Validators.required],
      ifscCode: ["", Validators.required],
      consumerApplicationNo: [this.data.row.consumerApplicationNo, Validators.required],
      refundableAmnt: ["", Validators.required],
      refundType: ["", Validators.required],
      docCheckOrPassBook: [null, Validators.required],
      docRefundLetter: [null, Validators.required],
      docConsumerRefundLetterFile: [null, Validators.required],
      remark: ["", Validators.required]
    })
  }

  buildForm() {
    this.RefundForm = this.fb.group({
      refundType: ["", Validators.required],
      demandType: ["", Validators.required]
    })
  }

  onClose() {
    this.dialogRef.close();
  }

  getPaymentDetails(id: any) {

    this.consumerApplicationService.refundPayableAmountTable(this.data.row.consumerApplicationNo, id).subscribe((res: any) => {
      console.log(res, "rreesssss......................................................");
      if (res.code == "200") {
        this.refundableObject = res.list[0];
        if (id == 2 && this.refundTypeForm.get('refundType').value == '2') {

          if (this.paymentDetails?.refundJeReturnAmnt != null || this.paymentDetails?.refundJeReturnAmnt != 0) {
            this.refundRequestForm.get('refundableAmnt').setValue(this.paymentDetails?.refundJeReturnAmnt);
            this.refundRequestForm.get('refundableAmnt').disable();
          }
          if (this.paymentDetails?.refundJeReturnAmnt == null) {
            let x = 0;
            this.refundRequestForm.get('refundableAmnt').setValue(x);
            this.refundRequestForm.get('refundableAmnt').disable();
          }
          this.refundRequestForm.get('refundType').setValue('Return Material Amount');
          this.refundRequestForm.get('refundType').disable();
        }
        if (id == 1 && this.refundTypeForm.get('refundType').value == '1' && this.revisePaymentShowBoolean==false) {
          this.refundRequestForm.get('refundableAmnt').setValue(this.refundableObject?.refundDemandAmnt);
          this.refundRequestForm.get('refundableAmnt').disable();
          this.refundRequestForm.get('refundType').setValue('Demand Payment');
          this.refundRequestForm.get('refundType').disable();
        }
        if (id == 3) {
          this.refundRequestForm.get('refundableAmnt').setValue(this.refundableObject?.refundReviseDemandAmnt);
          this.refundRequestForm.get('refundableAmnt').disable();
          this.refundRequestForm.get('refundType').setValue('Revise Demand Payment');
          this.refundRequestForm.get('refundType').disable();
        }

        if (id == 4 && this.refundTypeForm.get('refundType').value == '1' && this.revisePaymentShowBoolean==true) {
          let add = this.refundableObject?.reviseRefundAmnt + this.refundableObject?.demandRefundAmnt;
          this.refundRequestForm.get('refundableAmnt').setValue(add);
          this.refundRequestForm.get('refundableAmnt').disable();
          this.refundRequestForm.get('refundType').setValue('OverAll Demand(Demand + Revise Demand)');
          this.refundRequestForm.get('refundType').disable();
        }
      }

    })
  }

  onRefundTypeNew(e:any){
    if(e.value=='1'){
      if(this.revisePaymentShowBoolean==false){
        this.getPaymentDetails(1);
      }else{
        this.getPaymentDetails(4);
      }
    }else if(e.value=='3'){
      this.getPaymentDetails(3);
    }else if(e.value=='2'){
      this.getPaymentDetails(2);
      if (this.paymentDetails?.jeReturnAmount != null && this.paymentDetails?.jeReturnAmount != 0) {
        this.refundRequestForm.get('refundableAmnt').setValue(this.paymentDetails?.jeReturnAmount)
      } else {
        this.notification.warn("No Refundable Amount is Available for Return Materials");
        this.refundRequestForm.get('refundableAmnt').setValue("0.00");
        return
      }

    }else{

    }
    
  }

  onRefundType(value: any) {
    //  this.getPaymentDetails();
    console.log(value, ".................RefundType...............");
    if (value.value == "2") {
      this.RefundForm.get('demandType').setValue("");
      this.getPaymentDetails(1);
      // this.DemandPaymentDetails();
      if (this.paymentDetails?.jeReturnAmount != null && this.paymentDetails?.jeReturnAmount != 0) {
        this.refundRequestForm.get('refundableAmnt').setValue(this.paymentDetails?.jeReturnAmount)
      } else {
        this.notification.warn("No Refundable Amount is Available for Return Materials");
        this.refundRequestForm.get('refundableAmnt').setValue("0.00");
        return
      }

    }

  }

  onRefundTypeSelect(e: any) {
    console.log(e, "llllllllllllllllll");
    if (e.target.value == "Demand Payment") {
      this.refundPaymentModelDto.value = 1
    } else if (e.target.value == "Return Material Amount") {
      this.refundPaymentModelDto.value = 2
    } else if (e.target.value == "Revise Demand Payment") {
      this.refundPaymentModelDto.value = 3
    } if (e.target.value == "OverAll Demand(Demand + Revise Demand)") {
      this.refundPaymentModelDto.value = 4
    }
    else {

    }

  }


  onDemandType(value: any) {
    console.log(value, ".................demandType...............");
    if (value.value == "1") {
      this.getPaymentDetails(1);

    }
    if (value.value == "2") {
      this.getPaymentDetails(2);
      //  this.getRevisePaymentDetails();
      //this.refundRequestForm.get('refundableAmnt').setValue(this.refundableObject?.refundReviseDemandAmnt)
    }

    if (value.value == "3") {
      this.getPaymentDetails(3);
    }

  }

  onBankCheckbookFileSelect(event: any) {
    console.log(event.target.files[0], "ccchhheeeecccckkkkkbbbboooookkkk...........");
    this.checkBookFile = event.target.files[0]
  }

  onRefundLetterFileSelect(event: any) {
    console.log(event.target.files[0], "rrreeeeffffuuuunnnnddddlllleeeetttteeerrrrr.......");
    this.ConsumerRefundLetterFile = event.target.files[0];
  }


  onConsumerRefundLetterFileSelect(event: any) {
    console.log(event.target.files[0], "rrreeeeffffuuuunnnnddddlllleeeetttteeerrrrr.......");
    this.refundLetterFile = event.target.files[0];
  }



  onSubmit() {

    if (this.refundRequestForm.invalid) {
      this.notification.warn("Invalid Form !")
      return
    }

    // if (e.target.value == "Demand Payment") {
    //   this.refundPaymentModelDto.value = 1
    // } else if (e.target.value == "Return Material Amount") {
    //   this.refundPaymentModelDto.value = 2
    // } else if (e.target.value == "Revise Demand Payment") {
    //   this.refundPaymentModelDto.value = 3
    // }if( e.target.value=="OverAll Demand(Demand + Revise Demand)"){
    //   this.refundPaymentModelDto.value = 4
    // }
    //  else {

    // }

    if (this.refundRequestForm.get('refundType').value == "Demand Payment") {
      this.refundPaymentModelDto.value = 1
    } else if (this.refundRequestForm.get('refundType').value == "Return Material Amount") {
      this.refundPaymentModelDto.value = 2
    } else if (this.refundRequestForm.get('refundType').value == "Revise Demand Payment") {
      this.refundPaymentModelDto.value = 3
    } else if (this.refundRequestForm.get('refundType').value == "OverAll Demand(Demand + Revise Demand)") {
      this.refundPaymentModelDto.value = 4;
      this.refundPaymentModelDto.refundableAmnt = this.refundableObject?.reviseRefundAmnt + this.refundableObject?.demandRefundAmnt;
      this.refundPaymentModelDto.refundType = this.refundRequestForm.get('refundType').value;
    } else {

    }


    console.log(this.refundRequestForm, "ffffffffffff.......................");
    this.refundPaymentModelDto.creditorName = this.refundRequestForm.value.creditorName;
    this.refundPaymentModelDto.remark = this.refundRequestForm.value.remark;
    this.refundPaymentModelDto.accountNumber = this.refundRequestForm.value.accountNumber;
    this.refundPaymentModelDto.bankName = this.refundRequestForm.value.bankName;
    this.refundPaymentModelDto.ifscCode = this.refundRequestForm.value.ifscCode;
    if (this.refundPaymentModelDto.value != 4) {
      this.refundPaymentModelDto.refundType = this.refundRequestForm.value.refundType;
      this.refundPaymentModelDto.refundableAmnt = this.refundRequestForm.value.refundableAmnt;
    }

    this.refundPaymentModelDto.consumerApplicationNo = this.refundRequestForm.value.consumerApplicationNo;
    console.log(this.refundPaymentModelDto, "this.refundPaymentModelDto.............");

    let formData: FormData = new FormData();
    formData.append("refundForm", JSON.stringify(this.refundPaymentModelDto));
    formData.append("docRefundLetter", this.refundLetterFile);
    formData.append("docCheckOrPassBook", this.checkBookFile);
    formData.append("docConsumerRefundLetterFile", this.ConsumerRefundLetterFile);

    this.consumerApplicationService.RequestGeneratedByDgmForRefundPaymentToGm(formData, this.token).subscribe((data: any) => {
      console.log(data, "dddaaaaaaatttttttaaaaaaaaa......................................................");
      if (data?.code == "200") {
        this.notification.success(data?.message);
      } else {
        this.notification.warn(data?.message);
      }
    })
  }



  onDgmApprovalSubmit(){

    let formData:FormData = new FormData();
    formData.append("consumerApplicationNo",null);
    formData.append("dgmApproval","true");
    formData.append("dgmId",null);

    this.consumerApplicationService.dgmApprovalForRefundApplication(formData).subscribe((response:any)=>{
      console.log(response,"response.............");
      
    })
  }


}
