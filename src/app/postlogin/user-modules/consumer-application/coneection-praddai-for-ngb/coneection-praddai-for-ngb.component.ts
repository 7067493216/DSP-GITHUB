import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgbPayloadModel } from '../../models/ngbPayloadModel';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-coneection-praddai-for-ngb',
  templateUrl: './coneection-praddai-for-ngb.component.html',
  styleUrls: ['./coneection-praddai-for-ngb.component.css']
})
export class ConeectionPraddaiForNgbComponent implements OnInit {

  connectionPradaaiForm: FormGroup
  consumerApplicationDetail: any;
  supplyVoltageString: string = '';
  supplyVolageName: Array<any> = [];
  panelOpenState = false;
  // ivrsForm: FormGroup
  IvrsData: any
  showTable: boolean = false
  checkboxCheck: boolean = false;
  // payload: ConnectionPradayModel = new ConnectionPradayModel();
  rdNoList: Array<any> = [
    // {"value":1 , "name":"Shamshad"},
    // {"value":2 , "name":"sourabh"},
    // {"value":3 , "name":"sabir"},
    // {"value":4 , "name":"moin"},
  ];

  GroupList: Array<any> = [
    // {"value":1 , "name":"Shamshad"},
    // {"value":2 , "name":"sourabh"},
    // {"value":3 , "name":"sabir"},
    // {"value":4 , "name":"moin"},
  ]

  feederList: Array<any> = [];
  dtrList: Array<any> = [];

  submitted: boolean = false;
  allNgbData: any;
  token: any;
  selectedGroup: any;
  checkboxBoolean: boolean = false;
  NgbPayload: NgbPayloadModel = new NgbPayloadModel()
  todayDate: any;
  minDate: Date;
  maxDate: Date;
  completeDate: any;
  successboolean: boolean = false
  dtrListGetNullBoolean: boolean = false
  inputFieldActiveBoolean: boolean = false;
  address1ErrorShowBoolean: boolean = false;

  // newDateByOandM: any;

  casttList: Array<any> = [
    { name: 'GENERAL' },
    { name: 'OBC' },
    { name: 'SC' },
    { name: 'ST' },
  ]



  constructor(
    private spinnerService: SpinnerService,
    private url: GenerateUrl,
    private http: HttpClient,
    private consumerApplicationService: ConsumerApplicationService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private _adapter: DateAdapter<any>,


    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConeectionPraddaiForNgbComponent>,
  ) {
    // this.token  = JSON.parse(sessionStorage.getItem('usertoken'))
    console.log(this.data.row, "ttttttttttttyyyyyyyyyyuuuuuuuuuuu");
    this.consumerApplicationDetail = this.data.row;
    // if (this.data.row.dateOfDgmOandM != null) {
    //   this.newDateByOandM = this.datePipe.transform(this.data.row.dateOfDgmOandM, 'dd-MM-yyyy');
    //   console.log(this.newDateByOandM);

    // }

    this.minDate = new Date();
    this.minDate.setMonth(this.minDate.getMonth() - 1);
    console.log(this.minDate, "this.minDate...");

    const today = new Date();
    console.log(today, "today");
    const currentDate = today.getDate();
    console.log(currentDate, "currentDate");
    const currentMonths = today.getMonth() + 1;
    console.log(currentMonths, "currentMonths");
    const currentYear = today.getFullYear();
    console.log(currentYear, "currentYear");
    const todayDate = (`${currentYear}-${currentMonths}-${currentDate}`);
    console.log(JSON.stringify(todayDate), "todayDate");
    this.maxDate = new Date();
    this.maxDate.setMonth(this.maxDate.getMonth())


  }



