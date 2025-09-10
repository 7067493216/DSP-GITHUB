import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../postlogin/message-pages/page-not-found/page-not-found.component';
import { CanActivateGuardService } from './authguards/can-activate-guard.service';
// import { ChangePasswordComponent } from './change-password/change-password.component';
// import { ConsumerSignUpComponent } from './consumer-sign-up/consumer-sign-up.component';
// import { ForgetPasswordComponent } from './forget-password/forget-password.component';
// import { ConsumerLoginComponent } from './consumer-login/consumer-login.component';
// import { LogoutComponent } from './logout/logout.component';


//import { UiCardComponent } from './ui-card/ui-card.component';


const routes: Routes = [
  { path: '', redirectTo: '/consumer/login', pathMatch: 'full' },
  // { path: 'consumer-login', component: ConsumerLoginComponent },
  // { path: 'ui-card', component: ConsumerSignUpComponent },
  // { path: 'logout', component: LogoutComponent, canActivate: [CanActivateGuardService] },
  // { path: 'change-password', component: ChangePasswordComponent, canActivate: [CanActivateGuardService] },
  { path: '**', component: PageNotFoundComponent, data: { error: 404 } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
