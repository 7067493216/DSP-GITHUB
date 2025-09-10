import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SignUpComponent } from './manage-users/sign-up/sign-up.component';
import { FormModules } from 'src/app/shared-modules/form.modules';
import { RouterModule } from '@angular/router';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
// import { UserListComponent } from './manage-users/user-list/user-list.component';
import { RolesListComponent } from './manage-roles/roles-list/roles-list.component';
import { RoleCreationComponent } from './manage-roles/role-creation/role-creation.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UserDetailsComponent } from './manage-users/user-details/user-details.component';
import { MaterialModule } from 'src/app/shared-modules/material.module';
import { HasRoleDirective } from 'src/app/shared-directives/has-role.directive';
import { SharedDirectives } from 'src/app/shared-directives/shared.directive';


@NgModule({
  declarations: [
    SignUpComponent,
    ManageUsersComponent,
    UserDetailsComponent,
    ManageRolesComponent,
    // UserListComponent,
    RolesListComponent,
    RoleCreationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormModules,
    RouterModule,
    AdminRoutingModule,
    SharedDirectives
  ],
  entryComponents: [RoleCreationComponent, SignUpComponent, UserDetailsComponent],
  exports: []
})
export class AdminModule { }
