import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Inject, OnDestroy, ɵConsole, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
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
import { SendToWorkCompletionDateAndConsumerApplicationNumber, SendToWorkCompletionDateAndConsumerApplicationNumberVersionNew } from '../../models/sendtoworkcompletiondateandcunsumerapplicationumber';
import { Route, Router } from '@angular/router';
import { UserSelectDtrPtrAndOtherComponent } from '../user-select-dtr-ptr-and-other/user-select-dtr-ptr-and-other.component';
import { SendOtpModel } from '../../models/sendOtp';
import { VerifyOtpModel } from '../../models/verifyOtp';
import { VenderMaterialUpdatePayload } from '../../models/venderMaterialListUpdatePayload';


interface RowData {
  id: number;
  consumerApplicationNumber: string;
  userId: string;
  vendorName: string;                    // stringified array text भी हो सकता है
  vendorMaterialSpecification: string;   // stringified array text भी हो सकता है
  transformerSerialNo: string;           // stringified array text भी हो सकता है
  materialInstallationDate: string;      // stringified array text भी हो सकता है
  resamplingFlag: number;
  parentApplicationNo: any;
  chindApplicationNo: any;
  postFlag: number | null;
  item_serial_no: string | null;
  month_year_of_item_manufacture: string | null;
  bill_number: string | null;
  bill_date: string | null;
  reSamplingData: any;
}

@Component({
  selector: 'work-completion',
  templateUrl: './work-completion.component.html',
  styleUrls: ['./work-completion.component.css']
})
export class WorkCompletionComponent implements OnInit, OnDestroy {

  // reasonForm:FormGroup
  isStcAccepted: boolean;
  newPayLoad: SendToWorkCompletionDateAndConsumerApplicationNumberVersionNew = new SendToWorkCompletionDateAndConsumerApplicationNumberVersionNew()
  unsubscribe$: Subject<void> = new Subject();
  sendOtP: SendOtpModel = new SendOtpModel();
  verifyOtp: VerifyOtpModel = new VerifyOtpModel();
  consumerApplicationDetail: any;
  workComplicationDetail: any;
  consumerSurveyData: any;
  userRoles: Array<any> = [];
  workCompletionFg: FormGroup;
  otpVerificationForm: FormGroup;
  enabledOTP: boolean = false;
  invalidUser: boolean = false;
  userApplicationUrl: string = this.url.userApplicationUrl;
  // userApplicationUrl: string = this.url.userApplicationUrl;
  consumerContextPath: string = this.url.consumerContextPath;
  userContextPath: string = this.url.userContextPath;
  master: string = this.url.mastersUrl;
  loginUser: any;
  contractorDetails: any;
  applicationDate: Date;
  consumerApplicationId: any;
  drtListArray: any;
  htListArray: any;
  itListArray: any;
  it11KvListArray: any;
  ptrListArray: any;
  submitDisableEnableFunctionality: boolean = false;
  checkBoxValuecheck: boolean = false;
  isChecked: boolean = false;
  disableSelectOneButton: boolean = false;
  goFormGo: boolean = false;
  userMobileNo: any;
  LoginUserDetails: any
  showRemark: boolean = false;
  filePathObject: any
  showFileDocs: boolean = false;
  contractorRemarks: any
  completeDate: any
  // userSurveyUrl: string = this.url.userSurveyUrl;
  // workOrderModel:SendToWorkOrder=new SendToWorkOrder();
  STWCDMODEL: SendToWorkCompletionDateAndConsumerApplicationNumber
    = new SendToWorkCompletionDateAndConsumerApplicationNumber();
  // charitra code end

