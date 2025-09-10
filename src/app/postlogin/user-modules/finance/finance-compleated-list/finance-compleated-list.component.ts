import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { ConsumerApplicationService } from '../../services/consumer-application.service';

@Component({
  selector: 'app-finance-compleated-list',
  templateUrl: './finance-compleated-list.component.html',
  styleUrls: ['./finance-compleated-list.component.css']
})
export class FinanceCompleatedListComponent implements OnInit {

 dummyList: Array<any> = [];



  displayedColumns: string[] = ['position', 'refundType', 'refundAmount', 'consumerName', 'consumerApplicationNo', 'refundVoucherNo','requestedDate', 'status', 'edit'];
  // displayedColumns: string[] = ['position', 'schemeType', 'natureOfWork', 'consumerName', 'consumerApplicationNo', 'dcName', "MobileNumber", "Address", 'stage', 'status', 'edit'];
  dataSources: MatTableDataSource<any>;
  unsubscribe$: Subject<void> = new Subject();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  token: any;
  paramsData: any;

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private consumerApplicationService: ConsumerApplicationService
  ) {
    this.token = sessionStorage.getItem('usertoken');

    this.route.queryParamMap.subscribe(params => {
      console.log(params
        , "params....................................");
      this.paramsData = JSON.parse(params.get('data'));
      console.log(this.paramsData, "ddddaaaaaatttttttaaaaa.....................");

    });

    this.getAllRefundApplicationList();

  }

  ngOnInit(): void {
    console.log("refund application list run finally......................");


    // this.getAllRefundApplicationList();
  }

  getAllRefundApplicationList() {
    this.consumerApplicationService.getAllRefundApplicationForFinmance(this.token).subscribe((res: any) => {
      console.log(res, "resssssssssss...........................");
      if (res?.code == "200") {
        // this.dummyList = res?.list;

        let abcd: Array<any> = []
        abcd = res?.list.filter((z: any) => {
          return ( z?.financeApproval=="true" && z.active==true)

        })

        this.dummyList = abcd.filter((x: any) => {

          if (this.paramsData.SNO == 1) {
            return (x?.refundType === "Cancellation_Amount");
          } else if (this.paramsData.SNO == 2) {
            return (x?.refundType === "Return_Amount");
          } else if (this.paramsData.SNO == 3) {
            return x?.refundType === "Revise_Amount"
          } else {
            return x;
          }


        })

        this.notificationService.success(res?.message);
        this.dataSources = new MatTableDataSource(this.dummyList);
        this.dataSources.paginator = this.paginator;
        this.dataSources.sort = this.sort;

        console.log(this.dataSources, "this.dataSources......................");
      } else {
        this.notificationService.warn(res?.message);
        return;
      }

    })



  }


}
