import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { NewApplicationService } from '../../services/new-application.service';
import { AsyncValidatorService } from 'src/app/shared-services/async-validator.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { onlycharPattern } from 'src/app/utils/app-validators';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-consumer-update-for-any-nwt',
  templateUrl: './consumer-update-for-any-nwt.component.html',
  styleUrls: ['./consumer-update-for-any-nwt.component.css']
})
export class ConsumerUpdateForAnyNwtComponent implements OnInit {




  mastersUrl: string = this.url.mastersUrl;
  consumerApplicationUrl: string = this.url.consumerApplicationUrl;
  consumerContextPath: string = this.url.consumerContextPath;
  dcUrl: String = this.url.dcUrl;
  consumerApplicationDetail: any;
  shortDescriptionOfWork: string;
  private isWorkAllocationAddressChecked: boolean = false;
  gstchekbox: boolean = false;
  consumerDetail: any;
  samagraCheckboxchoose: boolean = false;
  gstFileExample: boolean = false

  @ViewChild('khasraDoc') khasraDocElement: ElementRef;
  @ViewChild('khatoniDoc') khatoniDocElement: ElementRef;
  @ViewChild('administrativeDoc') administrativeDocElement: ElementRef;
  @ViewChild('gstDoc') gstDocElement: ElementRef;
  @ViewChild('rowDoc') rowDocElement: ElementRef;
  @ViewChild('registryDoc') registryDocElement: ElementRef;
  @ViewChild('approveMapDoc') approveMapDocElement: ElementRef;
  @ViewChild('loadShitDoc') loadShitDocElement: ElementRef;
  @ViewChild('nagarNigamPermissionDoc') nagarNigamPermissionDocElement: ElementRef;
  @ViewChild('energyBillDoc') energyBillDocElement: ElementRef;
  //energyBillDoc
  @ViewChild('dicOrGumastaDoc') dicOrGumastaDocElement: ElementRef;
  @ViewChild('shapathPatraDoc') shapathPatraDocElement: ElementRef;
  @ViewChild('testReportDoc') testReportDocElement: ElementRef;
  @ViewChild('t$cpPermissionDoc') t$cpPermissionDocElement: ElementRef;
  @ViewChild('individualOrGroupDoc') individualOrGroupDocElement: ElementRef;

  @ViewChild('reraPermissionDoc') reraPermissionDocElement: ElementRef;
  @ViewChild('drawingNotarizedDoc') drawingNotarizedDocElement: ElementRef;
  @ViewChild('colonyPrakoshthDoc') colonyPrakoshthDocElement: ElementRef;
  @ViewChild('colonyLicenceDoc') colonyLicenceDocElement: ElementRef;
  @ViewChild('loadSheetDoc') loadSheetDocElement: ElementRef;
  @ViewChild('nocDoc') nocDocElement: ElementRef;
  @ViewChild('allPaperNotarized03SetDoc') allPaperNotarized03SetDocElement: ElementRef;
  @ViewChild('committeeDoc') committeeDocElement: ElementRef;
  @ViewChild('diversionDoc') diversionDocElement: ElementRef;
  @ViewChild('nazulDoc') nazulDocElement: ElementRef;
  @ViewChild('mapDoc') mapDocElement: ElementRef;
  @ViewChild('khasraKhatoniDoc') khasraKhatoniDocElement: ElementRef;
  @ViewChild('samagraDoc') samagraDocElement: ElementRef;
  //samagraDoc
  @ViewChild('mapCivilEngineerDoc') mapCivilEngineerDocElement: ElementRef;
  @ViewChild('applicationConsentDoc') applicationConsentDocElement: ElementRef;
  @ViewChild('performa5ADoc') performa5ADocElement: ElementRef;
  @ViewChild('performa5BDoc') performa5BDocElement: ElementRef;
  @ViewChild('plotAreaDetailsWithOwnerDoc') plotAreaDetailsWithOwnerDocElement: ElementRef;


  administrativeDoc;
  rowDoc;
  registryDoc;
  approveMapDoc;
  loadShitDoc;
  nagarNigamPermissionDoc;
  energyBillDoc;
  dicOrGumastaDoc;
  shapathPatraDoc;
  testReportDoc;
  t$cpPermissionDoc;
  individualOrGroupDoc;

  reraPermissionDoc;
  drawingNotarizedDoc;
  colonyPrakoshthDoc;
  colonyLicenceDoc;
  loadSheetDoc;
  nocDoc;
  allPaperNotarized03SetDoc;
  committeeDoc;
  diversionDoc;
  nazulDoc;
  mapDoc;
  khasraKhatoniDoc;
  samagraDoc;
  mapCivilEngineerDoc;
  applicationConsentDoc;
  performa5ADoc;
  performa5BDoc;
  plotAreaDetailsWithOwnerDoc;
  khasraDoc;
  khatoniDoc;
  gstDoc;



  unsubscribe$: Subject<void> = new Subject();
  newApplicationCreationFg: FormGroup;
  rowId = this.data.consumerApplicationId;
  crudType = this.data.crudType;
  // crudType: CrudType;
  newApplicationData: {};
  IsEditMode: boolean = false;
  applicationTypeList: Array<any> = [];
  schemeTypeList: Array<any> = [];
  tariffCategoryList: Array<any> = [];
  supplyVoltageList: Array<any> = [];
  workTypeList: Array<any> = [];
  taskTypeList: Array<any> = [];
  contractorList: Array<any> = [];
  dcList: Array<any> = [];
  substationList: Array<any> = [];
  feederList: Array<any> = [];
  colonyLegalSelectTypeArray: Array<any> = [
    {
      colonyLegalSelectTypeId: 1,
      colonyLegalSelectTypeName: 'Multi'
    },
    {
      colonyLegalSelectTypeId: 2,
      colonyLegalSelectTypeName: ' Colony Individual House'
    }
  ];

  colonyEllegalSelectTypeArray: Array<any> = [
    {
      colonyEllegalSelectTypeId: 1,
      colonyEllegalSelectTypeName: 'Decleared'
    },
    {
      colonyEllegalSelectTypeId: 2,
      colonyEllegalSelectTypeName: 'Un-Decleared'
    }
  ];
  natureOfWorkTypeBoolean: boolean = false;
  selectConsumerTypeBoolean: boolean = false
  consumerTypeList: Array<any> = [

    {
      "value": "Private",
      "name": "Private Entity"

    },
    {
      "value": "Government",
      "name": "Govt Entity"
    },
    // {
    //   "value": "Telecom_Operator",
    //   "name": "Telecom Operator"
    // },
    //  {
    //         "value": "EV-HPCL",
    //         "name": "EV HPCL"
    //     },
    //     {
    //         "value": "EV-IOCL",
    //         "name": "EV IOCL"
    //     },
    //     {
    //         "value": "EV-ADANI",
    //         "name": "EV ADANI"
    //     },
    //     {
    //         "value": "EV-BPCL",
    //         "name": "EV BPCL"
    //     },
  ]


  // file ,mandatory code
  approveFileExampleexample: boolean = false;
  loadShitFileExampleexample: boolean = false;
  administrativeexample: boolean = false;
  TAndCPexmple: boolean = false;
  Reraexmple: boolean = false;
  Registoryexample: boolean = false;
  Nocexample: boolean = false;
  Groupexample: boolean = false;
  gstexample: boolean = false;
  khasraKhotaniexample = false;
  samagraExample: boolean = false;

  documentTypeList: Array<any> = [];
  isFormSubmit: boolean = false;
  contractorUserId: Array<any> = [];

  // charitra prajapati start 16-01-2023
  NatureOfworkTypeList: Array<any> = [];
  landAreaUnitList: Array<any> = [];
  landAreaUnitListOne: Array<any> = [];
  supplyVolagerList: Array<any> = [];

  districtList: Array<any> = [];
  distributionCenterList: Array<any> = [];
  distributionList: Array<any> = [];
  distributionDetail;
  loadRequestList: Array<any> = [];
  individualOrGroupList: Array<any> = [];

  registoryOrLeaseFileName: string = 'Select  Registory or Lease File...';
  registoryOrLeaseRequired: boolean = false;
  registoryOrLeaseUploaded: boolean = false;

  khasraFileName: string = 'Select Khasra File...';
  khasraRequired: boolean = false;
  khasraUploaded: boolean = false;

  khatoniFileName: string = 'Select Khatoni File...';
  khatoniRequired: boolean = false;
  khatoniUploaded: boolean = false;

  rowFileName: string = 'Select ROW File...';
  rowRequired: boolean = false;
  rowUploaded: boolean = false;


  administrativeFileName: string = 'Select Adminstrative File...';
  administrativeRequired: boolean = false;
  administrativeUploaded: boolean = false;


  gstFileName: string = 'Select GST File...';
  gstRequired: boolean = false;
  gstUploaded: boolean = false;


  registryFileName: string = 'Select Registry File...';
  registryRequired: boolean = false;
  registryUploaded: boolean = false;

  ///////////////////////////////////////////



  approveMapRequired: boolean = false;
  approveMapUploaded: boolean = false;
  approveMapFileName: string = 'Select ApproveMap File...';

  loadShitRequired: boolean = false;
  loadShitUploaded: boolean = false;
  loadShitFileName: string = 'Select Load Sheet File...';


  //////////////////////////////////////////

  nagarNigamPermissionFileName: string = 'Select Nagar Nigam Permission File...';
  nagarNigamPermissionRequired: boolean = false;
  nagarNigamPermissionUploaded: boolean = false;

  energyBillFileName: string = 'Select EnergyBill File...';
  energyBillFileRequired: boolean = false;
  energyBillUploaded: boolean = false;


  dicOrGumastaFileName: string = 'Select DIC/Gumasta File...';
  dicOrGumastaRequired: boolean = false;
  dicOrGumastaUploaded: boolean = false;

  shapathPatraFileName: string = 'Select Shapath Patra File...';
  shapathPatraRequired: boolean = false;
  shapathPatraUploaded: boolean = false;

  testReportFileName: string = 'Select Test Report File...';
  testReportRequired: boolean = false;
  testReportUploaded: boolean = false;

  t$cpPermissionFileName: string = 'Select T&CP Permission File...';
  t$cpPermissionRequired: boolean = false;
  t$cpPermissionUploaded: boolean = false;


  individualOrGroupFileName: string = 'Select Group Permission File...';
  individualOrGroupRequired: boolean = false;
  individualOrGroupUploaded: boolean = false;

  reraPermissionFileName: string = 'Select RERA Permission File...';
  reraPermissionRequired: boolean = false;
  reraPermissionUploaded: boolean = false;

  drawingNotarizedFileName: string = 'Select Drawing Notarized File...';
  drawingNotarizedRequired: boolean = false;
  drawingNotarizedUploaded: boolean = false;

  colonyPrakoshthFileName: string = 'Select Colony Prakoshth File...';
  colonyPrakoshthRequired: boolean = false;
  colonyPrakoshthUploaded: boolean = false;

  colonyLicenceFileName: string = 'Select Colony Licence File...';
  colonyLicenceRequired: boolean = false;
  colonyLicenceUploaded: boolean = false;

  loadSheetFileName: string = 'Select Load Sheet File...';
  loadSheetRequired: boolean = false;
  loadSheetUploaded: boolean = false;

  nocFileName: string = 'Select NOC File...';
  nocRequired: boolean = false;
  nocUploaded: boolean = false;




  allPaperNotarized03SetFileName: string = 'Select All Paper Notarized (03 Set) File...';
  allPaperNotarized03SetRequired: boolean = false;
  allPaperNotarized03SetUploaded: boolean = false;

  committeeFileName: string = 'Select Committee File...';
  committeeRequired: boolean = false;
  committeeUploaded: boolean = false;

  diversionFileName: string = 'Select Diversion File...';
  diversionRequired: boolean = false;
  diversionUploaded: boolean = false;

  nazulFileName: string = 'Select Nazul File...';
  nazulRequired: boolean = false;
  nazulUploaded: boolean = false;

  mapFileName: string = 'Select Map File...';
  mapRequired: boolean = false;
  mapUploaded: boolean = false;

  khasraKhatoniFileName: string = 'Select Khasra-Khatoni File...';
  khasraKhatoniRequired: boolean = false;
  khasraKhatoniUploaded: boolean = false;



  samagraFileName: string = 'Select Samagra File...';
  samagraRequired: boolean = false;
  samagraUploaded: boolean = false;

  mapCivilEngineerFileName: string = 'Select Map Civil Engineer File...';
  mapCivilEngineerRequired: boolean = false;
  mapCivilEngineerUploaded: boolean = false;

  applicationConsentFileName: string = 'Select Application Consent File...';
  applicationConsentRequired: boolean = false;
  applicationConsentUploaded: boolean = false;

  performa5AFileName: string = 'Select Performa-5 A File...';
  performa5ARequired: boolean = false;
  performa5AUploaded: boolean = false;

  performa5BFileName: string = 'Select Performa-5 B File...';
  performa5BRequired: boolean = false;
  performa5BUploaded: boolean = false;

  plotAreaDetailsWithOwnerFileName: string = 'Select Plot Area Details With Owner File...';
  plotAreaDetailsWithOwnerRequired: boolean = false;
  plotAreaDetailsWithOwnerUploaded: boolean = false;

  remarkList: any;

  voltageLevelList: Array<any> = [
    { "name": "LT", "value": "LT" },
    { "name": "HT", "value": "HT" }
  ]

  individualOrGroupListStatic: Array<any> = [
    {
      "individualOrGroupId": 1, "name": "Individual(Consumer)"
    },
    {
      "individualOrGroupId": 2, "name": "Group(Colonizer/Developer/Group of Consumer)"
    }
  ];