  venderAllMaterialList: Array<any> = [];
  venderMaterialUpdatePayload: VenderMaterialUpdatePayload = new VenderMaterialUpdatePayload();
  // data: RowData[] = [
  //   {
  //     id: 24,
  //     consumerApplicationNumber: 'SV2023081151',
  //     userId: '738',
  //     vendorName: "['Electrofront Transpower Pvt Ltd ', 'JSP ENTERPRISES']",
  //     vendorMaterialSpecification:
  //       "['DTR 63 kVA, BIS certified, EE Level-II', 'Horizontal & Cross Bracing set of MS angle of 50X50X6 mm for 8 ft (2.4 mtr ) centre DP']",
  //     transformerSerialNo: "['M-0114005', 'M-0502395']",
  //     materialInstallationDate: "['2023-10-11', '2023-10-11']",
  //     resamplingFlag: 0,
  //     parentApplicationNo: null,
  //     chindApplicationNo: null,
  //     postFlag: 0,
  //     item_serial_no: null,
  //     month_year_of_item_manufacture: null,
  //     bill_number: null,
  //     bill_date: null,
  //     reSamplingData: null,
  //   },
  //   {
  //     id: 50,
  //     consumerApplicationNumber: 'SV2023081151',
  //     userId: '1185',
  //     vendorName: "['Western Electricals Unit II']",
  //     vendorMaterialSpecification: "['DTR 200 kVA, BIS certified, EE Level-III']",
  //     transformerSerialNo: "['M-0106023']",
  //     materialInstallationDate: "['2023-10-23']",
  //     resamplingFlag: 0,
  //     parentApplicationNo: null,
  //     chindApplicationNo: null,
  //     postFlag: 0,
  //     item_serial_no: null,
  //     month_year_of_item_manufacture: null,
  //     bill_number: null,
  //     bill_date: null,
  //     reSamplingData: null,
  //   },
  // ];
  data: RowData[] = []
  myForm!: FormGroup;
  maxDate: Date

  // displayed columns (टेबल हेडर का order)
  displayedColumns = [

    // 'id',
    // 'consumerApplicationNumber',
    // 'userId',
    'vendorName',
    'vendorMaterialSpecification',
    'transformerSerialNo',
    'materialInstallationDate',
    // 'resamplingFlag',
    // 'parentApplicationNo',
    // 'chindApplicationNo',
    // 'postFlag',
    'item_serial_no',
    'month_year_of_item_manufacture',
    // 'bill_number',
    // 'bill_date',
    // 'reSamplingData',
    'editable',
    'actions',
  ];

  constructor(private route: Router,
    private spinnerService: SpinnerService,
    private url: GenerateUrl,
    private http: HttpClient,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private newApplicationService: NewApplicationService,
    private consumerApplicationService: ConsumerApplicationService,
    private userLoginService: UserLoginService,
    @Inject(MAT_DIALOG_DATA) public dataObj: any,
    public dialogRef: MatDialogRef<WorkCompletionComponent>,
    private dialog: MatDialog,

  ) {

    this.consumerApplicationDetail = this.dataObj.row;
    console.log(this.dataObj, "this.dataObj........................");
    this.STWCDMODEL.consumerApplicationNumber = this.consumerApplicationDetail?.consumerApplicationNo;


    let userDetails = JSON.parse(sessionStorage.getItem('accessLeveOfUser'));
    console.log(userDetails, "ddddddddddd..........................dddddddddddddd");
    this.userMobileNo = userDetails.mobileNo;
    this.LoginUserDetails = userDetails;

    this.maxDate = new Date();
    this.maxDate.setMonth(this.maxDate.getMonth())
  }