  onDateInput(event: MatDatepickerInputEvent<Date>) {
    // Handle the date input event if needed
    console.log(event, "event....................");

    console.log(this.connectionPradaaiForm.get('connectionDate').value, "........................", this.connectionPradaaiForm);


    const today = event.value
    let day: any = today.getDate();
    let month: any = today.getMonth() + 1;
    const year: any = today.getFullYear();

    if (day < 10) {
      day = '0' + day
    } else {
      day = day
    }

    if (month < 10) {
      month = '0' + month;
      // console.log(month,'INSIDE IF');
    } else {
      month = month;
      //  console.log(month,"INSIDE ELSE")
    }
    // this.completeDate =year+"-"+month+"-"+day;

    // this.completeDate = day + "-" + month + "-" + year;
    // this.completeDate = year + "-" + month + "-" + day;
    // console.log(this.completeDate, "this.completeDate");
  }

  // getToken(){
  //   this.http.post('http://172.16.17.110:8080/mppkvvcl/nextgenbilling/backend/api/v1/authentication/login',{
  //     "username": "ADMIN_CZ",
  //     "password": "ADMIN_CZ@12345"
  // }).subscribe((response:any)=>{
  //   console.log(response,"response.............");

  // })

  // http://172.16.17.110:8080/mppkvvcl/nextgenbilling/backend/api/v1/authentication/login
  // }

  buildForm() {
    this.connectionPradaaiForm = this.fb.group({
      feeder: ['', Validators.required],
      dtr: ['', Validators.required],
      customDtr: ['', Validators.required],
      grpNo: ['', Validators.required],
      rdNo: ['', Validators.required],
      poleNo: ['', Validators.required],
      poleDistance: ['', Validators.required],
      connectionDate: ["", Validators.required],
      address1: [this.allNgbData?.address1, Validators.required],
      address2: [this.allNgbData?.address2, Validators.required],
      address3: [this.allNgbData?.address3, Validators.required],
      castCategory: ["", Validators.required]
    })

    // if (this.data.row.dateOfDgmOandM != null) {
    //   let dateString = this.data.row.dateOfDgmOandM;
    //   let fullDate = new Date(dateString);
    //   console.log(fullDate.toString());

    //   this.connectionPradaaiForm.get('connectionDate').setValue(fullDate);

    //    let day: any = fullDate.getDate();
    // let month: any = fullDate.getMonth() + 1;
    // const year: any = fullDate.getFullYear();

    // if (day < 10) {
    //   day = '0' + day
    // } else {
    //   day = day
    // }

    // if (month < 10) {
    //   month = '0' + month;
    //   // console.log(month,'INSIDE IF');
    // } else {
    //   month = month;
    //   //  console.log(month,"INSIDE ELSE")
    // }
    // }

    // if (this.data.row.dateOfDgmOandM != null) {
    //   console.log(this.data.row.dateOfDgmOandM, "this.data.row.dateOfDgmOandM........");

    //   let dateString = this.data.row.dateOfDgmOandM;
    //   let fullDate = new Date(dateString);
    //   console.log(fullDate.toString());
    //   const today = fullDate
    //   let day: any = today.getDate();
    //   let month: any = today.getMonth() + 1;
    //   const year: any = today.getFullYear();

    //   if (day < 10) {
    //     day = '0' + day
    //   } else {
    //     day = day
    //   }

    //   if (month < 10) {
    //     month = '0' + month;
    //     // console.log(month,'INSIDE IF');
    //   } else {
    //     month = month;
    //     //  console.log(month,"INSIDE ELSE")
    //   }


    //   this.connectionPradaaiForm.get('connectionDate').setValue(today)
    //   console.log(this.connectionPradaaiForm, "this.connectionPradaaiForm");
    //   //this.connectionPradaaiForm.get('connectionDate').disable();

    //   return
    // }

  }


