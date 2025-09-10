import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MaterialModule } from 'src/app/shared-modules/material.module';
import { RouterModule } from '@angular/router';
import { FormModules } from 'src/app/shared-modules/form.modules';

import { MatBadgeModule } from '@angular/material/badge';
import { ChartsModule } from 'ng2-charts';
import { UserRoutingModule } from './user-routing.module';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { userLoginComponent } from './user-login/user-login.component';
import { UserForgetPasswordComponent } from './forget-password/user-forget-password.component';
import { UserLayoutModule } from './user-layout/user-layout.module';
import { SharedDirectives } from './shared-directives/shared.directive';
import { ConsumerApplicationListComponent } from './consumer-application/consumer-application-list/consumer-application-list.component';
import { ConsumerApplicationComponent } from './consumer-application/consumer-application.component';
import { ConsumerApplicationDetailComponent } from './consumer-application/consumer-application-detail/consumer-application-detail.component';
import { ConsumerApplicationSurveyComponent } from './consumer-application/consumer-application-survey/consumer-application-survey.componenet';
import { ConsumerApplicationDemandComponent } from './consumer-application/consumer-application-demand/consumer-application-demand.componenet';
import { ConsumerApplicationViewComponent } from './consumer-application/consumer-application-view/consumer-application-view.component';
import { ApplicationPreviousStageComponent } from './consumer-application/application-previous-stage/application-previous-stage.component';
import { ApplicationDcAcceptance } from './consumer-application/application-dc-acceptance/application-dc-acceptance.componenet';
import { ApplicationDemandApprove } from './consumer-application/application-demand-approve/application-demand-approve.componenet';
import { WorkCompletionComponent } from './consumer-application/work-completion/work-completion.component';
import { WorkOrderComponent } from './consumer-application/work-order/work-order.component';
import { NscPortalComponent } from './ncs-portal/nsc-portal.component';
import { NscApplicationListComponent } from './ncs-portal/nsc-application-list/nsc-application-list.component';
import { NscChooseDepositAndSupervisionComponent } from './ncs-portal/nsc-choose-deposit-and-supervision/nsc-choose-deposit-and-supervision.component';
import { MatDialogRef } from '@angular/material/dialog';
import { SuccessfulGenrateWorkOrderComponent } from './consumer-application/successful-genrate-work-order/successful-genrate-work-order.component';
import { UnlockUserComponent } from './unlock-user/unlock-user.component';
import { SuccessfulGenrateWorkCompletionComponent } from './consumer-application/successful-genrate-work-completion/successful-genrate-work-completion.component';
import { UserSelectDtrPtrAndOtherComponent } from './consumer-application/user-select-dtr-ptr-and-other/user-select-dtr-ptr-and-other.component';
import { DtrListComponent } from './consumer-application/dtr-list/dtr-list.component';
import { PtrListComponent } from './consumer-application/ptr-list/ptr-list.component';
import { LtListComponent } from './consumer-application/lt-list/lt-list.component';
import { Lt11KvListComponent } from './consumer-application/lt11-kv-list/lt11-kv-list.component';
import { HT33KvListComponent } from './consumer-application/ht33-kv-list/ht33-kv-list.component';
import { UserSignupComponent } from './consumer-application/user-signup/user-signup.component';
import { SerchBarComponent } from './consumer-application/serch-bar/serch-bar.component';
import { ConsumerDemandDetailComponent } from './consumer-application/consumer-demand-detail/consumer-demand-detail.component';
import { MisReportComponent } from './consumer-application/mis-report/mis-report.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
// import {} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableExporterModule } from 'mat-table-exporter';
import { UserResetPasswordComponent } from './user-reset-password/user-reset-password.component';
import { ApplicationRejectionProposalComponent } from './consumer-application/application-rejection-proposal/application-rejection-proposal.component';
import { ApplicationAcceptanceRejectionAuthorityComponent } from './consumer-application/application-acceptance-rejection-authority/application-acceptance-rejection-authority.component';
import { ApplicationRejectionHandoverToGMComponent } from './consumer-application/application-rejection-handover-to-gm/application-rejection-handover-to-gm.component';
import { ConsumerFileDownloadComponent } from './consumer-application/consumer-file-download/consumer-file-download.component';
import { MkmyDemandDetailsComponent } from './consumer-application/mkmy-demand-details/mkmy-demand-details.component';
import { ContractorSelectComponent } from './consumer-application/contractor-select/contractor-select.component';
import { ConsumerApplicationViewPageComponent } from './consumer-application/consumer-application-view-page/consumer-application-view-page.component';
import { RevisePaymentGenerateComponent } from './consumer-application/revise-payment-generate/revise-payment-generate.component';
import { StcRemarkComponent } from './consumer-application/stc-remark/stc-remark.component';
import { ConnectionPradaaiComponent } from './consumer-application/connection-pradaai/connection-pradaai.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReviseDemandDetailsComponent } from './consumer-application/revise-demand-details/revise-demand-details.component';
import { ReturnMaterialComponentComponent } from './consumer-application/return-material-component/return-material-component.component';
import { JeSurveyBreakComponent } from './consumer-application/je-survey-break/je-survey-break.component';
import { ConeectionPraddaiForNgbComponent } from './consumer-application/coneection-praddai-for-ngb/coneection-praddai-for-ngb.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ConsumerComplaintComponent } from './consumer-application/consumer-complaint/consumer-complaint.component';
import { PaymentRefundRequestByDGMComponent } from './consumer-application/payment-refund-request-by-dgm/payment-refund-request-by-dgm.component';
import { PaymentRefundConfirmationFromGmComponent } from './consumer-application/payment-refund-confirmation-from-gm/payment-refund-confirmation-from-gm.component';
import { ChangeContractorComponent } from './consumer-application/change-contractor/change-contractor.component';
import { UserApplicationListComponent } from './user-application-list/user-application-list.component';
import { NewPaymentRefundVerificationByDgmComponent } from './consumer-application/new-payment-refund-verification-by-dgm/new-payment-refund-verification-by-dgm.component';
import { NewPaymentRefundVerificationByGmComponent } from './consumer-application/new-payment-refund-verification-by-gm/new-payment-refund-verification-by-gm.component';
import { FinanceDashboardComponent } from './finance/finance-dashboard/finance-dashboard.component';
import { RefundApplicationListComponent } from './finance/refund-application-list/refund-application-list.component';
import { RefundRequestByFinanceToBuildeskComponent } from './finance/refund-request-by-finance-to-buildesk/refund-request-by-finance-to-buildesk.component';
import { NewPaymentRefundVerificationByDgmStcComponent } from './consumer-application/new-payment-refund-verification-by-dgm-stc/new-payment-refund-verification-by-dgm-stc.component';
import { IvrsConfirmationByJeComponent } from './consumer-application/ivrs-confirmation-by-je/ivrs-confirmation-by-je.component';
import { ApplicationRejectionProposalByJeComponent } from './consumer-application/application-rejection-proposal-by-je/application-rejection-proposal-by-je.component';
import { TransferApplicationToSspPortalForIvrsSubmissionComponent } from './consumer-application/transfer-application-to-ssp-portal-for-ivrs-submission/transfer-application-to-ssp-portal-for-ivrs-submission.component';
import { PopupForConfirmationForNgbDataPushComponent } from './consumer-application/popup-for-confirmation-for-ngb-data-push/popup-for-confirmation-for-ngb-data-push.component';
import { DuplicateRefundConfirmationByDgmComponent } from './consumer-application/duplicate-refund-confirmation-by-dgm/duplicate-refund-confirmation-by-dgm.component';
import { DuplicateRefundConfirmationByGmComponent } from './consumer-application/duplicate-refund-confirmation-by-gm/duplicate-refund-confirmation-by-gm.component';
import { DuplicateRefundConfirmationByFinanceComponent } from './finance/duplicate-refund-confirmation-by-finance/duplicate-refund-confirmation-by-finance.component';
import { NewPaymentRefundRequestRejectedPopupComponent } from './consumer-application/new-payment-refund-request-rejected-popup/new-payment-refund-request-rejected-popup.component';
import { FinanceCompleatedListComponent } from './finance/finance-compleated-list/finance-compleated-list.component';
import { ResamplingListComponent } from './resampling/resampling-list/resampling-list.component';
import { FillDetailsComponent } from './resampling/fill-details/fill-details.component';
import { VendorFilterPipe } from './resampling/vendor-filter.pipe';
import { SamplingMultipleDtrComponent } from './consumer-application/sampling-multiple-dtr/sampling-multiple-dtr.component';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { GatePassComponent } from './resampling/gate-pass/gate-pass.component';
import { TrfUploadFileComponent } from './resampling/trf-upload-file/trf-upload-file.component';
import { ResampleListComponent } from './consumer-application/z-ResamplingDiscomModule/resample-list/resample-list.component';
import { FileDownloadComponent } from './consumer-application/z-ResamplingDiscomModule/file-download/file-download.component';
import { TestingReportSubmitComponent } from './consumer-application/z-ResamplingDiscomModule/testing-report-submit/testing-report-submit.component';
import { FillDetailsNewComponent } from './resampling/fill-details-new/fill-details-new.component';
import { MaterialConfirmationByNisthalabTaComponent } from './consumer-application/z-ResamplingDiscomModule/material-confirmation-by-nisthalab-ta/material-confirmation-by-nisthalab-ta.component';
import { DtrDetailsComponent } from './resampling/dtr-details/dtr-details.component';
import { ReversedGatePassComponent } from './consumer-application/z-ResamplingDiscomModule/reversed-gate-pass/reversed-gate-pass.component';
// import { UserResetPasswordComponent } from './user-reset-password/user-reset-password.component';
// import { Li11KvListComponent } from './consumer-application/lt11-kv-list/li11-kv-list.component';
// import { SelectDtrPtrLtAndOtherComponent } from './consumer-application/select-dtr-ptr-lt-and-other/select-dtr-ptr-lt-and-other.component';
// import{NscApplicationListComponent} from './ncs-portal/nsc-portalnsc-application-list/nsc-application-list.component';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


