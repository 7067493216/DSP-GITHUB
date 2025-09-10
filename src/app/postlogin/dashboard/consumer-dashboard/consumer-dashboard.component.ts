import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as chartsData from '../models/line-chart';
import * as barChart from '../models/bar-chart';
import { Label, Color } from 'ng2-charts';
import { LineChartService } from '../services/line-chart.service';
import { BarChartService } from '../services/bar-chart.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { CryptoService } from 'src/app/shared-services/crypto.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SearchKeyStatusService } from 'src/app/shared-services/search-key-status.service';

@Component({
  selector: 'app-consumer-dashboard',
  templateUrl: './consumer-dashboard.component.html',
  styleUrls: ['./consumer-dashboard.component.css']
})
export class ConsumerDashboardComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  isSearchkey = false;
  // public lineChartData = chartsData.lineChartData;
  // public lineChartLabels = chartsData.lineChartLabels;
  // public lineChartOptions = chartsData.lineChartOptions;
  // public lineChartColors = chartsData.lineChartColors;
  // public lineChartLegend = chartsData.lineChartLegend;
  // public lineChartType: ChartType = 'line';
  // todayCanceledPayment;
  // todayPunchCount;
  // todayTotalSuccessPayment;
  // todayTotalAmount;
  // todayCanceledAmount;
  // viewTableButton: boolean = true;
  // barChartOptions = barChart.barChartOptions;
  // barChartLabels = barChart.barChartLabels;
  // barChartType = barChart.barChartType;
  // barChartLegend = barChart.barChartLegend;
  // barChartPlugins = barChart.barChartPlugins;
  // barChartColors = barChart.barChartPlugins;
  // barChartData = barChart.barChartData;
  // public barChartOptions1 = {
  //   scaleShowVerticalLines: true,
  //   responsive: true
  // };
  // public barChartLabels1: Label[] = ['Demand', 'Collection'];
  // public barChartType1: ChartType = 'bar';
  // public barChartLegend1 = true;
  // public barChartData1: ChartDataSets[] = [
  //   { data: [50], label: 'Demand' },
  //   { data: [20], label: 'Collection' },
  // ];

  redirection: string;
  showDetail: boolean = false;

  /** Announce the change in sort state for assistive technology. */
  // BillMonthSortChange(sortState: Sort) {
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }
  constructor(
    private titleService: Title,
    // public role: RoleConstantsService,
    // public barChartService: BarChartService,
    // public lineChartService: LineChartService,
    private notificationService: NotificationService,
    private crypto: CryptoService,
    private _liveAnnouncer: LiveAnnouncer,
    private sharedData: SearchKeyStatusService,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Consumer Dashboard');
    // this.storeHoliday();
  }

  cleanSearchKey(drawer) {
    localStorage.clear();
    drawer.close()
    sessionStorage.removeItem('SearchKey');
    this.isSearchkey = false;
    this.sharedData.pushData(null);
  }

  // public getDetail(selected: string) {
  //   console.log("selected: ", selected);
  //   // this.showDetail=true;
  //   this.redirection = selected;
  // }

  public redirectedToDashboard() {
    this.showDetail = false;
  }

  // events
  // public chartClicked(e: any): void {
  //   //your code here
  // }

  // public chartHovered(e: any): void {
  //   //your code here
  // }
  
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
