import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';
import { NewApplicationCreationComponent } from 'src/app/postlogin/consumer-modules/new-application/new-application-creation/new-application-creation.component';
import { CrudType } from 'src/app/shared-enum/crudType';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { ApplicationDcAcceptance } from '../application-dc-acceptance/application-dc-acceptance.componenet';
import { ApplicationDemandApprove } from '../application-demand-approve/application-demand-approve.componenet';
import { ApplicationPreviousStageComponent } from '../application-previous-stage/application-previous-stage.component';
import { ConsumerApplicationDemandComponent } from '../consumer-application-demand/consumer-application-demand.componenet';
import { ConsumerApplicationDetailComponent } from '../consumer-application-detail/consumer-application-detail.component';
import { ConsumerApplicationSurveyComponent } from '../consumer-application-survey/consumer-application-survey.componenet';
import { WorkCompletionComponent } from '../work-completion/work-completion.component';
import { WorkOrderComponent } from '../work-order/work-order.component';
import { SuccessfulGenrateWorkOrderComponent } from '../successful-genrate-work-order/successful-genrate-work-order.component';
import { SuccessfulGenrateWorkCompletionComponent } from '../successful-genrate-work-completion/successful-genrate-work-completion.component';
import { UserSelectDtrPtrAndOtherComponent } from '../user-select-dtr-ptr-and-other/user-select-dtr-ptr-and-other.component';
import { HttpClient } from '@angular/common/http';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserLoginService } from '../../services/user-login.service';
import { MisReportComponent } from '../mis-report/mis-report.component';
import { ApplicationRejectionProposalComponent } from '../application-rejection-proposal/application-rejection-proposal.component';
import { ApplicationRejectionHandoverToGMComponent } from '../application-rejection-handover-to-gm/application-rejection-handover-to-gm.component';
import { ConsumerFileDownloadComponent } from '../consumer-file-download/consumer-file-download.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MkmyDemandDetailsComponent } from '../mkmy-demand-details/mkmy-demand-details.component';
import { ContractorSelectComponent } from '../contractor-select/contractor-select.component';
import { ConsumerApplicationViewPageComponent } from '../consumer-application-view-page/consumer-application-view-page.component';
import { RevisePaymentGenerateComponent } from '../revise-payment-generate/revise-payment-generate.component';
import { StcRemarkComponent } from '../stc-remark/stc-remark.component';
import { ConnectionPradaaiComponent } from '../connection-pradaai/connection-pradaai.component';
import { ReviseDemandDetailsComponent } from '../revise-demand-details/revise-demand-details.component';
import { ReturnMaterialComponentComponent } from '../return-material-component/return-material-component.component';
import { JeSurveyBreakComponent } from '../je-survey-break/je-survey-break.component';
import { ConeectionPraddaiForNgbComponent } from '../coneection-praddai-for-ngb/coneection-praddai-for-ngb.component';
import { ConsumerComplaintComponent } from '../consumer-complaint/consumer-complaint.component';
import { PaymentRefundRequestByDGMComponent } from '../payment-refund-request-by-dgm/payment-refund-request-by-dgm.component';
import { PaymentRefundConfirmationFromGmComponent } from '../payment-refund-confirmation-from-gm/payment-refund-confirmation-from-gm.component';
import { ChangeContractorComponent } from '../change-contractor/change-contractor.component';





