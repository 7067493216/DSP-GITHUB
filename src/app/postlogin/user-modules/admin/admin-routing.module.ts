import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateGuardService } from 'src/app/auth/authguards/can-activate-guard.service';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { UserListComponent } from './manage-users/user-list/user-list.component';
import { RouteRoleConstants } from 'src/app/auth/authservices/route-role-constants';
import { UpdateConsumerDetailsComponent } from './Update-Consumer/update-consumer-details/update-consumer-details.component';
import { PendingProposalListForRejectionToGmComponent } from './pending-proposal-list-for-rejection-to-gm/pending-proposal-list-for-rejection-to-gm.component';
import { UpdateApplicationStatusComponent } from './update-application-status/update-application-status.component';
import { ChangeMobileNumberByAdminComponent } from './change-mobile-number-by-admin/change-mobile-number-by-admin.component';
import { ContractorPendencyComponent } from './contractor-pendency/contractor-pendency.component';
import { RefundMisComponent } from './refund-mis/refund-mis.component';

const routes: Routes = [
  {
    path: '', runGuardsAndResolvers: 'always', children: [
      { path: 'manage-users', component: UserListComponent, canActivate: [CanActivateGuardService], data: { permittedRoles: RouteRoleConstants.UserListComponent } },
      { path: 'change-contact', component: ChangeMobileNumberByAdminComponent, canActivate: [CanActivateGuardService], data: { permittedRoles: RouteRoleConstants.ChangeMobileNumberByAdminComponent } },
      { path: 'contractor-pendency', component: ContractorPendencyComponent, canActivate: [CanActivateGuardService], data: { permittedRoles: RouteRoleConstants.ContractorPendencyComponent } },
      { path: 'refund-mis', component: RefundMisComponent, canActivate: [CanActivateGuardService], data: { permittedRoles: RouteRoleConstants.RefundMisComponent } },
      { path: 'manage-roles', component: ManageRolesComponent, canActivate: [CanActivateGuardService], data: { permittedRoles: RouteRoleConstants.ManageRolesComponent } },
      { path: 'update-consumer', component: UpdateConsumerDetailsComponent, canActivate: [CanActivateGuardService], data: { permittedRoles: RouteRoleConstants.updateConsumerDetails } },
     // { path: 'rejection-pending-proposal-list', component: PendingProposalListForRejectionToGmComponent, canActivate: [CanActivateGuardService], data: { permittedRoles: RouteRoleConstants.pendingRejectionProposalList } }
     { path: 'update-application-status', component: UpdateApplicationStatusComponent, canActivate: [CanActivateGuardService], data: { permittedRoles: RouteRoleConstants.UserListComponent } },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
