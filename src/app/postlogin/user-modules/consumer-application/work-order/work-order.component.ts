
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Inject, OnDestroy, ɵConsole, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
// import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { NewApplicationService } from 'src/app/postlogin/consumer-modules/services/new-application.service';
import { CrudType } from 'src/app/shared-enum/crudType';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { UserLoginService } from '../../services/user-login.service';
import { SendToWorkOrder } from '../../models/send-to-work-order.model';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';




@Component({
    selector: 'work-order',
    templateUrl: './work-order.component.html',
    styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent implements OnInit, OnDestroy {
    @ViewChild('pdfContent') pdfContent!: ElementRef;
    @ViewChild('componentView', { static: false }) pdfTable: ElementRef;
    @ViewChild('componentView') htmlData!: ElementRef;
    unsubscribe$: Subject<void> = new Subject();
    consumerApplicationDetail: any;
    consumerSurveyData: any;
    userRoles: Array<any> = [];
    workOrderFg: FormGroup;
    userApplicationUrl: string = this.url.userApplicationUrl;
    userContextPath: string = this.url.userContextPath;
    consumerContextPath = this.url.consumerContextPath;
    checkBoxValuecheck: boolean = false;
    isChecked: boolean = false;
    contractorDetails: any
    disablebtn: Boolean = false
    loginUser: any;
    date: any;
    perviousYear: any;
    workOrderNumber: any;
    backEndWorkOrderDate: any;
    workOrderData: any;
    crudType = this.data.crudType;
    // userSurveyUrl: string = this.url.userSurveyUrl;

    dgmStcIdd: any;
    dgmStcName: any
    stcCircleName: any
    mkmyAmountData: any
    paymentDetails: any
    stcCircle: any
    paymentView: any;
    workOrderPaymentView: any;
    userRole: any;
    token: any;
    downloadHideBoolean: boolean = false

    workOrderModel: SendToWorkOrder = new SendToWorkOrder();
    // charitra code end
    constructor(
        private spinnerService: SpinnerService,
        private url: GenerateUrl,
        private http: HttpClient,
        private fb: FormBuilder,
        private notificationService: NotificationService,
        private newApplicationService: NewApplicationService,
        private consumerApplicationService: ConsumerApplicationService,
        private userLoginService: UserLoginService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<WorkOrderComponent>,
    ) {
        this.consumerApplicationDetail = this.data.row;
        console.log(this.consumerApplicationDetail, "this.consumerApplicationDetail.................................");
        //  consumerApplicationDetail.revisedErpNumber
        let userDetails = JSON.parse(sessionStorage.getItem('accessLeveOfUser'));
        console.log(userDetails, "ddddddddddd..........................dddddddddddddd");
        this.stcCircle = userDetails.userCircle
        this.stcCircleName = userDetails.userCircle.circle
        this.dgmStcIdd = userDetails.userId
        this.userRole = userDetails.userRoles[0].roleCode;
        this.workOrderModel.workOrderGeneratedRoleCode = this.userRole;
        console.log(this.userRole, "this.userRole...................................");
        this.token = sessionStorage.getItem("usertoken");

        this.consumerApplicationService.getDgmHtcNameByCircleId(userDetails.userCircle.circleId).subscribe((dataa: any) => {
            console.log(dataa, "ddaaattaaaaa....;;;;;;;;;;;;;;;;;;;;;;;;;");
            if (dataa.code == "200") {
                this.dgmStcName = dataa.list[0].USER_NAME;
            }

        })
    }

    ngOnInit() {
        let abc = 'SV2023091030'
        this.consumerApplicationService.getAllPaymentDetails(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((responces: any) => {
            console.log(responces, "responces...........mmmooonnnndddaaayy..................");
            if (responces.code == "200") {
                this.paymentDetails = responces.list[0];
            } else {
            }
        });


        this.workOrderFg = this.fb.group({
            // consumerApplicationId: [''],
            cb: ['', Validators.required]
        });


        this.date = new Date();
        this.date.getFullYear()
        this.perviousYear = this.date.getFullYear() - 1;

        this.consumerApplicationService.getByGenerateWorkOderNo().subscribe((data: any) => {
            if (data['code'] == "200") {
                console.log(data['list'][0], "data['list'][0]..............");

                this.backEndWorkOrderDate = data['list'][0].workOderDate;
                this.workOrderNumber = data['list'][0].workOderNo;
                this.workOrderModel.workOrderNo = this.workOrderNumber;
                this.workOrderModel.workOrderDate = this.backEndWorkOrderDate;
                console.log('  this.backEndWorkOrderDate', this.backEndWorkOrderDate);
            }
        })



        console.log(this.consumerApplicationDetail?.consumerApplicationNo, '**************************');

        this.consumerApplicationService.getContractorDetails(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((contractor: any) => {
            if (contractor['code'] == "200") {
                this.contractorDetails = contractor['list'][0];
                console.log(' this contractor Details', this.contractorDetails);
            }
        })


        console.log('this.consumerApplicationDetail.consumerApplicationId', this.consumerApplicationDetail?.consumerApplicationId);
        this.workOrderModel.consumerApplicationNo = this.consumerApplicationDetail?.consumerApplicationNo;
        this.workOrderModel.dgmStcId = this.dgmStcIdd;
        console.log(this.workOrderModel, this.workOrderModel.dgmStcId, "fffffffffffffffffffffffffffffffffwwwwwwwwwwwwwwwrrrrrrrrrr************");

        this.getPymentView();

    }


    revertToDemandPayment() {
        this.consumerApplicationService.revertToDemandPayment(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((respo: any) => {
            console.log(respo, "ggggggggggggrrrrrrrrrrrrrrrrrroooouuuuuppppppp.................");
            if (respo.code == "200") {
                this.notificationService.success(respo.message);
                this.onClose();
            } else {
                this.notificationService.warn(respo.message);
                return;
            }
        })
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


    getPymentView() {
        this.consumerApplicationService.getAllPaymentDetails(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data: any) => {
            console.log(data, "rrrrrrrrrrrrrrrrrrrrrrrrrrrr*********************rrrrrrrrrrrrrrrrrrrrrrrrrr");
            if (data.code == "200") {
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

                this.paymentView = data.list[0];
                console.log(this.paymentView, " this.paymentView.........................???????????????????????????");

            } else {
                return
            }
        })
    }






    ngOnDestroy() {

    }

    onClose() {
        this.dialogRef.close();
    }

    checkboxSelectionValidation(e: any) {
        console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee,,,,,,,,,,,,,,,,,,,,,,,,,,,");
        this.checkBoxValuecheck = e;
    }

    onSubmit() {

        console.log('workOrderModel', this.workOrderModel);
        // if(this.workOrderFg.invalid){
        //     return;
        // }
        if (this.workOrderFg.invalid) {
            this.notificationService.error('please select  check box');
            return;
        }

        if (this.checkBoxValuecheck == false) {
            this.notificationService.error('please select  check box');
            return
        }


        console.log(this.workOrderFg.valid, 'this.workOrderFg.valid');

        if (this.workOrderFg.valid) {
            const spinnerRef = this.spinnerService.start();

            console.log('this.workOrderModel', this.workOrderModel);
            this.consumerApplicationService.saveWorkOrder(this.workOrderModel).pipe(takeUntil(this.unsubscribe$), finalize(() => this.spinnerService.stop(spinnerRef))).subscribe(
                data => {
                    console.log('aaa bbbb  ccccc dddd eeeee', data);
                    console.log(data);
                    if (data['code'] == "200") {
                        console.log(data, "charitra fault...................");
                        this.disablebtn = true;
                        this.notificationService.success(data['message']);
                        this.downloadHideBoolean = true
                        if (this.downloadHideBoolean == true) {
                            this.downloadPdf();
                            this.onClose();
                        }

                    } else {
                        this.disablebtn = false;
                        this.notificationService.warn(data['message']);
                        return
                        // alert(data['message']);
                    }
                });

        }


    }

    

    downloadPdf() {

        const options = {
            margin: 0.5,
            filename: `work-order(${this.consumerApplicationDetail?.consumerApplicationNo}).pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };

        const content = this.htmlData.nativeElement;

        // Generate the PDF and handle the Blob
        html2pdf()
            .set(options)
            .from(content)
            .save()
            .toPdf() // Ensure PDF generation
            .outputPdf('blob') // Get the PDF as a Blob
            .then((pdfBlob: Blob) => {
                console.log(pdfBlob, 'Generated PDF Blob');

                // Prepare form data for upload
                const formDataNew: FormData = new FormData();
                formDataNew.append('docWorkOrder', pdfBlob,`work-order(${this.consumerApplicationDetail?.consumerApplicationNo}).pdf`); // Add a filename for clarity
                formDataNew.append(
                    'consumerApplicationNo',
                    this.consumerApplicationDetail?.consumerApplicationNo || ''
                );

                // Upload the form data via the service
                this.consumerApplicationService.uploadWorkOrder(formDataNew, this.token).subscribe({
                    next: (res: any) => {
                        console.log(res, 'Upload response');
                    },
                    error: (err: any) => {
                        console.error('Error uploading work order:', err);
                    },
                });
            })
            .catch((error) => {
                console.error('Error generating or uploading PDF:', error);
            });

        // this.downloadHideBoolean = false;
    }




    generateAndUploadPDF(): void {
        const pdfContentElement = this.pdfContent.nativeElement;

        // Capture the content as a canvas
        html2canvas(pdfContentElement).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');

            // Generate PDF
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190; // Width in mm for A4 size
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            pdf.save()
            // Convert PDF to Blob
            const pdfBlob = pdf.output('blob');

            // Upload PDF
            const formDataNew: FormData = new FormData();

            formDataNew.append('docWorkOrder', pdfBlob, 'work-order.pdf');
            formDataNew.append('consumerApplicationNo', this.consumerApplicationDetail?.consumerApplicationNo);

            this.consumerApplicationService.uploadWorkOrder(formDataNew, this.token).subscribe({
                next: (response) => console.log('PDF uploaded successfully!', response),
                error: (error) => console.error('Error uploading PDF', error),
            })


        });
    }




}