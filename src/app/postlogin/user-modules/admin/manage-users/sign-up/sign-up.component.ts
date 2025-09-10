import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ManageCircleService } from 'src/app/postlogin/administrator/masters/services/manage-circle.service';
import { ManageDcService } from 'src/app/postlogin/administrator/masters/services/manage-dc.service';
import { ManageDiscomeService } from 'src/app/postlogin/administrator/masters/services/manage-discom.service';
import { ManageDivisionService } from 'src/app/postlogin/administrator/masters/services/manage-division.service';
import { ManageRegionService } from 'src/app/postlogin/administrator/masters/services/manage-region.service';
import { ManageSubDivisionService } from 'src/app/postlogin/administrator/masters/services/manage-sub-division.service';
import { CrudType } from 'src/app/shared-enum/crudType';
import { EmpDesignation } from 'src/app/shared-enum/emp-Designation.enum';
import { AsyncValidatorService } from 'src/app/shared-services/async-validator.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { emailValidator, mobPattern } from 'src/app/utils/app-validators';
import { ManageUserService } from '../../services/manage-user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { Attribute } from '@angular/compiler';
import { ManageSubStationService } from 'src/app/postlogin/administrator/masters/services/manage-sub-station.service';
import { ManageFeederService } from 'src/app/postlogin/administrator/masters/services/manage-feeder.service';
import { UserMultipleDcSelectionPopupComponent } from '../user-multiple-dc-selection-popup/user-multiple-dc-selection-popup.component';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject();
  registerForm: FormGroup;
  keys = Object.keys;
  empDesignation: EmpDesignation;
  Selectedlocation: string;
  disabled = false;
  // HttpClient related models call
  designationList: Array<any> = [];
  accessLevelList: Array<any> = [];
  roleList: Array<any> = [];
  discomList: Array<any> = [];
  regionList: Array<any> = [];
  circleList: Array<any> = [];
  divisionList: Array<any> = [];
  subDivisionList: Array<any> = [];
  dcList: Array<any> = [];
  userRoles: string;
  userAuthUrl: string = this.url.userAuthUrl;
  adUserDetail: any;
  flagAdminLogin: boolean = true;
  loginAdUserDetail: any;
  subStationList: Array<any> = [];
  feederList: Array<any> = [];
  divisionName: any
  dcListByDivisionId:Array<any> = []



  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private asyncValidator: AsyncValidatorService,
    public dialogRef: MatDialogRef<SignUpComponent>,
    private manageUserService: ManageUserService,
    private manageDiscomeService: ManageDiscomeService,
    private manageRegionService: ManageRegionService,
    private manageCircleService: ManageCircleService,
    private manageDivisionService: ManageDivisionService,
    private manageSubdivisionService: ManageSubDivisionService,
    private manageDCService: ManageDcService,
    private notificationService: NotificationService,
    private jwtHelperService: JwtHelperService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private url: GenerateUrl,

    private ManageSubStationService: ManageSubStationService,
    private ManageFeederService: ManageFeederService,

  ) { }
  // variable to be needed on asyncValidators
  crudType = this.data.crudType;
  rowId = this.data.userId;
  async ngOnInit() {

    // sandeep, start
    this.userRoles = this.jwtHelperService.decodeToken(sessionStorage.getItem('usertoken')).roles
    console.log("userRoles :- ", this.userRoles);

    if (this.userRoles == 'HR_MANAGER'
      || this.userRoles == 'AE_IT') {

      console.log("ngOnInit before:- ", this.flagAdminLogin);
      this.flagAdminLogin = false;
      console.log("ngOnInit after:- ", this.flagAdminLogin);

      const userLoginId = this.jwtHelperService.decodeToken(sessionStorage.getItem('usertoken')).sub
      console.log("userLoginId :- ", userLoginId);

      this.manageUserService.getUserByLoginId(userLoginId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
        this.loginAdUserDetail = data['list'];

        this.managelocaton('' + this.loginAdUserDetail[0].accessLevel);

        this.registerForm.get('discomId').enable();
        this.registerForm.get('regionId').enable();
        this.registerForm.get('circleId').enable();

        if (this.loginAdUserDetail[0].accessLevel === "1") {
          this.registerForm.controls['accessLevel'].setValue(+this.loginAdUserDetail[0].accessLevel);
          this.registerForm.controls['discomId'].setValue(this.loginAdUserDetail[0].userDiscom.discomId);
        } else if (this.loginAdUserDetail[0].accessLevel === "2") {
          this.onChangeDiscom(this.loginAdUserDetail[0].userDiscom.discomId);
          this.registerForm.controls['accessLevel'].setValue(+this.loginAdUserDetail[0].accessLevel);
          this.registerForm.controls['discomId'].setValue(this.loginAdUserDetail[0].userDiscom.discomId);
          this.registerForm.controls['regionId'].setValue(this.loginAdUserDetail[0].userRegion.regionId);
        } else if (this.loginAdUserDetail[0].accessLevel === "3") {
          this.onChangeDiscom(this.loginAdUserDetail[0].userDiscom.discomId);
          this.onChangeRegion(this.loginAdUserDetail[0].userRegion.regionId);
          this.onChangeCircle(this.loginAdUserDetail[0].userCircle.circleId);
          this.registerForm.controls['accessLevel'].setValue(+this.loginAdUserDetail[0].accessLevel);
          this.registerForm.controls['discomId'].setValue(this.loginAdUserDetail[0].userDiscom.discomId);
          this.registerForm.controls['regionId'].setValue(this.loginAdUserDetail[0].userRegion.regionId);
          this.registerForm.controls['circleId'].setValue(this.loginAdUserDetail[0].userCircle.circleId);
        } else if (this.loginAdUserDetail[0].accessLevel === "4") {
          this.onChangeDiscom(this.loginAdUserDetail[0].userDiscom.discomId);
          this.onChangeRegion(this.loginAdUserDetail[0].userRegion.regionId);
          this.onChangeCircle(this.loginAdUserDetail[0].userCircle.circleId);
          this.registerForm.controls['accessLevel'].setValue(+this.loginAdUserDetail[0].accessLevel);
          this.registerForm.controls['discomId'].setValue(this.loginAdUserDetail[0].userDiscom.discomId);
          this.registerForm.controls['regionId'].setValue(this.loginAdUserDetail[0].userRegion.regionId);
          this.registerForm.controls['circleId'].setValue(this.loginAdUserDetail[0].userCircle.circleId);
          this.registerForm.controls['divisionId'].setValue(this.loginAdUserDetail[0].userDivision.divisionId);
        } else if (this.loginAdUserDetail[0].accessLevel === "5") {
          this.onChangeDiscom(this.loginAdUserDetail[0].userDiscom.discomId);
          this.onChangeRegion(this.loginAdUserDetail[0].userRegion.regionId);
          this.onChangeCircle(this.loginAdUserDetail[0].userCircle.circleId);
          this.onChangeDivision(this.loginAdUserDetail[0].userDivision.divisionId);
          this.registerForm.controls['accessLevel'].setValue(+this.loginAdUserDetail[0].accessLevel);
          this.registerForm.controls['discomId'].setValue(this.loginAdUserDetail[0].userDiscom.discomId);
          this.registerForm.controls['regionId'].setValue(this.loginAdUserDetail[0].userRegion.regionId);
          this.registerForm.controls['circleId'].setValue(this.loginAdUserDetail[0].userCircle.circleId);
          this.registerForm.controls['divisionId'].setValue(this.loginAdUserDetail[0].userDivision.divisionId);
          this.registerForm.controls['subDivisionId'].setValue(this.loginAdUserDetail[0].userSubDivision.subDivisionId);
        } else if (this.loginAdUserDetail[0].accessLevel === "6") {
          this.onChangeDiscom(this.loginAdUserDetail[0].userDiscom.discomId);
          this.onChangeRegion(this.loginAdUserDetail[0].userRegion.regionId);
          this.onChangeCircle(this.loginAdUserDetail[0].userCircle.circleId);
          this.onChangeDivision(this.loginAdUserDetail[0].userDivision.divisionId);
          this.onChangeSubDivision(this.loginAdUserDetail[0].userSubDivision.subDivisionId);
          this.registerForm.controls['accessLevel'].setValue(+this.loginAdUserDetail[0].accessLevel);
          this.registerForm.controls['discomId'].setValue(this.loginAdUserDetail[0].userDiscom.discomId);
          this.registerForm.controls['regionId'].setValue(this.loginAdUserDetail[0].userRegion.regionId);
          this.registerForm.controls['circleId'].setValue(this.loginAdUserDetail[0].userCircle.circleId);
          this.registerForm.controls['divisionId'].setValue(this.loginAdUserDetail[0].userDivision.divisionId);
          this.registerForm.controls['subDivisionId'].setValue(this.loginAdUserDetail[0].userSubDivision.subDivisionId);
          this.registerForm.controls['dcId'].setValue(this.loginAdUserDetail[0].userDc.dcId);
        } else if (this.loginAdUserDetail[0].accessLevel === "7") {
          this.onChangeDiscom(this.loginAdUserDetail[0].userDiscom.discomId);
          this.onChangeRegion(this.loginAdUserDetail[0].userRegion.regionId);
          this.onChangeCircle(this.loginAdUserDetail[0].userCircle.circleId);
          this.onChangeDivision(this.loginAdUserDetail[0].userDivision.divisionId);
          this.onChangeSubDivision(this.loginAdUserDetail[0].userSubDivision.subDivisionId);
          this.registerForm.controls['accessLevel'].setValue(+this.loginAdUserDetail[0].accessLevel);
          this.registerForm.controls['discomId'].setValue(this.loginAdUserDetail[0].userDiscom.discomId);
          this.registerForm.controls['regionId'].setValue(this.loginAdUserDetail[0].userRegion.regionId);
          this.registerForm.controls['circleId'].setValue(this.loginAdUserDetail[0].userCircle.circleId);
          this.registerForm.controls['divisionId'].setValue(this.loginAdUserDetail[0].userDivision.divisionId);
          this.registerForm.controls['subDivisionId'].setValue(this.loginAdUserDetail[0].userSubDivision.subDivisionId);
        } else if (this.loginAdUserDetail[0].accessLevel === "8") {
          this.onChangeDiscom(this.loginAdUserDetail[0].userDiscom.discomId);
          this.onChangeRegion(this.loginAdUserDetail[0].userRegion.regionId);
          this.onChangeCircle(this.loginAdUserDetail[0].userCircle.circleId);
          this.onChangeDivision(this.loginAdUserDetail[0].userDivision.divisionId);
          this.onChangeSubDivision(this.loginAdUserDetail[0].userSubDivision.subDivisionId);
          this.onChangeDC(this.loginAdUserDetail[0].userSubDivision.divisionId)
          this.onChangeSubstation(this.loginAdUserDetail[0].userSubDivision.substationId)
          this.registerForm.controls['accessLevel'].setValue(+this.loginAdUserDetail[0].accessLevel);
          this.registerForm.controls['discomId'].setValue(this.loginAdUserDetail[0].userDiscom.discomId);
          this.registerForm.controls['regionId'].setValue(this.loginAdUserDetail[0].userRegion.regionId);
          this.registerForm.controls['circleId'].setValue(this.loginAdUserDetail[0].userCircle.circleId);
          this.registerForm.controls['divisionId'].setValue(this.loginAdUserDetail[0].userDivision.divisionId);
          this.registerForm.controls['subDivisionId'].setValue(this.loginAdUserDetail[0].userSubDivision.subDivisionId);
        }

        console.log(this.registerForm, "registerForm.........................");


      });

    }
    // sandeep, end

    this.registerForm = this.fb.group({
      userId: [null, { validators: [Validators.required], asyncValidators: [this.asyncValidator.AsyncValidator('user', this.crudType, this.rowId, 'userId')], updateOn: 'blur' }],
      // designationId: ['', Validators.compose([Validators.required])],
      userName: ['', Validators.compose([Validators.required])],
      // userEmailId: [null, { validators: [Validators.required, emailValidator], asyncValidators: [this.asyncValidator.AsyncValidator('user', this.crudType, this.rowId, 'email')], updateOn: 'blur' }],
      // aadharNo: [null, { validators: [Validators.required], asyncValidators: [this.asyncValidator.AsyncValidator('user', this.crudType, this.rowId, 'aadhar')], updateOn: 'blur' }],
      // mobileNo: [null, { validators: [Validators.required, mobPattern], asyncValidators: [this.asyncValidator.AsyncValidator('user', this.crudType, this.rowId, 'mobile')], updateOn: 'blur' }],
      mobileNo: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      accessLevel: ['', Validators.compose([Validators.required])],
      discomId: [{ value: '', disabled: false }, Validators.required],
      regionId: [{ value: '', disabled: false }, Validators.required],
      circleId: [{ value: '', disabled: false }, Validators.required],
      divisionId: [{ value: '', disabled: false }, Validators.required],
      subDivisionId: [{ value: '', disabled: false }, Validators.required],
      dcId: [{ value: '', disabled: false }, Validators.required],
      userRoles: ['', Validators.compose([Validators.required])],
      substationId: [{ value: '', disabled: true }],
      feederId: [{ value: '', disabled: true }],
      // userCredentials: ['HtUser@123', Validators.compose([Validators.required, pwdPattern])],
      // confirmPassword: ['HtUser@123', Validators.required]
    });




    // HttpClient related method call
    this.getHttpResponce();
    this.initializeForm();
    // this.registerForm.controls['userCredentials'].setValue('HtUser@123');
    // this.registerForm.controls['confirmPassword'].setValue('HtUser@123');
  }


  initializeForm() {
    if (this.data.crudType === CrudType.update) {
      this.loadFormToEdit();

    } else {
      // this.registerForm.reset();
    }
  }
  loadFormToEdit() {
    this.manageUserService.getUserById(this.data.userId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      console.log(data, "dddaaatatatatatatatatatatta....................sssssssssssss");

      const list: any = data['list'];

      // console.log('list:- ', list);

      const roles: any = list[0].userRoles;
      const roleArray = roles.map(o => {
        return o.roleId;
      });
      console.log(this.registerForm.controls, "ooooooooooopppppppsssssssssssssss");

      // this.managelocaton('' + list[0].accessLevel);
      this.registerForm.controls['userId'].setValue(list[0].userId);
      // this.registerForm.controls['designationId'].setValue(list[0].userDesignation.designationId);
      this.registerForm.controls['userName'].setValue(list[0].userName);
      // this.registerForm.controls['userEmailId'].setValue(list[0].userEmailId);
      // this.registerForm.controls['aadharNo'].setValue(list[0].aadharNo);
      this.registerForm.controls['mobileNo'].setValue(list[0].mobileNo);
      // this.registerForm.controls['accessLevel'].setValue('' + list[0].accessLevel);
      this.registerForm.controls['userRoles'].setValue(roleArray);

      // sandeep, starts

      // if (list[0].accessLevel === "2") {
      //   this.registerForm.controls['regionId'].setValue(list[0].userRegion.regionId);
      // } else if (list[0].accessLevel === "3") {
      //   // onChangeCicle
      //   this.onChangeCicle(list[0].userRegion.regionId);
      //   this.registerForm.controls['regionId'].setValue(list[0].userRegion.regionId);
      //   this.registerForm.controls['circleId'].setValue(list[0].userCircle.circleId);
      // }
      this.managelocaton(list[0].accessLevel);
      if (list[0].accessLevel === "1") {
        this.registerForm.controls['accessLevel'].setValue(+list[0].accessLevel);
        this.registerForm.controls['discomId'].setValue(list[0].userDiscom.discomId);
        // this.registerForm.controls['discomId'].setValidators([Validators.required]);
        // this.registerForm.get('regionId').clearValidators();
        // this.registerForm.get('circleId').clearValidators();
        // this.registerForm.get('divisionId').clearValidators();
        // this.registerForm.get('subDivisionId').clearValidators();
        // this.registerForm.get('dcId').clearValidators();
        // this.registerForm.get('substationId').clearValidators();
        // this.registerForm.get('feederId').clearValidators();

        // this.registerForm.controls['discomId'].updateValueAndValidity();
        // this.registerForm.get('regionId').updateValueAndValidity();
        // this.registerForm.get('circleId').updateValueAndValidity();
        // this.registerForm.get('divisionId').updateValueAndValidity();
        // this.registerForm.get('subDivisionId').updateValueAndValidity();
        // this.registerForm.get('dcId').updateValueAndValidity();
        // this.registerForm.get('substationId').updateValueAndValidity();
        // this.registerForm.get('feederId').updateValueAndValidity();

        this.registerForm.get('discomId').enable();
        this.registerForm.get('regionId').disable();
        this.registerForm.get('circleId').disable();
        this.registerForm.get('divisionId').disable();
        this.registerForm.get('subDivisionId').disable();
        this.registerForm.get('dcId').disable();
        this.registerForm.get('substationId').disable();
        this.registerForm.get('feederId').disable();
      } else if (list[0].accessLevel === "2") {
        this.onChangeDiscom(list[0].userDiscom.discomId);
        this.registerForm.controls['accessLevel'].setValue(+list[0].accessLevel);
        this.registerForm.controls['discomId'].setValue(list[0].userDiscom.discomId);
        this.registerForm.controls['regionId'].setValue(list[0].userRegion.regionId);

        // this.registerForm.controls['discomId'].setValidators([Validators.required]);
        // this.registerForm.get('regionId').setValidators([Validators.required]);
        // this.registerForm.get('circleId').clearValidators();
        // this.registerForm.get('divisionId').clearValidators();
        // this.registerForm.get('subDivisionId').clearValidators();
        // this.registerForm.get('dcId').clearValidators();
        // this.registerForm.get('substationId').clearValidators();
        // this.registerForm.get('feederId').clearValidators();

        // this.registerForm.controls['discomId'].updateValueAndValidity();
        // this.registerForm.get('regionId').updateValueAndValidity();
        // this.registerForm.get('circleId').updateValueAndValidity();
        // this.registerForm.get('divisionId').updateValueAndValidity();
        // this.registerForm.get('subDivisionId').updateValueAndValidity();
        // this.registerForm.get('dcId').updateValueAndValidity();
        // this.registerForm.get('substationId').updateValueAndValidity();
        // this.registerForm.get('feederId').updateValueAndValidity();

        this.registerForm.get('discomId').enable();
        this.registerForm.get('regionId').enable();
        this.registerForm.get('circleId').disable();
        this.registerForm.get('divisionId').disable();
        this.registerForm.get('subDivisionId').disable();
        this.registerForm.get('dcId').disable();
        this.registerForm.get('substationId').disable();
        this.registerForm.get('feederId').disable();

      } else if (list[0].accessLevel === "3") {
        this.onChangeDiscom(list[0].userDiscom.discomId);
        this.onChangeRegion(list[0].userRegion.regionId);
        console.log(list[0].userDiscom.discomId, "list[0].userDiscom.discomId.............1111111111111111111111111..............@@@@@");

        this.registerForm.controls['accessLevel'].setValue(+list[0].accessLevel);
        console.log(list[0].userDiscom.discomId, "list[0].userDiscom.discomId.............1111111111111111111111111222222222222222222222222..............@@@@@");
        this.registerForm.controls['discomId'].setValue(list[0].userDiscom.discomId);
        console.log(list[0].userDiscom.discomId, "list[0].userDiscom.discomId.............1111111111111111111111111222222222222222222222222333333333333..............@@@@@");
        console.log(this.registerForm.value.discomId, "this.registerForm.value.discomId.........111111111111111122222222333333333333334444444444444444444");

        this.registerForm.controls['regionId'].setValue(list[0].userRegion.regionId);
        this.registerForm.controls['circleId'].setValue(list[0].userCircle.circleId);
        console.log(this.registerForm, "99999999999999999993333333333qqqqqqqqqqqqqqqqqqq");
        // this.registerForm.get('discomId').setValidators([Validators.required]);
        // this.registerForm.get('regionId').setValidators([Validators.required]);
        // this.registerForm.get('circleId').setValidators([Validators.required]);
        // this.registerForm.get('divisionId').clearValidators();
        // this.registerForm.get('subDivisionId').clearValidators();
        // this.registerForm.get('dcId').clearValidators();
        // this.registerForm.get('substationId').clearValidators();
        // this.registerForm.get('feederId').clearValidators(); 

        // this.registerForm.get['discomId'].updateValueAndValidity();
        // this.registerForm.get('regionId').updateValueAndValidity();
        // this.registerForm.get('circleId').updateValueAndValidity();
        // this.registerForm.get('divisionId').updateValueAndValidity();
        // this.registerForm.get('subDivisionId').updateValueAndValidity();
        // this.registerForm.get('dcId').updateValueAndValidity();
        // this.registerForm.get('substationId').updateValueAndValidity();
        // this.registerForm.get('feederId').updateValueAndValidity(); 

        this.registerForm.get('discomId').enable();
        this.registerForm.get('regionId').enable();
        this.registerForm.get('circleId').enable();
        this.registerForm.get('divisionId').disable();
        this.registerForm.get('subDivisionId').disable();
        this.registerForm.get('dcId').disable();
        this.registerForm.get('substationId').disable();
        this.registerForm.get('feederId').disable();
        console.log(this.registerForm, "99999999999999999993333333333qqqqqqqqqqqqqqqqqqq..........................................");

      } else if (list[0].accessLevel === "4") {
        this.onChangeDiscom(list[0].userDiscom.discomId);
        this.onChangeRegion(list[0].userRegion.regionId);
        this.onChangeCircle(list[0].userCircle.circleId);
        this.registerForm.controls['accessLevel'].setValue(+list[0].accessLevel);
        this.registerForm.controls['discomId'].setValue(list[0].userDiscom.discomId);
        this.registerForm.controls['regionId'].setValue(list[0].userRegion.regionId);
        this.registerForm.controls['circleId'].setValue(list[0].userCircle.circleId);
        this.registerForm.controls['divisionId'].setValue(list[0].userDivision.divisionId);
        // this.registerForm.controls['discomId'].setValidators([Validators.required]);
        // this.registerForm.get('regionId').setValidators([Validators.required]);
        // this.registerForm.get('circleId').setValidators([Validators.required]);
        // this.registerForm.get('divisionId').setValidators([Validators.required]);
        // this.registerForm.get('subDivisionId').clearValidators();
        // this.registerForm.get('dcId').clearValidators();
        // this.registerForm.get('substationId').clearValidators();
        // this.registerForm.get('feederId').clearValidators();   

        // this.registerForm.controls['discomId'].updateValueAndValidity();
        // this.registerForm.get('regionId').updateValueAndValidity();
        // this.registerForm.get('circleId').updateValueAndValidity();
        // this.registerForm.get('divisionId').updateValueAndValidity();
        // this.registerForm.get('subDivisionId').updateValueAndValidity();
        // this.registerForm.get('dcId').updateValueAndValidity();
        // this.registerForm.get('substationId').updateValueAndValidity();
        // this.registerForm.get('feederId').updateValueAndValidity();   

        this.registerForm.get('discomId').enable();
        this.registerForm.get('regionId').enable();
        this.registerForm.get('circleId').enable();
        this.registerForm.get('divisionId').enable();
        this.registerForm.get('subDivisionId').disable();
        this.registerForm.get('dcId').disable();
        this.registerForm.get('substationId').disable();
        this.registerForm.get('feederId').disable();

      } else if (list[0].accessLevel === "5") {
        this.onChangeDiscom(list[0].userDiscom.discomId);
        this.onChangeRegion(list[0].userRegion.regionId);
        this.onChangeCircle(list[0].userCircle.circleId);
        this.onChangeDivision(list[0].userDivision.divisionId);
        this.registerForm.controls['accessLevel'].setValue(+list[0].accessLevel);
        this.registerForm.controls['discomId'].setValue(list[0].userDiscom.discomId);
        this.registerForm.controls['regionId'].setValue(list[0].userRegion.regionId);
        this.registerForm.controls['circleId'].setValue(list[0].userCircle.circleId);
        this.registerForm.controls['divisionId'].setValue(list[0].userDivision.divisionId);
        this.registerForm.controls['subDivisionId'].setValue(list[0].userSubDivision.subDivisionId);
        // this.registerForm.controls['discomId'].setValidators([Validators.required]);
        // this.registerForm.get('regionId').setValidators([Validators.required]);
        // this.registerForm.get('circleId').setValidators([Validators.required]);
        // this.registerForm.get('divisionId').setValidators([Validators.required]);
        // this.registerForm.get('subDivisionId').setValidators([Validators.required]);
        // this.registerForm.get('dcId').clearValidators();
        // this.registerForm.get('substationId').clearValidators();
        // this.registerForm.get('feederId').clearValidators();  

        // this.registerForm.controls['discomId'].updateValueAndValidity();
        // this.registerForm.get('regionId').updateValueAndValidity();
        // this.registerForm.get('circleId').updateValueAndValidity();
        // this.registerForm.get('divisionId').updateValueAndValidity();
        // this.registerForm.get('subDivisionId').updateValueAndValidity();
        // this.registerForm.get('dcId').updateValueAndValidity();
        // this.registerForm.get('substationId').updateValueAndValidity();
        // this.registerForm.get('feederId').updateValueAndValidity();  

        this.registerForm.get('discomId').enable();
        this.registerForm.get('regionId').enable();
        this.registerForm.get('circleId').enable();
        this.registerForm.get('divisionId').enable();
        this.registerForm.get('subDivisionId').enable();
        this.registerForm.get('dcId').disable();
        this.registerForm.get('substationId').disable();
        this.registerForm.get('feederId').disable();
      } else if (list[0].accessLevel === "6") {
        this.onChangeDiscom(list[0].userDiscom.discomId);
        this.onChangeRegion(list[0].userRegion.regionId);
        this.onChangeCircle(list[0].userCircle.circleId);
        this.onChangeDivision(list[0].userDivision.divisionId);
        this.onChangeSubDivision(list[0].userSubDivision.subDivisionId);
        this.registerForm.controls['accessLevel'].setValue(+list[0].accessLevel);
        this.registerForm.controls['discomId'].setValue(list[0].userDiscom.discomId);
        this.registerForm.controls['regionId'].setValue(list[0].userRegion.regionId);
        this.registerForm.controls['circleId'].setValue(list[0].userCircle.circleId);
        this.registerForm.controls['divisionId'].setValue(list[0].userDivision.divisionId);
        this.registerForm.controls['subDivisionId'].setValue(list[0].userSubDivision.subDivisionId);
        this.registerForm.controls['dcId'].setValue(list[0].userDc.dcId);
        this.registerForm.controls['substationId'].setValue(list[0].userDc.substationId);
        this.registerForm.controls['feederId'].setValue(list[0].userDc.feederId);
        // this.registerForm.controls['discomId'].setValidators([Validators.required]);
        // this.registerForm.get('regionId').setValidators([Validators.required]);
        // this.registerForm.get('circleId').setValidators([Validators.required]);
        // this.registerForm.get('divisionId').setValidators([Validators.required]);
        // this.registerForm.get('subDivisionId').setValidators([Validators.required]);
        // this.registerForm.get('dcId').setValidators([Validators.required]);
        // this.registerForm.get('substationId').clearValidators();
        // this.registerForm.get('feederId').clearValidators();
        // this.registerForm.get('substationId').enable();
        // this.registerForm.get('feederId').enable();

        // this.registerForm.controls['discomId'].updateValueAndValidity();
        // this.registerForm.get('regionId').updateValueAndValidity();
        // this.registerForm.get('circleId').updateValueAndValidity();
        // this.registerForm.get('divisionId').updateValueAndValidity();
        // this.registerForm.get('subDivisionId').updateValueAndValidity();
        // this.registerForm.get('dcId').updateValueAndValidity();
        // this.registerForm.get('substationId').updateValueAndValidity();
        // this.registerForm.get('feederId').updateValueAndValidity();

        this.registerForm.get('discomId').enable();
        this.registerForm.get('regionId').enable();
        this.registerForm.get('circleId').enable();
        this.registerForm.get('divisionId').enable();
        this.registerForm.get('subDivisionId').enable();
        this.registerForm.get('dcId').enable();
        this.registerForm.get('substationId').enable();
        this.registerForm.get('feederId').enable();
      }

      // sandeep, ends
    });

    console.log(this.registerForm, "registerForm.........................");
  }


  managelocaton(value) {
    console.log(value, "managelocaton....................................");

    const valueof = '' + value;
    console.log('calling method managelocaton');
    console.log("valueof :- ", valueof);

    this.manageDiscomeService.getDiscomList().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.discomList = data['list'];
        console.log('discom list ', this.discomList);
      });

    if (this.userRoles == 'HR_MANAGER'
      || this.userRoles == 'AE_IT' ||
      this.userRoles == "Admin") {

      if (value === 1) {  //.updateValueAndValidity()
        // this.registerForm.controls['discomId'].setValidators([Validators.required]);
        // this.registerForm.get('regionId').clearValidators();
        // this.registerForm.get('circleId').clearValidators();
        // this.registerForm.get('divisionId').clearValidators();
        // this.registerForm.get('subDivisionId').clearValidators();
        // this.registerForm.get('dcId').clearValidators();
        // this.registerForm.get('substationId').clearValidators();
        // this.registerForm.get('feederId').clearValidators();

        // this.registerForm.controls['discomId'].updateValueAndValidity();
        // this.registerForm.get('regionId').updateValueAndValidity();
        // this.registerForm.get('circleId').updateValueAndValidity();
        // this.registerForm.get('divisionId').updateValueAndValidity();
        // this.registerForm.get('subDivisionId').updateValueAndValidity();
        // this.registerForm.get('dcId').updateValueAndValidity();
        // this.registerForm.get('substationId').updateValueAndValidity();
        // this.registerForm.get('feederId').updateValueAndValidity();




        this.regionList = null;
        this.circleList = null;
        this.divisionList = null;
        this.subDivisionList = null;
        this.dcList = null;
        this.registerForm.get('discomId').enable();
        this.registerForm.get('regionId').setValue('');
        this.registerForm.get('circleId').setValue('');
        this.registerForm.get('divisionId').setValue('');
        this.registerForm.get('subDivisionId').setValue('');
        this.registerForm.get('dcId').setValue('');
        this.registerForm.get('regionId').disable();
        this.registerForm.get('circleId').disable();
        this.registerForm.get('divisionId').disable();
        this.registerForm.get('subDivisionId').disable();
        this.registerForm.get('dcId').disable();

      } else if (value === 2) {  //.updateValueAndValidity();


        this.registerForm.controls['discomId'].setValidators([Validators.required]);
        this.registerForm.get('regionId').setValidators([Validators.required]);
        this.registerForm.get('circleId').clearValidators();
        this.registerForm.get('divisionId').clearValidators();
        this.registerForm.get('subDivisionId').clearValidators();
        this.registerForm.get('dcId').clearValidators();
        this.registerForm.get('substationId').clearValidators();
        this.registerForm.get('feederId').clearValidators();

        this.registerForm.controls['discomId'].updateValueAndValidity();
        this.registerForm.get('regionId').updateValueAndValidity();
        this.registerForm.get('circleId').updateValueAndValidity();
        this.registerForm.get('divisionId').updateValueAndValidity();
        this.registerForm.get('subDivisionId').updateValueAndValidity();
        this.registerForm.get('dcId').updateValueAndValidity();
        this.registerForm.get('substationId').updateValueAndValidity();
        this.registerForm.get('feederId').updateValueAndValidity();


        this.circleList = null;
        this.divisionList = null;
        this.subDivisionList = null;
        this.dcList = null;
        this.registerForm.get('discomId').enable();
        this.registerForm.get('regionId').enable();
        this.registerForm.get('circleId').setValue('');
        this.registerForm.get('divisionId').setValue('');
        this.registerForm.get('subDivisionId').setValue('');
        this.registerForm.get('dcId').setValue('');
        this.registerForm.get('circleId').disable();
        this.registerForm.get('divisionId').disable();
        this.registerForm.get('subDivisionId').disable();
        this.registerForm.get('dcId').disable();
      } else if (value === 3) {  //.updateValueAndValidity();  .setValidators([Validators.required]);

        this.registerForm.get('discomId').setValidators([Validators.required]);
        this.registerForm.get('regionId').setValidators([Validators.required]);
        this.registerForm.get('circleId').setValidators([Validators.required]);
        this.registerForm.get('divisionId').clearValidators();
        this.registerForm.get('subDivisionId').clearValidators();
        this.registerForm.get('dcId').clearValidators();
        this.registerForm.get('substationId').clearValidators();
        this.registerForm.get('feederId').clearValidators();

        this.registerForm.get['discomId'].updateValueAndValidity();
        this.registerForm.get('regionId').updateValueAndValidity();
        this.registerForm.get('circleId').updateValueAndValidity();
        this.registerForm.get('divisionId').updateValueAndValidity();
        this.registerForm.get('subDivisionId').updateValueAndValidity();
        this.registerForm.get('dcId').updateValueAndValidity();
        this.registerForm.get('substationId').updateValueAndValidity();
        this.registerForm.get('feederId').updateValueAndValidity();


        // this.onChangeCircle(this.loginAdUserDetail[0].userCircle.circleId);

        this.divisionList = null;
        this.subDivisionList = null;
        this.dcList = null;
        this.registerForm.get('discomId').enable();
        this.registerForm.get('regionId').enable();
        this.registerForm.get('circleId').enable();
        this.registerForm.get('divisionId').setValue('');
        this.registerForm.get('subDivisionId').setValue('');
        this.registerForm.get('dcId').setValue('');
        this.registerForm.get('divisionId').disable();
        this.registerForm.get('subDivisionId').disable();
        this.registerForm.get('dcId').disable();
      } else if (value === 4) {  //.updateValueAndValidity();
        this.registerForm.controls['discomId'].setValidators([Validators.required]);
        this.registerForm.get('regionId').setValidators([Validators.required]);
        this.registerForm.get('circleId').setValidators([Validators.required]);
        this.registerForm.get('divisionId').setValidators([Validators.required]);
        this.registerForm.get('subDivisionId').clearValidators();
        this.registerForm.get('dcId').clearValidators();
        this.registerForm.get('substationId').clearValidators();
        this.registerForm.get('feederId').clearValidators();

        this.registerForm.controls['discomId'].updateValueAndValidity();
        this.registerForm.get('regionId').updateValueAndValidity();
        this.registerForm.get('circleId').updateValueAndValidity();
        this.registerForm.get('divisionId').updateValueAndValidity();
        this.registerForm.get('subDivisionId').updateValueAndValidity();
        this.registerForm.get('dcId').updateValueAndValidity();
        this.registerForm.get('substationId').updateValueAndValidity();
        this.registerForm.get('feederId').updateValueAndValidity();



        this.subDivisionList = null;
        this.dcList = null;
        this.registerForm.get('discomId').enable();
        this.registerForm.get('regionId').enable();
        this.registerForm.get('circleId').enable();
        this.registerForm.get('divisionId').enable();
        this.registerForm.get('subDivisionId').setValue('');
        this.registerForm.get('dcId').setValue('');
        this.registerForm.get('dcId').disable();
      } else if (value === 5) {  //.updateValueAndValidity();

        this.registerForm.controls['discomId'].setValidators([Validators.required]);
        this.registerForm.get('regionId').setValidators([Validators.required]);
        this.registerForm.get('circleId').setValidators([Validators.required]);
        this.registerForm.get('divisionId').setValidators([Validators.required]);
        this.registerForm.get('subDivisionId').setValidators([Validators.required]);
        this.registerForm.get('dcId').clearValidators();
        this.registerForm.get('substationId').clearValidators();
        this.registerForm.get('feederId').clearValidators();

        this.registerForm.controls['discomId'].updateValueAndValidity();
        this.registerForm.get('regionId').updateValueAndValidity();
        this.registerForm.get('circleId').updateValueAndValidity();
        this.registerForm.get('divisionId').updateValueAndValidity();
        this.registerForm.get('subDivisionId').updateValueAndValidity();
        this.registerForm.get('dcId').updateValueAndValidity();
        this.registerForm.get('substationId').updateValueAndValidity();
        this.registerForm.get('feederId').updateValueAndValidity();

        this.dcList = null;
        this.registerForm.get('discomId').enable();
        this.registerForm.get('regionId').enable();
        this.registerForm.get('circleId').enable();
        this.registerForm.get('divisionId').enable();
        this.registerForm.get('subDivisionId').enable();
        this.registerForm.get('dcId').setValue('');
        this.registerForm.get('dcId').disable();
      } else if (value === 6) {  //.updateValueAndValidity();


        this.registerForm.controls['discomId'].setValidators([Validators.required]);
        this.registerForm.get('regionId').setValidators([Validators.required]);
        this.registerForm.get('circleId').setValidators([Validators.required]);
        this.registerForm.get('divisionId').setValidators([Validators.required]);
        this.registerForm.get('subDivisionId').setValidators([Validators.required]);
        this.registerForm.get('dcId').setValidators([Validators.required]);
        this.registerForm.get('substationId').clearValidators();
        this.registerForm.get('feederId').clearValidators();
        this.registerForm.get('substationId').enable();
        this.registerForm.get('feederId').enable();

        this.registerForm.controls['discomId'].updateValueAndValidity();
        this.registerForm.get('regionId').updateValueAndValidity();
        this.registerForm.get('circleId').updateValueAndValidity();
        this.registerForm.get('divisionId').updateValueAndValidity();
        this.registerForm.get('subDivisionId').updateValueAndValidity();
        this.registerForm.get('dcId').updateValueAndValidity();
        this.registerForm.get('substationId').updateValueAndValidity();
        this.registerForm.get('feederId').updateValueAndValidity();

        this.discomList = null;
        this.regionList = null;
        this.circleList = null;
        this.divisionList = null;
        this.subDivisionList = null;
        this.dcList = null;


        this.registerForm.get('discomId').enable();
        this.registerForm.get('regionId').enable();
        this.registerForm.get('circleId').enable();
        this.registerForm.get('divisionId').enable();
        this.registerForm.get('subDivisionId').enable();
        this.registerForm.get('dcId').enable();
      }
      else if (valueof === '') {
        this.discomList = null;
        this.regionList = null;
        this.circleList = null;
        this.divisionList = null;
        this.subDivisionList = null;
        this.dcList = null;
        this.registerForm.get('discomId').setValue('');
        this.registerForm.get('regionId').setValue('');
        this.registerForm.get('circleId').setValue('');
        this.registerForm.get('divisionId').setValue('');
        this.registerForm.get('subDivisionId').setValue('');
        this.registerForm.get('dcId').setValue('');
        this.registerForm.get('discomId').disable();
        this.registerForm.get('regionId').disable();
        this.registerForm.get('circleId').disable();
        this.registerForm.get('divisionId').disable();
        this.registerForm.get('subDivisionId').disable();
        this.registerForm.get('dcId').disable();
      }

    }
    // else {

    //   if (valueof === '1') {
    //     this.discomList = null;
    //     this.regionList = null;
    //     this.circleList = null;
    //     this.divisionList = null;
    //     this.subDivisionList = null;
    //     this.dcList = null;
    //     this.registerForm.get('discomId').enable();
    //     this.registerForm.get('regionId').setValue('');
    //     this.registerForm.get('circleId').setValue('');
    //     this.registerForm.get('divisionId').setValue('');
    //     this.registerForm.get('subDivisionId').setValue('');
    //     this.registerForm.get('dcId').setValue('');
    //     this.registerForm.get('regionId').disable();
    //     this.registerForm.get('circleId').disable();
    //     this.registerForm.get('divisionId').disable();
    //     this.registerForm.get('subDivisionId').disable();
    //     this.registerForm.get('dcId').disable();
    //   } else if (valueof === '2') {
    //     this.circleList = null;
    //     this.divisionList = null;
    //     this.subDivisionList = null;
    //     this.dcList = null;
    //     this.registerForm.get('discomId').enable();
    //     this.registerForm.get('regionId').enable();
    //     this.registerForm.get('circleId').setValue('');
    //     this.registerForm.get('divisionId').setValue('');
    //     this.registerForm.get('subDivisionId').setValue('');
    //     this.registerForm.get('dcId').setValue('');
    //     this.registerForm.get('circleId').disable();
    //     this.registerForm.get('divisionId').disable();
    //     this.registerForm.get('subDivisionId').disable();
    //     this.registerForm.get('dcId').disable();
    //   } else if (valueof === '3') {
    //     this.divisionList = null;
    //     this.subDivisionList = null;
    //     this.dcList = null;
    //     this.registerForm.get('discomId').enable();
    //     this.registerForm.get('regionId').enable();
    //     this.registerForm.get('circleId').enable();
    //     this.registerForm.get('divisionId').setValue('');
    //     this.registerForm.get('subDivisionId').setValue('');
    //     this.registerForm.get('dcId').setValue('');
    //     this.registerForm.get('divisionId').disable();
    //     this.registerForm.get('subDivisionId').disable();
    //     this.registerForm.get('dcId').disable();
    //   } else if (valueof === '4') {
    //     this.subDivisionList = null;
    //     this.dcList = null;
    //     this.registerForm.get('discomId').enable();
    //     this.registerForm.get('regionId').enable();
    //     this.registerForm.get('circleId').enable();
    //     this.registerForm.get('divisionId').enable();
    //     this.registerForm.get('subDivisionId').setValue('');
    //     this.registerForm.get('dcId').setValue('');
    //     this.registerForm.get('dcId').disable();
    //   } else if (valueof === '5') {
    //     this.dcList = null;
    //     this.registerForm.get('discomId').enable();
    //     this.registerForm.get('regionId').enable();
    //     this.registerForm.get('circleId').enable();
    //     this.registerForm.get('divisionId').enable();
    //     this.registerForm.get('subDivisionId').enable();
    //     this.registerForm.get('dcId').setValue('');
    //     this.registerForm.get('dcId').disable();
    //   } else if (valueof === '6') {
    //     this.registerForm.get('discomId').enable();
    //     this.registerForm.get('regionId').enable();
    //     this.registerForm.get('circleId').enable();
    //     this.registerForm.get('divisionId').enable();
    //     this.registerForm.get('subDivisionId').enable();
    //     this.registerForm.get('dcId').enable();
    //     this.registerForm.get('substationId').enable();
    //     this.registerForm.get('feederId').enable();
    //   } else if (valueof === '') {
    //     this.discomList = null;
    //     this.registerForm.get('discomId').setValue('');
    //     this.registerForm.get('regionId').setValue('');
    //     this.registerForm.get('circleId').setValue('');
    //     this.registerForm.get('divisionId').setValue('');
    //     this.registerForm.get('subDivisionId').setValue('');
    //     this.registerForm.get('dcId').setValue('');
    //     this.registerForm.get('discomId').disable();
    //     this.registerForm.get('regionId').disable();
    //     this.registerForm.get('circleId').disable();
    //     this.registerForm.get('divisionId').disable();
    //     this.registerForm.get('subDivisionId').disable();
    //     this.registerForm.get('dcId').disable();
    //   }

    // }

    console.log(this.registerForm, "registerForm.........................");

  }


  accessLevelChange() {
    if (this.registerForm.value.accessLevel === '') {
      return this.Selectedlocation = '0';
    } else if (this.registerForm.value.accessLevel === '1') {
      this.Selectedlocation = '1';
    } else if (this.registerForm.value.accessLevel === '2') {
      this.Selectedlocation = '2';
    } else if (this.registerForm.value.accessLevel === '3') {
      this.Selectedlocation = '3';
    } else if (this.registerForm.value.accessLevel === '4') {
      this.Selectedlocation = '4';
    } else if (this.registerForm.value.accessLevel === '5') {
      this.Selectedlocation = '5';
    } else {
      this.Selectedlocation = '6';

    }
    console.log(this.registerForm, "registerForm.........................");
    console.log(this.registerForm.value.accessLevel, "this.registerForm.value.accessLevel");

  }
  getHttpResponce() {
    this.manageUserService.getDesignationList().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.designationList = data['list'];
      });

    this.manageUserService.getAccessLevel().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {

        if (this.userRoles == 'HR_MANAGER'
          || this.userRoles == 'AE_IT') {
          this.accessLevelList = data['list'].splice(2);
          // const toSelect = this.accessLevelList.find(c => c.id == 2);
          // this.registerForm.get('accessLevel').setValue(toSelect);
          console.log("accessLevelList if :- ", this.accessLevelList);
        } else {
          this.accessLevelList = data['list'];
          console.log("accessLevelList else :- ", this.accessLevelList);
        }

      });
    this.manageUserService.getRoleList().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        console.log(data, "data.............................");

        this.roleList = data['list'].filter(x => x.role != 'Administrator');
      });
    // this.manageRegionService.getRegionList().pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(data => {
    //     this.rigionList = data['list'];
    //   });
    // this.manageDiscomeService.getDiscomList().pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(data => {
    //     this.discomList = data['list'];
    //   });
    console.log(this.registerForm, "registerForm.........................");
  }

  onChangeCicle(value) {
    console.log('calling method onChangeCicle');
    if (value) {
      this.manageCircleService.getCircleByRegionId(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.circleList = data['list'];
            console.log('cricle list', this.circleList);
            console.log(this.registerForm, "99999999999999999993333333333qqqqqqqqqqqqqqqqqqq");

          }
        );
    } else {
      this.circleList = null;
    }

    console.log(this.registerForm, "registerForm.........................");
  }
  onSubmit() {
    console.log(this.Selectedlocation, "Selectedlocation...................", this.registerForm.value.accessLevel);
    let messageForDc = "Are you want to choose multiple dc access";
    let messageForDivision = "Are you want to choose multiple division access";
    if (this.registerForm.value.accessLevel == 6 || this.registerForm.value.accessLevel == 5) {

// ************************************** DC by DivisionId ********************************************
this.manageUserService.getDcByDivisionId(this.registerForm.value.divisionId).subscribe((resp:any)=>{
  console.log(resp,"resp.................................................");
  if(resp?.code=="200"){
    this.dcListByDivisionId = resp?.list;

 const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60vw';
      dialogConfig.height = '35vh';
      let tempDcList = this.dcListByDivisionId.filter((x: any) => x.dcId !== this.registerForm.value.dcId)

      dialogConfig.data = { dcObject: tempDcList, message: messageForDc, originaldcList: this.dcList, formDcId: this.registerForm.value.dcId, formUserId: this.registerForm.value.userId, accessLevel: this.registerForm.value.accessLevel };
      const dialogRef = this.dialog.open(UserMultipleDcSelectionPopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        console.log(result, "resulttt................");
        if (result) {
          /////////////////////////////////////////////////////
          // yaha se karna hai abhi selected dc form wala result me push karna hai
          //  let tempDcListNew = this.dcList.filter((x:any)=>x.dcId===this.registerForm.value.dcId)
          //  result.push({
          //   "dcId":tempDcListNew[0].dcId,
          //   "dcName":tempDcListNew[0].dcName
          // })
          const userData = this.registerForm.value;
          if (this.registerForm.valid) {
            let payload = {
              // "userId": this.registerForm.value.userId,
              "listDivision": [],
              "listdistributionCenter": result
            }
            if (this.data.crudType == CrudType.create) {
              this.manageUserService.addUser(userData).pipe(takeUntil(this.unsubscribe$)).subscribe(
                data => {
                  if (data['code'] === '201' || data['code'] === '200') {

                    this.notificationService.noDurationSuccess('::' + data['message'] + ' System will send you a One-time password');

                    this.manageUserService.multipleDcAccessForUser(payload).subscribe((res: any) => {
                      if (res?.code == "204" || res?.code == "200" || res?.code == "201") {
                        this.notificationService.success(res?.message);
                        this.onClose();
                      } else {
                        this.notificationService.warn(res?.message);
                        return
                      }
                    })

                  } else {
                    this.notificationService.warn('' + data['message']);
                  }
                });
            } else {
              this.manageUserService.updateUser(this.data.userId, userData).pipe(takeUntil(this.unsubscribe$)).subscribe(
                data => {
                  if (data['code'] === '201' || data['code'] === '200') {
                    this.notificationService.success('::' + data['message']);
                    this.manageUserService.multipleDcAccessForUser(payload).subscribe((res: any) => {
                      if (res?.code == "204" || res?.code == "200" || res?.code == "201") {
                        this.notificationService.success(res?.message);
                        this.onClose();
                      } else {
                        this.notificationService.warn(res?.message);
                        return
                      }
                    })
                  } else {
                    this.notificationService.warn('::' + data['message']);
                  }
                });
            }

          }
          else {
            this.notificationService.warn("Invalid Form !")
            return
          }
          /////////////////////////////////////////////////////

        } else {
          const userData = this.registerForm.value;
          if (this.registerForm.valid) {
            if (this.data.crudType == CrudType.create) {
              this.manageUserService.addUser(userData).pipe(takeUntil(this.unsubscribe$)).subscribe(
                data => {
                  if (data['code'] === '201') {
                    this.notificationService.noDurationSuccess('::' + data['message'] + ' System will send you a One-time password');
                    this.onClose();
                  } else {
                    this.notificationService.warn('' + data['message']);
                  }
                });
            } else {
              this.manageUserService.updateUser(this.data.userId, userData).pipe(takeUntil(this.unsubscribe$)).subscribe(
                data => {
                  if (data['code'] === '201') {
                    this.notificationService.success('::' + data['message']);
                    this.onClose();
                  } else {
                    this.notificationService.warn('::' + data['message']);
                  }
                });
            }

          }
          else {
            this.notificationService.warn("Invalid Form !")
            return
          }
        }

        // multipleDcAccessForUser

      });

  }
})

// **********************************************************************************

     
    } else if (this.registerForm.value.accessLevel == 3 || this.registerForm.value.accessLevel == 4) {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60vw';
      dialogConfig.height = '35vh';
      let tempDivisionList = this.divisionList.filter((x: any) => x.divisionId !== this.registerForm.value.divisionId)

      dialogConfig.data = { divisionObject: tempDivisionList, message: messageForDivision, originaldivisionList: this.divisionList, formDivisionName: this.divisionName, formDivisionId: this.registerForm.value.divisionId, formUserId: this.registerForm.value.userId, accessLevel: this.registerForm.value.accessLevel };
      const dialogRef = this.dialog.open(UserMultipleDcSelectionPopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        console.log(result, "result.....................................");
        if (result != null) {
          /////////////////////////////////////////////////////
          // yaha se karna hai abhi selected dc form wala result me push karna hai
          //  let tempDcListNew = this.dcList.filter((x:any)=>x.dcId===this.registerForm.value.dcId)
          //  result.push({
          //   "dcId":tempDcListNew[0].dcId,
          //   "dcName":tempDcListNew[0].dcName
          // })
          const userData = this.registerForm.value;
          if (this.registerForm.valid) {
            let payload = {
              // "userId": this.registerForm.value.userId,
              "listDivision": result,
              "listdistributionCenter": []
            }
            if (this.data.crudType == CrudType.create) {
              this.manageUserService.addUser(userData).pipe(takeUntil(this.unsubscribe$)).subscribe(
                data => {
                  if (data['code'] === '201' || data['code'] === '200') {

                    this.notificationService.noDurationSuccess('::' + data['message'] + ' System will send you a One-time password');

                    this.manageUserService.multipleDcAccessForUser(payload).subscribe((res: any) => {
                      if (res?.code == "200") {
                        this.notificationService.success(res?.message);
                        this.onClose();
                      } else {
                        this.notificationService.warn(res?.message);
                        return
                      }
                    })

                  } else {
                    this.notificationService.warn('' + data['message']);
                  }
                });
            } else {
              this.manageUserService.updateUser(this.data.userId, userData).pipe(takeUntil(this.unsubscribe$)).subscribe(
                data => {
                  if (data['code'] === '201' || data['code'] === '200') {
                    this.notificationService.success('::' + data['message']);
                    this.manageUserService.multipleDcAccessForUser(payload).subscribe((res: any) => {
                      if (res?.code == "200") {
                        this.notificationService.success(res?.message);
                        this.onClose();
                      } else {
                        this.notificationService.warn(res?.message);
                        return
                      }
                    })
                  } else {
                    this.notificationService.warn('::' + data['message']);
                  }
                });
            }

          }
          else {
            this.notificationService.warn("Invalid Form !")
            return
          }
          /////////////////////////////////////////////////////

        } else {
          const userData = this.registerForm.value;
          if (this.registerForm.valid) {
            if (this.data.crudType == CrudType.create) {
              this.manageUserService.addUser(userData).pipe(takeUntil(this.unsubscribe$)).subscribe(
                data => {
                  if (data['code'] === '201' || data['code'] === '200') {
                    this.notificationService.noDurationSuccess('::' + data['message'] + ' System will send you a One-time password');
                    this.onClose();
                  } else {
                    this.notificationService.warn('' + data['message']);
                  }
                });
            } else {
              this.manageUserService.updateUser(this.data.userId, userData).pipe(takeUntil(this.unsubscribe$)).subscribe(
                data => {
                  if (data['code'] === '201' || data['code'] === '200') {
                    this.notificationService.success('::' + data['message']);
                    this.onClose();
                  } else {
                    this.notificationService.warn('::' + data['message']);
                  }
                });
            }

          }
          else {
            this.notificationService.warn("Invalid Form !")
            return
          }
        }
      })

    }
    else {
      const userData = this.registerForm.value;
      if (this.registerForm.valid) {
        if (this.data.crudType == CrudType.create) {
          this.manageUserService.addUser(userData).pipe(takeUntil(this.unsubscribe$)).subscribe(
            data => {
              if (data['code'] === '201' || data['code'] === '200') {
                this.notificationService.noDurationSuccess('::' + data['message'] + ' System will send you a One-time password');
                this.onClose();
              } else {
                this.notificationService.warn('' + data['message']);
              }
            });
        } else {
          this.manageUserService.updateUser(this.data.userId, userData).pipe(takeUntil(this.unsubscribe$)).subscribe(
            data => {
              if (data['code'] === '201' || data['code'] === '200') {
                this.notificationService.success('::' + data['message']);
                this.onClose();
              } else {
                this.notificationService.warn('::' + data['message']);
              }
            });
        }

      }
      else {
        this.notificationService.warn("Invalid Form !")
        return
      }
    }



  }
  onClose() {
    this.registerForm.reset();
    this.dialogRef.close();
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onChangeDiscom(value) {
    this.regionList = null;
    this.circleList = null;
    this.divisionList = null;
    this.subDivisionList = null;
    this.dcList = null;
    this.registerForm.get('regionId').setValue('');
    this.registerForm.get('circleId').setValue('');
    this.registerForm.get('divisionId').setValue('');
    this.registerForm.get('subDivisionId').setValue('');
    this.registerForm.get('dcId').setValue('');
    this.registerForm.get('substationId').setValue('');
    this.registerForm.get('feederId').setValue('');
    this.dcList = null;

    if (value) {
      this.manageRegionService.getRegionByDiscom(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.regionList = data['list'];
          }
        );
    } else {
      this.regionList = null;
    }

    console.log(this.registerForm, "registerForm.........................");

  }

  onChangeRegion(value) {
    console.log('calling method onChangeRegion');
    this.circleList = null;
    this.divisionList = null;
    this.subDivisionList = null;
    this.dcList = null;
    this.registerForm.get('circleId').setValue('');
    // this.registerForm.get('divisionId').setValue('');
    // this.registerForm.get('subDivisionId').setValue('');
    // this.registerForm.get('dcId').setValue('');
    // this.registerForm.get('substationId').setValue('');
    // this.registerForm.get('feederId').setValue('');
    this.dcList = null;
    if (value) {
      this.manageCircleService.getCircleByRegionId(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.circleList = data['list'];
            console.log('circle list', this.circleList);
          }
        );
    } else {
      this.circleList = null;
    }

    console.log(this.registerForm, "registerForm.........................");

  }

  onChangeCircle(value) {
    console.log('mehtod calling onChangeCircle')
    this.divisionList = null;
    this.subDivisionList = null;
    this.dcList = null;
    // this.registerForm.get('divisionId').setValue('');
    // this.registerForm.get('subDivisionId').setValue('');
    // this.registerForm.get('dcId').setValue('');
    // this.registerForm.get('substationId').setValue('');
    // this.registerForm.get('feederId').setValue('');
    if (value) {
      this.manageDivisionService.getAllDivisionByCircleId(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.divisionList = data['list'];
            console.log('onChangeCircle :- dc list prepare', this.divisionList)
          }
        );
    } else {
      this.divisionList = null;
    }


    console.log(this.registerForm, "registerForm.........................");

  }

  onChangeDivision(value) {

    this.divisionName = this.divisionList[this.divisionList.findIndex(x => x.divisionId === value)].division
    console.log('method calling onChangeDivision');
    // this.registerForm.get('divisionId').setValue(value.divisionId)
    console.log(this.registerForm.value, "this.registerForm.value.............");
    this.registerForm.value.divisionId = value

    this.subDivisionList = null;
    this.dcList = null;
    console.log(value, "vvvaaaaalllluuuueeeeee..................................................................");

    // this.registerForm.get('subDivisionId').setValue('');
    // this.registerForm.get('dcId').setValue('');
    // this.registerForm.get('substationId').setValue('');
    // this.registerForm.get('feederId').setValue('');
    if (value) {
      this.manageSubdivisionService.getAllSubDivisionByDivisionId(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.subDivisionList = data['list'];
            console.log('onChangeDivision :- dc list prepare', this.subDivisionList);
          }
        );
    } else {
      this.subDivisionList = null;
    }


    console.log(this.registerForm.controls, "ooooooooooopppppppsssssssssssssss");
    console.log(this.registerForm, "registerForm.........................");
  }

  onChangeSubDivision(value) {

    console.log('onChangeSubDivision :- dc list prepare',)
    // this.registerForm.get('dcId').setValue('');
    // this.registerForm.get('substationId').setValue('');
    // this.registerForm.get('feederId').setValue('');
    if (value) {
      console.log('value...........', value)
      this.manageDCService.getAllBySubdivision(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.dcList = data['list'];
            console.log('onChangeSubDivision :- dc list prepare', this.dcList)

          }
        );
    } else {
      this.dcList = null;
    }

    console.log(this.registerForm, "registerForm.........................");

  }

  onChangeDC(value) {
    console.log(value, "vvvaaaaallluuueeeee............");

    this.registerForm.get('substationId').setValue('');
    this.registerForm.get('feederId').setValue('');
    if (value) {
      console.log('value...........', value)
      this.ManageSubStationService.getAllSubstationByDC(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.subStationList = data['list'];
            console.log('onChangeDistribution :- Substation list prepare', this.subStationList)

          }
        );
    } else {
      this.subStationList = null;
    }

    console.log(this.registerForm, "registerForm.........................");

  }

  onChangeSubstation(value) {
    this.registerForm.get('feederId').setValue('');
    if (value) {
      console.log('value...........', value)
      this.ManageFeederService.getAllFeederBySubstation(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.feederList = data['list'];
            console.log('onChangeSubStation :- feeder list prepare', this.feederList)
          }
        );
    } else {
      this.feederList = null;
    }

    console.log(this.registerForm, "registerForm.........................");

  }

}



