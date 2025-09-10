import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersRoutingModule } from './masters-routing.module';
import { ManageDesignationComponent } from './manage-designation/manage-designation.component';
import { DesignationCreationComponent } from './manage-designation/designation-creation/designation-creation.component';
import { DesignationListComponent } from './manage-designation/designation-list/designation-list.component';
import { ManageLocationsComponent } from './manage-locations/manage-locations.component';
import { MaterialModule } from 'src/app/shared-modules/material.module';
import { RouterModule } from '@angular/router';
import { CreateStateComponent } from './manage-locations/location-manager/state-list/create-state/create-state.component';
import { CreateDistComponent } from './manage-locations/location-manager/dist-list/create-dist/create-dist.component';
import { CreateTehsilComponent } from './manage-locations/location-manager/tehsil-list/create-tehsil/create-tehsil.component';
import { CreateCityComponent } from './manage-locations/location-manager/city-list/create-city/create-city.component';
import { CityListComponent } from './manage-locations/location-manager/city-list/city-list.component';
import { DistListComponent } from './manage-locations/location-manager/dist-list/dist-list.component';
import { StateListComponent } from './manage-locations/location-manager/state-list/state-list.component';
import { TehsilListComponent } from './manage-locations/location-manager/tehsil-list/tehsil-list.component';
import { DiscomMasterComponent } from './discom-master/discom-master.component';
import { CircleComponent } from './discom-master/circle/circle.component';
import { ManageCircleComponent } from './discom-master/circle/manage-circle/manage-circle.component';
import { RegionComponent } from './discom-master/region/region.component';
import { ManageRegionComponent } from './discom-master/region/manage-region/manage-region.component';
import { DivisionComponent } from './discom-master/division/division.component';
import { ManageDivisionComponent } from './discom-master/division/manage-division/manage-division.component';
import { FormModules } from 'src/app/shared-modules/form.modules';
import { ManageFeederComponent } from './discom-master/feeder/manage-feeder/manage-feeder.component';
import { ManageSubstationComponent } from './discom-master/sub-station/manage-substation/manage-substation.component';
import { ManageDcComponent } from './discom-master/dc/manage-dc/manage-dc.component';
import { ManageSubDivisionComponent } from './discom-master/sub-division/manage-sub-division/manage-sub-division.component';
import { FeederComponent } from './discom-master/feeder/feeder.component';
import { SubStationComponent } from './discom-master/sub-station/sub-station.component';
import { DcComponent } from './discom-master/dc/dc.component';
import { SubDivisionComponent } from './discom-master/sub-division/sub-division.component';
import { SharedDirectives } from 'src/app/shared-directives/shared.directive';

@NgModule({
  declarations: [
    ManageDesignationComponent,
    DesignationCreationComponent,
    DesignationListComponent,
    ManageLocationsComponent,
    CreateStateComponent,
    CreateDistComponent,
    CreateTehsilComponent,
    CreateCityComponent,
    CityListComponent,
    DistListComponent,
    StateListComponent,
    TehsilListComponent,
    DiscomMasterComponent,
    RegionComponent,
    ManageRegionComponent,
    CircleComponent,
    ManageCircleComponent,
    DivisionComponent,
    SubDivisionComponent,
    ManageSubDivisionComponent,
    DcComponent,
    ManageDcComponent,
    SubStationComponent,
    ManageSubstationComponent,
    FeederComponent,
    ManageFeederComponent,
    ManageDivisionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormModules,
    RouterModule,
    MastersRoutingModule,
    SharedDirectives
  ],
  entryComponents: [
    DesignationCreationComponent,
    CreateCityComponent,
    CreateTehsilComponent,
    CreateDistComponent,
    CreateStateComponent,
    ManageDivisionComponent,
    ManageRegionComponent,
    ManageCircleComponent,
    ManageFeederComponent,
    ManageSubstationComponent,
    ManageDcComponent,
    ManageSubDivisionComponent

  ],
  providers: [
    // {provide: MatDialogRef, useValue: {}},  // if DialogRef component direct to access in other component
  ],
})
export class MastersModule { }
