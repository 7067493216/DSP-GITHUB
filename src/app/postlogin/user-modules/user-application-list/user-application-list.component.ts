import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { UserLoginService } from '../services/user-login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConsumerApplicationService } from '../services/consumer-application.service';
import { RevisePaymentGenerateComponent } from '../consumer-application/revise-payment-generate/revise-payment-generate.component';
import { ReviseDemandDetailsComponent } from '../consumer-application/revise-demand-details/revise-demand-details.component';
import { StcRemarkComponent } from '../consumer-application/stc-remark/stc-remark.component';
import { ReturnMaterialComponentComponent } from '../consumer-application/return-material-component/return-material-component.component';
import { ConsumerApplicationViewPageComponent } from '../consumer-application/consumer-application-view-page/consumer-application-view-page.component';
import { ConsumerApplicationSurveyComponent } from '../consumer-application/consumer-application-survey/consumer-application-survey.componenet';
import { ApplicationRejectionProposalComponent } from '../consumer-application/application-rejection-proposal/application-rejection-proposal.component';
import { ApplicationRejectionHandoverToGMComponent } from '../consumer-application/application-rejection-handover-to-gm/application-rejection-handover-to-gm.component';
import { ConsumerFileDownloadComponent } from '../consumer-application/consumer-file-download/consumer-file-download.component';
import { ConsumerApplicationDemandComponent } from '../consumer-application/consumer-application-demand/consumer-application-demand.componenet';
import { MkmyDemandDetailsComponent } from '../consumer-application/mkmy-demand-details/mkmy-demand-details.component';
import { ApplicationPreviousStageComponent } from '../consumer-application/application-previous-stage/application-previous-stage.component';
import { ApplicationDcAcceptance } from '../consumer-application/application-dc-acceptance/application-dc-acceptance.componenet';
import { ConsumerComplaintComponent } from '../consumer-application/consumer-complaint/consumer-complaint.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PaymentRefundRequestByDGMComponent } from '../consumer-application/payment-refund-request-by-dgm/payment-refund-request-by-dgm.component';
import { PaymentRefundConfirmationFromGmComponent } from '../consumer-application/payment-refund-confirmation-from-gm/payment-refund-confirmation-from-gm.component';
import { ConnectionPradaaiComponent } from '../consumer-application/connection-pradaai/connection-pradaai.component';
import { ConeectionPraddaiForNgbComponent } from '../consumer-application/coneection-praddai-for-ngb/coneection-praddai-for-ngb.component';
import { JeSurveyBreakComponent } from '../consumer-application/je-survey-break/je-survey-break.component';
import { ApplicationDemandApprove } from '../consumer-application/application-demand-approve/application-demand-approve.componenet';
import { WorkCompletionComponent } from '../consumer-application/work-completion/work-completion.component';
import { WorkOrderComponent } from '../consumer-application/work-order/work-order.component';
import { SuccessfulGenrateWorkOrderComponent } from '../consumer-application/successful-genrate-work-order/successful-genrate-work-order.component';
import { SuccessfulGenrateWorkCompletionComponent } from '../consumer-application/successful-genrate-work-completion/successful-genrate-work-completion.component';
import { UserSelectDtrPtrAndOtherComponent } from '../consumer-application/user-select-dtr-ptr-and-other/user-select-dtr-ptr-and-other.component';
import { MisReportComponent } from '../consumer-application/mis-report/mis-report.component';
import { ContractorSelectComponent } from '../consumer-application/contractor-select/contractor-select.component';
import { ChangeContractorComponent } from '../consumer-application/change-contractor/change-contractor.component';
import { Location } from '@angular/common';
import { NewPaymentRefundVerificationByDgmComponent } from '../consumer-application/new-payment-refund-verification-by-dgm/new-payment-refund-verification-by-dgm.component';
import { NewPaymentRefundVerificationByGmComponent } from '../consumer-application/new-payment-refund-verification-by-gm/new-payment-refund-verification-by-gm.component';
import { NewPaymentRefundVerificationByDgmStcComponent } from '../consumer-application/new-payment-refund-verification-by-dgm-stc/new-payment-refund-verification-by-dgm-stc.component';
import { IvrsConfirmationByJeComponent } from '../consumer-application/ivrs-confirmation-by-je/ivrs-confirmation-by-je.component';
import { ApplicationRejectionProposalByJeComponent } from '../consumer-application/application-rejection-proposal-by-je/application-rejection-proposal-by-je.component';
import { TransferApplicationToSspPortalForIvrsSubmissionComponent } from '../consumer-application/transfer-application-to-ssp-portal-for-ivrs-submission/transfer-application-to-ssp-portal-for-ivrs-submission.component';
import { PopupForConfirmationForNgbDataPushComponent } from '../consumer-application/popup-for-confirmation-for-ngb-data-push/popup-for-confirmation-for-ngb-data-push.component';
import { DuplicateRefundConfirmationByGmComponent } from '../consumer-application/duplicate-refund-confirmation-by-gm/duplicate-refund-confirmation-by-gm.component';
import { DuplicateRefundConfirmationByDgmComponent } from '../consumer-application/duplicate-refund-confirmation-by-dgm/duplicate-refund-confirmation-by-dgm.component';
import { SamplingMultipleDtrComponent } from '../consumer-application/sampling-multiple-dtr/sampling-multiple-dtr.component';


@Component({
  selector: 'app-user-application-list',
  templateUrl: './user-application-list.component.html',
  styleUrls: ['./user-application-list.component.css']
})
export class UserApplicationListComponent implements OnInit {
  //displayedColumns: string[] = ['consumerName', 'applicationStatusName', 'consumerApplicationNo', 'natureOfWorkName'];
  displayedColumns: string[] = ['position', 'schemeType', 'natureOfWork', 'consumerName', 'consumerApplicationNo', 'circle', 'division', 'dcName', "MobileNumber", "Address", "loadRequest", "erpWorkFlowNumber", 'contractorName', 'contractorRegistrationNo', 'ivrs', 'registrationPaymentDate', 'demandPaymentDate', 'stage', 'status', 'edit'];
  dataSource: MatTableDataSource<any>;
  unsubscribe$: Subject<void> = new Subject();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  //  @ViewChild(MatPaginator) paginator: MatPaginator;


