import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountInfoService } from '../../services/account-info.service';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SharedDataService } from 'src/app/shared-services/shared-data.service';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccountInformationComponent implements OnInit, OnDestroy {
  accountInfoFg: FormGroup;
  unsubscribe$: Subject<void> = new Subject();
  connectionTypeList:Array <any>= [];
  supplyVoltages: { [key: number]: any };
  allPurposeData:Array <any>= [];
  tariffData: {};
  tariffScheduleCode: string;
  purposeOfGmcData: {}
  revenueCategoryData: {}
  isRegistrationFeeAmount: boolean = false;
  
  
  mindaterange: Date;
  maxdaterange: Date;
  minEndDate = this.mindaterange;
  maxEndDate = this.maxdaterange;
  connectionDate:Date;
  
  constructor(
    private formBuilder: FormBuilder,
    private accInfoService: AccountInfoService,
    public role: RoleConstantsService,
    private notificationService: NotificationService,
    private data: SharedDataService
  ) {
    this.accountInfoFg = this.formBuilder.group({
      connectionType: ['', Validators.required],
      tempConnectionPeriodDays: [{ value: '', disabled: true }, Validators.required],
      supplyVoltage: ['', Validators.required],
      seasonalStartDate: [{ value: '', disabled: true }, Validators.required],
      seasonalEndDate: [{ value: '', disabled: true }, Validators.required],
      edutyApplicability: ['', Validators.required],
      dedicatedFeeder: ['', Validators.required],
      feederMaintenanceCharge: [{ value: '', disabled: true }, Validators.required],
      customerClassId: ['', Validators.required],
      tariffCategory: ['', Validators.required],
      tariffSubCategory: ['', Validators.required],
      purpose: ['', Validators.required],
      purposeOfGmcId: ['', Validators.required],
      gmc: ['', Validators.required],
      revenueCategoryId: ['', Validators.required],
      securityDeposit: this.formBuilder.array([this.addSdFg()]),
      registrationAmount: ['', Validators.required],
      regReferenceNo: ['', Validators.required],
      regPaymentDate: ['', Validators.required],
      regFeeRefundRequired: ['', Validators.required],
      regRefundAmount: ['', Validators.required],
      nscTransferred: ['', Validators.required],
      pdcConsumer: [Validators.required],
      oldAccountId: [{ value: '', disabled: true }, Validators.required],
      disconnectionDate: [{ value: '', disabled: true }, Validators.required]
    });
  }

  ngOnInit() {
    this.getHttpResponce();  
  }
  public addSdFg() {
    return this.formBuilder.group({
      sdAmount: ['', Validators.required],
      sdReferenceNo: ['', Validators.required],
      sdReferenceDate: ['', Validators.required],
    });
  }
  public addnewSd() {
    const control = this.accountInfoFg.controls['securityDeposit'] as FormArray;
    control.push(this.addSdFg());
  }
  public removeSd(i: number) {
    const control = this.accountInfoFg.controls['securityDeposit'] as FormArray;
    control.removeAt(i);
  }
  
  manageconnEndDate({ value }) {
    this.accInfoService.connectionTypeId = value;
    this.accountInfoFg.get('supplyVoltage').reset();
    if (value === 2) {
      this.accountInfoFg.get('tempConnectionPeriodDays').enable();
    } else {
      this.accountInfoFg.get('tempConnectionPeriodDays').disable();
      this.accountInfoFg.get('tempConnectionPeriodDays').reset();
    }
  }
  
  firstDateInput(event: MatDatepickerInputEvent<Date>): void {
    const date = new Date(event.value);
    this.mindaterange = new Date(date.setMonth(date.getMonth() + 3));
    
    this.minEndDate = this.mindaterange;
    this.maxdaterange = new Date(event.value);
    this.maxdaterange.setDate(this.maxdaterange.getDate() + 180);
    this.maxEndDate = this.maxdaterange;
  }

  getHttpResponce() {
    this.accInfoService.getConnectionType().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.connectionTypeList = data['list'];
      });
    this.accInfoService.getAllSupplyVoltages()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.supplyVoltages = data['map'];
      });
  }
  onChangeSupplyVoltage(event) {
    if (event) {
      this.accInfoService.getAllPurposeBySupplyVoltage(event).pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.allPurposeData = data['list'];
          console.log(data);
          this.resetTariffFields();
        });
    } else {
      this.allPurposeData = null;
      this.tariffData = null;
      this.revenueCategoryData = null;
      this.resetTariffFields();
    }
  }

  
  onChangePurpose(value) {
    if (value) {
      this.resetTariffFields();
      this.accInfoService.getAllTariffByPurposeId(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            if (data['code'] === "200") {
              this.tariffData = data['list'][0];
              this.revenueCategoryData = this.tariffData['revenueCategories']
              this.purposeOfGmcData = this.tariffData['purposeForGMCs']
              
              this.accInfoService.purposeOfGmc = this.purposeOfGmcData
              this.tariffScheduleCode = this.tariffData['tariffScheduleCode']
              this.accountInfoFg.controls['customerClassId'].setValue(this.tariffData['tariffSchedule']);
              this.accountInfoFg.controls['tariffCategory'].setValue(this.tariffData['tariffCategory']);
              this.accountInfoFg.controls['tariffSubCategory'].setValue(this.tariffData['tariffSubCategory']);
            } else if (data['code'] === "100") {
              this.notificationService.warn(data['message']);
            } else {
              this.tariffData = null;
              this.revenueCategoryData = null;
              this.resetTariffFields();
            }
          }
        );
    }
  }
  onChangepurposeOfGmc(id) {
    this.accInfoService.getGmcByPurposeOfGmcId(id).pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        if (data) {
          const gmcData = data['list'][0];
          this.accountInfoFg.controls['gmc'].setValue(gmcData['gmcValue']);
        }
      });
  }
  
  resetTariffFields() {
    this.accountInfoFg.controls['gmc'].reset();
    this.accountInfoFg.controls['customerClassId'].reset();
    this.accountInfoFg.controls['tariffCategory'].reset();
    this.accountInfoFg.controls['tariffSubCategory'].reset();
  }
  onChangeDedicatedFeeder(value) {
    this.accountInfoFg.controls['feederMaintenanceCharge'].reset();
    if (value === '1') {
      this.accountInfoFg.get('feederMaintenanceCharge').enable();
    } else {
      this.accountInfoFg.get('feederMaintenanceCharge').disable();
    }
  }
  onChangePdcConsumer(value) {
    this.accountInfoFg.controls['oldAccountId'].reset();
    this.accountInfoFg.controls['disconnectionDate'].reset();
    if (value === '1') {
      this.accountInfoFg.get('oldAccountId').enable();
      this.accountInfoFg.get('disconnectionDate').enable();
      this.connectionDate= this.accInfoService.connectionDate;
    } else {
      this.accountInfoFg.get('oldAccountId').disable();
      this.accountInfoFg.get('disconnectionDate').disable();
    }
  }
  onChangeRefundRequired(value) {
    let registrationAmount = this.accountInfoFg.get('registrationAmount').value
    
    if (registrationAmount && value === '1' && registrationAmount > 25) {
      this.accountInfoFg.get('regRefundAmount').enable();
      const regRefundAmount = registrationAmount - 25;
      this.accountInfoFg.controls['regRefundAmount'].setValue(regRefundAmount);
    } else {
      this.accountInfoFg.get('regRefundAmount').reset();
      this.accountInfoFg.get('regRefundAmount').disable();
    }
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
