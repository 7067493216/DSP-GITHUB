import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Inject, OnDestroy, ɵConsole, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material/select';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { CrudType } from 'src/app/shared-enum/crudType';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { PdfService } from '../../services/pdf.service';
import * as html2pdf from 'html2pdf.js';
import { MeterialItemCostDetailsComponent } from 'src/app/postlogin/consumer-modules/new-application/meterial-item-cost-details/meterial-item-cost-details.component';
// import { AnyARecord } from 'dns';


@Component({
    selector: 'consumer-application-demand',
    templateUrl: './consumer-application-demand.component.html',
    styleUrls: ['./consumer-application-demand.component.css']
})
export class ConsumerApplicationDemandComponent implements OnInit, OnDestroy {
    unsubscribe$: Subject<void> = new Subject();
    userDemandUrl: string = this.url.userDemandUrl;
    paymentDetails:any;
    @ViewChild('componentView', { static: true }) componentView: ElementRef;
    @ViewChild('componentViewNew', { static: true }) componentViewNew: ElementRef;

    consumerApplicationDetail:any;
    userApplicationUrl: string = this.url.userApplicationUrl;
    paymentView:any
    natureOfWorkTypeId:any


    constructor(
        private spinnerService: SpinnerService,
        private url: GenerateUrl,
        private http: HttpClient,
        private fb: FormBuilder,
        private consumerApplicationService: ConsumerApplicationService,
        private notificationService: NotificationService,
        private pdfService:PdfService,
 private dialog: MatDialog,

        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ConsumerApplicationDemandComponent>,
    ) {
      console.log(this.data,"dddddddddddddddddddddddddddddddddddddddddddddd");
      
      this.natureOfWorkTypeId = this.data?.row.natureOfWorkTypeId
     }

    getPymentView(){
        this.consumerApplicationService.getAllPaymentDetails(this.data?.consumerApplicationNo).subscribe((data:any)=>{
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

    async ngOnInit() {
        console.log(this.data,"7777777777777777777777777777777777");

        let consumerApplicationData = await this.http.get(this.userApplicationUrl + '/get/' + this.data.consumerApplicationId).toPromise();
        this.consumerApplicationDetail = consumerApplicationData['list'][0];
        console.log(this.consumerApplicationDetail, "8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888");


        
      //  getDemandPaymentDetails
      this.consumerApplicationService.getDemandPaymentDetails(this.data.consumerApplicationId).subscribe((data:any)=>{
      console.log(data,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
      this.paymentDetails = data;
      console.log(this.paymentDetails,"this.paymentDetails...uuuuuuu");
      
      this.getPymentView();
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
