import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from 'src/app/shared-modules/material.module';
import { RouterModule } from '@angular/router';
import { FormModules } from 'src/app/shared-modules/form.modules';
import { SharedDirectives } from 'src/app/shared-directives/shared.directive';
import { MatBadgeModule } from '@angular/material/badge';
import { ChartsModule } from 'ng2-charts';
import { ConsumerDashboardComponent } from './consumer-dashboard/consumer-dashboard.component';

@NgModule({
  declarations: [
    ConsumerDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormModules,
    RouterModule,
    SharedDirectives,
    ChartsModule,
    MatBadgeModule
  ]
})
export class DashboardModule { }