  listData: any;
  foraccessLeveOfUser: any;
  roleList: any;
  roleForm: FormGroup;
  completeDate: any;
  consumerApplicationId: any;
  modalTitle: any;
  btnTitle: any;
  userRolesData: any;
  page: any
  size: any
  finalList: Array<any> = [];
  applicationStatusId: any;
  finalArrayt: any
  token: any
  filterForm: FormGroup;
  filtertypeSelected: any = "nothingSelected";
  searchKey: any;
  allTypeBoolean: boolean = false;
  NatureOfworkTypeList: any;
  searchTypeKeys: String = "";
  Sno: any
  mergeStatusArrayStatic: Array<any> = [
    { "Sno": 6, "statusName": "आवेदन लंबित उपभोक्ता स्तर पर।", "statusId": [12, 21, 30, 38] },
    { "Sno": 3, "statusName": "आवेदन लंबित वितरण प्रभारी स्तर पर।", "statusId": [6, 7, 36] },
    { "Sno": 4, "statusName": "आवेदन लंबित उपमहाप्रबंधक(O&M/HTM) स्तर पर।", "statusId": [9, 23, 25] },
    { "Sno": 5, "statusName": "आवेदन लंबित उपमहाप्रबंधक(STC) स्तर पर।", "statusId": [27, 34] },
    { "Sno": 2, "statusName": "आवेदन लंबित महाप्रबंधक स्तर पर।", "statusId": [35] },
    { "Sno": 8, "statusName": "आवेदन लंबित ठेकेदार के स्तर पर।", "statusId": [20, 22, 24, 31] },
    { "Sno": 1, "statusName": "कनेक्शन प्रदाय के लिए आवेदन।", "statusId": [32] },
    { "Sno": 7, "statusName": " निरस्त किये गये आवेदन।", "statusId": [37, 29, 35] },
    { "Sno": 9, "statusName": "पूर्ण आवेदन।", "statusId": [28, 33] },
  ];
  mainArray: Array<any> = [];
  statusIds: any;
  filteredList: Array<any> = [];
  navigatedData: Array<any> = [];
  Statusid: any;
  tableArrayFinal: Array<any> = [];
  statusStringGroup: any;
  distribustionCenterList: Array<any> = [];
  switchedDcId = 0;
  switchedDivisionId = 0;
  overAllData: any;
  currentSwitchedDcId: any;
  currentSwitchedDivisionId: any