  ngOnInit(): void { // customDtr

    this.buildForm();
    this.getNgbData();
    this.connectionPradaaiForm.controls['address1'].disable();
    this.connectionPradaaiForm.controls['address2'].disable();
    this.connectionPradaaiForm.controls['address3'].disable();


    const today = new Date();
    console.log(today, "today");
    const currentDate = today.getDate();
    console.log(currentDate, "currentDate");
    const currentMonths = today.getMonth() + 1;
    console.log(currentMonths, "currentMonths");
    const currentYear = today.getFullYear();
    console.log(currentYear, "currentYear");



    const todayDate = (`${currentYear}-${currentMonths}-${currentDate}`);
    console.log(JSON.stringify(todayDate), "todayDate");
    this.todayDate = todayDate;
    console.log(this.todayDate, "this.todayDate..........................................................");


  }

  onInputCount(e: any) {
    console.log(e.target.value, "ttttttttttttttttttttttttttttttttttttttttttttttttttuuuuuuuuuuuuuuuuuuuuuuuuuuuuuiiiiiiiiiiii");

  }



  getNgbData() {
    this.consumerApplicationService.getAllNgbData(this.consumerApplicationDetail.consumerApplicationNo).subscribe((resp: any) => {
      console.log(resp, "resp...........................................................");
      if (resp.code == "200") {
        this.allNgbData = resp.list[0];

        this.getFeederList(resp.list[0].iSamparkLocationCode);
        this.buildForm();
        let locationcodeTest: any;
        if (this.url.baseUrl == "https://rooftop-uat.mpcz.in:8888") {
          locationcodeTest = 2484402;
        } else if (this.url.baseUrl == "https://dsp.mpcz.in:8888") {
          locationcodeTest = resp.list[0].locationCode;
        } else {
          locationcodeTest = 2484402;
        }

        this.consumerApplicationService.getGroupNoForConnectionPradaai(locationcodeTest).subscribe((data: any) => {
          console.log(data, "ddaaattttaaa..................");
          if (data) {
            this.GroupList = data;
            // this.connectionPradaaiForm.controls['dtr'].setValue(this.consumerDetail.address);
            ;
          }
        }, (error: any) => {
          console.log(error, "eeerrrpppprrrrrrrrooooooorrrr.......................");

        }
        )

        // locationCode
      }


    })
  }

  getDtrList(feederCode: any) {
    this.consumerApplicationService.getDtrList(feederCode).subscribe((data: any) => {
      console.log(data, "dtrlist.....................................");
      if (data.length > 0) {
        this.dtrList = data;
        this.dtrListGetNullBoolean = false;
        this.inputFieldActiveBoolean = false
        this.connectionPradaaiForm.controls['customDtr'].disable();
        this.connectionPradaaiForm.controls['dtr'].enable();
      } else {
        console.log("elseeelloopp.......");
        this.inputFieldActiveBoolean = true
        this.dtrList = []
        this.dtrListGetNullBoolean = true;
        this.connectionPradaaiForm.controls['customDtr'].enable();
        this.connectionPradaaiForm.controls['dtr'].disable();
      }
    })
  }

  getFeederList(locationCode: any) {
    this.consumerApplicationService.getfeederCodeFromIsampark(locationCode).subscribe((data: any) => {
      console.log(data, "data..................feederList......................");
      this.feederList = data;


    })
  }

  onFeederSelect(e: any) {
    console.log(e, "fffffffffffffffffffffffff..........................................");
    // feeder_code
    this.getDtrList(e.value.feeder_code);



  }

  onDtrSelect(e: any) {
    console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeee");

  }

  onGroupSelect(e: any) {
    console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    this.getRdNoList(e.value)
    this.selectedGroup = e.value
  }

  getRdNoList(grpNo: any) {
    this.consumerApplicationService.getRdNoListForConnectionPradaai(grpNo).subscribe((respo: any) => {
      console.log(respo, "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz...................");
      this.rdNoList = respo;
    })
  }

  onCheckboxSelection(c: any) {
    console.log(c, "cccccccccccccccccccc.................");
    this.checkboxBoolean = c.target.checked
    console.log(this.checkboxBoolean, "checkboxBoolean");
    if (c.target.checked == false) {
      this.connectionPradaaiForm.controls['address1'].disable();
      this.connectionPradaaiForm.controls['address2'].disable();
      this.connectionPradaaiForm.controls['address3'].disable();
    } else {
      this.connectionPradaaiForm.controls['address1'].enable();
      this.connectionPradaaiForm.controls['address2'].enable();
      this.connectionPradaaiForm.controls['address3'].enable();
    }

  }

