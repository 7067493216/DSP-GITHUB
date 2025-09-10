import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { MatBadgeModule } from '@angular/material/badge';

import { SidebarComponent } from './sidebar/user-sidebar.component';


import { MaterialModule } from '../shared-modules/material.module';
import { FormModules } from '../shared-modules/form.modules';
// import { SharedDirectives } from '../shared-directives/shared.directive';
import { UserHeaderComponent } from './header/user-header.component';
import { UserFooterComponent } from './footer/user-footer.component';
import { UserNavbarComponent } from './navbar/user-navbar.component';
import { UserSearchBarComponent } from './navbar/user-search-bar/user-search-bar.component';
import { UserLayoutComponent } from './user-layout-component/user-layout.component';
import { SharedDirectives } from 'src/app/shared-directives/shared.directive';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    UserHeaderComponent,
    UserFooterComponent,
    SidebarComponent,
    UserNavbarComponent,
    UserSearchBarComponent,
    UserLayoutComponent

  ],
  exports: [
    UserFooterComponent,
    SidebarComponent,
    UserHeaderComponent,
    UserNavbarComponent
  ],
  imports: [
    CommonModule,
    UserLayoutRoutingModule,
    MaterialModule,
    FormModules,
    SharedDirectives,
    MatBadgeModule,
    MatIconModule
  ],
})
export class UserLayoutModule { }
