import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerLayoutRoutingModule } from './consumer-layout-routing.module';

import { MaterialModule } from '../shared-modules/material.module';
import { FormModules } from '../shared-modules/form.modules';

import { SharedDirectives } from '../shared-directives/shared.directive';
import { MatBadgeModule } from '@angular/material/badge';
import { ConsumerHeaderComponent } from './header/consumer-header.component';
import { ConsumerFooterComponent } from './footer/consumer-footer.component';
import { ConsumerSidebarComponent } from './sidebar/consumer-sidebar.component';
import { ConsumerNavbarComponent } from './navbar/consumer-navbar.component';
import { ConsumerSearchBarComponent } from './navbar/search-bar/consumer-search-bar.component';
import { ConsumerLayoutComponent } from './consumer-layout-component/consumer-layout.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    ConsumerHeaderComponent,
    ConsumerFooterComponent,
    ConsumerSidebarComponent,
    ConsumerNavbarComponent,
    ConsumerSearchBarComponent,
    ConsumerLayoutComponent

  ],
  exports: [
    ConsumerFooterComponent,
    ConsumerSidebarComponent,
    ConsumerHeaderComponent,
    ConsumerNavbarComponent
  ],
  imports: [
    CommonModule,
    ConsumerLayoutRoutingModule,
    MaterialModule,
    FormModules,
    SharedDirectives,
    MatBadgeModule,
    MatTreeModule,
    MatButtonModule,
     MatIconModule
  ]
})
export class ConsumerLayoutModule { }
