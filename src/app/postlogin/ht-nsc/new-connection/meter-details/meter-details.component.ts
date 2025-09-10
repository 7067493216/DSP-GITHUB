import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { NewMeterDetailsService } from '../../services/new-meter-details.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { AsyncValidatorService } from 'src/app/shared-services/async-validator.service';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';
import { takeUntil } from 'rxjs/operators';
import { NewEquipmentDetailsService } from '../../services/new-equipment-details.service';
import { AccountInfoService } from '../../services/account-info.service';

@Component({
  selector: 'app-meter-details',
  templateUrl: './meter-details.component.html',
  styleUrls: ['./meter-details.component.css']
})
export class MeterDetailsComponent implements OnInit, OnDestroy {
  meterDetailsFg: FormGroup;
  unsubscribe$: Subject<void> = new Subject();
  meterType: {};
  configuration: {};
  meterRentType: {};
  manufactureType: {};
  meterCapacities: { [key: number]: any };
  ctRatios: {};
  ptRatios: any[]
  meterModelData: {};
  sanctionLoad:number;
  constructor(
    private formBuilder: FormBuilder,
    private meterDetailsService: NewMeterDetailsService,
    private notificationService: NotificationService,
    private asyncValidator: AsyncValidatorService,
    public role: RoleConstantsService,
    private newEquipmentService: NewEquipmentDetailsService,
    private accInfoService: AccountInfoService
  ) {
    this.meterDetailsFg = this.formBuilder.group({
      meterType: ['', Validators.required],
      PlantCapacity: [{ value: '', disabled: true }, Validators.required],
      configuration: ['', Validators.required],
      meterRentType: ['', Validators.required],
      manufacture: ['', Validators.required],
      meterModel: ['', Validators.required],
      meterSerial: [null, { validators: [Validators.required], asyncValidators: [this.asyncValidator.AsyncValidator('meter', '1', '0')], updateOn: 'blur' }],
      meterOwner: ['', Validators.required],
      meterCapacity: ['', Validators.required],
      meterCTRatio: ['', Validators.required],
      meterPTRatio: ['', Validators.required],
      meterAccuracy: ['', Validators.required],
      billCycle: ['', Validators.required],
      meterSecurityDeposit: ['', Validators.required],
      meterSecurityDepositeAmount: [{ value: '', disabled: true }, Validators.required],
      initialKWHRead: ['', Validators.required],
      initialKVAHRead: ['', Validators.required],
      initialoffPeakRead: ['', Validators.required],
      initialOnpeakRead: ['', Validators.required],
      initialNormalRead: ['', Validators.required],
      kwhExportRead: [{ value: '', disabled: true }, Validators.required],
      kvahExportRead: [{ value: '', disabled: true }, Validators.required],
      initialTOD1ExportRead: [{ value: '', disabled: true }, Validators.required],
      initialTOD2ExportRead: [{ value: '', disabled: true }, Validators.required],
      initialTOD3ExportRead: [{ value: '', disabled: true }, Validators.required],
    });
   }

  ngOnInit() {
    this. getHttpResponce();
    this.sanctionLoad = this.accInfoService.sanctionLoad;
  }
  getHttpResponce() {
    this.meterDetailsService.meterType()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.meterType = data['list'];
      });
    this.meterDetailsService.getConfigurationClass()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.configuration = data['list'];
      });
    this.meterDetailsService.getMeterRentTypes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.meterRentType = data['list'];
      });
    this.meterDetailsService.getAllManufacturesTypes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.manufactureType = data['list'];
      });
    this.meterDetailsService.getMeterCapacities()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.meterCapacities = data['map'];
      });
    this.meterDetailsService.getAllCTRatiosTypes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.ctRatios = data['list'];
      });
    this.meterDetailsService.getAllPTRatiosTypes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.ptRatios= data['list'];
      });
  }
  onChangeMeter(value) {
    if (value) {
      this.meterDetailsService.getAllModelsByMeterManufacturer(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.meterModelData = data['list'];
          }
        );
    } else {
      this.meterModelData = null;
    }
  }  
    onChangeMeterSecurityDeposit(value) {
      if (value === '1') {
        this.meterDetailsFg.get('meterSecurityDepositeAmount').enable();
      } else {
        this.meterDetailsFg.get('meterSecurityDepositeAmount').reset();
        this.meterDetailsFg.get('meterSecurityDepositeAmount').disable();
      }
    }
    onChangePtRatio(value){
      const mtrCtPtRatio:any = {};
      mtrCtPtRatio.meterCTRatio = this.meterDetailsFg.get('meterCTRatio').value;
      mtrCtPtRatio.meterPTRatio = value;
       this.newEquipmentService.mtrCtPtRatio = mtrCtPtRatio
    }
    ngOnDestroy() {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
}
