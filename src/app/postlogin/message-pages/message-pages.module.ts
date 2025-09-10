import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagePagesRoutingModule } from './message-pages-routing.module';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ServiceUnavailableComponent } from './service-unavailable/service-unavailable.component';
import { FormModules } from 'src/app/shared-modules/form.modules';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared-modules/material.module';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { BadRequestComponent } from './bad-request/bad-request.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SessionTimeoutDialogComponent } from 'src/app/auth/session-timeout-dialog/session-timeout-dialog.component';
import { SpinnerViewComponent } from './spinner-view/spinner-view.component';
import { RequestHandlerDialogComponent } from './request-handler-dialog/request-handler-dialog.component';
import { DialogWithRemarkHandlerDialogComponent } from './dialog-with-remark-handler-dialog/dialog-with-remark-handler-dialog.component';

@NgModule({
  declarations: [
    AccessDeniedComponent,
    MatConfirmDialogComponent,
    PageNotFoundComponent,
    ServiceUnavailableComponent,
    ForbiddenComponent,
    ServerErrorComponent,
    BadRequestComponent,
    SnackbarComponent,
    SpinnerViewComponent,
    RequestHandlerDialogComponent,
    DialogWithRemarkHandlerDialogComponent
  ],
  imports: [
    CommonModule,
    MessagePagesRoutingModule,
    MaterialModule,
    FormModules,
    RouterModule
  ],
  entryComponents: [
    MatConfirmDialogComponent,
    SessionTimeoutDialogComponent,
    SpinnerViewComponent,
    SnackbarComponent
  ],
})
export class MessagePagesModule { }
