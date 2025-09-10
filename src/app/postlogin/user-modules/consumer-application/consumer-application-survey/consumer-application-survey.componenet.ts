import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Inject, OnDestroy, ɵConsole, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { NewApplicationService } from 'src/app/postlogin/consumer-modules/services/new-application.service';
import { CrudType } from 'src/app/shared-enum/crudType';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { checkBoxChoose } from '../../models/checkBoxChoose';
import { SubmitFormArraySurvey } from '../../models/surveyFormArraySubmitModel';
import { FormArrayPayload } from '../../models/FinalPayLoadForFormArrayOfSurveyModel';
import { MkmySurveyPayload } from '../../models/mkmySurveyModel';
import { MkmyUpdatePayload } from '../../models/mkmyUpdatePayloadModel';
import { MkmyIndiv } from '../../models/mkmyIndiv';
import { AavedakKaPrakarConfirmationByDGM } from '../../models/aavedakKaPrakarConfirmationByDGM';


@Component({
    selector: 'consumer-application-survey',
    templateUrl: './consumer-application-survey.component.html',
    styleUrls: ['./consumer-application-survey.component.css']
})
export class ConsumerApplicationSurveyComponent implements OnInit, OnDestroy {
    LoadConfirmationForm: FormGroup;
    nscLoadEnhancementOytForm: FormGroup;
    LoadConfirmationForColonyIllegalForm: FormGroup;
    selectForm: FormGroup;
    selectFormForMkmy: FormGroup
    mkmyIndivBoolean: boolean = false
    empForm: FormGroup;
    empFormForMkmy: FormGroup
    mkmySurveyForm: FormGroup;
    mkmyIndivForm: FormGroup
    LineShiftingReturnAmountForm: FormGroup
    displayinputfield: boolean = false;
    displayinputfieldForMkmy: boolean = false;
    displayInputFieldVal: any;
    displayInputFieldValForMkmy: any
    submitGroupVar: boolean = false;
    distanceBoolean: boolean = false
    closeWrittenDiv: boolean = false;
    ShowingErrorValForOtherButtonsCheckforMkmy: boolean = false;
    mkmyApplicationDetails: any;
    individualOrGroupIdVariable: number = 0;
    ParentApplicationBoolean: boolean = false;
    submitted: boolean = false;
    submittedGenerateBlock: boolean = false;
    MkmyUpdateForm: FormGroup;
    dcResponseArray: any;
    districtResponseArray: any;
    MkmyUpdatePayload: MkmyUpdatePayload = new MkmyUpdatePayload();
    mkmyIndiv: MkmyIndiv = new MkmyIndiv();
    checkUpdateBoolean: boolean = false;
    mainApplicationUpdatedLoadRequested: any;
    mkmyValidatedBoolean: boolean = false;
    varonChangeSelectedDistrictType: any;
    districtIdnew: any;
    castValue: boolean = false;
    casttList: Array<any> = [
        { name: 'GENERAL' },
        { name: 'OBC' },
        { name: 'SC' },
        { name: 'ST' },
    ]

    displayInputFieldArray: Array<any> = [
        {
            id: 1, name: "Individual"
        },
        {
            id: 2, name: "Group"
        }
    ];

    displayInput: boolean = false;
    displayInputMkmy: boolean = false;
    samgraInputNumber: string = "";
    FormArrayBooleanVariable: boolean = false;
    FormArrayBooleanVariableOfMkmy: boolean = false;
    listOfFormArray: Array<any> = [];
    //   displayinputfield: boolean = false;
    // radioButtonForm: FormGroup;
    // rdVal:boolean = false;
    rdPopup: boolean = false;
    unsubscribe$: Subject<void> = new Subject();
    consumerApplicationDetail: any;
    consumerSurveyData: any;
    file: File;
    erpConfirmationVariable: boolean = false;
    mkmyerpConfirmationVariable: boolean = false;
    fietypeValidators: boolean = false;
    filesizeValidators: boolean = false;
    mkmyFile: any;
    mkmyFietypeValidators: boolean = false;
    mkmyFilesizeValidators: boolean = false;
    userRoles: Array<any> = [];
    applicationServeyFg: FormGroup;
    applicationServeyErpFg: FormGroup;
    mkmyValidatedFormForErpEstimate: FormGroup;
    applicationServeyErpFgOfMkmy: FormGroup
    erpNoOfMkmyVariable: any
    applicationServeyCheckBoxFg: FormGroup;
    userApplicationUrl: string = this.url.userApplicationUrl;
    userContextPath: string = this.url.userContextPath
    // userSurveyUrl: string = this.url.userSurveyUrl;
    isChecked: boolean = false;
    checkBoxValuecheck: checkBoxChoose = new checkBoxChoose();
    loadConfirmationBoolean: boolean = false;
    ExtraaButtonValidationCheck: boolean = false;
    // LineShiftingReturnAmountFormBoolean: boolean = false;
    ReturnAmtBooleanOpen: Boolean = false;
    loadPatchValue = 0;
    loadAddupVar: any;
    ParentFinalLoad: any

    maxDate = new Date();
    minDate = new Date();
    userDataAll: any;
    groupPeopleCommonFile: any;
    closeLoadUnitDiv: boolean = false

    consumerDemandData: any
    geoLocationData: any
    applicationDocumentData: any
    maskAadhaarNo: string = null;

    @ViewChild('surveyDoc') surveyDocElement: ElementRef;

    isFormSubmitForColonyIllegal: boolean = false;

    // isRejected;

    surveyRequired: boolean = true;
    surveyUploaded: boolean = false;

    surveyFileName: string = 'Select Survey File... ';

    surveyDoc;
    crudType = this.data.crudType;

    userSurveyUrl: string = this.url.userSurveyUrl;

    consumerApplicationId = this.data.consumerApplicationId;

    // charitra code
    NatureOfworkTypeList: Array<any> = [];
    natureofitemslist: Array<any> = [5];
    EstimateStatusList: Array<any> = [];
    EstimateAmount: any;
    erpEstimateDataForMkmyArray = [];
    ShowingErrorVal: boolean = false;
    ShowingErrorValForOtherButtonsCheck: boolean = false;

    NscSubmitBoolean: boolean = false;
    mkmySubmitBoolean: boolean = false;
    ShowingErrorValForOtherButtonsCheckForNsc: boolean = false

    SubmitFormArraySurvey: SubmitFormArraySurvey = new SubmitFormArraySurvey();
    groupCommonFileBoolean: boolean = false;
    FormArrayPayload: FormArrayPayload = new FormArrayPayload();
    ChooseGroupSubmit: boolean = false;
    MkmySurveyPayload: MkmySurveyPayload = new MkmySurveyPayload();
    storedErpNo: any

    oytFormArrayForm: FormGroup;
    oytGrouporIndividualSelectVariable: any;
    empOytForm: FormGroup;
    displayInputOyt: boolean = false;
    userToken: any;
    consumerDetails: any;


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
    paymentView: any;
    // charitra code end



    radioButtonBoolean: boolean = false;
    isFormSubmit: boolean = false
    khojeButtonBoolean: boolean = false;

