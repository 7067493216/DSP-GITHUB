
import { LoadChangeHtComponent } from './load-change-ht/load-change-ht.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TariffChangeHtComponent } from './tariff-change-ht/tariff-change-ht.component';
import { CanActivateGuardService } from 'src/app/auth/authguards/can-activate-guard.service';

import { RouteRoleConstants } from 'src/app/auth/authservices/route-role-constants';
import { NewConnectionComponent } from './new-connection/new-connection.component';
import { NscViewComponent } from './new-connection/nsc-view/nsc-view.component';

const routes: Routes = [
  {path: '', runGuardsAndResolvers: 'always',	children:[
  { path: 'newconnection', component: NewConnectionComponent, canActivate: [CanActivateGuardService], data: { permittedRoles: RouteRoleConstants.HtNewconnectionComponent } },
  {path: 'load-change-ht', component: LoadChangeHtComponent, canActivate: [CanActivateGuardService], data: { permittedRoles: RouteRoleConstants.LoadChangeHtComponent } },
  {path: 'tariff-change-ht', component: TariffChangeHtComponent, canActivate: [CanActivateGuardService], data: { permittedRoles: RouteRoleConstants.TariffChangeHtComponent } },
  { path: 'nsc-view', component: NscViewComponent, canActivate: [CanActivateGuardService], data: { permittedRoles: RouteRoleConstants.NscViewComponent } },
]},
];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HtNscRoutingModule { }
