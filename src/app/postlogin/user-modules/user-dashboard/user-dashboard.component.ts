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
import { ConsumerApplicationService } from '../services/consumer-application.service';
import { Router } from '@angular/router';
import { UserLoginService } from '../services/user-login.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  isSearchkey = false;
  unsubscribe$: Subject<void> = new Subject();
  public lineChartData = chartsData.lineChartData;
  public lineChartLabels = chartsData.lineChartLabels;
  public lineChartOptions = chartsData.lineChartOptions;
  public lineChartColors = chartsData.lineChartColors;
  public lineChartLegend = chartsData.lineChartLegend;
  public lineChartType: ChartType = 'line';
  todayCanceledPayment;
  todayPunchCount;
  todayTotalSuccessPayment;
  todayTotalAmount;
  todayCanceledAmount;
  viewTableButton: boolean = true;
  barChartOptions = barChart.barChartOptions;
  barChartLabels = barChart.barChartLabels;
  barChartType = barChart.barChartType;
  barChartLegend = barChart.barChartLegend;
  barChartPlugins = barChart.barChartPlugins;
  barChartColors = barChart.barChartPlugins;
  barChartData = barChart.barChartData;
  public barChartOptions1 = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  public barChartLabels1: Label[] = ['Demand', 'Collection'];
  public barChartType1: ChartType = 'bar';
  public barChartLegend1 = true;
  public barChartData1: ChartDataSets[] = [
    { data: [50], label: 'Demand' },
    { data: [20], label: 'Collection' },
  ];

  redirection: string;
  showDetail: boolean = false;

  page: any
  size: any
  listData: any
  userRolesData: any
  foraccessLeveOfUser: any
  roleList: any
  finalList: any;
  ApplicationStatusList: any
  newArray: any
  abcNewArray: Array<any> = []
  finalArray: Array<any> = []
  token: any;
  mergeStatusArrayStatic: Array<any> = [
    { "Sno": 6, "statusName": "आवेदन लंबित उपभोक्ता स्तर पर।", "statusId": [12, 21, 30, 38] },
    { "Sno": 3, "statusName": "आवेदन लंबित वितरण प्रभारी स्तर पर।", "statusId": [6, 7, 36] },
    { "Sno": 4, "statusName": "आवेदन लंबित उपमहाप्रबंधक(O&M/HTM) स्तर पर।", "statusId": [9, 23, 25] },
    { "Sno": 5, "statusName": "आवेदन लंबित उपमहाप्रबंधक (STC)/AE(O&M) स्तर पर।", "statusId": [27, 34] },
    { "Sno": 2, "statusName": "आवेदन लंबित महाप्रबंधक स्तर पर।", "statusId": [35] },
    { "Sno": 8, "statusName": "आवेदन लंबित ठेकेदार के स्तर पर।", "statusId": [20, 22, 24, 31] },
    { "Sno": 1, "statusName": "कनेक्शन प्रदाय के लिए आवेदन।", "statusId": [32] },
    { "Sno": 7, "statusName": " निरस्त किये गये आवेदन।", "statusId": [37, 29, 35] },
    { "Sno": 9, "statusName": "पूर्ण आवेदन।", "statusId": [28, 33] },
  ];
  tempArray: Array<any> = [];
  mainArray: Array<any> = [];
  countArray:Array<any> = []
  switchedDcId=0;
  switchedDivisionId=0;

  /** Announce the change in sort state for assistive technology. */
  BillMonthSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  constructor(
    private titleService: Title,
    public role: RoleConstantsService,
    public barChartService: BarChartService,
    public lineChartService: LineChartService,
    private notificationService: NotificationService,
    private crypto: CryptoService,
    private _liveAnnouncer: LiveAnnouncer,
    private sharedData: SearchKeyStatusService,
    private consumerApplicationService: ConsumerApplicationService,
    private router: Router,
    private userLoginService:UserLoginService

  ) {
    this.switchedDcId =  JSON.parse(sessionStorage.getItem("switchedDcId"))==null?0:JSON.parse(sessionStorage.getItem("switchedDcId"))


    this.userLoginService.switchDc.subscribe((data:any)=>{
      this.switchedDcId =  JSON.parse(sessionStorage.getItem("switchedDcId"))==null?0:JSON.parse(sessionStorage.getItem("switchedDcId"))
      this.switchedDcId = data;
      console.log(this.switchedDcId,"................................",data);
      this.token = sessionStorage.getItem('usertoken');
      const userRoles = JSON.parse(sessionStorage.getItem("accessLeveOfUser"))?.userRoles[0]?.roleCode;
      console.log(userRoles, "ooooooooooooooooooooooooooooooooooooooo");
      this.userRolesData = userRoles;
    this.foraccessLeveOfUser = JSON.parse(sessionStorage.getItem('accessLeveOfUser'));
    console.log(this.foraccessLeveOfUser, "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    this.roleList = this.foraccessLeveOfUser.userRoles;
    // this.refreshPaginateNewApplicationList();
    this.getCountOfApplicationByUserId();
    });


    this.switchedDivisionId =  JSON.parse(sessionStorage.getItem("switchedDivisionId"))==null?0:JSON.parse(sessionStorage.getItem("switchedDivisionId"))


    this.userLoginService.switchDc.subscribe((data:any)=>{
      this.switchedDivisionId =  JSON.parse(sessionStorage.getItem("switchedDivisionId"))==null?0:JSON.parse(sessionStorage.getItem("switchedDivisionId"))
      this.switchedDivisionId = data;
      console.log(this.switchedDivisionId,"................................",data);
      this.token = sessionStorage.getItem('usertoken');
       const userRoles = JSON.parse(sessionStorage.getItem("accessLeveOfUser"))?.userRoles[0]?.roleCode;
      console.log(userRoles, "ooooooooooooooooooooooooooooooooooooooo");
      this.userRolesData = userRoles;
    this.foraccessLeveOfUser = JSON.parse(sessionStorage.getItem('accessLeveOfUser'));
    console.log(this.foraccessLeveOfUser, "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    this.roleList = this.foraccessLeveOfUser.userRoles;
    // this.refreshPaginateNewApplicationList();
    this.getCountOfApplicationByUserId();
    })
   

    this.token = sessionStorage.getItem('usertoken');
     const userRoles = JSON.parse(sessionStorage.getItem("accessLeveOfUser"))?.userRoles[0]?.roleCode;
    console.log(userRoles, "ooooooooooooooooooooooooooooooooooooooo");
    this.userRolesData = userRoles;
    this.foraccessLeveOfUser = JSON.parse(sessionStorage.getItem('accessLeveOfUser'));
    console.log(this.foraccessLeveOfUser, "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    this.roleList = this.foraccessLeveOfUser.userRoles;
    // this.refreshPaginateNewApplicationList();
    this.getCountOfApplicationByUserId();
  }

  getAllUserApplication(token: any) {
    this.consumerApplicationService.getAllUserApplication().subscribe((responseData: any) => {
      console.log(responseData, "responseData......................................");

    })
  }

  ngOnInit() {
    this.titleService.setTitle('User Dashboard');
   
  }

  // onStatus(Sno: any) {
  //   console.log(Sno, "Sno.................");

  //   this.router.navigate(['user/user-list'],
  //     {
  //       queryParams: { Sno: Sno }
  //     });
  // }

  onStatus(data: any) {
    console.log(data, "data.................");

    this.router.navigate(['user/user-list'],
      {
        queryParams: { data: JSON.stringify(data?.STATUSID),switchedDcId:this.switchedDcId,switchedDivisionId:this.switchedDivisionId }
      });
  }


  getApplicationStatus() {
    this.consumerApplicationService.getAll_Application_Status().subscribe(
      (res) => {
        console.log(
          res,
          "lllllllllllllllllllllllllllllllllllllllllllllllllll"
        );
        if (res?.code == '200') {
          this.ApplicationStatusList = res.list;
          let lengthnew: any;
          lengthnew = res.list?.length;
          console.log(lengthnew, "lengthnew........");

          let abc: Array<any> = [];
          for (let i = 0; i < lengthnew; i++) {
            abc.push({
              "applicationStatusId": this.ApplicationStatusList[i]?.applicationStatusId,
              "applicationStatusName": this.ApplicationStatusList[i]?.applicationStatusName
            });
          }
          this.abcNewArray = abc;
          console.log(this.abcNewArray, "abc...................abc.............abc");
        }
      },
      (error) => { }
    );
  }


  getCountOfApplicationByStatusId(applicationStatusId: any) {
    return 1;
  }


  getCountOfApplicationByUserId() {
    // this.consumerApplicationService.getCountOfApplicationByStatusId(this.foraccessLeveOfUser?.userId).subscribe((ress: any) => {
      this.consumerApplicationService.getApplicationListCountByStatusForDiscomUser(this.foraccessLeveOfUser?.userId,this.switchedDcId,this.switchedDivisionId).subscribe((ress: any) => {
      console.log(ress, "resssssss.....................................");
      if(ress?.code=="200"){
        this.countArray = ress?.list;
        console.log(this.countArray, "this.countArray");
        for (let obj of this.countArray) {
          if (obj.SNO == '1') {
            obj.statusName = "कनेक्शन प्रदाय के लिए आवेदन।"

          } else if (obj.SNO == '2') {
            obj.statusName = "आवेदन लंबित महाप्रबंधक स्तर पर।"
          } else if (obj.SNO == '3') {
            obj.statusName = "आवेदन लंबित वितरण प्रभारी स्तर पर।"
          } else if (obj.SNO == '4') {
            obj.statusName = "आवेदन लंबित उपमहाप्रबंधक(O&M/HTM) स्तर पर।"
          } else if (obj.SNO == '5') {
            obj.statusName = "आवेदन लंबित उपमहाप्रबंधक(STC)/AE(O&M) स्तर पर।"
          } else if (obj.SNO == '6') {
            obj.statusName = "आवेदन लंबित उपभोक्ता स्तर पर।"
          } else if (obj.SNO == '7') {
            obj.statusName = " निरस्त किये गये आवेदन।"
          } else if (obj.SNO == '8') {
            obj.statusName = "आवेदन लंबित ठेकेदार के स्तर पर।"
          } else if (obj.SNO == '9') {
            obj.statusName = "पूर्ण आवेदन।"
          }else if (obj.SNO == '10') {
            obj.statusName = "कुल आवेदन।"
          } else if (obj.SNO == '11') {
            obj.statusName = "फाइनेंस स्तर पे आवेदन"
          } 
          
          else {

          }
        }

        console.log(this.countArray, ".......................................");
      }

    })
  }

  public getDetail(selected: string) {
    console.log("selected: ", selected);
    // this.showDetail=true;
    this.redirection = selected;
  }

  public redirectedToDashboard() {
    this.showDetail = false;
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  onResampling(){
    this.router.navigate(['user/resampling-list'])
  }

  onResamplingAe(){
    this.router.navigate(['user/resampled-list'])
  }




}




// http://proxy1.mpcz.in

// *.mpcz.in;*.mpmkvvcl.com;172.24.*;172.24.56.*
