import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MkmyPaymentService } from '../../services/mkmy-payment.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { PdfService } from '../../services/pdf.service';
import { ConsumerApplicationService } from '../../services/consumer-application.service';

@Component({
  selector: 'app-mkmy-demand-details',
  templateUrl: './mkmy-demand-details.component.html',
  styleUrls: ['./mkmy-demand-details.component.css']
})
export class MkmyDemandDetailsComponent implements OnInit {

  consumerApplicationNo:any;
  mkmyAmountData:any;
  erpEstimateDataForMkmyArray:any
  @ViewChild('componentView', { static: true }) componentView: ElementRef;
  paymentView:any

  constructor(
    private mkmyPaymentService:MkmyPaymentService,
    private notificationService: NotificationService,
    private consumerApplicationService: ConsumerApplicationService,
    private pdfService:PdfService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MkmyDemandDetailsComponent>,
  ) {
    console.log(this.data,"ttttttttttttttrrrrrrrrwwwwwwww");
    
    this.consumerApplicationNo = this.data.consumerApplicationNo;

    
   }

   getPymentView(){
    this.consumerApplicationService.getAllPaymentDetails(this.consumerApplicationNo).subscribe((data:any)=>{
      console.log(data,"rrrrrrrrrrrrrrrrrrrrrrrrrrrr*********************rrrrrrrrrrrrrrrrrrrrrrrrrr");
      if(data.code=="200"){
        // const formattedDateStringRegistration = this.formatDate(data.list[0][0].DATE_OF_REGISTRATION)
        // console.log(formattedDateStringRegistration,"formattedDateStringRegistration................");
        
        // const formattedDateStringNewRegistration = this.formatDateNew(formattedDateStringRegistration);
        // console.log(formattedDateStringNewRegistration,"formattedDateStringNewRegistration.....................");
        
        // data.list[0][0].DATE_OF_REGISTRATION = formattedDateStringNewRegistration;
  
        // // Demand
        // const formattedDateStringDeemand = this.formatDate(data.list[0][0].DATE_OF_SUPERVISION_PAYMENT )
        // console.log(formattedDateStringDeemand,"formattedDateStringDeemand................");
        
        // const formattedDateStringNewDeemand = this.formatDateNew(formattedDateStringDeemand);
        // console.log(formattedDateStringNewDeemand,"formattedDateStringNewDeemand.....................");
        
        // data.list[0][0].DATE_OF_SUPERVISION_PAYMENT = formattedDateStringNewDeemand;
  
        this.paymentView = data?.list[0];
        console.log( this.paymentView," this.paymentView.........................???????????????????????????");
        
      }else{
        return
      }
    })
  }

  ngOnInit(): void {

    this.mkmyPaymentService.getMkmyAmountByConsumerApplicationNumber(this.consumerApplicationNo).subscribe((data: any) => {
      console.log(data, "mkmy...data..................");
      if (data.code == "200") {
        this.mkmyAmountData = data.list[0];


        ///////  erp estimate table Data
        this.mkmyPaymentService.getErpDetailsByErpNumber(JSON.parse(this.mkmyAmountData.erpNumber), this.consumerApplicationNo).subscribe((data: any) => {
          console.log(data, "Mkmy........Data.....................");
          if (data.code == "200") {
            this.erpEstimateDataForMkmyArray = data.list;
            this.getPymentView()
           
            this.notificationService.success("Data retrive Successfully");
          } else {
            this.notificationService.warn("something went wrong !");
            return;
          }
        })


      }


    });

  }

  onClose() {
    this.dialogRef.close();
}

downloadHtmlView() {
  // alert("done");
   const htmlContent = this.componentView.nativeElement.innerHTML;
   const blob = new Blob([htmlContent], { type: 'text/html' });
   const url = URL.createObjectURL(blob);
   const a = document.createElement('a');
   a.href = url;
   console.log(url,"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",a);
   
   a.download = 'demand-Note.html';
   a.click();
   URL.revokeObjectURL(url);
 }

 downloadPdfNew():void {
  this.pdfService.generatePdf('elementIdToCaptureNew', 'Application-Demand');
}


}
