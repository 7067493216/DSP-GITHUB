import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { SharedDirectives } from 'src/app/shared-directives/shared.directive';
import { MaterialModule } from 'src/app/shared-modules/material.module';
import { ConsumerDashboardComponent } from '../dashboard/consumer-dashboard/consumer-dashboard.component';
import { ConsumerChangePasswordComponent } from './consumer-change-password/consumer-change-password.component';
import { ConsumerForgetPasswordComponent } from './consumer-forget-password/consumer-forget-password.component';
import { ConsumerLayoutModule } from './consumer-layout/consumer-layout.module';
import { ConsumerLoginComponent } from './consumer-login/consumer-login.component';
import { ConsumerModulesRoutingModule } from './consumer-modules-routing.module';
import { ConsumerSignUpComponent } from './consumer-sign-up/consumer-sign-up.component';
import { ApplicationPaymentComponent } from './new-application/application-payment-component/application-payment.component';
import { ApplicationProgressBarComponent } from './new-application/application-progress-bar/application-progress-bar.component';
import { ContractorSelectComponent } from './new-application/contractor-select-component/contractor-select-component';
import { NewApplicationCreationComponent } from './new-application/new-application-creation/new-application-creation.component';
import { NewApplicationDetailComponent } from './new-application/new-application-detail/new-application-detail.component';
import { NewApplicationListComponent } from './new-application/new-application-list/new-application-list.component';
import { NewApplicationViewComponent } from './new-application/new-application-view/new-application-view.component';
import { NewApplicationComponent } from './new-application/new-application.component';
import { UnlockConsumerComponent } from './unlock-consumer/unlock-consumer.component';
import { SuccessfulGenrateWorkOrderComponent } from './new-application/successful-genrate-work-order/successful-genrate-work-order.component';
import { MukhyaMantriKrishakYojnaComponent } from './mukhya-mantri-krishak-yojna/mukhya-mantri-krishak-yojna.component';
// import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { MukhyaMantriKrishakYojnaFormComponent } from './mukhya-mantri-krishak-yojna-form/mukhya-mantri-krishak-yojna-form.component';
import { ConsumerResetPasswordComponent } from './consumer-reset-password/consumer-reset-password.component';
import { MukhyaMantriKrishakYojnaUpdateComponent } from './mukhya-mantri-krishak-yojna-update/mukhya-mantri-krishak-yojna-update.component';
import { MatCardModule } from '@angular/material/card';
import { RevisedPaymentComponent } from './new-application/revised-payment/revised-payment.component';
import { ReciptDemandComponent } from './new-application/recipt-demand/recipt-demand.component';
import { ConsumerNewFileUploadComponent } from './new-application/consumer-new-file-upload/consumer-new-file-upload.component';
import { ConsumerUpdateFormComponent } from './new-application/consumer-update-form/consumer-update-form.component';
import { ApplicantComplainComponent } from './new-application/applicant-complain/applicant-complain.component';
import { ApplicantFeedbackComponent } from './new-application/applicant-feedback/applicant-feedback.component';
import {MatTreeModule} from '@angular/material/tree';
import { RefundApplicationListComponent } from './Refund-ConsumerApplication/refund-application-list/refund-application-list.component';
import { RefundRequestGenerateComponent } from './Refund-ConsumerApplication/refund-request-generate/refund-request-generate.component';
import { SspLoginComponent } from './ssp-login/ssp-login.component';
import { NewApplicationViewPageComponent } from './new-application/new-application-view-page/new-application-view-page.component';
import { DemandDetailsComponent } from './new-application/demand-details/demand-details.component';
import { MkmyDemandDetailsComponent } from './new-application/mkmy-demand-details/mkmy-demand-details.component';
import { RequestGenerateForMultiplePaymentRefundComponent } from './request-generate-for-multiple-payment-refund/request-generate-for-multiple-payment-refund.component';
import { ReviseDemandDetailsComponent } from './new-application/revise-demand-details/revise-demand-details.component';
import { ConsumerUpdateForAnyNwtComponent } from './new-application/consumer-update-for-any-nwt/consumer-update-for-any-nwt.component';
import { ReturnMaterialDetailsComponent } from './Refund-ConsumerApplication/return-material-details/return-material-details.component';
import { MeterialItemCostDetailsComponent } from './new-application/meterial-item-cost-details/meterial-item-cost-details.component';
import { LoadEnhancementApplicationRejectionComponent } from './new-application/load-enhancement-application-rejection/load-enhancement-application-rejection.component';
// import { MukhyaMantriKrishakYojnaFormComponent } from './mukhya-mantri-krishak-yojna-form/mukhya-mantri-krishak-yojna-form.component';
// import { ConsumerResetPasswordComponent } from './consumer-reset-password/consumer-reset-password.component';
// import { MukhyaMantriKrishakYojnaUpdateComponent } from './mukhya-mantri-krishak-yojna-update/mukhya-mantri-krishak-yojna-update.component';
// import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    ConsumerChangePasswordComponent,
    ConsumerForgetPasswordComponent,
    ConsumerLoginComponent,
    ConsumerDashboardComponent,
    NewApplicationComponent,
    NewApplicationCreationComponent,
    NewApplicationListComponent,
    ConsumerSignUpComponent,
    NewApplicationViewComponent,
    NewApplicationDetailComponent,
    ApplicationPaymentComponent,
    ApplicationProgressBarComponent,
    ContractorSelectComponent,
    UnlockConsumerComponent,
    SuccessfulGenrateWorkOrderComponent,
    MukhyaMantriKrishakYojnaComponent,
    MukhyaMantriKrishakYojnaFormComponent,
    ConsumerResetPasswordComponent,
    MukhyaMantriKrishakYojnaUpdateComponent,
    RevisedPaymentComponent,
    ReciptDemandComponent,
    ConsumerNewFileUploadComponent,
    ConsumerUpdateFormComponent,
    ApplicantComplainComponent,
    ApplicantFeedbackComponent,
    RefundApplicationListComponent,
    RefundRequestGenerateComponent,
    SspLoginComponent,
    NewApplicationViewPageComponent,
    DemandDetailsComponent,
    MkmyDemandDetailsComponent,
    RequestGenerateForMultiplePaymentRefundComponent,
    ReviseDemandDetailsComponent,
    ConsumerUpdateForAnyNwtComponent,
    ReturnMaterialDetailsComponent,
    MeterialItemCostDetailsComponent,
    LoadEnhancementApplicationRejectionComponent
  ],
  imports: [
    CommonModule,
    ConsumerLayoutModule,
    ConsumerModulesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedDirectives,
    MatBottomSheetModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTreeModule
    // NgbModule
  ]
})
export class ConsumerModulesModule { }


