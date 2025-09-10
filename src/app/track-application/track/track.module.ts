import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackRoutingModule } from './track-routing.module';
import { TrackConsumerApplicationComponent } from './track-consumer-application/track-consumer-application.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationViewComponent } from './application-view/application-view.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { TrackHeaderComponent } from './track-header/track-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [TrackConsumerApplicationComponent, ApplicationListComponent, ApplicationViewComponent, TrackHeaderComponent],
  imports: [
    CommonModule,
    TrackRoutingModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatToolbarModule,
    MatRadioModule
  ]
})
export class TrackModule { }

//  https://dsp.mpcz.in:8888/deposit_scheme/api/user/geo-location/getCaptcheredDataGstNumber/9806204737

// deposit_scheme
