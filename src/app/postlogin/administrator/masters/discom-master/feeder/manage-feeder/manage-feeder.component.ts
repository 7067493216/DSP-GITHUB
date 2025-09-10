import { Component, OnInit, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageCircleService } from '../../../services/manage-circle.service';
import { ManageRegionService } from '../../../services/manage-region.service';
import { takeUntil } from 'rxjs/operators';
import { FeederData } from '../../../models/feeder.model';
import { ManageSubDivisionService } from '../../../services/manage-sub-division.service';
import { ManageDcService } from '../../../services/manage-dc.service';
import { ManageSubStationService } from '../../../services/manage-sub-station.service';
import { ManageFeederService } from '../../../services/manage-feeder.service';
import { ManageDivisionService } from '../../../services/manage-division.service';
import { CrudType } from 'src/app/shared-enum/crudType';
import { AsyncValidatorService } from 'src/app/shared-services/async-validator.service';

@Component({
  selector: 'app-manage-feeder',
  templateUrl: './manage-feeder.component.html',
  styleUrls: ['./manage-feeder.component.css']
})
export class ManageFeederComponent implements OnInit {

  unsubscribe$: Subject<void> = new Subject();
  feederCreationFg: FormGroup;
  circleData:Array <any>= [];
  regionData:Array <any>= [];
  divisionData:Array <any>= [];
  subDivisionData:Array <any>= [];
  dcData:Array <any>= [];
  subStationData:Array <any>= [];
  feeder: FeederData[];
  constructor(
    private fb: FormBuilder,
    private asyncValidator: AsyncValidatorService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ManageFeederComponent>,
    private manageCircleService: ManageCircleService,
    private manageRegionService: ManageRegionService,
    private manageDivisionService: ManageDivisionService,
    private manageSubDivisionService: ManageSubDivisionService,
    private manageDcService: ManageDcService,
    private manageSubStationService: ManageSubStationService,
    private manageFeederService: ManageFeederService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {

  }
  // variable to be needed on asyncValidators
  crudType = this.data.crudType;
  rowId = this.data.feederId;
  ngOnInit() {
    this.feederCreationFg = this.fb.group({
      regionId: [null, Validators.compose([Validators.required])],
      circleId: [null, Validators.compose([Validators.required])],
      divisionId: [null, Validators.compose([Validators.required])],
      subDivisionId: [null, Validators.compose([Validators.required])],
      dcId: [null, Validators.compose([Validators.required])],
      substationId: [null, Validators.compose([Validators.required])],
      feederName: [null, { validators: [Validators.required], asyncValidators: [this.asyncValidator.AsyncValidator('feeder', this.crudType, this.rowId)], updateOn: 'blur' }],
      feederCode: [null, { validators: [Validators.required], asyncValidators: [this.asyncValidator.AsyncValidator('feeder', this.crudType, this.rowId, 'code')], updateOn: 'blur' }],
    });
    this.initializeForm();
    this.getHttpResponce();
  }
  initializeForm() {
    if (this.data.crudType === CrudType.create) {
      this.feederCreationFg.reset();
    } else {
      this.loadFormToEdit();
    }
  }
  loadFormToEdit() {
    this.manageFeederService.getFeederById(this.data.feederId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      const list: any = data['list'];
      this.onChangeCicle(list[0].feederSubstation.substationDistributionCenter.dcSubdivision.subdivisionDivision.divisionCircle.circleRegion.regionId);
      this.onChangeDivision(list[0].feederSubstation.substationDistributionCenter.dcSubdivision.subdivisionDivision.divisionCircle.circleId);
      this.onChangeSubDivision(list[0].feederSubstation.substationDistributionCenter.dcSubdivision.subdivisionDivision.divisionId);
      this.onChangeDc(list[0].feederSubstation.substationDistributionCenter.dcSubdivision.subDivisionId);
      this.onChangeSubStation(list[0].feederSubstation.substationDistributionCenter.dcId);
      this.feederCreationFg.controls['regionId'].setValue(list[0].feederSubstation.substationDistributionCenter.dcSubdivision.subdivisionDivision.divisionCircle.circleRegion.regionId);
      this.feederCreationFg.controls['circleId'].setValue(list[0].feederSubstation.substationDistributionCenter.dcSubdivision.subdivisionDivision.divisionCircle.circleId);
      this.feederCreationFg.controls['divisionId'].setValue(list[0].feederSubstation.substationDistributionCenter.dcSubdivision.subdivisionDivision.divisionId);
      this.feederCreationFg.controls['subDivisionId'].setValue(list[0].feederSubstation.substationDistributionCenter.dcSubdivision.subDivisionId);
      this.feederCreationFg.controls['dcId'].setValue(list[0].feederSubstation.substationDistributionCenter.dcId);
      this.feederCreationFg.controls['substationId'].setValue(list[0].feederSubstation.subStationId);
      this.feederCreationFg.controls['feederCode'].setValue(list[0].feederCode);
      this.feederCreationFg.controls['feederName'].setValue(list[0].feederName);
    });
  }
  onSubmit() {
    const FeederData = this.feederCreationFg.value;
    if (this.feederCreationFg.valid) {
      if (this.data.crudType === CrudType.create) {
        this.manageFeederService.addFeeder(FeederData).pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            if(data['code']==='201'){
              this.onClose();
              this.notificationService.success('::' + data['message']);
            } else {
              this.notificationService.warn('::' + data['message']);
            }
          });
      } else {
        this.manageFeederService.updateFeeder(this.data.feederId, FeederData).pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            if(data['code']==='204'){
              this.onClose();
              this.notificationService.success('::' + data['message']);
            } else {
              this.notificationService.warn('::' + data['message']);
            }
          });
      }
    }
  }
  onClose() {
    this.feederCreationFg.reset();
    this.dialogRef.close();
  }
  getHttpResponce() {
    this.manageRegionService.getRegionList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.regionData = data['list'];
      });

  }
  onChangeCicle(value) {
    if (value) {
      this.manageCircleService.getCircleByRegionId(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.circleData = data['list'];
          }
        );
    } else {
      // console.log('DATA RESET');
      this.circleData = null;
      this.divisionData = null;
      this.subDivisionData = null;
      this.dcData = null;
      this.subStationData = null;
    }
  }
  onChangeDivision(value) {
    // console.log(typeof (value));
    if (value) {
      this.manageDivisionService.getAllDivisionByCircleId(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.divisionData = data['list'];
            // console.log(this.divisionData);
          }
        );
    } else {
      this.divisionData = null;
      this.subDivisionData = null;
      this.dcData = null;
      this.subStationData = null;
    }
  }
  onChangeSubDivision(value) {
    // console.log(typeof (value));
    if (value) {
      this.manageSubDivisionService.getAllSubDivisionByDivisionId(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.subDivisionData = data['list'];

          }
        );
    } else {
      this.subDivisionData = null;
      this.dcData = null;
      this.subStationData = null;
    }
  }
  onChangeDc(value) {
    // console.log(typeof (value));
    if (value) {
      this.manageDcService.getAllBySubdivision(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.dcData = data['list'];
            // console.log(this.dcData);
          }
        );
    } else {
      this.dcData = null;
      this.subStationData = null;
    }
  }
  onChangeSubStation(value) {
    // console.log(typeof (value));
    if (value) {
      this.manageSubStationService.getAllByDC(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.subStationData = data['list'];
            // console.log(this.dcData);
          }
        );
    } else {
      this.subStationData = null;
    }
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
