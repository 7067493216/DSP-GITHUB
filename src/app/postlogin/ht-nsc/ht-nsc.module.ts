import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtNscRoutingModule } from './ht-nsc-routing.module';
import { RouterModule } from '@angular/router';
import { LoadChangeHtComponent } from './load-change-ht/load-change-ht.component';
import { TariffChangeHtComponent } from './tariff-change-ht/tariff-change-ht.component';
import { FormModules } from 'src/app/shared-modules/form.modules';
import { MaterialModule } from 'src/app/shared-modules/material.module';
import { SharedDirectives } from 'src/app/shared-directives/shared.directive';
import { NewConnectionComponent } from './new-connection/new-connection.component';
import { PersonalInformationComponent } from './new-connection/personal-information/personal-information.component';
import { AccountInformationComponent } from './new-connection/account-information/account-information.component';
import { PremiseAddressComponent } from './new-connection/premise-address/premise-address.component';
import { AdditionalInformationComponent } from './new-connection/additional-information/additional-information.component';
import { MeterDetailsComponent } from './new-connection/meter-details/meter-details.component';
import { MeDetailsComponent } from './new-connection/me-details/me-details.component';
import { NscViewComponent } from './new-connection/nsc-view/nsc-view.component';

@NgModule({
  declarations: [
    NscViewComponent,
    LoadChangeHtComponent,
    TariffChangeHtComponent,
    NewConnectionComponent,
    PersonalInformationComponent,
    AccountInformationComponent,
    PremiseAddressComponent,
    AdditionalInformationComponent,
    MeterDetailsComponent,
    MeDetailsComponent],
  imports: [
    CommonModule,
    HtNscRoutingModule,
    MaterialModule,
    FormModules,
    SharedDirectives,
    RouterModule
  ]
})
export class HtNscModule { }
