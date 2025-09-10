import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CrudType } from 'src/app/shared-enum/crudType';
import { ManageCircleService } from '../../../services/manage-circle.service';
import { CircleData } from '../../../models/circle.model';
import { ManageRegionService } from '../../../services/manage-region.service';
import { RegionData } from '../../../models/region.model';
import { AsyncValidatorService } from 'src/app/shared-services/async-validator.service';

@Component({
  selector: 'app-manage-circle',
  templateUrl: './manage-circle.component.html',
  styleUrls: ['./manage-circle.component.css']
})
export class ManageCircleComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  dnCreationFg: FormGroup;
  circleData: CircleData[];
  regionData: RegionData[];


  constructor(
    private fb: FormBuilder,
    private asyncValidator: AsyncValidatorService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ManageCircleComponent>,
    private manageCircleService: ManageCircleService,
    private manageRegionService: ManageRegionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {

  }
  // variable to be needed on asyncValidators
  crudType = this.data.crudType;
  rowId = this.data.circleId;
  ngOnInit() {
    this.getHttpResponce();
    this.dnCreationFg = this.fb.group({
      circleId: [(null)],
      regionId: [null, Validators.compose([Validators.required])],
      circle: [null, { validators: [Validators.required], asyncValidators: [this.asyncValidator.AsyncValidator('circle', this.crudType, this.rowId)], updateOn: 'blur' }],
      circleCode: [null, { validators: [Validators.required], asyncValidators: [this.asyncValidator.AsyncValidator('circle', this.crudType, this.rowId, 'code')], updateOn: 'blur' }],


    });
    this.initializeForm();
  }

  initializeForm() {
    if (this.data.crudType === CrudType.create) {
      this.dnCreationFg.reset();
    } else {
      this.loadFormToEdit();
    }
  }
  loadFormToEdit() {
    // console.log(this.data.circleId);
    this.manageCircleService.getCircleById(this.data.circleId).subscribe(data => {
      const list: any = data['list'];
      this.dnCreationFg.controls['regionId'].setValue(list[0].circleRegion.regionId);
      this.dnCreationFg.controls['circle'].setValue(list[0].circle);
      this.dnCreationFg.controls['circleCode'].setValue(list[0].circleCode);
    });
  }
  onSubmit() {
    const circleData = this.dnCreationFg.value;
    if (this.dnCreationFg.valid) {
      if (this.data.crudType === CrudType.create) {
        this.manageCircleService.addCircle(circleData).pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            if(data['code']==='201'){
              this.onClose();
              this.notificationService.success('::' + data['message']);
            } else {
              this.notificationService.warn('::' + data['message']);
            }
          });
      } else {
        // console.log(circleData);
        this.manageCircleService.updateCircle(this.data.circleId, circleData).pipe(takeUntil(this.unsubscribe$)).subscribe(
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
    this.dnCreationFg.reset();
    this.dialogRef.close();
  }
  getHttpResponce() {
    this.manageRegionService.getRegionList()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(data => {
      this.regionData = data['list'];
    });
}
ngOnDestroy() {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
}