  get connectionPradayFormControls() {
    return this.connectionPradaaiForm.controls;
  }


  get connectionPradaaiFormControls() {
    return this.connectionPradaaiForm.controls;
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.connectionPradaaiForm, "this.connectionPradaaiForm");


    if (this.checkboxBoolean == false) {
      this.connectionPradaaiForm.get('address2').clearValidators();
      this.connectionPradaaiForm.get('address3').clearValidators();
      this.connectionPradaaiForm.get('address2').updateValueAndValidity();
      this.connectionPradaaiForm.get('address2').updateValueAndValidity();

    } else {
      this.connectionPradaaiForm.get('address2').setValidators(Validators.required);
      this.connectionPradaaiForm.get('address3').setValidators(Validators.required);
      this.connectionPradaaiForm.get('address2').updateValueAndValidity();
      this.connectionPradaaiForm.get('address2').updateValueAndValidity();
    }

    if (this.consumerApplicationDetail?.natureOfWorkTypeId != 5) {
      this.connectionPradaaiForm.get('castCategory').clearValidators();
      this.connectionPradaaiForm.get('castCategory').updateValueAndValidity();
      this.NgbPayload.category = this.allNgbData.category
    } else {
      this.connectionPradaaiForm.get('castCategory').setValidators(Validators.required);
      this.connectionPradaaiForm.get('castCategory').updateValueAndValidity();
      this.NgbPayload.category = this.connectionPradaaiForm.value.castCategory;
    }

    console.log(this.connectionPradaaiForm, "this.connectionPradaaiForm.........................");

    if (this.connectionPradaaiForm.value.address1?.length >= 100) {
      this.notificationService.warn("Please Update Address1 upto maximum length of 100");
      this.address1ErrorShowBoolean = true;
      return
    } else {
      this.address1ErrorShowBoolean = false;
    }

