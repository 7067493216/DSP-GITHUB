import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { ConsumerApplicationService } from '../../../services/consumer-application.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { FileDownloadComponent } from '../file-download/file-download.component';
import { TestingReportSubmitComponent } from '../testing-report-submit/testing-report-submit.component';
import { MaterialConfirmationByNisthalabTaComponent } from '../material-confirmation-by-nisthalab-ta/material-confirmation-by-nisthalab-ta.component';
import { ReversedGatePassComponent } from '../reversed-gate-pass/reversed-gate-pass.component';

@Component({
  selector: 'app-resample-list',
  templateUrl: './resample-list.component.html',
  styleUrls: ['./resample-list.component.css']
})
export class ResampleListComponent implements OnInit {

  displayedColumns: string[] = [
    'CIRCLE',
    'DIVISION',
    'DC_NAME',
    'consumerApplicationNumber',
    // 'parantApplicationNo',
    // 'childApplicationNo',
    // 'transformerSerialNo',
    'vendorName',
    'vendorMaterialSpecification',
    'materialSpecification',
    'transformerSerialNo',
    'month_year_of_item_manufacture',
    'materialAcceptance',
    'files',
    'submitTestingReport',
    'reversesGatePass',
    'testingResult'

  ];
  dataSource = new MatTableDataSource<any>([
    { id: 1, name: 'Sam', email: 'abc@gmail.com' },
    { id: 2, name: 'John', email: 'john@example.com' },
    { id: 3, name: 'Amit', email: 'amit@example.com' },
    { id: 4, name: 'Sara', email: 'sara@example.com' },
    { id: 5, name: 'Ravi', email: 'ravi@example.com' },
    { id: 6, name: 'Priya', email: 'priya@example.com' }
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  applicationDocumentData: any


  constructor(
    private notificationService: NotificationService,
    private consumerApplicationService: ConsumerApplicationService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getResampledData()
  }

  onFilesDownload(row: any) {

    this.getApplicationDocumentData(row.applicationId, row);



  }


  onCreateTestingReport(e: any) {

    if (e.taAcceptDtrOrNotDate == null || e.taAcceptDtrOrNotDate == 'no') {
      this.notificationService.warn("Material not recieve at Nistha Lab !");
      return
    } else {
      console.log(e, "e................");
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60vw";
      dialogConfig.height = '80vh';
      dialogConfig.data = { row: e };
      const dialogRef = this.dialog.open(TestingReportSubmitComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        // location.reload();
      });
    }
  }

  getResampledData() {
    this.consumerApplicationService.getSampleDataForReSamplingTable(1).subscribe((resp: any) => {
      if (resp?.code == '200') {
        this.dataSource = new MatTableDataSource(resp?.list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  getApplicationDocumentData(consumerApplicationId: any, row: any) {
    this.consumerApplicationService.getApplicationDocumentData(consumerApplicationId).subscribe((applicationDocumentData: any) => {
      console.log('applicationDocumentData', applicationDocumentData);
      if (applicationDocumentData['code'] == "200") {

        if (applicationDocumentData['list'][0]?.trffile == null) {
          this.notificationService.warn("TRF FILE has not submitted, Please Upload TRF FILE first !");
          return
        } else {
          this.applicationDocumentData = applicationDocumentData['list'][0];
          console.log('applicationDocumentData:>-  !!!', applicationDocumentData);
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.width = "60vw";
          dialogConfig.height = '50vh';
          dialogConfig.data = { row: row };
          const dialogRef = this.dialog.open(FileDownloadComponent, dialogConfig);
          dialogRef.afterClosed().subscribe(result => {
            // location.reload();
          });
        }

      } else {
        this.applicationDocumentData = null;
      }
    })
  }



  onMaterialAcceptance(e: any) {
    console.log(e, "eeeeeeeeeeeeeeeeeeeee..............");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80vw";
    dialogConfig.height = '50vh';
    dialogConfig.data = { row: e };
    const dialogRef = this.dialog.open(MaterialConfirmationByNisthalabTaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // location.reload();
    });

  }


  onGenerateReverseGatePass(e:any){
     console.log(e, "eeeeeeeeeeeeeeeeeeeee..............");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80vw";
    dialogConfig.height = '50vh';
    dialogConfig.data = { row: e };
    const dialogRef = this.dialog.open(ReversedGatePassComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // location.reload();
    });
  }

}
