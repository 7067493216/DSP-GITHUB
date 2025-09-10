export abstract class RouteRoleConstants {

  /*****************
 *  Sandeep Namdeo, Date: - 27 - 07 - 2022 - Start *****
 * *********************/
  // For Dashboard Searching
  //  static readonly user_canSearch: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly user_canSearch: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];

  /***************
* Sandeep Namdeo, Date: - 27 - 07 - 2022 - End ******
* ********************/

  /*****************
   *  Sandeep Namdeo, Date: - 18 - 07 - 2022 - Start *****
   * *********************/
  // For Dashboard show
  // static readonly user_dashboard_routing: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly user_dashboard_routing: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];

  /***************
   * Sandeep Namdeo, Date: - 18 - 07 - 2022 - End ******
   * ********************/

  /* ********************
    *  Sandeep, Date: - 27 - 07 - 2022 - Starts *****
    * *********************/
  // For Sub Menus show of Basic Details Menus

  static readonly AccountInfoComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly UpdateBasicInfoComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly DisputedArrearsComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly ConsumerFlagsComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly SdManagerComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly PremiseAddressComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly PersonalInfoComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];

  // static readonly AccountInfoComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  // static readonly UpdateBasicInfoComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'AUDITOR'];
  // static readonly DisputedArrearsComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'AUDITOR'];
  // static readonly ConsumerFlagsComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  // static readonly SdManagerComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'AUDITOR'];
  // static readonly PremiseAddressComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  // static readonly PersonalInfoComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];;

  /* ********************
  * Sandeep, Date: - 27 - 07 - 2022 - Ends ******
  * ********************/



  static readonly AdditionalInfoComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];







  /*****************
   *  Sandeep Namdeo, Date: - 27 - 07 - 2022 - Start *****
   * *********************/
  // For consumer-control/current-status show

  // static readonly CurrentStatusComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly CurrentStatusComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];

  /***************
   * Sandeep Namdeo, Date: - 27 - 07 - 2022 - End ******
   * ********************/

  static readonly UserListComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL'];
  static readonly ManageRolesComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL'];
  static readonly updateConsumerDetails: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL'];
   static readonly pendingRejectionProposalList: string[] = ['GM'];


  static readonly ManageDesignationComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly ManageHolidaysComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly ManageLocationsComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly DiscomMasterComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly MeterMasterComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly MeMasterComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly TariffMasterComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly MiscellaneousBillingRatesComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];

  static readonly AmrMeterReadUploadComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];

  static readonly BillingMeterSchedulingComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];

  static readonly HtNewconnectionComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly LoadChangeHtComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly TariffChangeHtComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];


  static readonly MeterMeReplaceComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly ChangeGroupComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly DisconnectionComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly MeterMeControllerComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];

  static readonly HtAdjustmentComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly CaptiveUnitPunchComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly BillDeterminantCalculationComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly GroupWiseBillMeterSchedulingComponent: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  static readonly UpdateDueDateComponent: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  static readonly GroupWiseDetCalculationComponent: string[] = ['SuAdmin', 'Admin', 'AE_IT_HT_CELL'];
  static readonly BillCancellationComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly BillReProcessingComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly ReGeneratorUnitComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly BillGenerationComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly ReGenUniDevelopersComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly BillReCalculationComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly PunchOpenAccessUnitComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly AverageAssessmentComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly ManualReadingPunchComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly TmmUnitPunchComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly ReadingCancellationComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];

  // **************************Sandeep Namdeo, Date:- 18-07-2022-Start**************************
  static readonly ManageFcaComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_HT_CELL', 'AO_HT_CELL'];
  //**************************Sandeep Namdeo, Date:- 18-07-2022-End**************************

  // **************************Sandeep Namdeo, Date:- 25-07-2022-Start**************************
  static readonly ManageMeMeterComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_HT_CELL'];
  //**************************Sandeep Namdeo, Date:- 25-07-2022-End**************************

  //ASD Related
  static readonly AsdReviewComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly AsdCalculationComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];

  static readonly ViewGroupWiseBillComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly ReadingRelatedComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];



  static readonly EdutyRelatedComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];

  /*****************
     *  Sandeep Namdeo, Date: - 19 - 07 - 2022 - Start *****
     * *********************/
  // ---------------------------For give permission to Sub menus (Remove 401 Error)---------------------------

  //  static readonly ArrearsReportComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  // static readonly BillingRelatedComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  // static readonly CcnbDataComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  // static readonly MasterReportsComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  // static readonly PaymentRelatedComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  // static readonly RevenueRelatedComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  // static readonly GetAllCunsumerListComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  // static readonly DownloadBillComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  // static readonly NscViewComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly ArrearsReportComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  static readonly BillingRelatedComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  static readonly CcnbDataComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  static readonly MasterReportsComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  static readonly PaymentRelatedComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  static readonly RevenueRelatedComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  static readonly GetAllCunsumerListComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  static readonly DownloadBillComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  static readonly NscViewComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'AUDITOR'];
  /***************
   * Sandeep Namdeo, Date: - 19 - 07 - 2022 - End ******
   * ********************/

  static readonly ConsumptionRelatedComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly AdjustmentRelatedComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly RERelatedComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly SdAsdRelatedComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];

  static readonly ModificationsRelatedComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly MonitoringRelatedComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly FinanceRelatedComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly PostBillingComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly MeterRelatedComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];

  static readonly AsdBillDownloadComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];



  static readonly RevenueDataGenerationComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];

  static readonly BillMessengerComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'DGMCIR', 'AO'];

  static readonly PaymentPortalComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'JE_HT_CELL', 'ARO', 'OAG', 'payment_punch'];
  static readonly AmountAdjustmentComponent: string[] = ['SuAdmin', 'AO_HT_CELL', 'DGMHTCELL', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG'];
  static readonly CurrentMonthPaymentControlComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly AmountAdjustmentControlComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly UploadedPaymentComponent: string[] = ['SuAdmin', 'GM_HT_CELL', 'AO_HT_CELL', 'DGMHTCELL'];
  static readonly Tds194qComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];


  /* ********************
  *  Sandeep, Date: - 27 - 07 - 2022 - Starts *****
  * *********************/
  // For Sub Menus show of History Menus

  // static readonly BillHistoryComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  // static readonly CcnbBillComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  // static readonly FinancialAdjustementsHistoryComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  // static readonly LoadHistoryComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  // static readonly MeterMeHistoryComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  // static readonly MtrReadHistoryComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  // static readonly PaymentHistoryComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  // static readonly SDHistoryComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  // static readonly TariffHistoryComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly TCAdvanceHistoryComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  // static readonly UnitAdjustementsHistoryComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];

  static readonly BillHistoryComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  static readonly CcnbBillComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  static readonly FinancialAdjustementsHistoryComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  static readonly LoadHistoryComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  static readonly MeterMeHistoryComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  static readonly MtrReadHistoryComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  static readonly PaymentHistoryComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  static readonly SDHistoryComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  static readonly TariffHistoryComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];
  static readonly UnitAdjustementsHistoryComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only', 'AUDITOR'];

  /* ********************
    * Sandeep, Date: - 27 - 07 - 2022 - Ends ******
    * ********************/


  static readonly DownloadPreviewBillComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];
  static readonly TagSubmeterComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];


  /******** vivek 27-07-2022 starts ***************** */
  static readonly TdsTcsRatesComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_IT', 'GM_HT_CELL', 'GM', 'AO_HT_CELL', 'DGMHTCELL', 'AO', 'AE_HT_CELL', 'JE_HT_CELL', 'ARO', 'OAG', 'MIS', 'View_Only'];

  /******** vivek 27-07-2022 ends ***************** */

  // **************************Sandeep Namdeo, Date:- 01-08-2022-Start*************************
  static readonly TodoModuleComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_HT_CELL', 'AO_HT_CELL', 'OAG', 'ARO', 'GM_HT_CELL'];
  //**************************Sandeep Namdeo, Date:- 01-07=8-2022-End**************************

  // **************************Sandeep Namdeo, Date:- 24-08-2022-Start*************************
  static readonly ConsumerGeneratorDetailComponent: string[] = ['Admin', 'SuAdmin', 'AE_IT_HT_CELL', 'AE_HT_CELL', 'AO_HT_CELL', 'OAG', 'ARO'];
  static ChangeMobileNumberByAdminComponent: any;
  static ContractorPendencyComponent: any;
  static RefundMisComponent: any;
  //**************************Sandeep Namdeo, Date:- 24-07=8-2022-End**************************


}

