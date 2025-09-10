import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { CrudType } from 'src/app/shared-enum/crudType';
import { LocationMasterService } from '../../../../services/location-master.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-tehsil',
  templateUrl: './create-tehsil.component.html',
  styleUrls: ['./create-tehsil.component.css']
})
export class CreateTehsilComponent implements OnInit {
  tehsilCreationFg: FormGroup;
  unsubscribe$: Subject<void> = new Subject();
  crudType: CrudType;
  tehsilData: Array<any> = [];
  districtData: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateTehsilComponent>,
    private locationMasterService: LocationMasterService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  ngOnInit() {
    this.tehsilCreationFg = this.fb.group({
      stateId: ['1', Validators.compose([Validators.required])],
      districtId: [null, Validators.compose([Validators.required])],
      tehsil: [null, Validators.compose([Validators.required])],
    });
    this.initializeForm();
    this.onChangeState(1);
  }
  initializeForm() {
    if (this.data.crudType === CrudType.create) {
      // this.tehsilCreationFg.reset();
    } else {
      this.loadFormToEdit();
    }
  }
  loadFormToEdit() {
    this.locationMasterService.getTehsiltById(this.data.tehsilId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      const list: any = data['list'];
      this.onChangeState(list[0].tehsilDistrict.districtState.stateId);
      this.tehsilCreationFg.controls['tehsil'].setValue(list[0].tehsil);
      this.tehsilCreationFg.controls['districtId'].setValue(list[0].tehsilDistrict.districtId);
      this.tehsilCreationFg.controls['stateId'].setValue('' + list[0].tehsilDistrict.districtState.stateId);
      //// console.log( this.tehsilCreationFg.controls.circle.value);

    });
  }

  onClose() {
    this.tehsilCreationFg.reset();
    this.dialogRef.close();
  }
/*   getHttpResponce() {
    this.locationMasterService.getDistrictList().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.tehsilData = data['list'];
        //  // console.log(this.tehsilData);
      });
  } */
  onChangeState(value) {
    if (value) {
      this.locationMasterService.getAllByState(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.districtData = data['list'];
          }
        );
    } else {
      // console.log('DATA RESET');
      this.districtData = null;

    }
  }
  onSubmit() {
    console.log(this.data.tehsilId);
    const tehsilData = this.tehsilCreationFg.value;
    console.log(tehsilData);
    if (this.tehsilCreationFg.valid) {
      if (this.data.crudType === CrudType.create) {
        this.locationMasterService.addTehsil(tehsilData).pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            if(data['code']==='201'){
              this.onClose();
              this.notificationService.success('::' + data['message']);
            } else {
              this.notificationService.warn('::' + data['message']);
            }
          });
      } else {
        //// console.log(tehsilData);
        this.locationMasterService.updateTehsil(this.data.tehsilId, tehsilData).pipe(takeUntil(this.unsubscribe$)).subscribe(
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
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