export function getToken() {
  return (sessionStorage.getItem('usertoken') ? JSON.parse(sessionStorage.getItem('usertoken')) : null);
}
@NgModule({
  declarations: [
    UserChangePasswordComponent,
    UserForgetPasswordComponent,
    userLoginComponent,
    UserDashboardComponent,
    ConsumerApplicationListComponent,
    ConsumerApplicationComponent,
    ConsumerApplicationSurveyComponent,
    ConsumerApplicationDemandComponent,
    ConsumerApplicationDetailComponent,
    ConsumerApplicationViewComponent,
    ApplicationPreviousStageComponent,
    ApplicationDcAcceptance,
    ApplicationDemandApprove,
    WorkCompletionComponent,
    WorkOrderComponent,
    NscPortalComponent,
    NscApplicationListComponent,
    NscChooseDepositAndSupervisionComponent,
    SuccessfulGenrateWorkOrderComponent,
    UnlockUserComponent,
    SuccessfulGenrateWorkCompletionComponent,
    UserSelectDtrPtrAndOtherComponent,
    DtrListComponent,
    PtrListComponent,
    LtListComponent,
    Lt11KvListComponent,
    HT33KvListComponent,
    UserSignupComponent,
    SerchBarComponent,
    ConsumerDemandDetailComponent,
    MisReportComponent,
    UserResetPasswordComponent,
    ApplicationRejectionProposalComponent,
    ApplicationAcceptanceRejectionAuthorityComponent,
    ApplicationRejectionHandoverToGMComponent,
    ConsumerFileDownloadComponent,
    MkmyDemandDetailsComponent,
    ContractorSelectComponent,
    ConsumerApplicationViewPageComponent,
    RevisePaymentGenerateComponent,
    StcRemarkComponent,
    ConnectionPradaaiComponent,
    ReviseDemandDetailsComponent,
    ReturnMaterialComponentComponent,
    JeSurveyBreakComponent,
    ConeectionPraddaiForNgbComponent,
    ConsumerComplaintComponent,
    PaymentRefundRequestByDGMComponent,
    PaymentRefundConfirmationFromGmComponent,
    ChangeContractorComponent,
    UserApplicationListComponent,
    NewPaymentRefundVerificationByDgmComponent,
    NewPaymentRefundVerificationByGmComponent,
    FinanceDashboardComponent,
    RefundApplicationListComponent,
    RefundRequestByFinanceToBuildeskComponent,
    NewPaymentRefundVerificationByDgmStcComponent,
    IvrsConfirmationByJeComponent,
    ApplicationRejectionProposalByJeComponent,
    TransferApplicationToSspPortalForIvrsSubmissionComponent,
    PopupForConfirmationForNgbDataPushComponent,
    DuplicateRefundConfirmationByDgmComponent,
    DuplicateRefundConfirmationByGmComponent,
    DuplicateRefundConfirmationByFinanceComponent,
    NewPaymentRefundRequestRejectedPopupComponent,
    FinanceCompleatedListComponent,
    ResamplingListComponent,
    FillDetailsComponent,
    VendorFilterPipe,
    SamplingMultipleDtrComponent,
    GatePassComponent,
    TrfUploadFileComponent,
    ResampleListComponent,
    FileDownloadComponent,
    TestingReportSubmitComponent,
    FillDetailsNewComponent,
    MaterialConfirmationByNisthalabTaComponent,
    DtrDetailsComponent,
    ReversedGatePassComponent,
    
    
    

  ],
  imports: [

    CommonModule,
    UserLayoutModule,
    UserRoutingModule,
    MaterialModule,
    FormModules,
    RouterModule,
    SharedDirectives,
    ChartsModule,
    MatBadgeModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableExporterModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule
    
    // NgbModule.forRoot()
    // DatePipe 
  ]
  
  
})
export class UserModule { }


