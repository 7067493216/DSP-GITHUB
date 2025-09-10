import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { NewApplicationService } from '../../services/new-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PdfService } from '../pdf.service';
// import { PdfService } from 'src/app/postlogin/user-modules/services/pdf.service';

@Component({
  selector: 'app-recipt-demand',
  templateUrl: './recipt-demand.component.html',
  styleUrls: ['./recipt-demand.component.css']
})
export class ReciptDemandComponent implements OnInit {
  consumerApplicationDetail:any;
  // billForm:FormGroup;
 // @ViewChild('componentView', { static: true }) componentView: ElementRef;
  @ViewChild('componentViewNew', { static: true }) componentViewNew: ElementRef;
  demandData:any
  demandDataSecond:any
  demandDataThird:any

  demandDataFirstBoolean:boolean = false;
  demandDataSecondBoolean:boolean = false;
  demandDataThirdBoolean:boolean = false;
 
  constructor(
    private url: GenerateUrl,
    private http: HttpClient,
    private fb:FormBuilder,
     private pdfService:PdfService,
    private spinnerService: SpinnerService,
    private newApplicationService: NewApplicationService,
    // public role: RoleConstantsService,
    private notification: NotificationService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ReciptDemandComponent>,
  ) { 
    this.consumerApplicationDetail = this.data.row;
  }

  ngOnInit(): void {
   // this.buildForm();
    this.onSearch()
  }

//   buildForm(){
// this.billForm = this.fb.group({
//   billRefNo: ['',Validators.required]
// })

//   }

  onClose() {
    this.dialogRef.close();
  }

  onSearch(){
    //let abc = "123"
    this.newApplicationService.getPaymentReciptData(this.consumerApplicationDetail.consumerApplicationNo).subscribe((resp:any)=>{
      console.log(resp,"resp......................................");
      if(resp.code=="200"){
       

        if(resp.list[0].length==1){
          this.demandDataFirstBoolean = true;
          this.demandDataSecondBoolean = false;
          this.demandDataThirdBoolean = false;
          this.demandData = resp.list[0][0];
          const formattedDateStringRegistration = this.formatDate(resp.list[0][0].paymentDate)
          console.log(formattedDateStringRegistration,"formattedDateStringRegistration................");
          const formattedDateStringNewRegistration = this.formatDateNew(formattedDateStringRegistration);
          console.log(formattedDateStringNewRegistration,"formattedDateStringNewRegistration.....................");
          resp.list[0][0].paymentDate = formattedDateStringNewRegistration;
        }
        if(resp.list[0].length==2){
          this.demandDataFirstBoolean = true;
          this.demandDataSecondBoolean = true;
          this.demandDataThirdBoolean = false;
          this.demandDataSecond = resp.list[0][1];
          const formattedDateStringRegistration = this.formatDate(resp.list[0][1].paymentDate)
          console.log(formattedDateStringRegistration,"formattedDateStringRegistration................");
          const formattedDateStringNewRegistration = this.formatDateNew(formattedDateStringRegistration);
          console.log(formattedDateStringNewRegistration,"formattedDateStringNewRegistration.....................");
          resp.list[0][1].paymentDate = formattedDateStringNewRegistration;
        }
        if(resp.list[0].length==3){
          this.demandDataFirstBoolean = true;
          this.demandDataSecondBoolean = true;
          this.demandDataThirdBoolean = true;
          this.demandDataThird = resp.list[0][2];
          const formattedDateStringRegistration = this.formatDate(resp.list[0][2].paymentDate)
          console.log(formattedDateStringRegistration,"formattedDateStringRegistration................");
          const formattedDateStringNewRegistration = this.formatDateNew(formattedDateStringRegistration);
          console.log(formattedDateStringNewRegistration,"formattedDateStringNewRegistration.....................");
          resp.list[0][2].paymentDate = formattedDateStringNewRegistration;
        }
      }
    })
  }

  downloadPdfNew():void {
    this.pdfService.generatePdf('elementIdToCaptureNew', 'Demand-Reciept');
 }

 downloadPdfNewSecond(){
  this.pdfService.generatePdf('elementIdToCaptureNewSecond', 'Demand-Reciept');
 }

 downloadPdfNewThird(){
  this.pdfService.generatePdf('elementIdToCaptureNewThird', 'Demand-Reciept');
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

 }

 formatDate(inputDate) {
  const date = new Date(inputDate);
  
  // Get year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');

  // Create the formatted date string
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
//const formattedDateString = formatDate(inputDateString);
 formatDateNew(inputDate) {
  const date = new Date(inputDate);

  // Get day, month, and year
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();

  // Create the formatted date string
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}



}
