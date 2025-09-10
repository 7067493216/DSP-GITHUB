import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageRegionService } from '../../../services/manage-region.service';
import { CrudType } from '../../../../../../shared-enum/crudType';
import { AsyncValidatorService } from 'src/app/shared-services/async-validator.service';

@Component({
  selector: 'app-manage-region',
  templateUrl: './manage-region.component.html',
  styleUrls: ['./manage-region.component.css']
})
export class ManageRegionComponent implements OnInit {
  regionCreationFg: FormGroup;

  // HttpClient related models call

  constructor(
    private fb: FormBuilder,
    private asyncValidator: AsyncValidatorService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ManageRegionComponent>,
    private manageRegionService: ManageRegionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }
  // variable to be needed on asyncValidators
  crudType = this.data.crudType;
  rowId = this.data.regionId;
  ngOnInit() {
    this.regionCreationFg = this.fb.group({
      regionId: [(null)],
      discomId: ['', Validators.compose([Validators.required])],
      region: [null, { validators: [Validators.required], asyncValidators: [this.asyncValidator.AsyncValidator('region', this.crudType, this.rowId)], updateOn: 'blur' }],
      regionCode: [null, { validators: [Validators.required], asyncValidators: [this.asyncValidator.AsyncValidator('region', this.crudType, this.rowId, 'code')], updateOn: 'blur' }],

    });
    this.initializeForm();
  }
  initializeForm() {
    if (this.data.crudType === CrudType.create) {
      this.regionCreationFg.reset();
    } else {
      this.loadFormToEdit();
    }
  }
  loadFormToEdit() {
    this.manageRegionService.getRegionById(this.data.regionId).subscribe(data => {
      const list: any = data['list'];
      this.regionCreationFg.controls['region'].setValue(list[0].region);
      this.regionCreationFg.controls['regionCode'].setValue(list[0].regionCode);
    });
  }

  onSubmit() {
    const regionData = this.regionCreationFg.value;
    if (this.regionCreationFg.valid) {
      if (this.data.crudType === CrudType.create) {
        this.manageRegionService.addRegion(regionData).subscribe(
          data => {
            if(data['code']==='201'){
              this.onClose();
              this.notificationService.success('::' + data['message']);
            } else {
              this.notificationService.warn('::' + data['message']);
            }
          });
      } else {
        this.manageRegionService.updateRegion(this.data.regionId, regionData).subscribe(
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
    this.regionCreationFg.reset();
    // this.initializeFormGroup();
    this.dialogRef.close();
  }
}

