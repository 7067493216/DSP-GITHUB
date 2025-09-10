import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AccountInfoService } from '../services/account-info.service';
import { TariffChangeService } from '../services/tariff-change.service';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';
import { CryptoService } from 'src/app/shared-services/crypto.service';
import { SearchKeyStatusService } from 'src/app/shared-services/search-key-status.service';
import { Title } from '@angular/platform-browser';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-tariff-change-ht',
  templateUrl: './tariff-change-ht.component.html',
  styleUrls: ['./tariff-change-ht.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TariffChangeHtComponent implements OnInit {

  tariffChangeFg: FormGroup;
  unsubscribe$: Subject<void> = new Subject();
  searchKey: string;
  IsEditable = false;
  isSearchkey: string;
  accountId: string;
  tariffScheduleCode: string;
  supplyVoltages: { [key: number]: any };
  allPurposeData: Array<any> = [];
  tariffData: Array<any> = [];
  purposeOfGmcData: Array<any> = [];
  revenueCategoryData: Array<any> = [];

  mindaterange: Date;
  maxdaterange: Date;
  minEndDate = this.mindaterange;
  maxEndDate = this.maxdaterange;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accInfoService: AccountInfoService,
    private notificationService: NotificationService,
    private tariffChangeService: TariffChangeService,
    public role: RoleConstantsService,
    private crypto: CryptoService,
    private sharedData: SearchKeyStatusService,
    private titleService: Title

  ) { }

  ngOnInit() {
    this.titleService.setTitle('Change Tariff Detail');
    this.sharedData.getData.subscribe(message => this.isSearchkey = message);
    if (this.isSearchkey !== 'connectedConsumer') {
      this.router.navigate(['/dashboard']);
      sessionStorage.removeItem('SearchKey');
    } else {
      const encryptedAccountId = sessionStorage.getItem('SearchKey');
      this.accountId = this.crypto.textDecrypt(encryptedAccountId);
      this.getHttpResponce();
    }

    this.tariffChangeFg = this.formBuilder.group({
      tariffEditable: false,
      supplyVoltage: ['', Validators.required],
      purpose: ['', Validators.required],
      customerClassId: ['', Validators.required],
      tariffCategory: ['', Validators.required],
      tariffSubCategory: ['', Validators.required],
      purposeOfGmcId: ['', Validators.required],
      gmc: ['', Validators.required],
      revenueCategoryId: ['', Validators.required],
      seasonalStartDate: [{ value: '', disabled: true }, Validators.required],
      seasonalEndDate: [{ value: '', disabled: true }, Validators.required],
      tariffChangeEffDate: ['', Validators.required],



    });
  }
  getHttpResponce() {
    this.accInfoService.getAllSupplyVoltages()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.supplyVoltages = data['map'];
      });


    this.tariffChangeService.getConsumerTariffDetails(this.accountId).pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        if (data['code'] == "200") {
          // console.log(data);
          const accDetail = data['list'][0];
          this.tariffChangeFg.patchValue(accDetail);
          this.onChangeSupplyVoltage(accDetail.supplyVoltage);
          this.onChangePurpose(accDetail.purpose);
          this.onChangepurposeOfGmc(accDetail.purposeOfGmcId);

        } else {
          this.notificationService.warn(data['message']);
        }
      });
  }
  onChangeSupplyVoltage(event) {
    if (event) {
      this.accInfoService.getAllPurposeBySupplyVoltage(event).pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.allPurposeData = data['list'];
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
              this.tariffScheduleCode = this.tariffData['tariffScheduleCode']
              if (this.IsEditable) {
                this.tariffChangeFg.controls['purposeOfGmcId'].reset();
                this.tariffChangeFg.controls['customerClassId'].setValue(this.tariffData['tariffSchedule']);
                this.tariffChangeFg.controls['tariffCategory'].setValue(this.tariffData['tariffCategory']);
                this.tariffChangeFg.controls['tariffSubCategory'].setValue(this.tariffData['tariffSubCategory']);
              }
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
          if (this.IsEditable) {
            this.tariffChangeFg.controls['gmc'].setValue(gmcData['gmcValue']);
          }
        }
      });
  }

  resetTariffFields() {
    if (this.IsEditable) {
      this.tariffChangeFg.controls['gmc'].reset();
      this.tariffChangeFg.controls['customerClassId'].reset();
      this.tariffChangeFg.controls['tariffCategory'].reset();
      this.tariffChangeFg.controls['tariffSubCategory'].reset();
    }
  }

  firstDateInput(event: MatDatepickerInputEvent<Date>): void {
    const date = new Date(event.value);
    this.mindaterange = new Date(date.setMonth(date.getMonth() + 3));
    this.minEndDate = this.mindaterange;
    this.maxdaterange = new Date(event.value);

    /****** vivek 01-08-2022 starts ********************************** */
    // this.maxdaterange.setDate(this.maxdaterange.getDate() + 180);
    this.maxdaterange.setDate(this.maxdaterange.getDate() + 185);
    /****** vivek 01-08-2022 ends  ******************************** */

    this.maxEndDate = this.maxdaterange;
  }

  SaveTariff() {
    const tariffChangeFg = this.tariffChangeFg.value;
    if (this.allPurposeData.some(value => value.purposeInstId == tariffChangeFg.purpose)) {
      tariffChangeFg.consumerId = this.accountId;
      this.tariffChangeService.saveChangedTariff(tariffChangeFg).pipe(takeUntil(this.unsubscribe$)).subscribe(
        data => {
          if (data['code'] === '201') {
            this.notificationService.success(data['message']);
            this.tariffChangeFg.reset();
            this.getHttpResponce();
          } else {
            this.notificationService.warn(data['message']);
          }
        });
    } else {
      this.notificationService.warn("Tagged purpose of installation id " + tariffChangeFg.purpose + " does not exist on related record");
    }
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
