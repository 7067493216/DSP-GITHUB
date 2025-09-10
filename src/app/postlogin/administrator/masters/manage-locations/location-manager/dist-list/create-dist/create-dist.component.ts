import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CrudType } from 'src/app/shared-enum/crudType';
import { LocationMasterService } from '../../../../services/location-master.service';

@Component({
  selector: 'app-create-dist',
  templateUrl: './create-dist.component.html',
  styleUrls: ['./create-dist.component.css']
})
export class CreateDistComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  distCreationFg: FormGroup;
  crudType: CrudType;
  districtData:Array <any>= [];

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateDistComponent>,
    private locationMasterService: LocationMasterService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  ngOnInit() {
    this.distCreationFg = this.fb.group({

      //districtId: ['', Validators.compose([Validators.required])],
      stateId: ['1', Validators.compose([Validators.required])],
      district: [null, Validators.compose([Validators.required])],


    });
    this.initializeForm();
    this.getHttpResponce();
  }
  initializeForm() {
    if (this.data.crudType === CrudType.create) {
      // this.distCreationFg.reset();
    } else {
      this.loadFormToEdit();
    }
  }
  loadFormToEdit() {
    this.locationMasterService.getDistrictById(this.data.districtId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      const list: any = data['list'];
      // console.log(list);
      //// console.log(list[0].divisionCircle.circleRegion.regionId);
      // this.distCreationFg.controls['districtId'].setValue(list[0].districtId);
      this.distCreationFg.controls['district'].setValue(list[0].district);
      this.distCreationFg.controls['stateId'].setValue('' + list[0].districtState.stateId);
      //// console.log( this.distCreationFg.controls.circle.value);

    });
  }
  onSubmit() {
    const districtData = this.distCreationFg.value;
    if (this.distCreationFg.valid) {
      if (this.data.crudType === CrudType.create) {
        this.locationMasterService.addDistrict(districtData).pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            if(data['code']==='201'){
              this.onClose();
              this.notificationService.success('::' + data['message']);
            } else {
              this.notificationService.warn('::' + data['message']);
            }
          });
      } else {
        this.locationMasterService.updateDistrict(this.data.districtId, districtData).pipe(takeUntil(this.unsubscribe$)).subscribe(
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
    this.distCreationFg.reset();
    this.dialogRef.close();
  }
  getHttpResponce() {
    this.locationMasterService.getDistrictList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.districtData = data['list'];
      });

  }
  /* onChangeCicle({value}) { 
    if (value) {
      this.locationMasterService.getCircleByRegionId(value)
      .pipe(takeUntil(this.unsubscribe$)).subscribe(
        data => {
          this.circleData = data['list'];
        }
      );
    } else {
      // console.log('DATA RESET');
      this.circleData = null;
     }
  } */

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
