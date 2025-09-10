import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Inject, OnDestroy, ɵConsole, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { CrudType } from 'src/app/shared-enum/crudType';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { onlycharPattern } from 'src/app/utils/app-validators';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { UserLoginService } from '../../services/user-login.service';
import { DcAcceptanceModel } from '../../models/application-dc-acceptanceModel';
import { NewApplicationService } from 'src/app/postlogin/consumer-modules/services/new-application.service';


@Component({
    selector: 'application-dc-acceptance',
    templateUrl: './application-dc-acceptance.component.html',
    styleUrls: ['./application-dc-acceptance.component.css']
})
export class ApplicationDcAcceptance implements OnInit, OnDestroy {
    unsubscribe$: Subject<void> = new Subject();
    consumerApplicationDetail: any;
    consumerSurveyData: any;
    userRoles: Array<any> = [];
    dcAcceptanceFg: FormGroup;
    otpVerificationForm: FormGroup;
    supplyVoltageString: string = '';
    supplyVolageName: Array<any> = [];
    // consumerSurveyData:any
    consumerDemandData: any
    geoLocationData: any
    applicationDocumentData: any
    maskAadhaarNo: string = null;
    userApplicationUrl: string = this.url.userApplicationUrl;
    // userSurveyUrl: string = this.url.userSurveyUrl;

    maxDate = new Date();
    minDate = new Date();

    dcList: Array<any> = [];
    docDropdownArray: Array<any> = [];
    selectedDocArray: Array<any> = [];

    @ViewChild('surveyDoc') surveyDocElement: ElementRef;

    isFormSubmit: boolean = false;

    // isRejected;
    enabledOTP: boolean = false;
    invalidUser: boolean = false;
    surveyRequired: boolean = true;
    surveyUploaded: boolean = false;
    useridFieldShouldbeHidden: boolean = false;
    surveyFileName: string = 'Select Survey File... ';

    surveyDoc;
    crudType = this.data.crudType;

    userSurveyUrl: string = this.url.userSurveyUrl;
    mastersUrl: string = this.url.mastersUrl;

    consumerApplicationId = this.data.consumerApplicationId;
    consumerApplicationNo = this.data.consumerApplicationNo;
    userDataAll: any;
    DcAcceptanceModel: DcAcceptanceModel = new DcAcceptanceModel();
    acceptanceBoolean: Boolean = false;
    districtList: Array<any> = [];
    varonChangeSelectedDistrictType: any;
    districtIdnew: any;
    ApplicationFaultArray: Array<any> = [
        { 'id': 1, 'name': 'Nature Of Work Type' },
        { 'id': 2, 'name': 'Scheme Type' },
        { 'id': 3, 'name': 'Group/Individual' },
        { 'id': 4, 'name': 'Name & Address' },
        // { 'id': 5, 'name': 'Name , Address & Mobile Number' },
        // { 'id': 6, 'name': 'Application Status' },
        // {'id': 7 , 'name':'Nature Of Work Type'},
    ];



    changeNatureofWorkAndSchemeTypeForm: FormGroup;
    schemeTypeList = [];
    natureofworktypechangesbuttonBollean: boolean = false;

    consumerApplicationStatusChangeForm: FormGroup;
    ApplicationStatusList: any;
    consumerApplicationStatuschangesbuttonBollean: boolean = false

    consumerApplicationIndividualOrGroupChangeForm: FormGroup;
    consumerApplicationGroupOrIndividualchangesbuttonBollean: boolean = false;

    consumerNameAndAddressChangeForm: FormGroup;
    consumerNameAndAddresschangesbuttonBollean: boolean = false

    consumerNameAndAddressAndMobileNumberChangeForm: FormGroup;
    consumerNameAndAddressAndMobileNumberchangesbuttonBollean: boolean = false
    userToken: any;
    NatureOfworkTypeList: Array<any> = [];
    consumerDetails: any;

    natureOfWorkTypeSelectedboolean: boolean = false;
    schemeTypeSelectedBoolean: boolean = false;
    groupOrIndividualSelectedBoolean: boolean = false;
    nameAndAddressSelectedBoolean: boolean = false;
    nameAndAddressAndMobileNumberBoolean: boolean = false;
    applicationStatusSelectedBoolean: boolean = false;

    displayInputFieldArray: Array<any> = [
        {
            id: 1, name: "Individual"
        },
        {
            id: 2, name: "Group"
        }
    ];

    newDocGroupFile: any;
    paymentView: any;
    mkmyDocForm: FormGroup
    onSamagraFileSelectionVar: any;
    onKKFileSelectionVar: any
    documentSubmitBoolean: Boolean = false;
    FileSelectionFieldNotShowBoolean: boolean = false;

    constructor(
        private userLoginService: UserLoginService,
        private spinnerService: SpinnerService,
        private url: GenerateUrl,
        private http: HttpClient,
        private fb: FormBuilder,
        private consumerApplicationService: ConsumerApplicationService,
        private notificationService: NotificationService,
        private newApplicationService: NewApplicationService,


        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ApplicationDcAcceptance>,
    ) {
        let abc = sessionStorage.getItem('accessLeveOfUser');
        let xyz = JSON.parse(abc);
        console.log(xyz, "xxxxxxxxxxxxxyyyyyyyyyyyyyyyzzzzzzzzzzzzzz///////////////////");
        this.userDataAll = xyz;
        this.consumerApplicationDetail = this.data.row;
        console.log(this.consumerApplicationDetail, "this.consumerApplicationDetail.....................");


        let token = sessionStorage.getItem('consumertoken');
        this.userToken = token;



        //  forr Nature of work change ***************************************************************************
        this.changeNatureofWorkAndSchemeTypeForm = this.fb.group({
            // natureOfWorkType: [''],
            // natureOfWorkTypeId: [''],
            schemeTypeId: ['', Validators.required],
            remark: ['', Validators.required]
        });

        this.newApplicationService.getNatureOfWorkTypeList().pipe(takeUntil(this.unsubscribe$))
            .subscribe(data => {
                console.log('nature of work sarvaye page');
                this.NatureOfworkTypeList = data['list'];
                console.log(this.NatureOfworkTypeList);
            });

        this.newApplicationService.getSchemeTypeList().pipe(takeUntil(this.unsubscribe$))
            .subscribe(data => {
                this.schemeTypeList = data['list'];
                this.schemeTypeList = data['list'].filter(x => x.schemeTypeId != 4)


            });


        //  for change in Consumer Application Status 
        this.getApplicationStatus()
        this.consumerApplicationStatusChangeForm = this.fb.group({
            applicationStatusId: ['']
        })

        // for Group Or Individual 
        this.consumerApplicationIndividualOrGroupChangeForm = this.fb.group({
            groupOrIndividual: ['', Validators.required],
            remark: ['', Validators.required]
        })

        // for change name and address
        this.consumerNameAndAddressChangeForm = this.fb.group({
            name: ['', Validators.required],
            address: ['', Validators.required],
            remark: ['']
        });

        // for change name and address and mobile number
        this.consumerNameAndAddressAndMobileNumberChangeForm = this.fb.group({
            name: [''],
            address: [''],
            mobNo: ['']
        })


    }

    getApplicationStatus() {
        this.consumerApplicationService.getAll_Application_Status().subscribe(
            (res) => {
                console.log(
                    res.list,
                    "lllllllllllllllllllllllllllllllllllllllllllllllllll"
                );

                this.ApplicationStatusList = res.list;
            },
            (error) => { }
        );
    }

