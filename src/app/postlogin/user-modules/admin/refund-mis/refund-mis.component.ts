import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ManageUserService } from '../services/manage-user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RefundApplicationDocumentsComponent } from '../refund-application-documents/refund-application-documents.component';
import { DialogService } from 'src/app/shared-services/dialog.service';

@Component({
  selector: 'app-refund-mis',
  templateUrl: './refund-mis.component.html',
  styleUrls: ['./refund-mis.component.css']
})
export class RefundMisComponent implements OnInit {
  displayedColumns: string[] = [
    'accountHolder', 'bank', 'ifsc', 'accountNo', 'pan', 'addressProof',
    'refundAmount', 'refundType', 'voucherNo', 'consumerAppNo',
    'dcName', 'subDivision', 'division', 'circle', 'region', 'discom'
  ];
  dataList: Array<any> = [];
  dataSource: any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private manageUserService: ManageUserService,
     private dialogService: DialogService,
        private dialog: MatDialog,
  ) { }

  getAllData() {
    this.manageUserService.getMisRefund().subscribe((resp: any) => {
      console.log(resp, "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr..............");
      if (resp?.code == "200") {
        this.dataList = resp?.list;
        this.dataSource = new MatTableDataSource(this.dataList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  ngOnInit(): void {
    this.getAllData();
  }

  onDetails(row:any){
    // RefundApplicationDocumentsComponent

     const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '90vw';
        dialogConfig.height = "90vh"
        dialogConfig.data = { row:row};
        const dialogRef = this.dialog.open(RefundApplicationDocumentsComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          // this.refreshPaginateNewApplicationList(0, 10);
        });
  }

}
