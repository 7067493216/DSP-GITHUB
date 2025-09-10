import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { CrudType } from 'src/app/shared-enum/crudType';
import { ManageRoleService } from '../../services/manage-role.service';

@Component({
  selector: 'app-role-creation',
  templateUrl: './role-creation.component.html',
  styleUrls: ['./role-creation.component.css']

})
export class RoleCreationComponent implements OnInit {
  roleCreationFg: FormGroup;
  checkedA = false;
  checkedU = false;
  checkedV = false;
  checkedR = false;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<RoleCreationComponent>,
    public manageRoleService: ManageRoleService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  ngOnInit() {
    this.roleCreationFg = this.fb.group({
      roleId: [(null)],
      role: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      addAction: [null, Validators.compose([Validators.required])],
      removeAction: [(false)],
      updateAction: [(false)],
      viewAction: [(false)],
      roleCode: [null, Validators.compose([Validators.required])]
    });
    this.initializeForm();
  }

  initializeForm() {
    if (this.data.crudType === CrudType.create) {
      this.roleCreationFg.reset();
      // console.log(this.data.crudType);
    } else {
      this.loadFormToEdit();
    }
  }
  loadFormToEdit() {
    this.manageRoleService.getRoleById(this.data.roleId).subscribe(data => {
      const list: any = data['list'];
      this.roleCreationFg.controls['role'].setValue(list[0].role);
      this.roleCreationFg.controls['description'].setValue(list[0].description);
      this.roleCreationFg.controls['addAction'].setValue(list[0].addAction);
      this.roleCreationFg.controls['removeAction'].setValue(list[0].removeAction);
      this.roleCreationFg.controls['updateAction'].setValue(list[0].updateAction);
      this.roleCreationFg.controls['viewAction'].setValue(list[0].viewAction);
      this.roleCreationFg.controls['roleCode'].setValue(list[0].roleCode);
    });
  }

  onSubmit() {
    const roleData = this.roleCreationFg.value;
    // console.log(this.roleCreationFg.valid);
    if (this.roleCreationFg.valid) {
      // console.log(roleData);
      if (this.data.crudType === CrudType.create) {
        this.manageRoleService.addRole(roleData).subscribe(
          data => {
            // console.log(data);
            if (data['code=200']) {
              this.notificationService.success('::' + data['message']);
            } else {
              this.dialogRef.close('error');
            }
          });
      } else {
        this.manageRoleService.updateRole(this.data.roleId, roleData).subscribe(
          data => {
            if(data['code']==='204'){
              this.notificationService.success('::' + data['message']);
            } else {
              this.notificationService.warn('::' + data['message']);
            }
            
          });
      }
      // console.log('popup Closeed');
      this.onClose();

    }
  }
  onClose() {
    this.roleCreationFg.reset();
    this.dialogRef.close();
  }
}
