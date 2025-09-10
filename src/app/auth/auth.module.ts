import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
// import { ConsumerLoginComponent } from './consumer-login/consumer-login.component';
// import { ForgetPasswordComponent } from './forget-password/forget-password.component';
// import { LogoutComponent } from './logout/logout.component';
// import { ChangePasswordComponent } from './change-password/change-password.component';
import { SessionTimeoutDialogComponent } from './session-timeout-dialog/session-timeout-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialModule } from '../shared-modules/material.module';
import { FormModules } from '../shared-modules/form.modules';
import { SharedDirectives } from '../shared-directives/shared.directive';
import { SignUpComponent } from '../postlogin/administrator/admin/manage-users/sign-up/sign-up.component';
// import { ConsumerSignUpComponent } from './consumer-sign-up/consumer-sign-up.component';



//import { UiCardComponent } from './ui-card/ui-card.component';


@NgModule({
  declarations: [
    // ConsumerLoginComponent,
    // ForgetPasswordComponent,
    // ConsumerSignUpComponent,
    SignUpComponent,
    // LogoutComponent,
    // ChangePasswordComponent,
    SessionTimeoutDialogComponent,
    // ConsumerSignUpComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormModules, 
    MatProgressBarModule,
    SharedDirectives
  ],
  exports: [
    // ConsumerLoginComponent,
    // ForgetPasswordComponent,
    // ConsumerSignUpComponent,
    SignUpComponent,
    // LogoutComponent

  ]

})
export class AuthModule { }