@Component({
  selector: 'consumer-application-list',
  templateUrl: './consumer-application-list.component.html',
  styleUrls: ['./consumer-application-list.component.css']
})
export class ConsumerApplicationListComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  NatureOfworkTypeList: any
  listData: MatTableDataSource<any>;
  dropDownData: [] = [];
  userRolesData: any
  filtertypeSelected: any = "nothingSelected";
  filterForm: FormGroup;
  searchKey: string = "";
  displayedColumns: string[] = ['position', 'schemeType', 'natureOfWork', 'consumerName', 'consumerApplicationNo', 'dcName', "MobileNumber", "Address", "loadRequest", "erpWorkFlowNumber", 'registrationPaymentDate', 'demandPaymentDate', 'feedback', 'stage', 'status', 'edit'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  tableMeta: any = {};
  consumerApplicationId: number;
  crudType: CrudType;
  modalTitle: string;
  btnTitle: string;
  PageEvent: PageEvent;
  userContextPath = this.url.userContextPath;
  completeDate: any;
  foraccessLeveOfUser: any;
  filterValue: any;
  ApplicationStatusList: any[] = [];
  currentSize: any = 10;
  currentPage: any = 0;
  token: any;
  serchDatalistBoolean: boolean = false;
  allTypeBoolean: boolean = false;

  example = [
    { "id": 1, "role": "je" },
    { "id": 2, "role": "DGM(O&M)" },
    { "id": 3, "role": "DGM(HTM)" },
    { "id": 4, "role": "DGM(STC)" },
  ];
  roleForm: FormGroup;
  roleList = [];


  constructor(
    private newApplicationService: ConsumerApplicationService,
    // public role: RoleConstantsService,
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
    // public dialog: MatDialog

  ) {
    this.foraccessLeveOfUser = JSON.parse(sessionStorage.getItem('accessLeveOfUser'));
    console.log(this.foraccessLeveOfUser, "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    this.roleList = this.foraccessLeveOfUser.userRoles;

    this.roleForm = this.fb.group({
      roleOfuser: [""]
    })

  }

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
    this.refreshPaginateNewApplicationList(0, 10);
  }

  ngOnInit(): void {
    this.titleService.setTitle('Consumer Application Details');
    this.refreshPaginateNewApplicationList(0, 10);
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


    this.filterForm = this.fb.group({
      filterType: [this.filtertypeSelected, [Validators.required]],
      filtervalueFirst: ["", [Validators.required]],
      filterValueSecond: ["", [Validators.required]],
      filtervaluelast: ["", [Validators.required]],
      filterValueFourth: ['', Validators.required]
    });
    // all get application status
    this.getApplicationStatus();

  }

  getApplicationStatus() {
    this.consumerApplicationService.getAll_Application_Status().subscribe(
      (res) => {
        console.log(
          res.list,
          "lllllllllllllllllllllllllllllllllllllllllllllllllll"
        );

        this.ApplicationStatusList = res.list;
      },
      (error) => { }
    );
  }

  applyFilter(filterValue: string) {
    console.log(filterValue, "sssssssssssssssssssssssssssssssssssssssssssss");

    this.listData.filter = filterValue.trim().toLowerCase();
    console.log(this.listData.filter);
    if (this.listData.paginator) {
      this.listData.paginator.firstPage();
    }
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
        this.allTypeBoolean = false
        this.filterForm.controls["filtervalueFirst"]?.setValidators(Validators.required);
        this.filterForm.controls["filterValueSecond"]?.clearValidators();
        this.filterForm.controls["filtervaluelast"]?.clearValidators();
        this.filterForm.controls["filterValueFourth"]?.clearValidators()
        // console.log(this.filterForm,"this.filterForm....................");
        break;
      }
      case "ApplicationNumber": {
        this.allTypeBoolean = false
        this.filterForm.controls["filterValueSecond"]?.setValidators(Validators.required);
        this.filterForm.controls["filtervalueFirst"]?.clearValidators();
        this.filterForm.controls["filtervaluelast"]?.clearValidators();
        this.filterForm.controls["filterValueFourth"]?.clearValidators()
        // console.log(this.filterForm,"this.filterForm....................");

        break;
      }
      case "ApplicationStatus": {
        this.allTypeBoolean = false
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
        this.filterForm.controls["filterValueFourth"]?.setValidators(Validators.required);
        this.filterForm.controls["filtervaluelast"]?.clearValidators()
        this.filterForm.controls["filtervalueFirst"]?.clearValidators();
        this.filterForm.controls["filterValueSecond"]?.clearValidators();
        // console.log(this.filterForm,"this.filterForm....................");

        break;
      }
      case "allType": {
        this.allTypeBoolean = true
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

  StatusNameChangeSelection(e: any) {
    console.log(e, "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrjjjjjjjjjjjkjiiiiiiiiiiiiiiiiiiiiiiiiii");

    this.listData.filter = e.trim().toLowerCase();
    if (this.listData.paginator) {
      this.listData.paginator.firstPage();
    }

  }

  onChangesearchApplicationSatusName(e: any) {
    console.log(e, "ggggggggggggggggggggggggggggggddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");

  }

  onCreate() {

    console.log("Call on onCreate !!!");

    this.crudType = CrudType.create;
    this.modalTitle = 'Apply New Application';
    this.btnTitle = 'Submit';
    this.openDialog();
  }

  openDialog() {

    console.log("Call on openDialog !!!");

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId };
    const dialogRef = this.dialog.open(NewApplicationCreationComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      this.refreshPaginateNewApplicationList(0, 10);
    });
  }

  ngOnDestroy() {
    console.log("Call on ngOnDestroy !!!");
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  refreshPaginateNewApplicationList(page, size) {
    console.log("dfhuwfhuefeudeduuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
    this.listData = new MatTableDataSource();
    let param = '';
    param = 'page=' + page + '&' + 'size=' + size;
    this.newApplicationService.getAllNewApplicationPaginate(param).pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        console.log(data, "lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll");
        if (data['code'] == '200') {
          if (data['list'] != null) {
            //code here
            // const userRoles = this.jwtHelperService.decodeToken(sessionStorage.getItem('usertoken')).roles;
            // console.log(sessionStorage.getItem('usertoken'), "sessionStorage.getItem('usertoken').............");
            const userRoles = JSON.parse(sessionStorage.getItem("currentRoleOfUser"))?.roleCode;
            console.log(userRoles, "ooooooooooooooooooooooooooooooooooooooo");
            this.userRolesData = userRoles
            console.log(data['list'][0]['list'], "trrrriiiaaall  11111111111  for nothing");

            // if ((this.foraccessLeveOfUser.userCircle.circleId == 3 && userRoles == 'DGM_(HTM)') || (this.foraccessLeveOfUser.userCircle.circleId == 10 && userRoles == 'DGM_(HTM)')) {
            //      console.log( data['list'][0]['list'], "444444444499999999999999999999444444444444444449999999999999999449999999999999999994");
            //     let DgmHtmList = data['list'][0]['list'].filter((x: any) => {
            //       return (((x.natureOfWorkType.natureOfWorkTypeId == 1 && (x.lt == null || (x.lt != null && (x.dtr != null || x.ptr != null || x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null)))) || (x.natureOfWorkType.natureOfWorkTypeId == 6 && (x.lt == null || (x.lt != null && (x.dtr != null || x.ptr != null || x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null)))))
            //         // &&(x.lt == null || (x.lt != null && (x.dtr != null || x.ptr != null || x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null)))
            //       )

            //       // return ((x.natureOfWorkType.natureOfWorkTypeId == 1 && (x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null)) ||
            //       // (x.natureOfWorkType.natureOfWorkTypeId == 6 && (x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null)))
            //     });
            //     this.listData = new MatTableDataSource(DgmHtmList);
            //     this.tableMeta = this.listData?.['meta'];
            //     this.listData.sort = this.sort;
            // }

            if (userRoles == 'DGM_(HTM)' && (this.foraccessLeveOfUser.userCircle.circleId == 3 || this.foraccessLeveOfUser.userCircle.circleId == 10)) {
              // this.consumerApplicationService.consumerApplicationListforUserDgmHtmViewByConditionallyForDgmHtm(this.foraccessLeveOfUser.userCircle.circleId).subscribe((data: any) => {
              //   console.log(data, "444444444499999999999999999999444444444444444449999999999999999449999999999999999994");

              let DgmHtmList = data['list'][0]['list'].filter((x: any) => {

                return (
                  //case1
                  ((x.natureOfWorkType.natureOfWorkTypeId == 1 && (x.lt == null || (x.lt != null && (x.dtr != null || x.ptr != null || x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null))))
                    || (x.natureOfWorkType.natureOfWorkTypeId == 6 && (x.lt == null || (x.lt != null && (x.dtr != null || x.ptr != null || x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null)))))
                  //case2
                  || (((x.natureOfWorkType.natureOfWorkTypeId == 2 && x.voltageLevel == "HT") || (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.voltageLevel == null && x.loadRequestedId?.loadRequestedId == 2 && (JSON.parse(x.loadRequested) > 140 && x.individualOrGroup?.individualOrGroupId == 1)))
                    || ((x.natureOfWorkType.natureOfWorkTypeId == 2 && x.voltageLevel == "HT") || (x.natureOfWorkType?.natureOfWorkTypeId == 2 && x.voltageLevel == null && x.loadRequestedId?.loadRequestedId == 1 && (JSON.parse(x.loadRequested) > 112 && x.individualOrGroup?.individualOrGroupId == 1)))
                  )

                )
              });

              console.log(DgmHtmList, "mmmannnergggerr httttmmm  liiiissttt");

              this.listData = new MatTableDataSource(DgmHtmList);

              // this.listData = new MatTableDataSource(data.list);
              this.tableMeta = data['list']?.['meta'];
              this.listData.sort = this.sort;
              //   })
            }
            // *******************************

            // if (userRoles == 'DGM_(HTM)' && (this.foraccessLeveOfUser.userCircle.circleId == 3 || this.foraccessLeveOfUser.userCircle.circleId == 10)) {
            //   this.consumerApplicationService.consumerApplicationListforUserDgmHtmViewByConditionallyForDgmHtm(this.foraccessLeveOfUser.userCircle.circleId).subscribe((data: any) => {
            //     console.log(data, "444444444499999999999999999999444444444444444449999999999999999449999999999999999994");

            //     let DgmHtmList = data['list'][0]['list'].filter((x: any) => {
            //       return ((x.natureOfWorkType.natureOfWorkTypeId == 1 || x.natureOfWorkType.natureOfWorkTypeId == 6) &&
            //         (x.lt == null || (x.lt != null && (x.dtr != null || x.ptr != null || x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null))))
            //     });

            //     console.log(DgmHtmList, "mmmannnergggerr httttmmm  liiiissttt");
            //     this.listData = new MatTableDataSource(DgmHtmList);

            //     // this.listData = new MatTableDataSource(data.list);
            //     this.tableMeta = data['list']?.['meta'];
            //     this.listData.sort = this.sort;
            //   })
            // }

            // ********************************

            else if (userRoles == "Manager (HTM)" && (this.foraccessLeveOfUser.userCircle.circleId == 3 || this.foraccessLeveOfUser.userCircle.circleId == 10)) {
              let AeHtmList = data['list'][0]['list'].filter((x: any) => {
                return ((x.natureOfWorkType.natureOfWorkTypeId == 1 || x.natureOfWorkType.natureOfWorkTypeId == 6) &&
                  (x.lt == null || (x.lt != null && (x.dtr != null || x.ptr != null || x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null)))
                  || (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == 2 && JSON.parse(x.loadRequested) > 140) || (x.natureOfWorkType?.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == 1 && JSON.parse(x.loadRequested) > 112)
                )
              });

              console.log(AeHtmList, "mmmannnergggerr httttmmm  liiiissttt");

              this.listData = new MatTableDataSource(AeHtmList);
              this.tableMeta = data['list']?.['meta'];
              this.listData.sort = this.sort;
            }

            else if (userRoles == 'DGM' && (this.foraccessLeveOfUser.userCircle.circleId == 3 || this.foraccessLeveOfUser.userCircle.circleId == 10)) {
              let DgmOMList = data['list'][0]['list'].filter((x: any) => {

                //  console.log(JSON.parse(x.jeLoad), "JSON.parse(x.jeLoad)....................................................jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu.............................");

                // if (x.jeLoadUnitKwYaKva == "KVA") {
                return (
                  (
                    (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.voltageLevel == "LT") ||
                    (x.voltageLevel == null && ((x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == 2 && JSON.parse(x.loadRequested) <= 140) ||
                      (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == 2 && (JSON.parse(x.loadRequested) >= 140 && x.individualOrGroup?.individualOrGroupId == 2))
                      || (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == 1 && JSON.parse(x.loadRequested) <= 112) ||
                      (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == 1 && JSON.parse(x.loadRequested) >= 112 && x.individualOrGroup?.individualOrGroupId == 2)) ||
                      (x.voltageLevel == null && x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == null && x.loadRequested == null))
                  )

                  || x.natureOfWorkType.natureOfWorkTypeId == 3 ||
                  x.natureOfWorkType.natureOfWorkTypeId == 4 || x.natureOfWorkType.natureOfWorkTypeId == 5 || x.natureOfWorkType.natureOfWorkTypeId == 7 || x.natureOfWorkType.natureOfWorkTypeId == 8 ||
                  (x.natureOfWorkType.natureOfWorkTypeId == 1 && x.lt != null && x.dtr == null && x.ptr == null && x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null) ||
                  (x.natureOfWorkType.natureOfWorkTypeId == 6 && x.lt != null && x.dtr == null && x.ptr == null && x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null)

                )
                // } else if (x.jeLoadUnitKwYaKva == "KW") {
                //   return ((x.natureOfWorkType.natureOfWorkTypeId == 2 && JSON.parse(x.jeLoad) < 112) || x.natureOfWorkType.natureOfWorkTypeId == 3 ||
                //     x.natureOfWorkType.natureOfWorkTypeId == 4 || x.natureOfWorkType.natureOfWorkTypeId == 5 || x.natureOfWorkType.natureOfWorkTypeId == 7 || x.natureOfWorkType.natureOfWorkTypeId == 8 ||
                //     (x.natureOfWorkType.natureOfWorkTypeId == 1 && x.lt != null && x.dtr == null && x.ptr == null && x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null) ||
                //     (x.natureOfWorkType.natureOfWorkTypeId == 6 && x.lt != null && x.dtr == null && x.ptr == null && x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null))
                // } else {
                //   return ((x.natureOfWorkType.natureOfWorkTypeId == 2
                //     //  && ((x.jeLoadUnitKwYaKva=="KVA" && JSON.parse(x.jeLoad)<140) || (x.jeLoadUnitKwYaKva=="KW" && JSON.parse(x.jeLoad)<112))
                //   ) || x.natureOfWorkType.natureOfWorkTypeId == 3 ||
                //     x.natureOfWorkType.natureOfWorkTypeId == 4 || x.natureOfWorkType.natureOfWorkTypeId == 5 || x.natureOfWorkType.natureOfWorkTypeId == 7 || x.natureOfWorkType.natureOfWorkTypeId == 8 ||
                //     (x.natureOfWorkType.natureOfWorkTypeId == 1 && x.lt != null && x.dtr == null && x.ptr == null && x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null) ||
                //     (x.natureOfWorkType.natureOfWorkTypeId == 6 && x.lt != null && x.dtr == null && x.ptr == null && x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null))
                // }
              }

                // return ((x.natureOfWorkType.natureOfWorkTypeId == 2 
                // //  && ((x.jeLoadUnitKwYaKva=="KVA" && JSON.parse(x.jeLoad)<140) || (x.jeLoadUnitKwYaKva=="KW" && JSON.parse(x.jeLoad)<112))
                // ) || x.natureOfWorkType.natureOfWorkTypeId == 3 ||
                //   x.natureOfWorkType.natureOfWorkTypeId == 4 || x.natureOfWorkType.natureOfWorkTypeId == 5 || x.natureOfWorkType.natureOfWorkTypeId == 7 || x.natureOfWorkType.natureOfWorkTypeId == 8 ||
                //   (x.natureOfWorkType.natureOfWorkTypeId == 1 && x.lt != null && x.dtr == null && x.ptr == null && x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null) ||
                //   (x.natureOfWorkType.natureOfWorkTypeId == 6 && x.lt != null && x.dtr == null && x.ptr == null && x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null))
                // }
              );
              this.listData = new MatTableDataSource(DgmOMList);
              this.tableMeta = data['list']?.['meta'];
              this.listData.sort = this.sort;
            }

            else if (userRoles == 'Manager_(HTM)') {
              let aeHtmList = data['list'][0]['list'].filter((x: any) => {
                return ((x.natureOfWorkType.natureOfWorkTypeId == 1 && (x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null)) ||
                  (x.natureOfWorkType.natureOfWorkTypeId == 6 && (x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null)))
              });
              this.listData = new MatTableDataSource(aeHtmList);
              this.tableMeta = data['list']?.['meta'];
              this.listData.sort = this.sort;
            }

            else if (userRoles == 'JE_IT' && (this.foraccessLeveOfUser.userCircle.circleId == 3 || this.foraccessLeveOfUser.userCircle.circleId == 10)) {
              let jeList = data['list'][0]['list'].filter((x: any) => {
                return (x.natureOfWorkType.natureOfWorkTypeId == 2 || x.natureOfWorkType.natureOfWorkTypeId == 3 ||
                  x.natureOfWorkType.natureOfWorkTypeId == 4 || x.natureOfWorkType.natureOfWorkTypeId == 5 || x.natureOfWorkType.natureOfWorkTypeId == 7 || x.natureOfWorkType.natureOfWorkTypeId == 8 ||
                  (x.natureOfWorkType.natureOfWorkTypeId == 1 && (x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null)) ||
                  (x.natureOfWorkType.natureOfWorkTypeId == 6 && (x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null)))
              })

              this.listData = new MatTableDataSource(jeList);
              this.tableMeta = data['list']?.['meta'];
              this.listData.sort = this.sort;

              console.log(this.listData, "this.listData.......................");

            }
            // else if(userRoles == 'JE_IT'  && (this.foraccessLeveOfUser.userCircle.circleId != 3 || this.foraccessLeveOfUser.userCircle.circleId != 10)){
            //   this.listData = new MatTableDataSource(data['list'][0]['list']);
            //   this.tableMeta = data['list']?.['meta'];
            //   this.listData.sort = this.sort;
            // }

            else {
              this.listData = new MatTableDataSource(data['list'][0]['list']);
              console.log(this.listData, "this.listData");

              this.tableMeta = data['list'][0]?.['meta'];
              this.listData.sort = this.sort;
            }
            // this.dropDownData = data['list'][0]['list']
          }
        } else {
          this.tableMeta = null;
          this.notification.warn(data['message']);
        }
      },
        error => {
          this.tableMeta = { currentPage: 0, totalItems: 0, totalPages: 0 }
        });
  }
  oldSize = 0;
  onPaginateChange(event: PageEvent) {
    console.log(event, "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");

    const size = event.pageSize;
    var page = event.pageIndex;
    if (this.oldSize == 0) {
      this.oldSize = event.pageSize;
    }
    if (this.oldSize != size) {
      this.paginator.pageIndex = 0;
      page = 0;
      this.oldSize = 0;
    }
    if (this.serchDatalistBoolean == true) {
      this.filter(page, size)
    } else {
      this.refreshPaginateNewApplicationList(page, size);
    }

  }

  filter(page: any, size: any) {
    if (this.allTypeBoolean == true) {
      console.log(this.filterForm, "this.filterForm....");
      this.refreshPaginateNewApplicationList(page, size);

      return;

    } else {
      this.serchDatalistBoolean = true
      let param = '';
      param = 'page=' + page + '&' + 'size=' + size;
      console.log("here1-----------------------------");

      // const size = 10;
      // const page = 0;
      let filtertype = this.filterForm.value.filterType;
      if (filtertype == "Applicant Name") {
        this.filterValue = this.filterForm.value.filtervalueFirst;
      } else if (filtertype == "ApplicationNumber") {
        this.filterValue = this.filterForm.value.filterValueSecond;
      } else if (filtertype == "ApplicationStatus") {
        this.filterValue = this.filterForm.value.filtervaluelast;
      }
      else if (filtertype == "NatureOfWork") {
        this.filterValue = this.filterForm.value.filterValueFourth;
      }

      this.consumerApplicationService
        .getAllNewPaginate_Search(
          page,
          size,
          filtertype,
          this.filterValue,
          this.token
        )
        .subscribe(
          (data) => {
            if (data["code"] == "200" && data["list"][0]["list"].length == 0) {
              this.tableMeta = null;
              this.notification.warn('Nooo Record Found');
              return;
            }
            else if (data["code"] == "200") {
              if (data["list"] != null) {
                console.log("here 2 -----------------------------");

                // const userRoles = this.jwtHelperService.decodeToken(
                //   sessionStorage.getItem("usertoken")
                // ).roles;
                const userRoles = JSON.parse(sessionStorage.getItem("currentRoleOfUser")).roleCode;
                console.log(userRoles, "ooooooooooooooooooooooooooooooooooooooo");
                this.userRolesData = userRoles
                console.log(data['list'][0]['list'], "trrrriiiaaall  11111111111  for nothing");


                console.log(
                  data["list"][0]["list"],
                  "trrrriiiaaall  11111111111  for nothing"
                );

                if (userRoles == 'DGM_(HTM)' && (this.foraccessLeveOfUser.userCircle.circleId == 3 || this.foraccessLeveOfUser.userCircle.circleId == 10)) {

                  let DgmHtmList = data['list'][0]['list'].filter((x: any) => {
                    return (
                      // ((x.natureOfWorkType.natureOfWorkTypeId == 1 || x.natureOfWorkType.natureOfWorkTypeId == 6) && (x.lt == null || (x.lt != null && (x.dtr != null || x.ptr != null || x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null))))
                      // || (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == 2 && JSON.parse(x.loadRequested) > 140) || (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == 1 && JSON.parse(x.loadRequested) > 112) || (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == null && x.loadRequested == null)


                      ((x.natureOfWorkType.natureOfWorkTypeId == 1 || x.natureOfWorkType.natureOfWorkTypeId == 6) && (x.lt == null ||
                        (x.lt != null && (x.dtr != null || x.ptr != null || x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null))))
                      //case2
                      || (((x.natureOfWorkType.natureOfWorkTypeId == 2 && x.voltageLevel == "HT") || (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.voltageLevel == null && x.loadRequestedId?.loadRequestedId == 2 && (JSON.parse(x.loadRequested) > 140 && x.individualOrGroup?.individualOrGroupId == 1)))
                        || ((x.natureOfWorkType.natureOfWorkTypeId == 2 && x.voltageLevel == "HT") || (x.natureOfWorkType?.natureOfWorkTypeId == 2 && x.voltageLevel == null && x.loadRequestedId?.loadRequestedId == 1 && (JSON.parse(x.loadRequested) > 112 && x.individualOrGroup?.individualOrGroupId == 1)))
                      )

                    )
                  });
                  console.log(DgmHtmList, "mmmannnergggerr httttmmm  liiiissttt");
                  this.listData = new MatTableDataSource(DgmHtmList);
                  this.tableMeta = data['list']?.['meta'];
                  this.listData.sort = this.sort;
                }

                else if (userRoles == 'DGM' && (this.foraccessLeveOfUser.userCircle.circleId == 3 || this.foraccessLeveOfUser.userCircle.circleId == 10)) {
                  let DgmOMList = data['list'][0]['list'].filter((x: any) => {
                    return (

                      // ((x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == 2 && JSON.parse(x.loadRequested) <= 140) || (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == 1 && JSON.parse(x.loadRequested) <= 112)) || (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == null && x.loadRequested == null) || x.natureOfWorkType.natureOfWorkTypeId == 3 ||
                      // x.natureOfWorkType.natureOfWorkTypeId == 4 || x.natureOfWorkType.natureOfWorkTypeId == 5 || x.natureOfWorkType.natureOfWorkTypeId == 7 || x.natureOfWorkType.natureOfWorkTypeId == 8 ||
                      // (x.natureOfWorkType.natureOfWorkTypeId == 1 && x.lt != null && x.dtr == null && x.ptr == null && x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null) ||
                      // (x.natureOfWorkType.natureOfWorkTypeId == 6 && x.lt != null && x.dtr == null && x.ptr == null && x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null)

                      (
                        (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.voltageLevel == "LT") ||
                        (x.voltageLevel == null && ((x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == 2 && JSON.parse(x.loadRequested) <= 140) ||
                          (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == 2 && (JSON.parse(x.loadRequested) >= 140 && x.individualOrGroup?.individualOrGroupId == 2))
                          || (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == 1 && JSON.parse(x.loadRequested) <= 112) ||
                          (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == 1 && JSON.parse(x.loadRequested) >= 112 && x.individualOrGroup?.individualOrGroupId == 2)) ||
                          (x.voltageLevel == null && x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == null && x.loadRequested == null))
                      )

                      || x.natureOfWorkType.natureOfWorkTypeId == 3 ||
                      x.natureOfWorkType.natureOfWorkTypeId == 4 || x.natureOfWorkType.natureOfWorkTypeId == 5 || x.natureOfWorkType.natureOfWorkTypeId == 7 || x.natureOfWorkType.natureOfWorkTypeId == 8 ||
                      (x.natureOfWorkType.natureOfWorkTypeId == 1 && x.lt != null && x.dtr == null && x.ptr == null && x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null) ||
                      (x.natureOfWorkType.natureOfWorkTypeId == 6 && x.lt != null && x.dtr == null && x.ptr == null && x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null)

                    )
                  }
                  );
                  this.listData = new MatTableDataSource(DgmOMList);
                  this.tableMeta = data['list']?.['meta'];
                  this.listData.sort = this.sort;
                }
                else if (userRoles == 'DGM' && (this.foraccessLeveOfUser.userCircle.circleId != 3 || this.foraccessLeveOfUser.userCircle.circleId != 10)) {
                  this.listData = new MatTableDataSource(data['list'][0]['list']);
                  this.tableMeta = data['list']?.['meta'];
                  this.listData.sort = this.sort;
                }

                else if (userRoles == 'Manager_(HTM)') {
                  let aeHtmList = data['list'][0]['list'].filter((x: any) => {
                    // return ((x.natureOfWorkType.natureOfWorkTypeId == 1 && (x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null)) ||
                    //   (x.natureOfWorkType.natureOfWorkTypeId == 6 && (x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null)))

                    return (((x.natureOfWorkType.natureOfWorkTypeId == 1 || x.natureOfWorkType.natureOfWorkTypeId == 6) && (x.lt == null || (x.lt != null && (x.dtr != null || x.ptr != null || x.ht11Kv != null || x.ht33Kv != null || x.ht132Kv != null))))
                      || (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == 2 && JSON.parse(x.loadRequested) > 140) || (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == 1 && JSON.parse(x.loadRequested) > 112) || (x.natureOfWorkType.natureOfWorkTypeId == 2 && x.loadRequestedId?.loadRequestedId == null && x.loadRequested == null)
                    )
                  });
                  this.listData = new MatTableDataSource(aeHtmList);
                  this.tableMeta = data['list']?.['meta'];
                  this.listData.sort = this.sort;
                }

                else if (userRoles == 'JE_IT' && (this.foraccessLeveOfUser.userCircle.circleId == 3 || this.foraccessLeveOfUser.userCircle.circleId == 10)) {
                  console.log(data['list'][0]['list'], "zzzzoooooyyyyyyaaaaaaaaaaaa..........");

                  let jeList = data['list'][0]['list'].filter((x: any) => {
                    console.log(x, "xxxxxxxxxxxxzoyyaaaaaaa.............");

                    return (x.natureOfWorkType.natureOfWorkTypeId == 2 || x.natureOfWorkType.natureOfWorkTypeId == 3 ||
                      x.natureOfWorkType.natureOfWorkTypeId == 4 || x.natureOfWorkType.natureOfWorkTypeId == 5 || x.natureOfWorkType.natureOfWorkTypeId == 7 || x.natureOfWorkType.natureOfWorkTypeId == 8 ||
                      (x.natureOfWorkType.natureOfWorkTypeId == 1 && x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null) ||
                      (x.natureOfWorkType.natureOfWorkTypeId == 6 && x.ht11Kv == null && x.ht33Kv == null && x.ht132Kv == null))
                  })
                  console.log(jeList, "zzzzooooyyyzzzzzzzzzzzoooyyyyyyyzzzzzzzaaaaaaaa");
                  this.listData = new MatTableDataSource(jeList);
                  this.tableMeta = data['list'][0]?.['meta'];
                  this.listData.sort = this.sort;
                  console.log(this.listData, "this.listData.......................");

                }
                else if (userRoles == 'JE_IT' && (this.foraccessLeveOfUser.userCircle.circleId != 3 || this.foraccessLeveOfUser.userCircle.circleId != 10)) {
                  this.listData = new MatTableDataSource(data['list'][0]['list']);
                  this.tableMeta = data['list']?.['meta'];
                  this.listData.sort = this.sort;
                }

                else {
                  this.listData = new MatTableDataSource(data['list'][0]['list']);
                  console.log(this.listData, "this.listData");

                  this.tableMeta = data['list'][0]?.['meta'];
                  this.listData.sort = this.sort;
                }


                // this.listData = new MatTableDataSource(data["list"][0]["list"]);
                // this.tableMeta = data["list"][0]["list"]?.["meta"];
                // this.listData.sort = this.sort;
              }


            } else if (data["code"] == "100") {
              this.tableMeta = null;
              this.notification.warn(data["message"]);
            }

            else {
              this.tableMeta = null;
              this.notification.warn("No Record Found");
            }
          },
          (error) => {
            this.tableMeta = { currentPage: 0, totalItems: 0, totalPages: 0 };
          }
        );
    }

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
    this.crudType = CrudType.view;
    this.modalTitle = 'Consumer Application Details';
    this.btnTitle = 'Update';
    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = {
      crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle,
      consumerApplicationId: this.consumerApplicationId,
      row: row
    };
    const dialogRef = this.dialog.open(ConsumerApplicationDetailComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.refreshUserList();
      location.reload();
    });
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
      //  location.reload();
    });
  }

  applicationSurvey(consumerApplicationId, previousStageStatus, row: any) {


    this.crudType = CrudType.create;
    this.btnTitle = 'Submit Survey';
    if (previousStageStatus == true) {
      this.crudType = CrudType.update;
      this.btnTitle = 'Update Survey Details';
    }

    this.modalTitle = 'Consumer Application Survey';

    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, row: row };
    const dialogRef = this.dialog.open(ConsumerApplicationSurveyComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.refreshPaginateNewApplicationList(0, 10);

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
      //  this.refreshPaginateNewApplicationList(0, 10);
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
    this.crudType = CrudType.create;
    this.btnTitle = 'Submit';
    if (previousStageStatus == true) {
      this.crudType = CrudType.update;
      this.btnTitle = 'Update Demand Details';
    }

    // this.modalTitle = 'Consumer Application Demand Note';

    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { crudType: this.crudType, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, consumerApplicationNo: consumerApplicationNo, schemeTypeId: schemeTypeId, row: row };
    const dialogRef = this.dialog.open(ConsumerApplicationDemandComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      //  this.refreshPaginateNewApplicationList(0, 10);

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
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, consumerApplicationNo: consumerApplicationNo, schemeTypeId: schemeTypeId, natureOfWorkTypeId: natureOfWorkTypeId, row: row };
    const dialogRef = this.dialog.open(MkmyDemandDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      //  this.refreshPaginateNewApplicationList(0, 10);

    });
  }

  backToPreviousStage(consumerApplicationId) {
    this.crudType = CrudType.view;
    this.modalTitle = 'Application Back To Previous Stage';
    this.btnTitle = 'Submit To Previous Stage';
    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId };
    const dialogRef = this.dialog.open(ApplicationPreviousStageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.refreshPaginateNewApplicationList(0, 10);

    });
  }


  applicationDcAcceptance(consumerApplicationId, previousStageStatus, row: any) {
    this.crudType = CrudType.create;
    this.btnTitle = 'Submit ';
    if (previousStageStatus == true) {
      this.crudType = CrudType.update;
      this.btnTitle = 'Update ';
    }

    this.modalTitle = 'Applicaton DC Acceptance Survey';

    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, row: row };
    const dialogRef = this.dialog.open(ApplicationDcAcceptance, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      //  this.refreshPaginateNewApplicationList(0, 10);

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
      //   this.refreshPaginateNewApplicationList(0, 10);
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


  onRefundConfirmation(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(PaymentRefundConfirmationFromGmComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
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
      // this.refreshPaginateNewApplicationList(0, 10);
    });
  }

  connectioPradaaiForNgb(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(ConeectionPraddaiForNgbComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.refreshPaginateNewApplicationList(0, 10);
    });
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
    this.crudType = CrudType.create;
    this.btnTitle = 'Submit ';
    if (previousStageStatus == true) {
      this.crudType = CrudType.update;
      this.btnTitle = 'Update ';
    }

    this.modalTitle = 'Application Demand Approval ';

    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, row: row };
    const dialogRef = this.dialog.open(ApplicationDemandApprove, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      //  this.refreshPaginateNewApplicationList(0, 10);

    });
  }

  onEdit(consumerApplicationId) {

    console.log('Inside onEdit !!!');
    console.log('consumerApplicationId :- ', consumerApplicationId);
    this.crudType = CrudType.update;
    this.modalTitle = 'Modify Consumer Application';
    this.btnTitle = 'Update';
    this.consumerApplicationId = consumerApplicationId;
    this.openDialog();
  }

  workCompletion(consumerApplicationId: any, b: any, row: any) {


    this.modalTitle = 'work completion';
    this.btnTitle = 'work completion';
    this.consumerApplicationId = consumerApplicationId;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, row: row };
    const dialogRef = this.dialog.open(WorkCompletionComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      //  this.refreshPaginateNewApplicationList(0, 10);
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
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, row: row };
    const dialogRef = this.dialog.open(WorkOrderComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      // this.refreshPaginateNewApplicationList(0, 10);
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
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, row: row };
    const dialogRef = this.dialog.open(SuccessfulGenrateWorkOrderComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      //  this.refreshPaginateNewApplicationList(0, 10);
    });

  }

  workCompletionGenreateSuccessfull(consumerApplicationId: any, b: any) {

    this.modalTitle = 'Work Completion generate successfull';
    this.btnTitle = 'work Cmpletion generate successfull';
    this.consumerApplicationId = consumerApplicationId;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId };
    const dialogRef = this.dialog.open(SuccessfulGenrateWorkCompletionComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      // this.refreshPaginateNewApplicationList(0, 10);
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
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId };
    const dialogRef = this.dialog.open(UserSelectDtrPtrAndOtherComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      //  this.refreshPaginateNewApplicationList(0, 10);
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
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationNo: consumerApplicationNo, consumerApplicationId: consumerApplicationId };
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


}
