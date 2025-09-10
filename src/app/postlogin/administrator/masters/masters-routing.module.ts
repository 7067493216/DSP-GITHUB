import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateGuardService } from 'src/app/auth/authguards/can-activate-guard.service';
import { ManageDesignationComponent } from './manage-designation/manage-designation.component';
import { ManageLocationsComponent } from './manage-locations/manage-locations.component';
import { DiscomMasterComponent } from './discom-master/discom-master.component';
import { RouteRoleConstants } from 'src/app/auth/authservices/route-role-constants';

const routes: Routes = [
  {
    path: '', runGuardsAndResolvers: 'always', children: [
      { path: 'manage-designation', component: ManageDesignationComponent, canActivate: [CanActivateGuardService], data: { permittedRoles: RouteRoleConstants.ManageDesignationComponent } },
      { path: 'locations-list', component: ManageLocationsComponent, canActivate: [CanActivateGuardService], data: { permittedRoles: RouteRoleConstants.ManageLocationsComponent } },
      { path: 'discom-master', component: DiscomMasterComponent, canActivate: [CanActivateGuardService], data: { permittedRoles: RouteRoleConstants.DiscomMasterComponent } }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