    if (this.connectionPradaaiForm.invalid) {
      this.notificationService.error("Invalid Form !");
      return
    } else {
      console.log(this.connectionPradaaiForm, "this.connectionPradaaiForm..............................................");



      if (this.url.baseUrl == "https://rooftop-uat.mpcz.in:8888") {
        this.NgbPayload.dtrName = "5044020249|Ramnarayan Yadav wala";
      } else if (this.url.baseUrl == "https://dsp.mpcz.in:8888") {

        if (this.inputFieldActiveBoolean == true) {
          this.NgbPayload.dtrName = this.connectionPradaaiForm.value.customDtr
          // customDtr
        } else {
          this.NgbPayload.dtrName = this.connectionPradaaiForm.value.dtr.location + '|' + this.connectionPradaaiForm.value.dtr.location_name;
        }

      } else {
        // this.NgbPayload.dtrName = "5044020249|Ramnarayan Yadav wala";
      }



      // const newDate = this.datePipe.transform(this.completeDate, 'dd-MM-yyyy');
      console.log(this.connectionPradaaiForm, ".................V...............", this.consumerApplicationDetail);


      if (this.consumerApplicationDetail.natureOfWorkTypeId == 5) {
        console.log(this.connectionPradaaiForm, ".................V...............", this.connectionPradaaiForm.value.connectionDate);
        // this.connectionPradaaiForm.get('connectionDate').setValidators(Validators.required);
        // this.connectionPradaaiForm.get('connectionDate').updateValueAndValidity();
        // if (this.consumerApplicationDetail?.dateOfDgmOandM != null) {
        //   this.connectionPradaaiForm.get('connectionDate').setValue(this.data.row.dateOfDgmOandM)
        // }

        console.log(this.connectionPradaaiForm, ".................V...............");
        if (this.connectionPradaaiForm.invalid) {
          console.log(this.connectionPradaaiForm, ".................V...............");
          this.notificationService.warn("Invalid Form..... !");
          return
        }
        console.log(this.connectionPradaaiForm, ".................V...............");

        console.log(this.connectionPradaaiForm.value.connectionDate, "this.connectionPradaaiForm.value.connectionDate");

       // this.newDateByOandM = this.datePipe.transform(this.connectionPradaaiForm.value.connectionDate, 'dd-MM-yyyy');
      }
      // console.log(this.newDateByOandM, "this.newDateByOandM");
      console.log(this.connectionPradaaiForm, "this.connectionPradaaiForm...........................");

      this.NgbPayload.connectionDate = this.datePipe.transform(this.connectionPradaaiForm.value.connectionDate, 'dd-MM-yyyy');
      this.NgbPayload.consumerName = this.allNgbData.consumerName
      this.NgbPayload.consumerNameH = this.allNgbData.consumerNameH
      this.NgbPayload.relativeName = this.allNgbData.relativeName
      this.NgbPayload.relation = this.allNgbData.relation
      this.NgbPayload.isBpl = this.allNgbData.isBpl

      this.NgbPayload.isEmployee = this.allNgbData.isEmployee
      this.NgbPayload.address1 = this.connectionPradaaiForm.value.address1
      this.NgbPayload.address2 = this.connectionPradaaiForm.value.address2
      this.NgbPayload.address3 = this.connectionPradaaiForm.value.address3
      this.NgbPayload.primaryMobileNo = this.allNgbData.primaryMobileNo
      this.NgbPayload.aadhaarNo = this.allNgbData.aadhaarNo
      this.NgbPayload.tariffCategory = this.allNgbData.tariffCategory
      this.NgbPayload.connectionType = this.allNgbData.connectionType
      this.NgbPayload.meteringStatus = this.allNgbData.meteringStatus
      this.NgbPayload.premiseType = this.allNgbData.premiseType
      this.NgbPayload.sanctionedLoad = this.allNgbData.sanctionedLoad
      this.NgbPayload.sanctionedLoadUnit = this.allNgbData.sanctionedLoadUnit
      this.NgbPayload.contractDemand = this.allNgbData.contractDemand
      this.NgbPayload.contractDemandUnit = this.allNgbData.contractDemandUnit
      this.NgbPayload.isSeasonal = this.allNgbData.isSeasonal
      this.NgbPayload.purposeOfInstallationId = this.allNgbData.purposeOfInstallationId
      this.NgbPayload.purposeOfInstallation = this.allNgbData.purposeOfInstallation
      this.NgbPayload.tarrifCode = this.allNgbData.tarrifCode
      this.NgbPayload.subCategoryCode = this.allNgbData.subCategoryCode
      this.NgbPayload.phase = this.allNgbData.phase
      this.NgbPayload.tcStartDate = this.allNgbData.tcStartDate
      this.NgbPayload.tcEndDate = this.allNgbData.tcEndDate
      this.NgbPayload.isGovernment = this.allNgbData.isGovernment
      this.NgbPayload.plotSize = this.allNgbData.plotSize
      this.NgbPayload.plotSizeUnit = this.allNgbData.plotSizeUnit

      if (this.url.baseUrl == "https://rooftop-uat.mpcz.in:8888") {  // "https://rooftop-uat.mpcz.in:8888"
        this.NgbPayload.locationCode = 2484402
      } else if (this.url.baseUrl == "https://dsp.mpcz.in:8888") {
        this.NgbPayload.locationCode = this.allNgbData.locationCode
      } else {
        this.NgbPayload.locationCode = 2484402
      }

      this.NgbPayload.isXray = this.allNgbData.isXray
      this.NgbPayload.isWeldingTransformerSurcharge = this.allNgbData.isWeldingTransformerSurcharge
      this.NgbPayload.isCapacitorSurcharge = this.allNgbData.isCapacitorSurcharge
      this.NgbPayload.isDemandside = this.allNgbData.isDemandside
      this.NgbPayload.isiMotorType = this.allNgbData.isiMotorType
      this.NgbPayload.isBeneficiary = this.allNgbData.isBeneficiary
      //  this.NgbPayload.dtrName= this.connectionPradaaiForm.value.dtr
      this.NgbPayload.poleLatitude = this.allNgbData.poleLatitude
      this.NgbPayload.poleLongitude = this.allNgbData.poleLongitude

      if (this.url.baseUrl == "https://rooftop-uat.mpcz.in:8888") {
        this.NgbPayload.feederName = "3040301020101|OLD PHATAK 11 KV FEEDER";
      } else if (this.url.baseUrl == "https://dsp.mpcz.in:8888") {
        this.NgbPayload.feederName = this.connectionPradaaiForm.value.feeder.feeder_code
          + '|' + this.connectionPradaaiForm.value.feeder.feeder_name;
      } else {
        this.NgbPayload.feederName = "3040301020101|OLD PHATAK 11 KV FEEDER";
      }


      this.NgbPayload.areaStatus = this.allNgbData.areaStatus

      if (this.url.baseUrl == "https://rooftop-uat.mpcz.in:8888") {
        this.NgbPayload.groupNo = "DTX22"
        this.NgbPayload.readingDiaryNo = 1;
      } else if (this.url.baseUrl == "https://dsp.mpcz.in:8888") {
        this.NgbPayload.groupNo = this.connectionPradaaiForm.value.grpNo
        this.NgbPayload.readingDiaryNo = JSON.parse(this.connectionPradaaiForm.value.rdNo)
      } else {
        this.NgbPayload.groupNo = "DTX22"
        this.NgbPayload.readingDiaryNo = 1;
      }


      this.NgbPayload.dateOfReg = this.allNgbData.dateOfReg
      this.NgbPayload.registrationFeeAmount = this.allNgbData.registrationFeeAmount
      this.NgbPayload.registrationFeeAmountMrNo = this.allNgbData.registrationFeeAmountMrNo
      this.NgbPayload.securityDepositAmount = this.allNgbData.securityDepositAmount
      this.NgbPayload.securityDepositAmountMrNo = this.allNgbData.securityDepositAmountMrNo
      this.NgbPayload.isAffiliatedConsumer = this.allNgbData.isAffiliatedConsumer
      this.NgbPayload.affiliatedConsumerNo = this.allNgbData.affiliatedConsumerNo
      this.NgbPayload.portalName = this.allNgbData.portalName
      //  this.NgbPayload.portalReferenceNo= this.allNgbData.portalReferenceNo
      this.NgbPayload.propertyName = this.allNgbData.propertyName
      this.NgbPayload.propertyValue = this.allNgbData.propertyValue
      //  this.NgbPayload.ngbToken= this.allNgbData.ngbToken
      //  this.NgbPayload.ngbStagingId= this.allNgbData.ngbStagingId
      //  this.NgbPayload.iSamparkLocationCode= this.allNgbData.iSamparkLocationCode
      this.NgbPayload.poleNo = this.connectionPradaaiForm.value.poleNo
      this.NgbPayload.poleDistance = this.connectionPradaaiForm.value.poleDistance
      this.NgbPayload.applicationNumber = this.consumerApplicationDetail.consumerApplicationNo

      console.log(this.NgbPayload, "this.NgbPayload.............................................", this.url.baseUrl);

      this.consumerApplicationService.SubmitToNgbPost(this.NgbPayload).subscribe((responsee: any) => {
        console.log(responsee, "responsee..........................................");
        if (responsee.code == "200") {
          this.notificationService.success("Submitted Successfully !");
          this.successboolean = true;
          this.onClose();
        } else if (responsee.code == "601") {
          this.notificationService.error("Please Update address1 and check your details");
          return
        }
        else {
          this.notificationService.warn(responsee.message);
          this.successboolean = false;
          return
        }

      })

    }



  }


}



