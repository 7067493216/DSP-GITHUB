import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanActivateGuardService } from 'src/app/auth/authguards/can-activate-guard.service';
import { RouteRoleConstants } from 'src/app/auth/authservices/route-role-constants';
import { ConsumerDashboardComponent } from './consumer-dashboard/consumer-dashboard.component';

const routes: Routes = [

  {
    path: '', runGuardsAndResolvers: 'always', children: [
      { path: '', component: ConsumerDashboardComponent }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
