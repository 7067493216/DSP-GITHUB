import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject, OnDestroy, ɵConsole, ViewChild, ElementRef } from '@angular/core';
import { NewApplicationService } from 'src/app/postlogin/consumer-modules/services/new-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { UserLoginService } from '../../services/user-login.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PdfService } from '../../services/pdf.service';
import html2pdf from 'html2pdf.js';
// import { jsPDF } from "jspdf";
// import html2canvas from 'html2canvas';
// import * as $ from "jquery";

@Component({
  selector: 'app-successful-genrate-work-order',
  templateUrl: './successful-genrate-work-order.component.html',
  styleUrls: ['./successful-genrate-work-order.component.css']
})
export class SuccessfulGenrateWorkOrderComponent implements OnInit {
  // @ViewChild('componentView', { static: true }) componentView: ElementRef;
  @ViewChild('componentView', {static: false}) pdfTable: ElementRef;
  @ViewChild('componentView') htmlData!: ElementRef;
  userApplicationUrl: string = this.url.userApplicationUrl;
  userContextPath = this.url.userContextPath;
  consumerApplicationDetail: any;
  workOrderDetails: any;
  consumerContextPath = this.url.consumerContextPath;
  contractorDetails: any
  dgmStcIdd: any;
  dgmStcName: any
  stcCircleName: any;
  mkmyAmountData: any;
  paymentDetails: any;
  paymentView:any;
  userRole:any
  workOrderCreatedRoleUser:any;

  constructor(
    private url: GenerateUrl,
    private http: HttpClient,
    private pdfService: PdfService,
    private notificationService: NotificationService,
    private newApplicationService: NewApplicationService,
    private consumerApplicationService: ConsumerApplicationService,
    private userLoginService: UserLoginService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SuccessfulGenrateWorkOrderComponent>,
  ) {
    this.consumerApplicationDetail = this.data.row;
    console.log(this.consumerApplicationDetail,"this.consumerApplicationDetail.................................");
    console.log(this.consumerApplicationDetail?.workOrderGeneratedRoleCode,"this.consumerApplicationDetail.................................");
    
    let userDetails = JSON.parse(sessionStorage.getItem('accessLeveOfUser'));
    console.log(userDetails?.userCircle, "ddddddddddd..........................dddddddddddddd");
    this.stcCircleName = userDetails?.userCircle?.circle
    this.dgmStcIdd = userDetails?.userId;
    this.userRole = userDetails?.userRoles[0]?.roleCode;
    console.log(this.userRole,"this.userRole...................................");
    
    



    this.consumerApplicationService.getDgmHtcNameByCircleId(this.consumerApplicationDetail?.CIR_ID).subscribe((dataa: any) => {
      console.log(dataa, "ddaaattaaaaa....;;;;;;;;;;;;;;;;;;;;;;;;;");
      if (dataa.code == "200") {
        this.dgmStcName = dataa?.list[0]?.USER_NAME;
      }

    })
  }

  ngOnInit() {
   
    this.consumerApplicationService.getWorkOrderDetailsData(this.consumerApplicationDetail.consumerApplicationNo).subscribe((workOrderData: any) => {
      console.log('consumerApplicationData', workOrderData);
      if (workOrderData['code'] == "200") {
        this.workOrderDetails = workOrderData['list'][0];
        console.log(' this.workOrderDetails', this.workOrderDetails);
        this.consumerApplicationService.getUserByUserId(this.workOrderDetails?.dgmStcId).subscribe((res:any)=>{
          console.log(res,"res,,,,,,,,,,,,");
          if(res?.code=="200"){
            this.workOrderCreatedRoleUser = res?.list[0]?.userRoles[0]?.roleCode
          }else{

          }
      })

      }
    })
    this.consumerApplicationService.getContractorDetails(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((contractor: any) => {
      if (contractor['code'] == "200") {
        this.contractorDetails = contractor['list'][0];
        console.log(' this contractor Details', this.contractorDetails);
      } else {
        console.log(contractor, "contractorcontractorcontractorcontractor");

      }
    })

   

    let abc = 'SV2023091030'
    this.consumerApplicationService.getAllPaymentDetails(this.consumerApplicationDetail.consumerApplicationNo).subscribe((responces: any) => {
      console.log(responces, "responces...........mmmooonnnndddaaayy..................");
      if (responces.code == "200") {
        this.paymentDetails = responces.list[0];
      }
    })
    this.getPymentView()
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


  onClose() {
    this.dialogRef.close();
  }
  downloadHtmlView() {
    const htmlContent=this.htmlData.nativeElement.innerHTML;
    const blob= new Blob([htmlContent], {type: 'text/html'});
    const url= URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href=url;
    console.log(url, 'vvvvvvvvvvvvvvvvvvvvvvvvvvvvv', a);
    a.download= 'htmlData.html';
    a.click();
    URL.revokeObjectURL(url);
  }


 downloadPDF() {
  const options = {
    margin: 0.3,
    filename: 'work-order.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  const content = this.htmlData.nativeElement;

  html2pdf()
    .set(options)
    .from(content)
    .save();
}
 


}


