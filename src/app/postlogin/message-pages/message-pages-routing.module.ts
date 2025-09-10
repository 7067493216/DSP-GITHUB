import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ServiceUnavailableComponent } from './service-unavailable/service-unavailable.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BadRequestComponent } from './bad-request/bad-request.component';

const routes: Routes = [
  {
    path: '', children: [
      // { path: 'access-denied', component: AccessDeniedComponent },
      // { path: 'service-unavailable', component: ServiceUnavailableComponent },
      // // { path: 'bad-request', component: BadRequestComponent },
      // { path: 'forbidden', component: ForbiddenComponent },
      // { path: 'server-error', component: ServerErrorComponent },
      // { path: 'service-unavailable', component: ServiceUnavailableComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagePagesRoutingModule { }
