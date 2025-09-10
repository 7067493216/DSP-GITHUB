import { Component, OnInit, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DivisionData } from '../../../models/division.model';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageCircleService } from '../../../services/manage-circle.service';
import { ManageRegionService } from '../../../services/manage-region.service';
import { takeUntil } from 'rxjs/operators';
import { SubDivisionData } from '../../../models/subdivision.model';
import { ManageSubDivisionService } from '../../../services/manage-sub-division.service';
import { ManageDivisionService } from '../../../services/manage-division.service';
import { CrudType } from 'src/app/shared-enum/crudType';
import { AsyncValidatorService } from 'src/app/shared-services/async-validator.service';

@Component({
  selector: 'app-manage-sub-division',
  templateUrl: './manage-sub-division.component.html',
  styleUrls: ['./manage-sub-division.component.css']
})
export class ManageSubDivisionComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  subDnCreationFg: FormGroup;
  circleData:Array <any>= [];
  regionData:Array <any>= [];
  divisionData:Array <any>= [];
  subDivisionData:SubDivisionData[];

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private asyncValidator: AsyncValidatorService,
    public dialogRef: MatDialogRef<ManageSubDivisionComponent>,
    private manageCircleService: ManageCircleService,
    private manageRegionService: ManageRegionService,
    private manageDivisionService: ManageDivisionService,
    private manageSubDivisionService: ManageSubDivisionService,
    @Inject(MAT_DIALOG_DATA) public data: any,

    ) {

  }
  // variable to be needed on asyncValidators
  crudType = this.data.crudType;
  rowId = this.data.subDivisionId;

  ngOnInit() {
    this.subDnCreationFg = this.fb.group({
      regionId: [null, Validators.compose([Validators.required])],
      circleId: [null, Validators.compose([Validators.required])],
      divisionId: [null, Validators.compose([Validators.required])],
      subDivision: [null, { validators: [Validators.required], asyncValidators: [this.asyncValidator.AsyncValidator('subdivision', this.crudType, this.rowId)], updateOn: 'blur' }],
      subDivisionCode: [null, { validators: [Validators.required], asyncValidators: [this.asyncValidator.AsyncValidator('subdivision', this.crudType, this.rowId, 'code')], updateOn: 'blur' }],
    });
    this.initializeForm();
    this.getHttpResponce();
  }
  initializeForm() {
    if (this.data.crudType === CrudType.create) {
      this.subDnCreationFg.reset();
    } else {
      this.loadFormToEdit();
     
    }
  }
  loadFormToEdit() {
    this.manageSubDivisionService.getSubDivisionById(this.data.subDivisionId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      const list: any = data['list'];
      //// console.log(this.data.subDivisionId);
      this.onChangeCicle(list[0].subdivisionDivision.divisionCircle.circleRegion.regionId);
      this.onChangeDivision(list[0].subdivisionDivision.divisionCircle.circleId);
      this.subDnCreationFg.controls['regionId'].setValue(list[0].subdivisionDivision.divisionCircle.circleRegion.regionId);
      this.subDnCreationFg.controls['circleId'].setValue(list[0].subdivisionDivision.divisionCircle.circleId); 
      this.subDnCreationFg.controls['divisionId'].setValue(list[0].subdivisionDivision.divisionId); 
      this.subDnCreationFg.controls['subDivision'].setValue(list[0].subDivision); 
      this.subDnCreationFg.controls['subDivisionCode'].setValue(list[0].subDivisionCode);   
    });
  }
  onSubmit() {
    const subDivisionData = this.subDnCreationFg.value;
    if (this.subDnCreationFg.valid) {
      if (this.data.crudType === CrudType.create) {
        this.manageSubDivisionService.addSubDivision(subDivisionData).pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            if(data['code']==='201'){
              this.onClose();
              this.notificationService.success('::' + data['message']);
            } else {
              this.notificationService.warn('::' + data['message']);
            }
          });
      } else {
       // console.log(subDivisionData);
        this.manageSubDivisionService.updateSubDivision(this.data.subDivisionId, subDivisionData).pipe(takeUntil(this.unsubscribe$)).subscribe(
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
    this.subDnCreationFg.reset();
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
   }
}
onChangeDivision(value) { 
  // console.log(typeof(value));
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
   }
}


ngOnDestroy() {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}


}