  constructor(
    private newApplicationService: ConsumerApplicationService,
    private route: ActivatedRoute,
    private notification: NotificationService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private titleService: Title,
    private dialog: MatDialog,
    public role: RoleConstantsService,
    private url: GenerateUrl,
    private http: HttpClient,
    private userLoginService: UserLoginService,
    private jwtHelperService: JwtHelperService,
    private consumerApplicationService: ConsumerApplicationService,
    private locationObj: Location
  ) {
    this.currentSwitchedDcId = JSON.parse(sessionStorage.getItem("switchedDcId")) == null ? 0 : JSON.parse(sessionStorage.getItem("switchedDcId"));
    console.log(this.currentSwitchedDcId, "this.currentSwitchedDcId");


    this.userLoginService.switchDc.subscribe((data: any) => {
      this.currentSwitchedDcId = data;
      console.log(this.currentSwitchedDcId, "................................", data);
      this.token = sessionStorage.getItem('usertoken');
      const userRoles = JSON.parse(sessionStorage.getItem("accessLeveOfUser"))?.userRoles[0]?.roleCode;
      console.log(userRoles, "ooooooooooooooooooooooooooooooooooooooo");
      this.userRolesData = userRoles;
      this.foraccessLeveOfUser = JSON.parse(sessionStorage.getItem('accessLeveOfUser'));
      this.getApplicationList();

    })

    this.currentSwitchedDivisionId = JSON.parse(sessionStorage.getItem("switchedDivisionId")) == null ? 0 : JSON.parse(sessionStorage.getItem("switchedDivisionId"))
    console.log(this.currentSwitchedDivisionId, "this.currentSwitchedDivisionId");

    this.userLoginService.switchDivision.subscribe((data: any) => {
      this.currentSwitchedDivisionId = data;
      console.log(this.currentSwitchedDivisionId, "................................", data);
      this.token = sessionStorage.getItem('usertoken');
      const userRoles = JSON.parse(sessionStorage.getItem("accessLeveOfUser"))?.userRoles[0]?.roleCode;
      console.log(userRoles, "ooooooooooooooooooooooooooooooooooooooo");
      this.userRolesData = userRoles;
      this.foraccessLeveOfUser = JSON.parse(sessionStorage.getItem('accessLeveOfUser'));
      this.getApplicationList();

    })

    this.token = sessionStorage.getItem('usertoken');
    const userRoles = JSON.parse(sessionStorage.getItem("accessLeveOfUser"))?.userRoles[0]?.roleCode;
    console.log(userRoles, "ooooooooooooooooooooooooooooooooooooooo");
    this.userRolesData = userRoles;
    this.foraccessLeveOfUser = JSON.parse(sessionStorage.getItem('accessLeveOfUser'));
    console.log(this.foraccessLeveOfUser, "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    console.log(sessionStorage.getItem('distribustionCenterList'), "............................", sessionStorage.getItem('distribustionCenterList')[0]);




    ///////////////////////////////////////////////////////////////////////////////

    this.route.queryParamMap.subscribe(params => {
      console.log(params
        , "params....................................");

      const data: any = JSON.parse(params.get('data'));
      console.log(data, "ddddaaaaaatttttttaaaaa.....................");
      this.statusStringGroup = data;
      if (this.currentSwitchedDcId) {
        this.switchedDcId = this.currentSwitchedDcId
      } else {
        this.switchedDcId = Number(params.get('switchedDcId'))
      }

       if (this.currentSwitchedDivisionId) {
        this.switchedDivisionId = this.currentSwitchedDivisionId
      } else {
       this.switchedDivisionId = Number(params.get('switchedDivisionId'))
      }

      

      console.log(this.switchedDcId, ".........", this.switchedDivisionId);

      this.getApplicationList();
      
    });




    this.foraccessLeveOfUser = JSON.parse(sessionStorage.getItem('accessLeveOfUser'));
    console.log(this.foraccessLeveOfUser, "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    this.roleList = this.foraccessLeveOfUser.userRoles;

    this.roleForm = this.fb.group({
      roleOfuser: [""]
    })


    let sampleDate = '20-06-24';
    console.log(this.convertToISOFormat(sampleDate), "this.convertToISOFormat(sampleDate)");


  }

  convertToISOFormat(dateStr: string): string {
    const [day, month, year] = dateStr.split('-');
    const convertedYear = +year < 50 ? '20' + year : '19' + year;
    return (`${convertedYear}-${month}-${day}`);
  }

  getApplicationList() {
    // this.consumerApplicationService.getApplicationListByApplicationStatusGroup(this.statusStringGroup, this.foraccessLeveOfUser?.userId).subscribe((responseData: any) => {
    this.consumerApplicationService.ConsumerApplicationListByStatusIds(this.statusStringGroup, this.foraccessLeveOfUser?.userId, this.switchedDcId, this.switchedDivisionId).subscribe((responseData: any) => {
      console.log(responseData, "responseData....................");
      if (responseData?.code == "200") {
        // this.tableArrayFinal = responseData?.list;
        ///////////////////////////////////////////////////////////////


        const userRoles = JSON.parse(sessionStorage.getItem("currentRoleOfUser"))?.roleCode;
        // console.log(userRoles, "ooooooooooooooooooooooooooooooooooooooo");
        this.userRolesData = userRoles
        responseData?.list.map(x => x.DATE_OF_CREATION = this.convertToISOFormat(x.DATE_OF_CREATION))
        console.log(responseData?.list, "trrrriiiaaall  11111111111  for nothing");


        if (userRoles == 'DGM_(HTM)' && (this.foraccessLeveOfUser.userCircle.circleId == 3 || this.foraccessLeveOfUser.userCircle.circleId == 10)) {
          let DgmHtmList = responseData?.list.filter((x: any) => {

            return (
              //case1
              ((x.natureOfWorkTypeId == 1 || x.natureOfWorkTypeId == 6) && (x.lt == null ||
                (x.lt != null && (x.dtr != null || x.ptr != null || x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null))))
              //case2
              || (((x.natureOfWorkTypeId == 2 && x.voltageLevel == "HT") || (x.natureOfWorkTypeId == 2 && x.voltageLevel == null && x.loadRequestedId == 2 && (JSON.parse(x.loadRequested) > 140 && x.individualOrGroupId == 1)))
                || ((x.natureOfWorkTypeId == 2 && x.voltageLevel == "HT") || (x.natureOfWorkTypeId == 2 && x.voltageLevel == null && x.loadRequestedId == 1 && (JSON.parse(x.loadRequested) > 112 && x.individualOrGroupId == 1)))
              )

            )
          });
          console.log(DgmHtmList, "mmmannnergggerr httttmmm  liiiissttt");
          this.listData = new MatTableDataSource(DgmHtmList);
        }

        else if (userRoles == 'DGM' && (this.foraccessLeveOfUser.userCircle.circleId == 3 || this.foraccessLeveOfUser.userCircle.circleId == 10)) {
          let DgmOMList = responseData?.list.filter((x: any) => {
            return (
              (
                (x?.natureOfWorkTypeId == 2 && x?.voltageLevel == "LT") ||
                (x?.voltageLevel == null && ((x?.natureOfWorkTypeId == 2 && x?.loadRequestedId == 2 && JSON.parse(x?.loadRequested) <= 140) ||
                  (x?.natureOfWorkTypeId == 2 && x?.loadRequestedId == 2 && (JSON.parse(x?.loadRequested) >= 140 && x?.individualOrGroupId == 2))
                  || (x?.natureOfWorkTypeId == 2 && x?.loadRequestedId == 1 && JSON.parse(x?.loadRequested) <= 112) ||
                  (x?.natureOfWorkTypeId == 2 && x?.loadRequestedId == 1 && JSON.parse(x?.loadRequested) >= 112 && x?.individualOrGroupId == 2)) ||
                  (x?.voltageLevel == null && x?.natureOfWorkTypeId == 2 && x?.loadRequestedId == null && x?.loadRequested == null))
              )
              || x?.natureOfWorkTypeId == 3 ||
              x?.natureOfWorkTypeId == 4 || x?.natureOfWorkTypeId == 10 || x?.natureOfWorkTypeId == 5 || x?.natureOfWorkTypeId == 7 || x?.natureOfWorkTypeId == 8 || x?.natureOfWorkTypeId == 9 ||
              (x?.natureOfWorkTypeId == 1 && x?.lt != null && x?.dtr == null && x?.ptr == null && x?.ht11Kv == null && x?.ht33Kv == null && x?.ht132Kv == null) ||
              (x?.natureOfWorkTypeId == 6 && x?.lt != null && x?.dtr == null && x?.ptr == null && x?.ht11Kv == null && x?.ht33Kv == null && x?.ht132Kv == null)
            )
          }
          );
          this.listData = new MatTableDataSource(DgmOMList);
        }

        else if (userRoles == "Manager (HTM)" && (this.foraccessLeveOfUser.userCircle.circleId == 3 || this.foraccessLeveOfUser.userCircle.circleId == 10)) {
          let AeHtmList = responseData?.list.filter((x: any) => {
            return ((x.natureOfWorkTypeId == 1 || x.natureOfWorkTypeId == 6) &&
              (x.lt == null || (x.lt != null && (x.dtr != null || x.ptr != null || x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null)))
              || (x.natureOfWorkTypeId == 2 && x.loadRequestedId == 2 && JSON.parse(x.loadRequested) > 140) || (x.natureOfWorkTypeId == 2 && x.loadRequestedId == 1 && JSON.parse(x.loadRequested) > 112)
            )
          });

          console.log(AeHtmList, "mmmannnergggerr httttmmm  liiiissttt");
          this.listData = new MatTableDataSource(AeHtmList);
        }

        else if (userRoles == 'Manager_(HTM)') {
          let aeHtmList = responseData?.list.filter((x: any) => {
            return ((x?.natureOfWorkTypeId == 1 && (x?.ht11Kv != null || x?.ht33Kv != null || x?.ht132Kv != null)) ||
              (x?.natureOfWorkTypeId == 6 && (x?.ht11Kv != null || x?.ht33Kv != null || x?.ht132Kv != null)))
          });
          this.listData = new MatTableDataSource(aeHtmList);

        }

        else if (userRoles == 'JE_IT' && (this.foraccessLeveOfUser.userCircle.circleId == 3 || this.foraccessLeveOfUser.userCircle.circleId == 10)) {
          let jeList = responseData?.list.filter((x: any) => {
            return (x?.natureOfWorkTypeId == 2 || x?.natureOfWorkTypeId == 3 ||
              x?.natureOfWorkTypeId == 4 || x?.natureOfWorkTypeId == 10 || x?.natureOfWorkTypeId == 5 || x?.natureOfWorkTypeId == 7 || x?.natureOfWorkTypeId == 8 || x?.natureOfWorkTypeId == 9 ||
              (x?.natureOfWorkTypeId == 1 && (x?.ht11Kv == null && x?.ht33Kv == null && x?.ht132Kv == null)) ||
              (x?.natureOfWorkTypeId == 6 && (x?.ht11Kv == null && x?.ht33Kv == null && x?.ht132Kv == null)))
          })

          this.listData = new MatTableDataSource(jeList);
          console.log(this.listData?.filteredData
            , "this.listData.......................");
        }
        else if (userRoles == 'AE(O&M)') {
          let aeOandMList = responseData?.list.filter((x: any) => {

            return (x.schemeTypeId == 1 && x.natureOfWorkTypeId == 5);
            // if (x.applicationStatusId == 27) {
            //   return (((x.schemeTypeId==1 && x.natureOfWorkTypeId!=5) && (x.workOrderDate > "2024-10-29T20:32:55.611")) || (x.schemeTypeId==1 && x.natureOfWorkTypeId==5) )
            // } else {
            //   return x?.schemeTypeId==1;
            // }
            // x?.schemeTypeId == 1 && (x.workOrderDate > "2024-10-29T20:32:55.611")


          });
          this.listData = new MatTableDataSource(aeOandMList);
          console.log(this.listData?.filteredData
            , "this.listData.......................");
        }

        else if (userRoles == 'DGM_STC') {
          let aeOandMList = responseData?.list.filter((x: any) => {
            // return (x.schemeTypeId == 1 && x.applicationStatusId == 27 && (x.workOrderDate <= "2024-10-29T20:32:55.611"))
            // return (x?.schemeTypeId==1 && x.applicationStatusId == 27)

            // if (x.applicationStatusId == 27) {
            //   return (x?.schemeTypeId == 2 || (x?.schemeTypeId == 1 && x?.applicationStatusId == 43) || ((x.schemeTypeId==1 && x.natureOfWorkTypeId!=5) && (x.workOrderDate <= "2024-10-29T20:32:55.611")))
            // } else {
            //  return  (x?.schemeTypeId == 2 || (x?.schemeTypeId == 1 && x?.applicationStatusId == 43))
            // }


            return (x?.schemeTypeId == 2 || (x?.schemeTypeId == 1 && x?.natureOfWorkTypeId != 5))
          });
          this.listData = new MatTableDataSource(aeOandMList);
          console.log(this.listData?.filteredData
            , "this.listData.......................");
        }

        else {
          this.listData = new MatTableDataSource(responseData?.list);
          console.log(this.listData, "this.listData");
        }

        this.overAllData = this.listData;
        console.log(this.listData, "this.listData...............");
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;

        console.log(this.listData, "shamshad 786....................");
      }
    })
  }


  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  onLatestData() {
    this.getApplicationList()
    //this.refreshPaginateNewApplicationList();
  }

  // refreshPaginateNewApplicationList() {
  //   // console.log("dfhuwfhuefeudeduuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
  //   this.listData = new MatTableDataSource();
  //   this.consumerApplicationService.getAllUserApplication().subscribe(data => {
  //     // console.log(data, "lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll");
  //     if (data['code'] == '200') {
  //       if (data['list'] != null) {
  //         const userRoles = JSON.parse(sessionStorage.getItem("currentRoleOfUser"))?.roleCode;
  //         // console.log(userRoles, "ooooooooooooooooooooooooooooooooooooooo");
  //         this.userRolesData = userRoles
  //         console.log(data['list'][0]['list'], "trrrriiiaaall  11111111111  for nothing");


  //         if (userRoles == 'DGM_(HTM)' && (this.foraccessLeveOfUser.userCircle.circleId == 3 || this.foraccessLeveOfUser.userCircle.circleId == 10)) {
  //           let DgmHtmList = data['list'][0]['list'].filter((x: any) => {

  //             return (
  //               //case1
  //               ((x?.natureOfWorkType.natureOfWorkTypeId == 1 || x?.natureOfWorkType.natureOfWorkTypeId == 6) && (x.lt == null ||
  //                 (x.lt != null && (x.dtr != null || x.ptr != null || x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null))))
  //               //case2
  //               || (((x.natureOfWorkType.natureOfWorkTypeId == 2 && x.voltageLevel == "HT") || (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.voltageLevel == null && x.loadRequestedId == 2 && (JSON.parse(x.loadRequested) > 140 && x.individualOrGroupId == 1)))
  //                 || ((x.natureOfWorkType.natureOfWorkTypeId == 2 && x.voltageLevel == "HT") || (x.natureOfWorkTypeId == 2 && x.voltageLevel == null && x.loadRequestedId == 1 && (JSON.parse(x.loadRequested) > 112 && x.individualOrGroupId == 1)))
  //               )

  //             )
  //           });

  //           console.log(DgmHtmList, "mmmannnergggerr httttmmm  liiiissttt");

  //           this.listData = new MatTableDataSource(DgmHtmList);


  //         }

  //         else if (userRoles == "Manager (HTM)" && (this.foraccessLeveOfUser.userCircle.circleId == 3 || this.foraccessLeveOfUser.userCircle.circleId == 10)) {
  //           let AeHtmList = data['list'][0]['list'].filter((x: any) => {
  //             return ((x.natureOfWorkType.natureOfWorkTypeId == 1 || x.natureOfWorkType.natureOfWorkTypeId == 6) &&
  //               (x.lt == null || (x.lt != null && (x.dtr != null || x.ptr != null || x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null)))
  //               || (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId == 2 && JSON.parse(x.loadRequested) > 140) || (x.natureOfWorkTypeId == 2 && x.loadRequestedId == 1 && JSON.parse(x.loadRequested) > 112)
  //             )
  //           });

  //           console.log(AeHtmList, "mmmannnergggerr httttmmm  liiiissttt");

  //           this.listData = new MatTableDataSource(AeHtmList);


  //         }

  //         else if (userRoles == 'DGM' && (this.foraccessLeveOfUser.userCircle.circleId == 3 || this.foraccessLeveOfUser.userCircle.circleId == 10)) {
  //           let DgmOMList = data['list'][0]['list'].filter((x: any) => {

  //             //  console.log(JSON.parse(x.jeLoad), "JSON.parse(x.jeLoad)....................................................jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu.............................");

  //             // if (x.jeLoadUnitKwYaKva == "KVA") {
  //             return (
  //               (
  //                 (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.voltageLevel == "LT") ||
  //                 (x.voltageLevel == null && ((x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId == 2 && JSON.parse(x.loadRequested) <= 140) ||
  //                   (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId == 2 && (JSON.parse(x.loadRequested) >= 140 && x.individualOrGroupId == 2))
  //                   || (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId == 1 && JSON.parse(x.loadRequested) <= 112) ||
  //                   (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId == 1 && JSON.parse(x.loadRequested) >= 112 && x.individualOrGroupId == 2)) ||
  //                   (x.voltageLevel == null && x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId == null && x.loadRequested == null))
  //               )

  //               || x.natureOfWorkType.natureOfWorkTypeId == 3 ||
  //               x.natureOfWorkType.natureOfWorkTypeId == 4 || x.natureOfWorkType.natureOfWorkTypeId == 5 || x.natureOfWorkType.natureOfWorkTypeId == 7 || x.natureOfWorkType.natureOfWorkTypeId == 8 ||
  //               (x.natureOfWorkType.natureOfWorkTypeId == 1 && x.lt != null && x.dtr == null && x.ptr == null && x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null) ||
  //               (x.natureOfWorkType.natureOfWorkTypeId == 6 && x.lt != null && x.dtr == null && x.ptr == null && x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null)

  //             )
  //           }

  //           );
  //           this.listData = new MatTableDataSource(DgmOMList);

  //         }

  //         else if (userRoles == 'Manager_(HTM)') {
  //           let aeHtmList = data['list'][0]['list'].filter((x: any) => {
  //             return ((x.natureOfWorkType.natureOfWorkTypeId == 1 && (x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null)) ||
  //               (x.natureOfWorkType.natureOfWorkTypeId == 6 && (x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null)))
  //           });
  //           this.listData = new MatTableDataSource(aeHtmList);

  //         }

  //         else if (userRoles == 'JE_IT' && (this.foraccessLeveOfUser.userCircle.circleId == 3 || this.foraccessLeveOfUser.userCircle.circleId == 10)) {
  //           let jeList = data['list'][0]['list'].filter((x: any) => {
  //             return (x.natureOfWorkType.natureOfWorkTypeId == 2 || x.natureOfWorkType.natureOfWorkTypeId == 3 ||
  //               x.natureOfWorkType.natureOfWorkTypeId == 4 || x.natureOfWorkType.natureOfWorkTypeId == 5 || x.natureOfWorkType.natureOfWorkTypeId == 7 || x.natureOfWorkType.natureOfWorkTypeId == 8 ||
  //               (x.natureOfWorkType.natureOfWorkTypeId == 1 && (x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null)) ||
  //               (x.natureOfWorkType.natureOfWorkTypeId == 6 && (x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null)))
  //           })

  //           this.listData = new MatTableDataSource(jeList);
  //           console.log(this.listData?.filteredData
  //             , "this.listData.......................");
  //         }
  //         else {

  //           this.listData = new MatTableDataSource(data['list'][0]['list']);
  //           console.log(this.listData, "this.listData");

  //         }

  //         this.finalList = this.listData?.filteredData;

  //         console.log(this.finalList, "this.finalList");
  //         console.log(this.mergeStatusArrayStatic, "this.mergeStatusArrayStatic");



  //         // this.finalArrayt = this.finalList.filter((x) => {
  //         //   return this.statusIds.includes(x.applicationStatus.applicationStatusId)
  //         // });
  //         // console.log(this.finalArrayt, "aaaaaaabbbbbbbbccccccccc............................");

  //         ////////////////////////////////////////////////////////////////////////////////////

  //         let mainArraycurrent: Array<any> = [];
  //         for (let i = 0; i < this.mergeStatusArrayStatic.length; i++) {
  //           let newArray = this.finalList.filter((data: any) => {
  //             // console.log(data,"data..............................................");
  //             return this.mergeStatusArrayStatic[i].statusId.includes(data.applicationStatus.applicationStatusId);
  //           });
  //           this.mainArray.push({
  //             "statusName": this.mergeStatusArrayStatic[i].statusName,
  //             "id": this.mergeStatusArrayStatic[i].Sno,
  //             "data": newArray,
  //             "count": newArray?.length
  //           });
  //         }



  //         console.log(this.mainArray, "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
  //         this.finalArrayt = this.mainArray.filter((z: any) => {
  //           return z.id == this.Statusid
  //         })
  //         console.log(this.finalArrayt, "this.finalArrayt.......................");

  //         this.tableArrayFinal = this.finalArrayt[0]?.data
  //         this.dataSource = new MatTableDataSource(this.tableArrayFinal);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;

  //       }
  //     } else {

  //       this.notification.warn(data['message']);
  //     }
  //   },
  //     error => {

  //     });
  // }

  onRoleChange(e: any) {
    console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee..................................................................................");
    if (sessionStorage.getItem("currentRoleOfUser")) {
      sessionStorage.removeItem("currentRoleOfUser");
      console.log("ifff");
      let userRole = JSON.stringify(e.value);
      sessionStorage.setItem("currentRoleOfUser", userRole)

      // let userRole =e
      // sessionStorage.setItem("currentRoleOfUser",JSON.stringify(userRole));
    } else {
      console.log("elseee");
      let userRole = JSON.stringify(e.value);
      sessionStorage.setItem("currentRoleOfUser", userRole)

      // let userRole =e
      // sessionStorage.setItem("currentRoleOfUser",JSON.stringify(userRole));
    }

    // this.refreshPaginateNewApplicationList(0, 10);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // filterByConsumerName(searchTerm: string) {
  //   if (searchTerm) {
  //     this.filteredList = this.listData?.filteredData.filter(consumer =>
  //       consumer.consumerName.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   } else {
  //     this.filteredList = [...this.filteredList]; // Reset to the full list if search is cleared
  //   }

  //   this.dataSource = new MatTableDataSource(this.filteredList);
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;

  // }

  filterByConsumerName(searchTerm: string) {
    console.log(searchTerm, " : wwaah.......");

    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredList = this.overAllData?.filteredData.filter(consumer =>
        consumer.consumerName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // Reset to full list
      this.filteredList = [...this.overAllData?.filteredData];
    }
    console.log(this.filteredList);


    // this.dataSource = new MatTableDataSource(this.filteredList);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    this.listData = new MatTableDataSource(this.filteredList);
    this.listData.paginator = this.paginator;
    this.listData.sort = this.sort;
  }


  getSearchType(searchBy: any) {
    console.log(
      searchBy,
      "llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll"
    );
    this.filtertypeSelected = searchBy;
    this.searchKey = searchBy;
    switch (searchBy) {
      case "ApplicantName": {
        this.allTypeBoolean = true
        this.searchTypeKeys = "ApplicantName";
        this.filterForm.controls["filtervalueFirst"]?.setValidators(Validators.required);
        this.filterForm.controls["filterValueSecond"]?.clearValidators();
        this.filterForm.controls["filtervaluelast"]?.clearValidators();
        this.filterForm.controls["filterValueFourth"]?.clearValidators()
        // console.log(this.filterForm,"this.filterForm....................");
        break;
      }
      case "ApplicationNumber": {
        this.allTypeBoolean = false
        this.searchTypeKeys = "ApplicationNumber"
        this.filterForm.controls["filterValueSecond"]?.setValidators(Validators.required);
        this.filterForm.controls["filtervalueFirst"]?.clearValidators();
        this.filterForm.controls["filtervaluelast"]?.clearValidators();
        this.filterForm.controls["filterValueFourth"]?.clearValidators()
        // console.log(this.filterForm,"this.filterForm....................");

        break;
      }
      case "ApplicationStatus": {
        this.allTypeBoolean = false
        this.searchTypeKeys = "ApplicationStatus"
        this.filterForm.controls["filtervaluelast"]?.setValidators(Validators.required);
        this.filterForm.controls["filtervalueFirst"]?.clearValidators();
        this.filterForm.controls["filterValueSecond"]?.clearValidators();
        this.filterForm.controls["filterValueFourth"]?.clearValidators()
        // console.log(this.filterForm,"this.filterForm....................");

        break;
      }
      case "NatureOfWork": {
        this.newApplicationService.getNatureOfWorkTypeList().pipe(takeUntil(this.unsubscribe$))
          .subscribe(data => {
            this.NatureOfworkTypeList = data['list'];
          });
        this.allTypeBoolean = false
        this.searchTypeKeys = "NatureOfWork"
        this.filterForm.controls["filterValueFourth"]?.setValidators(Validators.required);
        this.filterForm.controls["filtervaluelast"]?.clearValidators()
        this.filterForm.controls["filtervalueFirst"]?.clearValidators();
        this.filterForm.controls["filterValueSecond"]?.clearValidators();
        // console.log(this.filterForm,"this.filterForm....................");

        break;
      }
      case "allType": {
        this.allTypeBoolean = true
        this.searchTypeKeys = "allType"
        this.filterForm.controls["filterValueFourth"]?.clearValidators()
        this.filterForm.controls["filtervaluelast"]?.clearValidators()
        this.filterForm.controls["filtervalueFirst"]?.clearValidators();
        this.filterForm.controls["filterValueSecond"]?.clearValidators();
        // console.log(this.filterForm,"this.filterForm....................");

        break;
      }
      default: {
        this.allTypeBoolean = false
        //nothing selected
        this.filterForm.controls["filterValueFourth"]?.clearValidators();
        this.filterForm.controls["filtervalueFirst"]?.clearValidators();
        this.filterForm.controls["filterValueSecond"]?.clearValidators();
        this.filterForm.controls["filtervaluelast"]?.clearValidators();
        // console.log(this.filterForm,"this.filterForm....................");
        break;
      }
    }
  }

  filterApplication() {
    // this.dataSource
    console.log(this.listData?.filteredData, "listData...............", this.searchTypeKeys);

    let filterkey: any;

    if (this.searchTypeKeys == "ApplicantName") {
      filterkey = this.filterForm.value.filtervalueFirst

    } else if (this.searchTypeKeys == "ApplicationNumber") {
      filterkey = this.filterForm.value.filterValueSecond;
      let y = this.overAllData?.filteredData.filter((resp: any) => {
        return resp.consumerApplicationNo == filterkey
      });
      this.listData = new MatTableDataSource(y);
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;

    } else if (this.searchTypeKeys == "ApplicationStatus") {
      filterkey = this.filterForm.value.filtervaluelast

    } else if (this.searchTypeKeys == "NatureOfWork") {
      filterkey = this.filterForm.value.filterValueFourth
      let y = this.overAllData?.filteredData.filter((resp: any) => {
        return resp.natureOfWorkTypeId == filterkey
      })
      this.listData = new MatTableDataSource(y);
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;

    } else if (this.searchTypeKeys == "allType") {
      this.listData = new MatTableDataSource(this.overAllData);
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;

    } else {
      return
    }

  }


  goBack() {
    this.locationObj.back();
  }

  filterFormBuild() {
    this.filterForm = this.fb.group({

      filterType: [this.filtertypeSelected, [Validators.required]],
      filtervalueFirst: ["", [Validators.required]],
      filterValueSecond: ["", [Validators.required]],
      filtervaluelast: ["", [Validators.required]],
      filterValueFourth: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    const today = new Date();
    const day: any = today.getDate();
    let month: any = today.getMonth() + 1;
    const year: any = today.getFullYear();


    if (month < 10) {
      month = '0' + month;
      // console.log(month,'INSIDE IF');
    } else {
      month = month;
      //  console.log(month,"INSIDE ELSE")
    }
    // this.completeDate =year+"-"+month+"-"+day;

    // this.completeDate = day + "-" + month + "-" + year;
    this.completeDate = year + "-" + month + "-" + day;
    console.log(this.completeDate, "this.completeDate");

    this.filterFormBuild()

  }

  onRevisePaymentGenerate(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "90vw";
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(RevisePaymentGenerateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // location.reload();
    });
  }

  onRevisePaymentDemand(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "90vw";
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(ReviseDemandDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // location.reload();
    });
  }

  onStcRemark(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "90vw";
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(StcRemarkComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      location.reload();
    });
  }

  returnMaterial(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "90vw";
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(ReturnMaterialComponentComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // location.reload();
    });
  }

  onView(row: any, consumerApplicationId: any) { //consumerApplicationId


  }

  onNewView(row: any, consumerApplicationId: any) {
    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { consumerApplicationId: this.consumerApplicationId, row: row };
    const dialogRef = this.dialog.open(ConsumerApplicationViewPageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.refreshUserList();
      // location.reload();
    });
  }