    constructor(
        private spinnerService: SpinnerService,
        private url: GenerateUrl,
        private http: HttpClient,
        private fb: FormBuilder,
        private consumerApplicationService: ConsumerApplicationService,
        private notificationService: NotificationService,
        private newApplicationService: NewApplicationService,


        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ConsumerApplicationSurveyComponent>,
    ) {
        let abc = sessionStorage.getItem('accessLeveOfUser');
        let xyz = JSON.parse(abc);
        console.log(xyz, "xxxxxxxxxxxxxyyyyyyyyyyyyyyyzzzzzzzzzzzzzz///////////////////");
        this.userDataAll = xyz;

        console.log(this.data, "ryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy%%%%%%%%%%%%%yyyyyyyyyyyyyyyy");

        this.consumerApplicationDetail = this.data.row;
        this.empOytForm = this.fb.group({
            employeesOyt: this.fb.array([])
        });

        let token = sessionStorage.getItem('consumertoken');
        this.userToken = token;


        //  forr Nature of work change ***************************************************************************
        this.changeNatureofWorkAndSchemeTypeForm = this.fb.group({
            // natureOfWorkType: [''],
            natureOfWorkTypeId: [''],
            schemeTypeId: ['']
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
        // this.getApplicationStatus()
        this.consumerApplicationStatusChangeForm = this.fb.group({
            applicationStatusId: ['']
        })

        // for Group Or Individual 
        this.consumerApplicationIndividualOrGroupChangeForm = this.fb.group({
            groupOrIndividual: ['']
        })

        // for change name and address
        this.consumerNameAndAddressChangeForm = this.fb.group({
            name: [''],
            address: ['']
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

    oytFormArrayFormBuild() {
        this.oytFormArrayForm = this.fb.group({
            individualOrGroupIdName: [''],
            count: ['']
        })
    }

    onSelectgroupOrIndividual(e: any) {
        console.log(e, "eeeeeeeeeeeeeeeeeeeee.......................");


        this.oytGrouporIndividualSelectVariable = e.target.value;


    }



    get employeesOyt(): FormArray {
        return this.empOytForm.get('employeesOyt') as FormArray;
    }


    addOytEmployee() {
        const employeeFormGroup = this.fb.group({
            samagraId: ["", Validators.required],
            consumerName: ["abc", Validators.required],
            guardianName: ["", Validators.required],
            khasraNo: ["", Validators.required],
            loadRequested: ["", Validators.required]
        });

        // Add the new form group to the form array
        this.employeesOyt.push(employeeFormGroup);

        console.log(this.employeesOyt, "this.employeesOyt........................");

    }

    Oytremove(empIndex: number) {
        this.employeesOyt.removeAt(empIndex);
    }

    onGenerate() {
        this.addOytEmployee();
        console.log(this.oytFormArrayForm, "oytFormArrayForm..............");


        const formArray = this.empOytForm.get('employeesOyt') as FormArray;
        while (formArray.length !== 0) {
            formArray.removeAt(0);
        }

        // this.employees().reset();
        // this.displayinputfield = false;
        // alert(this.selectForm.value.numberofgroup);
        if (this.oytFormArrayForm.value.count <= 10) {
            this.displayInputOyt = true;
            for (let index = 0; index < this.oytFormArrayForm.value.count; index++) {
                this.addOytEmployee();
            }
        } else {
            this.notificationService.warn("१०  से कम संख्या दर्ज करे");
            return
        }

        this.oytFormArrayForm.value.count = 0;

    }

    ngOnInit() {
        // let oldNoWt: any = this.NatureOfworkTypeList.filter((x: any) => {
        //     return x.natureOfWorkTypeId == this.consumerApplicationDetail?.natureOfWorkTypeId
        // });

        if (this.consumerApplicationDetail?.natureOfWorkTypeId == 5) {
            let y = this.displayInputFieldArray.filter(x => x.id === 1);
            this.displayInputFieldArray = y
        } else {
            let y = this.displayInputFieldArray.filter(x => x.id === 1 || x.id === 2);
            this.displayInputFieldArray = y
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////


        console.log(this.changeNatureofWorkAndSchemeTypeForm, " this.changeNatureofWorkAndSchemeTypeForm..............................");

        this.changeNatureofWorkAndSchemeTypeForm.controls['natureOfWorkTypeId'].setValue(this.consumerApplicationDetail?.natureOfWorkTypeId);
        this.changeNatureofWorkAndSchemeTypeForm.controls['schemeTypeId'].setValue(this.consumerApplicationDetail?.schemeTypeId);
        this.consumerApplicationStatusChangeForm.controls['applicationStatusId'].setValue(this.consumerApplicationDetail?.applicationStatusId);
        this.consumerApplicationIndividualOrGroupChangeForm.controls['groupOrIndividual'].setValue(this.consumerApplicationDetail?.individualOrGroup?.individualOrGroupId)
        this.consumerNameAndAddressChangeForm.controls['name'].setValue(this.consumerApplicationDetail.consumerName);
        this.consumerNameAndAddressChangeForm.controls['address'].setValue(this.consumerApplicationDetail.address);
        this.consumerNameAndAddressAndMobileNumberChangeForm.controls['name'].setValue(this.consumerApplicationDetail.consumerName);
        this.consumerNameAndAddressAndMobileNumberChangeForm.controls['address'].setValue(this.consumerApplicationDetail.address);
        //this.consumerNameAndAddressAndMobileNumberChangeForm.controls['mobNo'].setValue('')
        this.changeNatureofWorkAndSchemeTypeForm.get('natureOfWorkTypeId').disable();
        this.changeNatureofWorkAndSchemeTypeForm.get('schemeTypeId').disable();
        this.consumerApplicationStatusChangeForm.get('applicationStatusId').disable();
        this.consumerApplicationIndividualOrGroupChangeForm.get('groupOrIndividual').disable();
        this.consumerNameAndAddressChangeForm.get('name').disable()
        this.consumerNameAndAddressChangeForm.get('address').disable()
        this.consumerNameAndAddressAndMobileNumberChangeForm.get('name').disable()
        this.consumerNameAndAddressAndMobileNumberChangeForm.get('address').disable();
        this.consumerNameAndAddressAndMobileNumberChangeForm.get('mobNo').disable()

        ///////////////////////////////////////////////////////////////////////////////////////////////////////


        this.LineShiftingReturnAmountForm = this.fb.group({
            returnAmt: ["", [Validators.required, Validators.pattern('^[0-9][0-9]*$')]],
        })
        // this.radioButtonForm = this.fb.group({
        //     rd: ['', Validators.required]
        // })

        this.BuildLoadForm();
        this.BuildFormForColonyIlegalLoad();
        this.BuildNscLoadEnhancementOytForm();
        this.BuildMkmyForm()
        // this.BuildLineShiftingReturnAmountForm();
        this.loadForm();
        this.loadForm1();
        this.loadFormMkmy();
        this.loadFormCheckBox();
        this.oytFormArrayFormBuild();
        // let consumerApplicationData = await this.http.get(this.userApplicationUrl + '/get/' + this.data.consumerApplicationId).toPromise();
        // this.consumerApplicationDetail = consumerApplicationData['list'][0];
        console.log(this.consumerApplicationDetail, "8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888");

        if (this.consumerApplicationDetail != undefined && this.consumerApplicationDetail?.natureOfWorkTypeId == 8) {
            this.consumerApplicationService.getMkmyApplicationDetails(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((resp: any) => {
                console.log(resp, "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwwwwwwwwwwwwwwwww......................");
                if (resp.code == "200") {
                    this.mkmyApplicationDetails = resp.list[0];
                    console.log(this.mkmyApplicationDetails, "this.mkmyApplicationDetails.........................ssssssssssssss");
                    this.MkmyUpdateForm = this.fb.group({
                        address: [this.mkmyApplicationDetails.address, Validators.required],
                        guardianName: [this.mkmyApplicationDetails.guardianName, Validators.required],
                        aadharNo: [this.mkmyApplicationDetails.aadharNo, [Validators.required, Validators.pattern(/^\d{1,12}$/)]],
                        pinCode: [this.mkmyApplicationDetails.pinCode, Validators.required],
                        khasra: [this.mkmyApplicationDetails.khasra, Validators.required],
                        area: [this.mkmyApplicationDetails.area, Validators.required],
                        dcId: ["", Validators.required],
                        loadRequested: [this.mkmyApplicationDetails.loadRequested, Validators.required],
                        districtId: ["", Validators.required],
                        castCategory: [this.mkmyApplicationDetails.castCategory, Validators.required],
                        casteCategory: ['', Validators.required],
                        samagraId: [this.mkmyApplicationDetails.samagraId, Validators.required],
                        shortDescription: [this.mkmyApplicationDetails.shortDescription, Validators.required],
                        // individualOrGroup: [this.mkmyApplicationDetails,Validators.required],
                        loadRequestedId: ["HP", Validators.required],
                        natureOfWork: ["MKMY", Validators.required],
                        consumerName: [this.mkmyApplicationDetails.consumerName, Validators.required],
                        phoneNumber: [this.mkmyApplicationDetails.phoneNumber, Validators.required],
                    })


                    if (this.mkmyApplicationDetails.districtId == null) {
                        this.consumerApplicationService.getDistrictList().subscribe((districtResponse: any) => {
                            console.log(districtResponse, "districtResponse........districtResponse");
                            if (districtResponse.code == "200") {
                                this.districtResponseArray = districtResponse.list
                            }
                        })
                    }


                    if (this.mkmyApplicationDetails.dcId == null && this.mkmyApplicationDetails.districtId == null && this.mkmyApplicationDetails.castCategory == null) {
                        this.MkmyUpdateForm.get('address').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('guardianName').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('aadharNo').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('pinCode').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('khasra').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('area').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('dcId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('loadRequested').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('districtId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('casteCategory').setValidators(Validators.required);
                        this.castValue = true
                        this.MkmyUpdateForm.get('castCategory').clearValidators();
                        this.MkmyUpdateForm.get('samagraId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('shortDescription').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('loadRequestedId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('natureOfWork').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('consumerName').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('phoneNumber').setValidators(Validators.required);

                        this.MkmyUpdateForm.updateValueAndValidity();

                    } else if (this.mkmyApplicationDetails.dcId == null && this.mkmyApplicationDetails.districtId != null && this.mkmyApplicationDetails.castCategory == null) {


                        this.MkmyUpdateForm.get('address').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('guardianName').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('aadharNo').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('pinCode').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('khasra').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('area').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('dcId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('loadRequested').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('districtId').clearValidators();
                        this.MkmyUpdateForm.get('casteCategory').setValidators(Validators.required);
                        this.castValue = true
                        this.MkmyUpdateForm.get('castCategory').clearValidators();
                        this.MkmyUpdateForm.get('samagraId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('shortDescription').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('loadRequestedId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('natureOfWork').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('consumerName').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('phoneNumber').setValidators(Validators.required);

                        this.MkmyUpdateForm.updateValueAndValidity();

                    } else if (this.mkmyApplicationDetails.dcId != null && this.mkmyApplicationDetails.districtId == null && this.mkmyApplicationDetails.castCategory == null) {

                        this.MkmyUpdateForm.get('address').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('guardianName').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('aadharNo').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('pinCode').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('khasra').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('area').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('dcId').clearValidators();
                        this.MkmyUpdateForm.get('loadRequested').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('districtId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('casteCategory').setValidators(Validators.required);
                        this.castValue = true
                        this.MkmyUpdateForm.get('castCategory').clearValidators();
                        this.MkmyUpdateForm.get('samagraId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('shortDescription').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('loadRequestedId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('natureOfWork').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('consumerName').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('phoneNumber').setValidators(Validators.required);

                        this.MkmyUpdateForm.updateValueAndValidity();

                    } else if (this.mkmyApplicationDetails.dcId != null && this.mkmyApplicationDetails.districtId != null && this.mkmyApplicationDetails.castCategory == null) {
                        this.MkmyUpdateForm.get('address').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('guardianName').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('aadharNo').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('pinCode').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('khasra').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('area').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('dcId').clearValidators();
                        this.MkmyUpdateForm.get('loadRequested').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('districtId').clearValidators();
                        this.MkmyUpdateForm.get('casteCategory').setValidators(Validators.required);
                        this.castValue = true
                        this.MkmyUpdateForm.get('castCategory').clearValidators();
                        this.MkmyUpdateForm.get('samagraId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('shortDescription').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('loadRequestedId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('natureOfWork').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('consumerName').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('phoneNumber').setValidators(Validators.required);

                        this.MkmyUpdateForm.updateValueAndValidity();
                    }
                    //////////
                    if (this.mkmyApplicationDetails.dcId == null && this.mkmyApplicationDetails.districtId == null && this.mkmyApplicationDetails.castCategory != null) {
                        this.MkmyUpdateForm.get('address').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('guardianName').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('aadharNo').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('pinCode').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('khasra').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('area').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('dcId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('loadRequested').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('districtId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('casteCategory').clearValidators();
                        this.castValue = false
                        this.MkmyUpdateForm.get('castCategory').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('samagraId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('shortDescription').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('loadRequestedId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('natureOfWork').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('consumerName').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('phoneNumber').setValidators(Validators.required);

                        this.MkmyUpdateForm.updateValueAndValidity();

                    } else if (this.mkmyApplicationDetails.dcId == null && this.mkmyApplicationDetails.districtId != null && this.mkmyApplicationDetails.castCategory != null) {


                        this.MkmyUpdateForm.get('address').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('guardianName').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('aadharNo').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('pinCode').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('khasra').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('area').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('dcId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('loadRequested').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('districtId').clearValidators();
                        this.MkmyUpdateForm.get('casteCategory').clearValidators();
                        this.castValue = false
                        this.MkmyUpdateForm.get('castCategory').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('samagraId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('shortDescription').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('loadRequestedId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('natureOfWork').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('consumerName').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('phoneNumber').setValidators(Validators.required);

                        this.MkmyUpdateForm.updateValueAndValidity();

                    } else if (this.mkmyApplicationDetails.dcId != null && this.mkmyApplicationDetails.districtId == null && this.mkmyApplicationDetails.castCategory != null) {

                        this.MkmyUpdateForm.get('address').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('guardianName').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('aadharNo').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('pinCode').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('khasra').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('area').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('dcId').clearValidators();
                        this.MkmyUpdateForm.get('loadRequested').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('districtId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('casteCategory').clearValidators();
                        this.castValue = false
                        this.MkmyUpdateForm.get('castCategory').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('samagraId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('shortDescription').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('loadRequestedId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('natureOfWork').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('consumerName').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('phoneNumber').setValidators(Validators.required);

                        this.MkmyUpdateForm.updateValueAndValidity();

                    } else if (this.mkmyApplicationDetails.dcId != null && this.mkmyApplicationDetails.districtId != null && this.mkmyApplicationDetails.castCategory != null) {
                        this.MkmyUpdateForm.get('address').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('guardianName').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('aadharNo').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('pinCode').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('khasra').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('area').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('dcId').clearValidators();
                        this.MkmyUpdateForm.get('loadRequested').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('districtId').clearValidators();
                        this.MkmyUpdateForm.get('casteCategory').clearValidators();
                        this.castValue = false
                        this.MkmyUpdateForm.get('castCategory').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('samagraId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('shortDescription').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('loadRequestedId').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('natureOfWork').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('consumerName').setValidators(Validators.required);
                        this.MkmyUpdateForm.get('phoneNumber').setValidators(Validators.required);

                        this.MkmyUpdateForm.updateValueAndValidity();
                    }



                }
            })


        }



        //getMkmyApplicationDetails
        //     this.consumerApplicationDetail.consumerApplicationNo

        const createdDate = moment(this.consumerApplicationDetail['created'], "DD-MM-YYYY").format();
        this.minDate = new Date(createdDate);

        this.applicationServeyFg.get('consumerApplicationId').setValue(this.consumerApplicationDetail?.consumerApplicationId);
        if (this.crudType == CrudType.update) {

            this.consumerApplicationService.getConsumerSurveyData(this.consumerApplicationDetail?.consumerApplicationId).subscribe((consumerSurveyData: any) => {
                console.log('consumerSurveyData', consumerSurveyData);
                if (consumerSurveyData['code'] == "200") {
                    this.consumerSurveyData = consumerSurveyData['list'][0];
                }
            })


            this.loadEditForm(this.consumerSurveyData);
        }



        this.empForm = this.fb.group({
            employees: this.fb.array([]),
        });


        this.selectForm = this.fb.group({
            individualOrGroupId: ["", Validators.required],
            numberofgroup: ["", [Validators.required]],
        });

        this.empFormForMkmy = this.fb.group({
            mkmyLoad: [this.loadPatchValue, Validators.required],  //mkmySurveyForm  //loadConfirmationForMkmy
            KvDistance: ["", Validators.required],
            dtr: ["", Validators.required],
            cutpoint: ["", Validators.required],
            employeesForMkmy: this.fb.array([]),
        });

        //employeesForMkmy
        this.selectFormForMkmy = this.fb.group({
            individualOrGroupId: ["", Validators.required],
            numberofgroup: ["", [Validators.required]],
        });

        this.mkmyValidatedFormForErpEstimate = this.fb.group({
            estimateFile: ["", Validators.required],
            cb: ["", Validators.required]

        })

        this.mkmyIndivFormBuild();

        if (this.consumerApplicationDetail?.natureOfWorkTypeId == 4) {
            if (this.consumerApplicationDetail?.individualOrGroupId == 1) {
                this.LoadConfirmationForColonyIllegalForm.get('jeLoadUnitNew').setValue('KW');
                this.LoadConfirmationForColonyIllegalForm.get('loadConfirmationForColonyIllegal').setValidators([Validators.required, Validators.pattern("^[1-9][0-9]*$"), Validators.max(400)]);
            } else {
                this.LoadConfirmationForColonyIllegalForm.get('jeLoadUnitNew').setValue('KVA');
                this.LoadConfirmationForColonyIllegalForm.get('loadConfirmationForColonyIllegal').setValidators([Validators.required, Validators.pattern("^[1-9][0-9]*$")]);
            }
        }


        if (this.consumerApplicationDetail?.natureOfWorkTypeId != 8) {
            this.getApplicationDocumentData();
        }


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
                this.changeNatureofWorkAndSchemeTypeForm.controls['natureOfWorkTypeId'].setValue(this.consumerApplicationDetail?.natureOfWorkTypeId);
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
            this.changeNatureofWorkAndSchemeTypeForm.get('natureOfWorkTypeId').enable();
            this.changeNatureofWorkAndSchemeTypeForm.get('schemeTypeId').enable();
        } else {
            this.natureofworktypechangesbuttonBollean = false
            this.changeNatureofWorkAndSchemeTypeForm.get('natureOfWorkTypeId').disable();
            this.changeNatureofWorkAndSchemeTypeForm.get('schemeTypeId').disable();
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

    // changeApplicationIndividualOrGroup() {
    //     //  consumerApplicationNo: any, individualOrGroupId: any, token: any
    //     this.consumerApplicationService.changeApplicationIndividualOrGroup(this.consumerApplicationDetail.consumerApplicationNo, this.consumerApplicationIndividualOrGroupChangeForm.value.groupOrIndividual, this.userToken).subscribe((data: any) => {
    //         console.log(data, "changeApplicationIndividualOrGroup...........................................");
    //         if (data.code == "202") {
    //             this.getApplicationDetails(this.consumerApplicationDetail.consumerApplicationNo);
    //             this.notificationService.success(data.message);
    //         } else {
    //             this.notificationService.warn(data.message);
    //             return
    //         }

    //     })


    // }


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
        this.consumerApplicationService.changeConsumerNameAndAddress(this.consumerApplicationDetail.consumerApplicationNo, this.consumerNameAndAddressChangeForm.value.name, this.consumerNameAndAddressChangeForm.value.address, this.userToken).subscribe((data: any) => {
            console.log(data, "changeConsumerNameAndAddress..........");
            if (data.code == "202") {
                this.getApplicationDetails(this.consumerApplicationDetail.consumerApplicationNo);
                this.notificationService.success("Data changes Successfully");
            } else {
                this.notificationService.warn(data.message);
                return
            }

        })
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


    mkmyIndivFormBuild() {
        this.mkmyIndivForm = this.fb.group({
            KvDistance: ['', Validators.required],
            cutpoint: ['', Validators.required],
            dtr: ['', Validators.required]
        })
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
        this.consumerApplicationService.getApplicationDocumentData(this.consumerApplicationDetail?.consumerApplicationId).subscribe((applicationDocumentData: any) => {
            console.log('applicationDocumentData', applicationDocumentData);
            if (applicationDocumentData['code'] == "200") {
                this.applicationDocumentData = applicationDocumentData['list'][0];
                console.log('applicationDocumentData:>-  !!!', applicationDocumentData);
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
        // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    onChangeDc(e: any) {
        console.log(e, "eeeeeeeeeeeeeeedddddccccccccc..........................");

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
            this.MkmyUpdateForm.value.dcId = '';
            this.newApplicationService
                .getDistributionByID(value.value.districtId)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe((data) => {
                    this.dcResponseArray = data["list"][0];
                });
        } else {
            this.dcResponseArray = null;
        }
    }



    onSubmitLineShiftingReturnAmountForm() {

        if (this.LineShiftingReturnAmountForm.invalid) {
            this.notificationService.error("! Please enter Return Amount first..");
            return
        } else if (this.LineShiftingReturnAmountForm.value.returnAmt < 0) {
            this.notificationService.error("! Return Amount must be grater than or equal to zero ");
            return
        }
        else {
            let formData: FormData = new FormData();
            formData.append('jeReturnAmount', this.LineShiftingReturnAmountForm.value.returnAmt);
            formData.append('consumerApplicationNumber', this.consumerApplicationDetail.consumerApplicationNo);
            this.consumerApplicationService.updateOfReturnAmountOfSurvey(formData).subscribe((data: any) => {
                console.log(data, "kkkkkkkkkkkkkkkkkkkkkk");
                if (data.code == "200") {
                    this.notificationService.success("submitted successfully");
                    // this.LineShiftingReturnAmountFormBoolean = true
                } else {
                    this.notificationService.warn("something went wrong !");
                    // this.LineShiftingReturnAmountFormBoolean = false;
                    return

                }

            })
        }
    }


    employeesForMkmy(): FormArray {
        return this.empFormForMkmy.get("employeesForMkmy") as FormArray;
    }
    newEmployeeForMkmy(): FormGroup {
        return this.fb.group({
            parentApplicationNumber: [this.consumerApplicationDetail.consumerApplicationNo, Validators.required],
            childApplicationNumber: ["", Validators.required],
            consumerName: ["", Validators.required],
            guardianName: ["", Validators.required],
            // elevenKvDistance: ["", Validators.required],
            // dtrCapacity: ["", Validators.required],
            // cutPoint: ["", Validators.required],
            load: ["", Validators.required]
            // parentConsumerApplicationNumber:[this.consumerApplicationDetail.consumerApplicationNo,Validators.required]

            //         "parentApplicationNumber": "",
            // "childApplicationNumber": "DS2023092061",
            // "load": "100",
            // "cutPoint": "50",
            // "elevenKvDistance": "25",
            // "dtrCapacity": "200"
        });
    }
    mkmyadd() {
        console.log(this.newEmployeeForMkmy(), "this.newEmployeeForMkmy()this.newEmployeeForMkmy()this.newEmployeeForMkmy()^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

        this.employeesForMkmy().push(this.newEmployeeForMkmy());
    }
    removemkmy(empIndex: number) {
        this.employeesForMkmy().removeAt(empIndex);
    }
    onSubmitsamMkmy() {
        console.log(this.empFormForMkmy.value);
    }

    displayInputFieldForMkmy(event: any) {
        this.empForm.reset();
        console.log(".........................", event.target.value);
        this.displayInputFieldValForMkmy = event.target.value;
        if (event.target.value == 2) {
            this.displayInputMkmy = true;
            this.MkmyUpdatePayload.individualOrGroupId = 2;
            //if (this.displayInputMkmy === true) {
            //  this.add();
            // this.displayinputfieldForMkmy = true;
            //  }
            this.individualOrGroupIdVariable = 2
        } else {
            this.displayInputMkmy = false;
            this.displayinputfieldForMkmy = false;
            this.individualOrGroupIdVariable = 1;
            this.mkmySurveyForm = this.fb.group({
                loadConfirmationForMkmy: [this.mkmyApplicationDetails.loadRequested, Validators.required],
                jeLoadUnitNew: ['HP', Validators.required],
                materialQuality: ['', Validators.required]
            })

            this.MkmyUpdatePayload.individualOrGroupId = 1;
        }
    }

    generateBlocksForMkmyFormArray() {
        this.submittedGenerateBlock = true;
        console.log(this.employeesForMkmy().length, "this.employeesForMkmy()this.employeesForMkmy()this.employeesForMkmy()this.employeesForMkmy()this.employeesForMkmy()", typeof (this.employeesForMkmy()));
        // if(this.mkmySubmitBoolean==false){
        // this.notificationService.error("first chose above form load and unit first.... !");
        // return;
        // }else{
        if (this.individualOrGroupIdVariable == 2 && this.ParentApplicationBoolean == false) {
            this.notificationService.error("please Submit Details First");
            return
        }
        const formArrayFormkmy = this.empFormForMkmy.get('employeesForMkmy') as FormArray;
        while (formArrayFormkmy.length !== 0) {
            formArrayFormkmy.removeAt(0);
        }
        if (this.selectFormForMkmy.value.numberofgroup <= 10) {
            this.displayInputMkmy = true;
            this.displayinputfieldForMkmy = true
            for (let index = 0; index < this.selectFormForMkmy.value.numberofgroup; index++) {
                this.mkmyadd();
            }
            this.closeLoadUnitDiv = true
        } else {
            this.notificationService.warn("१०  से कम संख्या दर्ज करे");
            return
        }
        this.selectFormForMkmy.value.numberofgroup = 0;
        //}


    }


    getApplicationDetailsByApplicationIdForMkmy(event: any, e: any) {
        console.log(event, "evvveeennntntttt");
        console.log(this.empFormForMkmy.value.employeesForMkmy, "formValue.....");
        let applicationNumbermkmy = this.empFormForMkmy.value.employeesForMkmy[e].childApplicationNumber;
        console.log(applicationNumbermkmy, "ffffiiiinnnaaallllyyy");
        let count = 0;
        for (let x = 0; x < this.empFormForMkmy.value.employeesForMkmy.length; x++) {

            if (this.empFormForMkmy.value.employeesForMkmy[x].childApplicationNumber == applicationNumbermkmy) {

                count += 1;
            } else {

            }
        }

        if (count > 1) {
            this.notificationService.error("you have already added this Application Number. ! Please Enter Different Application Number");
            return;
        }

        //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getConsumerApplicationDetailsByConsumerApplicationNo/DS1698323331645

        if (applicationNumbermkmy == this.consumerApplicationDetail.consumerApplicationNo) {
            this.notificationService.warn("मुख्य आवेदक,अपने आवेदन क्रमांक का चयन नही कर सकता है।");
            return
        }

        this.consumerApplicationService.getConsumerApplicationDetailsByApplicationNumber(applicationNumbermkmy).subscribe((data: any) => {
            console.log(data, "dattttaaaaahhhhhhhhhhhhhhhhhhhhhhhhhhhhh..,,,,,,,..........,,,,,,,,,,");
            if (data.code == "200") {
                let mkmyConsumerDetails = data.list[0];
                console.log(mkmyConsumerDetails, "mkmyConsumerDetails...................................");
                if (mkmyConsumerDetails.natureOfWorkType.natureOfWorkTypeId != 8) {
                    this.notificationService.error("आवेदन क्रमांक किसान मित्र योजना से संबंधित होना चाहिए। ");
                    return
                } else {
                    const formArrayNewMkmy = this.empFormForMkmy.get('employeesForMkmy') as FormArray
                    const formGroupNewMkmy = formArrayNewMkmy.at(e) as FormGroup;
                    console.log(formGroupNewMkmy, "formGroupNewMkmy''''''''''''''''''''''''''''''''''");

                    formGroupNewMkmy.patchValue({
                        consumerName: data.list[0].consumerName,
                        guardianName: data.list[0].guardianName
                    })
                }

            } else {
                const formArrayNewMkmy = this.empFormForMkmy.get('employeesForMkmy') as FormArray
                const formGroupNewMkmy = formArrayNewMkmy.at(e) as FormGroup;
                console.log(formGroupNewMkmy, "formGroupNewMkmy''''''''''''''''''''''''''''''''''");
                this.notificationService.warn(" Invalid Application number ! please fill correct Application number")
                formGroupNewMkmy.reset();
            }

        })


    }

    parentDetailsSubmit() {
        this.submitted = true;
        console.log(this.MkmyUpdateForm, "this.MkmyUpdateForm..............this.MkmyUpdateForm.....////////////////");



        if (this.MkmyUpdateForm.value.loadRequested >= 3) {
            if ((this.individualOrGroupIdVariable == 1 && this.mkmyIndivForm.invalid) || (this.individualOrGroupIdVariable == 1 && this.MkmyUpdateForm.invalid)) {
                this.notificationService.error("Invalid Form !");
                return;
            }
            if (this.individualOrGroupIdVariable == 1 && this.mkmyIndivForm.valid && this.MkmyUpdateForm.valid) {

                if (this.mkmyIndivForm.value.KvDistance > 200) {
                    this.notificationService.error("Distance must be less than or equal to 200m !");
                    return
                }
                this.mkmyIndiv.consumerAppNo = this.consumerApplicationDetail.consumerApplicationNo
                this.mkmyIndiv.mkmyCutPoint = this.mkmyIndivForm.value.cutpoint
                this.mkmyIndiv.mkmyDistance = this.mkmyIndivForm.value.KvDistance
                this.mkmyIndiv.mkmyDtrCapacity = this.mkmyIndivForm.value.dtr
                this.consumerApplicationService.mkmyIndivSubmit(this.mkmyIndiv).subscribe((responseData: any) => {
                    console.log(responseData, "responseData...............................");
                    if (responseData.code == "200") {
                        this.mkmyIndivBoolean = true;
                    } else {
                        this.mkmyIndivBoolean = false
                        this.notificationService.warn(responseData.message);
                        return
                    }
                })
            }

            if (this.MkmyUpdateForm.invalid) {
                console.log(this.MkmyUpdateForm, "invalid mkmy form,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");

                this.notificationService.error("Enter details first !");
                return;
            } else {

                const numberString = this.MkmyUpdateForm.value.aadharNo.toString();
                const length = numberString.length;
                if (length != 12) {
                    console.log(length, "length/////////////////");
                    this.notificationService.error(" Aadhar number must be numeric and have a maximum of 12 digits.");
                    return
                }
                const pincodeString = this.MkmyUpdateForm.value.pinCode.toString();
                const pincodeLength = pincodeString.length;
                if (pincodeLength != 6) {
                    console.log(pincodeLength, "length/////////////////");
                    this.notificationService.error(" Pincode must be numeric and have a maximum of 6 digits.");
                    return
                }



                if (this.mkmyApplicationDetails.dcId == null && this.mkmyApplicationDetails.districtId == null) {
                    this.MkmyUpdatePayload.dcId = this.MkmyUpdateForm.value.dcId;
                    this.MkmyUpdatePayload.districtId = this.MkmyUpdateForm.value.districtId;
                } else if (this.mkmyApplicationDetails.dcId != null && this.mkmyApplicationDetails.districtId == null) {
                    this.MkmyUpdatePayload.dcId = this.mkmyApplicationDetails.dcId;
                    this.MkmyUpdatePayload.districtId = this.MkmyUpdateForm.value.districtId;
                } else if (this.mkmyApplicationDetails.dcId == null && this.mkmyApplicationDetails.districtId != null) {
                    this.MkmyUpdatePayload.districtId = this.mkmyApplicationDetails.districtId;
                    this.MkmyUpdatePayload.dcId = this.MkmyUpdateForm.value.dcId;
                } else {
                    this.MkmyUpdatePayload.dcId = this.mkmyApplicationDetails.dcId;
                    this.MkmyUpdatePayload.districtId = this.mkmyApplicationDetails.districtId;
                }
                if (this.castValue == false) {
                    this.MkmyUpdatePayload.castCategory = this.MkmyUpdateForm.value.castCategory;
                }
                if (this.castValue == true) {
                    this.MkmyUpdatePayload.castCategory = this.MkmyUpdateForm.value.casteCategory;
                }
                this.MkmyUpdatePayload.aadharNo = this.MkmyUpdateForm.value.aadharNo;
                this.MkmyUpdatePayload.address = this.MkmyUpdateForm.value.address;
                this.MkmyUpdatePayload.area = this.MkmyUpdateForm.value.area;

                this.MkmyUpdatePayload.consumerName = this.MkmyUpdateForm.value.consumerName;
                this.MkmyUpdatePayload.guardianName = this.MkmyUpdateForm.value.guardianName;
                this.MkmyUpdatePayload.khasra = this.MkmyUpdateForm.value.khasra;
                this.MkmyUpdatePayload.loadRequested = this.MkmyUpdateForm.value.loadRequested;
                this.MkmyUpdatePayload.loadRequestedId = 3;
                this.MkmyUpdatePayload.mobilNo = this.MkmyUpdateForm.value.phoneNumber;
                this.MkmyUpdatePayload.natureOfWorkTypeId = 8;
                this.MkmyUpdatePayload.pinCode = this.MkmyUpdateForm.value.pinCode;
                this.MkmyUpdatePayload.samgraId = this.MkmyUpdateForm.value.samagraId;
                this.MkmyUpdatePayload.shortDescriptionOfWork = this.MkmyUpdateForm.value.shortDescription;
                this.MkmyUpdatePayload.consumerApplicationNo = this.consumerApplicationDetail.consumerApplicationNo;
                // this.MkmyUpdatePayload.mkmyDtrCapacity =  this.empFormForMkmy.value.dtr
                // this.MkmyUpdatePayload.mkmyCutPoint = this.empFormForMkmy.value.cutpoint
                // this.MkmyUpdatePayload.mkmyDistance = this.empFormForMkmy.value.KvDistance

                //consumerApplicationNo

                console.log(this.MkmyUpdatePayload, "this.MkmyUpdatePayload....................");

                let formData: FormData = new FormData();
                formData.append('updateMkmyConsumer', JSON.stringify(this.MkmyUpdatePayload));

                this.consumerApplicationService.SubmitMkmyUpdate(formData).subscribe((response: any) => {
                    console.log(response, "response...mkmy...update..............");
                    if (response.code == "200") {

                        this.mainApplicationUpdatedLoadRequested = response.list[0];
                        this.notificationService.success("Data Updated Successfully");
                        this.ParentApplicationBoolean = true;
                        this.checkUpdateBoolean = true;

                        if (this.individualOrGroupIdVariable == 1) {
                            this.mkmySurveyForm = this.fb.group({
                                loadConfirmationForMkmy: [response.list[0].loadRequested, Validators.required],
                                jeLoadUnitNew: ['HP', Validators.required],
                                materialQuality: ['', Validators.required]
                            })
                        } else if (this.individualOrGroupIdVariable == 2) {
                            this.ParentFinalLoad = response.list[0].loadRequested
                        }
                    } else {
                        this.notificationService.warn("Something went wrong !");
                        this.ParentApplicationBoolean = false;
                        return
                    }

                })


            }


        } else {
            this.notificationService.error("! Entered Load must be greater than or equal to 3");
            return
        }


    }



    submitgroupforMkmy() {

        if (this.empFormForMkmy.invalid) {
            this.notificationService.error('Invalid Group Form !')
            console.log(this.empFormForMkmy, "this.empFormForMkmy..check...inValid Condition..........................");

            this.FormArrayBooleanVariableOfMkmy = true;
            return
        } else if (this.empFormForMkmy.value.KvDistance > 200 || this.empFormForMkmy.value.KvDistance < 0) {

            this.notificationService.error('संबंधित दूरी 1m से 200m के मध्य दर्ज करे')
            this.distanceBoolean = true;
            return
            //KvDistance
        }
        //  else if (this.empFormForMkmy.value.mkmyLoad < 3 || this.empFormForMkmy.value.mkmyLoad > 100) {
        //     this.notificationService.error('load must be between 3HP and 100HP ');
        //     return
        // }

        else {
            this.distanceBoolean = false
            this.FormArrayBooleanVariableOfMkmy = false;
            this.MkmySurveyPayload.individualOrGroupId = 2;
            this.MkmySurveyPayload.mmkyParentChildDto = this.empFormForMkmy.value.employeesForMkmy;
            var loadAddup: any;
            this.consumerApplicationService.getConsumerApplicationDetailsByApplicationNumber(this.consumerApplicationDetail.consumerApplicationNo).subscribe((res: any) => {
                console.log(res, "ggggggggggggggttttttttttt////////////////////||||||||||||||||||||||||||");
                console.log(this.ParentFinalLoad, "ParentFinalLoad,,,,,,,,,,,,,,,,,,,");

                // return
                if (res.code == "200") {
                    loadAddup = res.list[0].loadRequested;
                    console.log(loadAddup, "rrrrrrrrrrrrrrttttttuuuuuuuuu......................");
                    console.log(this.empFormForMkmy.value.employeesForMkmy, "controlssssssssssssssssssssssssss");
                    for (let x = 0; x < this.empFormForMkmy.value.employeesForMkmy.length; x++) {
                        loadAddup = JSON.parse(loadAddup) + JSON.parse(this.empFormForMkmy.value.employeesForMkmy[x].load);
                        // this.empFormForMkmy.value.employeesForMkmy.value[x].parentApplicationNumber=this.consumerApplicationDetail.consumerApplicationNo;

                    }
                    console.log(loadAddup, "loadAddup.....................");
                    if (loadAddup < 3 || loadAddup > 100) {
                        this.notificationService.error("संबंधित भार ३ HP से १०० HP के मध्य दर्ज करे");
                        return;
                    }

                    //संबंधित दूरी 1m से 200m के मध्य दर्ज करे
                    console.log(loadAddup, "pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp......1st..............");
                    this.mkmySurveyForm = this.fb.group({
                        loadConfirmationForMkmy: [loadAddup, Validators.required],
                        jeLoadUnitNew: ['HP', Validators.required],
                        materialQuality: ['', Validators.required]
                    })
                    this.loadAddupVar = loadAddup;

                    let formData: FormData = new FormData();
                    formData.append('applicationNumber', this.consumerApplicationDetail.consumerApplicationNo);
                    formData.append('mmkyParentChildData', JSON.stringify(this.MkmySurveyPayload));
                    formData.append('MmkyLoad', this.loadAddupVar);
                    formData.append('KvDistance', this.empFormForMkmy.value.KvDistance);
                    formData.append('dtr', this.empFormForMkmy.value.dtr);
                    formData.append('cutPoint', this.empFormForMkmy.value.cutpoint);

                    //cutPoint

                    console.log(formData, "formData....////////");



                    this.consumerApplicationService.SubmitMkmySurvey(formData).subscribe((response: any) => {
                        console.log(response, "response.............response//////////////////////");
                        if (response.code == "200") {
                            this.notificationService.success("Data submitted successfully !");
                            this.closeWrittenDiv = true;
                            // this.ParentApplicationBoolean = true;



                        } else {
                            this.notificationService.warn("something went wrong !");
                            this.closeWrittenDiv = false;
                            // this.ParentApplicationBoolean = false;
                            return;
                        }

                    })

                    // this.mkmySurveyForm.patchValue({
                    //     loadConfirmationForMkmy: loadAddup,
                    //     jeLoadUnitNew: ''
                    // })
                }
            })



        }





    }

    getSamagraDetails(event: any, e: any) {
        console.log(event, "evvveeennntntttt");
        console.log(this.empOytForm.value, "formValue.....");
        let smgId = this.empOytForm.value.employeesOyt[e].samagraId;
        console.log(smgId, "ffffiiiinnnaaallllyyy");


        console.log(e, "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii", this.samgraInputNumber, "................");

        let abc = {
            memberId: smgId
        };

        this.newApplicationService
            .getMukhyaMantriYojnaConsumerApplicationDetails(abc)
            .subscribe((data: any) => {
                console.log(data, "ddataatata");
                // console.log(this.empOytForm.controls.employeesOyt.get('e').value,"this.empOytForm[e].value????????????????????");
                if (data.statusCodeValue == 200) {

                    console.log("200 aayyyayyaa");
                    const formArray = this.empOytForm.get('employeesOyt') as FormArray
                    const formGroup = formArray.at(e) as FormGroup;
                    console.log(formGroup, "formGroup''''''''''''''''''''''''''''''''''");

                    formGroup.patchValue({
                        consumerName: data.body[0].Name,
                        guardianName: data.body[0].fatherName
                    })
                } else {
                    const formArray = this.empOytForm.get('employeesOyt') as FormArray
                    const formGroup = formArray.at(e) as FormGroup;
                    console.log(formGroup, "formGroup''''''''''''''''''''''''''''''''''");
                    this.notificationService.warn(" Invalid Samagra-id ! please fill correct samagra id")
                    formGroup.reset();
                }
            })
    }


    GroupPeopleCommonFile(e: any) {
        console.log(e.target.files[0], "e.target.files[0] for khasra-khatoni file");

        this.groupPeopleCommonFile = e.target.files[0];
        //this.khasraKhatonifileLength = e.target.files.length;

        if (e.target.files[0].type == "application/pdf" && e.target.files[0].size <= 2000000) {
            this.groupCommonFileBoolean = false;
        } else {
            this.groupCommonFileBoolean = true;
            this.notificationService.warn("please choose file 'pdf' type and size must be less than '2MB'")
        }
    }

    submitgroup() {

        if (this.groupPeopleCommonFile == undefined) {
            this.notificationService.error("! Please select file first")
            return
        }
        else if (this.groupCommonFileBoolean == true) {
            this.notificationService.error("  file must be 'pdf' type and size must be less than '2MB'");
            return;
        }
        this.submitGroupVar = true;
        if (this.empOytForm.invalid) {
            this.notificationService.error('Invalid Group Form !')
            this.FormArrayBooleanVariable = true;
            return
        } else {
            // let abc = this.selectForm.value.individualOrGroupId;

            this.FormArrayBooleanVariable = false;
            this.notificationService.success('group form added successfully');
            console.log(this.empOytForm.value.employeesOyt, "controlssssssssssssssssssssssssss");
            this.listOfFormArray = this.empOytForm.value.employeesOyt
            console.log(" this.listOfFormArray..........", this.listOfFormArray);
            this.SubmitFormArraySurvey.listofGroupOfChildPeople = this.listOfFormArray;
            this.SubmitFormArraySurvey.ParentConsumerApplicationNumber = this.consumerApplicationDetail.consumerApplicationNo;
            console.log(this.SubmitFormArraySurvey, " this.SubmitFormArraySurveyoooooooooooooooooooooooooooooooooo>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            let x: any
            if (this.oytFormArrayForm.value.individualOrGroupIdName == 'Group') {
                x = 2
            } else if (this.oytFormArrayForm.value.individualOrGroupIdName == 'Individual') {
                x = 1
            } else {
                x = undefined
            }
            this.FormArrayPayload.individualOrGroupId = x;
            this.FormArrayPayload.samagraListDto = this.listOfFormArray;
            //consumerApplicattionMmky
            //  console.log(this.SubmitFormArraySurvey, " this.SubmitFormArraySurveyoooooooooooooooooooooooooooooooooo>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            let formData: FormData = new FormData();
            formData.append('consumerApplicattionOyt', JSON.stringify(this.FormArrayPayload));
            formData.append('consumerApplicationNO', this.SubmitFormArraySurvey.ParentConsumerApplicationNumber);
            formData.append('docGroupPeopleCommonFile', this.groupPeopleCommonFile);

            console.log(formData, "zzzzzzzzzzzzzzzzzzzzzzz");

            this.consumerApplicationService.FormArrayPostForOytSurvey(formData).subscribe((response: any) => {
                console.log(response, "response");
                if (response.code == "200") {
                    this.notificationService.success("data added successfully");
                    this.ChooseGroupSubmit = true;
                } else {
                    this.notificationService.warn('somethin went wrong !');
                    return
                }

            })


        }
    }




    BuildLoadForm() {
        if (this.consumerApplicationDetail?.natureOfWorkTypeId == 10) {

            if (this.consumerApplicationDetail?.schemeTypeId === 2) {
                this.LoadConfirmationForm = this.fb.group({
                    jeLoad: [this.consumerApplicationDetail?.jeLoad, Validators.required],
                    jeLoadUnit: ['', Validators.required],
                    materialQuality: ["", Validators.required],
                    loadConfirmation: ['YES', Validators.required]
                })
            } else {
                this.LoadConfirmationForm = this.fb.group({
                    jeLoad: [this.consumerApplicationDetail?.jeLoad, Validators.required],
                    jeLoadUnit: ['', Validators.required],
                    materialQuality: [0, Validators.required],
                    loadConfirmation: ['YES', Validators.required]
                })
            }

        } else {
            if (this.consumerApplicationDetail?.schemeTypeId === 2) {
                this.LoadConfirmationForm = this.fb.group({
                    jeLoad: [this.consumerApplicationDetail?.jeLoad, Validators.required],
                    jeLoadUnit: ['', Validators.required],
                    materialQuality: ["", Validators.required],
                    loadConfirmation: ['', Validators.required]
                })
            } else {
                this.LoadConfirmationForm = this.fb.group({
                    jeLoad: [this.consumerApplicationDetail?.jeLoad, Validators.required],
                    jeLoadUnit: ['', Validators.required],
                    materialQuality: [0, Validators.required],
                    loadConfirmation: ['', Validators.required]
                })
            }
        }

    }

    BuildFormForColonyIlegalLoad() {
        if (this.consumerApplicationDetail?.schemeTypeId === 2) {
            this.LoadConfirmationForColonyIllegalForm = this.fb.group({
                loadConfirmationForColonyIllegal: ['', Validators.required],
                jeLoadUnitNew: ['', Validators.required],
                materialQuality: ['', Validators.required]
                // loadConfirmation: ['', Validators.required]
            })
        } else {
            this.LoadConfirmationForColonyIllegalForm = this.fb.group({
                loadConfirmationForColonyIllegal: ['', Validators.required],
                jeLoadUnitNew: ['', Validators.required],
                materialQuality: [0, Validators.required]
                // loadConfirmation: ['', Validators.required]
            })
        }

    }


    BuildNscLoadEnhancementOytForm() {

        if (this.consumerApplicationDetail?.schemeTypeId === 2) {
            this.nscLoadEnhancementOytForm = this.fb.group({

                loadConfirmationForNsc: ['', Validators.required],
                jeLoadUnitNew: ['', Validators.required],
                materialQuality: ["", Validators.required]
            })
        } else {
            this.nscLoadEnhancementOytForm = this.fb.group({

                loadConfirmationForNsc: ['', Validators.required],
                jeLoadUnitNew: ['', Validators.required],
                materialQuality: [0, Validators.required]
            })
        }
    }

    BuildMkmyForm() {
        if (this.consumerApplicationDetail?.schemeTypeId === 2) {
            this.mkmySurveyForm = this.fb.group({
                loadConfirmationForMkmy: ['', Validators.required],
                jeLoadUnitNew: ['', Validators.required],
                materialQuality: ["", Validators.required]
            })
        } else {
            this.mkmySurveyForm = this.fb.group({
                loadConfirmationForMkmy: ['', Validators.required],
                jeLoadUnitNew: ['', Validators.required],
                materialQuality: [0, Validators.required]
            })
        }

    }

    OnLoadForMkmySubmit() {

        if (this.checkUpdateBoolean == false) {
            this.notificationService.error("! Please fill the Main Application Details First");
            return
        }

        if (this.mkmySurveyForm.invalid) {
            this.notificationService.error('कृपया पहले भार दर्ज कीजिये।');
            return;
        }
        // else if(this.mkmySurveyForm.value.loadConfirmationForMkmy<3 || this.mkmySurveyForm.value.loadConfirmationForMkmy>100){
        //     this.notificationService.error("! Load must be between 3HP and 100HP ");
        //     return
        // }
        else {

            if (this.mkmySurveyForm.value.loadConfirmationForMkmy < 3) {
                this.notificationService.error("Load can't be negative ! Please Enter Valid Load");
                return
            }

            //   this.loadPatchValue = this.mkmySurveyForm.value.loadConfirmationForMkmy
            this.consumerApplicationService.LoadConfirmationSurveySubmit(this.consumerApplicationDetail?.consumerApplicationNo,
                this.mkmySurveyForm.value.loadConfirmationForMkmy,
                this.mkmySurveyForm.value.jeLoadUnitNew, this.mkmySurveyForm.value.materialQuality).subscribe((mkmyData: any) => {
                    console.log(mkmyData, "mkmyData...............///////");
                    if (mkmyData.code == 200) {
                        this.notificationService.success('Data Updated Successfully');
                        this.mkmySubmitBoolean = true;
                        // this.loadPatchValue = this.mkmySurveyForm.value.loadConfirmationForMkmy;
                        // this.empFormForMkmy = this.fb.group({
                        //     mkmyLoad:[this.loadPatchValue,Validators.required],  //mkmySurveyForm  //loadConfirmationForMkmy
                        //     KvDistance:["",Validators.required],
                        //     dtr:["",Validators.required],
                        //     cutpoint:["",Validators.required],
                        //     employeesForMkmy: this.fb.array([]),
                        // });

                    } else {
                        this.notificationService.warn('something went wrong');
                        this.mkmySubmitBoolean = false;

                    }
                })
        }
    }

    OnLoadForNscSubmit() {


        if (this.nscLoadEnhancementOytForm.value.loadConfirmationForNsc < 0) {
            this.notificationService.error("Load can't be negative ! Please Enter Valid Load");
            return
        }
        // if (this.consumerApplicationDetail?.natureOfWorkTypeId == 7 && this.LineShiftingReturnAmountFormBoolean == false) {
        //     this.notificationService.error("! अगर प्राकलन में वापसी योग्य राशि है तो कृपया राशि दर्ज करे|");
        //     return;
        // }
        // if (this.consumerApplicationDetail?.natureOfWorkTypeId == 2 && this.LineShiftingReturnAmountFormBoolean == false) {
        //     this.notificationService.error("! अगर प्राकलन में वापसी योग्य राशि है तो कृपया राशि दर्ज करे|");
        //     return;
        // }
        if (this.nscLoadEnhancementOytForm.invalid) {
            this.notificationService.error('form is invalid ! Please choose Load first ');
            return;
        } else {
            this.consumerApplicationService.LoadConfirmationSurveySubmit(this.consumerApplicationDetail?.consumerApplicationNo,
                this.nscLoadEnhancementOytForm.value.loadConfirmationForNsc,
                this.nscLoadEnhancementOytForm.value.jeLoadUnitNew, this.nscLoadEnhancementOytForm.value.materialQuality).subscribe((nscData: any) => {
                    console.log(nscData, "nscData...............///////");
                    if (nscData.code == 200) {
                        this.notificationService.success('Data Updated Successfully');
                        this.NscSubmitBoolean = true;

                    }
                })
        }
    }

    OnLoadForColonyIllegalSubmit() {
        this.isFormSubmitForColonyIllegal = true
        console.log(this.LoadConfirmationForColonyIllegalForm, "this.LoadConfirmationFormbbbbbbbbbbbbbbbbbbbbbb");

        if (this.LoadConfirmationForColonyIllegalForm.invalid) {
            this.notificationService.error('form is invalid ! Please choose Load first ');

            return
        }
        else {

            if (this.LoadConfirmationForColonyIllegalForm.value.loadConfirmation == "YES" && this.LoadConfirmationForColonyIllegalForm.value.loadConfirmationForColonyIllegal > 400) {
                this.notificationService.error("आपके द्वारा भार से संबंधित विकल्प का त्रुटिपूर्ण चयन किया गया है।कृपया सही चयन करे।");
                return
            }
            if (this.LoadConfirmationForColonyIllegalForm.value.loadConfirmation == "NO" && this.LoadConfirmationForColonyIllegalForm.value.loadConfirmationForColonyIllegal <= 400) {
                this.notificationService.error("आपके द्वारा भार से संबंधित विकल्प का त्रुटिपूर्ण चयन किया गया है।कृपया सही चयन करे।");
                return
            } else {

                //loadConfirmation
                this.consumerApplicationService.LoadConfirmationSurveySubmit(this.consumerApplicationDetail?.consumerApplicationNo,
                    this.LoadConfirmationForColonyIllegalForm.value.loadConfirmationForColonyIllegal,
                    this.LoadConfirmationForColonyIllegalForm.value.jeLoadUnitNew, this.LoadConfirmationForColonyIllegalForm.value.materialQuality).subscribe((data: any) => {
                        console.log(data, "ttttttttttttt77777777ttttttt777777tttttt");
                        if (data.code == 200) {
                            this.notificationService.success('Data Updated Successfully');
                            this.ShowingErrorVal = true;
                            this.ShowingErrorValForOtherButtonsCheck = false;

                        }
                    })
            }
        }
    }

    OnLoadSubmit() {
        console.log(this.LoadConfirmationForm.value, "this.LoadConfirmationFormbbbbbbbbbbbbbbbbbbbbbb");
        if (this.LoadConfirmationForm.invalid) {
            this.notificationService.error('form is invalid ! Please fill Load, Select Unit and choose Load Conformation ');
            return
        }
        else {
            console.log(this.LoadConfirmationForm.value.loadConfirmation, "lllll     ", this.LoadConfirmationForm.value.jeLoad);
            if (this.LoadConfirmationForm.value.jeLoad < 0) {
                this.notificationService.error("Load can't be negative ! Please Enter Valid Load");
                return
            }

            if (this.consumerApplicationDetail?.natureOfWorkTypeId != 10 && this.LoadConfirmationForm.value.loadConfirmation == "YES" && this.LoadConfirmationForm.value.jeLoad > 1500) {
                this.notificationService.error("आपके द्वारा भार से संबंधित विकल्प का त्रुटिपूर्ण चयन किया गया है।कृपया सही चयन करे।");
                return
            }
            if (this.consumerApplicationDetail?.natureOfWorkTypeId != 10 && this.LoadConfirmationForm.value.loadConfirmation == "NO" && this.LoadConfirmationForm.value.jeLoad <= 1500) {
                this.notificationService.error("आपके द्वारा भार से संबंधित विकल्प का त्रुटिपूर्ण चयन किया गया है।कृपया सही चयन करे।");
                return
            } else {
                this.consumerApplicationService.LoadConfirmationSurveySubmit(this.consumerApplicationDetail?.consumerApplicationNo, this.LoadConfirmationForm.value.jeLoad, this.LoadConfirmationForm.value.jeLoadUnit, this.LoadConfirmationForm.value.materialQuality).subscribe((data: any) => {
                    console.log(data, "ttttttttttttt77777777ttttttt777777tttttt");
                    if (data.code == 200) {
                        this.notificationService.success('Data Updated Successfully');
                        this.loadConfirmationBoolean = true;
                        this.ExtraaButtonValidationCheck = false;
                    }

                })

            }


        }

    }


    loadForm() {
        this.applicationServeyFg = this.fb.group({
            consumerApplicationId: ['', Validators.compose([Validators.required])],
            // isRejected: ['', Validators.compose([Validators.required])],
            // rejectedRemark: [''],
            // surveyDate: ['', Validators.required],
            erpEstimateNo: ['', Validators.required]
        });

    }

    loadForm1() {
        this.applicationServeyErpFg = this.fb.group({
            cb: [false],
            erpNo: ['', Validators.required],

        });
        console.log('load Form1 ===============');
    }

    loadFormMkmy() {
        //applicationServeyErpFgOfMkmy
        this.applicationServeyErpFgOfMkmy = this.fb.group({
            erpNo: ['', Validators.required],

        });
        console.log('load Form1 ===============');   //this.applicationServeyErpFgOfMkmy.value.erpNo
    }



    loadFormCheckBox() {
        this.applicationServeyCheckBoxFg = this.fb.group({
            cb: [''],
            estimateFile: ['', Validators.required]

        });
    }

    loadEditForm(consumerSurveyData) {

        console.log('consumerSurveyData:::', consumerSurveyData);
        const surveyDateStr = moment(consumerSurveyData['surveyDate'], "DD-MM-YYYY").format();
        this.applicationServeyFg.controls['surveyDate'].setValue(consumerSurveyData['surveyDate']);

        if (consumerSurveyData['surveyStatus'] == "REJECTED") {
            this.applicationServeyFg.controls['isRejected'].setValue('true');
            this.applicationServeyFg.controls['rejectedRemark'].setValue(consumerSurveyData['rejectedReason']);
        } else {
            this.applicationServeyFg.controls['isRejected'].setValue('false');
        }
        if (this.crudType == CrudType.update) {
            this.surveyRequired = false;
        }

    }


    surveyUpload() {
        if (this.surveyDocElement.nativeElement.files[0] != undefined) {
            this.surveyDoc = this.surveyDocElement.nativeElement.files[0];
            this.surveyUploaded = true;
            this.surveyFileName = this.surveyDoc.name;
        }
    }

    get applicationSurveyFormControls() {
        return this.applicationServeyFg.controls;
    }


    onIsRejectedChange(ob: MatRadioChange) {


        let mrButton: MatRadioButton = ob.source;

        var isApplicationRejected: boolean;
        if (mrButton.value == "true") {
            isApplicationRejected = true;
        } else if (mrButton.value == "false") {
            isApplicationRejected = false;
        }


        if (isApplicationRejected) {

            console.log("true ----gmc changed radio value: " + ob.value);
            // this.isRejected = true;

        } else if (!isApplicationRejected) {

            console.log("false ----gmc changed radio value: " + ob.value);
            this.applicationServeyFg.controls['rejectedRemark'].clearValidators();
            this.applicationServeyFg.controls['rejectedRemark'].setValue('');
            // this.isRejected = false;




        } else {
            console.log("some other value:  " + ob.value);
        }
    }

    getFile(uploadId) {

        console.log("upload Id: " + uploadId);

        this.consumerApplicationService.getFile(uploadId).pipe(takeUntil(this.unsubscribe$)).subscribe(
            (file: HttpResponse<Blob>) => {
                this.downloadFile(file);
            }
        );

    }

    downloadFile(file) {
        if (file.body.size > 3) {
            window.location.href = file.url
        } else {
            this.notificationService.warn('No data available')
        }
    }

    onClose() {
        this.dialogRef.close();
    }

    onSubmit() {
        console.log('submit button clicked');
        this.isFormSubmit = true;

        // if (this.surveyRequired && !this.surveyUploaded) {
        //     return;
        // }
        console.log('this.applicationServeyFg.value ............... shamshad ........................', this.applicationServeyFg.value);

        const applicationServeyData = this.applicationServeyFg.value;
        console.log('formData :- ', this.applicationServeyFg.value.erpEstimateNo);
        console.log('consumerApplication id', this.consumerApplicationDetail?.consumerApplicationId);
        this.consumerApplicationService.erpStatusData(this.applicationServeyFg.value.erpEstimateNo, this.consumerApplicationDetail?.consumerApplicationId).subscribe(data => {
            if (data['code'] == "200") {
                console.log('1111111111sam11111111111111', data['list']);

                this.EstimateStatusList = data['list'];
                this.notificationService.success(data['message']);
            } else if (data['code'] == "406") {

                this.notificationService.warn(data['message'])
                //    this.EstimateStatusList=data['null'];
                //   this.notificationService.error(data['message']);
                // this.notificationService.error("Data not found");
            }

        }, (error) => {

        });

    }

    async ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }


    ////////  mkmy start///////

    erpEstimatGenrateOfMkmy() {

        if (this.mkmySubmitBoolean == false) {
            this.notificationService.error(" कृपया पहले लोड भार सबमिट करे ");
            return
        }

        if (this.consumerApplicationDetail?.natureOfWorkTypeId == 8) {
            if (this.displayInputFieldValForMkmy == undefined) {
                this.notificationService.warn(' कृपया पहले आवेदन का प्रकार का चयन करें !');
                return
            }
            else if (this.displayInputFieldValForMkmy == 2 && this.closeWrittenDiv == false) {
                this.notificationService.error('! Please fill group information first');
                return
            }

        }

        console.log(this.applicationServeyErpFgOfMkmy.value.erpNo, "this.applicationServeyErpFgOfMkmy.value.erpNo");

        if (this.applicationServeyErpFgOfMkmy.invalid) {
            this.notificationService.error('Invalid Form !');
            return
        }
        // for mkmy
        else if (this.consumerApplicationDetail?.natureOfWorkTypeId != 5 && this.radioButtonBoolean == false) {
            this.notificationService.warn("Please confirm first, Aaavedak Ka prakar is right/wrong");
            return
        }
        else {

            let formData: FormData = new FormData();
            formData.append("consumerApplicationNo", this.aavedakKaPrakarConfirmationByDGM.consumerApplicationNo)
            formData.append("isAvedakGovernmentERP", this.aavedakKaPrakarConfirmationByDGM.isAvedakGovernmentERP)
            // formData.append("isAvedakGovernmentRevise", this.aavedakKaPrakarConfirmationByDGM.isAvedakGovernmentRevise)
            this.consumerApplicationService.aavedakKaPrakarConfirmationByDgm(formData).subscribe((respo: any) => {
                if (respo?.code == "204") {
                    console.log(respo, "wwoowwww...............................................");
                    this.consumerApplicationService.getErpDetailsByErpNumber(JSON.parse(this.applicationServeyErpFgOfMkmy.value.erpNo), this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data: any) => {
                        console.log(data, "Mkmy........Data.....................");
                        if (data.code == "200") {
                            this.erpEstimateDataForMkmyArray = data.list;
                            this.mkmyerpConfirmationVariable = true
                            this.erpNoOfMkmyVariable = this.applicationServeyErpFgOfMkmy.value.erpNo;
                            this.notificationService.success("Data retrive Successfully");
                        } else if (data.code == "307") {
                            let messageFirst = "Amount more than the sanction estimate amount 195972 for for 25 DTR";
                            let messageSecond = "Amount more than the sanction estimate amount 195972 for for 63 DTR";
                            if (data.message === messageFirst) {
                                this.notificationService.warn("25 डीटीआर के लिए स्वीकृत प्राक्कलन राशि 195972 से अधिक राशि है।")
                            }
                            else if (data.message === messageSecond) {
                                this.notificationService.warn('63 डीटीआर के लिए स्वीकृत प्राक्कलन राशि 337173 से अधिक राशि है।')
                            }
                            return
                        } else if (data.code == "406") {
                            this.notificationService.error("This ERP Number Is Already Associated With Another Application Number.");
                            return
                        }
                        else {
                            this.notificationService.warn("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
                            return;
                        }
                        // this.erpEstimateDataForMkmyArray = data.list[0];
                        // this.mkmyerpConfirmationVariable = true
                        // this.erpNoOfMkmyVariable = this.applicationServeyErpFgOfMkmy.value.erpNo

                    })

                } else {
                    console.log(respo, "ooohhhssssshhhiiiittttt.................");
                    this.notificationService.warn(respo?.message)
                    return
                }

            }, (error: any) => {
                this.notificationService.warn(error?.message)
                console.log(error, "errror..................");
                return
            }

            )
        }
    }

    //////// mkmy end ////////


    erpEstimatGenrate() {

        if (this.consumerApplicationDetail?.natureOfWorkTypeId == 1 || this.consumerApplicationDetail?.natureOfWorkTypeId == 6) {
            this.consumerApplicationService.LoadConfirmationSurveySubmit(this.consumerApplicationDetail?.consumerApplicationNo, 0, "KVA", 0).subscribe((data: any) => {
                console.log(data, "ttttttttttttt77777777ttttttt777777tttttt");
                if (data.code == 200) {
                    this.notificationService.success('Data Updated Successfully');
                    this.loadConfirmationBoolean = true;
                    this.ExtraaButtonValidationCheck = false;

                    /////////////////////////////////////////////



                    if (this.consumerApplicationDetail?.natureOfWorkTypeId != 5 && this.radioButtonBoolean == false) {
                        this.notificationService.warn("Please confirm first, Aaavedak Ka prakar is right/wrong");
                        return
                    }
                    else {

                        if (this.consumerApplicationDetail?.natureOfWorkTypeId != 5) {

                            // for non-mkmy
                            let formData: FormData = new FormData();
                            formData.append("consumerApplicationNo", this.aavedakKaPrakarConfirmationByDGM.consumerApplicationNo)
                            formData.append("isAvedakGovernmentERP", this.aavedakKaPrakarConfirmationByDGM.isAvedakGovernmentERP)
                            formData.append("isAvedakGovernmentRevise", this.aavedakKaPrakarConfirmationByDGM.isAvedakGovernmentRevise)
                            this.consumerApplicationService.aavedakKaPrakarConfirmationByDgm(formData).subscribe((respo: any) => {
                                if (respo?.code == "204") {
                                    console.log(respo, "wwoowwww...............................................");
                                    // this.ReturnAmtBooleanOpen = false;
                                    this.ExtraaButtonValidationCheck = false;
                                    this.ShowingErrorValForOtherButtonsCheck = false;
                                    this.ShowingErrorValForOtherButtonsCheckForNsc = false;
                                    console.log(this.applicationServeyErpFg.controls.erpNo.value, "erpEstimatGenrate method  erpEstimatGenrate method");
                                    console.log('ccccccccccccccccccccccccccccc', this.consumerApplicationDetail?.consumerApplicationId);
                                    this.consumerApplicationService.getErpEstimateAmount(this.applicationServeyErpFg.controls.erpNo.value, this.consumerApplicationDetail?.consumerApplicationId, 1).subscribe(data => {
                                        if (data['code'] == "200") {
                                            // data['list'].estimateAmount = JSON.parse(data['list'].estimateAmount);
                                            // data['list'].estimateAmount = JSON.parse(data['list'].estimateAmount);
                                            console.log('222222222222', data['list'].estimateAmount);
                                            this.erpConfirmationVariable = true;
                                            this.khojeButtonBoolean = true
                                            this.storedErpNo = this.applicationServeyErpFg.controls.erpNo.value
                                            this.EstimateAmount = data['list'];
                                            this.notificationService.success(data['message']);
                                        } else if (data['code'] == "406" && data['message'] == "Scheme code not matched") {
                                            this.notificationService.error("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
                                            return
                                        }
                                        else if (data['code'] == "406" && data['message'] == "Estimate is wrongly created in ERP") {
                                            this.notificationService.warn("ERP में एस्टीमेट गलत बनाया गया है।");
                                            return
                                        } else if (data['code'] == "406" && data['message'] == "This ERP Number Is Already Associated With Another Application Number.") {
                                            this.notificationService.error("This ERP Number Is Already Associated With Another Application Number => " + data['list']);
                                            return
                                        }
                                        else {
                                            this.notificationService.error(data['message']);
                                            return
                                        }
                                    }, (error) => {
                                    });

                                } else {
                                    this.notificationService.warn(respo?.message)
                                    return
                                }

                            }, (error: any) => {
                                console.log(error, "errror..................");
                                this.notificationService.warn(error?.message)
                                return
                            }
                            )


                        } else {
                            this.ExtraaButtonValidationCheck = false;
                            this.ShowingErrorValForOtherButtonsCheck = false;
                            this.ShowingErrorValForOtherButtonsCheckForNsc = false;
                            console.log(this.applicationServeyErpFg.controls.erpNo.value, "erpEstimatGenrate method  erpEstimatGenrate method");
                            console.log('ccccccccccccccccccccccccccccc', this.consumerApplicationDetail?.consumerApplicationId);
                            this.consumerApplicationService.getErpEstimateAmount(this.applicationServeyErpFg.controls.erpNo.value, this.consumerApplicationDetail?.consumerApplicationId, 1).subscribe(data => {
                                if (data['code'] == "200") {
                                    // data['list'].estimateAmount = JSON.parse(data['list'].estimateAmount);
                                    // data['list'].estimateAmount = JSON.parse(data['list'].estimateAmount);
                                    console.log('222222222222', data['list'].estimateAmount);
                                    this.erpConfirmationVariable = true;
                                    this.storedErpNo = this.applicationServeyErpFg.controls.erpNo.value
                                    this.EstimateAmount = data['list'];
                                    this.notificationService.success(data['message']);
                                } else if (data['code'] == "406" && data['message'] == "Scheme code not matched") {
                                    this.notificationService.error("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
                                    return
                                }
                                else if (data['code'] == "406" && data['message'] == "Estimate is wrongly created in ERP") {
                                    this.notificationService.warn("ERP में एस्टीमेट गलत बनाया गया है।");
                                    return
                                } else if (data['code'] == "406" && data['message'] == "This ERP Number Is Already Associated With Another Application Number.") {
                                    this.notificationService.error("This ERP Number Is Already Associated With Another Application Number => " + data['list']);
                                    return
                                }
                                else {
                                    this.notificationService.error(data['message']);
                                    return
                                }
                            }, (error) => {
                            });
                        }

                    }
                    ///////////////////////////////////////////////

                } else {
                    this.notificationService.warn(data?.message);
                    return
                }

            })
        } else {

            if (this.consumerApplicationDetail?.natureOfWorkTypeId == 5) {
                if (this.oytGrouporIndividualSelectVariable == undefined) {
                    this.notificationService.warn('आवेदन का प्रकार का चयन करें !');
                    return
                }
                else if (this.oytGrouporIndividualSelectVariable == 'Group' && this.ChooseGroupSubmit == false) {
                    this.notificationService.error('! Please fill group information first');
                    return
                }

            }

            if (this.consumerApplicationDetail?.natureOfWorkTypeId == 8) {
                if (this.displayInputFieldValForMkmy == undefined) {
                    this.notificationService.warn('आवेदन का प्रकार का चयन करें !');
                    return
                }
                else if (this.displayInputFieldValForMkmy == 2 && this.closeWrittenDiv == false) {
                    this.notificationService.error('! Please fill group information first');
                    return
                }

            }

            if (this.consumerApplicationDetail?.natureOfWorkTypeId == 8 && this.mkmySubmitBoolean == false) {
                this.notificationService.error("! Please choose Load first ...");
                return;
            }

            if ((this.consumerApplicationDetail?.natureOfWorkTypeId == 3) && this.loadConfirmationBoolean == false) {
                this.notificationService.error('please confirm Load required first');
                this.ExtraaButtonValidationCheck = true;
                return
            } else if ((this.consumerApplicationDetail?.natureOfWorkTypeId == 10) && this.loadConfirmationBoolean == false) {
                this.notificationService.error('please confirm Load required first');
                this.ExtraaButtonValidationCheck = true;
                return
            }
            else if (this.consumerApplicationDetail?.natureOfWorkTypeId == 4 && this.ShowingErrorVal == false) {
                this.notificationService.error('please confirm Load required first');
                this.ShowingErrorValForOtherButtonsCheck = true;
                return
            }
            else if ((this.consumerApplicationDetail?.natureOfWorkTypeId == 2 && this.NscSubmitBoolean == false)) {
                this.notificationService.error('please confirm Load required first');
                this.ShowingErrorValForOtherButtonsCheckForNsc = true;
                return
            } else if ((this.consumerApplicationDetail?.natureOfWorkTypeId == 5 && this.NscSubmitBoolean == false)) {
                this.notificationService.error('please confirm Load required first');
                this.ShowingErrorValForOtherButtonsCheckForNsc = true;
                return
            }
            else if (this.consumerApplicationDetail?.natureOfWorkTypeId != 5 && this.radioButtonBoolean == false) {
                this.notificationService.warn("Please confirm first, Aaavedak Ka prakar is right/wrong");
                return
            }
            else {

                if (this.consumerApplicationDetail?.natureOfWorkTypeId != 5) {

                    // for non-mkmy
                    let formData: FormData = new FormData();
                    formData.append("consumerApplicationNo", this.aavedakKaPrakarConfirmationByDGM.consumerApplicationNo)
                    formData.append("isAvedakGovernmentERP", this.aavedakKaPrakarConfirmationByDGM.isAvedakGovernmentERP)
                    formData.append("isAvedakGovernmentRevise", this.aavedakKaPrakarConfirmationByDGM.isAvedakGovernmentRevise)
                    this.consumerApplicationService.aavedakKaPrakarConfirmationByDgm(formData).subscribe((respo: any) => {
                        if (respo?.code == "204") {
                            console.log(respo, "wwoowwww...............................................");
                            // this.ReturnAmtBooleanOpen = false;
                            this.ExtraaButtonValidationCheck = false;
                            this.ShowingErrorValForOtherButtonsCheck = false;
                            this.ShowingErrorValForOtherButtonsCheckForNsc = false;
                            console.log(this.applicationServeyErpFg.controls.erpNo.value, "erpEstimatGenrate method  erpEstimatGenrate method");
                            console.log('ccccccccccccccccccccccccccccc', this.consumerApplicationDetail?.consumerApplicationId);
                            this.consumerApplicationService.getErpEstimateAmount(this.applicationServeyErpFg.controls.erpNo.value, this.consumerApplicationDetail?.consumerApplicationId, 1).subscribe(data => {
                                if (data['code'] == "200") {
                                    // data['list'].estimateAmount = JSON.parse(data['list'].estimateAmount);
                                    // data['list'].estimateAmount = JSON.parse(data['list'].estimateAmount);
                                    console.log('222222222222', data['list'].estimateAmount);
                                    this.erpConfirmationVariable = true;
                                    this.storedErpNo = this.applicationServeyErpFg.controls.erpNo.value
                                    this.EstimateAmount = data['list'];
                                    this.notificationService.success(data['message']);
                                } else if (data['code'] == "406" && data['message'] == "Scheme code not matched") {
                                    this.notificationService.error("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
                                    return
                                }
                                else if (data['code'] == "406" && data['message'] == "Estimate is wrongly created in ERP") {
                                    this.notificationService.warn("ERP में एस्टीमेट गलत बनाया गया है।");
                                    return
                                } else if (data['code'] == "406" && data['message'] == "This ERP Number Is Already Associated With Another Application Number.") {
                                    this.notificationService.error("This ERP Number Is Already Associated With Another Application Number => " + data['list']);
                                    return
                                }
                                else {
                                    this.notificationService.error(data['message']);
                                    return
                                }
                            }, (error) => {
                            });

                        } else {
                            this.notificationService.warn(respo?.message)
                            return
                        }

                    }, (error: any) => {
                        console.log(error, "errror..................");
                        this.notificationService.warn(error?.message)
                        return
                    }
                    )


                } else {
                    this.ExtraaButtonValidationCheck = false;
                    this.ShowingErrorValForOtherButtonsCheck = false;
                    this.ShowingErrorValForOtherButtonsCheckForNsc = false;
                    console.log(this.applicationServeyErpFg.controls.erpNo.value, "erpEstimatGenrate method  erpEstimatGenrate method");
                    console.log('ccccccccccccccccccccccccccccc', this.consumerApplicationDetail?.consumerApplicationId);
                    this.consumerApplicationService.getErpEstimateAmount(this.applicationServeyErpFg.controls.erpNo.value, this.consumerApplicationDetail?.consumerApplicationId, 1).subscribe(data => {
                        if (data['code'] == "200") {
                            // data['list'].estimateAmount = JSON.parse(data['list'].estimateAmount);
                            // data['list'].estimateAmount = JSON.parse(data['list'].estimateAmount);
                            console.log('222222222222', data['list'].estimateAmount);
                            this.erpConfirmationVariable = true;
                            this.storedErpNo = this.applicationServeyErpFg.controls.erpNo.value
                            this.EstimateAmount = data['list'];
                            this.notificationService.success(data['message']);
                        } else if (data['code'] == "406" && data['message'] == "Scheme code not matched") {
                            this.notificationService.error("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
                            return
                        }
                        else if (data['code'] == "406" && data['message'] == "Estimate is wrongly created in ERP") {
                            this.notificationService.warn("ERP में एस्टीमेट गलत बनाया गया है।");
                            return
                        } else if (data['code'] == "406" && data['message'] == "This ERP Number Is Already Associated With Another Application Number.") {
                            this.notificationService.error("This ERP Number Is Already Associated With Another Application Number => " + data['list']);
                            return
                        }
                        else {
                            this.notificationService.error(data['message']);
                            return
                        }
                    }, (error) => {
                    });
                }

            }

        }


    }

    checkboxMkmyChane(e: any) {
        console.log(e, "wwwwwwwwwweeeeeeeeeeeeeeeee.......................");

    }

    checkValue(e: any) {
        let number = document.getElementById("returnAmount");
        //number.onkeydown = function(e) {
        if (
            !(
                (e.keyCode > 95 && e.keyCode < 106) ||
                (e.keyCode > 47 && e.keyCode < 58) ||
                e.keyCode == 8
            )
        ) {
            return false;
        }
        // }
    }

    mkmycheckBoxTureCompalsury() {
        if (this.mkmyValidatedFormForErpEstimate.invalid) {
            // alert("mkmyEstimateForm is invalid !");
            this.notificationService.error("! invalid Form");
            return
        } else if (this.mkmyFietypeValidators == true) {
            this.notificationService.error('file must be pdf only');
            return
        } else if (this.mkmyFilesizeValidators == true) {
            this.notificationService.error(' file must be less than 2MB');
            return
        }
        else {
            // alert("form submitted successfully !");
            let formData: FormData = new FormData();
            formData.append("docEstimate", this.mkmyFile);

            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let hour = today.getHours();
            // console.log(hour, "hour");
            const minutes = today.getMinutes();
            // console.log(minutes, "minutes");
            const seconds = today.getSeconds();
            // console.log(seconds, "seconds");
            let prepand = (hour >= 12) ? "PM" : "AM";
            hour = (hour >= 12) ? hour - 12 : hour;
            if (hour === 0 && prepand === 'PM') {
                if (minutes === 0 && seconds === 0) {
                    hour = 12;
                    prepand = "Noon"
                } else {
                    hour = 12;
                    prepand = "PM"
                }
            }
            if (hour === 0 && prepand === 'AM') {
                if (minutes === 0 && seconds === 0) {
                    hour = 12;
                    prepand = 'Midnight'
                } else {
                    hour = 12;
                    prepand = "AM"
                }
            }
            var time = `${hour} ${prepand} : ${minutes} : ${seconds}`
            // console.log(`current time is => ${hour} ${prepand} : ${minutes} : ${seconds}`);
            var dateTime = JSON.stringify(date) + ' ' + JSON.stringify(time);
            // console.log(dateTime);

            // let scheduleSurveyDate = JSON.stringify(date);
            // let scheduleSurveyTime = JSON.stringify(time);
            let scheduleSurveyDate = date;
            let scheduleSurveyTime = time;
            console.log(scheduleSurveyDate, "scheduleSurveyDate", scheduleSurveyTime, "scheduleSurveyTime");
            let surveyorName: any = this.userDataAll.userName
            let surveyorMobile: any = this.userDataAll.mobileNo;

            this.consumerApplicationService.updateConsumerApplicationStatus(this.consumerApplicationDetail?.consumerApplicationId, scheduleSurveyDate, scheduleSurveyTime, surveyorName, surveyorMobile, formData).subscribe(data => {
                if (data['code'] == "200") {
                    console.log('111111111111111111111111', data['list']);
                    this.mkmyerpConfirmationVariable = false;
                    this.notificationService.success(data['message']);
                    this.mkmyValidatedBoolean = true
                    this.onClose();
                } else {
                    this.notificationService.error("Data not found");
                }
            }, (error) => {
                this.notificationService.warn("Something went wrong !")
            });
        }
    }

    checkBoxTureCompalsury() {

        if (this.consumerApplicationDetail?.natureOfWorkTypeId == 3 && this.loadConfirmationBoolean == false) {
            this.notificationService.error('please confirm Load required first');
            this.ExtraaButtonValidationCheck = true;
            return
        } else if (this.consumerApplicationDetail?.natureOfWorkTypeId == 4 && this.ShowingErrorVal == false) {
            this.notificationService.error('please confirm Load required first');
            this.ShowingErrorValForOtherButtonsCheck = true;
            return
        } else if (this.consumerApplicationDetail?.natureOfWorkTypeId == 2 && this.NscSubmitBoolean == false) {
            this.notificationService.error('please confirm Load required first');
            this.ShowingErrorValForOtherButtonsCheckForNsc = true;
            return
        }
        else if (this.consumerApplicationDetail?.natureOfWorkTypeId == 5 && this.NscSubmitBoolean == false) {
            this.notificationService.error('please confirm Load required first');
            this.ShowingErrorValForOtherButtonsCheckForNsc = true;
            return
        }
        else {
            this.ExtraaButtonValidationCheck = false;
            this.ShowingErrorValForOtherButtonsCheck = false;
            this.ShowingErrorValForOtherButtonsCheckForNsc = false;
            if (this.applicationServeyCheckBoxFg.invalid) {
                this.notificationService.error('Please choose estimate file first(file must be pdf only and file must be less than 2MB) & Select CheckBox.');
                return
            } else if (this.file == undefined) {
                this.notificationService.warn("! Please  choose file first")
                return;

            }
            else if (this.fietypeValidators == true) {
                this.notificationService.error('file must be pdf only');
                return
            } else if (this.filesizeValidators == true) {
                this.notificationService.error(' file must be less than 2MB');
                return
            }

            let formData: FormData = new FormData();
            formData.append("docEstimate", this.file);





            // console.log(this.applicationServeyCheckBoxFg.controls.cb.value, 'checkBoxTureCompalsury');
            if (this.applicationServeyCheckBoxFg.controls.cb.value == false) {
                this.notificationService.error('please select check box');
            } else {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                let hour = today.getHours();
                // console.log(hour, "hour");
                const minutes = today.getMinutes();
                // console.log(minutes, "minutes");
                const seconds = today.getSeconds();
                // console.log(seconds, "seconds");
                let prepand = (hour >= 12) ? "PM" : "AM";
                hour = (hour >= 12) ? hour - 12 : hour;
                if (hour === 0 && prepand === 'PM') {
                    if (minutes === 0 && seconds === 0) {
                        hour = 12;
                        prepand = "Noon"
                    } else {
                        hour = 12;
                        prepand = "PM"
                    }
                }
                if (hour === 0 && prepand === 'AM') {
                    if (minutes === 0 && seconds === 0) {
                        hour = 12;
                        prepand = 'Midnight'
                    } else {
                        hour = 12;
                        prepand = "AM"
                    }
                }
                var time = `${hour} ${prepand} : ${minutes} : ${seconds}`
                // console.log(`current time is => ${hour} ${prepand} : ${minutes} : ${seconds}`);
                var dateTime = JSON.stringify(date) + ' ' + JSON.stringify(time);
                // console.log(dateTime);

                // let scheduleSurveyDate = JSON.stringify(date);
                // let scheduleSurveyTime = JSON.stringify(time);
                let scheduleSurveyDate = date;
                let scheduleSurveyTime = time;
                console.log(scheduleSurveyDate, "scheduleSurveyDate", scheduleSurveyTime, "scheduleSurveyTime");
                let surveyorName: any = this.userDataAll.userName
                let surveyorMobile: any = this.userDataAll.mobileNo

                this.consumerApplicationService.updateConsumerApplicationStatus(this.consumerApplicationDetail?.consumerApplicationId, scheduleSurveyDate, scheduleSurveyTime, surveyorName, surveyorMobile, formData).subscribe(data => {
                    if (data['code'] == "200") {
                        console.log('111111111111111111111111', data['list']);
                        this.consumerApplicationService.getErpEstimateAmount(this.storedErpNo, this.consumerApplicationDetail?.consumerApplicationId, 2).subscribe((resp: any) => {
                            console.log(resp, "ressssspppppppppppppppppppppppppppppp.......................................................");
                            if (resp['code'] == "200") {
                                this.erpConfirmationVariable = false;
                                this.notificationService.success(resp?.message);
                                            this.onClose();

                                // if (this.consumerApplicationDetail?.natureOfWorkTypeId == 5) {
                                //     this.consumerApplicationService.oytMaterialChargesSubmit(this.storedErpNo,this.consumerApplicationDetail?.consumerApplicationNo).subscribe((ressp: any) => {
                                //         if (ressp?.code == "200" || ressp?.code == "201" ) {
                                //             this.notificationService.success(ressp?.message);
                                //             this.onClose();
                                //         } else {
                                //             this.notificationService.warn(ressp?.message);
                                //             return
                                //         }
                                //     })
                                // } else {
                                //     this.notificationService.success(resp?.message);
                                //     this.onClose();
                                // }

                            } else if (resp['code'] == "406" && data['message'] == "This ERP Number Is Already Associated With Another Application Number.") {
                                this.notificationService.error("This ERP Number Is Already Associated With Another Application Number => " + resp['list']);
                                return
                            }
                            else {
                                this.notificationService.warn(resp['message'])
                            }

                        })

                    } else {
                        // this.EstimateStatusList = null;

                        this.notificationService.error("Data not found");

                    }

                }, (error) => {

                });


            }
        }



    }

    erpEstimatDawnload() {
        console.log('this.consumerApplicationDetail.erpWorkFlowNumber', this.consumerApplicationDetail.erpWorkFlowNumber)
        this.consumerApplicationService.getErpEstimatePDF(this.consumerApplicationDetail.erpWorkFlowNumber);
    }


    onFileChanged(event: any) {


        this.file = event.target.files[0];

        if (
            this.file.type == "application/pdf"
        ) {
            this.fietypeValidators = false;
        } else {
            this.fietypeValidators = true;
        }
        if (this.file.size > 2000000) {
            this.filesizeValidators = true;
        } else {
            this.filesizeValidators = false;
        }
    }

    onFileChangedMkmy(event: any) {
        this.mkmyFile = event.target.files[0];

        if (
            this.mkmyFile.type == "application/pdf"
        ) {
            this.mkmyFietypeValidators = false;
        } else {
            this.mkmyFietypeValidators = true;
        }
        if (this.mkmyFile.size > 2000000) {
            this.mkmyFilesizeValidators = true;
        } else {
            this.mkmyFilesizeValidators = false;
        }
    }


    onAavedakKaPrakarCheckbox(e: any) {
        console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeee..........");

    }

    aavedakKaPrakarConfirmationByDGM: AavedakKaPrakarConfirmationByDGM = new AavedakKaPrakarConfirmationByDGM()
    onRadioButtonCredit(e: any) {
        this.radioButtonBoolean = true;
        console.log(e, "eeeeeeeeeeeeeeeeeeeee");
        this.aavedakKaPrakarConfirmationByDGM.isAvedakGovernmentERP = e.value
        this.aavedakKaPrakarConfirmationByDGM.consumerApplicationNo = this.consumerApplicationDetail?.consumerApplicationNo
        this.aavedakKaPrakarConfirmationByDGM.isAvedakGovernmentRevise = null
        console.log(this.aavedakKaPrakarConfirmationByDGM, "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

    }

}