  lastCheckboxBoolean: boolean = false
   purposeList:Array<any>=[];

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private url: GenerateUrl,
    private newApplicationService: NewApplicationService,
    private asyncValidator: AsyncValidatorService,
    public dialogRef: MatDialogRef<ConsumerUpdateForAnyNwtComponent>,
    private http: HttpClient,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private jwtHelperService: JwtHelperService
  ) {
    console.log(this.data, "ffffffffffffffffffffffffffffffffffffffffffffggggggggggggggg");
    // if (this.data.crudType == 2) {
    this.consumerApplicationDetail = this.data.row;
    console.log(this.consumerApplicationDetail, "consumerApplicationDetail...............................................");

    this.newApplicationService.getJeRemarkList(this.consumerApplicationDetail.consumerApplicationNo).subscribe((respo: any) => {
      if (respo.code == "200") {
        this.remarkList = respo.list;
      } else {
        this.remarkList = [];
      }
    })
    // }

    this.getPurpose(this.consumerApplicationDetail?.avedakKaPrakar)

  }

    getPurpose(avedakKaPrakar:any){
        this.newApplicationService.getPurPoseOfAavedakKaPrakar().subscribe((resp:any)=>{
            console.log(resp,"resssss........................");
            if(resp?.code=="200"){
                
                 if(avedakKaPrakar== "Private"){
this.purposeList = resp?.list?.filter((x:any)=>x?.entityType==="Private Entity")
                }else if(avedakKaPrakar=="Government"){
this.purposeList = resp?.list?.filter((x:any)=>x?.entityType=== "Govt Entity")
                }
//                 else if(avedakKaPrakar == "Telecom_Operator"){
// this.purposeList = resp?.list?.filter((x:any)=>x?.entityType=== "Govt Entity" || x?.entityType==="OTHERS")
//                 }else if(avedakKaPrakar == "EV Charging Station"){
// this.purposeList = resp?.list?.filter((x:any)=>x?.entityType=== "Govt Entity" || x?.entityType==="OTHERS")
//                 }
                else{
// this.purposeList = resp?.list;
                }
            }else{
               this.purposeList = [] ;
            }
            
        })
    }


  onColonyLegalSelectType() {

  }

  // onColonyEllegalSelectType(e: any) {
  //   console.log(e.target.value, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

  //   if (e.target.value == 1) {
  //     this.newApplicationCreationFg.get('individualOrGroupId').disable();
  //     this.newApplicationCreationFg.controls["individualOrGroupId"].reset();

  //     this.newApplicationCreationFg.get('individualOrGroupId').clearValidators();
  //     this.newApplicationCreationFg.get('individualOrGroupId').updateValueAndValidity();
  //   }
  //   else if (e.target.value == 2) {
  //     this.newApplicationCreationFg.get('individualOrGroupId').enable();
  //     this.newApplicationCreationFg.controls["individualOrGroupId"].reset();

  //     this.newApplicationCreationFg.get('individualOrGroupId').setValidators(Validators.required);
  //     this.newApplicationCreationFg.get('individualOrGroupId').updateValueAndValidity();
  //   }

  // }

  rowUpload() {
    console.log('rowlUpload is call !!!');
    if (this.rowDocElement.nativeElement.files[0] != undefined) {
      if (this.rowDocElement.nativeElement.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
      }

      this.rowDoc = this.rowDocElement.nativeElement.files[0];
      this.rowUploaded = true;
      this.rowFileName = this.rowDoc.name;
    }
  }

  administrativeUpload(event: any) {
    console.log('administrativeUpload is call !!!');

    if (event.target.files[0]) {

      if (event.target.files[0].size > 2000000) {
        this.administrativeexample = true;
        this.notificationService.error("PDF file should be less then 2 MB")
        // event.target.value = null;
        this.administrativeRequired = true
      } else if (event.target.files[0].size <= 2000000) {
        this.administrativeexample = false;
        this.administrativeRequired = false
      }
      // if (event.target.file = null) {
      //   this.notificationService.error("PDF file should be less then 2 MB");
      // } else {
      this.administrativeDoc = event.target.files[0];
      this.administrativeUploaded = true;
      this.administrativeFileName = this.administrativeDoc.name;
      // this.administrativeexample = false;
      // }

      console.log(this.administrativeFileName)
    }
  }

  gstUpload(event: any) {
    console.log('gstUpload is call !!!');

    if (event.target.files[0]) {
      if (event.target.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
        // event.target.value = null;
        this.gstFileExample = true;
        this.gstRequired = true
      } else {
        this.gstRequired = false
        this.gstFileExample = false;
      }
      // if (event.target.file = null) {
      //   this.notificationService.error("PDF file should be less then 2 MB");
      //   this.gstFileExample = false;
      // }
      this.gstDoc = event.target.files[0];
      this.gstUploaded = true;
      this.gstFileName = this.gstDoc.name;
      // this.gstFileName = this.gstDoc.name;

    }
    console.log(this.gstFileName);
  }

  t$cpPermissionUpload(event: any) {
    console.log('t$cpPermissionUpload is call !!!', event);

    if (event.target.files[0]) {

      if (event.target.files[0].size > 2000000) {
        // event.target.value = null;
        this.TAndCPexmple = true;
        this.notificationService.error("PDF file should be less then 2 MB")
        this.t$cpPermissionRequired = true
      } else if (event.target.files[0].size <= 2000000) {
        this.TAndCPexmple = false;
        this.t$cpPermissionRequired = false
      }
      // if (event.target.file = null) {
      //   this.notificationService.error("PDF file should be less then 2 MB");
      // }
      this.t$cpPermissionDoc = event.target.files[0];
      this.t$cpPermissionUploaded = true;
      this.t$cpPermissionFileName = this.t$cpPermissionDoc.name;
      //  this.TAndCPexmple = false;

    }
  }

  individualOrGroupApply(event: any) {
    console.log(' individualOrGroupApply is call !!!', event);
    if (event.target.files[0]) {

      if (event.target.files[0].size > 2000000) {
        this.Groupexample = true;
        this.notificationService.error("PDF file should be less then 2 MB")
        // event.target.value = null;
        this.individualOrGroupRequired = true
      } else {
        this.individualOrGroupRequired = false
      }
      this.individualOrGroupDoc = event.target.files[0];
      this.individualOrGroupUploaded = true;
      this.individualOrGroupFileName = this.individualOrGroupDoc.name;
      // this.Groupexample = false;

    }
  }

  reraPermissionUpload(event: any) {
    console.log('reraPermissionUpload is call !!!');
    if (event.target.files[0]) {

      if (event.target.files[0].size > 2000000) {
        this.Reraexmple = true;
        this.notificationService.error("PDF file should be less then 2 MB")
        // event.target.value = null;
      } else if (event.target.files[0].size <= 2000000) {
        this.Reraexmple = false;
      }
      // if (event.target.file = null) {
      //   this.notificationService.error("PDF file should be less then 2 MB");
      // }
      this.reraPermissionDoc = event.target.files[0];
      this.reraPermissionUploaded = true;
      this.reraPermissionFileName = this.reraPermissionDoc.name;
      //  this.Reraexmple = false;
    }
  }

  image_check(name) {


    var upld = name.split('.').pop();
    if (upld == 'pdf') {
      this.newApplicationCreationFg.get('aadharNo').disable();
      this.newApplicationCreationFg.controls["aadharNo"].reset();
    } else {
      //   alert("Only PDF are allowed");
      this.notificationService.warn('Only PDF are allowed ');
      this.administrativeUploaded = false;
      this.newApplicationCreationFg.get('aadharNo').enable();
      this.newApplicationCreationFg.controls["aadharNo"].reset();

    }
  }

  image_check1(name) {

    var upld = name.split('.').pop();
    if (upld == 'pdf') {
      this.newApplicationCreationFg.get('schemeTypeId').disable();
      this.newApplicationCreationFg.controls["schemeTypeId"].reset();

    } else {
      // alert("Only PDF are allowed ");
      this.notificationService.warn('Only PDF are allowed ');

      this.administrativeUploaded = false;
      this.newApplicationCreationFg.get('schemeTypeId').enable();
      this.newApplicationCreationFg.controls["schemeTypeId"].reset();


    }
  }

  registryUpload(event: any) {
    console.log('registryUpload is call !!!');
    if (event.target.files[0]) {
      if (event.target.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
        //  event.target.value = null;
        this.Registoryexample = true
      } else if (event.target.files[0].size <= 2000000) {
        this.Registoryexample = false;
      }
      // if (event.target.file = null) {
      //   this.notificationService.error("PDF file should be less then 2 MB");
      // }
      this.registryDoc = event.target.files[0];
      this.registryUploaded = true;
      this.registryFileName = this.registryDoc.name;
      // this.image_check(this.registryFileName)
    }
  }

  approveMapUpload(event: any) {
    console.log(event, "eeeeeeeeeee........................");
    if (event.target.files[0]) {
      if (event.target.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
        // event.target.value = null;
        this.approveMapRequired = true
        this.approveFileExampleexample = true
      } else if (event.target.files[0].size <= 2000000) {
        this.approveFileExampleexample = false;
        this.approveMapRequired = false
      }
      // if (event.target.file == null) {
      //     this.notificationService.error("PDF file should be less then 2 MB");
      // }
      this.approveMapDoc = event.target.files[0];
      this.approveMapUploaded = true;
      this.approveMapFileName = this.approveMapDoc.name;
      // this.image_check(this.registryFileName)
    }
  }

  loadShitFileUpload(event: any) {
    console.log(event, "eeeeeeeeeee........................");
    if (event.target.files[0]) {
      if (event.target.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
        // event.target.value = null;
        this.loadShitRequired = true
        this.loadShitFileExampleexample = true
      } else if (event.target.files[0].size <= 2000000) {
        this.loadShitFileExampleexample = false;
        this.loadShitRequired = false
      }

      this.loadShitDoc = event.target.files[0];
      this.loadShitUploaded = true;
      this.loadShitFileName = this.loadShitDoc.name;

    }
  }

  nagarNigamPermissionUpload() {
    console.log('nagarNigamPermissionUpload is call !!!');
    if (this.nagarNigamPermissionDocElement.nativeElement.files[0] != undefined) {
      if (this.nagarNigamPermissionDocElement.nativeElement.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
      }
      this.nagarNigamPermissionDoc = this.nagarNigamPermissionDocElement.nativeElement.files[0];
      this.nagarNigamPermissionUploaded = true;
      this.nagarNigamPermissionFileName = this.nagarNigamPermissionDoc.name;
    }
  }

  energyBillUpload() {
    console.log('energyBillDoc is call !!!');
    if (this.energyBillDocElement.nativeElement.files[0] != undefined) {
      if (this.energyBillDocElement.nativeElement.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
      }
      this.energyBillDoc = this.energyBillDocElement.nativeElement.files[0];
      this.energyBillUploaded = true;
      this.energyBillFileName = this.energyBillDoc.name;
    }
  }

  dicOrGumastaUpload() {
    console.log('dicOrGumastaUpload is call !!!');
    if (this.dicOrGumastaDocElement.nativeElement.files[0] != undefined) {
      if (this.dicOrGumastaDocElement.nativeElement.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
      }
      this.dicOrGumastaDoc = this.dicOrGumastaDocElement.nativeElement.files[0];
      this.dicOrGumastaUploaded = true;
      this.dicOrGumastaFileName = this.dicOrGumastaDoc.name;
    }
  }

  shapathPatraUpload() {
    console.log('shapathPatralUpload is call !!!');
    if (this.shapathPatraDocElement.nativeElement.files[0] != undefined) {
      if (this.shapathPatraDocElement.nativeElement.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
      }
      this.shapathPatraDoc = this.shapathPatraDocElement.nativeElement.files[0];
      this.shapathPatraUploaded = true;
      this.shapathPatraFileName = this.shapathPatraDoc.name;
    }
  }

  testReportUpload() {
    console.log('testReportUpload is call !!!');
    if (this.testReportDocElement.nativeElement.files[0] != undefined) {
      if (this.testReportDocElement.nativeElement.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
      }
      this.testReportDoc = this.testReportDocElement.nativeElement.files[0];
      this.testReportUploaded = true;
      this.testReportFileName = this.testReportDoc.name;
    }
  }

  drawingNotarizedUpload() {
    console.log('drawingNotarizedUpload is call !!!');
    if (this.drawingNotarizedDocElement.nativeElement.files[0] != undefined) {
      if (this.drawingNotarizedDocElement.nativeElement.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
      }
      this.drawingNotarizedDoc = this.drawingNotarizedDocElement.nativeElement.files[0];
      this.drawingNotarizedUploaded = true;
      this.drawingNotarizedFileName = this.drawingNotarizedDoc.name;
    }
  }

  colonyPrakoshthUpload() {
    console.log('colonyPrakoshthUpload is call !!!');
    if (this.colonyPrakoshthDocElement.nativeElement.files[0] != undefined) {
      if (this.colonyPrakoshthDocElement.nativeElement.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
      }
      this.colonyPrakoshthDoc = this.colonyPrakoshthDocElement.nativeElement.files[0];
      this.colonyPrakoshthUploaded = true;
      this.colonyPrakoshthFileName = this.colonyPrakoshthDoc.name;
    }
  }

  colonyLicenceUpload() {
    console.log('colonyLicenceUpload is call !!!');
    if (this.colonyLicenceDocElement.nativeElement.files[0] != undefined) {
      if (this.colonyLicenceDocElement.nativeElement.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
      }
      this.colonyLicenceDoc = this.colonyLicenceDocElement.nativeElement.files[0];
      this.colonyLicenceUploaded = true;
      this.colonyLicenceFileName = this.colonyLicenceDoc.name;
    }
  }

  loadSheetUpload() {
    console.log('loadSheetUpload is call !!!');
    if (this.loadSheetDocElement.nativeElement.files[0] != undefined) {
      if (this.loadSheetDocElement.nativeElement.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
      }
      this.loadSheetDoc = this.loadSheetDocElement.nativeElement.files[0];
      this.loadSheetUploaded = true;
      this.loadSheetFileName = this.loadSheetDoc.name;
    }
  }

  nocUpload(event: any) {
    console.log('nocUpload is call !!!');
    if (event.target.files[0]) {
      if (event.target.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
        // event.target.value = null;
        this.Nocexample = true;
      } else if (event.target.files[0].size <= 2000000) {
        this.Nocexample = false;
      }
      // if (event.target.file = null) {
      //   this.notificationService.error("PDF file should be less then 2 MB");
      // }
      this.nocDoc = event.target.files[0];
      this.nocUploaded = true;
      this.nocFileName = this.nocDoc.name;


    }
  }

  allPaperNotarized03SetUpload() {
    console.log('allPaperNotarized03SetUpload is call !!!');
    if (this.allPaperNotarized03SetDocElement.nativeElement.files[0] != undefined) {
      if (this.allPaperNotarized03SetDocElement.nativeElement.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
      }
      this.allPaperNotarized03SetDoc = this.allPaperNotarized03SetDocElement.nativeElement.files[0];
      this.allPaperNotarized03SetUploaded = true;
      this.allPaperNotarized03SetFileName = this.allPaperNotarized03SetDoc.name;
    }
  }

  committeeUpload() {
    console.log('committeeUpload is call !!!');
    if (this.committeeDocElement.nativeElement.files[0] != undefined) {
      if (this.committeeDocElement.nativeElement.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
      }
      this.committeeDoc = this.committeeDocElement.nativeElement.files[0];
      this.committeeUploaded = true;
      this.committeeFileName = this.committeeDoc.name;
    }
  }

  diversionUpload() {
    console.log('diversionUpload is call !!!');
    if (this.diversionDocElement.nativeElement.files[0] != undefined) {
      if (this.diversionDocElement.nativeElement.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
      }
      this.diversionDoc = this.diversionDocElement.nativeElement.files[0];
      this.diversionUploaded = true;
      this.diversionFileName = this.diversionDoc.name;
    }
  }

  nazulUpload() {
    console.log('nazulUpload is call !!!');
    if (this.nazulDocElement.nativeElement.files[0] != undefined) {

      if (this.nazulDocElement.nativeElement.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
      }
      this.nazulDoc = this.nazulDocElement.nativeElement.files[0];
      this.nazulUploaded = true;
      this.nazulFileName = this.nazulDoc.name;
    }
  }

  mapUpload() {
    console.log('mapUpload is call !!!');
    if (this.mapDocElement.nativeElement.files[0] != undefined) {

      if (this.mapDocElement.nativeElement.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
      }
      this.mapDoc = this.mapDocElement.nativeElement.files[0];
      this.mapUploaded = true;
      this.mapFileName = this.mapDoc.name;
    }
  }

  khasraKhatoniUpload(event: any) {
    console.log('khasraKhatoniUpload is call !!!', this.khasraKhatoniDoc);
    if (event.target.files[0] != undefined) {
      if (event.target.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
        //  event.target.value = null;
        this.khasraKhotaniexample = true;
      }
      else if (event.target.files[0].size <= 2000000) {
        this.khasraKhotaniexample = false;
      }
      // if (event.target.file = null) {
      //   this.notificationService.error("PDF file should be less then 2 MB");
      //   //  this.khasraKhatoniRequired = true;        
      // }
      // else {
      this.khasraKhatoniDoc = event.target.files[0];
      console.log(this.khasraKhatoniDoc);
      console.log(this.khasraKhatoniDoc.name);
      this.khasraKhatoniUploaded = true;
      this.khasraKhatoniFileName = this.khasraKhatoniDoc.name;
      // }

      // this.image_check1(this.khasraKhatoniFileName)

    }
  }

  samagraDocUpload(event: any) {
    console.log('samagraFile is call !!!', this.samagraDoc);
    if (event.target.files[0]) {
      if (event.target.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
        //  event.target.value = null;
        this.samagraExample = true;
      }
      else if (event.target.files[0].size <= 2000000) {
        this.samagraExample = false;
      }
      // if (event.target.file = null) {
      //   this.notificationService.error("PDF file should be less then 2 MB");
      //   //  this.khasraKhatoniRequired = true;        
      // }
      // else {
      this.samagraDoc = event.target.files[0];
      console.log(this.samagraDoc);
      console.log(this.samagraDoc.name);
      this.samagraUploaded = true;
      this.samagraFileName = this.samagraDoc.name;
      // }
    }
  }

  mapCivilEngineerUpload() {
    console.log('mapCivilEngineerUpload is call !!!');
    if (this.mapCivilEngineerDocElement.nativeElement.files[0] != undefined) {
      this.mapCivilEngineerDoc = this.mapCivilEngineerDocElement.nativeElement.files[0];
      this.mapCivilEngineerUploaded = true;
      this.mapCivilEngineerFileName = this.mapCivilEngineerDoc.name;
    }
  }

  applicationConsentUpload() {
    console.log('applicationConsentUpload is call !!!');
    if (this.applicationConsentDocElement.nativeElement.files[0] != undefined) {
      this.applicationConsentDoc = this.applicationConsentDocElement.nativeElement.files[0];
      this.applicationConsentUploaded = true;
      this.applicationConsentFileName = this.applicationConsentDoc.name;
    }
  }

  performa5AUpload() {
    console.log('performa5AUpload is call !!!');
    if (this.performa5ADocElement.nativeElement.files[0] != undefined) {


      this.performa5ADoc = this.performa5ADocElement.nativeElement.files[0];
      this.performa5AUploaded = true;
      this.performa5AFileName = this.performa5ADoc.name;
    }
  }

  performa5BUpload() {
    console.log('performa5BUpload is call !!!');
    if (this.performa5BDocElement.nativeElement.files[0] != undefined) {
      this.performa5BDoc = this.performa5BDocElement.nativeElement.files[0];
      this.performa5BUploaded = true;
      this.performa5BFileName = this.performa5BDoc.name;
    }
  }

  plotAreaDetailsWithOwnerUpload() {
    console.log('plotAreaDetailsWithOwnerUpload is call !!!');
    if (this.plotAreaDetailsWithOwnerDocElement.nativeElement.files[0] != undefined) {
      this.plotAreaDetailsWithOwnerDoc = this.plotAreaDetailsWithOwnerDocElement.nativeElement.files[0];
      this.plotAreaDetailsWithOwnerUploaded = true;
      this.plotAreaDetailsWithOwnerFileName = this.plotAreaDetailsWithOwnerDoc.name;
    }
  }

  khasraUpload() {
    console.log('khasraUpload is call !!!');
    if (this.khasraDocElement.nativeElement.files[0] != undefined) {
      if (this.khasraDocElement.nativeElement.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
      }
      this.khasraDoc = this.khasraDocElement.nativeElement.files[0];
      this.khasraUploaded = true;
      this.khasraFileName = this.khasraDoc.name;
    }
  }

  khatoniUpload() {
    console.log('khatoniDoc1 is call !!!');
    if (this.khatoniDocElement.nativeElement.files[0] != undefined) {
      if (this.khatoniDocElement.nativeElement.files[0].size > 2000000) {
        this.notificationService.error("PDF file should be less then 2 MB")
      }
      this.khatoniDoc = this.khatoniDocElement.nativeElement.files[0];
      this.khatoniUploaded = true;
      this.khatoniFileName = this.khatoniDoc.name;
    }
  }

  get newApplicationFormControls() {

    return this.newApplicationCreationFg.controls;
  }

  onChangeSelectedConsumerType(e: any) {
    // *786*
    this.getPurpose(e);
    console.log(e, "tttttttttyyyyyyyyyyyyypppppeeeeeeeeeeccconsumer>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    this.selectConsumerTypeBoolean = true;

  }

  ngOnInit() {

    this.newApplicationCreationFg = this.fb.group({
      consumerApplicationId: [''],
      // applicationTypeId: ['', Validators.compose([Validators.required])],
      schemeTypeId: ['', Validators.compose([Validators.required])],
      // tariffCategoryId: ['', Validators.compose([Validators.required])],
      supplyVoltageId: [null, Validators.compose([Validators.required])],

      // workTypeId: ['', Validators.compose([Validators.required])],
      // taskTypeId: ['', Validators.compose([Validators.required])],
      contractorUserId: [''],
      contractorAuthenticationId: [''],
      contractorUserClass: [''],
      contractorUserZone: [''],
      contractorCompanyName: [''],
      contractorMobile: [''],
      contractorEmail: [''],
      contractorAddress: [''],
      dcId: ['', Validators.compose([Validators.required])],
      // substationId: ['', Validators.compose([Validators.required])],
      // feederId: ['', Validators.compose([Validators.required])],
      consumerName: [this.consumerApplicationDetail?.consumerName],
      guardianName: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z a-zA-Z]*$'), onlycharPattern])],
      address: [this.consumerApplicationDetail?.address],
      area: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      // billNo: ['', Validators.compose([Validators.required])],
      // dtrCode: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      // poleNo: ['', Validators.compose([Validators.required])],
      dtrCode: ['', Validators.compose([Validators.pattern("^[0-9]*$")])],
      // poleNo: [''],

      shortDescriptionOfWork: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],

      // aadharNo: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9_-]{12,12}$")])],
      // panNo: ['', Validators.compose([Validators.required, Validators.maxLength(10)])]

      //charitra prajapati star t 16-01-2023
      natureOfWorkTypeId: [this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId, Validators.compose([Validators.required])],
      // supplyVoltage:['', Validators.compose([Validators.required])],
      // pinCode: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)])],
      // billNo: ['', Validators.compose([Validators.required])]
      districtId: ['', Validators.compose([Validators.required])],
      cb: ['', Validators.compose([Validators.requiredTrue])],  //cb =check box
      // ivrsNo:['', Validators.compose([Validators.required,Validators.maxLength(11)])],
      ivrsNo: ['', Validators.compose([Validators.required, Validators.maxLength(11), Validators.pattern("^[NH][0-9_-]{10,10}$")])],
      workLocationAddresscb: [''],
      workAllocationAddress: ['', Validators.compose([Validators.required])],
      gstCreditCheckBox: [''],
      // gstNumberProvide: ['', Validators.required],
      samagraCheckBox: [''],
      gstNumber: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"), Validators.minLength(15), Validators.maxLength(15)])], //  Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"),
      panNo: ['', Validators.compose([Validators.required, Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}$"), Validators.minLength(10), Validators.maxLength(10)])],//  Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}$"),
      loadRequested: ['', Validators.compose([Validators.required, Validators.pattern("^[1-9][0-9]*$")])],//load unit matlab numeric value
      loadRequestedId: ['', Validators.compose([Validators.required])],
      noOfPlot: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      khasra: ['', Validators.compose([Validators.required])],
      khatoni: ['', Validators.compose([Validators.required])],
      landAreaUnitId: ['', Validators.compose([Validators.required])],
      individualOrGroupId: ['', Validators.compose([Validators.required])],
      pdfFileAdministrative: ['', Validators.required],
      pdfFileTAndCP: ['', Validators.required],
      pdfFileRera: ['', Validators.required],
      pdfFileRegistory: ['', Validators.required],
      approveMapFile: ['', Validators.required],
      loadShitFile: ['', Validators.required],
      pdfFileNoc: ['', Validators.required],
      pdfGroup: ['', Validators.required],
      pdfFileGst: ['', Validators.required],
      samagraFile: [''],
      cbLigalAndIlegal: ['', Validators.compose([Validators.requiredTrue])],
      colonyIllegalSelectionType: ['', Validators.required],
      colonyLegalSelectionType: ['', Validators.required],
      samagraId: [''],
      avedakKaPrakar: ['', Validators.required],
      avedakRemark: ['', Validators.required],
      voltageLevel: ['', Validators.required],
      billNo:['', Validators.required]
    });

    if (this.data.row != null) {

      console.log("call on only update!!!!");
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', this.data.consumerApplicationId)
      this.loadFormToEdit();

      this.newApplicationService.getDistributionDatas(this.consumerApplicationDetail?.distributionCenter?.dcId).subscribe((distributionData: any) => {
        console.log('distribution', distributionData);
        if (distributionData['code'] == "200") {
          this.distributionDetail = distributionData['list'][0];
          console.log('data of distribution application :- ', distributionData['list'][0]);
        }
      })
    }

    // this.initializeForm();

    this.newApplicationService.getNatureOfWorkTypeList().pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      console.log(data['list'], "tttttttttttttttttttttttttttttttt");
      let arr = data['list'].filter(x => x.natureOfWorkTypeId !== 8);
      console.log(arr, "arrrrrrrr.....last log");


      if (this.consumerApplicationDetail?.nscApplicationNo != null) {
        this.NatureOfworkTypeList = arr.filter(y => (y.natureOfWorkTypeId == 2 || y.natureOfWorkTypeId == 5 || y.natureOfWorkTypeId == 7));
      } else {
        if (this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId == 2) {
          this.NatureOfworkTypeList = arr.filter(m => (m.natureOfWorkTypeId != 5 && m.natureOfWorkTypeId != 7))
        } else if (this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId == 5) {
          this.NatureOfworkTypeList = arr.filter(m => (m.natureOfWorkTypeId != 2 && m.natureOfWorkTypeId != 7))
        } else if (this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId == 7) {
          this.NatureOfworkTypeList = arr.filter(m => (m.natureOfWorkTypeId != 2 && m.natureOfWorkTypeId != 5))
        } else {
          this.NatureOfworkTypeList = arr.filter(m => (m.natureOfWorkTypeId != 2 && m.natureOfWorkTypeId != 5 && m.natureOfWorkTypeId != 7))
        }

      }

      console.log(this.NatureOfworkTypeList, "this.NatureOfworkTypeList......");

    });


    this.newApplicationService.getDistrictList().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.districtList = data['list'];
        console.log("this.districtList", this.districtList);
      });


    this.newApplicationService.getDcList().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.dcList = data['list'];
      });

    // this.getHttpResponce();

    console.log('newApplicationCreationFg :- ', this.newApplicationCreationFg);
  }

  // initializeForm() {

  //   console.log("Call on initializeForm !!!");

  //   if (this.data.crudType === CrudType.create) {
  //     // this.newApplicationCreationFg.reset();
  //   } else {
  //     console.log('this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId', this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId)
  //     this.onChangeSelectedNatureOfWorkType(this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId);
  //     this.loadFormToEdit();
  //   }
  // }

  loadFormToEdit() {


    console.log("Call on loadFormToEdit !!!", this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId);

    this.IsEditMode = true;
    this.newApplicationCreationFg.get('natureOfWorkTypeId').setValue(this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId);
    console.log(this.newApplicationCreationFg.value.natureOfWorkTypeId, "yyyyyyyyyyyeesss...........");

    this.onChangeSelectedNatureOfWorkType(this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId)
    if (this.consumerApplicationDetail.avedakRemark != null) {
      this.selectConsumerTypeBoolean = true;
      this.newApplicationCreationFg.controls['avedakRemark'].setValue(this.consumerApplicationDetail?.avedakRemark);

    }
    if (this.consumerApplicationDetail.dtr !== null) {

      this.supplyVolagerList.push(this.consumerApplicationDetail.dtr);
    }
    if (this.consumerApplicationDetail.ptr !== null) {
      this.supplyVolagerList.push(this.consumerApplicationDetail.ptr);
    }
    if (this.consumerApplicationDetail.lt !== null) {
      this.supplyVolagerList.push(this.consumerApplicationDetail.lt);
    }
    if (this.consumerApplicationDetail.ht11Kv !== null) {
      this.supplyVolagerList.push(this.consumerApplicationDetail.ht11Kv);
    }
    if (this.consumerApplicationDetail.ht33Kv !== null) {
      this.supplyVolagerList.push(this.consumerApplicationDetail.ht33Kv!);
    }
    if (this.consumerApplicationDetail.ht132Kv !== null) {
      this.supplyVolagerList.push(this.consumerApplicationDetail.ht132Kv);
    }

    console.log(this.consumerApplicationDetail, "this.consumerApplicationDetail", this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId);

    this.newApplicationCreationFg.controls['natureOfWorkTypeId'].setValue(this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId);
    this.newApplicationCreationFg.get('natureOfWorkTypeId').enable();

    this.newApplicationCreationFg.controls['schemeTypeId'].setValue(this.consumerApplicationDetail?.schemeType?.schemeTypeId);
    let avedakKaPrakarId = this.consumerTypeList.filter(x => x.value === this.consumerApplicationDetail?.avedakKaPrakar)  /////////// avedakKaPrakar
    console.log(avedakKaPrakarId, "hhhhahhahahahhahhahahhahhahhahahahahhaahhahahaahahahahaahhahahahahahahhahhhahhhhahhhhahhhhahhhahhhahahahahahahaahaahahahahhahahahaahhahahhahah");
    this.newApplicationCreationFg.controls['avedakKaPrakar'].setValue(avedakKaPrakarId[0]?.value);//

    this.newApplicationCreationFg.controls['supplyVoltageId'].setValue(this.supplyVolagerList);
    this.newApplicationCreationFg.controls['colonyIllegalSelectionType'].setValue(Number(this.consumerApplicationDetail?.colonyIllegalSelectionType));

    this.newApplicationCreationFg.controls['consumerName'].setValue(this.consumerApplicationDetail?.consumerName);
    this.newApplicationCreationFg.controls['guardianName'].setValue(this.consumerApplicationDetail?.guardianName);
    this.newApplicationCreationFg.controls['address'].setValue(this.consumerApplicationDetail?.address);
    this.newApplicationCreationFg.controls['area'].setValue(this.consumerApplicationDetail?.area);
    // this.newApplicationCreationFg.controls['pinCode'].setValue(this.consumerApplicationDetail.pincode);
    // if (this.consumerApplicationDetail?.districtId != null) {
    this.newApplicationCreationFg.controls['districtId'].setValue(this.consumerApplicationDetail?.district?.districtId);//
    //}


    this.selectConsumerTypeBoolean = true;
    this.newApplicationCreationFg.controls['avedakRemark'].setValue(this.consumerApplicationDetail?.avedakRemark);
    this.newApplicationCreationFg.controls['samagraId'].setValue(this.consumerApplicationDetail?.samagraId);

    this.onChangeSelectedDistrictType(this.consumerApplicationDetail?.district?.districtId);
    this.newApplicationCreationFg.controls['dcId'].setValue(this.consumerApplicationDetail?.distributionCenter?.dcId);

    this.newApplicationCreationFg.controls['shortDescriptionOfWork'].setValue(this.consumerApplicationDetail?.shortDescriptionOfWork);
    if (this.consumerApplicationDetail.ivrsNo != null) {
      this.newApplicationCreationFg.controls['ivrsNo'].setValue(this.consumerApplicationDetail?.ivrsNo);
    }
    if (this.consumerApplicationDetail.workLocationAddresscb == true) {
      this.newApplicationCreationFg.controls['workLocationAddresscb'].setValue(this.consumerApplicationDetail?.workLocationAddresscb);

    }
    console.log('this.consumerApplicationDetail.workAllocationAddress', this.consumerApplicationDetail?.workAllocationAddress)

    if (this.consumerApplicationDetail.workAllocationAddress != null) {
      this.newApplicationCreationFg.controls['workAllocationAddress'].setValue(this.consumerApplicationDetail?.workAllocationAddress);
    }
    if (this.consumerApplicationDetail.loadRequested != null) {
      this.newApplicationCreationFg.controls['loadRequested'].setValue(this.consumerApplicationDetail?.loadRequested);
    }

    if (this.consumerApplicationDetail.voltageLevel != null) {
      this.newApplicationCreationFg.controls['voltageLevel'].setValue(this.consumerApplicationDetail?.voltageLevel);
    }

    if (this.consumerApplicationDetail?.loadRequestedId?.loadRequestedId) {
      this.newApplicationCreationFg.controls['loadRequestedId'].setValue(this.consumerApplicationDetail?.loadRequestedId?.loadRequestedId);
    }
    if (this.consumerApplicationDetail.noOfPlot != null) {
      this.newApplicationCreationFg.controls['noOfPlot'].setValue(this.consumerApplicationDetail?.noOfPlot);
    }

    console.log('this.consumerApplicationDetail.khasra', this.consumerApplicationDetail?.khasra)
    if (this.consumerApplicationDetail.khasra != null) {
      this.newApplicationCreationFg.controls['khasra'].setValue(this.consumerApplicationDetail?.khasra);
    }
    if (this.consumerApplicationDetail.khatoni != null) {
      this.newApplicationCreationFg.controls['khatoni'].setValue(this.consumerApplicationDetail?.khatoni);
    }

    if (this.consumerApplicationDetail?.landAreaUnit?.landAreaUnitId) {
      console.log('this.consumerApplicationDetail.landAreaUnit.landAreaUnitId-------------', this.consumerApplicationDetail?.landAreaUnit?.landAreaUnitId)
      this.newApplicationCreationFg.controls['landAreaUnitId'].setValue(this.consumerApplicationDetail?.landAreaUnit?.landAreaUnitId);
    }

    if (this.consumerApplicationDetail?.individualOrGroup != null) {
      this.onChangeSelectedIndivdual(this.consumerApplicationDetail.individualOrGroup.individualOrGroupId);
      this.newApplicationCreationFg.controls['individualOrGroupId'].setValue(this.consumerApplicationDetail?.individualOrGroup?.individualOrGroupId);
    }
    if (this.consumerApplicationDetail.gstNumber != null) {
      this.checkBoxCredit("YES");
      this.newApplicationCreationFg.controls['gstCreditCheckBox'].setValue("YES");
      this.newApplicationCreationFg.controls['gstNumber'].setValue(this.consumerApplicationDetail.gstNumber);
      this.newApplicationCreationFg.controls['panNo'].setValue(this.consumerApplicationDetail.panNo);
    } else {
      this.checkBoxCredit("NO");
      this.newApplicationCreationFg.controls['gstCreditCheckBox'].setValue("NO");
      this.newApplicationCreationFg.controls['gstNumber'].setValue("");
      this.newApplicationCreationFg.controls['panNo'].setValue("");
    }

    if (this.consumerApplicationDetail?.natureOfWork?.natureOfWorkTypeId == 2 || this.consumerApplicationDetail?.natureOfWork?.natureOfWorkTypeId == 7) {
      // this.consumerTypeList.push(
      //   {
      //     "value": "EV Charging Station",
      //     "name": "EV Charging Station"
      //   }
      // )
    }

    console.log(this.newApplicationCreationFg, "rruuuuukkkkkkkk....ssttttooppp.............");


  }

  onCheckboxTick(e: any) {
    console.log(e, "eeee.......................................");
    this.lastCheckboxBoolean = e.target.checked;
  }

  onSubmit() {

    console.log(this.newApplicationCreationFg, "bbbfhdheydgeheydedgeydgwe********************");
    // console.log('please check  check box');
    this.isFormSubmit = true;

    if ((this.newApplicationCreationFg.invalid && this.newApplicationCreationFg.controls['cbLigalAndIlegal'].status == "INVALID")
      || (this.newApplicationCreationFg.valid && this.newApplicationCreationFg.controls['cbLigalAndIlegal'].value == false)
    ) {
      this.notificationService.error("! please select checkbox first");
      return
    }

    if ((this.newApplicationCreationFg.invalid && this.newApplicationCreationFg.controls['cb'].status == "INVALID")
      || (this.newApplicationCreationFg.valid && this.newApplicationCreationFg.controls['cb'].value == false)
    ) {
      this.notificationService.error("! please select checkbox first");
      return
    }

    if (this.newApplicationCreationFg.invalid && this.newApplicationCreationFg.controls['gstNumber'].status == "INVALID" && this.newApplicationCreationFg.controls['panNo'].status == "INVALID") {
      this.notificationService.error("Please enter correct GST NUMBER & correct PAN NUMBER");
      return
    }

    if (this.newApplicationCreationFg.invalid && this.newApplicationCreationFg.controls['gstNumber'].status == "INVALID" && this.newApplicationCreationFg.controls['panNo'].status == "VALID") {
      this.notificationService.error("Please enter correct GST NUMBER");
      return
    }

    if (this.newApplicationCreationFg.invalid && this.newApplicationCreationFg.controls['gstNumber'].status == "VALID" && this.newApplicationCreationFg.controls['panNo'].status == "INVALID") {
      this.notificationService.error("Please enter correct PAN NUMBER");
      return
    }


    if (this.lastCheckboxBoolean == false) {
      this.notificationService.error("please select checkbox first....")
    }

    if (this.newApplicationCreationFg.invalid) {
      this.notificationService.error("Invalid Form");
      return
    }


    if (this.newApplicationCreationFg.invalid || this.administrativeexample == true) {
      this.notificationService.error("PDF should be Mandatory,file must be less than 2MB");
      return;
    }

    if (this.newApplicationCreationFg.invalid || this.TAndCPexmple == true || this.Reraexmple == true) {
      this.notificationService.error("PDF should be Mandatory,file must be less than 2MB");
      return;
    }

    if (this.newApplicationCreationFg.invalid || this.Registoryexample == true || this.Nocexample == true) {
      this.notificationService.error("PDF should be Mandatory,file must be less than 2MB");
      return;
    }

    if (this.newApplicationCreationFg.invalid || this.khasraKhotaniexample == true) {
      this.notificationService.error("PDF should be Mandatory,file must be less than 2MB");
      return;
    }

    if (this.newApplicationCreationFg.value.natureOfWorkTypeId == 5 && this.samagraCheckboxchoose == true && this.newApplicationCreationFg.value.samagraFile == null) {
      this.notificationService.error("!Please choose Samagra file first");
      return;
    }

    if (this.samagraExample == true) {
      this.notificationService.error(" ! samagra file must be less than or equal to 2MB");
      return;
    }

    if (this.newApplicationCreationFg.value.natureOfWorkTypeId == 5 && this.samagraCheckboxchoose == true && this.newApplicationCreationFg.value.samagraId == null) {
      this.notificationService.error("! Please enter samagraId first");
      return;
    }

    if (this.newApplicationCreationFg.value.natureOfWorkTypeId == 6) {
      this.newApplicationCreationFg.value.avedakKaPrakar = this.consumerTypeList[1].value
    }
    if (this.newApplicationCreationFg.value.natureOfWorkTypeId == 5) {
      this.newApplicationCreationFg.value.avedakKaPrakar = this.consumerTypeList[0].value
    }

    console.log("this.newApplicationCreationFg.value", this.newApplicationCreationFg);
    console.log("Call on onSubmit !!!");
    this.isWorkAllocationAddressChecked = false;


    if (this.registryRequired && !this.registryUploaded) {
      this.notificationService.warn("File is required, File must be less than 2MB")
      return;
    }

    if (this.approveMapRequired && !this.approveMapUploaded) {

      this.notificationService.warn("Approve Map file is requires, and file must should be less than 2MB")
      return;
    }

    if (this.loadShitRequired && !this.loadShitUploaded) {

      this.notificationService.warn("Load Shit file is requires, and file must should be less than 2MB")
      return;
    }


    if (this.t$cpPermissionRequired && !this.t$cpPermissionUploaded) {
      this.notificationService.warn("File is required, File must be less than 2MB")
      return;
    }


    if (this.individualOrGroupRequired && !this.individualOrGroupUploaded) {
      this.notificationService.warn("File is required, File must be less than 2MB")
      return;
    }
    if (this.administrativeRequired && !this.administrativeUploaded) {
      this.notificationService.warn("File is required, File must be less than 2MB")
      return;
    }

    if (this.khasraRequired && !this.khasraUploaded) {
      this.notificationService.warn("File is required, File must be less than 2MB")
      return;
    }

    if (this.khatoniRequired && !this.khatoniUploaded) {
      this.notificationService.warn("File is required, File must be less than 2MB")
      return;
    }



    if (this.reraPermissionRequired && !this.reraPermissionUploaded) {
      this.notificationService.warn("File is required, File must be less than 2MB")
      return;
    }

    if (this.nocRequired && !this.nocUploaded) {
      this.notificationService.warn("File is required, File must be less than 2MB")
      return;
    }

    if (this.gstRequired && !this.gstUploaded) {
      this.notificationService.warn("File is required, File must be less than 2MB")
      return;
    }

    if (this.khasraKhatoniRequired && !this.khasraKhatoniUploaded) {
      this.notificationService.warn("! Please choose khasra khatoni file first")
      return;
    }

    if (this.newApplicationCreationFg.invalid && this.newApplicationCreationFg.controls['gstNumber'].status == "INVALID" && this.newApplicationCreationFg.controls['panNo'].status == "INVALID") {
      this.notificationService.error("Please enter correct GST NUMBER & correct PAN NUMBER");
      return
    }

    if (this.newApplicationCreationFg.invalid && this.newApplicationCreationFg.controls['gstNumber'].status == "INVALID" && this.newApplicationCreationFg.controls['panNo'].status == "VALID") {
      this.notificationService.error("Please enter correct GST NUMBER");
      return
    }

    if (this.newApplicationCreationFg.invalid && this.newApplicationCreationFg.controls['gstNumber'].status == "VALID" && this.newApplicationCreationFg.controls['panNo'].status == "INVALID") {
      this.notificationService.error("Please enter correct PAN NUMBER");
      return
    }

    console.log(this.newApplicationCreationFg.value, "this.newApplicationCreationFg.value..................................");


    var formData = new FormData();
    formData.append('applicationForm', JSON.stringify(this.newApplicationCreationFg.value));
    formData.append('docAdministrative', this.administrativeDoc)
    formData.append('docRegistry', this.registryDoc);
    formData.append('energyBillDoc', this.energyBillDoc);
    formData.append('docT$cpPermission', this.t$cpPermissionDoc);
    formData.append('docIndividualOrGroup', this.individualOrGroupDoc);
    formData.append('docReraPermission', this.reraPermissionDoc);
    formData.append('docNoc', this.nocDoc);
    formData.append('docKhasraKhatoni', this.khasraKhatoniDoc);
    formData.append('docSamagraFile', this.samagraDoc);
    formData.append('docGst', this.gstDoc);
    formData.append('docMap', this.approveMapDoc);
    formData.append('docLoadSheet', this.loadShitDoc)

    if (this.newApplicationCreationFg.valid) {
      console.log('update wala part')
      this.newApplicationService.updateConsumerApplicationDetailsAgain(this.data?.row?.consumerApplicationId, formData).pipe(takeUntil(this.unsubscribe$)).subscribe(
        data => {
          if (data['code'] == '204') {

            this.notificationService.success(data['message']);
            this.onClose();
            // location.reload();

          } else {
            this.notificationService.warn(data['message']);
            return
          }
        });


    }
  }

  onClose() {

    console.log("Call on onClose !!!");

    this.newApplicationCreationFg.reset();
    this.dialogRef.close();
  }

  getHttpResponce() {

    console.log("Call on getHttpResponce !!!");

    this.newApplicationService.getApplicationTypeList().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.applicationTypeList = data['list'];
      });

    this.newApplicationService.getTariffCategoryList().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.tariffCategoryList = data['list'];
      });

    this.newApplicationService.getSupplyVoltageList().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.supplyVoltageList = data['list'];
      });

    this.newApplicationService.getSchemeTypeList().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.schemeTypeList = data['list'];
        this.schemeTypeList = data['list'].filter(x => x.schemeTypeId != 4)
      });

    this.newApplicationService.getWorkypeList().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.workTypeList = data['list'];
      });

    this.newApplicationService.getTaskypeList().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.taskTypeList = data['list'];
      });

    this.newApplicationService.getDocumentTypeList().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.documentTypeList = data['list'];
      });


    this.newApplicationService.getloadRequested().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.loadRequestList = data['list'];
        console.log("this.loadRequestList", this.loadRequestList);

      });



    this.newApplicationService.getLandAreaUnit().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.landAreaUnitList = data['list'];
        console.log('land Area List', this.landAreaUnitList);
      });

    this.newApplicationService.getLandAreaUnitOne().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.landAreaUnitListOne = data['list'];
        console.log('land Area ListOne', this.landAreaUnitListOne);

      });

    this.newApplicationService.getIndividualOrGroup().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.individualOrGroupList = data['list'];
        console.log("this.individualOrGroupList", this.individualOrGroupList);
      });



  }





  ngOnDestroy() {

    console.log("Call on ngOnDestroy !!!");

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onChangeSelectedSchemeType(e: any) {

    console.log(e, 'onChangeSelectedSchemeType is call !!!');

    this.resetFileUploadData();

    console.log(this.newApplicationCreationFg, "this.newApplicationCreationFg.....");


  }

  onChangeSelectedSupplyVoltage(value) {

    console.log('onChangeSelectedSupplyVoltage is call !!!', value);

    this.resetFileUploadData();

    this.contractorList = null;

    if (value) {
      this.newApplicationService.getContractorList(value).pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.contractorList = data['list'];
          console.log('contractorList:- ', this.contractorList.length);

        });
    } else {
      this.contractorList = null;
    }

    this.newApplicationCreationFg.reset({
      // applicationTypeId: this.newApplicationCreationFg.get('applicationTypeId').value,


      natureOfWorkTypeId: this.newApplicationCreationFg.get('natureOfWorkTypeId').value,
      // tariffCategoryId: this.newApplicationCreationFg.get('tariffCategoryId').value,
      supplyVoltageId: this.newApplicationCreationFg.get('supplyVoltageId').value,
      // schemeTypeId: this.newApplicationCreationFg.get('schemeTypeId').value,
      consumerName: this.newApplicationCreationFg.get('consumerName').value,
      address: this.newApplicationCreationFg.get('address').value,
    });
  }


  onChangeSelectedApplicationType(applicationTypeId) {

    console.log('onChangeSelectedApplicationType is call !!!');

    if (applicationTypeId == 1 || applicationTypeId == 2) {

      this.resetFileUploadData();

      this.rowRequired = true;
      this.registryRequired = true;
      this.nagarNigamPermissionRequired = true;
      this.dicOrGumastaRequired = true;
      this.shapathPatraRequired = true;
      this.testReportRequired = true;

      // this.t$cpPermissionRequired = false;
      // this.reraPermissionRequired = false;
      // this.drawingNotarizedRequired = false;
      // this.colonyPrakoshthRequired = false;
      // this.colonyLicenceRequired = false;
      // this.loadSheetRequired = false;
      // this.nocRequired = false;
      // this.allPaperNotarized03SetRequired = false;
      // this.committeeRequired = false;
      // this.diversionRequired = false;
      // this.nazulRequired = false;
      // this.mapRequired = false;
      // this.khasraKhatoniRequired = false;
      // this.mapCivilEngineerRequired = false;
      // this.applicationConsentRequired = false;
      // this.performa5ARequired = false;
      // this.performa5BRequired = false;
      // this.plotAreaDetailsWithOwnerRequired = false;

    } else if (applicationTypeId == 3) {

      this.resetFileUploadData();

      this.rowRequired = true;
      this.registryRequired = true;
      this.nagarNigamPermissionRequired = true;
      this.shapathPatraRequired = true;
      this.t$cpPermissionRequired = true;
      this.individualOrGroupRequired = true;
      this.reraPermissionRequired = true;
      this.drawingNotarizedRequired = true;
      this.colonyPrakoshthRequired = true;
      this.colonyLicenceRequired = true;
      this.loadSheetRequired = true;
      this.nocRequired = true;
      this.allPaperNotarized03SetRequired = true;

      // this.dicOrGumastaRequired = false;
      // this.testReportRequired = false;
      // this.committeeRequired = false;
      // this.diversionRequired = false;
      // this.nazulRequired = false;
      // this.mapRequired = false;
      // this.khasraKhatoniRequired = false;
      // this.mapCivilEngineerRequired = false;
      // this.applicationConsentRequired = false;
      // this.performa5ARequired = false;
      // this.performa5BRequired = false;
      // this.plotAreaDetailsWithOwnerRequired = false;
    } else if (applicationTypeId == 4) {

      this.resetFileUploadData();

      this.rowRequired = true;
      this.shapathPatraRequired = true;
      this.loadSheetRequired = true;
      this.nocRequired = true;
      this.committeeRequired = true;
      this.diversionRequired = true;
      this.nazulRequired = true;
      this.mapRequired = true;
      this.khasraKhatoniRequired = true;
      this.mapCivilEngineerRequired = true;
      this.applicationConsentRequired = true;
      this.performa5ARequired = true;
      this.performa5BRequired = true;
      this.plotAreaDetailsWithOwnerRequired = true;

      // this.registryRequired = false;
      // this.nagarNigamPermissionRequired = false;
      // this.dicOrGumastaRequired = false;
      // this.testReportRequired = false;
      this.t$cpPermissionRequired = true;
      // this.reraPermissionRequired = false;
      // this.drawingNotarizedRequired = false;
      // this.colonyPrakoshthRequired = false;
      // this.colonyLicenceRequired = false;
      // this.allPaperNotarized03SetRequired = false;
    } else if (applicationTypeId == 5 || applicationTypeId == 6 || applicationTypeId == 8) {

      this.resetFileUploadData();

      this.registryRequired = true;
      this.nagarNigamPermissionRequired = true;
      this.nocRequired = true;

      // this.rowRequired = false;
      // this.dicOrGumastaRequired = false;
      // this.shapathPatraRequired = false;
      // this.testReportRequired = false;
      // this.t$cpPermissionRequired = false;
      // this.reraPermissionRequired = false;
      // this.drawingNotarizedRequired = false;
      // this.colonyPrakoshthRequired = false;
      // this.colonyLicenceRequired = false;
      // this.loadSheetRequired = false;
      // this.allPaperNotarized03SetRequired = false;
      // this.committeeRequired = false;
      // this.diversionRequired = false;
      // this.nazulRequired = false;
      // this.mapRequired = false;
      // this.khasraKhatoniRequired = false;
      // this.mapCivilEngineerRequired = false;
      // this.applicationConsentRequired = false;
      // this.performa5ARequired = false;
      // this.performa5BRequired = false;
      // this.plotAreaDetailsWithOwnerRequired = false;
    } else if (applicationTypeId == 7) {

      this.resetFileUploadData();
      this.energyBillFileRequired == true;
      //
    }

    this.newApplicationCreationFg.reset({
      applicationTypeId: this.newApplicationCreationFg.get('applicationTypeId').value,
      consumerName: this.newApplicationCreationFg.get('consumerName').value,
      address: this.newApplicationCreationFg.get('address').value,
    });
    console.log("applicationTypeId :- ", this.newApplicationCreationFg.get('applicationTypeId').value);
  }

  onChangeDc(value) {
    console.log('onChangeDc call !!! & value:-', value);
    this.substationList = null;
    this.feederList = null;
    if (value) {
      this.newApplicationService.getSubstationByDc(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.substationList = data['list'];
            // this.substationId = null;
          }
        );
    } else {
      this.substationList = null;
    }
  }

  onChangeSubstation(value) {

    console.log('onChangeSubstation call !!! & value:-', value);

    if (value) {
      this.newApplicationService.getFeederBySubstation(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            console.log('this.feederList call !!! & value:-', this.feederList);
            this.feederList = data['list'];
            // this.feederId = null;
          }
        );
    } else {
      this.feederList = null;
    }
  }

  onChangeContractor(contractorUserId) {
    for (let contractorData of this.contractorList) {
      if (contractorData.user_id == contractorUserId) {
        this.newApplicationCreationFg.controls['contractorAuthenticationId'].setValue(contractorData.authentication_id);
        this.newApplicationCreationFg.controls['contractorUserZone'].setValue(contractorData.user_zone);
        this.newApplicationCreationFg.controls['contractorUserClass'].setValue(contractorData.user_class);
        this.newApplicationCreationFg.controls['contractorCompanyName'].setValue(contractorData.company_name);
        this.newApplicationCreationFg.controls['contractorMobile'].setValue(contractorData.mobile);
        this.newApplicationCreationFg.controls['contractorEmail'].setValue(contractorData.email);
        this.newApplicationCreationFg.controls['contractorAddress'].setValue(contractorData.address);
        break;
      }
    }
  }


  resetFileUploadData() {
    this.rowDoc = undefined;
    this.rowUploaded = false;
    this.rowRequired = false;
    this.rowFileName = 'Select ROW File...';



    this.administrativeDoc = undefined;
    this.administrativeRequired = false;
    this.administrativeUploaded = false;
    this.administrativeFileName = 'Administrative section along with order Document';

    this.gstDoc = undefined;
    this.gstRequired = false;
    this.gstUploaded = false;
    this.gstFileName = 'Select GST File...';


    this.registryDoc = undefined;
    this.registryRequired = false;
    this.registryUploaded = false;
    this.registryFileName = 'Select Registry File...';
    //////////////////////////////////////
    this.approveMapDoc = undefined;
    this.approveMapRequired = false;
    this.approveMapUploaded = false;
    this.approveMapFileName = 'Select Approve Map File...';

    this.loadShitDoc = undefined;
    this.loadShitRequired = false;
    this.loadShitUploaded = false;
    this.loadShitFileName = 'Select Load Sheet File...';

    ///////////////////////////////////
    this.nagarNigamPermissionDoc = undefined;
    this.nagarNigamPermissionRequired = false;
    this.nagarNigamPermissionUploaded = false;
    this.nagarNigamPermissionFileName = 'Select Nagar Nigam Permission File...';

    this.energyBillDoc = undefined
    this.energyBillFileName = 'Select EnergyBill File...';
    this.energyBillFileRequired = false;
    this.energyBillUploaded = false;

    this.dicOrGumastaDoc = undefined;
    this.dicOrGumastaRequired = false;
    this.dicOrGumastaUploaded = false;
    this.dicOrGumastaFileName = 'Select DIC/Gumasta File...';

    this.shapathPatraDoc = undefined;
    this.shapathPatraRequired = false;
    this.shapathPatraUploaded = false;
    this.shapathPatraFileName = 'Select Shapath Patra File...';

    this.testReportDoc = undefined;
    this.testReportRequired = false;
    this.testReportUploaded = false;
    this.testReportFileName = 'Select Test Report File...';

    this.t$cpPermissionDoc = undefined;
    this.t$cpPermissionRequired = false;
    this.t$cpPermissionUploaded = false;
    this.t$cpPermissionFileName = 'Select T&CP Permission File...';


    this.individualOrGroupDoc = undefined;
    this.individualOrGroupRequired = false;
    this.individualOrGroupUploaded = false;
    this.individualOrGroupFileName = 'Select Group Permission File...';

    this.reraPermissionDoc = undefined;
    this.reraPermissionRequired = false;
    this.reraPermissionUploaded = false;
    this.reraPermissionFileName = 'Select Rera Permission File...';

    this.drawingNotarizedDoc = undefined;
    this.drawingNotarizedRequired = false;
    this.drawingNotarizedUploaded = false;
    this.drawingNotarizedFileName = 'Select Drawing Notarized File...';

    this.colonyPrakoshthDoc = undefined;
    this.colonyPrakoshthRequired = false;
    this.colonyPrakoshthUploaded = false;
    this.colonyPrakoshthFileName = 'Select Colony Prakoshth File...';

    this.colonyLicenceDoc = undefined;
    this.colonyLicenceRequired = false;
    this.colonyLicenceUploaded = false;
    this.colonyLicenceFileName = 'Select Colony Licence File...';

    this.loadSheetDoc = undefined;
    this.loadSheetRequired = false;
    this.loadSheetUploaded = false;
    this.loadSheetFileName = 'Select Load Sheet File...';

    this.nocDoc = undefined;
    this.nocRequired = false;
    this.nocUploaded = false;
    this.nocFileName = 'Select NOC File...';



    this.allPaperNotarized03SetDoc = undefined;
    this.allPaperNotarized03SetRequired = false;
    this.allPaperNotarized03SetUploaded = false;
    this.allPaperNotarized03SetFileName = 'Select All Paper Notarized (03 Set) File...';

    this.committeeDoc = undefined;
    this.committeeRequired = false;
    this.committeeUploaded = false;
    this.committeeFileName = 'Select Committee File...';

    this.diversionDoc = undefined;
    this.diversionRequired = false;
    this.diversionUploaded = false;
    this.diversionFileName = 'Select Diversion File...';

    this.nazulDoc = undefined;
    this.nazulRequired = false;
    this.nazulUploaded = false;
    this.nazulFileName = 'Select Nazul File...';

    this.mapDoc = undefined;
    this.mapRequired = false;
    this.mapUploaded = false;
    this.mapFileName = 'Select Map File...';

    this.khasraKhatoniDoc = undefined;
    this.khasraKhatoniRequired = false;
    this.khasraKhatoniUploaded = false;
    this.khasraKhatoniFileName = 'खसरा - खतौनी दस्तावेज...';

    this.samagraDoc = undefined;
    this.samagraRequired = false;
    this.samagraUploaded = false;
    this.samagraFileName = 'समग्र दस्तावेज...';

    this.mapCivilEngineerDoc = undefined;
    this.mapCivilEngineerRequired = false;
    this.mapCivilEngineerUploaded = false;
    this.mapCivilEngineerFileName = 'Select Map Civil Engineer File...';

    this.applicationConsentDoc = undefined;
    this.applicationConsentRequired = false;
    this.applicationConsentUploaded = false;
    this.applicationConsentFileName = 'Select Application Consent File...';

    this.performa5ADoc = undefined;
    this.performa5ARequired = false;
    this.performa5AUploaded = false;
    this.performa5AFileName = 'Select Performa-5 A File...';

    this.performa5BDoc = undefined;
    this.performa5BRequired = false;
    this.performa5BUploaded = false;
    this.performa5BFileName = 'Select Performa-5 B File...';

    this.plotAreaDetailsWithOwnerDoc = undefined;
    this.plotAreaDetailsWithOwnerRequired = false;
    this.plotAreaDetailsWithOwnerUploaded = false;
    this.plotAreaDetailsWithOwnerFileName = 'Select Plot Area Details With Owner File...';
  }

  // onChangeSelectedIndivdual(value: any) {
  //   console.log("individualOrGroupId :- ", value);
  //   if (value == 2) {
  //     console.log('indisvidual bolck if condition');
  //     this.individualOrGroupRequired = true;
  //     this.newApplicationCreationFg.get('pdfGroup').enable();
  //     this.newApplicationCreationFg.controls["pdfGroup"].reset();

  //   } else {
  //     this.individualOrGroupRequired = false;
  //     this.newApplicationCreationFg.get('pdfGroup').disable();
  //     this.newApplicationCreationFg.controls["pdfGroup"].reset();
  //   }
  // }

  // charitra start code 

  onChangeSelectedIndivdual(value) {
    console.log("individualOrGroupId :- ", value);
    if (value == 2) {
      console.log('indisvidual bolck if condition');
      this.individualOrGroupRequired = true;
      this.newApplicationCreationFg.get('pdfGroup').enable();
      this.newApplicationCreationFg.controls["pdfGroup"].reset();

      this.newApplicationCreationFg.controls['loadRequestedId'].setValue(2);
      // this.newApplicationCreationFg.controls['loadRequestedId'].disable();
      this.newApplicationCreationFg.controls['loadRequested'].setValidators([Validators.required, Validators.pattern("^[1-9][0-9]*$")]);

    } else {
      this.individualOrGroupRequired = false;
      this.newApplicationCreationFg.get('pdfGroup').disable();
      this.newApplicationCreationFg.controls["pdfGroup"].reset();

      this.newApplicationCreationFg.controls['loadRequestedId'].setValue(1);
      // this.newApplicationCreationFg.controls['loadRequestedId'].disable();
      this.newApplicationCreationFg.controls['loadRequested'].setValidators([Validators.required, Validators.pattern("^[1-9][0-9]*$"), Validators.max(400)]);
    }
  }


  onColonyEllegalSelectType(e: any) {
    console.log(e.target.value, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

    if (e.target.value == 1) {
      this.newApplicationCreationFg.get('individualOrGroupId').enable();
      this.newApplicationCreationFg.controls["individualOrGroupId"].reset();

      this.newApplicationCreationFg.get('individualOrGroupId').clearValidators();
      this.newApplicationCreationFg.get('individualOrGroupId').updateValueAndValidity();

      this.newApplicationCreationFg.controls['loadRequestedId'].setValue(2);
      this.newApplicationCreationFg.controls['loadRequestedId'].disable();
      this.newApplicationCreationFg.controls['loadRequested'].setValidators([Validators.required, Validators.pattern("^[1-9][0-9]*$")]);

    }
    else if (e.target.value == 2) {
      this.newApplicationCreationFg.get('individualOrGroupId').enable();
      this.newApplicationCreationFg.controls["individualOrGroupId"].reset();

      this.newApplicationCreationFg.get('individualOrGroupId').setValidators(Validators.required);
      this.newApplicationCreationFg.get('individualOrGroupId').updateValueAndValidity();

      this.newApplicationCreationFg.controls['loadRequestedId'].setValue(null);
      this.newApplicationCreationFg.controls['loadRequestedId'].enable();
      this.newApplicationCreationFg.controls['loadRequested'].setValidators([Validators.required, Validators.pattern("^[1-9][0-9]*$")]);
    } else[

    ]

  }





  onChangeSelectedNatureOfWorkType(natureOfWorkTypeId: any) {

    this.natureOfWorkTypeBoolean = true;
    this.selectConsumerTypeBoolean = false
    // this.selectConsumerTypeBoolean = true;
    console.log('onChangeSelectedNatureOfWorkType is call !!!', natureOfWorkTypeId);

    if (natureOfWorkTypeId == 1) {
      this.newApplicationService.getSupplyVoltageList().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.supplyVoltageList = data['list'];
        });

      this.newApplicationService.getSchemeTypeList().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.schemeTypeList = data['list'];
          this.schemeTypeList = data['list'].filter(x => x.schemeTypeId != 4)
        });

      this.resetFileUploadData();
      this.newApplicationService.getloadRequested().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.loadRequestList = data['list'].filter(x => x.loadRequestedId != 3);
          console.log("this.loadRequestList", this.loadRequestList);
        });

      if (this.consumerTypeList.length > 3) {
        this.consumerTypeList.pop();
      }

      this.approveMapRequired = false;
      this.loadShitRequired = false;
      this.newApplicationCreationFg.get('approveMapFile').disable();
      this.newApplicationCreationFg.controls["approveMapFile"].reset();

      this.newApplicationCreationFg.get('loadShitFile').disable();
      this.newApplicationCreationFg.controls["loadShitFile"].reset();

      this.newApplicationCreationFg.get('avedakKaPrakar').enable();
      this.newApplicationCreationFg.controls['avedakKaPrakar'].reset()
      this.getPurpose(this.newApplicationCreationFg.get('avedakKaPrakar').value);

      this.newApplicationCreationFg.get('voltageLevel').disable();
      this.newApplicationCreationFg.controls['voltageLevel'].reset()

      this.newApplicationCreationFg.get('dcId').enable();
      this.newApplicationCreationFg.controls["dcId"].reset();

      this.newApplicationCreationFg.get('schemeTypeId').enable();
      this.newApplicationCreationFg.controls["schemeTypeId"].reset();

      this.newApplicationCreationFg.get('supplyVoltageId').enable();
      this.newApplicationCreationFg.controls["supplyVoltageId"].reset();

      this.newApplicationCreationFg.get('loadRequested').disable();  //
      this.newApplicationCreationFg.controls["loadRequested"].reset();

      this.newApplicationCreationFg.get('loadRequestedId').disable();
      this.newApplicationCreationFg.controls["loadRequestedId"].reset();

      this.newApplicationCreationFg.get('samagraId').disable();
      this.newApplicationCreationFg.controls["samagraId"].reset();

      this.newApplicationCreationFg.get('ivrsNo').enable();
      this.newApplicationCreationFg.controls["ivrsNo"].reset();

      this.newApplicationCreationFg.get('khasra').disable();
      this.newApplicationCreationFg.controls["khasra"].reset();

      this.newApplicationCreationFg.get('khatoni').disable();
      this.newApplicationCreationFg.controls["khatoni"].reset();

      this.newApplicationCreationFg.get('landAreaUnitId').disable();
      this.newApplicationCreationFg.controls["landAreaUnitId"].reset();

      this.newApplicationCreationFg.get('individualOrGroupId').disable();
      this.newApplicationCreationFg.controls["individualOrGroupId"].reset();

      this.newApplicationCreationFg.get('area').disable();
      this.newApplicationCreationFg.controls["area"].reset();

      this.newApplicationCreationFg.get('noOfPlot').disable();
      this.newApplicationCreationFg.controls["noOfPlot"].reset();

      this.newApplicationCreationFg.get('workAllocationAddress').disable();
      this.newApplicationCreationFg.controls["workAllocationAddress"].reset();

      this.newApplicationCreationFg.get('pdfFileAdministrative').disable();
      this.newApplicationCreationFg.controls["pdfFileAdministrative"].reset();

      this.newApplicationCreationFg.get('pdfFileTAndCP').disable();
      this.newApplicationCreationFg.controls["pdfFileTAndCP"].reset();

      this.newApplicationCreationFg.get('pdfFileRera').disable();
      this.newApplicationCreationFg.controls["pdfFileRera"].reset();

      this.newApplicationCreationFg.get('pdfFileRegistory').disable();
      this.newApplicationCreationFg.controls["pdfFileRegistory"].reset();

      this.newApplicationCreationFg.get('pdfFileNoc').disable();
      this.newApplicationCreationFg.controls["pdfFileNoc"].reset();

      this.newApplicationCreationFg.get('pdfGroup').disable();
      this.newApplicationCreationFg.controls["pdfGroup"].reset();

      this.newApplicationCreationFg.get('pdfFileGst').disable();
      this.newApplicationCreationFg.controls["pdfFileGst"].reset();

      this.newApplicationCreationFg.get('samagraFile').disable();
      this.newApplicationCreationFg.controls["samagraFile"].reset();

      this.newApplicationCreationFg.get('gstNumber').disable();
      this.newApplicationCreationFg.controls["gstNumber"].reset();

      this.newApplicationCreationFg.get('cbLigalAndIlegal').disable();
      this.newApplicationCreationFg.controls["cbLigalAndIlegal"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').disable();
      this.newApplicationCreationFg.controls["colonyLegalSelectionType"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').clearValidators();
      this.newApplicationCreationFg.get('colonyLegalSelectionType').updateValueAndValidity();

      this.newApplicationCreationFg.get('colonyIllegalSelectionType').disable();
      this.newApplicationCreationFg.controls["colonyIllegalSelectionType"].reset();

      this.newApplicationCreationFg.get('colonyIllegalSelectionType').clearValidators();
      this.newApplicationCreationFg.get('colonyIllegalSelectionType').updateValueAndValidity();

      //individualOrGroupId
      this.newApplicationCreationFg.get('individualOrGroupId').disable();
      this.newApplicationCreationFg.controls["individualOrGroupId"].reset();

      this.newApplicationCreationFg.get('individualOrGroupId').clearValidators();
      this.newApplicationCreationFg.get('individualOrGroupId').updateValueAndValidity();

    } else if (natureOfWorkTypeId == 2) {

      this.newApplicationService.getSchemeTypeList().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.schemeTypeList = data['list'];
          this.schemeTypeList = data['list'].filter(x => x.schemeTypeId != 4)
        });

      this.newApplicationService.getLandAreaUnit().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.landAreaUnitList = data['list'];
          console.log('land Area List', this.landAreaUnitList);
        });

      this.newApplicationService.getloadRequested().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          // this.loadRequestList = data['list'];
          this.loadRequestList = data['list'].filter(x => x.loadRequestedId != 3);
          console.log("this.loadRequestList", this.loadRequestList);

        });

      // if (this.consumerTypeList?.length < 4) {
      //   this.consumerTypeList.push(
      //     {
      //       "value": "EV Charging Station",
      //       "name": "EV Charging Station"
      //     }
      //   )
      // }

      this.approveMapRequired = false;
      this.loadShitRequired = false;
      this.newApplicationCreationFg.get('approveMapFile').disable();
      this.newApplicationCreationFg.controls["approveMapFile"].reset();

      this.newApplicationCreationFg.get('loadShitFile').disable();
      this.newApplicationCreationFg.controls["loadShitFile"].reset();

      this.newApplicationCreationFg.get('avedakKaPrakar').enable();
      this.newApplicationCreationFg.controls['avedakKaPrakar'].reset();
      this.getPurpose(this.newApplicationCreationFg.get('avedakKaPrakar').value);

      this.newApplicationCreationFg.get('voltageLevel').enable();
      this.newApplicationCreationFg.controls['voltageLevel'].reset()

      this.newApplicationCreationFg.get('dcId').enable();
      this.newApplicationCreationFg.controls["dcId"].reset();

      this.newApplicationCreationFg.get('loadRequested').enable();
      this.newApplicationCreationFg.controls["loadRequested"].reset();//

      this.newApplicationCreationFg.get('schemeTypeId').enable();
      this.newApplicationCreationFg.controls["schemeTypeId"].reset();

      this.newApplicationCreationFg.get('loadRequestedId').enable();
      this.newApplicationCreationFg.controls["loadRequestedId"].reset();

      this.newApplicationCreationFg.get('samagraId').disable();
      this.newApplicationCreationFg.controls["samagraId"].reset();

      this.newApplicationCreationFg.get('supplyVoltageId').disable();
      this.newApplicationCreationFg.controls["supplyVoltageId"].reset();

      this.newApplicationCreationFg.get('ivrsNo').disable();
      this.newApplicationCreationFg.controls["ivrsNo"].reset();

      this.newApplicationCreationFg.get('area').enable();
      this.newApplicationCreationFg.controls["area"].reset();

      this.newApplicationCreationFg.get('landAreaUnitId').enable();
      this.newApplicationCreationFg.controls["landAreaUnitId"].reset();

      this.newApplicationCreationFg.get('khasra').disable();
      this.newApplicationCreationFg.controls["khasra"].reset();

      this.newApplicationCreationFg.get('khatoni').disable();
      this.newApplicationCreationFg.controls["khatoni"].reset();

      if (this.consumerApplicationDetail?.nscApplicationNo != null) {
        this.newApplicationCreationFg.get('individualOrGroupId').enable();
        this.newApplicationCreationFg.controls["individualOrGroupId"].reset();
        this.newApplicationCreationFg.get('individualOrGroupId').setValidators(Validators.required);
        this.newApplicationCreationFg.get('individualOrGroupId').updateValueAndValidity();

      } else {
        this.newApplicationCreationFg.get('individualOrGroupId').disable();
        this.newApplicationCreationFg.controls["individualOrGroupId"].reset();
        this.newApplicationCreationFg.get('individualOrGroupId').clearValidators();
        this.newApplicationCreationFg.get('individualOrGroupId').updateValueAndValidity();
      }



      this.newApplicationCreationFg.get('noOfPlot').disable();
      this.newApplicationCreationFg.controls["noOfPlot"].reset();


      this.newApplicationCreationFg.get('workAllocationAddress').disable();
      this.newApplicationCreationFg.controls["workAllocationAddress"].reset();

      this.newApplicationCreationFg.get('pdfFileAdministrative').disable();
      this.newApplicationCreationFg.controls["pdfFileAdministrative"].reset();

      this.newApplicationCreationFg.get('pdfFileTAndCP').disable();
      this.newApplicationCreationFg.controls["pdfFileTAndCP"].reset();

      this.newApplicationCreationFg.get('pdfFileRera').disable();
      this.newApplicationCreationFg.controls["pdfFileRera"].reset();

      this.newApplicationCreationFg.get('pdfFileRegistory').disable();
      this.newApplicationCreationFg.controls["pdfFileRegistory"].reset();

      this.newApplicationCreationFg.get('pdfFileNoc').disable();
      this.newApplicationCreationFg.controls["pdfFileNoc"].reset();

      this.newApplicationCreationFg.get('pdfGroup').disable();
      this.newApplicationCreationFg.controls["pdfGroup"].reset();

      this.newApplicationCreationFg.get('pdfFileGst').disable();
      this.newApplicationCreationFg.controls["pdfFileGst"].reset();

      this.newApplicationCreationFg.get('samagraFile').disable();
      this.newApplicationCreationFg.controls["samagraFile"].reset();

      this.newApplicationCreationFg.get('gstNumber').disable();
      this.newApplicationCreationFg.controls["gstNumber"].reset();

      this.newApplicationCreationFg.get('cbLigalAndIlegal').disable();
      this.newApplicationCreationFg.controls["cbLigalAndIlegal"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').disable();
      this.newApplicationCreationFg.controls["colonyLegalSelectionType"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').clearValidators();
      this.newApplicationCreationFg.get('colonyLegalSelectionType').updateValueAndValidity();

      this.newApplicationCreationFg.get('colonyIllegalSelectionType').disable();
      this.newApplicationCreationFg.controls["colonyIllegalSelectionType"].reset();

      this.newApplicationCreationFg.get('colonyIllegalSelectionType').clearValidators();
      this.newApplicationCreationFg.get('colonyIllegalSelectionType').updateValueAndValidity();

      console.log(this.newApplicationCreationFg, "this.newApplicationCreationFg.........................");


    } else if (natureOfWorkTypeId == 3) {

      this.newApplicationService.getSchemeTypeList().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.schemeTypeList = data['list'];
          this.schemeTypeList = data['list'].filter(x => x.schemeTypeId != 4)
        });

      this.newApplicationService.getLandAreaUnit().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.landAreaUnitList = data['list'];
          console.log('land Area List', this.landAreaUnitList);
        });

      this.newApplicationService.getloadRequested().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          // this.loadRequestList = data['list'];
          this.loadRequestList = data['list'].filter(x => x.loadRequestedId != 3);
          console.log("this.loadRequestList", this.loadRequestList);

        });

      this.resetFileUploadData();
      this.t$cpPermissionRequired = true;
      this.reraPermissionRequired = true;

      if (this.consumerTypeList.length > 3) {
        this.consumerTypeList.pop();
      }

      this.approveMapRequired = false;
      this.loadShitRequired = false;
      this.newApplicationCreationFg.get('approveMapFile').disable();
      this.newApplicationCreationFg.controls["approveMapFile"].reset();

      this.newApplicationCreationFg.get('loadShitFile').disable();
      this.newApplicationCreationFg.controls["loadShitFile"].reset();

      this.newApplicationCreationFg.get('avedakKaPrakar').enable();
      this.newApplicationCreationFg.controls['avedakKaPrakar'].reset();
      this.getPurpose(this.newApplicationCreationFg.get('avedakKaPrakar').value);

      this.newApplicationCreationFg.get('dcId').enable();
      this.newApplicationCreationFg.controls["dcId"].reset();

      this.newApplicationCreationFg.get('voltageLevel').disable();
      this.newApplicationCreationFg.controls['voltageLevel'].reset()

      this.newApplicationCreationFg.get('supplyVoltageId').enable();
      this.newApplicationCreationFg.controls["supplyVoltageId"].reset();//


      this.newApplicationCreationFg.get('loadRequestedId').enable();
      this.newApplicationCreationFg.controls["loadRequestedId"].reset();

      this.newApplicationCreationFg.get('samagraId').disable();
      this.newApplicationCreationFg.controls["samagraId"].reset();

      this.newApplicationCreationFg.get('ivrsNo').disable();
      this.newApplicationCreationFg.controls["ivrsNo"].reset();


      this.newApplicationCreationFg.get('loadRequested').enable();
      this.newApplicationCreationFg.controls["loadRequested"].reset();

      this.newApplicationCreationFg.get('khasra').disable();
      this.newApplicationCreationFg.controls["khasra"].reset();

      this.newApplicationCreationFg.get('khatoni').disable();
      this.newApplicationCreationFg.controls["khatoni"].reset();

      this.newApplicationCreationFg.get('supplyVoltageId').disable();
      this.newApplicationCreationFg.controls["supplyVoltageId"].reset();

      this.newApplicationCreationFg.get('individualOrGroupId').enable();
      this.newApplicationCreationFg.controls["individualOrGroupId"].reset();

      this.newApplicationCreationFg.get('landAreaUnitId').enable();
      this.newApplicationCreationFg.controls["landAreaUnitId"].reset();

      this.newApplicationCreationFg.get('area').enable();
      this.newApplicationCreationFg.controls["area"].reset();

      this.newApplicationCreationFg.get('noOfPlot').enable();
      this.newApplicationCreationFg.controls["noOfPlot"].reset();


      this.newApplicationCreationFg.get('workAllocationAddress').disable();
      this.newApplicationCreationFg.controls["workAllocationAddress"].reset();

      this.newApplicationCreationFg.get('landAreaUnitId').enable();
      this.newApplicationCreationFg.controls["landAreaUnitId"].reset();

      this.newApplicationCreationFg.get('pdfFileAdministrative').disable();
      this.newApplicationCreationFg.controls["pdfFileAdministrative"].reset();

      this.newApplicationCreationFg.get('pdfFileAdministrative').disable();
      this.newApplicationCreationFg.controls["pdfFileAdministrative"].reset();

      this.newApplicationCreationFg.get('pdfFileTAndCP').enable();
      this.newApplicationCreationFg.controls["pdfFileTAndCP"].reset();

      this.newApplicationCreationFg.get('pdfFileRera').enable();
      this.newApplicationCreationFg.controls["pdfFileRera"].reset();

      this.newApplicationCreationFg.get('pdfFileRegistory').disable();
      this.newApplicationCreationFg.controls["pdfFileRegistory"].reset();

      this.newApplicationCreationFg.get('pdfFileNoc').disable();
      this.newApplicationCreationFg.controls["pdfFileNoc"].reset();

      this.newApplicationCreationFg.get('pdfGroup').disable();
      this.newApplicationCreationFg.controls["pdfGroup"].reset();

      this.newApplicationCreationFg.get('pdfFileGst').disable();
      this.newApplicationCreationFg.controls["pdfFileGst"].reset();

      this.newApplicationCreationFg.get('samagraFile').disable();
      this.newApplicationCreationFg.controls["samagraFile"].reset();

      this.newApplicationCreationFg.get('gstNumber').disable();
      this.newApplicationCreationFg.controls["gstNumber"].reset();

      this.newApplicationCreationFg.get('cbLigalAndIlegal').enable();
      this.newApplicationCreationFg.controls["cbLigalAndIlegal"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').enable();
      this.newApplicationCreationFg.controls["colonyLegalSelectionType"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').setValidators(Validators.required);
      this.newApplicationCreationFg.get('colonyLegalSelectionType').updateValueAndValidity();

      this.newApplicationCreationFg.get('colonyIllegalSelectionType').disable();
      this.newApplicationCreationFg.controls["colonyIllegalSelectionType"].reset();

      this.newApplicationCreationFg.get('colonyIllegalSelectionType').clearValidators();
      this.newApplicationCreationFg.get('colonyIllegalSelectionType').updateValueAndValidity();

      this.newApplicationCreationFg.get('individualOrGroupId').disable();
      this.newApplicationCreationFg.controls["individualOrGroupId"].reset();

      this.newApplicationCreationFg.get('individualOrGroupId').clearValidators();
      this.newApplicationCreationFg.get('individualOrGroupId').updateValueAndValidity();



    } else if (natureOfWorkTypeId == 4) {

      this.resetFileUploadData();


      // this.rowRequired = true;
      // this.shapathPatraRequired = true;
      // this.loadSheetRequired = true;
      this.nocRequired = true;
      this.registoryOrLeaseRequired = false;

      this.registryRequired = true;
      // this.committeeRequired = true;
      // this.diversionRequired = true;
      // this.nazulRequired = true;
      // this.mapRequired = true;
      // this.khasraKhatoniRequired = true;
      // this.mapCivilEngineerRequired = true;
      // this.applicationConsentRequired = true;
      // this.performa5ARequired = true;
      // this.performa5BRequired = true;
      // this.plotAreaDetailsWithOwnerRequired = true;

      this.newApplicationService.getSchemeTypeList().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          console.log(data, "sscchhemmettyyypeee..............");

          this.schemeTypeList = data['list'];
          this.schemeTypeList = data['list'].filter(x => x.schemeTypeId != 4);
        });

      this.newApplicationService.getLandAreaUnit().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          console.log(data, "llaaannddAAreeeaaUnnniitt...........");

          this.landAreaUnitList = data['list'];
          console.log('land Area List', this.landAreaUnitList);
        });

      this.newApplicationService.getIndividualOrGroup().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          console.log(data, "iiinnndddiiivvviiidduuuaalllllGggrrroouupppiiidddd");

          this.individualOrGroupList = data['list'];
          console.log("this.individualOrGroupList", this.individualOrGroupList);
        });


      this.newApplicationService.getloadRequested().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          // this.loadRequestList = data['list'];
          console.log(data, "llloooadddddrrrreeeqquuueesttteedd......................");

          this.loadRequestList = data['list'].filter(x => x.loadRequestedId != 3);
          console.log("this.loadRequestList", this.loadRequestList);

        });

      // this.loadRequestList = this.loadRequestList.filter(x=>x.loadRequestedId!=3);

      if (this.consumerTypeList.length > 3) {
        this.consumerTypeList.pop();
      }

      this.approveMapRequired = false;
      this.loadShitRequired = false;
      this.newApplicationCreationFg.get('approveMapFile').disable();
      this.newApplicationCreationFg.controls["approveMapFile"].reset();

      this.newApplicationCreationFg.get('loadShitFile').disable();
      this.newApplicationCreationFg.controls["loadShitFile"].reset();

      this.newApplicationCreationFg.get('avedakKaPrakar').enable();
      this.newApplicationCreationFg.controls['avedakKaPrakar'].reset();
      this.getPurpose(this.newApplicationCreationFg.get('avedakKaPrakar').value);

      this.newApplicationCreationFg.get('voltageLevel').disable();
      this.newApplicationCreationFg.controls['voltageLevel'].reset()

      this.newApplicationCreationFg.get('dcId').enable();
      this.newApplicationCreationFg.controls["dcId"].reset();

      this.newApplicationCreationFg.get('supplyVoltageId').enable();
      this.newApplicationCreationFg.controls["supplyVoltageId"].reset();

      this.newApplicationCreationFg.get('schemeTypeId').enable();
      this.newApplicationCreationFg.controls["schemeTypeId"].reset();

      this.newApplicationCreationFg.get('loadRequested').enable();
      this.newApplicationCreationFg.controls["loadRequested"].reset();//

      this.newApplicationCreationFg.get('loadRequestedId').enable();
      this.newApplicationCreationFg.controls["loadRequestedId"].reset();

      this.newApplicationCreationFg.get('samagraId').disable();
      this.newApplicationCreationFg.controls["samagraId"].reset();

      this.newApplicationCreationFg.get('ivrsNo').disable();
      this.newApplicationCreationFg.controls["ivrsNo"].reset();

      this.newApplicationCreationFg.get('khasra').disable();
      this.newApplicationCreationFg.controls["khasra"].reset();

      this.newApplicationCreationFg.get('khatoni').disable();
      this.newApplicationCreationFg.controls["khatoni"].reset();

      this.newApplicationCreationFg.get('supplyVoltageId').disable();
      this.newApplicationCreationFg.controls["supplyVoltageId"].reset();

      this.newApplicationCreationFg.get('individualOrGroupId').enable();
      this.newApplicationCreationFg.controls["individualOrGroupId"].reset();

      this.newApplicationCreationFg.get('area').enable();
      this.newApplicationCreationFg.controls["area"].reset();

      this.newApplicationCreationFg.get('noOfPlot').enable();
      this.newApplicationCreationFg.controls["noOfPlot"].reset();

      this.newApplicationCreationFg.get('workAllocationAddress').disable();
      this.newApplicationCreationFg.controls["workAllocationAddress"].reset();

      this.newApplicationCreationFg.get('landAreaUnitId').enable();
      this.newApplicationCreationFg.controls["landAreaUnitId"].reset();

      this.newApplicationCreationFg.get('pdfFileAdministrative').disable();
      this.newApplicationCreationFg.controls["pdfFileAdministrative"].reset();

      this.newApplicationCreationFg.get('pdfFileTAndCP').disable();
      this.newApplicationCreationFg.controls["pdfFileTAndCP"].reset();

      this.newApplicationCreationFg.get('pdfFileRera').disable();
      this.newApplicationCreationFg.controls["pdfFileRera"].reset();

      this.newApplicationCreationFg.get('pdfFileRegistory').enable();
      this.newApplicationCreationFg.controls["pdfFileRegistory"].reset();

      this.newApplicationCreationFg.get('pdfFileNoc').enable();
      this.newApplicationCreationFg.controls["pdfFileNoc"].reset();

      this.newApplicationCreationFg.get('pdfGroup').disable();
      this.newApplicationCreationFg.controls["pdfGroup"].reset();

      this.newApplicationCreationFg.get('pdfFileGst').disable();
      this.newApplicationCreationFg.controls["pdfFileGst"].reset();

      this.newApplicationCreationFg.get('samagraFile').disable();
      this.newApplicationCreationFg.controls["samagraFile"].reset();

      this.newApplicationCreationFg.get('gstNumber').disable();
      this.newApplicationCreationFg.controls["gstNumber"].reset();

      this.newApplicationCreationFg.get('cbLigalAndIlegal').enable();
      this.newApplicationCreationFg.controls["cbLigalAndIlegal"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').disable();
      this.newApplicationCreationFg.controls["colonyLegalSelectionType"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').clearValidators();
      this.newApplicationCreationFg.get('colonyLegalSelectionType').updateValueAndValidity();

      this.newApplicationCreationFg.get('colonyIllegalSelectionType').enable();
      this.newApplicationCreationFg.controls["colonyIllegalSelectionType"].reset();

      this.newApplicationCreationFg.get('colonyIllegalSelectionType').setValidators(Validators.required);
      this.newApplicationCreationFg.get('colonyIllegalSelectionType').updateValueAndValidity();

      // this.newApplicationCreationFg.get('individualOrGroupId').disable();
      // this.newApplicationCreationFg.controls["individualOrGroupId"].reset();

      this.newApplicationCreationFg.get('individualOrGroupId').setValidators(Validators.required);
      this.newApplicationCreationFg.get('individualOrGroupId').updateValueAndValidity();

    } else if (natureOfWorkTypeId == 5) {

      this.newApplicationService.getLandAreaUnit().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.landAreaUnitList = data['list'];
          console.log('land Area List', this.landAreaUnitList);
        });

      this.newApplicationService.getloadRequested().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          // this.loadRequestList = data['list'];
          this.loadRequestList = data['list'].filter(x => x.loadRequestedId == 3);
          console.log("this.loadRequestList", this.loadRequestList);

        });

      // this.loadRequestList = this.loadRequestList.filter(x=>x.loadRequestedId==3);
      this.resetFileUploadData();
      this.khasraKhatoniRequired = true;
      this.samagraRequired = true;
      // this.registryRequired = true;
      // this.nagarNigamPermissionRequired = true;
      // this.nocRequired = true;
      this.newApplicationCreationFg.get('avedakKaPrakar').disable();
      this.newApplicationCreationFg.controls['avedakKaPrakar'].reset()
      // this.newApplicationCreationFg.controls["schemeTypeId"].setValue(this.schemeTypeList[2].schemeTypeId);

      // Private_Entity
      // Govt_Entity
      // Telecom_Operator

      if (this.consumerTypeList.length > 3) {
        this.consumerTypeList.pop();
      }
      this.getPurpose(this.newApplicationCreationFg.get('avedakKaPrakar').value);

      this.approveMapRequired = false;
      this.loadShitRequired = false;
      this.newApplicationCreationFg.get('approveMapFile').disable();
      this.newApplicationCreationFg.controls["approveMapFile"].reset();

      this.newApplicationCreationFg.get('loadShitFile').disable();
      this.newApplicationCreationFg.controls["loadShitFile"].reset();

      this.newApplicationCreationFg.get('dcId').enable();
      this.newApplicationCreationFg.controls["dcId"].reset();

      this.newApplicationCreationFg.get('voltageLevel').disable();
      this.newApplicationCreationFg.controls['voltageLevel'].reset()

      this.newApplicationCreationFg.get('loadRequested').enable();
      this.newApplicationCreationFg.controls["loadRequested"].reset();//samagraId

      this.newApplicationCreationFg.get('loadRequestedId').enable();
      this.newApplicationCreationFg.controls["loadRequestedId"].reset();

      this.newApplicationCreationFg.get('samagraId').enable();
      this.newApplicationCreationFg.controls["samagraId"].reset();

      this.newApplicationCreationFg.get('ivrsNo').disable();
      this.newApplicationCreationFg.controls["ivrsNo"].reset();

      this.newApplicationCreationFg.get('supplyVoltageId').disable();
      this.newApplicationCreationFg.controls["supplyVoltageId"].reset();

      this.newApplicationCreationFg.get('schemeTypeId').disable();
      this.newApplicationCreationFg.controls["schemeTypeId"].reset();

      this.newApplicationCreationFg.get('individualOrGroupId').disable();
      this.newApplicationCreationFg.controls["individualOrGroupId"].setValue(1);

      this.newApplicationCreationFg.get('khasra').enable();
      this.newApplicationCreationFg.controls["khasra"].reset();

      this.newApplicationCreationFg.get('khatoni').enable();
      this.newApplicationCreationFg.controls["khatoni"].reset();

      this.newApplicationCreationFg.get('area').enable();
      this.newApplicationCreationFg.controls["area"].reset();

      this.newApplicationCreationFg.get('noOfPlot').disable();
      this.newApplicationCreationFg.controls["noOfPlot"].reset();

      this.newApplicationCreationFg.get('workAllocationAddress').disable();
      this.newApplicationCreationFg.controls["workAllocationAddress"].reset();

      this.newApplicationCreationFg.get('landAreaUnitId').enable();
      this.newApplicationCreationFg.controls["landAreaUnitId"].reset();

      this.newApplicationCreationFg.get('pdfFileAdministrative').disable();
      this.newApplicationCreationFg.controls["pdfFileAdministrative"].reset();

      this.newApplicationCreationFg.get('pdfFileTAndCP').disable();
      this.newApplicationCreationFg.controls["pdfFileTAndCP"].reset();

      this.newApplicationCreationFg.get('pdfFileRera').disable();
      this.newApplicationCreationFg.controls["pdfFileRera"].reset();

      this.newApplicationCreationFg.get('pdfFileRegistory').disable();
      this.newApplicationCreationFg.controls["pdfFileRegistory"].reset();

      this.newApplicationCreationFg.get('pdfFileNoc').disable();
      this.newApplicationCreationFg.controls["pdfFileNoc"].reset();

      this.newApplicationCreationFg.get('pdfGroup').disable();
      this.newApplicationCreationFg.controls["pdfGroup"].reset();

      this.newApplicationCreationFg.get('pdfFileGst').disable();
      this.newApplicationCreationFg.controls["pdfFileGst"].reset();

      this.newApplicationCreationFg.get('samagraFile').enable();
      this.newApplicationCreationFg.controls["samagraFile"].reset();

      this.newApplicationCreationFg.get('gstNumber').disable();
      this.newApplicationCreationFg.controls["gstNumber"].reset();

      this.newApplicationCreationFg.get('cbLigalAndIlegal').disable();
      this.newApplicationCreationFg.controls["cbLigalAndIlegal"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').disable();
      this.newApplicationCreationFg.controls["colonyLegalSelectionType"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').clearValidators();
      this.newApplicationCreationFg.get('colonyLegalSelectionType').updateValueAndValidity();

      this.newApplicationCreationFg.get('colonyIllegalSelectionType').disable();
      this.newApplicationCreationFg.controls["colonyIllegalSelectionType"].reset();

      this.newApplicationCreationFg.get('colonyIllegalSelectionType').clearValidators();
      this.newApplicationCreationFg.get('colonyIllegalSelectionType').updateValueAndValidity();

    } else if (natureOfWorkTypeId == 6) {

      this.newApplicationService.getSupplyVoltageList().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.supplyVoltageList = data['list'];
        });

      this.newApplicationService.getSchemeTypeList().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.schemeTypeList = data['list'];
          this.schemeTypeList = data['list'].filter(x => x.schemeTypeId != 4)


        });

      this.resetFileUploadData();
      this.administrativeRequired = true;
      // this.registryRequired = true;
      // this.nagarNigamPermissionRequired = true;
      // this.nocRequired = true;
      this.newApplicationService.getloadRequested().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          // this.loadRequestList = data['list'];
          this.loadRequestList = data['list'].filter(x => x.loadRequestedId != 3);
          console.log("this.loadRequestList", this.loadRequestList);

        });
      // this.loadRequestList = this.loadRequestList.filter(x=>x.loadRequestedId!=3);
      this.newApplicationCreationFg.get('avedakKaPrakar').disable();
      this.newApplicationCreationFg.controls['avedakKaPrakar'].reset()
      // this.newApplicationCreationFg.controls['avedakKaPrakar'].setValue(this.consumerTypeList[1].value);

      if (this.consumerTypeList.length > 3) {
        this.consumerTypeList.pop();
      }

      this.getPurpose("Govt Entity");
      this.approveMapRequired = false;
      this.loadShitRequired = false;
      this.newApplicationCreationFg.get('approveMapFile').disable();
      this.newApplicationCreationFg.controls["approveMapFile"].reset();

      this.newApplicationCreationFg.get('loadShitFile').disable();
      this.newApplicationCreationFg.controls["loadShitFile"].reset();


      this.newApplicationCreationFg.get('dcId').enable();
      this.newApplicationCreationFg.controls["dcId"].reset();

      this.newApplicationCreationFg.get('supplyVoltageId').enable();
      this.newApplicationCreationFg.controls["supplyVoltageId"].reset();

      this.newApplicationCreationFg.get('voltageLevel').disable();
      this.newApplicationCreationFg.controls['voltageLevel'].reset()

      this.newApplicationCreationFg.get('loadRequested').disable();
      this.newApplicationCreationFg.controls["loadRequested"].reset();

      this.newApplicationCreationFg.get('loadRequestedId').disable();
      this.newApplicationCreationFg.controls["loadRequestedId"].reset();

      this.newApplicationCreationFg.get('samagraId').disable();
      this.newApplicationCreationFg.controls["samagraId"].reset();

      this.newApplicationCreationFg.get('ivrsNo').disable();
      this.newApplicationCreationFg.controls["ivrsNo"].reset();

      this.newApplicationCreationFg.get('khasra').disable();
      this.newApplicationCreationFg.controls["khasra"].reset();

      this.newApplicationCreationFg.get('khatoni').disable();
      this.newApplicationCreationFg.controls["khatoni"].reset();

      this.newApplicationCreationFg.get('landAreaUnitId').disable();
      this.newApplicationCreationFg.controls["landAreaUnitId"].reset();

      this.newApplicationCreationFg.get('individualOrGroupId').disable();
      this.newApplicationCreationFg.controls["individualOrGroupId"].reset();

      this.newApplicationCreationFg.get('area').disable();
      this.newApplicationCreationFg.controls["area"].reset();

      this.newApplicationCreationFg.get('noOfPlot').disable();
      this.newApplicationCreationFg.controls["noOfPlot"].reset();

      this.newApplicationCreationFg.get('workAllocationAddress').disable();
      this.newApplicationCreationFg.controls["workAllocationAddress"].reset();

      this.newApplicationCreationFg.get('pdfFileAdministrative').enable();
      this.newApplicationCreationFg.controls["pdfFileAdministrative"].reset();

      this.newApplicationCreationFg.get('pdfFileTAndCP').disable();
      this.newApplicationCreationFg.controls["pdfFileTAndCP"].reset();

      this.newApplicationCreationFg.get('pdfFileRera').disable();
      this.newApplicationCreationFg.controls["pdfFileRera"].reset();

      this.newApplicationCreationFg.get('pdfFileRegistory').disable();
      this.newApplicationCreationFg.controls["pdfFileRegistory"].reset();

      this.newApplicationCreationFg.get('pdfFileNoc').disable();
      this.newApplicationCreationFg.controls["pdfFileNoc"].reset();

      this.newApplicationCreationFg.get('pdfGroup').disable();
      this.newApplicationCreationFg.controls["pdfGroup"].reset();

      this.newApplicationCreationFg.get('pdfFileGst').disable();
      this.newApplicationCreationFg.controls["pdfFileGst"].reset();

      this.newApplicationCreationFg.get('samagraFile').disable();
      this.newApplicationCreationFg.controls["samagraFile"].reset();

      this.newApplicationCreationFg.get('gstNumber').disable();
      this.newApplicationCreationFg.controls["gstNumber"].reset();

      this.newApplicationCreationFg.get('cbLigalAndIlegal').disable();
      this.newApplicationCreationFg.controls["cbLigalAndIlegal"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').disable();
      this.newApplicationCreationFg.controls["colonyLegalSelectionType"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').clearValidators();
      this.newApplicationCreationFg.get('colonyLegalSelectionType').updateValueAndValidity();

      this.newApplicationCreationFg.get('colonyIllegalSelectionType').disable();
      this.newApplicationCreationFg.controls["colonyIllegalSelectionType"].reset();

      this.newApplicationCreationFg.get('colonyIllegalSelectionType').clearValidators();
      this.newApplicationCreationFg.get('colonyIllegalSelectionType').updateValueAndValidity();

      this.newApplicationCreationFg.get('individualOrGroupId').disable();
      this.newApplicationCreationFg.controls["individualOrGroupId"].reset();

      this.newApplicationCreationFg.get('individualOrGroupId').clearValidators();
      this.newApplicationCreationFg.get('individualOrGroupId').updateValueAndValidity();

      console.log(this.newApplicationCreationFg, "nnnnnneewwwwwww...................hhjhjhjhhjh..........");



    } else if (natureOfWorkTypeId == 7) {

      this.newApplicationService.getloadRequested().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.loadRequestList = data['list'];
          console.log("this.loadRequestList", this.loadRequestList);

        });

      this.newApplicationService.getSchemeTypeList().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.schemeTypeList = data['list'];
          this.schemeTypeList = data['list'].filter(x => x.schemeTypeId != 4)
        });

      this.resetFileUploadData();

      // this.rowRequired = true;
      // this.registryRequired = true;
      // this.nagarNigamPermissionRequired = true;
      // this.dicOrGumastaRequired = true;
      // this.shapathPatraRequired = true;
      // this.testReportRequired = true;
      this.newApplicationService.getloadRequested().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          // this.loadRequestList = data['list'];
          this.loadRequestList = data['list'].filter(x => x.loadRequestedId != 3);
          console.log("this.loadRequestList", this.loadRequestList);

        });
      // this.loadRequestList = this.loadRequestList.filter(x=>x.loadRequestedId!=3);


      // this.consumerTypeList.push(
      //   {
      //     "value": "EV Charging Station",
      //     "name": "EV Charging Station"
      //   }
      // )

      this.approveMapRequired = false;
      this.loadShitRequired = false;
      this.newApplicationCreationFg.get('approveMapFile').disable();
      this.newApplicationCreationFg.controls["approveMapFile"].reset();

      this.newApplicationCreationFg.get('loadShitFile').disable();
      this.newApplicationCreationFg.controls["loadShitFile"].reset();

      this.newApplicationCreationFg.get('avedakKaPrakar').enable();
      this.newApplicationCreationFg.controls['avedakKaPrakar'].reset()
      this.getPurpose(this.newApplicationCreationFg.get('avedakKaPrakar').value);

      this.newApplicationCreationFg.get('dcId').enable();
      this.newApplicationCreationFg.controls["dcId"].reset();

      this.newApplicationCreationFg.get('voltageLevel').disable();
      this.newApplicationCreationFg.controls['voltageLevel'].reset()

      this.newApplicationCreationFg.get('schemeTypeId').enable();
      this.newApplicationCreationFg.controls["schemeTypeId"].reset();

      this.newApplicationCreationFg.get('supplyVoltageId').disable();
      this.newApplicationCreationFg.controls["supplyVoltageId"].reset();

      this.newApplicationCreationFg.get('loadRequested').enable();
      this.newApplicationCreationFg.controls["loadRequested"].reset();

      this.newApplicationCreationFg.get('loadRequestedId').enable();
      this.newApplicationCreationFg.controls["loadRequestedId"].reset();

      this.newApplicationCreationFg.get('samagraId').disable();
      this.newApplicationCreationFg.controls["samagraId"].reset();


      this.newApplicationCreationFg.get('ivrsNo').enable();
      this.newApplicationCreationFg.controls["ivrsNo"].reset();


      this.newApplicationCreationFg.get('khasra').disable();
      this.newApplicationCreationFg.controls["khasra"].reset();

      this.newApplicationCreationFg.get('khatoni').disable();
      this.newApplicationCreationFg.controls["khatoni"].reset();

      this.newApplicationCreationFg.get('landAreaUnitId').disable();
      this.newApplicationCreationFg.controls["landAreaUnitId"].reset();

      this.newApplicationCreationFg.get('individualOrGroupId').disable();
      this.newApplicationCreationFg.controls["individualOrGroupId"].reset();

      this.newApplicationCreationFg.get('area').disable();
      this.newApplicationCreationFg.controls["area"].reset();

      this.newApplicationCreationFg.get('noOfPlot').disable();
      this.newApplicationCreationFg.controls["noOfPlot"].reset();

      this.newApplicationCreationFg.get('workAllocationAddress').disable();
      this.newApplicationCreationFg.controls["workAllocationAddress"].reset();

      this.newApplicationCreationFg.get('pdfFileAdministrative').disable();
      this.newApplicationCreationFg.controls["pdfFileAdministrative"].reset();

      this.newApplicationCreationFg.get('pdfFileTAndCP').disable();
      this.newApplicationCreationFg.controls["pdfFileTAndCP"].reset();

      this.newApplicationCreationFg.get('pdfFileRera').disable();
      this.newApplicationCreationFg.controls["pdfFileRera"].reset();

      this.newApplicationCreationFg.get('pdfFileRegistory').disable();
      this.newApplicationCreationFg.controls["pdfFileRegistory"].reset();

      this.newApplicationCreationFg.get('pdfFileNoc').disable();
      this.newApplicationCreationFg.controls["pdfFileNoc"].reset();

      this.newApplicationCreationFg.get('pdfGroup').disable();
      this.newApplicationCreationFg.controls["pdfGroup"].reset();

      this.newApplicationCreationFg.get('pdfFileGst').disable();
      this.newApplicationCreationFg.controls["pdfFileGst"].reset();

      this.newApplicationCreationFg.get('samagraFile').disable();
      this.newApplicationCreationFg.controls["samagraFile"].reset();

      this.newApplicationCreationFg.get('gstNumber').disable();
      this.newApplicationCreationFg.controls["gstNumber"].reset();

      this.newApplicationCreationFg.get('cbLigalAndIlegal').disable();
      this.newApplicationCreationFg.controls["cbLigalAndIlegal"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').disable();
      this.newApplicationCreationFg.controls["colonyLegalSelectionType"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').clearValidators();
      this.newApplicationCreationFg.get('colonyLegalSelectionType').updateValueAndValidity();

      this.newApplicationCreationFg.get('colonyIllegalSelectionType').disable();
      this.newApplicationCreationFg.controls["colonyIllegalSelectionType"].reset();

      this.newApplicationCreationFg.get('colonyIllegalSelectionType').clearValidators();
      this.newApplicationCreationFg.get('colonyIllegalSelectionType').updateValueAndValidity();

      this.newApplicationCreationFg.get('individualOrGroupId').disable();
      this.newApplicationCreationFg.controls["individualOrGroupId"].reset();

      this.newApplicationCreationFg.get('individualOrGroupId').clearValidators();
      this.newApplicationCreationFg.get('individualOrGroupId').updateValueAndValidity();

    } else if (natureOfWorkTypeId == 8) {

      this.resetFileUploadData();
      this.khasraKhatoniRequired = true;
      // this.registryRequired = true;
      // this.nagarNigamPermissionRequired = true;
      // this.nocRequired = true;

      if (this.consumerTypeList.length > 3) {
        this.consumerTypeList.pop();
      }

      this.approveMapRequired = false;
      this.loadShitRequired = false;
      this.newApplicationCreationFg.get('approveMapFile').disable();
      this.newApplicationCreationFg.controls["approveMapFile"].reset();

      this.newApplicationCreationFg.get('loadShitFile').disable();
      this.newApplicationCreationFg.controls["loadShitFile"].reset();

      this.newApplicationCreationFg.get('avedakKaPrakar').enable();
      this.newApplicationCreationFg.controls['avedakKaPrakar'].reset();
      this.getPurpose(this.newApplicationCreationFg.get('avedakKaPrakar').value);

      this.newApplicationCreationFg.get('voltageLevel').disable();
      this.newApplicationCreationFg.controls['voltageLevel'].reset()

      this.newApplicationCreationFg.get('dcId').enable();
      this.newApplicationCreationFg.controls["dcId"].reset();

      this.newApplicationCreationFg.get('loadRequested').enable();
      this.newApplicationCreationFg.controls["loadRequested"].reset();

      this.newApplicationCreationFg.get('loadRequestedId').enable();
      this.newApplicationCreationFg.controls["loadRequestedId"].reset();

      this.newApplicationCreationFg.get('samagraId').disable();
      this.newApplicationCreationFg.controls["samagraId"].reset();

      this.newApplicationCreationFg.get('ivrsNo').disable();
      this.newApplicationCreationFg.controls["ivrsNo"].reset();

      this.newApplicationCreationFg.get('supplyVoltageId').disable();
      this.newApplicationCreationFg.controls["supplyVoltageId"].reset();

      this.newApplicationCreationFg.get('schemeTypeId').disable();
      this.newApplicationCreationFg.controls["schemeTypeId"].setValue(this.schemeTypeList[2].schemeTypeId);

      this.newApplicationCreationFg.get('individualOrGroupId').disable();
      this.newApplicationCreationFg.controls["individualOrGroupId"].reset();

      this.newApplicationCreationFg.get('khasra').enable();
      this.newApplicationCreationFg.controls["khasra"].reset();

      this.newApplicationCreationFg.get('khatoni').enable();
      this.newApplicationCreationFg.controls["khatoni"].reset();

      this.newApplicationCreationFg.get('area').enable();
      this.newApplicationCreationFg.controls["area"].reset();

      this.newApplicationCreationFg.get('noOfPlot').disable();
      this.newApplicationCreationFg.controls["noOfPlot"].reset();

      this.newApplicationCreationFg.get('workAllocationAddress').disable();
      this.newApplicationCreationFg.controls["workAllocationAddress"].reset();

      this.newApplicationCreationFg.get('landAreaUnitId').enable();
      this.newApplicationCreationFg.controls["landAreaUnitId"].reset();

      this.newApplicationCreationFg.get('pdfFileAdministrative').disable();
      this.newApplicationCreationFg.controls["pdfFileAdministrative"].reset();

      this.newApplicationCreationFg.get('pdfFileTAndCP').disable();
      this.newApplicationCreationFg.controls["pdfFileTAndCP"].reset();

      this.newApplicationCreationFg.get('pdfFileRera').disable();
      this.newApplicationCreationFg.controls["pdfFileRera"].reset();

      this.newApplicationCreationFg.get('pdfFileRegistory').disable();
      this.newApplicationCreationFg.controls["pdfFileRegistory"].reset();

      this.newApplicationCreationFg.get('pdfFileNoc').disable();
      this.newApplicationCreationFg.controls["pdfFileNoc"].reset();

      this.newApplicationCreationFg.get('pdfGroup').disable();
      this.newApplicationCreationFg.controls["pdfGroup"].reset();

      this.newApplicationCreationFg.get('pdfFileGst').disable();
      this.newApplicationCreationFg.controls["pdfFileGst"].reset();

      this.newApplicationCreationFg.get('samagraFile').disable();
      this.newApplicationCreationFg.controls["samagraFile"].reset();

      this.newApplicationCreationFg.get('gstNumber').disable();
      this.newApplicationCreationFg.controls["gstNumber"].reset();

      this.newApplicationCreationFg.get('cbLigalAndIlegal').disable();
      this.newApplicationCreationFg.controls["cbLigalAndIlegal"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').disable();
      this.newApplicationCreationFg.controls["colonyLegalSelectionType"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').clearValidators();
      this.newApplicationCreationFg.get('colonyLegalSelectionType').updateValueAndValidity();

      this.newApplicationCreationFg.get('colonyIllegalSelectionType').disable();
      this.newApplicationCreationFg.controls["colonyIllegalSelectionType"].reset();

      this.newApplicationCreationFg.get('colonyIllegalSelectionType').clearValidators();
      this.newApplicationCreationFg.get('colonyIllegalSelectionType').updateValueAndValidity();

      this.newApplicationCreationFg.get('individualOrGroupId').disable();
      this.newApplicationCreationFg.controls["individualOrGroupId"].reset();

      this.newApplicationCreationFg.get('individualOrGroupId').clearValidators();
      this.newApplicationCreationFg.get('individualOrGroupId').updateValueAndValidity();

      console.log(this.newApplicationCreationFg.value, "yyyy666666yyyy6666");


    } else if (natureOfWorkTypeId == 9) {

      this.newApplicationService.getSchemeTypeList().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.schemeTypeList = data['list'];
          this.schemeTypeList = data['list'].filter(x => x.schemeTypeId != 4)
        });

      this.newApplicationService.getLandAreaUnit().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.landAreaUnitList = data['list'];
          console.log('land Area List', this.landAreaUnitList);
        });

      this.newApplicationService.getloadRequested().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          // this.loadRequestList = data['list'];
          this.loadRequestList = data['list'].filter(x => x.loadRequestedId != 3);
          console.log("this.loadRequestList", this.loadRequestList);

        });

      this.newApplicationService.getIndividualOrGroup().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.individualOrGroupList = data['list'];
          console.log("this.individualOrGroupList", this.individualOrGroupList);
        });
      // this.loadRequestList = this.loadRequestList.filter(x=>x.loadRequestedId!=3);

      // this.resetFileUploadData();

      // this.rowRequired = true;
      // this.registryRequired = true;
      // this.nagarNigamPermissionRequired = true;
      // this.shapathPatraRequired = true;
      // this.t$cpPermissionRequired = true;
      // this.reraPermissionRequired = true;
      // this.drawingNotarizedRequired = true;
      // this.colonyPrakoshthRequired = true;
      // this.colonyLicenceRequired = true;
      // this.loadSheetRequired = true;
      // this.nocRequired = true;
      // this.allPaperNotarized03SetRequired = true;


      // this.consumerTypeList.push(
      //   {
      //     "value": "EV Charging Station",
      //     "name": "EV Charging Station"
      //   }
      // )

      this.approveMapRequired = false;
      this.loadShitRequired = false;
      this.newApplicationCreationFg.get('approveMapFile').disable();
      this.newApplicationCreationFg.controls["approveMapFile"].reset();

      this.newApplicationCreationFg.get('loadShitFile').disable();
      this.newApplicationCreationFg.controls["loadShitFile"].reset();


      this.newApplicationCreationFg.get('avedakKaPrakar').enable();
      this.newApplicationCreationFg.controls['avedakKaPrakar'].reset();
      this.getPurpose(this.newApplicationCreationFg.get('avedakKaPrakar').value);

      this.newApplicationCreationFg.get('voltageLevel').enable();
      this.newApplicationCreationFg.controls['voltageLevel'].reset()

      this.newApplicationCreationFg.get('dcId').enable();
      this.newApplicationCreationFg.controls["dcId"].reset();

      this.newApplicationCreationFg.get('loadRequested').enable();
      this.newApplicationCreationFg.controls["loadRequested"].reset();//

      this.newApplicationCreationFg.get('schemeTypeId').enable();
      this.newApplicationCreationFg.controls["schemeTypeId"].reset();

      this.newApplicationCreationFg.get('loadRequestedId').enable();
      this.newApplicationCreationFg.controls["loadRequestedId"].reset();

      this.newApplicationCreationFg.get('samagraId').disable();
      this.newApplicationCreationFg.controls["samagraId"].reset();

      this.newApplicationCreationFg.get('supplyVoltageId').disable();
      this.newApplicationCreationFg.controls["supplyVoltageId"].reset();

      this.newApplicationCreationFg.get('ivrsNo').disable();
      this.newApplicationCreationFg.controls["ivrsNo"].reset();

      this.newApplicationCreationFg.get('area').enable();
      this.newApplicationCreationFg.controls["area"].reset();

      this.newApplicationCreationFg.get('landAreaUnitId').enable();
      this.newApplicationCreationFg.controls["landAreaUnitId"].reset();

      this.newApplicationCreationFg.get('khasra').disable();
      this.newApplicationCreationFg.controls["khasra"].reset();

      this.newApplicationCreationFg.get('khatoni').disable();
      this.newApplicationCreationFg.controls["khatoni"].reset();

      this.newApplicationCreationFg.get('individualOrGroupId').disable();
      this.newApplicationCreationFg.controls["individualOrGroupId"].reset();

      this.newApplicationCreationFg.get('noOfPlot').disable();
      this.newApplicationCreationFg.controls["noOfPlot"].reset();


      this.newApplicationCreationFg.get('workAllocationAddress').disable();
      this.newApplicationCreationFg.controls["workAllocationAddress"].reset();

      this.newApplicationCreationFg.get('pdfFileAdministrative').disable();
      this.newApplicationCreationFg.controls["pdfFileAdministrative"].reset();

      this.newApplicationCreationFg.get('pdfFileTAndCP').disable();
      this.newApplicationCreationFg.controls["pdfFileTAndCP"].reset();

      this.newApplicationCreationFg.get('pdfFileRera').disable();
      this.newApplicationCreationFg.controls["pdfFileRera"].reset();

      this.newApplicationCreationFg.get('pdfFileRegistory').enable();
      this.newApplicationCreationFg.controls["pdfFileRegistory"].reset();

      this.newApplicationCreationFg.get('pdfFileNoc').enable();
      this.newApplicationCreationFg.controls["pdfFileNoc"].reset();

      this.newApplicationCreationFg.get('pdfGroup').disable();
      this.newApplicationCreationFg.controls["pdfGroup"].reset();

      this.newApplicationCreationFg.get('pdfFileGst').disable();
      this.newApplicationCreationFg.controls["pdfFileGst"].reset();

      this.newApplicationCreationFg.get('samagraFile').disable();
      this.newApplicationCreationFg.controls["samagraFile"].reset();

      this.newApplicationCreationFg.get('gstNumber').disable();
      this.newApplicationCreationFg.controls["gstNumber"].reset();

      this.newApplicationCreationFg.get('panNo').disable();
      this.newApplicationCreationFg.controls["panNo"].reset();

      this.newApplicationCreationFg.get('cbLigalAndIlegal').disable();
      this.newApplicationCreationFg.controls["cbLigalAndIlegal"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').disable();
      this.newApplicationCreationFg.controls["colonyLegalSelectionType"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').clearValidators();
      this.newApplicationCreationFg.get('colonyLegalSelectionType').updateValueAndValidity();

      this.newApplicationCreationFg.get('colonyIllegalSelectionType').disable();
      this.newApplicationCreationFg.controls["colonyIllegalSelectionType"].reset();

      this.newApplicationCreationFg.get('colonyIllegalSelectionType').clearValidators();
      this.newApplicationCreationFg.get('colonyIllegalSelectionType').updateValueAndValidity();

      // this.newApplicationCreationFg.get('individualOrGroupId').disable();
      // this.newApplicationCreationFg.controls["individualOrGroupId"].reset();

      // this.newApplicationCreationFg.get('individualOrGroupId').clearValidators();
      // this.newApplicationCreationFg.get('individualOrGroupId').updateValueAndValidity();

    } else if (natureOfWorkTypeId == 10) {

      this.resetFileUploadData();

      // this.rowRequired = true;
      // this.shapathPatraRequired = true;
      // this.loadSheetRequired = true;
      this.nocRequired = false;
      this.registoryOrLeaseRequired = false;




      this.registryRequired = false;
      this.approveMapRequired = true;
      this.loadShitRequired = true;


      this.newApplicationService.getSchemeTypeList().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.schemeTypeList = data['list'];
          this.schemeTypeList = data['list'].filter(x => x.schemeTypeId != 4)
        });

      this.newApplicationService.getLandAreaUnit().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.landAreaUnitList = data['list'];
          console.log('land Area List', this.landAreaUnitList);
        });

      this.newApplicationService.getIndividualOrGroup().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.individualOrGroupList = data['list'];
          console.log("this.individualOrGroupList", this.individualOrGroupList);
        });


      this.newApplicationService.getloadRequested().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          // this.loadRequestList = data['list'];
          this.loadRequestList = data['list'].filter(x => x.loadRequestedId == 2);
          console.log("this.loadRequestList", this.loadRequestList);

        });

      // this.loadRequestList = this.loadRequestList.filter(x=>x.loadRequestedId!=3);

      if (this.consumerTypeList.length > 3) {
        this.consumerTypeList.pop();
      }

      this.newApplicationCreationFg.get('avedakKaPrakar').enable();
      this.newApplicationCreationFg.controls['avedakKaPrakar'].reset();
      this.getPurpose(this.newApplicationCreationFg.get('avedakKaPrakar').value);

      this.newApplicationCreationFg.get('voltageLevel').disable();
      this.newApplicationCreationFg.controls['voltageLevel'].reset()

      this.newApplicationCreationFg.get('dcId').enable();
      this.newApplicationCreationFg.controls["dcId"].reset();

      this.newApplicationCreationFg.get('supplyVoltageId').enable();
      this.newApplicationCreationFg.controls["supplyVoltageId"].reset();

      this.newApplicationCreationFg.get('loadRequested').enable();
      this.newApplicationCreationFg.controls["loadRequested"].reset();//

      this.newApplicationCreationFg.get('loadRequestedId').enable();
      this.newApplicationCreationFg.controls["loadRequestedId"].reset();

      this.newApplicationCreationFg.get('samagraId').disable();
      this.newApplicationCreationFg.controls["samagraId"].reset();

      this.newApplicationCreationFg.get('ivrsNo').disable();
      this.newApplicationCreationFg.controls["ivrsNo"].reset();

      this.newApplicationCreationFg.get('khasra').disable();
      this.newApplicationCreationFg.controls["khasra"].reset();

      this.newApplicationCreationFg.get('khatoni').disable();
      this.newApplicationCreationFg.controls["khatoni"].reset();

      this.newApplicationCreationFg.get('supplyVoltageId').disable();
      this.newApplicationCreationFg.controls["supplyVoltageId"].reset();

      this.newApplicationCreationFg.get('individualOrGroupId').disable();
      this.newApplicationCreationFg.controls["individualOrGroupId"].reset();

      this.newApplicationCreationFg.get('area').enable();
      this.newApplicationCreationFg.controls["area"].reset();

      this.newApplicationCreationFg.get('noOfPlot').enable();
      this.newApplicationCreationFg.controls["noOfPlot"].reset();

      this.newApplicationCreationFg.get('workAllocationAddress').disable();
      this.newApplicationCreationFg.controls["workAllocationAddress"].reset();

      this.newApplicationCreationFg.get('landAreaUnitId').enable();
      this.newApplicationCreationFg.controls["landAreaUnitId"].reset();

      this.newApplicationCreationFg.get('pdfFileAdministrative').disable();
      this.newApplicationCreationFg.controls["pdfFileAdministrative"].reset();

      this.newApplicationCreationFg.get('pdfFileTAndCP').disable();
      this.newApplicationCreationFg.controls["pdfFileTAndCP"].reset();

      this.newApplicationCreationFg.get('pdfFileRera').disable();
      this.newApplicationCreationFg.controls["pdfFileRera"].reset();

      this.newApplicationCreationFg.get('pdfFileRegistory').disable();
      this.newApplicationCreationFg.controls["pdfFileRegistory"].reset();

      this.newApplicationCreationFg.get('approveMapFile').enable();
      this.newApplicationCreationFg.controls["approveMapFile"].reset();

      this.newApplicationCreationFg.get('loadShitFile').enable();
      this.newApplicationCreationFg.controls["loadShitFile"].reset();

      this.newApplicationCreationFg.get('pdfFileNoc').disable();
      this.newApplicationCreationFg.controls["pdfFileNoc"].reset();

      this.newApplicationCreationFg.get('pdfGroup').disable();
      this.newApplicationCreationFg.controls["pdfGroup"].reset();

      this.newApplicationCreationFg.get('pdfFileGst').disable();
      this.newApplicationCreationFg.controls["pdfFileGst"].reset();

      this.newApplicationCreationFg.get('samagraFile').disable();
      this.newApplicationCreationFg.controls["samagraFile"].reset();

      this.newApplicationCreationFg.get('gstNumber').disable();
      this.newApplicationCreationFg.controls["gstNumber"].reset();

      this.newApplicationCreationFg.get('panNo').disable();
      this.newApplicationCreationFg.controls["panNo"].reset();

      this.newApplicationCreationFg.get('cbLigalAndIlegal').enable();
      this.newApplicationCreationFg.controls["cbLigalAndIlegal"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').disable();
      this.newApplicationCreationFg.controls["colonyLegalSelectionType"].reset();

      this.newApplicationCreationFg.get('colonyLegalSelectionType').clearValidators();
      this.newApplicationCreationFg.get('colonyLegalSelectionType').updateValueAndValidity();

      this.newApplicationCreationFg.get('colonyIllegalSelectionType').disable();
      this.newApplicationCreationFg.controls["colonyIllegalSelectionType"].reset();

      this.newApplicationCreationFg.get('individualOrGroupId').disable();
      this.newApplicationCreationFg.controls["individualOrGroupId"].reset();


    }
    this.newApplicationCreationFg.reset({
      natureOfWorkTypeId: this.newApplicationCreationFg.get('natureOfWorkTypeId').value,
      consumerName: this.newApplicationCreationFg.get('consumerName').value,
      address: this.newApplicationCreationFg.get('address').value,
    });
    console.log("natureOfWorkTypeId :- ", this.newApplicationCreationFg.get('natureOfWorkTypeId').value);
  }

  onChangeSelectSchemeType() {

  }
  onChangeSelectedDistrictType(value) {
    console.log("onChangeSelectedDistrictType", "get distribution list by district id", value)
    if (value) {
      this.newApplicationService.getDistributionByID(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {

            console.log(data, "dddddddccccclllliiissssstttttt.............");

            this.distributionCenterList = data['list'][0];

          }
        );
    } else {
      this.distributionCenterList = null;
    }
  }

  // getDcByDistrictId

  checkBoxReturnTureAndFalse(value) {
    console.log("checkBoxReturnTureAndFalse !!!!!!!!!!!", value.target.checked);

    if (value.target.checked) {
      this.isWorkAllocationAddressChecked = true;
      this.newApplicationCreationFg.get('workAllocationAddress').enable();
      this.newApplicationCreationFg.controls["workAllocationAddress"].reset();
    }
    else {
      this.isWorkAllocationAddressChecked = false;
      this.newApplicationCreationFg.get('workAllocationAddress').disable();
      this.newApplicationCreationFg.controls["workAllocationAddress"].reset();
    }

  }

  checkBoxReturnTureAndFalseLast(value) {
    console.log("checkBoxReturnTureAndFalseLast !!!!!!!!!!!", value.target.checked);

    if (value.target.checked) {
      this.isWorkAllocationAddressChecked = true;
    }
    else {
      this.isWorkAllocationAddressChecked = false;
    }

  }

  callNewMethod(value) {

    console.log('callmehtod');
    // this.newApplicationCreationFg.controls["loadRequested"].disable();
    // this.newApplicationCreationFg.controls["loadRequested"].reset();

  }

  onChangeSelectedLoad() {

  }

  onchangeSelectedLoadbyid(value) {
    console.log(value);
    this.newApplicationService.getLoadRequestedById(value)
      .pipe(takeUntil(this.unsubscribe$)).subscribe(
        data => {
          let loadRequestedId = data['list'][0];
          let singalloadRequestedId = loadRequestedId[0];
          console.log(singalloadRequestedId);

        }
      );

  }

  pdfMandatory() {
    this.newApplicationCreationFg.get('schemeTypeId').enable();
    this.newApplicationCreationFg.controls["schemeTypeId"].reset();
  }

  checkBoxCredit(value: any) {
    console.log(value, "sxsxssxsss");

    // console.log("checkBoxCredit !!!!!!!!!!!", value.target.checked);
    console.log("checkBoxCredit !!!!!!!!!!!", value);

    if (value == "YES") {
      this.gstchekbox = true;
      console.log(this.gstchekbox);
      if (this.IsEditMode == true) {
        this.newApplicationCreationFg.controls['gstCreditCheckBox'].setValue("YES");
        this.newApplicationCreationFg.controls['gstNumber'].setValue(this.consumerApplicationDetail.gstNumber);
        this.newApplicationCreationFg.get('gstNumber').enable();
        this.newApplicationCreationFg.controls['panNo'].setValue(this.consumerApplicationDetail.panNo);
        this.newApplicationCreationFg.get('panNo').enable();
        this.newApplicationCreationFg.get('pdfFileGst').enable();
        this.newApplicationCreationFg.controls["pdfFileGst"].reset();
      } else {
        this.newApplicationCreationFg.controls['gstCreditCheckBox'].setValue("YES");

        this.newApplicationCreationFg.get('gstNumber').enable();
        this.newApplicationCreationFg.controls["gstNumber"].reset();

        this.newApplicationCreationFg.get('panNo').enable();
        this.newApplicationCreationFg.controls["panNo"].reset();

        this.newApplicationCreationFg.get('pdfFileGst').enable();
        this.newApplicationCreationFg.controls["pdfFileGst"].reset();
      }

    }
    // if (value == "NO") 
    else {

      this.gstchekbox = false;

      if (this.IsEditMode == true) {
        this.newApplicationCreationFg.controls['gstCreditCheckBox'].setValue("NO");
        this.newApplicationCreationFg.controls['gstNumber'].setValue("");
        this.newApplicationCreationFg.get('gstNumber').disable();
        this.newApplicationCreationFg.controls['panNo'].setValue("");
        this.newApplicationCreationFg.get('panNo').disable();
        this.newApplicationCreationFg.get('pdfFileGst').disable();
        this.newApplicationCreationFg.controls["pdfFileGst"].reset();
      } else {
        this.newApplicationCreationFg.controls['gstCreditCheckBox'].setValue("NO");
        this.newApplicationCreationFg.get('gstNumber').disable();
        this.newApplicationCreationFg.controls["gstNumber"].reset();

        this.newApplicationCreationFg.get('panNo').disable();
        this.newApplicationCreationFg.controls["panNo"].reset();

        this.newApplicationCreationFg.get('pdfFileGst').disable();
        this.newApplicationCreationFg.controls["pdfFileGst"].reset();
      }


    }

  }


  samagracheckBoxCredit(value: any) {
    this.samagraCheckboxchoose = value.target.checked;
    console.log("checkBoxCredit !!!!!!!!!!!", value.target.checked);
    if (value.target.checked) {
      this.gstchekbox = true;
      console.log(this.gstchekbox);
      this.newApplicationCreationFg.get('samagraId').enable();
      this.newApplicationCreationFg.controls["samagraId"].reset();

    }
    else {
      this.gstchekbox = false;
      this.newApplicationCreationFg.get('samagraId').disable();
      this.newApplicationCreationFg.controls["samagraId"].reset();

    }
  }
  checkBoxCredit1(value) {
    console.log("checkBoxCredit !!!!!!!!!!!", value);

    if (value == true) {
      this.gstchekbox = true;
      console.log(this.gstchekbox);

      this.newApplicationCreationFg.get('gstNumber').enable();
      this.newApplicationCreationFg.controls["gstNumber"].reset();

      this.newApplicationCreationFg.get('pdfFileGst').enable();
      this.newApplicationCreationFg.controls["pdfFileGst"].reset();
    }
    else {
      this.gstchekbox = false;

      this.newApplicationCreationFg.get('gstNumber').disable();
      this.newApplicationCreationFg.controls["gstNumber"].reset();

      this.newApplicationCreationFg.get('pdfFileGst').disable();
      this.newApplicationCreationFg.controls["pdfFileGst"].reset();
    }

  }


}
