import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-state',
  templateUrl: './create-state.component.html',
  styleUrls: ['./create-state.component.css']
})
export class CreateStateComponent implements OnInit {
  stateCreationFg: FormGroup;


  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateStateComponent>
    ) {

  }

  ngOnInit() {
    this.stateCreationFg = this.fb.group({
      $key: [(null)],
      country: ['1', Validators.compose([Validators.required])],
      state: [null, Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],

    });
  }
  initializeFormGroup() {
    this.stateCreationFg.setValue({
      $key: '',
      country: '',
      state: '',
      description: '',
    });
  }

  onSubmit() {
    this.stateCreationFg.reset();
    this.initializeFormGroup();
    this.notificationService.success(':: na kar pauga');
    this.onClose();
  }

/*   onSubmit() {
    if (this.stateCreationFg.valid) {
      if (!this.stateCreationFg.get('$key').value) 
        // this.service.insertrole(this.stateCreationFg.value);
      else
      // this.service.updaterole(this.stateCreationFg.value);
      this.stateCreationFg.reset();
      this.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
    }
  } */
  onClose() {
    this.stateCreationFg.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }
}

