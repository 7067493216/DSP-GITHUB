import { Component, Inject, OnInit } from '@angular/core';
import { BillPaymentService } from '../../services/payment.service';
import { RedirectGatewayService } from '../../services/redirect-gateway.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { HttpClient } from '@angular/common/http';
import { NewApplicationService } from '../../services/new-application.service';
import { MkmyPaymentService } from '../../services/mkmy-payment.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-revised-payment',
  templateUrl: './revised-payment.component.html',
  styleUrls: ['./revised-payment.component.css']
})
export class RevisedPaymentComponent implements OnInit {
  consumerApplicationDetail:any
  modalTitle:any
  btnTitle:any
  erpReviseData:any
  natureOfWorkTypeId:any
  erpForm:FormGroup;
  openTableBoolean:boolean = false
  constructor(
    private billPaymentService: BillPaymentService,
    private redirectGateway: RedirectGatewayService,
    private spinnerService: SpinnerService,
    private url: GenerateUrl,
    private http: HttpClient,
    private fb:FormBuilder,
    // private consumerApplicationService: ConsumerApplicationService,
    private newApplicationService: NewApplicationService,
    private mkmyPaymentService: MkmyPaymentService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RevisedPaymentComponent>
  ) {
    this.consumerApplicationDetail = this.data.row;
    console.log(this.consumerApplicationDetail ,"this.consumerApplicationDetail ............");
    this.modalTitle = this.data.modalTitle;
    this.btnTitle = this.data.btnTitle;
    this.natureOfWorkTypeId = this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId
    
   }

  ngOnInit(): void {

    if(this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId==8){

    }else{
     
    }

    this.BuildErpNumber();

  }

  BuildErpNumber(){
    this.erpForm = this.fb.group({
      erpNumber:['',Validators.required]
    })
  }

  onClose() {
    this.dialogRef.close();
  }
  getPaymentDetails(){
    console.log(this.erpForm.value,"eeeeeeeeeeeeeeeeeeeeeeeee");
    if(this.erpForm.invalid){
      this.notificationService.error("! Please Enter Erp Number First");
      return 
    }else{
      this.billPaymentService.getErpRevisedData(this.erpForm.value.erpNumber,this.consumerApplicationDetail.consumerApplicationNo,1).subscribe((response:any)=>{
        console.log(response,"response...response");
        if(response.code=="200"){
          this.erpReviseData = response.list[0];
          this.notificationService.success("! Data Retrieve Successfully")
          console.log(this.erpReviseData,"erpReviseData............");
          this.openTableBoolean = true
        }else{
          this.openTableBoolean=false;
          this.erpReviseData = null;
          this.notificationService.error("! Please Enter Valid Erp Number");
          return
        }
      })

    }
    
  }

  onSubmit(){
    this.billPaymentService.getErpRevisedData(this.erpForm.value.erpNumber,this.consumerApplicationDetail.consumerApplicationNo,2).subscribe((resp:any)=>{
      if(resp.code=="200"){
        this.notificationService.success("Data Submitted Successfully")
      }else{
        this.notificationService.warn("! Something went wrong");
        return
      }
    })
  }



}
