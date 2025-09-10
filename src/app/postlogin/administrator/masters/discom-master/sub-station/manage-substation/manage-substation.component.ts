import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { CrudType } from 'src/app/shared-enum/crudType';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageCircleService } from '../../../services/manage-circle.service';
import { ManageRegionService } from '../../../services/manage-region.service';
import { ManageDivisionService } from '../../../services/manage-division.service';
import { DivisionData } from '../../../models/division.model';
import { Subject } from 'rxjs';
import { SubStationData } from '../../../models/substation.model';
import { ManageSubStationService } from '../../../services/manage-sub-station.service';
import { ManageSubDivisionService } from '../../../services/manage-sub-division.service';
import { ManageDcService } from '../../../services/manage-dc.service';
import { AsyncValidatorService } from 'src/app/shared-services/async-validator.service';

@Component({
  selector: 'app-manage-substation',
  templateUrl: './manage-substation.component.html',
  styleUrls: ['./manage-substation.component.css']
})
export class ManageSubstationComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject();
  ssCreationFg: FormGroup;
  circleData:Array <any>= [];
  regionData:Array <any>= [];
  divisionData:Array <any>= [];
  subDivisionData:Array <any>= [];
  dcData:Array <any>= [];
  subStationDate: SubStationData[];



  constructor(
    private fb: FormBuilder,
    private asyncValidator: AsyncValidatorService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ManageSubstationComponent>,
    private manageCircleService: ManageCircleService,
    private manageRegionService: ManageRegionService,
    private manageDivisionService: ManageDivisionService,
    private manageSubDivisionService: ManageSubDivisionService,
    private manageDcService: ManageDcService,
    private manageSubStationService: ManageSubStationService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {

  }
  // variable to be needed on asyncValidators
  crudType = this.data.crudType;
  rowId = this.data.subStationId;

  ngOnInit() {
    this.ssCreationFg = this.fb.group({
      regionId: [null, Validators.compose([Validators.required])],
      circleId: [null, Validators.compose([Validators.required])],
      divisionId: [null, Validators.compose([Validators.required])],
      subDivisionId: [null, Validators.compose([Validators.required])],
      dcId: [null, Validators.compose([Validators.required])],
      substationCode: [null, { validators: [Validators.required], asyncValidators: [this.asyncValidator.AsyncValidator('substation', this.crudType, this.rowId, 'code')], updateOn: 'blur' }],
      substationName: [null, { validators: [Validators.required], asyncValidators: [this.asyncValidator.AsyncValidator('substation', this.crudType, this.rowId)], updateOn: 'blur' }],
    });
    this.initializeForm();
    this.getHttpResponce();
  }
  initializeForm() {
    if (this.data.crudType === CrudType.create) {
      this.ssCreationFg.reset();
    } else {
      this.loadFormToEdit();
    }
  }
  loadFormToEdit() {
    this.manageSubStationService.getSubStationById(this.data.subStationId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      const list: any = data['list'];

      this.onChangeCicle(list[0].substationDistributionCenter.dcSubdivision.subdivisionDivision.divisionCircle.circleRegion.regionId);
      this.onChangeDivision(list[0].substationDistributionCenter.dcSubdivision.subdivisionDivision.divisionCircle.circleId);
      this.onChangeSubDivision(list[0].substationDistributionCenter.dcSubdivision.subdivisionDivision.divisionId);
      this.onChangeDc(list[0].substationDistributionCenter.dcSubdivision.subDivisionId);
      this.ssCreationFg.controls['regionId'].setValue(list[0].substationDistributionCenter.dcSubdivision.subdivisionDivision.divisionCircle.circleRegion.regionId);
      this.ssCreationFg.controls['circleId'].setValue(list[0].substationDistributionCenter.dcSubdivision.subdivisionDivision.divisionCircle.circleId);
      this.ssCreationFg.controls['divisionId'].setValue(list[0].substationDistributionCenter.dcSubdivision.subdivisionDivision.divisionId);
      this.ssCreationFg.controls['subDivisionId'].setValue(list[0].substationDistributionCenter.dcSubdivision.subDivisionId);
      this.ssCreationFg.controls['dcId'].setValue(list[0].substationDistributionCenter.dcId);
      this.ssCreationFg.controls['substationName'].setValue(list[0].subStationName);
      this.ssCreationFg.controls['substationCode'].setValue(list[0].subStationCode);
    });
  }
  onSubmit() {
    const subStationData = this.ssCreationFg.value;
    if (this.ssCreationFg.valid) {
      if (this.data.crudType === CrudType.create) {
        this.manageSubStationService.addSubStation(subStationData).pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            if(data['code']==='201'){
              this.onClose();
              this.notificationService.success('::' + data['message']);
            } else {
              this.notificationService.warn('::' + data['message']);
            }
          });
      } else {
        //// console.log(divisionData);
        this.manageSubStationService.updateSubStation(this.data.subStationId, subStationData).pipe(takeUntil(this.unsubscribe$)).subscribe(
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
    this.ssCreationFg.reset();
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
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
