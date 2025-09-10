import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { ConsumerApplicationService } from '../../services/consumer-application.service';

@Component({
  selector: 'app-finance-dashboard',
  templateUrl: './finance-dashboard.component.html',
  styleUrls: ['./finance-dashboard.component.css']
})
export class FinanceDashboardComponent implements OnInit {

  dummyList: Array<any> = [];
  dummyListForCompleatedApplication: Array<any> = [];
  newCountArray: Array<any> = [];
  newCountArrayForCompleatedApplication: Array<any> = [];
  financeApplicationList = []

  token: any;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private consumerApplicationService: ConsumerApplicationService
  ) {
    this.token = sessionStorage.getItem('usertoken');
    this.getAllRefundApplicationList();
  }

  getAllDuplicateRefundApplicationList(){
    this.consumerApplicationService.getDuplicateRefundListForFinance(this.token).subscribe((resp:any)=>{
      console.log(resp,"resp......................................................");

      if(resp?.code=="200"){
this.financeApplicationList = resp?.list;
      }else{
        this.notificationService.warn(resp?.message);
        return
      }
      
    })
  }

  ngOnInit(): void {
    console.log("finance refund dashboard run finally...................");
// this.getAllDuplicateRefundApplicationList();
  }


  getAllRefundApplicationList() {
    this.consumerApplicationService.getAllRefundApplicationForFinmance(this.token).subscribe((res: any) => {
      console.log(res, "resssssssssss...........................");
      if (res?.code == "200") {
        /// for pending application
       this.dummyList = res?.list.filter((z: any) => {
          return (((z?.refundType == "Cancellation_Amount" && z?.gmApproval == "true") || (z?.refundType == "Revise_Amount" && z?.dgmApproval == "true") || (z?.refundType == "Return_Amount" && z?.dgmApproval == "true") ) && z?.financeApproval!="true" && z.active==true)
        })
        console.log(this.dummyList, "this.dummyList................................");
        this.notificationService.success(res?.message);

        let yArr = [];
        for (let j = 0; j < 4; j++) {
          if (j == 0) {
            let k = this.dummyList.filter((x: any) => {
              return (x?.refundType === "Cancellation_Amount")
            });

            yArr.push(
              {
                "SNO": 1,
                "ApplicationRefundTypeName": "Permanent_Cancellation",
                "COUNT": k.length
              }
            )

          } else if (j == 1) {
            let k = this.dummyList.filter((x: any) => {
              return (x?.refundType === "Return_Amount")
            });

            yArr.push(
              {
                "SNO": 2,
                "ApplicationRefundTypeName": "Return_Amount",
                "COUNT": k.length
              }
            )
          } else if (j == 2) {

            let k = this.dummyList.filter((x: any) => {
              return x?.refundType === "Revise_Amount";
            });

            yArr.push(
              {
                "SNO": 3,
                "ApplicationRefundTypeName": "Revise_Amount",
                "COUNT": k.length
              }
            )

          } else if (j == 3) {
            let k = this.dummyList.filter((x: any) => {
              return x;
            });

            yArr.push(
              {
                "SNO": 4,
                "ApplicationRefundTypeName": "All-Type",
                "COUNT": k.length
              }
            )
          }
          else {

          }

        }
        this.newCountArray = yArr;
        console.log(this.newCountArray, "this.newCountArray.......................");


        // for Compleated application
        this.dummyListForCompleatedApplication = res?.list.filter((z: any) => {
          return z?.financeApproval=="true"
        })
        console.log(this.dummyListForCompleatedApplication, "this.dummyListForCompleatedApplication................................");
        this.notificationService.success(res?.message);

        let yArrNew = [];
        for (let j = 0; j < 4; j++) {
          if (j == 0) {
            let k = this.dummyListForCompleatedApplication.filter((x: any) => {
              return (x?.refundType === "Cancellation_Amount")
            });

            yArrNew.push(
              {
                "SNO": 1,
                "ApplicationRefundTypeName": "Permanent_Cancellation",
                "COUNT": k.length
              }
            )

          } else if (j == 1) {
            let k = this.dummyListForCompleatedApplication.filter((x: any) => {
              return (x?.refundType === "Return_Amount")
            });

            yArrNew.push(
              {
                "SNO": 2,
                "ApplicationRefundTypeName": "Return_Amount",
                "COUNT": k.length
              }
            )
          } else if (j == 2) {

            let k = this.dummyListForCompleatedApplication.filter((x: any) => {
              return x?.refundType === "Revise_Amount";
            });

            yArrNew.push(
              {
                "SNO": 3,
                "ApplicationRefundTypeName": "Revise_Amount",
                "COUNT": k.length
              }
            )

          } else if (j == 3) {
            let k = this.dummyListForCompleatedApplication.filter((x: any) => {
              return x;
            });

            yArrNew.push(
              {
                "SNO": 4,
                "ApplicationRefundTypeName": "All-Type",
                "COUNT": k.length
              }
            )
          }
          else {

          }

        }
        this.newCountArrayForCompleatedApplication = yArrNew;
        console.log(this.newCountArrayForCompleatedApplication, "this.newCountArrayForCompleatedApplication.......................");


      } else {
        this.notificationService.warn(res?.message);
        return;
      }
    })
  }

 


  onStatus(data: any) {
    console.log(data, "data.................")
    this.router.navigate(['user/finance-application'],
      {
        queryParams: { data: JSON.stringify(data) }
      });
  }

  onStatusForCompleted(data:any){
 console.log(data, "data.................")
    this.router.navigate(['user/finance-application-completed-list'],
      {
        queryParams: { data: JSON.stringify(data) }
      });
  }

}