  ngOnInit() {
    if (this.consumerApplicationDetail?.schemeTypeId == 1) {
      this.getAllMeterialsDetailOfVender(this.consumerApplicationDetail?.consumerApplicationNo);
    }

    this.unlockTheFormbuild()
    this.fun();

    const today = new Date();
    const day: any = today.getDate();
    let month: any = today.getMonth() + 1;
    const year: any = today.getFullYear();


    if (month < 10) {
      month = '0' + month;
      // console.log(month,'INSIDE IF');
    } else {
      month = month;
      //  console.log(month,"INSIDE ELSE")
    }
    // this.completeDate =year+"-"+month+"-"+day;

    // this.completeDate = day + "-" + month + "-" + year;
    this.completeDate = year + "-" + month + "-" + day;
    console.log(this.completeDate, "this.completeDate");

    console.log("ngOnInit is calling !!!!!!!!!!!!!!!!!!!!!!!!!");

    this.loginUser = this.userLoginService.currentUserName;
    this.applicationDate = new Date("1947-08-15");
    this.workCompletionFg = this.fb.group({
      consumerApplicationNumber: [this.consumerApplicationDetail?.consumerApplicationNo, Validators.required],
      cb: ['', Validators.requiredTrue],
      dateOfDgmStc: ["", Validators.required],
      remark: ['', Validators.required],
      reason: ['', Validators.required]
    });


    // this.consumerApplicationService.getConsumerApplicationData(this.dataObj.consumerApplicationId).subscribe((consumerApplicationData: any) => {
    //   if (consumerApplicationData['code'] == "200") {
    //     this.consumerApplicationDetail = this.consumerApplicationDetail;
    console.log('consumerApplicationData', this.consumerApplicationDetail);
    this.STWCDMODEL.consumerApplicationNumber = this.consumerApplicationDetail?.consumerApplicationNo;

    if (this.consumerApplicationDetail.dtr == null && this.consumerApplicationDetail.ht11Kv == null && this.consumerApplicationDetail.ht33Kv == null && this.consumerApplicationDetail.lt == null && this.consumerApplicationDetail.ptr == null) {
      this.disableSelectOneButton = false;
    } else {
      this.disableSelectOneButton = true;
    }

    //   }
    // })

    this.consumerApplicationService.getContractorDetails(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((contractor: any) => {
      console.log(contractor, "contractor.............................................");

      if (contractor['code'] == "200") {
        this.contractorDetails = contractor['list'][0];
        console.log(' this contractor Details............................................', this.contractorDetails);
        this.getContractorFilePath()
        this.getContractorRemark();

      }
    })

    const spinnerRef = this.spinnerService.start();
    this.consumerApplicationService.getworkcompletionData(this.consumerApplicationDetail?.consumerApplicationNo).pipe(takeUntil(this.unsubscribe$), finalize(() => this.spinnerService.stop(spinnerRef))).subscribe(
      workComplicationDataAllData => {
        console.log(workComplicationDataAllData, 'workComplicationDataAllData')
        this.workComplicationDetail = workComplicationDataAllData;
        console.log(" work Complication Detail", this.workComplicationDetail);
      });


    //////////////////////////////////////////

    ///////////////////////////////////////////

  }


  //******************************************************** formArray start **************************************************************//





  get rows(): FormArray {
    const formArray = this.myForm?.get('rows');
    if (!formArray) {
      console.warn('rows FormArray not found!');
      return new FormArray([]);
    }
    return formArray as FormArray;
  }


  private buildRow(d: RowData): FormGroup {
    return this.fb.group({
      // UI/state
      editable: new FormControl(false),

      // data fields
      id: new FormControl(d.id),
      consumerApplicationNumber: new FormControl(d.consumerApplicationNumber),
      userId: new FormControl(d.userId),
      vendorName: new FormControl(d.vendorName),
      vendorMaterialSpecification: new FormControl(d.vendorMaterialSpecification),
      transformerSerialNo: new FormControl(d.transformerSerialNo),
      materialInstallationDate: new FormControl(d.materialInstallationDate),
      resamplingFlag: new FormControl(d.resamplingFlag),
      parentApplicationNo: new FormControl(d.parentApplicationNo),
      chindApplicationNo: new FormControl(d.chindApplicationNo),
      postFlag: new FormControl(d.postFlag),
      item_serial_no: new FormControl(d.item_serial_no),
      month_year_of_item_manufacture: new FormControl(d.month_year_of_item_manufacture),
      bill_number: new FormControl(d.bill_number),
      bill_date: new FormControl(d.bill_date),
      reSamplingData: new FormControl(d.reSamplingData),
    });
  }

  private disableRowKeepCheckbox(group: FormGroup) {
    // पूरे group को disable…
    group.disable({ emitEvent: false });
    // …लेकिन checkbox को enabled रहने दें
    group.get('editable')?.enable({ emitEvent: false });
  }

  toggleEditable(i: number) {
    const group = this.rows.at(i) as FormGroup;
    const isEditable = group.get('editable')?.value;

    // सभी controls पर iterate; editable को untouched
    Object.keys(group.controls).forEach((key) => {
      if (key === 'editable') return;
      const control = group.get(key);
      if (isEditable) {
        control?.enable({ emitEvent: false });
      } else {
        control?.disable({ emitEvent: false });
      }
    });
  }

  onSubmitRow(i: number) {
    const group = this.rows.at(i) as FormGroup;
    // getRawValue -> disabled fields भी शामिल
    const payload = group.getRawValue();
    console.log('Submitting row', i, payload);

    this.venderMaterialUpdatePayload.consumerApplicationNumber = payload?.consumerApplicationNumber
    this.venderMaterialUpdatePayload.userId = payload?.userId
    this.venderMaterialUpdatePayload.vendorName = payload?.vendorName
    this.venderMaterialUpdatePayload.vendorMaterialSpecification = payload?.vendorMaterialSpecification
    this.venderMaterialUpdatePayload.transformerSerialNo = payload?.transformerSerialNo
    this.venderMaterialUpdatePayload.materialInstallationDate = payload?.materialInstallationDate
    this.venderMaterialUpdatePayload.RESAMPLING_FLAG = payload?.resamplingFlag
    this.venderMaterialUpdatePayload.PARENT_APP_NO = payload?.parentApplicationNo
    this.venderMaterialUpdatePayload.CHILD_APP_NO = payload?.chindApplicationNo
    this.venderMaterialUpdatePayload.POST_FLAG = payload?.postFlag
    this.venderMaterialUpdatePayload.item_serial_no = payload?.item_serial_no
    this.venderMaterialUpdatePayload.month_year_of_item_manufacture = payload?.month_year_of_item_manufacture
    this.venderMaterialUpdatePayload.bill_number = payload?.bill_number
    this.venderMaterialUpdatePayload.bill_date = payload?.bill_date
    this.venderMaterialUpdatePayload.id = payload?.id

    this.consumerApplicationService.updateTheVendorMaterialData(this.venderMaterialUpdatePayload).subscribe((resp: any) => {
      if (resp?.code == "204") {
        this.notificationService.success(resp?.message);
        const isEditable = group.get('editable')?.value;
        Object.keys(group.controls).forEach((key) => {
          if (key === 'editable') return;
          const control = group.get(key);
          control?.disable({ emitEvent: false });

        });
        group.get('editable')?.setValue(false)
      } else {
        this.notificationService.warn(resp?.message);
        return
      }
    })


  }
  //******************************************************** formArray end **************************************************************//




  getContractorRemark() {
    this.consumerApplicationService.getContracterRemark(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data: any) => {
      console.log(data, "Coonnttrraaaccttooorrrrrrreeemmmarrrrkkkk//////////////???????????????????");
      if (data?.code == "200") {
        console.log(data?.list[0], "remark--llliissttttttttttttttttt??????????????????????");
        this.contractorRemarks = data?.list[0];

      }
    })
  }

