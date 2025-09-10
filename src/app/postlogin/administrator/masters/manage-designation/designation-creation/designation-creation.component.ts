import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { Subject } from 'rxjs';
import { CrudType } from 'src/app/shared-enum/crudType';
import { ManageDesignationService } from '../../services/manage-designation.service';
import { takeUntil } from 'rxjs/operators';
import { AsyncValidatorService } from 'src/app/shared-services/async-validator.service';

@Component({
  selector: 'app-designation-creation',
  templateUrl: './designation-creation.component.html',
  styleUrls: ['./designation-creation.component.css']

})
export class DesignationCreationComponent implements OnInit {
  desigCreationFg: FormGroup;
  unsubscribe$: Subject<void> = new Subject();
  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private designationService: ManageDesignationService,
    private asyncValidator: AsyncValidatorService,

    public dialogRef: MatDialogRef<DesignationCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {

  }
  crudType = this.data.crudType;
  rowId = this.data.designationId;
  ngOnInit() {

    this.desigCreationFg = this.fb.group({
       designationShortForm: ['', Validators.compose([Validators.required])],
      designation: [null, { validators: [Validators.required], asyncValidators: [this.asyncValidator.AsyncValidator('designation', this.crudType, this.rowId )], updateOn: 'blur'}]
    });
    this.initializeForm();
  }

  initializeForm() {
    if (this.data.crudType === CrudType.create) {
      this.desigCreationFg.reset();
    } else {
      this.loadFormToEdit();
    }
  }
  loadFormToEdit() {
    this.designationService.getDesignationById(this.data.designationId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      const list: any = data['list'];
      this.desigCreationFg.controls['designation'].setValue(list[0].designation);
      this.desigCreationFg.controls['designationShortForm'].setValue(list[0].designationShortForm);
    });
  }

  onSubmit() {
    const Designationdata = this.desigCreationFg.value;
    if (this.desigCreationFg.valid) {
      if (this.data.crudType === CrudType.create) {
        this.designationService.addDesignation(Designationdata).pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {          
            if(data['code']==='201'){
              this.onClose();
              this.notificationService.success('::' + data['message']);
            } else {
              this.notificationService.warn('::' + data['message']);
            }
          });
      } else {
        
        this.designationService.updateDesignation(this.data.designationId, Designationdata).pipe(takeUntil(this.unsubscribe$)).subscribe(
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
    this.desigCreationFg.reset();
    
    this.dialogRef.close();
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