  applicationSurvey(consumerApplicationId, previousStageStatus, row: any) {



    this.btnTitle = 'Submit Survey';
    if (previousStageStatus == true) {

      this.btnTitle = 'Update Survey Details';
    }

    this.modalTitle = 'Consumer Application Survey';

    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, row: row };
    const dialogRef = this.dialog.open(ConsumerApplicationSurveyComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      //   this.refreshPaginateNewApplicationList(0, 10);

    });
  }

  applicationRejectionPerposalGenerate(consumerApplicationId, previousStageStatus, consumerApplicationNo, schemeTypeId) {
    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90vw';
    dialogConfig.height = "90vh"
    dialogConfig.data = { consumerApplicationId: this.consumerApplicationId, consumerApplicationNo: consumerApplicationNo, schemeTypeId: schemeTypeId, previousStageStatus: previousStageStatus };
    const dialogRef = this.dialog.open(ApplicationRejectionProposalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.refreshPaginateNewApplicationList(0, 10);
    });
  }

  applicationRejectionPerposalGenerateByJe(consumerApplicationId, previousStageStatus, consumerApplicationNo, schemeTypeId) {
    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90vw';
    dialogConfig.height = "90vh"
    dialogConfig.data = { consumerApplicationId: this.consumerApplicationId, consumerApplicationNo: consumerApplicationNo, schemeTypeId: schemeTypeId, previousStageStatus: previousStageStatus };
    const dialogRef = this.dialog.open(ApplicationRejectionProposalByJeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.refreshPaginateNewApplicationList(0, 10);
    });
  }

  //applicationRejectionPerposalHandOverToGM

  applicationRejectionPerposalHandOverToGM(consumerApplicationId, previousStageStatus, consumerApplicationNo, schemeTypeId) {
    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90vw';
    dialogConfig.height = "90vh"
    dialogConfig.data = { consumerApplicationId: this.consumerApplicationId, consumerApplicationNo: consumerApplicationNo, schemeTypeId: schemeTypeId, previousStageStatus: previousStageStatus };
    const dialogRef = this.dialog.open(ApplicationRejectionHandoverToGMComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.refreshPaginateNewApplicationList(0, 10);
    });
  }


  consumerFileDownload(consumerApplicationId: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { consumerApplicationId: consumerApplicationId };
    const dialogRef = this.dialog.open(ConsumerFileDownloadComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(result => {
    //   // this.refreshUserList();
    //   location.reload();
    // });
  }




  applicationDemandGenerate(consumerApplicationId, previousStageStatus, consumerApplicationNo, schemeTypeId, row) {

    this.btnTitle = 'Submit';
    if (previousStageStatus == true) {

      this.btnTitle = 'Update Demand Details';
    }

    // this.modalTitle = 'Consumer Application Demand Note';

    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, consumerApplicationNo: consumerApplicationNo, schemeTypeId: schemeTypeId, row: row };
    const dialogRef = this.dialog.open(ConsumerApplicationDemandComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.refreshPaginateNewApplicationList(0, 10);

    });
  }

  applicationDemandGenerateForMkmy(consumerApplicationId: any, consumerApplicationNo: any, schemeTypeId: any, natureOfWorkTypeId: any, row: any) {

    this.modalTitle = 'Consumer Application Demand Note';

    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, consumerApplicationNo: consumerApplicationNo, schemeTypeId: schemeTypeId, natureOfWorkTypeId: natureOfWorkTypeId, row: row };
    const dialogRef = this.dialog.open(MkmyDemandDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      //  this.refreshPaginateNewApplicationList(0, 10);

    });
  }

  backToPreviousStage(consumerApplicationId) {

    this.modalTitle = 'Application Back To Previous Stage';
    this.btnTitle = 'Submit To Previous Stage';
    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId };
    const dialogRef = this.dialog.open(ApplicationPreviousStageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      //  this.refreshPaginateNewApplicationList(0, 10);

    });
  }


  applicationDcAcceptance(consumerApplicationId, previousStageStatus, row: any) {

    this.btnTitle = 'Submit ';
    if (previousStageStatus == true) {

      this.btnTitle = 'Update ';
    }

    this.modalTitle = 'Applicaton DC Acceptance Survey';

    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, row: row };
    const dialogRef = this.dialog.open(ApplicationDcAcceptance, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.refreshPaginateNewApplicationList(0, 10);

    });
  }


  onComplain(consumerApplicationNo: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { consumerApplicationNo: consumerApplicationNo };
    const dialogRef = this.dialog.open(ConsumerComplaintComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      // this.refreshPaginateNewApplicationList(0, 10);
    });
  }

  onIvrsConfirmation(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(IvrsConfirmationByJeComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      // this.refreshPaginateNewApplicationList(0, 10);
    });
  }



  onRefundRequest(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(PaymentRefundRequestByDGMComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      // this.refreshPaginateNewApplicationList(0, 10);
    });
  }

  onRefundRequestNewForStc(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(NewPaymentRefundVerificationByDgmStcComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      //location.reload();
      // this.refreshPaginateNewApplicationList(0, 10);
    });
  }

  onRefundRequestNew(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(NewPaymentRefundVerificationByDgmComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      // location.reload();
      // this.refreshPaginateNewApplicationList(0, 10);
    });
  }

  onRefundRequestNewByGm(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(NewPaymentRefundVerificationByGmComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      // location.reload();
      // this.refreshPaginateNewApplicationList(0, 10);
    });
  }


  onRefundConfirmation(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(PaymentRefundConfirmationFromGmComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      // location.reload();
      // this.refreshPaginateNewApplicationList(0, 10);
    });
  }

  onTagRequestForMultipleDtr(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(SamplingMultipleDtrComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      // location.reload();
      // this.refreshPaginateNewApplicationList(0, 10);
    });
  }

  connectioPradaai(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(ConnectionPradaaiComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      location.reload();
      // this.refreshPaginateNewApplicationList(0, 10);
    });
  }

  connectioPradaaiForNgb(row: any) {

    if (row?.natureOfWorkTypeId == 5) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60vw';
      dialogConfig.height = '50vh';
      dialogConfig.data = { row: row };
      const dialogRef = this.dialog.open(PopupForConfirmationForNgbDataPushComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        location.reload()
      });
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '90vw';
      dialogConfig.height = '90vh';
      dialogConfig.data = { row: row };
      const dialogRef = this.dialog.open(ConeectionPraddaiForNgbComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        location.reload()
      });
    }

  }


  onJeSurveyBreak(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(JeSurveyBreakComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.refreshPaginateNewApplicationList(0, 10);
    });
  }




  applicationDemandApprove(consumerApplicationId, previousStageStatus, row: any) {

    this.btnTitle = 'Submit ';
    if (previousStageStatus == true) {

      this.btnTitle = 'Update ';
    }

    this.modalTitle = 'Application Demand Approval ';

    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, row: row };
    const dialogRef = this.dialog.open(ApplicationDemandApprove, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.refreshPaginateNewApplicationList(0, 10);

    });
  }

  onEdit(consumerApplicationId) {

    console.log('Inside onEdit !!!');
    console.log('consumerApplicationId :- ', consumerApplicationId);

    this.modalTitle = 'Modify Consumer Application';
    this.btnTitle = 'Update';
    this.consumerApplicationId = consumerApplicationId;
    // this.openDialog();
  }

  workCompletion(consumerApplicationId: any, b: any, row: any) {


    this.modalTitle = 'work completion';
    this.btnTitle = 'work completion';
    this.consumerApplicationId = consumerApplicationId;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, row: row };
    const dialogRef = this.dialog.open(WorkCompletionComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      // this.refreshPaginateNewApplicationList(0, 10);
    });

  }

  workOrder(consumerApplicationId: any, b: any, row: any) {

    this.modalTitle = 'Work Order';
    this.btnTitle = 'work Order';
    this.consumerApplicationId = consumerApplicationId;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, row: row };
    const dialogRef = this.dialog.open(WorkOrderComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      //  this.refreshPaginateNewApplicationList(0, 10);
    });

  }

  workOrdergGenreateSuccessfull(consumerApplicationId: any, b: any, row: any) {

    this.modalTitle = 'Work Order generate successfull';
    this.btnTitle = 'work Order generate successfull';
    this.consumerApplicationId = consumerApplicationId;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, row: row };
    const dialogRef = this.dialog.open(SuccessfulGenrateWorkOrderComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      // this.refreshPaginateNewApplicationList(0, 10);
    });

  }

  workCompletionGenreateSuccessfull(consumerApplicationId: any, b: any, row: any) {
    console.log(row, "rrroooowwwww,,,,,,,,,,,,,,,,");

    this.modalTitle = 'Work Completion generate successfull';
    this.btnTitle = 'work Cmpletion generate successfull';
    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, row: row };
    const dialogRef = this.dialog.open(SuccessfulGenrateWorkCompletionComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      //  this.refreshPaginateNewApplicationList(0, 10);
    });

  }

  selectPtrAndAnyOther(consumerApplicationId: any, b: any) {

    this.modalTitle = 'selecct application behalf';
    this.btnTitle = 'selecct application behalf';
    this.consumerApplicationId = consumerApplicationId;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId };
    const dialogRef = this.dialog.open(UserSelectDtrPtrAndOtherComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      // this.refreshPaginateNewApplicationList(0, 10);
    });

  }

  MisReport(): void {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '80%';
    dialogConfig.height = "80vh";
    dialogConfig.disableClose = true;
    dialogConfig.data = this.foraccessLeveOfUser
    const dialogRef = this.dialog.open(MisReportComponent, dialogConfig);
  }

  onSelectContractor(consumerApplicationNo, consumerApplicationId) {
    console.log(consumerApplicationNo, "jhyukgyukhiljvghvjklbjhguig************");
    console.log('Select Contractor  !!!, consumerApplicationNo:- ', consumerApplicationNo);
    this.modalTitle = 'Select Contractor';
    this.btnTitle = 'Select Contractor';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationNo: consumerApplicationNo, consumerApplicationId: consumerApplicationId };
    const dialogRef = this.dialog.open(ContractorSelectComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }



  onRequestForChangeContractor(row: any) {

    this.modalTitle = 'Select Contractor';
    this.btnTitle = 'Select Contractor';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(ChangeContractorComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onSspTransfer(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = '50vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(TransferApplicationToSspPortalForIvrsSubmissionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });



    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = '60vw';
    // dialogConfig.height = '50vh';
    // dialogConfig.data = { row: row };
    // const dialogRef = this.dialog.open(PopupForConfirmationForNgbDataPushComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(result => {
    // });
  }

  onDuplicateRefundRequestNewByGm(row: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { consumerApplicationId: this.consumerApplicationId, row: row };
    const dialogRef = this.dialog.open(DuplicateRefundConfirmationByGmComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.refreshUserList();
      // location.reload();
    });
  }


  onDuplicateRefundRequestNewByDgm(row: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { consumerApplicationId: this.consumerApplicationId, row: row };
    const dialogRef = this.dialog.open(DuplicateRefundConfirmationByDgmComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.refreshUserList();
      // location.reload();
    });
  }


  onRevertAtSspPortal(nscApplicationNo: any) {

    let url: any;
    if (this.url.initialBasUrl == 'https://rooftop-uat.mpcz.in:8888') {
      window.open("https://survey.mpcz.in:8080/ssp-web/fill_connection_details/" + nscApplicationNo, "_blank", "popup=no")
    } else if (this.url.initialBasUrl == 'https://dsp.mpcz.in:8888') {
      window.open("https://saralsanyojan.mpcz.in:8888/fill_connection_details/" + nscApplicationNo, "_blank", "popup=no")
    } else {

    }





  }

}




































