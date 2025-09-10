import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConsumerDashboardComponent } from "../dashboard/consumer-dashboard/consumer-dashboard.component";
import { PageNotFoundComponent } from "../message-pages/page-not-found/page-not-found.component";
import { CanActivateConsumerGuardService } from "./consumer-auth-guards/can-activate-consumer-guard.service";
import { ConsumerChangePasswordComponent } from "./consumer-change-password/consumer-change-password.component";
import { ConsumerForgetPasswordComponent } from "./consumer-forget-password/consumer-forget-password.component";
import { ConsumerLayoutComponent } from "./consumer-layout/consumer-layout-component/consumer-layout.component";
import { ConsumerLoginComponent } from "./consumer-login/consumer-login.component";
import { ConsumerLogoutComponent } from "./consumer-logout/consumer-logout.component";
import { ConsumerSignUpComponent } from "./consumer-sign-up/consumer-sign-up.component";
import { NewApplicationComponent } from "./new-application/new-application.component";
import { MukhyaMantriKrishakYojnaComponent } from "./mukhya-mantri-krishak-yojna/mukhya-mantri-krishak-yojna.component";
import { ConsumerResetPasswordComponent } from "./consumer-reset-password/consumer-reset-password.component";
import { RefundApplicationListComponent } from "./Refund-ConsumerApplication/refund-application-list/refund-application-list.component";
import { SspLoginComponent } from "./ssp-login/ssp-login.component";
import { RequestGenerateForMultiplePaymentRefundComponent } from "./request-generate-for-multiple-payment-refund/request-generate-for-multiple-payment-refund.component";

const routes: Routes = [
  {
    path: "",
    runGuardsAndResolvers: "always",
    component: ConsumerLayoutComponent,
    children: [
      { path: "", redirectTo: "/consumer/login", pathMatch: "full" },
      { path: "login", component: ConsumerLoginComponent },
      { path: "ssp-login/:mobileNo", component: SspLoginComponent },
      { path: "refund-application-list", component: RefundApplicationListComponent },
      { path: "multiple-payment-refund-request", component: RequestGenerateForMultiplePaymentRefundComponent },
      {
        path: "mkky",
        component: MukhyaMantriKrishakYojnaComponent,
        canActivate: [CanActivateConsumerGuardService],
      },
      //MukhyaMantriKrishakYojnaComponent
      { path: "forget-password", component: ConsumerForgetPasswordComponent },
      { path: "change-password", component: ConsumerChangePasswordComponent },
      {
        path: "logout",
        component: ConsumerLogoutComponent,
        canActivate: [CanActivateConsumerGuardService],
      },
      { path: "reset-password", component: ConsumerResetPasswordComponent },
      {
        path: "dashboard",
        component: ConsumerDashboardComponent,
        canActivate: [CanActivateConsumerGuardService],
      },
      { path: "new-application", component: NewApplicationComponent },
      { path: "sign-up", component: ConsumerSignUpComponent },
      { path: "change-password", component: ConsumerChangePasswordComponent },
      // { path: "**", component: PageNotFoundComponent, data: { error: 404 } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumerModulesRoutingModule {}
