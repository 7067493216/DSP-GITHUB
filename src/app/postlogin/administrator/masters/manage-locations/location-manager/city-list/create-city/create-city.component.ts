import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { CrudType } from 'src/app/shared-enum/crudType';
import { takeUntil } from 'rxjs/operators';
import { LocationMasterService } from '../../../../services/location-master.service';

@Component({
  selector: 'app-create-city',
  templateUrl: './create-city.component.html',
  styleUrls: ['./create-city.component.css']
})
export class CreateCityComponent implements OnInit, OnDestroy {
  cityCreationFg: FormGroup;
  unsubscribe$: Subject<void> = new Subject();
  crudType: CrudType;
  districtData: Array<any> = [];
  tehsilData: Array<any> = [];
  cityData: Array<any> = [];


  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateCityComponent>,
    private locationMasterService: LocationMasterService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  ngOnInit() {
    this.cityCreationFg = this.fb.group({
      stateId: ['1', Validators.compose([Validators.required])],
      districtId: [null, Validators.compose([Validators.required])],
      tehsilId: [null, Validators.compose([Validators.required])],
      city: [null, Validators.compose([Validators.required])],


    });
    this.initializeForm();
    this.onChangeState(1);
  }
  initializeForm() {
    if (this.data.crudType === CrudType.create) {
      
    } else {
      this.loadFormToEdit();
    }
  }
  loadFormToEdit() {
    this.locationMasterService.getCityById(this.data.cityId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      const list: any = data['list'];
      this.onChangeState(list[0].cityTehsil.tehsilDistrict.districtState.stateId);
      this.onChangeDistrict(list[0].cityTehsil.tehsilDistrict.districtId);
      this.cityCreationFg.controls['stateId'].setValue('' + list[0].cityTehsil.tehsilDistrict.districtState.stateId);
      this.cityCreationFg.controls['districtId'].setValue(list[0].cityTehsil.tehsilDistrict.districtId);
      this.cityCreationFg.controls['tehsilId'].setValue(list[0].cityTehsil.tehsilId);
      this.cityCreationFg.controls['city'].setValue(list[0].city);
    });
  }
  onSubmit() {
    const cityData = this.cityCreationFg.value;
    if (this.cityCreationFg.valid) {
      if (this.data.crudType === CrudType.create) {
        this.locationMasterService.addCity(cityData).pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            if (data['code'] === '201') {
              this.onClose();
              this.notificationService.success('::' + data['message']);
            } else {
              this.notificationService.warn('::' + data['message']);
            }
          });
      } else {
        this.locationMasterService.updateCity(this.data.cityId, cityData).pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            if (data['code'] === '204') {
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
    this.cityCreationFg.reset();
    this.dialogRef.close();
  }

  onChangeState(value) {
    if (value) {
      this.locationMasterService.getAllByState(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.districtData = data['list'];
          }
        );
    } else {
      this.districtData = null;
      this.tehsilData = null;
    }
  }
  onChangeDistrict(value) {
    if (value) {
      this.locationMasterService.getAllByDistrict(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {

            this.tehsilData = data['list'];

          }
        );
    } else {
      this.tehsilData = null;
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}

