import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator, mobPattern, matchingPasswords, pwdPattern, empnumberlength } from 'src/app/utils/app-validators';
import { EmpDesignation } from 'src/app/shared-enum/emp-Designation.enum';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageUserService } from '../../services/manage-user.service';
import { Subject } from 'rxjs';
import { CrudType } from 'src/app/shared-enum/crudType';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { ManageRegionService } from '../../../masters/services/manage-region.service';
import { ManageCircleService } from '../../../masters/services/manage-circle.service';
import { AsyncValidatorService } from 'src/app/shared-services/async-validator.service';



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
  rigionList: Array<any> = [];
  circleList: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private asyncValidator: AsyncValidatorService,
    public dialogRef: MatDialogRef<SignUpComponent>,
    private manageUserService: ManageUserService,
    private manageRegionService: ManageRegionService,
    private manageCircleService: ManageCircleService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }
  // variable to be needed on asyncValidators
  crudType = this.data.crudType;
  rowId = this.data.userId;
  ngOnInit() {
    this.registerForm = this.fb.group({
      userId: [null, { validators: [Validators.required], asyncValidators: [this.asyncValidator.AsyncValidator('user', this.crudType, this.rowId, 'userId')], updateOn: 'blur' }],
      designationId: ['', Validators.compose([Validators.required])],
      userName: ['', Validators.compose([Validators.required])],
      userEmailId: [null, { validators: [Validators.required, emailValidator], asyncValidators: [this.asyncValidator.AsyncValidator('user', this.crudType, this.rowId, 'email')], updateOn: 'blur' }],
      aadharNo: [null, { validators: [Validators.required], asyncValidators: [this.asyncValidator.AsyncValidator('user', this.crudType, this.rowId, 'aadhar')], updateOn: 'blur' }],
      mobileNo: [null, { validators: [Validators.required, mobPattern], asyncValidators: [this.asyncValidator.AsyncValidator('user', this.crudType, this.rowId, 'mobile')], updateOn: 'blur' }],
      accessLevel: ['', Validators.compose([Validators.required])],
      regionId: [{ value: '', disabled: true }, Validators.required],
      circleId: [{ value: '', disabled: true }, Validators.required],
      userRoles: ['', Validators.compose([Validators.required])],
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
      const list: any = data['list'];
      const roles: any = list[0].userRoles;
      const roleArray = roles.map(o => {
        return o.roleId;
      });
      this.managelocaton('' + list[0].accessLevel);
      this.registerForm.controls['userId'].setValue(list[0].userId);
      this.registerForm.controls['designationId'].setValue(list[0].userDesignation.designationId);
      this.registerForm.controls['userName'].setValue(list[0].userName);
      this.registerForm.controls['userEmailId'].setValue(list[0].userEmailId);
      this.registerForm.controls['aadharNo'].setValue(list[0].aadharNo);
      this.registerForm.controls['mobileNo'].setValue(list[0].mobileNo);
      this.registerForm.controls['accessLevel'].setValue('' + list[0].accessLevel);
      this.registerForm.controls['userRoles'].setValue(roleArray);

      if (list[0].accessLevel === "2") {
        this.registerForm.controls['regionId'].setValue(list[0].userRegion.regionId);
      } else if (list[0].accessLevel === "3") {
        // onChangeCicle
        this.onChangeCicle(list[0].userRegion.regionId);
        this.registerForm.controls['regionId'].setValue(list[0].userRegion.regionId);
        this.registerForm.controls['circleId'].setValue(list[0].userCircle.circleId);
      }
    });
  }
  managelocaton(value) {
    const valueof = '' + value;
    if (valueof === '2') {
      this.registerForm.get('regionId').enable();
    } else if (valueof === '3') {
      this.registerForm.get('regionId').enable();
      this.registerForm.get('circleId').enable();
    } else {
      this.registerForm.get('regionId').disable();
      this.registerForm.get('circleId').disable();
    }
  }

  accessLevelChange() {
    if (this.registerForm.value.accessLevel === '') {
      return this.Selectedlocation = '0';
    } else if (this.registerForm.value.accessLevel === '1') {
      this.Selectedlocation = '1';
    } else if (this.registerForm.value.accessLevel === '2') {
      this.Selectedlocation = '2';
    } else
      if (this.registerForm.value.accessLevel === '3') {
        this.Selectedlocation = '3';
      }

  }
  getHttpResponce() {
    this.manageUserService.getDesignationList().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.designationList = data['list'];
      });
    this.manageUserService.getAccessLevel().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.accessLevelList = data['list'];
      });
    this.manageUserService.getRoleList().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.roleList = data['list'];
      });
    this.manageRegionService.getRegionList().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.rigionList = data['list'];
      });
  }
  onChangeCicle(value) {
    if (value) {
      this.manageCircleService.getCircleByRegionId(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.circleList = data['list'];
          }
        );
    } else {
      this.circleList = null;
    }
  }
  onSubmit() {
    const userData = this.registerForm.value;
    // console.log(userData);
    if (this.registerForm.valid) {
      if (this.data.crudType == CrudType.create) {
        // console.log(userData);
        this.manageUserService.addUser(userData).pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            if (data['code'] === '201') {
              this.notificationService.noDurationSuccess('::' + data['message'] + ' System will send you a One-time password');
              this.onClose();
            } else {
              this.notificationService.warn('::' + data['message']);
            }
          });
      } else {
        // console.log(userData);
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
  }
  onClose() {
    this.registerForm.reset();
    this.dialogRef.close();
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

