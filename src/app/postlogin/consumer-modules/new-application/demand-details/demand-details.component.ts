import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NewApplicationService } from '../../services/new-application.service';
import { Subject } from 'rxjs';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { PdfService } from '../../services/pdf.service';
import { MeterialItemCostDetailsComponent } from '../meterial-item-cost-details/meterial-item-cost-details.component';


@Component({
  selector: 'app-demand-details',
  templateUrl: './demand-details.component.html',
  styleUrls: ['./demand-details.component.css']
})
export class DemandDetailsComponent implements OnInit, OnDestroy  {

  unsubscribe$: Subject<void> = new Subject();
    userDemandUrl: string = this.url.userDemandUrl;
    paymentDetails:any;
    @ViewChild('componentView', { static: true }) componentView: ElementRef;
    @ViewChild('componentViewNew', { static: true }) componentViewNew: ElementRef;
    paymentView:any
    natureOfWorkTypeId:any
    

    consumerApplicationDetail:any;
    userApplicationUrl: string = this.url.userApplicationUrl;


    constructor(
        private spinnerService: SpinnerService,
               private url: GenerateUrl,
               private http: HttpClient,
               private newApplicationService: NewApplicationService,
               private notificationService: NotificationService,
               private fb: FormBuilder,
               private pdfService:PdfService,
        private dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any,
               public dialogRef: MatDialogRef<DemandDetailsComponent>,
    ) {
      this.data = data?.row;
     }

    async ngOnInit() {
        console.log(this.data,"7777777777777777777777777777777777");

        let consumerApplicationData = await this.http.get(this.userApplicationUrl + '/get/' + this.data.consumerApplicationId).toPromise();
        this.consumerApplicationDetail = consumerApplicationData['list'][0];
        console.log(this.consumerApplicationDetail, "8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888");
      this.natureOfWorkTypeId = this.consumerApplicationDetail

        
      //  getDemandPaymentDetails
      this.newApplicationService.getDemandPaymentDetailsNew(this.data.consumerApplicationId).subscribe((data:any)=>{
      console.log(data,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
      this.paymentDetails = data;
      console.log(this.paymentDetails,"this.paymentDetails...uuuuuuu");
      this.getPymentView()
      
      })
      
    }

    getPymentView(){
      this.newApplicationService.getAllPaymentDetails(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data:any)=>{
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
    

    downloadHtmlView() {
      
         const htmlContent = this.componentView.nativeElement.innerHTML;
         const blob = new Blob([htmlContent], { type: 'text/html' });
         const url = URL.createObjectURL(blob);
         const a = document.createElement('a');
         a.href = url;
         console.log(url,"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",a);
         
         a.download = 'demand-Note.html';
         a.click();
         URL.revokeObjectURL(url);



        // const componentView = this.componentView.nativeElement;

        // const options = {
        //     margin: 10,
        //     filename: 'Application-Demand.pdf',
        //     image: { type: 'jpeg', quality: 0.98 },
        //     html2canvas: { scale: 2 },
        //     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        // };

        // html2pdf().from(componentView).set(options).outputPdf(pdf => {
        //     // You can save the PDF or trigger a download
        //     pdf.save();
        // });

        // console.log("dddddddddddddddoooonnneeeee111111111111111");
        

       }

       downloadHtmlViewNew(){
        const htmlContent = this.componentViewNew.nativeElement.innerHTML;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        console.log(url,"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",a);
        
        a.download = 'demand-Note.html';
        a.click();
        URL.revokeObjectURL(url);




        // const componentViewNew = this.componentViewNew.nativeElement;

        // const options = {
        //     margin: 10,
        //     filename: 'Application-Demand.pdf',
        //     image: { type: 'jpeg', quality: 0.98 },
        //     html2canvas: { scale: 2 },
        //     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        // };

        // html2pdf().from(componentViewNew).set(options).outputPdf(pdf => {
        //     // You can save the PDF or trigger a download
        //     pdf.save();
        // });

        // console.log("ddddoooonnnnnnnneeeeee222222222222222");
        

       }



    onClose() {
        this.dialogRef.close();
    }

    async ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    downloadPdf(): void {
        this.pdfService.generatePdf('elementIdToCapture', 'Application-Demand');
      }

      downloadPdfNew():void {
         this.pdfService.generatePdf('elementIdToCaptureNew', 'Application-Demand');
      }
  
 onMeterialItemDetails(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = '70vh';
    dialogConfig.data = { consumerApplicationNo: this.consumerApplicationDetail?.consumerApplicationNo};
    const dialogRef = this.dialog.open(MeterialItemCostDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
