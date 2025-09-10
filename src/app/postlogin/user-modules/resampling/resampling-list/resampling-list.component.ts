import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FillDetailsComponent } from '../fill-details/fill-details.component';
import { GatePassComponent } from '../gate-pass/gate-pass.component';
import Swal from 'sweetalert2';
import { TrfUploadFileComponent } from '../trf-upload-file/trf-upload-file.component';
import { FileDownloadComponent } from '../../consumer-application/z-ResamplingDiscomModule/file-download/file-download.component';
import { FillDetailsNewComponent } from '../fill-details-new/fill-details-new.component';
import { DtrDetailsComponent } from '../dtr-details/dtr-details.component';


@Component({
  selector: 'app-resampling-list',
  templateUrl: './resampling-list.component.html',
  styleUrls: ['./resampling-list.component.css']
})
export class ResamplingListComponent implements OnInit {
  dataList: Array<any> = []

  displayedColumns: string[] = [
    'sNo',
    'CIRCLE',
    'DIVISION',
    'DC_NAME',
    'CONSUMER_APPLICATION_NUMBER',
    'CONSUMER_NAME',
    'address',
    'NATURE_OF_WORK_NAME',
    'CONTRACTOR_NAME',
    'WORK_ORDER_DATE',
    // 'VENDOR_NAME',
    // 'SPECIFICATION',
    // 'TRANSFORMER_SERIAL_NO',
    // 'VENDOR_MATERIAL_SPECIFICATION',
    'Details',
    'suffle',
    // 'gatePass'

  ];

  displayedColumns2: string[] = [
    'sNo',
    'CIRCLE',
    'DIVISION',
    'DC_NAME',
    'consumerApplicationNumber',
    // 'childApplicationNo',
    // 'parantApplicationNo',

    'vendorName',
    'vendorMaterialSpecification',
    'transformerSerialNo',
    'month_year_of_item_manufacture',
    'materialInstallationDate',
    'CONTRACTOR_NAME',
    'participateForTestingAndSampling',
    // 'Details',
    // 'shuffle'
  ];

  displayedColumns3: string[] = [
    'sNo',
    'CIRCLE',
    'DIVISION',
    'DC_NAME',
    'consumerApplicationNumber',
    // 'parantApplicationNo',
    // 'childApplicationNo',
    // 'transformerSerialNo',
    'vendorName',
    // 'vendorMaterialSpecification',
    'materialSpecification',
    'transformerSerialNo',
    'month_year_of_item_manufacture',
    'CONTRACTOR_NAME',
    // 'materialInstallationDate',
    // 'participateForTestingAndSampling',
    // 'testingsampleSelected',
    // 'shufflingFlag',
    // 'Details',
    // 'shuffle',
    'gatePass',
    'trfFile',
    'trfUpload',
    'files',
    'testingResult'

  ];



  dataSource1: any; // For Tab 1
  dataSource2: any; // For Tab 2
  dataSource3: any; // For Tab 3
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('paginator3') paginator3!: MatPaginator;
  @ViewChild('matSort1') sort1!: MatSort;
  @ViewChild('matSort2') sort2!: MatSort;
  @ViewChild('matSort3') sort3!: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  applicationDocumentData: any


  constructor(
    private notificationService: NotificationService,
    private consumerApplicationService: ConsumerApplicationService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.getAllData();
  }


  getApplicationDocumentData(consumerApplicationId: any, row: any, no: number) {
    this.consumerApplicationService.getApplicationDocumentData(consumerApplicationId).subscribe((applicationDocumentData: any) => {
      console.log('applicationDocumentData', applicationDocumentData);
      if (applicationDocumentData['code'] == "200") {
        if (applicationDocumentData['list'][0]?.trffile == null) {
          this.notificationService.warn("TRF FILE has not submitted, Please Upload TRF FILE first !");
          return
        }
        this.applicationDocumentData = applicationDocumentData['list'][0];
        console.log('applicationDocumentData:>-  !!!', applicationDocumentData);

        if (no == 1) {
          if (this.applicationDocumentData?.getPassfile != null) {
            this.notificationService.error("Gate Pass already Generated !");
            return
          } else {
            ///////////////////////////////////////////////////////
            Swal.fire({
              title: 'Are you sure?',
              text: 'क्या आपने TRF फ़ॉर्म डाउनलोड कर लिया है? ध्यान दें, जब तक आप TRF सबमिट नहीं करेंगे तब तक गेट पास डाउनलोड नहीं कर पाएंगे।',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes'
            }).then((result) => {
              if (result.isConfirmed) {
                // Swal.fire(
                //   'Deleted!',
                //   'Your record has been deleted.',
                //   'success'
                // );

                const dialogConfig = new MatDialogConfig();
                dialogConfig.disableClose = true;
                dialogConfig.autoFocus = true;
                dialogConfig.width = "90vw";
                dialogConfig.height = '90vh';
                dialogConfig.data = { row: row };
                const dialogRef = this.dialog.open(GatePassComponent, dialogConfig);
                dialogRef.afterClosed().subscribe(result => {
                  // location.reload();
                });
              }
            });
            ///////////////////////////////////////////////////////
          }


        } else if (no == 2) {
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
        } else {

        }




      } else {

        this.applicationDocumentData = null;
        this.notificationService.error(applicationDocumentData?.message);
        return
      }
    })
  }

