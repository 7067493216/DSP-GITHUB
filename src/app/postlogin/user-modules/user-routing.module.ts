import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../message-pages/page-not-found/page-not-found.component';

import { ConsumerApplicationComponent } from './consumer-application/consumer-application.component';
import { NscPortalComponent } from './ncs-portal/nsc-portal.component';
import { UserForgetPasswordComponent } from './forget-password/user-forget-password.component';
import { CanActivateUserGuardService } from './user-auth-guards/can-activate-user-guard.service';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserLayoutComponent } from './user-layout/user-layout-component/user-layout.component';

import { userLoginComponent } from './user-login/user-login.component';
import { UserSelectDtrPtrAndOtherComponent } from './consumer-application/user-select-dtr-ptr-and-other/user-select-dtr-ptr-and-other.component';
import { UnlockUserComponent } from './unlock-user/unlock-user.component';
import { UserSignupComponent } from './consumer-application/user-signup/user-signup.component';
import { UserResetPasswordComponent } from './user-reset-password/user-reset-password.component';
import { UserApplicationListComponent } from './user-application-list/user-application-list.component';
import { FinanceDashboardComponent } from './finance/finance-dashboard/finance-dashboard.component';
import { RefundApplicationListComponent } from './finance/refund-application-list/refund-application-list.component';
import { FinanceCompleatedListComponent } from './finance/finance-compleated-list/finance-compleated-list.component';
import { ResamplingListComponent } from './resampling/resampling-list/resampling-list.component';
import { ResampleListComponent } from './consumer-application/z-ResamplingDiscomModule/resample-list/resample-list.component';
// import { UserResetPasswordComponent } from './user-reset-password/user-reset-password.component';
// import { UserSignUpComponent } from 'src/app/auth/user-signup/user-sign-up.component';
// import { UserResetPasswordComponent } from './user-reset-password/user-reset-password.component';


 

const routes: Routes = [

  {
    path: '',
    runGuardsAndResolvers: 'always',
    component: UserLayoutComponent,
    children: [
      { path: '', redirectTo: '/user/login', pathMatch: 'full' },
      { path: 'login', component: userLoginComponent },
      { path: 'sign-up', component: UserSignupComponent },
      {path: 'dtr-ptr-box', component:UserSelectDtrPtrAndOtherComponent},
      // { path: 'change-password', component: ChangePasswordComponent, canActivate: [CanActivateGuardService] },
      { path: "reset-password", component: UserResetPasswordComponent },
      { path: 'forget-password', component: UserForgetPasswordComponent },
      { path: 'change-password', component: UserChangePasswordComponent },
      { path: 'dashboard', component: UserDashboardComponent, canActivate: [CanActivateUserGuardService] },
      { path: 'finance-dashboard', component: FinanceDashboardComponent, canActivate: [CanActivateUserGuardService] },
      { path: 'resampled-list', component: ResampleListComponent, canActivate: [CanActivateUserGuardService] },
      { path: 'user-list/:id', component: UserApplicationListComponent, canActivate: [CanActivateUserGuardService] },
      { path: 'user-list', component: UserApplicationListComponent, canActivate: [CanActivateUserGuardService] },
      { path: 'consumer-application', component: ConsumerApplicationComponent, canActivate: [CanActivateUserGuardService] },
      { path: 'resampling-list', component: ResamplingListComponent, canActivate: [CanActivateUserGuardService] },
      { path: 'finance-application', component: RefundApplicationListComponent, canActivate: [CanActivateUserGuardService] },
      { path: 'finance-application-completed-list', component: FinanceCompleatedListComponent, canActivate: [CanActivateUserGuardService] },
      {path:'nsc-portal', component:NscPortalComponent},
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) , canActivate: [CanActivateUserGuardService]},
      // { path: '**', component: PageNotFoundComponent, data: { error: 404 } },
      
      // UserSignUpComponent
      
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
