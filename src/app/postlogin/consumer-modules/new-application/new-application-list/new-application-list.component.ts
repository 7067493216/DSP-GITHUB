import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CrudType } from 'src/app/shared-enum/crudType';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { NewApplicationService } from '../../services/new-application.service';
import { ApplicationPaymentComponent } from '../application-payment-component/application-payment.component';
import { ContractorSelectComponent } from '../contractor-select-component/contractor-select-component';
import { NewApplicationCreationComponent } from '../new-application-creation/new-application-creation.component';
import { NewApplicationDetailComponent } from '../new-application-detail/new-application-detail.component';
import { SuccessfulGenrateWorkOrderComponent } from '../successful-genrate-work-order/successful-genrate-work-order.component';
import { DownloadFeestypeReciept } from 'src/app/postlogin/user-modules/models/downloadFeestypeReciept';
import { RevisedPaymentComponent } from '../revised-payment/revised-payment.component';
import { ReciptDemandComponent } from '../recipt-demand/recipt-demand.component';
import { ConsumerNewFileUploadComponent } from '../consumer-new-file-upload/consumer-new-file-upload.component';
import { ConsumerUpdateFormComponent } from '../consumer-update-form/consumer-update-form.component';
import { ApplicantComplainComponent } from '../applicant-complain/applicant-complain.component';
import { ApplicantFeedbackComponent } from '../applicant-feedback/applicant-feedback.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsumerApplicationSearchPayload } from '../../models/consumerApplicationSearchPayloadModel';
import { NewApplicationViewPageComponent } from '../new-application-view-page/new-application-view-page.component';
import { DemandDetailsComponent } from '../demand-details/demand-details.component';
import { MkmyDemandDetailsComponent } from '../mkmy-demand-details/mkmy-demand-details.component';
import { Router } from '@angular/router';
import { ReviseDemandDetailsComponent } from '../revise-demand-details/revise-demand-details.component';
import { ConsumerUpdateForAnyNwtComponent } from '../consumer-update-for-any-nwt/consumer-update-for-any-nwt.component';
import { LoadEnhancementApplicationRejectionComponent } from '../load-enhancement-application-rejection/load-enhancement-application-rejection.component';
// import { DownloadFeestypeReciept } from 'src/app/postlogin/user-modules/models/downloadFeestypeReciept';
// import { DownloadFeestypeReciept } from 'src/app/postlogin/user-modules/models/downloadFeestypeReciept';
// import { SuccessfulGenrateWorkOrderComponent } from 'src/app/postlogin/user-modules/consumer-application/successful-genrate-work-order/successful-genrate-work-order.component';

@Component({
  selector: 'app-new-application-list',
  templateUrl: './new-application-list.component.html',
  styleUrls: ['./new-application-list.component.css']
})
export class NewApplicationListComponent implements OnInit {
  filterForm: FormGroup;
  unsubscribe$: Subject<void> = new Subject();
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['position', 'consumerApplicationNo', 'natureOfWorkType', "ApplicantName", "addressnew", 'schemeType', /*'billNo',*/ 'stage', 'status', 'edit' /*'consumerName',  'guardianName','address', 'area', */ /*'dtrCode', 'poleNo', 'aadharNo', 'panNo' */];
  //  ,
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  tableMeta: any = {};
  consumerApplicationId: number;
  consumerApplicationNO: any
  crudType: CrudType;
  modalTitle: string;
  btnTitle: string;
  PageEvent: PageEvent;
  userContextPath = this.url.userContextPath;
  consumerPaymentData;
  completeDate: string;
  downloadFeestypeReciept: DownloadFeestypeReciept = new DownloadFeestypeReciept();
  dataaaa = [];
  searchTypeKeys: string = "";
  consumerApplicationSearchPayload: ConsumerApplicationSearchPayload = new ConsumerApplicationSearchPayload();
  consumerId: any;
  searchKey: any;
  allTypeBoolean: boolean = true;
  NatureOfworkTypeList: Array<any> = [];
  dummyBoolean: boolean = true

