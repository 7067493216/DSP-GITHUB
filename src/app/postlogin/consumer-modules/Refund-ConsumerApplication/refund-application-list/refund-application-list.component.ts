import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewApplicationService } from '../../services/new-application.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RefundOfApplicationCancellationModel } from '../../models/refundOfApplicationCancellationModel';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { HttpClient } from '@angular/common/http';
import { RefundRequestGenerateComponent } from '../refund-request-generate/refund-request-generate.component';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { ReturnMaterialDetailsComponent } from '../return-material-details/return-material-details.component';

@Component({
  selector: 'app-refund-application-list',
  templateUrl: './refund-application-list.component.html',
  styleUrls: ['./refund-application-list.component.css']
})
export class RefundApplicationListComponent implements OnInit {
  token: any;
  consumerDetails: any;
  displayedColumns: string[] = ['position', 'schemeType', 'natureOfWork', 'consumerName', 'consumerApplicationNo', 'dcName', "MobileNumber", "Address", 'stage', 'status', 'edit'];
  dataSources: MatTableDataSource<any>;
  unsubscribe$: Subject<void> = new Subject();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  RequestPaymentTypeId: any;
  listData: Array<any> = [];
  refundOfApplicationCancellationModel: RefundOfApplicationCancellationModel = new RefundOfApplicationCancellationModel();
  typeList: any;
  returnAmountPayableBoolean: boolean = false;
  returnMaterialsRowList: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private newApplicationService: NewApplicationService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    public role: RoleConstantsService,
    private url: GenerateUrl,
    private http: HttpClient,
  ) {
    console.log("Refund Application list works..........................................................................");
    this.token = this.newApplicationService.getToken();
    this.consumerDetails = this.newApplicationService.getConsumerDetails();
    console.log(this.consumerDetails, "this.consumerDetails.................................");
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      console.log(id, "ttttttttttttttttttttttttt");
      this.RequestPaymentTypeId = id;
      if (id == 1) {
        this.typeList = "Return Material Application"
        this.getAllApplicationListForRefundOfReturnMaterials();
      } else {
        this.typeList = "Cancellation Application"
        this.getAllApplicationListForConsumer();
      }
    });
  }

  checkForReturnPaymentwillbeRefundableOrNot(erpWorkFlowNumber: any) {
    this.newApplicationService.apiForReturnMaterials(erpWorkFlowNumber).subscribe((res: any) => {
      console.log(res, "resssssssssss....................");
      if (res?.code == "200") {
        if (res?.data[0].MESSAGE == "0") {
          this.returnAmountPayableBoolean = true;
        } else {
          this.returnAmountPayableBoolean = false;
        }
      } else {
        this.notificationService.warn(res?.message);
        return
      }
    })

  }

  ngOnInit(): void {
    console.log("consumer Application list for refund application component works properly");

  }


  getAllApplicationListForRefundOfReturnMaterials() {
    this.newApplicationService.getAllApplicationListForRefundOfReturnMaterials(this.consumerDetails?.consumerId).subscribe((data: any) => {
      console.log(data, "data.....................rreeeetttuuurnnnmmmaattterrriiiaallalss.........................");
      if (data?.code == "200") {
        //this.listData = data?.list;
        this.listData = data?.list.filter((x: any) => {
          if (x.natureOfWorkType.natureOfWorkTypeId == 2 || x.natureOfWorkType.natureOfWorkTypeId == 5) {
            return (x.applicationStatus.applicationStatusId == 33 || x.applicationStatus.applicationStatusId == 46)
          } else if (x.natureOfWorkType.natureOfWorkTypeId != 8 && x.natureOfWorkType.natureOfWorkTypeId != 2 && x.natureOfWorkType.natureOfWorkTypeId != 5) {
            return (x.applicationStatus.applicationStatusId == 28 || x.applicationStatus.applicationStatusId == 46)
          } else {
            return null
          }
        })
      } else {
        this.notificationService.warn(data?.message);
        return
      }
      this.dataSources = new MatTableDataSource(this.listData);
      this.dataSources.paginator = this.paginator;
      this.dataSources.sort = this.sort;

    })
  }

  getAllApplicationListForConsumer() {
    this.newApplicationService.getAllApplicationListForConsumer(this.consumerDetails?.consumerId).subscribe((data: any) => {
      console.log(data, "dddaatttaaa...........aaaalllllaaapppplllliiiiccccaaatttiiioooonnnnnnnn..........................");
      if (data?.code == "200") {
        // this.listData = data?.list;
        this.listData = data?.list.filter((x: any) => {
          return (x.applicationStatus.applicationStatusId == 20 || x.applicationStatus.applicationStatusId == 21 || x.applicationStatus.applicationStatusId == 22 || x.applicationStatus.applicationStatusId == 23 || x.applicationStatus.applicationStatusId == 24 || x.applicationStatus.applicationStatusId == 27 || x.applicationStatus.applicationStatusId == 45)
        })
      } else {
        this.listData = null;
      }
      this.dataSources = new MatTableDataSource(this.listData);
      this.dataSources.paginator = this.paginator;
      this.dataSources.sort = this.sort;
    })
  }


  onRefundPaymentRequestGenerate(row: any, RequestPaymentTypeId: any, erpWorkFlowNumber: any) {
    console.log(row, "row........", RequestPaymentTypeId, ":.....RequestPaymentTypeId....", erpWorkFlowNumber, ":.....erpWorkFlowNumber.....");
    if (RequestPaymentTypeId == '1') {

      //////////////////// start //////////////////////


      this.newApplicationService.checkReturnMaterialTotalRowsBalanceAmountZeroOrNotGetApi(erpWorkFlowNumber).subscribe((res: any) => {
        console.log(res, "res.............");
        if (res?.statusCode == "200") {
          this.returnMaterialsRowList = res?.list;

          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.width = '90vw';
          dialogConfig.height = '70vh';
          dialogConfig.data = { rowList: this.returnMaterialsRowList };
          const dialogRef = this.dialog.open(ReturnMaterialDetailsComponent, dialogConfig);
          dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
            console.log(result,"mmmmmmmmmmmmmm");
            
            if (result == "done") {
              const dialogConfig = new MatDialogConfig();
              dialogConfig.disableClose = true;
              dialogConfig.autoFocus = true;
              dialogConfig.width = '90vw';
              dialogConfig.height = '90vh';
              dialogConfig.data = { row: row, RequestPaymentTypeId: RequestPaymentTypeId };
              const dialogRef = this.dialog.open(RefundRequestGenerateComponent, dialogConfig);
              dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {

              });
            }else if(result == "nothing"){
            return
            }else {
              this.notificationService.error("No Return Amount is Refundable !")
            }
          });

        } else {
          this.notificationService.warn(res?.message);
          return
        }

      })



      ////////////////////////////////end ///////////////////////

      //////////////////////////// old code start //////////////////////////////
      // this.newApplicationService.apiForReturnMaterials(erpWorkFlowNumber).subscribe((res: any) => {
      //   console.log(res, "resssssssssss....................");
      //   if (res?.statusCode == "200") {
      //     if (res?.data[0].MESSAGE == "1") {
      //       this.returnAmountPayableBoolean = true;
      //       if (this.returnAmountPayableBoolean == true) {
      //         const dialogConfig = new MatDialogConfig();
      //         dialogConfig.disableClose = true;
      //         dialogConfig.autoFocus = true;
      //         dialogConfig.width = '90vw';
      //         dialogConfig.height = '90vh';
      //         dialogConfig.data = { row: row, RequestPaymentTypeId: RequestPaymentTypeId };
      //         const dialogRef = this.dialog.open(RefundRequestGenerateComponent, dialogConfig);
      //         dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      //           // location.reload();
      //         });
      //       } else {
      //         this.notificationService.warn("No Return Amount is payable !");
      //         return
      //       }
      //     } else {
      //       this.notificationService.warn("No Return Amount is payable !")
      //       this.returnAmountPayableBoolean = false;
      //       return
      //     }
      //   } else {
      //     this.notificationService.warn(res?.message);
      //     return
      //   }
      // })

      /////////////////////////// old code end  ////////////////////////////////

    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '90vw';
      dialogConfig.height = '90vh';
      dialogConfig.data = { row: row, RequestPaymentTypeId: RequestPaymentTypeId };
      const dialogRef = this.dialog.open(RefundRequestGenerateComponent, dialogConfig);
      dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
        // location.reload();
      });
    }

  }

}
