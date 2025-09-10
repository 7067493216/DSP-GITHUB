import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SignUpComponent } from './manage-users/sign-up/sign-up.component';
import { FormModules } from 'src/app/shared-modules/form.modules';
import { RouterModule } from '@angular/router';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { UserListComponent } from './manage-users/user-list/user-list.component';
import { RolesListComponent } from './manage-roles/roles-list/roles-list.component';
import { RoleCreationComponent } from './manage-roles/role-creation/role-creation.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UserDetailsComponent } from './manage-users/user-details/user-details.component';
import { MaterialModule } from 'src/app/shared-modules/material.module';
import { HasRoleDirective } from 'src/app/shared-directives/has-role.directive';
import { SharedDirectives } from 'src/app/shared-directives/shared.directive';
import { UpdateConsumerDetailsComponent } from './Update-Consumer/update-consumer-details/update-consumer-details.component';
import { PendingProposalListForRejectionToGmComponent } from './pending-proposal-list-for-rejection-to-gm/pending-proposal-list-for-rejection-to-gm.component';
import { UpdateApplicationStatusComponent } from './update-application-status/update-application-status.component';
import { UserMultipleDcSelectionPopupComponent } from './manage-users/user-multiple-dc-selection-popup/user-multiple-dc-selection-popup.component';
import { ChangeMobileNumberByAdminComponent } from './change-mobile-number-by-admin/change-mobile-number-by-admin.component';
import { ContractorPendencyComponent } from './contractor-pendency/contractor-pendency.component';
import { RefundMisComponent } from './refund-mis/refund-mis.component';
import { RefundApplicationDocumentsComponent } from './refund-application-documents/refund-application-documents.component';


@NgModule({
  declarations: [
    SignUpComponent,
    ManageUsersComponent,
    UserDetailsComponent,
    ManageRolesComponent,
    UserListComponent,
    RolesListComponent,
    RoleCreationComponent,
    UpdateConsumerDetailsComponent,
    PendingProposalListForRejectionToGmComponent,
    UpdateApplicationStatusComponent,
    UserMultipleDcSelectionPopupComponent,
    ChangeMobileNumberByAdminComponent,
    ContractorPendencyComponent,
    RefundMisComponent,
    RefundApplicationDocumentsComponent
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
