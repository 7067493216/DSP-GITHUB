import { Component, Inject, OnInit } from '@angular/core';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { NewPaymentRefundRequestRejectedPopupComponent } from '../new-payment-refund-request-rejected-popup/new-payment-refund-request-rejected-popup.component';

@Component({
  selector: 'app-new-payment-refund-verification-by-gm',
  templateUrl: './new-payment-refund-verification-by-gm.component.html',
  styleUrls: ['./new-payment-refund-verification-by-gm.component.css']
})
export class NewPaymentRefundVerificationByGmComponent implements OnInit {
  revisePaymentShowBoolean: boolean = false;
  paymentDetails: any;
  erpReviseData: any;
  tabularData: any;
  refundableObject: any;
  idForPaymentDetails: Number;
  consumerApplicationDetail: any;
  checkedBooleanVariable: Boolean = false;
  accessLeveOfUser: any;
  gmId:any;
  paymentView:any;
  bankDetails:any;
  applicationDocumentData:any
  refundApplicationDetails:any
  mkmyAmountData:any
  bankDetailsverificationBooleanByDiscomUsers:boolean = false;
  returnMaterialsRowList:Array<any>=[];
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
    private consumerApplicationService: ConsumerApplicationService,
    private notification: NotificationService,
    private fb: FormBuilder,
    private url: GenerateUrl,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<NewPaymentRefundVerificationByGmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.accessLeveOfUser = JSON.parse(sessionStorage.getItem("accessLeveOfUser"));
    console.log(this.accessLeveOfUser, "v............");

    this.gmId = this.accessLeveOfUser?.userId;
    console.log(this.gmId, "this.dgmId........");

    console.log(this.data, "data,,,,,,,,,,,,,,,,,,,,,");
   // this.data.row.refundType = "CancellationPayment";
    if (this.data.row.refundType !== "Cancellation_Amount") {
      this.idForPaymentDetails = 2
    }
    this.getApplicationDocumentData(this.data.row.consumerApplicationId);
    this.consumerApplicationDetail = this.data.row;

     this.consumerApplicationService.checkReturnMaterialTotalRowsBalanceAmountZeroOrNotGetApi(this.consumerApplicationDetail?.erpWorkFlowNumber).subscribe((res: any) => {
        console.log(res, "res.............");
        if (res?.statusCode == "200") {
          this.returnMaterialsRowList = res?.list;
        }else{

        }
      });
  }

  ngOnInit(): void {
    this.checkNoOfPayment();
    this.getPymentView();
    this.getBankDetails()
    this.getRefundApplicationDetails(this.consumerApplicationDetail?.consumerApplicationNo)
  }

  getRefundApplicationDetails(appNo:any){
    this.consumerApplicationService.getRefundApplicationDetails(appNo).subscribe((resp:any)=>{
      console.log(resp,"resp.........................................");
      if(resp?.code=="200"){
        this.refundApplicationDetails = resp?.list[0];
      }
      
    })
  }

  getApplicationDocumentData(consumerApplicationId:any) {
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

   getDownloaddocMraFileFile(){
     let filePathWithBackslashes = this.applicationDocumentData.docMraFile.documentPath;
    let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
    //  console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
    window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
  }




  getBankDetails(){
    this.consumerApplicationService.getConsumerAccountDetails(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((resp:any)=>{
      console.log(resp,"resp......................................");
      if(resp?.code=="200"){
        this.notification.success(resp?.message);
this.bankDetails = resp?.list[0];
      }else{
        this.notification.warn(resp?.message);
        return
      }
      
    })
  }

  getPymentView(){
    this.consumerApplicationService.getAllPaymentDetails(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data:any)=>{
      console.log(data,"rrrrrrrrrrrrrrrrrrrrrrrrrrrr*********************rrrrrrrrrrrrrrrrrrrrrrrrrr");
      if(data.code=="200"){
       

        this.paymentView = data?.list[0];
        console.log( this.paymentView," this.paymentView.........................???????????????????????????");
        
      }else{
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




  // DemandPaymentDetails() {
  //   this.consumerApplicationService.getDemandPaymentDetails(this.data.row.consumerApplicationId).subscribe((data: any) => {
  //     console.log(data, "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
  //     this.paymentDetails = data;
  //     console.log(this.paymentDetails, "this.paymentDetails...uuuuuuu");

  //   })
  // }


  DemandPaymentDetails() {
    if(this.data.row.natureOfWorkTypeId==8){
      this.consumerApplicationService.getDemandPaymentDetailsNewForMkmy(this.data.row.consumerApplicationNo).subscribe((data: any) => {
        console.log(data, "uuuuuuuuuuuuuuuuuuuuuu for mkmy uuuuuuuuuuuuuuuuuuuuu");
       if(data?.code=="200"){
        this.mkmyAmountData = data?.list[0];
       }
      })
    }else{
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
          console.log(this.erpReviseData?.payAmt, "this.erpReviseData?.payAmt.......");
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
        console.log(ress,"ress...................................");
        this.notification.warn(ress?.message);
        return
      }
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
      } else {
        this.notification.warn(res?.message)
        return
      }
    })
  }


  onCheckboxSelection(e: any) {
    console.log(e.checked, "eeeeee..................checkbox.....................");
    this.checkedBooleanVariable = e.checked;
  }

  onCheckboxSelectionForBankDetails(e:any){
    this.bankDetailsverificationBooleanByDiscomUsers = e.checked;
  }



  onSubitByGm() {
    let formData: FormData = new FormData();
    formData.append("consumerApplicationNo", this.consumerApplicationDetail?.consumerApplicationNo);
    formData.append("gmApproval", "true");
    formData.append("gmId", this.gmId);
    formData.append("gmName", this.accessLeveOfUser?.userName);
    formData.append("gmRemark ",null);

    this.consumerApplicationService.gmApprovalForRefundAppliacation(formData).subscribe((respData: any) => {
      console.log(respData, "respData.......");
      if (respData?.code == "204") {
        this.notification.success("आवेदन स्वीकृति एवं आवश्यक कार्यवाही हेतु वित्त अनुभाग को अग्रेषित कर दिया गया है।");
        this.onClose();
      } else {
        this.notification.warn(respData?.message);
        return
      }
    })
  }

  onReject(){


  const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = '40vh';
    // dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(NewPaymentRefundRequestRejectedPopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

        ///////////////////////////////////////////////////////////
        let formData: FormData = new FormData();
        formData.append("consumerApplicationNo", this.consumerApplicationDetail?.consumerApplicationNo);
        formData.append("gmApproval", "false");
        formData.append("gmId", this.gmId);
        formData.append("gmName", this.accessLeveOfUser?.userName);
        formData.append("gmRemark ",result);
        
        this.consumerApplicationService.gmApprovalForRefundAppliacation(formData).subscribe((respData: any) => {
          console.log(respData, "respData.......");
          if (respData?.code == "204") {
            this.notification.success(respData?.message);
            this.onClose();
          } else {
            this.notification.warn(respData?.message);
            return
          }
        })


        ///////////////////////////////////////////////////////////////////////
      } else {
        this.notification.warn("Please give the remark for rejection !");
        return
      }
    })



   
  }












}
