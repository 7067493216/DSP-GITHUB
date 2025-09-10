import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationViewComponent } from './application-view/application-view.component';
import { TrackConsumerApplicationComponent } from './track-consumer-application/track-consumer-application.component';


const routes: Routes = [
  { path: '',  redirectTo: '/track/track-application', pathMatch: 'full' },
  { path: 'track-application', component: TrackConsumerApplicationComponent },
  { path: 'application-list', component: ApplicationListComponent },
  { path: 'application-view', component: ApplicationViewComponent },
  // { path: '', component: ApplicationViewComponent },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackRoutingModule { }
