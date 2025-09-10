import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateGuardService } from 'src/app/auth/authguards/can-activate-guard.service';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
// import { UserListComponent } from './manage-users/user-list/user-list.component';
import { RouteRoleConstants } from 'src/app/auth/authservices/route-role-constants';

const routes: Routes = [
  {
    path: '', runGuardsAndResolvers: 'always', children: [
      // { path: 'manage-users', component: UserListComponent, canActivate: [CanActivateGuardService], data: { permittedRoles: RouteRoleConstants.UserListComponent } },
      { path: 'manage-roles', component: ManageRolesComponent, canActivate: [CanActivateGuardService], data: { permittedRoles: RouteRoleConstants.ManageRolesComponent } }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
