import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { misReport } from '../../models/mis-report';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { misUserData } from '../../models/misUserData';
import * as XLSX from 'xlsx';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';

// export interface UserData {
//   APPLICATION_DATE: string;
//   APPLICATION_STATUS_ID: number;

// }




@Component({
  selector: 'app-mis-report',
  templateUrl: './mis-report.component.html',
  styleUrls: ['./mis-report.component.css']
})
export class MisReportComponent {
  //displayedColumns: string[] = ['position', 'schemeType', 'natureOfWork', 'consumerName', 'consumerApplicationNo','dcName','registrationPaymentDate','demandPaymentDate', 'stage', 'status', 'edit'];
 


  dataTableVal: any[] = [];

  test: any;
  dataIds: misReport = new misReport();
  displayedColumns: string[] = [
   
    "APPLICATION_DATE",
    // "APPLICATION_STATUS_ID",
    "APPLICATION_STATUS_NAME",
    "CIRCLE",
    // "CIRCLE_CODE",
    "CONSUMER_APPLICATION_NUMBER",
    "CONSUMER_MOBILE_NO",
    "CONSUMER_NAME",
    // "DC_CODE",
    "DC_NAME",
    "DIVISION",
    // "DIVISION_CODE",
    // "NATURE_OF_WORK_ID",
    "NATURE_OF_WORK_NAME",
    "REGION",
    // "REGION_CODE",
    // "SCHEME_TYPE_ID",
    "SCHEME_TYPE_NAME"
  ];
  dataSource: MatTableDataSource<misUserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild('TABLE',{ read: ElementRef }) table: ElementRef;


  constructor(
    public dialogRef: MatDialogRef<MisReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private consumerApplicationService: ConsumerApplicationService
  ) {
    console.log(JSON.parse(this.data), "rryytttt&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    this.test = JSON.parse(this.data);
    console.log(this.test.accessLevel, "aaaaaaaaaaaaaaaaaaaaaaaaa");

    if (this.test.accessLevel == 6) {  //accessLevel

      //console.log("aaallllammmmm>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

      this.dataIds.a = 'null';
      this.dataIds.b = 'null';
      this.dataIds.c = 'null';
      this.dataIds.d = this.test.userDc.dcCode;

    }
    //   else if(this.test.accessLevel== 5){

    //   }
    else if (this.test.accessLevel == 4) {

      this.dataIds.a = 'null';
      this.dataIds.b = 'null';
      this.dataIds.c = this.test.userDivision.divisionCode;
      this.dataIds.d = 'null';

    }
    else if (this.test.accessLevel == 3) {

      this.dataIds.a = 'null';
      this.dataIds.b = this.test.userCircle.circleCode;
      this.dataIds.c = 'null';
      this.dataIds.d = 'null';

    }
    else if (this.test.accessLevel == 2) {

      this.dataIds.a = this.test.userRegion.regionCode;
      this.dataIds.b = 'null';
      this.dataIds.c = 'null';
      this.dataIds.d = 'null';

    }
    // else if( this.test.accessLevel== 1){


    // }


    // console.log(this.dataIds, "uiiiiiiiiiiiiiiiiiiii33333333333333333333");
    this.consumerApplicationService.getDataOfConsumerForUserOnTheBasisOfAccessLevel(this.dataIds.a, this.dataIds.b, this.dataIds.c, this.dataIds.d).subscribe((response: any) => {
      console.log(response, "rttrtrtrtrtrtrtrtuuuuuuuuuuuuuuuuuuuuuuu");
      this.dataTableVal = response.list;
      console.log(this.dataTableVal, "8888888yyyyyttttfffffffffff");
      // Create 100 users
      const users = this.dataTableVal;
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource<misUserData>(users);
      console.log(this.dataSource, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