  getContractorFilePath() {
    let a = 'SV1707125529920'
    let b = 4322
    this.consumerApplicationService.getFilePathForContractorDocuments(this.consumerApplicationDetail?.consumerApplicationNo, this.contractorDetails?.USER_ID).subscribe((resp: any) => {
      console.log(resp, "filePathDetails..........................///////////////////////////..............////  this.consumerApplicationDetail?.consumerApplicationNo ////  this.contractorDetails.contractorId //////............/////////////");
      // consumer_application_no=SV1707125529920&User_Id=4322
      // this.consumerApplicationDetail?.consumerApplicationNo,this.contractorDetails.contractorId
      if (resp?.status == 200) {
        this.filePathObject = resp.data;
        this.showFileDocs = true;
      } else {
        this.showFileDocs = false;
      }
    })
  }

  unlockTheFormbuild() {
    this.otpVerificationForm = this.fb.group({
      otp: ["", Validators.required]
    })
  }

  onDownload(path: any) {

    if (this.url.baseUrl == "https://rooftop-uat.mpcz.in:8888") {
      window.open("https://qcdev.mpcz.in:8080" + path, "_blank", "popup=yes")
    } else {
      window.open("https://qcportal.mpcz.in" + path, "_blank", "popup=yes")
    }


    // https://qcdev.mpcz.in:8080/media/tkc_bid_not_participated/challan_pdf/sodapdf-converted_KQv0PA5.pdf
    // https://qcportal.mpcz.in/tkc/bid_not_participated_docs
    // https://qcportal.mpcz.in/media/tkc_bid_not_participated/
  }