  getAllData() {
    this.consumerApplicationService.getReSamplingListForSingleDtrList().subscribe((resp: any) => {
      console.log(resp, "resp..............................");
      if (resp?.code == "200") {
        this.notificationService.success(resp?.message)
        this.dataList = resp?.list;
        this.dataSource1 = new MatTableDataSource(this.dataList);
        this.dataSource1.paginator = this.paginator1;
        this.dataSource1.sort = this.sort1;
      } else {
        this.notificationService.warn(resp?.message)
      }

    })
  }

  ngOnInit(): void {

  }

  getSufflingData(auticationId: any) {
    this.consumerApplicationService.getSufflingData(auticationId).subscribe((res: any) => {
      console.log(res, "rrreeeesssss........................................");

      if (res?.code == "200") {
        this.notificationService.success(res?.message);
      } else {
        this.notificationService.warn(res?.message);
        return;
      }

    })
  }



  onGenerateGatePass(row: any) {
    console.log(row, "e.....................");
    this.getApplicationDocumentData(row.applicationId, row, 1);
  }

  onTrfDownload(element: any) {
    console.log(element, "element................................");

  }


  onTRFUpload(e: any) {
    console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50vw";
    dialogConfig.height = '40vh';
    dialogConfig.data = { row: e };
    const dialogRef = this.dialog.open(TrfUploadFileComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // location.reload();
    });

  }


  dataForTab2() {
    this.consumerApplicationService.getSampleDataForReSamplingTable(2).subscribe((resp: any) => {
      if (resp?.code == '200') {
        this.dataSource2 = new MatTableDataSource(resp?.list);
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.sort2;
      } else {
        this.dataSource2 = new MatTableDataSource([]);
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.sort2;
      }
    })
  }

  dataForTab3() {
    this.consumerApplicationService.getSampleDataForReSamplingTable(1).subscribe((resp: any) => {
      if (resp?.code == '200') {
        this.dataSource3 = new MatTableDataSource(resp?.list);
        this.dataSource3.paginator = this.paginator3;
        this.dataSource3.sort = this.sort3;
      } else {
        this.dataSource3 = new MatTableDataSource([]);
        this.dataSource3.paginator = this.paginator3;
        this.dataSource3.sort = this.sort3;
      }
    })
  }

  onTabChange(event: MatTabChangeEvent) {
    console.log('Selected tab index:', event.index);
    console.log('Selected tab label:', event.tab.textLabel);
    if (event.index == 0) {
      this.dataSource1 = new MatTableDataSource(this.dataList);
      this.dataSource1.paginator = this.paginator1;
      this.dataSource1.sort = this.sort1;
    } else if (event.index == 1) {

      if (this.dataSource2 == null || this.dataSource2 == undefined) {
        this.dataForTab2();
      } else {

      }

    } else if (event.index == 2) {

      if (this.dataSource3 == null || this.dataSource3 == undefined) {
        this.dataForTab3();
      } else {

      }

    } else {

    }

  }


  onSuffle(row: any) {
    console.log(row, "rrrooowwww,...........");
    this.consumerApplicationService.getSufflingData(row?.CONTRACTOR_AUTHANTICATION_ID).subscribe((res: any) => {
      console.log(res, "res.....................................");
      if (res?.code == "200") {
        this.notificationService.success(res?.message);
        this.getAllData();
        this.dataForTab2();
        this.dataForTab3();
      } else {
        this.notificationService.warn(res?.message);
        return
      }

    })

  }

  onDetails(row: any) {
    console.log(row, "row...................");

    /////////////////////////////////////////////////////
    this.consumerApplicationService.getApiForDtrDetails(row?.CONSUMER_APPLICATION_NUMBER).subscribe((resp: any) => {
      console.log(resp, "resp.......................................................");
      if (resp?.code == "200" && resp?.list != null) {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "90vw";
        dialogConfig.height = '90vh';
        dialogConfig.data = { row: row, array: resp?.list };
        // const dialogRef = this.dialog.open(FillDetailsComponent, dialogConfig);
        const dialogRef = this.dialog.open(DtrDetailsComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          // location.reload();
        });

      } else {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "90vw";
        dialogConfig.height = '90vh';
        dialogConfig.data = { row: row };
        // const dialogRef = this.dialog.open(FillDetailsComponent, dialogConfig);
        const dialogRef = this.dialog.open(FillDetailsComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          // location.reload();
        });
      }

    })
    ///////////////////////////////////////////////////////





  }


  onFilesDownload(row: any) {

    console.log(row, "e.....................");
    this.getApplicationDocumentData(row.applicationId, row, 2);


  }


}
