import { Component, OnInit, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageCircleService } from '../../../services/manage-circle.service';
import { ManageRegionService } from '../../../services/manage-region.service';
import { takeUntil } from 'rxjs/operators';
import { DcData } from '../../../models/dc.model';
import { ManageDcService } from '../../../services/manage-dc.service';
import { ManageDivisionService } from '../../../services/manage-division.service';
import { ManageSubDivisionService } from '../../../services/manage-sub-division.service';
import { CrudType } from 'src/app/shared-enum/crudType';
import { AsyncValidatorService } from 'src/app/shared-services/async-validator.service';


@Component({
  selector: 'app-manage-dc',
  templateUrl: './manage-dc.component.html',
  styleUrls: ['./manage-dc.component.css']
})
export class ManageDcComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  dcCreationFg: FormGroup;
  circleData:Array <any>= [];
  regionData:Array <any>= [];
  divisionData:Array <any>= [];
  subDivisionData:Array <any>= [];
  dcData: DcData[];

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private asyncValidator: AsyncValidatorService,
    public dialogRef: MatDialogRef<ManageDcComponent>,
    private manageCircleService: ManageCircleService,
    private manageRegionService: ManageRegionService,
    private manageDivisionService: ManageDivisionService,
    private manageSubDivisionService: ManageSubDivisionService,
    private manageDcService: ManageDcService,

    @Inject(MAT_DIALOG_DATA) public data: any,

    ) {

  }
  
  crudType = this.data.crudType;
  rowId = this.data.dcId;

  ngOnInit() {
    this.dcCreationFg = this.fb.group({
      regionId: [null, Validators.compose([Validators.required])],
      circleId: [null, Validators.compose([Validators.required])],
      divisionId: [null, Validators.compose([Validators.required])],
      subDivisionId: [null, Validators.compose([Validators.required])],
      dcName: [null, { validators: [Validators.required], asyncValidators: [this.asyncValidator.AsyncValidator('distributioncenter', this.crudType, this.rowId)], updateOn: 'blur' }],
      dcCode: [null, { validators: [Validators.required], asyncValidators: [this.asyncValidator.AsyncValidator('distributioncenter', this.crudType, this.rowId,'code')], updateOn: 'blur' }],

    });
    this.initializeForm();
    this.getHttpResponce();
  }
  initializeForm() {
    if (this.data.crudType === CrudType.create) {
      this.dcCreationFg.reset();
    } else {
      this.loadFormToEdit();
    }
  }
  loadFormToEdit() {
    this.manageDcService.getDcById(this.data.dcId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      const list: any = data['list'];
      this.onChangeCicle(list[0].dcSubdivision.subdivisionDivision.divisionCircle.circleRegion.regionId);
      this.onChangeDivision(list[0].dcSubdivision.subdivisionDivision.divisionCircle.circleId);
      this.onChangeSubDivision(list[0].dcSubdivision.subdivisionDivision.divisionId);
      this.dcCreationFg.controls['regionId'].setValue(list[0].dcSubdivision.subdivisionDivision.divisionCircle.circleRegion.regionId);
      this.dcCreationFg.controls['circleId'].setValue(list[0].dcSubdivision.subdivisionDivision.divisionCircle.circleId);
      this.dcCreationFg.controls['divisionId'].setValue(list[0].dcSubdivision.subdivisionDivision.divisionId);
      this.dcCreationFg.controls['subDivisionId'].setValue(list[0].dcSubdivision.subDivisionId);
      this.dcCreationFg.controls['dcName'].setValue(list[0].dcName);
      this.dcCreationFg.controls['dcCode'].setValue(list[0].dcCode);
    });
  }
  onSubmit() {
    const dcData = this.dcCreationFg.value;
    if (this.dcCreationFg.valid) {
      if (this.data.crudType === CrudType.create) {
        this.manageDcService.addDc(dcData).pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            if(data['code']==='201'){
              this.onClose();
              this.notificationService.success('::' + data['message']);
            } else {
              this.notificationService.warn('::' + data['message']);
            }
          });
      } else {

        this.manageDcService.updateDc(this.data.dcId, dcData).pipe(takeUntil(this.unsubscribe$)).subscribe(
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
    this.dcCreationFg.reset();
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
    
    this.circleData = null;
    this.divisionData = null;
    this.subDivisionData = null;
   }
}
onChangeDivision(value) { 
  
  if (value) {
    this.manageDivisionService.getAllDivisionByCircleId(value)
    .pipe(takeUntil(this.unsubscribe$)).subscribe(
      data => {
        this.divisionData = data['list'];
        
      }
    );
  } else {
    this.divisionData = null;
    this.subDivisionData = null;
   }
}
onChangeSubDivision(value) { 
  
  if (value) {
    this.manageSubDivisionService.getAllSubDivisionByDivisionId(value)
    .pipe(takeUntil(this.unsubscribe$)).subscribe(
      data => {
        this.subDivisionData = data['list'];
        
      }
    );
  } else {
    this.subDivisionData = null;
   }
}


ngOnDestroy() {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}


}