  onReasonSelect(s: any) {
    console.log(s, "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
  }

  onReasonChange(ob: MatRadioChange) {
    let mrButton: MatRadioButton = ob.source;
    console.log(mrButton, "mrButton..............................");
    var isStcAccepted: boolean;

    if (mrButton.value == "true") {
      isStcAccepted = false;
      this.showRemark = true;
      this.isStcAccepted = false;
    } else if (mrButton.value == "false") {
      isStcAccepted = true;
      this.showRemark = false;
      this.isStcAccepted = true;
    }
    console.log(isStcAccepted, "isStcAccepted....isStcAccepted");


    if (isStcAccepted == false) {
      this.workCompletionFg.controls['consumerApplicationNumber'].setValidators(Validators.required)
      this.workCompletionFg.controls['cb'].setValidators(Validators.required)
      this.workCompletionFg.controls['dateOfDgmStc'].setValidators(Validators.required)
      this.workCompletionFg.controls['remark'].setValidators(Validators.required)
      this.workCompletionFg.controls['reason'].setValidators(Validators.required)

      this.workCompletionFg.controls['consumerApplicationNumber'].updateValueAndValidity()
      this.workCompletionFg.controls['cb'].updateValueAndValidity()
      this.workCompletionFg.controls['dateOfDgmStc'].updateValueAndValidity()
      this.workCompletionFg.controls['remark'].updateValueAndValidity()
      this.workCompletionFg.controls['reason'].updateValueAndValidity()

      // this.workCompletionFg.get('consumerApplicationNumber').setValidators(Validators.compose([Validators.required]));
      // this.workCompletionFg.get('cb').setValidators(Validators.compose([Validators.required]));
      // this.workCompletionFg.get('dateOfDgmStc').setValidators(Validators.compose([Validators.required]));
      // this.workCompletionFg.get('remark').setValidators(Validators.compose([Validators.required]));
      // this.workCompletionFg.updateValueAndValidity();

      console.log(this.workCompletionFg, "this.workCompletionFg....");

    } else if (isStcAccepted == true) {
      this.workCompletionFg.controls['consumerApplicationNumber'].setValidators(Validators.required)
      this.workCompletionFg.controls['cb'].setValidators(Validators.required)
      this.workCompletionFg.controls['dateOfDgmStc'].setValidators(Validators.required)
      this.workCompletionFg.controls['remark'].clearValidators()
      this.workCompletionFg.controls['reason'].clearValidators()

      this.workCompletionFg.controls['consumerApplicationNumber'].updateValueAndValidity()
      this.workCompletionFg.controls['cb'].updateValueAndValidity()
      this.workCompletionFg.controls['dateOfDgmStc'].updateValueAndValidity()
      this.workCompletionFg.controls['remark'].updateValueAndValidity()
      this.workCompletionFg.controls['reason'].updateValueAndValidity()

      // this.workCompletionFg.get('consumerApplicationNumber').setValidators(Validators.compose([Validators.required]));
      // this.workCompletionFg.get('cb').setValidators(Validators.compose([Validators.required]));
      // this.workCompletionFg.get('dateOfDgmStc').setValidators(Validators.compose([Validators.required]));
      // // this.workCompletionFg.get('remark').clearValidators();
      // this.workCompletionFg.controls['remark'].clearValidators()
      // this.workCompletionFg.updateValueAndValidity();

      console.log(this.workCompletionFg, "this.workCompletionFg....");

    }

  }

  nirikshanData(e: any) {
    console.log(e, "nirikshanData.....");

  }

  ngOnDestroy() {

  }

  onClose() {
    this.dialogRef.close();
  }

  selectPtrAndAnyOther() {
    this.workCompletionFg.controls['dateOfDgmStc'].clearValidators();
    this.workCompletionFg.controls['cb'].clearValidators();
    this.workCompletionFg.controls['dateOfDgmStc'].updateValueAndValidity();
    this.workCompletionFg.controls['cb'].updateValueAndValidity();
    // this.workCompletionFg.controls.cb.setValue(true);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { crudType: "selecct application behalf", modalTitle: 'selecct application behalf', consumerApplicationId: this.consumerApplicationDetail.consumerApplicationId };
    const dialogRef = this.dialog.open(UserSelectDtrPtrAndOtherComponent, dialogConfig);



  }

  getDtrAllList() {
    console.log(this.consumerApplicationDetail.consumerApplicationId, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    this.consumerApplicationService.GetDtrSubmitList(this.consumerApplicationDetail.consumerApplicationId).subscribe((data: any) => {
      console.log(data, "llllllllllllllllllllllllllllllllllllllllllllllllllljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
      if (data.code == "200") {
        this.drtListArray = data?.list[0];
        console.log(this.drtListArray, "this.drtListArray****************************************************");
      }



    })
  }

  getAllHtList() {
    this.consumerApplicationService.GetHt33KvSubmitList(this.consumerApplicationDetail.consumerApplicationId).subscribe((data: any) => {
      console.log(data, "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd111@@@@@@@@@@");

      if (data.code == "200") {
        this.htListArray = data?.list[0];
        console.log(this.htListArray, "this.htListArray************************************");
      }
    })
  }

  getAllItList() {
    this.consumerApplicationService.GetItSubmitList(this.consumerApplicationDetail.consumerApplicationId).subscribe((data: any) => {
      console.log(data, "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd111@@@@@@@@@@");

      if (data.code == "200") {
        this.itListArray = data?.list[0];

        console.log(this.itListArray, "this.itListArray*******************************************");
      }



    })
  }

  getAllIt11KvList() {
    this.consumerApplicationService.GetIt11KvSubmitList(this.consumerApplicationDetail.consumerApplicationId).subscribe((data: any) => {
      console.log(data, "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd111@@@@@@@@@@");

      if (data.code == "200") {
        this.it11KvListArray = data?.list[0];

        console.log(this.it11KvListArray, "this.it11KvListArray*************************************");
      }



    })
  }

  getAllPtrList() {
    this.consumerApplicationService.GetPtrSubmitList(this.consumerApplicationDetail.consumerApplicationId).subscribe((data: any) => {
      console.log(data, "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd111@@@@@@@@@@");

      if (data.code == "200") {
        this.ptrListArray = data?.list[0];
        console.log(this.ptrListArray, "this.ptrListArray***********************************************");

      }


    })
  }

  fun() {
    this.getDtrAllList();
    this.getAllHtList();
    this.getAllItList();
    this.getAllIt11KvList();
    this.getAllPtrList();
  }

  checkboxSelectionValidation(e: any) {
    console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee,,,,,,,,,,,,,,,,,,,,,,,,,,,");
    this.checkBoxValuecheck = e;

  }

  onSubmit() {






    if (this.isStcAccepted == true) {
      this.workCompletionFg.controls['dateOfDgmStc'].setValidators(Validators.required);
      this.workCompletionFg.controls['cb'].setValidators(Validators.required);
      this.workCompletionFg.controls['dateOfDgmStc'].updateValueAndValidity();
      this.workCompletionFg.controls['cb'].updateValueAndValidity();
    }
    if (this.isStcAccepted == false) {
      this.workCompletionFg.controls['cb'].clearValidators();
      this.workCompletionFg.controls['cb'].updateValueAndValidity();
    }
    if (this.workCompletionFg.invalid) {
      console.log(this.workCompletionFg, "iiinnvvvalliiiddd  ccooonnnnddiitttiioooonnnn///////////////////////");

      this.notificationService.error('inValid Form');
      return
    }




    var event = new Date(this.workCompletionFg.controls.dateOfDgmStc.value);

    let date = JSON.stringify(event)
    date = date.slice(1, 11)
    console.log(date, 'dateeeeeeeeeeeeeeeeeee')
    this.STWCDMODEL.dateOfDgmStc = date;

    // this.workCompletionFg.get('consumerApplicationNumber').setValidators(Validators.compose([Validators.required]));
    // this.workCompletionFg.get('cb').setValidators(Validators.compose([Validators.required]));
    // this.workCompletionFg.get('dateOfDgmStc').setValidators(Validators.compose([Validators.required]));
    // this.workCompletionFg.get('remark').setValidators(Validators.compose([Validators.required]));

    this.newPayLoad.consumerAppNo = this.consumerApplicationDetail?.consumerApplicationNo;
    this.newPayLoad.remark = this.workCompletionFg.value.remark

    console.log(this.workCompletionFg.value.reason, "arrraaaayyyyy.....................");
    let arr = [];
    for (let i = 0; i < this.workCompletionFg.value.reason.length; i++) {
      arr.push({ "reason": this.workCompletionFg.value.reason[i] })
    }
    console.log(arr, "arrrrrr");
    this.newPayLoad.reasons = arr

    this.newPayLoad.stcId = this.LoginUserDetails.userId
    this.newPayLoad.stcName = this.LoginUserDetails.userName;

    console.log(this.newPayLoad, " this.newPayLoad.........");


    this.workCompletionFg.controls.consumerApplicationNumber.setValue(this.consumerApplicationDetail?.consumerApplicationNo);
    console.log(this.STWCDMODEL.dateOfDgmStc);

    if (this.workCompletionFg.invalid) {
      this.notificationService.error('please select date and click check box');
      this.goFormGo = false;
      return;
    }

    if (this.disableSelectOneButton == true) {
      this.fun();
      if (this.drtListArray == null && this.htListArray == null && this.itListArray == null && this.it11KvListArray == null && this.ptrListArray == null) {
        this.notificationService.error("! please go through Select One button and proceed next process first");
        return
      } else {
        this.getOtp();
      }

    } else {
      this.getOtp();
    }
    console.log(this.STWCDMODEL, "lo bhai mai chal gaya");

  }

  againresendOtp() {
    this.otpVerificationForm.reset();
    this.getOtp();
  }

  getOtp() {
    let mob = '7067493216'
    this.sendOtP.source = "Dsp";
    this.sendOtP.mobileNo = this.userMobileNo;
    // this.sendOtP.mobileNo = mob;
    //this.verifyOtp.mobileNo = "7067493216";
    //const spinnerRef = this.spinnerService.start();
    this.consumerApplicationService.forGetOtpSendOnNumber(this.sendOtP).subscribe((response: any) => {
      console.log(response, "datarrrrrrrrrrrrrrrrrr");

      if (response['code'] === '200') {
        this.goFormGo = true;
        this.invalidUser = false;
        this.enabledOTP = true;

        this.notificationService.success('OTP has been sent to your mobile');
      } else if (response['code'] === '100') {
        this.invalidUser = true;
        this.enabledOTP = false;
        this.notificationService.warn(response['message']);
      } else {
        this.notificationService.warn(response['message']);
        this.enabledOTP = false;
      }
    })
    console.log("lo bhai mai bhi chal gaya");

  }

  //this.userUnlockForm.controls["otp"].markAsUntouched();
  OtpVerifySubmit() {
    let mob = '7067493216'
    this.verifyOtp.source = "Dsp";
    this.verifyOtp.mobileNo = this.userMobileNo;
    // this.verifyOtp.mobileNo = mob;
    //this.verifyOtp.mobileNo = "7067493216";
    this.verifyOtp.otp = this.otpVerificationForm.value.otp;
    // const spinnerRef = this.spinnerService.start();
    console.log(this.verifyOtp, "zzzzzzzzzzzzzzzzzzzzzzzz");


    this.consumerApplicationService.forVerifyOtp(this.verifyOtp).subscribe((response: any) => {
      console.log(response, "response????????????????????????");
      if (response['code'] === '200') {
        // this.openForm = true;
        const spinnerRef = this.spinnerService.start();
        console.log(this.STWCDMODEL, "this.STWCDMODEL...........................");

        if (this.isStcAccepted == true) {
          this.consumerApplicationService.saveWorkCompletionDateByDGTSTC(this.STWCDMODEL).pipe(takeUntil(this.unsubscribe$), finalize(() => this.spinnerService.stop(spinnerRef))).subscribe(
            data => {
              console.log('aaa bbbb  ccccc dddd eeeee', data);
              console.log(data);
              if (data['code'] == "200") {

                this.notificationService.success(data['message']);
                this.onClose();
              } else {
                alert(data['message']);
              }
            });
        } else if (this.isStcAccepted == false) {

          this.consumerApplicationService.stcRemarkSubmit(this.newPayLoad).subscribe((resp: any) => {
            console.log(resp, "rrrrreeeeeessssssspppppppppppp.............");

            if (resp.code == "200") {
              this.spinnerService.stop(spinnerRef)
              this.notificationService.success(resp['message']);
              this.onClose();
            } else {
              this.notificationService.warn("Something went wrong !");
              this.spinnerService.stop(spinnerRef)
              return
            }

          })

        }




        // this.notificationService.success('OTP verify Successfully');
      } else if (response['code'] === '100') {

        this.notificationService.warn(response['message']);
        return
      } else {
        this.notificationService.warn(response['message']);
        this.enabledOTP = true;
        return
      }
    })

  }

  checkBoxTureCompalsury() {
    console.log(this.workCompletionFg.controls.cb.value, 'checkBoxTureCompalsury');
    if (this.workCompletionFg.controls.cb.value == false) {
      this.notificationService.error('please select check box');
    } else {

    }
  }

  getAllMeterialsDetailOfVender(consumerApplicaitonNo: any) {
    this.consumerApplicationService.gettingAllTheDataOfVendorMaterial(consumerApplicaitonNo).subscribe((response: any) => {
      console.log(response, "response....................................................");
      if (response?.code == "200") {
        this.notificationService.success(response?.message);
        this.data = response?.list[0];

        ////////////////////////////////////////////////////////////////////////
        this.myForm = this.fb.group({
          rows: this.fb.array([]),
        });

        // create & patch rows
        this.data.forEach((d) => this.rows.push(this.buildRow(d)));

        // सभी rows शुरू में disable — लेकिन checkbox enable रखें
        this.rows.controls.forEach((ctrl) => this.disableRowKeepCheckbox(ctrl as FormGroup));

        ////////////////////////////////////////////////////////////////////////
      } else {
        this.notificationService.warn(response?.message);
        return
      }

    })
  }


  updateVenderMaterialList(payload: VenderMaterialUpdatePayload) {

    this.consumerApplicationService.updateTheVendorMaterialData(payload).subscribe((resp: any) => {
      if (resp?.code == "204") {
        this.notificationService.success(resp?.message)
      } else {
        this.notificationService.warn(resp?.message);
        return
      }
    })
  }




}

