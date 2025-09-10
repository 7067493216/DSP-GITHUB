import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject, OnDestroy, ɵConsole, ViewChild, ElementRef } from '@angular/core';
import { NewApplicationService } from 'src/app/postlogin/consumer-modules/services/new-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PdfService } from '../pdf.service';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-successful-genrate-work-order',
  templateUrl: './successful-genrate-work-order.component.html',
  styleUrls: ['./successful-genrate-work-order.component.css']
})
export class SuccessfulGenrateWorkOrderComponent implements OnInit {

//   userApplicationUrl: string = this.url.userApplicationUrl;
//   userContextPath=this.url.userContextPath;
//   consumerApplicationDetail: any;

//   workOrderDetails:any;
//   consumerContextPath=this.url.consumerContextPath;
//   contractorDetails:any;

//   paymentDetails:any
//   mkmyAmountData:any
//   paymentView:any

//   mastersUrl: string=this.url.mastersUrl;
//   @ViewChild('componentView', { static: true }) componentView: ElementRef;
//   @ViewChild('componentView', {static: false}) pdfTable: ElementRef;
//   @ViewChild('componentView') htmlData!: ElementRef;

//   constructor(
  
    
//     private url: GenerateUrl,
//     private pdfService: PdfService,
//     private http: HttpClient,
//     private notificationService: NotificationService,
//     private newApplicationService: NewApplicationService,
   
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     public dialogRef: MatDialogRef<SuccessfulGenrateWorkOrderComponent>,
//   ) {
//     console.log(data,"hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhddddddddddddffffffffccccccccc");
    
//    }

//   async ngOnInit() {

//     console.log('this.consumerApplicationDetail.consumerApplicationNo',this.data.consumerApplicationId)
//     let consumerApplicationData = await this.http.get(this.mastersUrl + '/get/' +  this.data.consumerApplicationId).toPromise();
//     console.log('consumerApplicationData', consumerApplicationData);
//     if (consumerApplicationData['code'] == "200") {
//         this.consumerApplicationDetail =   consumerApplicationData['list'][0];
//        console.log(' this.consumerApplicationDeatils', this.consumerApplicationDetail);
//        if(this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId!=8){
//         this.newApplicationService.getDemandPaymentDetails(this.data.consumerApplicationId).subscribe((data:any)=>{
//           console.log(data,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuussssssssdddddddddddddddddd");
//           if (data!=null) {
//            // this.mkmyAmountData = data.list[0];
//             this.paymentDetails = data;
//           }
//           })
//       }else{
//         this.newApplicationService.getDemandPaymentDetailsWithoutMKMY(this.consumerApplicationDetail.consumerApplicationNo).subscribe((data:any)=>{
//           console.log(data,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
//           //this.paymentDetails = data;
//           this.mkmyAmountData = data?.list[0];
//           // getDemandPaymentDetailsWithoutMKMY
//           })
//       }
//   }
//   console.log('this.consumerApplicationDetail.consumerApplicationNo',this.consumerApplicationDetail.consumerApplicationNo)
//   let workOrderData = await this.http.get(this.userContextPath + '/save-work-order/workorders/' +  this.consumerApplicationDetail.consumerApplicationNo).toPromise();
//     console.log('consumerApplicationData', workOrderData);
//     if (workOrderData['code'] == "200") {
//         this.workOrderDetails = workOrderData['list'][0];
//     console.log(' this.workOrderDetails', this.workOrderDetails);
//   }
//   let contractor = await this.http.get(this.consumerContextPath + '/qc-portal/conforbid/' +  this.consumerApplicationDetail.consumerApplicationNo).toPromise();
//   console.log('consumerApplicationData', contractor);
//   if (contractor['code'] == "200") {
//       this.contractorDetails = contractor['list'][0];
//   console.log(' this.workOrderDetails', this.contractorDetails);
// }


   
//   this. getPymentView()
  
//   }

//   getPymentView(){
//     this.newApplicationService.getAllPaymentDetails(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data:any)=>{
//       console.log(data,"rrrrrrrrrrrrrrrrrrrrrrrrrrrr*********************rrrrrrrrrrrrrrrrrrrrrrrrrr");
//       if(data?.code=="200"){
//         // const formattedDateStringRegistration = this.formatDate(data.list[0][0].DATE_OF_REGISTRATION)
//         // console.log(formattedDateStringRegistration,"formattedDateStringRegistration................");
        
//         // const formattedDateStringNewRegistration = this.formatDateNew(formattedDateStringRegistration);
//         // console.log(formattedDateStringNewRegistration,"formattedDateStringNewRegistration.....................");
        
//         // data.list[0][0].DATE_OF_REGISTRATION = formattedDateStringNewRegistration;

//         // // Demand
//         // const formattedDateStringDeemand = this.formatDate(data.list[0][0].DATE_OF_SUPERVISION_PAYMENT )
//         // console.log(formattedDateStringDeemand,"formattedDateStringDeemand................");
        
//         // const formattedDateStringNewDeemand = this.formatDateNew(formattedDateStringDeemand);
//         // console.log(formattedDateStringNewDeemand,"formattedDateStringNewDeemand.....................");
        
//         // data.list[0][0].DATE_OF_SUPERVISION_PAYMENT = formattedDateStringNewDeemand;

//         this.paymentView = data?.list[0];
//         console.log( this.paymentView," this.paymentView.........................???????????????????????????");
        
//       }else{
//         return
//       }
//     })
//   }


//   onClose() {
//     this.dialogRef.close();
// }

// downloadHtmlView() {
//   // alert("done");
//    const htmlContent = this.componentView.nativeElement.innerHTML;
//    const blob = new Blob([htmlContent], { type: 'text/html' });
//    const url = URL.createObjectURL(blob);
//    const a = document.createElement('a');
//    a.href = url;
//    console.log(url,"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",a);
   
//    a.download = 'work-order-details.html';
//    a.click();
//    URL.revokeObjectURL(url);
//  }

// //  downloadPdf(): void { 
// //   this.pdfService.generatePdf('elementIdToCapture', 'Work-Order-Details.pdf');
// // }

// downloadPDF() {
//   const options = {
//     margin: 0.5,
//     filename: 'work-order.pdf',
//     image: { type: 'jpeg', quality: 0.98 },
//     html2canvas: { scale: 2 },
//     jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//   };

//   const content = this.htmlData.nativeElement;

//   html2pdf()
//     .set(options)
//     .from(content)
//     .save();
// }


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
workOrderCreatedRoleUser:any

constructor(
  private url: GenerateUrl,
  private http: HttpClient,
  private pdfService: PdfService,
  private notificationService: NotificationService,
  private newApplicationService: NewApplicationService,
  // private consumerApplicationService: ConsumerApplicationService,
  // private userLoginService: UserLoginService,
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<SuccessfulGenrateWorkOrderComponent>,
) {
  this.consumerApplicationDetail = this.data.row;
  console.log(this.consumerApplicationDetail,"this.consumerApplicationDetail.................................");
  
  let userDetails = JSON.parse(sessionStorage.getItem('objecOfConsumers'));
 // console.log(userDetails?.distributionCenter,"userDetails.....................");
  
  // console.log(userDetails.userCircle, "ddddddddddd..........................dddddddddddddd");
   this.stcCircleName = this.consumerApplicationDetail?.distributionCenter?.dcSubdivision?.subdivisionDivision?.divisionCircle?.circle
  // this.dgmStcIdd = userDetails.userId;
  // this.userRole = userDetails.userRoles[0].roleCode;
  // console.log(this.userRole,"this.userRole...................................");
  
  



  this.newApplicationService.getDgmHtcNameByCircleId(this.consumerApplicationDetail?.distributionCenter?.dcSubdivision?.subdivisionDivision?.divisionCircle?.circleId).subscribe((dataa: any) => {
    console.log(dataa, "ddaaattaaaaa....;;;;;;;;;;;;;;;;;;;;;;;;;");
    if (dataa.code == "200") {
      this.dgmStcName = dataa.list[0].USER_NAME;
    }

  })
}

getWorkOrderDetails(){
  this.newApplicationService.getWorkOrderDetailsData(this.consumerApplicationDetail.consumerApplicationNo).subscribe((workOrderData: any) => {
    console.log('consumerApplicationData', workOrderData);
    if (workOrderData['code'] == "200") {
      this.workOrderDetails = workOrderData['list'][0];
      console.log(' this.workOrderDetails', this.workOrderDetails);
      this.newApplicationService.getUserByUserId(this.workOrderDetails?.dgmStcId).subscribe((res:any)=>{
        console.log(res,"res,,,,,,,,,,,,");
        if(res?.code=="200"){
          this.workOrderCreatedRoleUser = res?.list[0]?.userRoles[0]?.roleCode;
          console.log(this.workOrderCreatedRoleUser,"this.workOrderCreatedRoleUser.......................");
          
        }else{

        }
    })

    }
  })
}

ngOnInit() {
  this.getWorkOrderDetails();
 
  this.newApplicationService.getWorkOrderDetailsData(this.consumerApplicationDetail.consumerApplicationNo).subscribe((workOrderData: any) => {
    console.log('consumerApplicationData', workOrderData);
    if (workOrderData['code'] == "200") {
      this.workOrderDetails = workOrderData['list'][0];
      console.log(' this.workOrderDetails', this.workOrderDetails);
    }
  })
  this.newApplicationService.getContractorDetails(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((contractor: any) => {
    if (contractor['code'] == "200") {
      this.contractorDetails = contractor['list'][0];
      console.log(' this contractor Details', this.contractorDetails);
    } else {
      console.log(contractor, "contractorcontractorcontractorcontractor");

    }
  })

 

  let abc = 'SV2023091030'
  this.newApplicationService.getAllPaymentDetails(this.consumerApplicationDetail.consumerApplicationNo).subscribe((responces: any) => {
    console.log(responces, "responces...........mmmooonnnndddaaayy..................");
    if (responces.code == "200") {
      this.paymentDetails = responces?.list[0];
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

//   downloadPdf(): void { 
//     this.pdfService.generatePdf('elementIdToCapture', 'Work-Order-Details.pdf');
//  }

downloadPDF() {
const options = {
  margin: 0.5,
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