    async ngOnInit() {

        console.log(this.changeNatureofWorkAndSchemeTypeForm, " this.changeNatureofWorkAndSchemeTypeForm..............................");

        //  this.changeNatureofWorkAndSchemeTypeForm.controls['natureOfWorkTypeId'].setValue(this.consumerApplicationDetail?.natureOfWorkTypeId);
        this.changeNatureofWorkAndSchemeTypeForm.controls['schemeTypeId'].setValue(this.consumerApplicationDetail?.schemeTypeId);
        this.consumerApplicationStatusChangeForm.controls['applicationStatusId'].setValue(this.consumerApplicationDetail?.applicationStatusId);
        this.consumerApplicationIndividualOrGroupChangeForm.controls['groupOrIndividual'].setValue(this.consumerApplicationDetail?.individualOrGroup?.individualOrGroupId)
        this.consumerNameAndAddressChangeForm.controls['name'].setValue(this.consumerApplicationDetail.consumerName);
        this.consumerNameAndAddressChangeForm.controls['address'].setValue(this.consumerApplicationDetail.address);
        this.consumerNameAndAddressAndMobileNumberChangeForm.controls['name'].setValue(this.consumerApplicationDetail.consumerName);
        this.consumerNameAndAddressAndMobileNumberChangeForm.controls['address'].setValue(this.consumerApplicationDetail.address);
        //this.consumerNameAndAddressAndMobileNumberChangeForm.controls['mobNo'].setValue('')
        // this.changeNatureofWorkAndSchemeTypeForm.get('natureOfWorkTypeId').disable();
        this.changeNatureofWorkAndSchemeTypeForm.get('schemeTypeId').disable();
        this.consumerApplicationStatusChangeForm.get('applicationStatusId').disable();
        this.consumerApplicationIndividualOrGroupChangeForm.get('groupOrIndividual').disable();
        this.consumerNameAndAddressChangeForm.get('name').disable()
        this.consumerNameAndAddressChangeForm.get('address').disable()
        this.consumerNameAndAddressAndMobileNumberChangeForm.get('name').disable()
        this.consumerNameAndAddressAndMobileNumberChangeForm.get('address').disable();
        this.consumerNameAndAddressAndMobileNumberChangeForm.get('mobNo').disable()

        console.log()
        this.loadForm();

        this.getDistrict()



        // if (this.consumerApplicationDetail?.natureOfWorkTypeId != 8) {
        this.getApplicationDocumentData();
        // }else{
        //     this.docDropdownArray = [
        //         {
        //             "name": "Samagra File",
        //             "value": this.applicationDocumentData?.docSamagraFile
        //         },
        //         {
        //             "name": "Khasra-Khatoni File",
        //             "value": this.applicationDocumentData?.docKhasraKhatoni
        //         }
        //     ]

        // }

        this.getPymentView();

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
        this.consumerApplicationService.getPaymentDetailsDuringView(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data: any) => {
            console.log(data, "rrrrrrrrrrrrrrrrrrrrrrrrrrrr*********************rrrrrrrrrrrrrrrrrrrrrrrrrr");
            if (data.code == "200") {
                // const formattedDateStringRegistration = this.formatDate(data.list[0][0].DATE_OF_REGISTRATION)
                // console.log(formattedDateStringRegistration, "formattedDateStringRegistration................");

                // const formattedDateStringNewRegistration = this.formatDateNew(formattedDateStringRegistration);
                // console.log(formattedDateStringNewRegistration, "formattedDateStringNewRegistration.....................");

                // data.list[0][0].DATE_OF_REGISTRATION = formattedDateStringNewRegistration;

                // // Demand
                // const formattedDateStringDeemand = this.formatDate(data.list[0][0].DATE_OF_SUPERVISION_PAYMENT)
                // console.log(formattedDateStringDeemand, "formattedDateStringDeemand................");

                // const formattedDateStringNewDeemand = this.formatDateNew(formattedDateStringDeemand);
                // console.log(formattedDateStringNewDeemand, "formattedDateStringNewDeemand.....................");

                // data.list[0][0].DATE_OF_SUPERVISION_PAYMENT = formattedDateStringNewDeemand;

                 if (data.list[0][0].DATE_OF_REGISTRATION != null) {
          const formattedDateStringRegistration = this.formatDate(data.list[0][0].DATE_OF_REGISTRATION)
          console.log(formattedDateStringRegistration, "formattedDateStringRegistration................");

          const formattedDateStringNewRegistration = this.formatDateNew(formattedDateStringRegistration);
          console.log(formattedDateStringNewRegistration, "formattedDateStringNewRegistration.....................");

          data.list[0][0].DATE_OF_REGISTRATION = formattedDateStringNewRegistration;
        }


        // Demand
        if (data.list[0][0].DATE_OF_SUPERVISION_PAYMENT != null) {
          const formattedDateStringDeemand = this.formatDate(data.list[0][0].DATE_OF_SUPERVISION_PAYMENT)
          console.log(formattedDateStringDeemand, "formattedDateStringDeemand................");

          const formattedDateStringNewDeemand = this.formatDateNew(formattedDateStringDeemand);
          console.log(formattedDateStringNewDeemand, "formattedDateStringNewDeemand.....................");

          data.list[0][0].DATE_OF_SUPERVISION_PAYMENT = formattedDateStringNewDeemand;
        }

                this.paymentView = data.list[0][0]
            } else {
                return
            }
        })
    }




    // get Consumer Application Details By Application Number
    getApplicationDetails(ApplicationNo: any) {
        this.consumerApplicationService.getConsumerApplicationDetailsByApplicationNumber(ApplicationNo).subscribe((data: any) => {
            console.log(data, "Application Details Data...........................................newwww..................");
            if (data.code == "200") {
                this.consumerApplicationDetail = data.list[0];
                //  this.changeNatureofWorkAndSchemeTypeForm.controls['natureOfWorkTypeId'].setValue(this.consumerApplicationDetail?.natureOfWorkTypeId);
                this.changeNatureofWorkAndSchemeTypeForm.controls['schemeTypeId'].setValue(this.consumerApplicationDetail?.schemeTypeId);
                this.consumerApplicationStatusChangeForm.controls['applicationStatusId'].setValue(this.consumerApplicationDetail?.applicationStatusId);
                this.consumerApplicationIndividualOrGroupChangeForm.controls['groupOrIndividual'].setValue(this.consumerApplicationDetail.individualOrGroup?.individualOrGroupId)
                this.consumerNameAndAddressChangeForm.controls['name'].setValue(this.consumerApplicationDetail.consumerName);
                this.consumerNameAndAddressChangeForm.controls['address'].setValue(this.consumerApplicationDetail.address);
                this.consumerNameAndAddressAndMobileNumberChangeForm.controls['name'].setValue(this.consumerApplicationDetail.consumerName);
                this.consumerNameAndAddressAndMobileNumberChangeForm.controls['address'].setValue(this.consumerApplicationDetail.address);
            } else {
                this.notificationService.warn("Something went wrong !");
                return
            }
        })
    }

    ////////////////////////////////////////////////////////////////////////////////////// consumer Application Details changes started /////////////////////////////////////////////

    // ******************** For change nature of workType *******************

    onSelectNatureOfWorkTypeId(e: any) {

    }

    onSelectSchemeTypeId(e: any) {

    }

    onNatureOfWorkTypeCheckBoxSelection(e: any) {
        console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee..........................");
        if (e.checked == true) {
            this.natureofworktypechangesbuttonBollean = true
            // this.changeNatureofWorkAndSchemeTypeForm.get('natureOfWorkTypeId').enable();
            this.changeNatureofWorkAndSchemeTypeForm.get('schemeTypeId').enable();
        } else {
            this.natureofworktypechangesbuttonBollean = false
            // this.changeNatureofWorkAndSchemeTypeForm.get('natureOfWorkTypeId').disable();
            this.changeNatureofWorkAndSchemeTypeForm.get('schemeTypeId').disable();
        }

    }

    changeConsumerSchemeType() {
        console.log(this.changeNatureofWorkAndSchemeTypeForm.value, "this.changeNatureofWorkAndSchemeTypeForm.value...");

        // saveJeRemarkForConsumerApplicationUpdate
        if (this.changeNatureofWorkAndSchemeTypeForm.value.remark == null || this.changeNatureofWorkAndSchemeTypeForm.value.remark == undefined || this.changeNatureofWorkAndSchemeTypeForm.value.remark == "") {
            this.notificationService.error("Please Enter Remark !");
            return
        } else if (this.changeNatureofWorkAndSchemeTypeForm.invalid) {
            this.notificationService.warn("Invalid Form !");
            return
        }
        else {

            this.consumerApplicationService.changeConsumerSchemeType(this.consumerApplicationDetail.consumerApplicationNo, this.changeNatureofWorkAndSchemeTypeForm.value.schemeTypeId).subscribe((data: any) => {
                console.log(data, "changeConsumerSchemeType......................................................");
                if (data.code == "202") {
                    if (data.message == "No changes needed") {
                        this.notificationService.warn(data.message)
                    } else if (data.message == "Changes saved successfully") {
                        this.notificationService.success(data.message);
                        let PayLoad = {
                            "consumerAppNo": this.consumerApplicationDetail.consumerApplicationNo,
                            "jeRemark": this.changeNatureofWorkAndSchemeTypeForm.value.remark
                        }
                        this.consumerApplicationService.saveJeRemarkForConsumerApplicationUpdate(PayLoad).subscribe((resp: any) => {
                            console.log(resp, "saveJeRemarkForConsumerApplicationUpdate...........response......");
                        })
                        this.getApplicationDetails(this.consumerApplicationDetail.consumerApplicationNo);
                    }

                } else if (data.code == "406") {
                    this.notificationService.warn(data.message);
                    return
                } else {
                    this.notificationService.error(data.message);
                    return
                }
            })

        }

    }


    // changeNatureOfWorkTypeOfConsumer() {
    //     // consumerApplicationNo: any, newNatureOfWorkId: any, schemeTypeId: any, token: any
    //     this.consumerApplicationService.changeNatureOfWorkTypeOfConsumer(this.consumerApplicationDetail.consumerApplicationNo, this.changeNatureofWorkAndSchemeTypeForm.value.natureOfWorkTypeId, this.changeNatureofWorkAndSchemeTypeForm.value.schemeTypeId, this.userToken).subscribe((data: any) => {
    //         console.log(data, "changeNatureOfWorkTypeOfConsumer.......................................");
    //         if (data.code == "202") {
    //             if (this.changeNatureofWorkAndSchemeTypeForm.value.natureOfWorkTypeId == 4 || this.changeNatureofWorkAndSchemeTypeForm.value.natureOfWorkTypeId == 8) {
    //                 this.consumerApplicationService.changeApplicationIndividualOrGroup(this.consumerApplicationDetail.consumerApplicationNo, 1, this.userToken).subscribe((data: any) => {
    //                     console.log(data, "changeApplicationIndividualOrGroup...........................................");
    //                     if (data.code == "202") {
    //                         this.getApplicationDetails(this.consumerApplicationDetail.consumerApplicationNo);
    //                         this.notificationService.success(data.message);

    //                     } else {
    //                         this.notificationService.warn(data.message);
    //                         return
    //                     }

    //                 })
    //             } else {
    //                 this.getApplicationDetails(this.consumerApplicationDetail.consumerApplicationNo);
    //                 this.notificationService.success("Changes Successfully");
    //             }

    //         } else {
    //             this.notificationService.warn(data.message);
    //             return
    //         }

    //     })
    // };

    // **************************Get All Consumer Details ****************

    getAllTheDetailsOfConsumerByLoginId() {
        // loginId: any, token: any
        let consumerLoginId: any;
        this.consumerApplicationService.getAllTheDetailsOfConsumerByLoginId(consumerLoginId, this.userToken).subscribe((data: any) => {
            console.log(data, "getAllTheDetailsOfConsumerByLoginId..................");
            if (data.code == "200") {
                this.consumerDetails = data.list[0];
                this.notificationService.success("Data Retreive Successfully");
            } else {
                this.notificationService.warn(data.message);
                return
            }

        })
    }


    // ***********application status *******************

    onSelectApplicationStatus(e: any) {

    }

    onChangeStatusCheckBoxSelection(e: any) {
        console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee..........................");
        if (e.checked == true) {
            this.consumerApplicationStatuschangesbuttonBollean = true
            this.consumerApplicationStatusChangeForm.get('applicationStatusId').enable();
        } else {
            this.consumerApplicationStatuschangesbuttonBollean = false
            this.consumerApplicationStatusChangeForm.get('applicationStatusId').disable();
        }
    }


    changeConsumerApplicationStatus() {
        //  consumerApplicationNo: any, applicationStatusNo: any, token: any
        let applicationStatusNo: any;
        this.consumerApplicationService.changeConsumerApplicationStatus(this.consumerApplicationDetail.consumerApplicationNo, this.consumerApplicationStatusChangeForm.value.applicationStatusId, this.userToken).subscribe((data: any) => {
            console.log(data, "changeConsumerApplicationStatus.......................................");
            if (data.code == "202") {
                this.getApplicationDetails(this.consumerApplicationDetail.consumerApplicationNo);
                this.notificationService.success(data.message);
                location.reload();
            } else {
                this.notificationService.warn(data.message);
                return
            }
        })
    }

    //  ******************Group or Individual *****************

    onSelectGroupOrIndividual(e: any) {
        console.log(e, "onSelectGroupOrIndividual...............................");

    }

    onGroupFileSelectOnGroupChoose(e: any) {
        console.log(e, "onGroupFileSelectOnGroupChoose....................................");
        // docIndividualOrGroup
        this.newDocGroupFile = e.target.files[0];
    }

    onChangeGroupOrIndividualCheckBoxSelection(e: any) {
        console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee..........................");
        if (e.checked == true) {
            this.consumerApplicationGroupOrIndividualchangesbuttonBollean = true
            this.consumerApplicationIndividualOrGroupChangeForm.get('groupOrIndividual').enable();
        } else {
            this.consumerApplicationGroupOrIndividualchangesbuttonBollean = false
            this.consumerApplicationIndividualOrGroupChangeForm.get('groupOrIndividual').disable();
        }
    }

    changeApplicationIndividualOrGroup() {
        //  consumerApplicationNo: any, individualOrGroupId: any, token: any
        if (this.consumerApplicationIndividualOrGroupChangeForm.value.remark == null || this.consumerApplicationIndividualOrGroupChangeForm.value.remark == undefined || this.consumerApplicationIndividualOrGroupChangeForm.value.remark == "") {
            this.notificationService.error("Please Enter Remark !");
            return
        } else if (this.consumerApplicationIndividualOrGroupChangeForm.invalid) {
            this.notificationService.warn("Invalid Form !");
            return
        }
        else {
            let formData: FormData = new FormData();
            formData.append('docIndividualOrGroup', this.newDocGroupFile)
            this.consumerApplicationService.changeApplicationIndividualOrGroup(formData, this.consumerApplicationDetail.consumerApplicationNo, this.consumerApplicationIndividualOrGroupChangeForm.value.groupOrIndividual, this.userToken).subscribe((data: any) => {
                console.log(data, "changeApplicationIndividualOrGroup...........................................");
                if (data.code == "202") {
                    this.getApplicationDetails(this.consumerApplicationDetail.consumerApplicationNo);
                    this.notificationService.success(data.message);
                    let PayLoad = {
                        "consumerAppNo": this.consumerApplicationDetail.consumerApplicationNo,
                        "jeRemark": this.consumerApplicationIndividualOrGroupChangeForm.value.remark
                    }
                    this.consumerApplicationService.saveJeRemarkForConsumerApplicationUpdate(PayLoad).subscribe((resp: any) => {
                        console.log(resp, "saveJeRemarkForConsumerApplicationUpdate...........response......");
                    })
                } else {
                    this.notificationService.warn(data.message);
                    return
                }

            })
        }



    }


    // ***************** change name and address ************************************

    onChangeNameAndAddressCheckBoxSelection(e: any) {
        console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee..........................");
        if (e.checked == true) {
            this.consumerNameAndAddresschangesbuttonBollean = true
            this.consumerNameAndAddressChangeForm.get('name').enable();
            this.consumerNameAndAddressChangeForm.get('address').enable();
        } else {
            this.consumerNameAndAddresschangesbuttonBollean = false
            this.consumerNameAndAddressChangeForm.get('name').disable();
            this.consumerNameAndAddressChangeForm.get('address').disable();
        }
    }


    changeConsumerNameAndAddress() {
        //  consumerApplicationNo:any,newConsumerName:any,newAddress:any,token:any
        if (this.consumerNameAndAddressChangeForm.value.remark == null || this.consumerNameAndAddressChangeForm.value.remark == undefined || this.consumerNameAndAddressChangeForm.value.remark == "") {
            this.notificationService.error("Please Enter Remark !");
            return
        } else if (this.consumerNameAndAddressChangeForm.invalid) {
            this.notificationService.warn("Invalid Form");
            return
        }
        else {
            this.consumerApplicationService.changeConsumerNameAndAddress(this.consumerApplicationDetail.consumerApplicationNo, this.consumerNameAndAddressChangeForm.value.name, this.consumerNameAndAddressChangeForm.value.address, this.userToken).subscribe((data: any) => {
                console.log(data, "changeConsumerNameAndAddress..........");
                if (data.code == "202") {
                    this.getApplicationDetails(this.consumerApplicationDetail.consumerApplicationNo);
                    this.notificationService.success("Data changes Successfully");
                    let PayLoad = {
                        "consumerAppNo": this.consumerApplicationDetail.consumerApplicationNo,
                        "jeRemark": this.consumerNameAndAddressChangeForm.value.remark
                    }
                    this.consumerApplicationService.saveJeRemarkForConsumerApplicationUpdate(PayLoad).subscribe((resp: any) => {
                        console.log(resp, "saveJeRemarkForConsumerApplicationUpdate...........response......");
                    })
                } else {
                    this.notificationService.warn(data.message);
                    return
                }

            })
        }

    }




    // ****************change consumer name address and mobile number *********************

    onChangeNameAndAddressAndMobileNoCheckBoxSelection(e: any) {
        console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee..........................");
        if (e.checked == true) {
            this.consumerNameAndAddressAndMobileNumberchangesbuttonBollean = true
            this.consumerNameAndAddressAndMobileNumberChangeForm.get('name').enable()
            this.consumerNameAndAddressAndMobileNumberChangeForm.get('address').enable();
            this.consumerNameAndAddressAndMobileNumberChangeForm.get('mobNo').enable()
        } else {
            this.consumerNameAndAddressAndMobileNumberchangesbuttonBollean = false
            this.consumerNameAndAddressAndMobileNumberChangeForm.get('name').disable()
            this.consumerNameAndAddressAndMobileNumberChangeForm.get('address').disable();
            this.consumerNameAndAddressAndMobileNumberChangeForm.get('mobNo').disable()
        }
    }

    changeConsumerNameAndAddressByConsumerMobileNo() {
        // consumerMobileNo:any,newConsumerName:any,newAddress:any,token:any
        this.consumerApplicationService.changeConsumerNameAndAddressByConsumerMobileNo(this.consumerNameAndAddressAndMobileNumberChangeForm.value.mobNo, this.consumerNameAndAddressAndMobileNumberChangeForm.value.name, this.consumerNameAndAddressAndMobileNumberChangeForm.value.address, this.userToken).subscribe((data: any) => {
            console.log(data, "changeConsumerNameAndAddressByConsumerMobileNo...........");
            if (data.code == "202") {
                this.getApplicationDetails(this.consumerApplicationDetail.consumerApplicationNo);
                this.notificationService.success("Data changes Successfully");
            } else {
                this.notificationService.warn(data.message);
                return
            }
        })
    }


    ///////////////////////////////////////////////////////////////////////////////// consumer Application Details changes end ///////////////////////////////////////////////////////////





    getDistrict() {
        this.consumerApplicationService
            .getDistrictList()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data) => {
                this.districtList = data["list"];
                console.log("this.districtList", this.districtList);
            });
    }




    getConsumerSurveyData() {
        this.consumerApplicationService.getConsumerSurveyData(this.consumerApplicationDetail?.consumerApplicationId).subscribe((consumerSurveyData: any) => {
            if (consumerSurveyData['code'] == "200") {
                this.consumerSurveyData = consumerSurveyData['list'][0];
            }
        })
    }

    getConsumerDemandData() {
        this.consumerApplicationService.getConsumerDemandData(this.consumerApplicationDetail?.consumerApplicationId).subscribe((consumerDemandData: any) => {
            if (consumerDemandData['code'] == "200") {
                this.consumerDemandData = consumerDemandData['list'][0];
            }
        })
    }

    getGeoLocationData() {
        this.consumerApplicationService.getGeoLocationData(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((geoLocationData: any) => {
            console.log('geoLocationData', geoLocationData);
            if (geoLocationData['code'] == "200") {
                this.geoLocationData = geoLocationData['list'][0];
            }

        })
    }

    getApplicationDocumentData() {
        this.consumerApplicationService.getApplicationDocumentData(this.consumerApplicationDetail.consumerApplicationId).subscribe((applicationDocumentData: any) => {
            console.log('applicationDocumentData', applicationDocumentData);
            if (applicationDocumentData['code'] == "200") {
                this.applicationDocumentData = applicationDocumentData['list'][0];
                console.log('applicationDocumentData:>-  !!!', applicationDocumentData);
                console.log(applicationDocumentData, "applicationDocumentData..................................");

                if (this.consumerApplicationDetail?.natureOfWorkTypeId == 1) {
                    if (this.applicationDocumentData?.docGst != null) {
                        this.docDropdownArray = [
                            {
                                "name": "Gst File",
                                "value": this.applicationDocumentData?.docGst
                            }
                        ]
                        console.log(this.docDropdownArray, " this.docDropdownArray....");
                    } else {
                        this.docDropdownArray = [];
                        console.log(this.docDropdownArray, " this.docDropdownArray....");
                    }

                } else if (this.consumerApplicationDetail?.natureOfWorkTypeId == 2) {
                    if (this.applicationDocumentData?.docGst != null) {
                        this.docDropdownArray = [
                            {
                                "name": "Gst File",
                                "value": this.applicationDocumentData?.docGst
                            }
                        ]
                        console.log(this.docDropdownArray, " this.docDropdownArray....");
                    } else {
                        this.docDropdownArray = [];
                        console.log(this.docDropdownArray, " this.docDropdownArray....");
                    }

                } else if (this.consumerApplicationDetail?.natureOfWorkTypeId == 3) {
                    if (this.applicationDocumentData?.docGst != null) {
                        this.docDropdownArray = [
                            {
                                "name": "T&CP PERMISSION FILE",
                                "value": this.applicationDocumentData?.docT$cpPermission
                            },
                            {
                                "name": "RERA PERMISSION FILE",
                                "value": this.applicationDocumentData?.docReraPermission
                            },
                            {
                                "name": "Gst File",
                                "value": this.applicationDocumentData?.docGst
                            }
                        ]
                        console.log(this.docDropdownArray, " this.docDropdownArray....");
                    } else {
                        this.docDropdownArray = [
                            {
                                "name": "T&CP PERMISSION FILE",
                                "value": this.applicationDocumentData?.docT$cpPermission
                            },
                            {
                                "name": "RERA PERMISSION FILE",
                                "value": this.applicationDocumentData?.docReraPermission
                            }
                        ];
                        console.log(this.docDropdownArray, " this.docDropdownArray....");
                    }

                } else if (this.consumerApplicationDetail?.natureOfWorkTypeId == 4) {
                    if (this.applicationDocumentData?.docGst != null) {
                        if (this.applicationDocumentData?.docGroup != null) {
                            this.docDropdownArray = [
                                {
                                    "name": "Registery File",
                                    "value": this.applicationDocumentData?.docRegistry
                                },
                                {
                                    "name": "NOC File",
                                    "value": this.applicationDocumentData?.docNoc
                                },
                                {
                                    "name": "Group Permission File",
                                    "value": this.applicationDocumentData?.docGroup
                                },
                                {
                                    "name": "Gst File",
                                    "value": this.applicationDocumentData?.docGst
                                }
                            ]
                            console.log(this.docDropdownArray, " this.docDropdownArray....");

                        } else {
                            this.docDropdownArray = [
                                {
                                    "name": "Registery File",
                                    "value": this.applicationDocumentData?.docRegistry
                                },
                                {
                                    "name": "NOC File",
                                    "value": this.applicationDocumentData?.docNoc
                                },
                                {
                                    "name": "GstFile",
                                    "value": this.applicationDocumentData?.docGst
                                }
                            ]
                            console.log(this.docDropdownArray, " this.docDropdownArray....");
                        }

                    } else {
                        if (this.applicationDocumentData?.docGroup != null) {
                            this.docDropdownArray = [
                                {
                                    "name": "Registery File",
                                    "value": this.applicationDocumentData?.docRegistry
                                },
                                {
                                    "name": "NOC File",
                                    "value": this.applicationDocumentData?.docNoc
                                },
                                {
                                    "name": "Group Permission File",
                                    "value": this.applicationDocumentData?.docGroup
                                }
                            ];
                            console.log(this.docDropdownArray, " this.docDropdownArray....");
                        } else {
                            this.docDropdownArray = [
                                {
                                    "name": "Registery File",
                                    "value": this.applicationDocumentData?.docRegistry
                                },
                                {
                                    "name": "NOC File",
                                    "value": this.applicationDocumentData?.docNoc
                                }
                            ];
                            console.log(this.docDropdownArray, " this.docDropdownArray....");
                        }

                    }

                } else if (this.consumerApplicationDetail?.natureOfWorkTypeId == 5) {
                    if (this.applicationDocumentData?.docGst != null) {
                        this.docDropdownArray = [
                            {
                                "name": "KHASRA KHATONI FILE",
                                "value": this.applicationDocumentData?.docKhasraKhatoni
                            },
                            {
                                "name": "Gst File",
                                "value": this.applicationDocumentData?.docGst
                            }
                        ]
                        console.log(this.docDropdownArray, " this.docDropdownArray....");
                    } else {
                        this.docDropdownArray = [
                            {
                                "name": "KHASRA KHATONI FILE",
                                "value": this.applicationDocumentData?.docKhasraKhatoni
                            }
                        ];
                        console.log(this.docDropdownArray, " this.docDropdownArray....");
                    }

                } else if (this.consumerApplicationDetail?.natureOfWorkTypeId == 6) {
                    if (this.applicationDocumentData?.docGst != null) {
                        this.docDropdownArray = [
                            {
                                "name": "Administrative Section Along with Order",
                                "value": this.applicationDocumentData?.docAdministrative
                            },
                            {
                                "name": "GstFile",
                                "value": this.applicationDocumentData?.docGst
                            }
                        ]
                        console.log(this.docDropdownArray, " this.docDropdownArray....");
                    } else {
                        this.docDropdownArray = [
                            {
                                "name": "Administrative Section Along with Order",
                                "value": this.applicationDocumentData?.docAdministrative
                            }
                        ];
                        console.log(this.docDropdownArray, " this.docDropdownArray....");
                    }

                } else if (this.consumerApplicationDetail?.natureOfWorkTypeId == 10) {
                    if (this.applicationDocumentData?.docGst != null) {
                        this.docDropdownArray = [
                            {
                                "name": "Approve Map Document",
                                "value": this.applicationDocumentData?.docMap
                            },
                            {
                                "name": "Load Sheet Document",
                                "value": this.applicationDocumentData?.docLoadSheet
                            },
                            {
                                "name": "GstFile",
                                "value": this.applicationDocumentData?.docGst
                            }
                        ]
                        console.log(this.docDropdownArray, " this.docDropdownArray....");
                    } else {
                        this.docDropdownArray = [
                            {
                                "name": "Approve Map Document",
                                "value": this.applicationDocumentData?.docMap
                            },
                            {
                                "name": "Load Sheet Document",
                                "value": this.applicationDocumentData?.docLoadSheet
                            },
                        ];
                        console.log(this.docDropdownArray, " this.docDropdownArray....");
                    }

                }
                else if (this.consumerApplicationDetail?.natureOfWorkTypeId == 7) {
                    if (this.applicationDocumentData?.docGst != null) {
                        this.docDropdownArray = [
                            {
                                "name": "Energy Bill File",
                                "value": this.applicationDocumentData?.docEnergyBillFile
                            },
                            {
                                "name": "GstFile",
                                "value": this.applicationDocumentData?.docGst
                            }
                        ]
                        console.log(this.docDropdownArray, " this.docDropdownArray....");
                    } else {
                        this.docDropdownArray = [
                            {
                                "name": "Energy Bill File",
                                "value": this.applicationDocumentData?.docEnergyBillFile
                            }
                        ];
                        console.log(this.docDropdownArray, " this.docDropdownArray....");
                    }

                }
            } else {
                this.applicationDocumentData = null;
            }
        })
    }


    /////////////  Administrative file download ********************************////////************************ Start ***//////////////
    getDownloaddocAdministrativeFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docAdministrative.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        // console.log(filePathWithForwardSlashes);
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes);
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
    }
    /////////////  Administrative file download ********************************////////************************ end ***//////////////

    //////////////// Estimate file Download *********************************//////////////////*********start************************ */
    getDownloaddocEstimateFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docEstimate.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
    }
    //////////////// Estimate file Download *********************************//////////////////*************end************************ */

    /////////////  Noc file download ********************************////////************************ end ***//////////////
    getDownloaddocNocFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docNoc.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        // console.log(filePathWithForwardSlashes);
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
    }
    /////////////  Noc file download ********************************////////************************ end ***//////////////

    /////////////  Registry file download ********************************////////************************ end ***//////////////
    getDownloaddocRegistryFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docRegistry.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        // console.log(filePathWithForwardSlashes);
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
    }
    /////////////  Registry file download ********************************////////************************ end ***//////////////

    /////////////  ReraPermission file download ********************************////////************************ end ***//////////////
    getDownloaddocReraPermissionFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docReraPermission.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        // console.log(filePathWithForwardSlashes);
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
    }
    /////////////  ReraPermission file download ********************************////////************************ end ***//////////////

    /////////////  docT$cpPermission file download ********************************////////************************ end ***//////////////
    getDownloaddocT$cpPermissionFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docT$cpPermission.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        // console.log(filePathWithForwardSlashes);
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
    }
    /////////////  docT$cpPermission file download ********************************////////************************ end ***//////////////

    /////////////  docKhasraKhatoni file download ********************************////////************************ end ***//////////////
    getDownloaddocKhasraKhatoniFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docKhasraKhatoni.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        // console.log(filePathWithForwardSlashes);
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
    }
    /////////////  docKhasraKhatoni file download ********************************////////************************ end ***//////////////

    ///////////////////////////// group Permission file ************************///////////////**************start ///////////////////// */
    getDownloaddocGroupFile() {
        let filePathWithBackslashes = this.applicationDocumentData.docGroup.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        // console.log(filePathWithForwardSlashes);
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
    }
    ///////////////////////////// group Permission file ************************///////////////**************end ///////////////////// */

    ///////////////////////////// samagra file ************************///////////////**************end ///////////////////// */
    getDownloaddocSamagraFile() {

        let filePathWithBackslashes = this.applicationDocumentData.docSamagraFile.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)

    }

    getDownloaddocLoadSheetFile() {
        let filePathWithBackslashes = this.applicationDocumentData?.docLoadSheet?.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
    }

    getDownloaddocMapFile() {
        let filePathWithBackslashes = this.applicationDocumentData?.docMap?.documentPath;
        let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
        window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
    }
    ///////////////////////////// samagra file ************************///////////////**************end ///////////////////// */


    loadForm() {
        this.dcAcceptanceFg = this.fb.group({
            consumerApplicationId: [this.consumerApplicationId, Validators.compose([Validators.required])],
            changedDcId: [''],
            districtId: [''],
            dcChanged: ['', Validators.compose([Validators.required])],
            dcChangedReason: [''],
            fileSelection: [''],
            FaultApplicationFieldName: ['']
            // scheduleSurveyDate: [''],
            // scheduleSurveyTime: [''],
            // surveyorName: [''],
            // surveyorMobile: ['']
        });
    }

    onFileSelection(e: any) {
        console.log(e.value, "file ssellleectttteddd........................");
        this.selectedDocArray = e.value;
        console.log(this.selectedDocArray, "this.selectedDocArray.....????????????");



    }

    onFaultSelection(e: any) {
        console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee..............");
        // this.dcAcceptanceFg.controls['FaultApplicationFieldName'].setValue(e.value);
        console.log(this.dcAcceptanceFg, "this.dcAcceptanceFg................................................");
        let arr = e.value;
        if (arr.length == 0) {
            this.natureOfWorkTypeSelectedboolean = false;
            this.schemeTypeSelectedBoolean = false;
            this.groupOrIndividualSelectedBoolean = false;
            this.nameAndAddressSelectedBoolean = false;
            this.nameAndAddressAndMobileNumberBoolean = false;
            this.applicationStatusSelectedBoolean = false;
        } else {
            this.natureOfWorkTypeSelectedboolean = false;
            this.schemeTypeSelectedBoolean = false;
            this.groupOrIndividualSelectedBoolean = false;
            this.nameAndAddressSelectedBoolean = false;
            this.nameAndAddressAndMobileNumberBoolean = false;
            this.applicationStatusSelectedBoolean = false;

            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == 1) {
                    this.natureOfWorkTypeSelectedboolean = true;
                } else if (arr[i] == 2) {
                    this.schemeTypeSelectedBoolean = true;
                } else if (arr[i] == 3) {
                    this.groupOrIndividualSelectedBoolean = true
                } else if (arr[i] == 4) {
                    this.nameAndAddressSelectedBoolean = true
                } else if (arr[i] == 5) {
                    this.nameAndAddressAndMobileNumberBoolean = true
                } else if (arr[i] == 6) {
                    this.applicationStatusSelectedBoolean = true
                } else {
                    this.natureOfWorkTypeSelectedboolean = false;
                    this.schemeTypeSelectedBoolean = false;
                    this.groupOrIndividualSelectedBoolean = false;
                    this.nameAndAddressSelectedBoolean = false;
                    this.nameAndAddressAndMobileNumberBoolean = false;
                    this.applicationStatusSelectedBoolean = false;




                }
            }


            console.log(this.dcAcceptanceFg, "this.dcAcceptanceFg");

        }





        // [
        //     { 'id': 1, 'name': 'Nature Of Work Type' },
        //     { 'id': 2, 'name': 'Scheme Type' },
        //     { 'id': 3, 'name': 'Group/Individual' },
        //     { 'id': 4, 'name': 'Name & Address' },
        //     { 'id': 5, 'name': 'Name , Address & Mobile Number' },
        //     { 'id': 6, 'name': 'Application Status' },

        // ]


    }

    get applicationDcAcceptanceFormControls() {
        return this.dcAcceptanceFg.controls;
    }


    onChangeSelectedDistrictType(value) {
        console.log(
            "onChangeSelectedDistrictType",
            "get distribution list by district id",
            value.value.districtId
        );
        this.varonChangeSelectedDistrictType = value.value;
        if (value.value.districtId) {
            this.districtIdnew = value.value.districtId
            this.dcAcceptanceFg.value.dcId = '';
            this.consumerApplicationService
                .getDistributionByID(value.value.districtId)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe((data) => {
                    this.dcList = data["list"][0];
                });
        } else {
            this.dcList = null;
        }
    }


    onDcChangedChange(ob: MatRadioChange) {


        let mrButton: MatRadioButton = ob.source;
        console.log(mrButton.value, "mrButton........mrButton......sssssssssssssssssssssssssssssssssssssssskkkkkkkkkkkkkkkkkkkkkk...??????");

        if (mrButton.value == "true") { // districtId
            // this.faultApplicationFieldName
            // this.DcAcceptanceModel.faultApplicationFieldName = false;
            this.dcAcceptanceFg.controls['changedDcId'].setValidators(Validators.compose([Validators.required]));
            this.dcAcceptanceFg.controls['districtId'].setValidators(Validators.compose([Validators.required]));
            this.dcAcceptanceFg.controls['dcChangedReason'].setValidators(Validators.compose([Validators.required]));
            this.dcAcceptanceFg.controls['fileSelection'].disable();
            this.dcAcceptanceFg.controls['fileSelection'].reset();

            this.dcAcceptanceFg.controls['fileSelection'].clearValidators;
            this.dcAcceptanceFg.controls['changedDcId'].updateValueAndValidity();
            this.dcAcceptanceFg.controls['districtId'].updateValueAndValidity();
            this.dcAcceptanceFg.controls['dcChangedReason'].updateValueAndValidity();
            // this.dcAcceptanceFg.controls['fileSelection'].setValue('');
            this.dcAcceptanceFg.controls['fileSelection'].updateValueAndValidity();
            this.dcAcceptanceFg.controls['FaultApplicationFieldName'].clearValidators()
            this.dcAcceptanceFg.controls['FaultApplicationFieldName'].setValue('');
            this.dcAcceptanceFg.controls['FaultApplicationFieldName'].updateValueAndValidity();
            this.FileSelectionFieldNotShowBoolean = false;
            console.log(this.dcAcceptanceFg, "this.dcAcceptanceFg");
        } else if (mrButton.value == "false") {
            // this.DcAcceptanceModel.faultApplicationFieldName = false;
            this.dcAcceptanceFg.controls['fileSelection'].clearValidators;
            this.dcAcceptanceFg.controls['fileSelection'].disable();
            this.dcAcceptanceFg.controls['fileSelection'].reset();
            this.dcAcceptanceFg.controls['changedDcId'].clearValidators();
            this.dcAcceptanceFg.controls['districtId'].clearValidators();
            this.dcAcceptanceFg.controls['dcChangedReason'].clearValidators();
            this.dcAcceptanceFg.controls['dcChangedReason'].setValue('');
            this.dcAcceptanceFg.controls['changedDcId'].setValue('');
            this.dcAcceptanceFg.controls['changedDcId'].updateValueAndValidity();
            this.dcAcceptanceFg.controls['districtId'].setValue('');
            this.dcAcceptanceFg.controls['districtId'].updateValueAndValidity();
            this.dcAcceptanceFg.controls['dcChangedReason'].updateValueAndValidity();
            this.dcAcceptanceFg.controls['fileSelection'].updateValueAndValidity();
            this.dcAcceptanceFg.controls['FaultApplicationFieldName'].clearValidators()
            this.dcAcceptanceFg.controls['FaultApplicationFieldName'].setValue('');
            this.dcAcceptanceFg.controls['FaultApplicationFieldName'].updateValueAndValidity();
            this.FileSelectionFieldNotShowBoolean = false;
            console.log(this.dcAcceptanceFg, "this.dcAcceptanceFg");
        } else if (mrButton.value == "shift") {

            if (this.consumerApplicationDetail?.natureOfWorkTypeId == 1 && this.applicationDocumentData?.docGst == null) {
                this.dcAcceptanceFg.controls['fileSelection'].disable();
                this.dcAcceptanceFg.controls['fileSelection'].reset();
                this.dcAcceptanceFg.controls['fileSelection'].clearValidators;
                this.dcAcceptanceFg.controls['changedDcId'].clearValidators();
                this.dcAcceptanceFg.controls['districtId'].clearValidators();
                this.dcAcceptanceFg.controls['dcChangedReason'].clearValidators();
                this.dcAcceptanceFg.controls['dcChangedReason'].setValue('');
                this.dcAcceptanceFg.controls['changedDcId'].setValue('');
                this.dcAcceptanceFg.controls['changedDcId'].updateValueAndValidity();
                this.dcAcceptanceFg.controls['districtId'].setValue('');
                this.dcAcceptanceFg.controls['districtId'].updateValueAndValidity();
                this.dcAcceptanceFg.controls['dcChangedReason'].updateValueAndValidity();
                this.dcAcceptanceFg.controls['fileSelection'].updateValueAndValidity();
                this.dcAcceptanceFg.controls['FaultApplicationFieldName'].clearValidators()
                this.dcAcceptanceFg.controls['FaultApplicationFieldName'].setValue('');
                this.dcAcceptanceFg.controls['FaultApplicationFieldName'].updateValueAndValidity();
                this.notificationService.warn("No Document Required for this Application");
                this.FileSelectionFieldNotShowBoolean = true;
                return
            }
            else if (this.consumerApplicationDetail?.natureOfWorkTypeId == 2 && this.applicationDocumentData?.docGst == null && this.applicationDocumentData?.docGroup == null) {
                this.dcAcceptanceFg.controls['fileSelection'].disable();
                this.dcAcceptanceFg.controls['fileSelection'].reset();
                this.dcAcceptanceFg.controls['fileSelection'].clearValidators;
                this.dcAcceptanceFg.controls['changedDcId'].clearValidators();
                this.dcAcceptanceFg.controls['districtId'].clearValidators();
                this.dcAcceptanceFg.controls['dcChangedReason'].clearValidators();
                this.dcAcceptanceFg.controls['dcChangedReason'].setValue('');
                this.dcAcceptanceFg.controls['changedDcId'].setValue('');
                this.dcAcceptanceFg.controls['changedDcId'].updateValueAndValidity();
                this.dcAcceptanceFg.controls['districtId'].setValue('');
                this.dcAcceptanceFg.controls['districtId'].updateValueAndValidity();
                this.dcAcceptanceFg.controls['dcChangedReason'].updateValueAndValidity();
                this.dcAcceptanceFg.controls['fileSelection'].updateValueAndValidity();
                this.dcAcceptanceFg.controls['FaultApplicationFieldName'].clearValidators()
                this.dcAcceptanceFg.controls['FaultApplicationFieldName'].setValue('');
                this.dcAcceptanceFg.controls['FaultApplicationFieldName'].updateValueAndValidity();
                this.notificationService.warn("No Document Required for this Application");
                this.FileSelectionFieldNotShowBoolean = true;
                return
            } else {
                this.dcAcceptanceFg.controls['fileSelection'].setValidators(Validators.required);
                this.dcAcceptanceFg.controls['fileSelection'].enable();
                this.dcAcceptanceFg.controls['fileSelection'].reset();
                this.dcAcceptanceFg.controls['changedDcId'].clearValidators();
                this.dcAcceptanceFg.controls['districtId'].clearValidators();
                this.dcAcceptanceFg.controls['dcChangedReason'].clearValidators();
                this.dcAcceptanceFg.controls['dcChangedReason'].setValue('');
                this.dcAcceptanceFg.controls['changedDcId'].setValue('');
                this.dcAcceptanceFg.controls['changedDcId'].updateValueAndValidity();
                this.dcAcceptanceFg.controls['districtId'].setValue('');
                this.dcAcceptanceFg.controls['districtId'].updateValueAndValidity();
                this.dcAcceptanceFg.controls['dcChangedReason'].updateValueAndValidity();
                this.dcAcceptanceFg.controls['fileSelection'].updateValueAndValidity();
                this.dcAcceptanceFg.controls['FaultApplicationFieldName'].clearValidators()
                this.dcAcceptanceFg.controls['FaultApplicationFieldName'].setValue('');
                this.dcAcceptanceFg.controls['FaultApplicationFieldName'].updateValueAndValidity();
                this.FileSelectionFieldNotShowBoolean = false;
            }

            //  this.DcAcceptanceModel.faultApplicationFieldName = false;

            console.log(this.dcAcceptanceFg, "this.dcAcceptanceFg");
        } else if (mrButton.value == "faultApplication") {
            //   this.DcAcceptanceModel.faultApplicationFieldName = true
            this.dcAcceptanceFg.controls['FaultApplicationFieldName'].setValidators(Validators.required);
            this.dcAcceptanceFg.controls['FaultApplicationFieldName'].enable();
            // this.dcAcceptanceFg.controls['FaultApplicationFieldName'].reset();
            this.dcAcceptanceFg.controls['FaultApplicationFieldName'].updateValueAndValidity();
            this.dcAcceptanceFg.controls['fileSelection'].clearValidators();
            this.dcAcceptanceFg.controls['fileSelection'].disable();
            this.dcAcceptanceFg.controls['fileSelection'].reset();
            this.dcAcceptanceFg.controls['changedDcId'].clearValidators();
            this.dcAcceptanceFg.controls['districtId'].clearValidators();
            this.dcAcceptanceFg.controls['dcChangedReason'].clearValidators();
            this.dcAcceptanceFg.controls['dcChangedReason'].setValue('');
            this.dcAcceptanceFg.controls['changedDcId'].setValue('');
            this.dcAcceptanceFg.controls['changedDcId'].updateValueAndValidity();
            this.dcAcceptanceFg.controls['districtId'].setValue('');
            this.dcAcceptanceFg.controls['districtId'].updateValueAndValidity();
            this.dcAcceptanceFg.controls['dcChangedReason'].updateValueAndValidity();
            this.dcAcceptanceFg.controls['fileSelection'].updateValueAndValidity();
            this.FileSelectionFieldNotShowBoolean = false;
            console.log(this.dcAcceptanceFg, "this.dcAcceptanceFg");

        }
        else if (mrButton.value == "faultApplicationForMkmy") {
            this.dcAcceptanceFg.controls['fileSelection'].clearValidators();
            // this.dcAcceptanceFg.controls['fileSelection'].enable();
            this.dcAcceptanceFg.controls['fileSelection'].setValue("");
            this.dcAcceptanceFg.controls['changedDcId'].clearValidators();
            this.dcAcceptanceFg.controls['districtId'].clearValidators();
            this.dcAcceptanceFg.controls['dcChangedReason'].clearValidators();
            this.dcAcceptanceFg.controls['dcChangedReason'].setValue('');
            this.dcAcceptanceFg.controls['changedDcId'].setValue('');
            this.dcAcceptanceFg.controls['changedDcId'].updateValueAndValidity();
            this.dcAcceptanceFg.controls['districtId'].setValue('');
            this.dcAcceptanceFg.controls['districtId'].updateValueAndValidity();
            this.dcAcceptanceFg.controls['dcChangedReason'].updateValueAndValidity();
            this.dcAcceptanceFg.controls['fileSelection'].updateValueAndValidity();

            this.dcAcceptanceFg.controls['FaultApplicationFieldName'].clearValidators()
            this.dcAcceptanceFg.controls['FaultApplicationFieldName'].setValue('');
            this.dcAcceptanceFg.controls['FaultApplicationFieldName'].updateValueAndValidity();
            console.log(this.dcAcceptanceFg, "this.dcAcceptanceFg");

            this.mkmyDocForm = this.fb.group({
                samgrFile: [""],
                kkFile: [""]
            })
            this.FileSelectionFieldNotShowBoolean = false;
        }
        else {
            console.log("some other value:  " + ob.value);
            console.log(this.dcAcceptanceFg, "this.dcAcceptanceFg");
        }
    }
    onKKFileSelection(e: any) {
        console.log(e, "e,,,,,,,,,,,,,,,,");
        this.onKKFileSelectionVar = e.target.files[0];
    }

    onSamagraFileSelection(e: any) {
        console.log(e, "eeeeee,,,,,,,,,,");
        this.onSamagraFileSelectionVar = e.target.files[0];
    }

    onMkmyDocSubmit() {
        if (this.mkmyDocForm.invalid) {
            this.notificationService.warn("Invalid Form !");
            return
        } else {
            let formData: FormData = new FormData();
            formData.append("docSamagraFile", this.onSamagraFileSelectionVar)
            formData.append("docKhasraKhatoni", this.onKKFileSelectionVar)
            formData.append("consumerApplicationNo", this.consumerApplicationDetail?.consumerApplicationNo)

            this.consumerApplicationService.uploadMkmyDocuments(formData, this.userToken).subscribe((respo: any) => {
                console.log(respo, "respo..........................................");
                if (respo?.code == "204") {
                    this.notificationService.success(respo?.message);
                    this.documentSubmitBoolean = true;
                } else {
                    this.notificationService.warn(respo?.message);
                    return
                }
            })

        }
    }




    onClose() {
        this.dialogRef.close();
    }


    onSubmit() {

        console.log(this.docDropdownArray, "this.docDropdownArray......mmmmmmmmmmmmmmm");
        console.log(this.selectedDocArray, "selectedDocArray......nnnnnnnnnnnnn");
        console.log(this.applicationDocumentData?.docSamagraFile, "selectedDocArray......nnnnnnnnnnnnn");
        console.log(this.applicationDocumentData?.docKhasraKhatoni, "selectedDocArray......nnnnnnnnnnnnn");
        console.log(this.consumerApplicationDetail?.natureOfWorkTypeId, "selectedDocArray......nnnnnnnnnnnnn");
        if (this.consumerApplicationDetail?.natureOfWorkTypeId == 8 && this.dcAcceptanceFg.get('dcChanged').value != 'true') {
            if ((this.applicationDocumentData?.docSamagraFile == null && this.documentSubmitBoolean == false) || (this.applicationDocumentData?.docKhasraKhatoni == null && this.documentSubmitBoolean == false)) {
                this.notificationService.warn("समग्र और खसरा खतौनी दस्तावेज़ उपलब्ध नहीं हैं। कृपया 'Wrong Document' के विकल्प का चयन कर संबंधित दस्तावेज़ अपलोड करें। !");
                return;
            }
        }

        if (this.dcAcceptanceFg.value.dcChanged == "shift") {

            if (this.selectedDocArray.length == 0) {
                this.notificationService.warn("Please select atleat one Document !");
                return
            }
            let s = []
            for (let i = 0; i < this.docDropdownArray.length; i++) {
                for (let j = 0; j < this.selectedDocArray.length; j++) {
                    if (this.docDropdownArray[i].value?.uploadId == this.selectedDocArray[j].uploadId && this.docDropdownArray[i].docStatus == null) {
                        this.docDropdownArray[i].docStatus = 3
                    }
                }
            }

            for (let k = 0; k < this.docDropdownArray.length; k++) {
                if (this.docDropdownArray[k].docStatus == null) {
                    this.docDropdownArray[k].docStatus = 2

                }
                s.push(
                    {
                        "docFileId": this.docDropdownArray[k].value.uploadId,
                        "docStatus": this.docDropdownArray[k].docStatus
                    }
                )
            }

            console.log(this.docDropdownArray, "yyyyyyyyyyyyyyy", s);
            this.DcAcceptanceModel.rejectFile = s
            this.dcAcceptanceFg.value.dcChanged = false

        } else if (this.dcAcceptanceFg.value.dcChanged == "faultApplication") {
            this.dcAcceptanceFg.value.dcChanged = false;
            this.selectedDocArray = [];
            this.DcAcceptanceModel.rejectFile = null
        } else if (this.dcAcceptanceFg.value.dcChanged == "faultApplicationForMkmy") {
            this.dcAcceptanceFg.value.dcChanged = false;

        }
        else {
            this.selectedDocArray = [];
            this.DcAcceptanceModel.rejectFile = null
        }

        console.log('submit button clicked');
        this.isFormSubmit = true;


        console.log(' before submit -- this.dcAcceptanceFg', this.dcAcceptanceFg);


        this.DcAcceptanceModel.changedDcId = this.dcAcceptanceFg.value.changedDcId;
        this.DcAcceptanceModel.consumerApplicationId = this.dcAcceptanceFg.value.consumerApplicationId
        this.DcAcceptanceModel.dcChanged = this.dcAcceptanceFg.value.dcChanged
        this.DcAcceptanceModel.dcChangedReason = this.dcAcceptanceFg.value.dcChangedReason;

        console.log();

        if (this.dcAcceptanceFg.valid) {
            console.log(' submit -- this.dcAcceptanceFg', this.dcAcceptanceFg);
            if (this.natureOfWorkTypeSelectedboolean == true) {
                console.log("change nature of work type............................");
                this.consumerApplicationService.changeStatusForConsumerUpdate(this.consumerApplicationDetail.consumerApplicationNo, this.userToken).subscribe((data: any) => {
                    console.log(data, "changeStatusForConsumerUpdate...............................");
                    if (data.code == "200" || data.code == "201") {
                        this.notificationService.success(data.message);
                        this.onClose();
                    } else {
                        this.notificationService.warn(data.message);
                        return
                    }
                })
            } else {
                this.getApplicationDocumentDataForCheck();
            }
        } else {
            this.notificationService.error("! invalid Form");
            console.log("abcd");

            return
        }
    }

    getApplicationDocumentDataForCheck() {
        this.consumerApplicationService.getApplicationDocumentData(this.data.row.consumerApplicationId).subscribe((applicationDocumentData: any) => {
            console.log('applicationDocumentData', applicationDocumentData);
            if (applicationDocumentData['code'] == "200" || applicationDocumentData['code'] == "201") {
                this.applicationDocumentData = applicationDocumentData['list'][0];
                console.log('applicationDocumentData:>-  !!!', applicationDocumentData);

                if (applicationDocumentData['list'][0]?.consumerApplicationDetail?.natureOfWorkTypeId == 2 && applicationDocumentData['list'][0]?.consumerApplicationDetail?.individualOrGroup == null) {
                    this.notificationService.warn("Please Select Individual/Group First");
                    return;
                } else if (applicationDocumentData['list'][0]?.consumerApplicationDetail?.natureOfWorkTypeId == 2 && applicationDocumentData['list'][0]?.consumerApplicationDetail?.individualOrGroup?.individualOrGroupId == 2 && applicationDocumentData['list'][0]?.docGroup == null) {
                    this.notificationService.warn("Group file is required !");
                    return
                } else {

                    this.consumerApplicationService.saveDcAcceptanceData(this.DcAcceptanceModel).subscribe(
                        data => {
                            console.log(data);
                            if (data['code'] == "201" || data['code'] == "200") {
                                this.acceptanceBoolean = true;
                                this.notificationService.success(data['message']);
                                this.onClose();
                            } else {
                                this.acceptanceBoolean = false
                                this.notificationService.error(data['message']);
                                return
                            }
                        });
                }


            } else {
                if (this.consumerApplicationDetail?.natureOfWorkTypeId == 8) {
                    this.consumerApplicationService.saveDcAcceptanceData(this.DcAcceptanceModel).subscribe(
                        data => {
                            console.log(data);
                            if (data['code'] == "201" || data['code'] == "200") {
                                this.acceptanceBoolean = true;
                                this.notificationService.success(data['message']);
                                this.onClose();
                            } else {
                                this.acceptanceBoolean = false
                                this.notificationService.error(data['message']);
                                return
                            }
                        });
                }
                this.applicationDocumentData = null;
            }
        })
    }




    async ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }


}