  constructor(
    private url: GenerateUrl,
    private http: HttpClient,
    private spinnerService: SpinnerService,
    private newApplicationService: NewApplicationService,
    // public role: RoleConstantsService,
    private notification: NotificationService,
    private dialogService: DialogService,
    private titleService: Title,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private route: Router

  ) {
    this.consumerId = this.newApplicationService.getConsumerDetails().consumerId;
  }

  onNavigationClick(id: any) {
    if (id == 3) {
      this.route.navigate(["/consumer/multiple-payment-refund-request"]);
    } else {
      console.log(id, "id............................");
      this.route.navigate(["/consumer/refund-application-list"], { queryParams: { id: id } })
    }
  }



  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  buildfilterForm() {
    this.filterForm = this.fb.group({
      filterType: ["", Validators.required],
      filtervalueFirst: ["", Validators.required],
      filterValueSecond: ["", Validators.required],
      filtervaluelast: ["", Validators.required],
      filterValueFourth: ["", Validators.required],
    })
  }

  getSearchType(searchBy: any) {
    this.dummyBoolean = false;
    console.log(searchBy, "eeeeeeeeeeeeeee...........");
    this.refreshPaginateNewApplicationList(0, 10);
    this.searchTypeKeys = searchBy;
    this.filterForm.controls["filtervalueFirst"].reset();
    this.filterForm.controls["filterValueSecond"].reset();
    this.filterForm.controls["filtervaluelast"].reset();
    this.filterForm.controls["filterValueFourth"].reset();
    console.log(
      searchBy,
      "llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll"
    );
    // this.filtertypeSelected = searchBy;
    this.searchKey = searchBy;
    switch (searchBy) {
      case "ApplicantName": {
        this.allTypeBoolean = false
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

  filterByConsumerName(e: any) {
    console.log(e, "eeeeeee......searchName...");

  }


  filterApplication() {

    let filterkey: any;

    if (this.searchTypeKeys == "ApplicantName") {
      filterkey = this.filterForm.value.filtervalueFirst

      this.consumerApplicationSearchPayload.applicationNo = null;
      this.consumerApplicationSearchPayload.applicationStatusId = null;
      this.consumerApplicationSearchPayload.consumerId = this.consumerId;
      this.consumerApplicationSearchPayload.consumerName = filterkey;
      this.consumerApplicationSearchPayload.natureOfWorkId = null;
      this.consumerApplicationSearchPayload.schemeTypeId = null;

      this.newApplicationService.getApplicationListByConsumerSearch(this.consumerApplicationSearchPayload).subscribe((response: any) => {
        console.log(response, "response................");
        let y = []
        if (response?.code == "200") {
          y = response?.list.filter(x => x.active == true);
          // this.listData = new MatTableDataSource(data['list'][0]['list'].filter(x => x.active == true));
          this.notification.success("Data Retreive Successfully...");
          this.listData = new MatTableDataSource(y);
          this.listData.paginator = this.paginator;
          this.listData.sort = this.sort;
        } else {
          y = null;
          this.listData = new MatTableDataSource(y);
          console.log(this.listData);

          // this.listData.paginator = this.paginator;
          // this.listData.sort = this.sort;
          this.notification.warn(response?.message);
          return
        }
      })

    } else if (this.searchTypeKeys == "ApplicationNumber") {
      filterkey = this.filterForm.value.filterValueSecond;

      this.consumerApplicationSearchPayload.applicationNo = filterkey;
      this.consumerApplicationSearchPayload.applicationStatusId = null;
      this.consumerApplicationSearchPayload.consumerId = this.consumerId;
      this.consumerApplicationSearchPayload.consumerName = null;
      this.consumerApplicationSearchPayload.natureOfWorkId = null;
      this.consumerApplicationSearchPayload.schemeTypeId = null;

      this.newApplicationService.getApplicationListByConsumerSearch(this.consumerApplicationSearchPayload).subscribe((response: any) => {
        console.log(response, "response................");
        let y = []
        if (response?.code == "200") {
          y = response?.list.filter(x => x.active == true);
          this.notification.success("Data Retreive Successfully...");
          this.listData = new MatTableDataSource(y);
          this.listData.paginator = this.paginator;
          this.listData.sort = this.sort;
        } else {
          y = null;
          this.listData = new MatTableDataSource(y);
          this.listData.paginator = this.paginator;
          this.listData.sort = this.sort;
          this.notification.warn(response?.message);
          return
        }
      })

    } else if (this.searchTypeKeys == "ApplicationStatus") {
      filterkey = this.filterForm.value.filtervaluelast

      this.consumerApplicationSearchPayload.applicationNo = null;
      this.consumerApplicationSearchPayload.applicationStatusId = filterkey;
      this.consumerApplicationSearchPayload.consumerId = this.consumerId;
      this.consumerApplicationSearchPayload.consumerName = null;
      this.consumerApplicationSearchPayload.natureOfWorkId = null;
      this.consumerApplicationSearchPayload.schemeTypeId = null;

      this.newApplicationService.getApplicationListByConsumerSearch(this.consumerApplicationSearchPayload).subscribe((response: any) => {
        console.log(response, "response................");
        let y = []
        if (response?.code == "200") {
          y = response?.list.filter(x => x.active == true);
          this.notification.success("Data Retreive Successfully...");
          this.listData = new MatTableDataSource(y);
          this.listData.paginator = this.paginator;
          this.listData.sort = this.sort;
        } else {
          y = null;
          this.listData = new MatTableDataSource(y);
          this.listData.paginator = this.paginator;
          this.listData.sort = this.sort;
          this.notification.warn(response?.message);
          return
        }
      })

    } else if (this.searchTypeKeys == "NatureOfWork") {
      filterkey = this.filterForm.value.filterValueFourth

      this.consumerApplicationSearchPayload.applicationNo = null;
      this.consumerApplicationSearchPayload.applicationStatusId = null;
      this.consumerApplicationSearchPayload.consumerId = this.consumerId;
      this.consumerApplicationSearchPayload.consumerName = null;
      this.consumerApplicationSearchPayload.natureOfWorkId = filterkey;
      this.consumerApplicationSearchPayload.schemeTypeId = null;

      this.newApplicationService.getApplicationListByConsumerSearch(this.consumerApplicationSearchPayload).subscribe((response: any) => {
        console.log(response, "response................");
        let y = []
        if (response?.code == "200") {
          y = response?.list.filter(x => x.active == true);
          this.notification.success("Data Retreive Successfully...");
          this.listData = new MatTableDataSource(y);
          this.listData.paginator = this.paginator;
          this.listData.sort = this.sort;
        } else {
          y = null;
          this.listData = new MatTableDataSource(y);
          this.listData.paginator = this.paginator;
          this.listData.sort = this.sort;
          this.notification.warn(response?.message);
          return
        }
      })

    } else if (this.searchTypeKeys == "allType") {
      this.notification.success("Data Retreive Successfully...");
      this.refreshPaginateNewApplicationList(0, 10);
      this.listData = new MatTableDataSource(this.listData?.filteredData);
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;

    } else {
      return
    }

  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  ngOnInit(): void {

    let erpEstimateCalculations = this.http.get(this.userContextPath + '/change-status/get').toPromise();
    console.log(erpEstimateCalculations, "gggggggggggggggggggg");

    if (erpEstimateCalculations['code'] == "200") {
      console.log("kgjhjh");
    }


    console.log("Call on ngOnInit !!!");

    this.titleService.setTitle('Consumer Application Details');
    this.refreshPaginateNewApplicationList(0, 10);

    const today = new Date();

    const day: any = today.getDate();
    let month: any = today.getMonth() + 1;
    const year: any = today.getFullYear();

    console.log(day, month, year, "full date ");

    if (month < 10) {
      month = '0' + month;
    } else {
      month = month;
    }
    // this.completeDate =year+"-"+month+"-"+day;

    this.completeDate = day + "-" + month + "-" + year;

    console.log(this.completeDate, "complete Date");
    this.buildfilterForm()
  }

  onComplain(consumerApplicationNo: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { consumerApplicationNo: consumerApplicationNo };
    const dialogRef = this.dialog.open(ApplicantComplainComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      this.refreshPaginateNewApplicationList(0, 10);
    });
  }

  onFeedback(consumerApplicationNo: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { consumerApplicationNo: consumerApplicationNo };
    const dialogRef = this.dialog.open(ApplicantFeedbackComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      this.refreshPaginateNewApplicationList(0, 10);
    });
  }

  onCreate() {

    console.log("Call on onCreate !!!");

    this.crudType = CrudType.create;
    this.modalTitle = 'नया आवेदन भरे';
    this.btnTitle = 'Submit';
    this.openDialog();
  }

  openDialog() {

    console.log("Call on openDialog !!!");

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
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
    this.listData = new MatTableDataSource();
    let param = '';

    param = 'page=' + page + '&' + 'size=' + size;

    this.newApplicationService.getAllNewApplicationPaginate(param).pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        console.log(data, ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");

        if (data['code'] == '200') {
          if (data['list'] != null) {

            this.listData = new MatTableDataSource(data['list'][0]['list'].filter(x => x.active == true));
            this.tableMeta = data['list'][0]['meta'];
            this.listData.sort = this.sort;
            console.log('   this.listData.sort', this.listData);
          }
          // page refresh code start
          setTimeout(() => {
            location.reload();
          }, 1500000);
          // page refresh code end

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
    this.refreshPaginateNewApplicationList(page, size);
  }

  onView(row: any, consumerApplicationId: any) {

    console.log('onView call !!!, consumerApplicationId :- ', consumerApplicationId);

    this.crudType = CrudType.view;
    this.modalTitle = 'आवेदन से संबंधित जानकारी';
    this.btnTitle = 'Update';
    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, row: row };
    const dialogRef = this.dialog.open(NewApplicationDetailComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onNewView(row: any, consumerApplicationId: any) {

    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90VW';
    dialogConfig.height = '90VH';
    dialogConfig.data = { consumerApplicationId: this.consumerApplicationId, row: row };
    const dialogRef = this.dialog.open(NewApplicationViewPageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
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
    const dialogRef = this.dialog.open(DemandDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.refreshPaginateNewApplicationList(0, 10);

    });
  }

  applicationReviseDemandGenerate(row: any) {


    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(ReviseDemandDetailsComponent, dialogConfig);
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



  onRegistrationFeePaymentProceed(consumerApplicationNo, paymentTypeId, row) {

    console.log('onView call !!!, consumerApplicationNo:- ', consumerApplicationNo);
    console.log('onView call !!!, paymentTypeId:- ', paymentTypeId);
    this.modalTitle = 'Registration Fee Payment Details';
    this.btnTitle = 'Pay Registration Fees';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationNo: consumerApplicationNo, paymentTypeId: paymentTypeId, row: row };
    const dialogRef = this.dialog.open(ApplicationPaymentComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onReviseFeePaymentProceed(row: any) {
    this.modalTitle = 'Revise Fee Payment Details';
    this.btnTitle = 'Pay Revise Fees Now ';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(RevisedPaymentComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }





  OnDemandRecipt(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(ReciptDemandComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onNscApplicatonUpdate(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(ConsumerUpdateFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.refreshPaginateNewApplicationList(0, 10);
    });
  }

  OnUpdateConsumerApplicationForm(consumerApplicationId: any, row: any) {
    console.log('onEdit call !!!, consumerApplicationId :- ', consumerApplicationId);


    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };

    const dialogRef = this.dialog.open(ConsumerUpdateForAnyNwtComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.refreshPaginateNewApplicationList(0, 10);
    });
  }

  ConsumerFileReUpload(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(ConsumerNewFileUploadComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onDemandFeePaymentProceed(consumerApplicationNo, paymentTypeId, natureOfWorkTypeId, applicationStatusId, row) {

    console.log('onDemandFeePaymentProceed call !!!, consumerApplicationNo:- ', consumerApplicationNo);
    console.log('onView call !!!, paymentTypeId:- ', paymentTypeId);
    this.modalTitle = 'Demand Fee Payment Details';
    this.btnTitle = 'Pay Demand Fees Now ';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = '90vh';

    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationNo: consumerApplicationNo, paymentTypeId: paymentTypeId, natureOfWorkTypeId: natureOfWorkTypeId, applicationStatusId: applicationStatusId, row: row };
    const dialogRef = this.dialog.open(ApplicationPaymentComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onEdit(consumerApplicationId: any, row: any) {

    console.log('onEdit call !!!, consumerApplicationId :- ', consumerApplicationId);

    this.crudType = CrudType.update;
    this.modalTitle = 'आवेदन परिवर्तित करे';
    this.btnTitle = 'Update';
    this.consumerApplicationId = consumerApplicationId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, row: row };
    const dialogRef = this.dialog.open(NewApplicationCreationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
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


  workOrdergGenreateSuccessfull(consumerApplicationNo: any, consumerApplicationId: any, row: any) {

    console.log('consumerApplicationId', consumerApplicationNo);

    this.modalTitle = 'Work Order generate successfull';
    this.btnTitle = 'work Order generate successfull';
    this.consumerApplicationId = consumerApplicationId;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.consumerApplicationId, consumerApplicationNO: this.consumerApplicationNO, row: row };
    const dialogRef = this.dialog.open(SuccessfulGenrateWorkOrderComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      this.refreshPaginateNewApplicationList(0, 10);
    });

  }


  onApplicationRejection(row: any) {
    console.log(row, "row...................................................");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60VW';
    dialogConfig.height = '60VH';
    dialogConfig.data = { row: row };
    const dialogRef = this.dialog.open(LoadEnhancementApplicationRejectionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });

  }


  downloadRegistrationReciept(consumerApplicationNo: any, id: any) {
    console.log(consumerApplicationNo, "rrrrrrrrrrrrrrrrrrrrrrrrrrr4444444444444444444444444");
    this.downloadFeestypeReciept.consumerApplicationNumber = consumerApplicationNo;
    this.downloadFeestypeReciept.slipGenretatedId = JSON.stringify(id);
    window.open(this.url.consumerContextPath + '/bill-desk/fees_genreted_recipt/' + this.downloadFeestypeReciept.consumerApplicationNumber + '/' + this.downloadFeestypeReciept.slipGenretatedId);
    console.log(consumerApplicationNo, "consumerApplicationNo1111111111111111111111111111111111", this.url.consumerContextPath + '/bill-desk/fees_genreted_recipt/' + this.downloadFeestypeReciept.consumerApplicationNumber + '/' + this.downloadFeestypeReciept.slipGenretatedId);

  }

  downloadDemandReciept(consumerApplicationNo: any, id: any) {

    console.log(consumerApplicationNo, "consumerApplicationNo22222222222222222222");
    this.downloadFeestypeReciept.consumerApplicationNumber = consumerApplicationNo;
    this.downloadFeestypeReciept.slipGenretatedId = JSON.stringify(id);
    window.open(this.url.consumerContextPath + '/bill-desk/fees_genreted_recipt/' + this.downloadFeestypeReciept.consumerApplicationNumber + '/' + this.downloadFeestypeReciept.slipGenretatedId);
    console.log(consumerApplicationNo, "consumerApplicationNo1111111111111111111111111111111111");

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
