import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class RoleConstantsService {
  constructor(
    private jwtHelperService: JwtHelperService
  ) { }

  public readonly rolesListComponent_edit: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL'];
  public readonly rolesListComponent_add: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  public readonly rolesListComponent_delete: string[] = ['SuAdmin'];

  public readonly UserListComponent_toggle: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL', 'HR_MANAGER'];
  public readonly UserListComponent_edit: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL', 'HR_MANAGER'];
  public readonly UserListComponent_view: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL', 'HR_MANAGER', 'AE_IT'];
  public readonly UserListComponent_add: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL', 'HR_MANAGER'];
  public readonly UserListComponent_edit_view: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL', 'HR_MANAGER', 'AE_IT'];

  public readonly adminBillCalculation: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  public readonly adminBillScheduling: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];


  public readonly discom_master_edit: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  public readonly discom_master_delete: string[] = ['SuAdmin'];
  public readonly discom_master_add: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];

  public readonly designation_master_edit: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  public readonly designation_master_delete: string[] = ['SuAdmin'];
  public readonly designation_master_add: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];

  public readonly holidays_master_edit: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  public readonly holidays_master_delete: string[] = ['SuAdmin'];
  public readonly holidays_master_add: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];

  public readonly location_master_edit: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  public readonly location_master_delete: string[] = ['SuAdmin'];
  public readonly location_master_add: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];

  public readonly tariff_master_edit: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  public readonly tariff_master_delete: string[] = ['SuAdmin'];
  public readonly tariff_master_add: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];

  public readonly meter_master_edit: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  public readonly meter_master_delete: string[] = ['SuAdmin'];
  public readonly meter_master_add: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];

  public readonly me_master_edit: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  public readonly me_master_delete: string[] = ['SuAdmin'];
  public readonly me_master_add: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];

  public readonly amr_upload: string[] = ['SuAdmin', 'AE_IT_HT_CELL', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];

  // **************************Sandeep Namdeo, Date:- 18-07-2022-Start**************************
  public readonly fca_master_edit: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL', 'AE_HT_CELL', 'AO_HT_CELL'];
  public readonly fca_master_delete: string[] = ['SuAdmin'];
  public readonly fca_master_add: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL', 'AE_HT_CELL', 'AO_HT_CELL'];
  // **************************Sandeep Namdeo, Date:- 18-07-2022-End**************************

  // **************************Sandeep Namdeo, Date:- 25-07-2022-Start**************************
  public readonly me_meter_master_edit: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL', 'AE_HT_CELL'];
  public readonly me_meter_master_delete: string[] = ['SuAdmin'];
  public readonly me_meter_master_add: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL', 'AE_HT_CELL'];
  // **************************Sandeep Namdeo, Date:- 25-07-2022-End**************************

  // Asd related
  public readonly asd_calculation: string[] = ['SuAdmin', 'AE_IT_HT_CELL', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly asd_review: string[] = ['SuAdmin', 'AE_IT_HT_CELL', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly view_asd_billing_navbar: string[] = ['SuAdmin', 'AE_IT_HT_CELL', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewAsdCalculationNavLink: string[] = ['SuAdmin', 'AE_IT_HT_CELL', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewAsdReviewNavLink: string[] = ['SuAdmin', 'AE_IT_HT_CELL', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly LoadChangeHtComponent_save: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly NewConnectionComponent_save: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly TariffChangeHtComponent_Cu: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];

  public readonly ChangeGroupComponent_cu: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly DisconnectionComponent_Save: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly MeterMeReplacementComponent_Save: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];

  public readonly BillReCalculationComponent_Save: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly BillDeterminantCalculationComponent_Save: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly BillGenerationComponent_Submit: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly HtAdjustmentComponent_cu: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly reGneratorUnitforDevelopers_edit: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly reGneratorUnitforDevelopers_delete: string[] = ['SuAdmin'];
  public readonly billCancellation_Save: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly readingCancellation_Save: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];



  /* ********************
  *  Sandeep, Date: - 27 - 07 - 2022 - Starts *****
  * *********************/

  //  For Basic Details Menus Show

  public readonly AccountInfoComponent_update: string[] = ['SuAdmin', 'AE_IT_HT_CELL', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly UpdateBasicInfoComponent_update: string[] = ['SuAdmin', 'AE_IT_HT_CELL', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewDisputedArrearssNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly ConsumerFlagsComponent_view: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly SdManagerComponent_view: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly PremiseAddressComponent_update: string[] = ['SuAdmin', 'AE_IT_HT_CELL', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly PersonalInfoComponent_update: string[] = ['SuAdmin', 'AE_IT_HT_CELL', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];

  public readonly ConsumerCurrentStatusComponent_view: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'AUDITOR'];
  /* ********************
  * Sandeep, Date: - 27 - 07 - 2022 - Ends ******
  * ********************/






  public readonly sdComponent_update: string[] = ['SuAdmin', 'AE_IT_HT_CELL', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];


  public readonly ConsumerFlagsComponent_update: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];




  public readonly AverageAssessmentComponent_cu: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly CaptiveUnitPunchComponent_cu: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly ManualReadingPunchComponent_cu: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly PunchOpenAccessUnitComponent_cu: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly TmmUnitPunchComponent_cu: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];

  public readonly bill_scheduling: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];

  public readonly PaymentPortalComponent_save: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'JE_HT_CELL', 'ARO', 'OAG', 'payment_punch'];
  public readonly UploadPaymentComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL'];
  public readonly uploaded_Payment_cancellation: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL'];
  public readonly uploaded_Payment_process: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL'];
  public readonly cancel_payment_cashier: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly current_month_payment_cancel: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL'];
  public readonly current_month_payment_request: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL'];
  public readonly cancel_ccb_payment: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly ccb_request_for_je: string[] = ['SuAdmin', 'JE_HT_CELL'];
  public readonly ccb_request_for_ao: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL'];
  public readonly ccb_request_for_gm: string[] = ['SuAdmin', 'GM_HT_CELL'];
  public readonly AmountAdjustmentComponent_cu: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];

  // Tds197q
  public readonly Tds194q_can_Punch: string[] = ['SuAdmin', 'AO_HT_CELL', 'ARO', 'AO'];
  public readonly Can_take_action_on_tds194q_amt: string[] = ['SuAdmin', 'AO_HT_CELL', 'ARO'];
  public readonly Can_take_action_on_payment_amt: string[] = ['SuAdmin', 'AO_HT_CELL', 'ARO'];
  public readonly Can_cancel_tds194q: string[] = ['SuAdmin', 'AO_HT_CELL'];

  public readonly viewMasterNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];

  public readonly viewAdminNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'HR_MANAGER', 'AE_IT'];
  public readonly viewUserDashboardNavLink: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'HR_MANAGER', 'AE_IT'];
  public readonly viewManageRolesNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL'];
  public readonly viewBillSchedulingNavLinks: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewGroupWiseBillSchedulingNavLinks: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewBillCalculationNavLinks: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewGroupWiseBillCalculationNavLinks: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];

  public readonly viewHtNewConnectionNavLinks: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewNscNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewLoadChangeNavLink: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  public readonly viewTariffChangeNavLink: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];

  public readonly viewBillProcessingNavLinks: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewPunchCaptiveUnitNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewBillDeterminantNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewBillDeterminantReCalculationNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewBillGenerationNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewUnitReGeneratorNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewUpdateDueDateNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewBillingcycleSchedulingNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly dueDateUpdation_save: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly billMessenger_send: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'AO', 'DGMCIR'];

  public readonly viewReadnBillModificationNavLinks: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewbillCancellationNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewReadingCancellationNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewRevenueDataGenerationNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly revenueDataGenerationProcess: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewBillMessengerNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];

  public readonly viewHTAdjustmentNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewAmountAdjustmentNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewUnitAdjustmentNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewReadingEntryNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewCaptiveUnitRebateNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewOpenAccessUnitrebateNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewManualReadingNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewAverageUnitAssessmentNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewTmmUnitPunchNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];

  public readonly viewSearchBarButton: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];

  /*****************
    *  Sandeep Namdeo, Date: - 27 - 07 - 2022 - Start *****
    * *********************/
  //  ------------------For main menu-----------------

  // For consumer-control/current-status-> Basic Details

  // public readonly viewBasicDetailsNavBar: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  public readonly viewBasicDetailsNavBar: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];


  // For consumer-control/current-status-> History Show

  // public readonly viewHistoryNavBar: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  public readonly viewHistoryNavBar: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];

  /***************
 * Sandeep Namdeo, Date: - 27 - 07 - 2022 - End ******
 * ********************/
  public readonly viewMeterMeControllerNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewMeterMEReplacementNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewMeterMEUpdationNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewChangeGroupNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  public readonly viewMeterDisconnectionNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];



  public readonly viewpaymentPortalNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'payment_punch'];
  public readonly viewPaymentPunchNavLinks: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'JE_HT_CELL', 'ARO', 'OAG', 'payment_punch'];
  public readonly viewManagePaymentNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  public readonly viewManageCCBNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];

  /*****************
     *  Sandeep Namdeo, Date: - 18 - 07 - 2022 - Start *****
     * *********************/
  //  ------------------For main menu-----------------
  //  public readonly viewReportSectionNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  public readonly viewReportSectionNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  /***************
   * Sandeep Namdeo, Date: - 18 - 07 - 2022 - End ******
   * ********************/




  public readonly viewAMRSectionNavLinks: string[] = ['SuAdmin', 'AE_IT_HT_CELL', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];



  public readonly viewPreviewSectionNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];

  public readonly viewTagSubmeterSectionNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];

  /*****************
     *  Sandeep Namdeo, Date: - 18 - 07 - 2022 - Start *****
     * *********************/
  //  ------------------For sub menu-----------------
  public readonly adjustmentRelatedNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  public readonly arrearsNoticeNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  public readonly billingRelatedNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  public readonly asdBillDownloadNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  public readonly billDownloadNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  public readonly ccnbRelatedNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  public readonly consumerDetailsNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  public readonly consumptionRelatedNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  public readonly edutyRelatedNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  public readonly financeRelatedNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  public readonly meterRelatedNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  public readonly modificationsRelatedNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  public readonly monitoringRelatedNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  public readonly paymentRelatedNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  public readonly postBillingNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  public readonly renewableEnergyNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  public readonly readingRelatedNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  public readonly revenueRelatedNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  public readonly sdAsdRelatedNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  public readonly viewBillNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  public readonly viewConsumersNavLinks: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];

  /***************
   * Sandeep Namdeo, Date: - 18 - 07 - 2022 - End ******
   * ********************/

  /*********
   * vivek 26-07-2022
   * ********* */
  public readonly consumerTdsTcsRates_update: string[] = ['SuAdmin', 'AE_IT_HT_CELL', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  /*********
   * vivek 26-07-2022
   * ********* */

  /* ********************
  *  Sandeep, Date: - 29 - 07 - 2022 - Starts *****
  * *********************/
  public readonly viewTodoModuleNavLink: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  /* ********************
  * Sandeep, Date: - 29 - 07 - 2022 - Ends ******
  * ********************/

  /* ********************
*  Sandeep, Date: - 29 - 07 - 2022 - Starts *****
* *********************/
  public readonly todo_module_edit: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  public readonly todo_module_delete: string[] = ['SuAdmin'];
  public readonly todo_module_add: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  public readonly todo_module_view: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  public readonly todo_module_cancel: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  public readonly todo_module_complete: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  public readonly todo_module_action: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  public readonly todo_module_not_applicable: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  /* ********************
* Sandeep, Date: - 29 - 07 - 2022 - Ends ******
* ********************/

  // *******************sandeep, 23-08-2022, starts*******************
  public readonly viewDeveloperMappingNavLinks: string[] = ['SuAdmin', 'AE_IT_HT_CELL', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  // *******************sandeep, 23-08-2022, ends*********************

  // ****************sandeep, 30-08-2022, starts************************
  public readonly consumer_generator_detail_edit: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  // ****************sandeep, 30-08-2022, ends**************************

  /***************deposit scheme roles start ************* */


  public readonly GMAuthority: string[] = ['GM'];
  public readonly DGMAuthority: string[] = ['DGM'];
  public readonly CGMAuthority: string[] = ['CGM'];

  public readonly je_it_edit: string[] = ['JE_IT'];

  public readonly ae_it_view: string[] = ['AE_IT'];

  public readonly DGMSTCAuthority: string[] = ['DGM_STC'];

  public readonly Manager_HTM:string[]= ['Manager_(HTM)']; 

  public readonly DGM_HTM:string[]=['DGM_(HTM)'];


  /***************deposit scheme roles ends ************* */

  roleMatch(role: Array<any>): boolean {
    const userRoles = this.jwtHelperService.decodeToken(sessionStorage.getItem('usertoken')).roles as Array<string>
    return role.some(a => userRoles.some(m => a === m));
  }
}
