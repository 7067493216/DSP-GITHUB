import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { NewApplicationService } from '../../services/new-application.service';

@Component({
  selector: 'app-meterial-item-cost-details',
  templateUrl: './meterial-item-cost-details.component.html',
  styleUrls: ['./meterial-item-cost-details.component.css']
})
export class MeterialItemCostDetailsComponent implements OnInit {
  consumerApplicationNo:any;
  dataSource :Array<any> = [];
 
items:Array<any>=[]

   

  constructor(
     private notificationService: NotificationService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<MeterialItemCostDetailsComponent>,
        private newApplicationService: NewApplicationService,
  ) { 
    this.consumerApplicationNo = this.data.consumerApplicationNo;
  }

   onClose() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
this.getOytMetarialDetailsWithCgstAndSgst(this.consumerApplicationNo);

  }

  getOverallTotalCost(): number {
  return this.dataSource
    .map(item => item.oytMaterialTotalCostWithCgstAndSgst)
    .reduce((acc, value) => acc + value, 0);
}



  getOytMetarialDetailsWithCgstAndSgst(consumerApplicationNo:any){
    this.newApplicationService.getOytMetarialDetailsWithCgstAndSgst(consumerApplicationNo).subscribe((resp:any)=>{
      if(resp?.code=="200"){
        this.dataSource  = resp?.list;
        this.getOverallTotalCost()
      }
    })
  }


  // {
  //           "created": "2025-08-04T06:28:05.000+00:00",
  //           "id": 3,
  //           "taskName": "E-3.3 Material",
  //           "schemeCode": "SCCW",
  //           "projCompletionDate": null,
  //           "laborTransChg": "1818",
  //           "totalCost": 5300.22,
  //           "contractorName": null,

  //           "itemCost": 2331,

  //           "projectStatus": "Approved",
  //           "certificate": "Mr. SUNIL KUMAR KHARE - E.E. (T&D)/ Dy. Secy(T&D)",
  //           "resourceItem": "M-0201106",
  //           "applicantConsumerName": null,
  //           "dcName": null,

  //           "scheduleNo": "E-3.3",

  //           "taskItemCost": 1347793.92,
  //           "estimateNo": "20-516-110514-24-00725",
  //           "taskNumber": "E-3.3 Material",
  //           "projectNumber": "100301",
  //           "projStartDate": 1715538600000,
  //           "prjOwningOrg": "O&M Dn Ashta",
  //           "projCreationDate": 1713551400000,
  //           "workType": "Material",
  //           "sanctionedBy": "Mr. SUNIL KUMAR KHARE",
  //           "rate": "259",
  //           "projectItemCost": null,
  //           "baselinedDate": 1715538600000,
  //           "projectType": "Deposit-O&M C Sehore",
  //           "taskTotalCost": 1830025.03,
  //           "schemeDesc": "SUPERVISION CHARGES FOR CAPITAL WORKS",
  //           "itemUom": "EA",
  //           "projectTotalCost": 5718616.55,
  //           "version": 1,
  //           "itemDesc": "9 KV  Gapless type  ( 5KA)   Polymer for DTR",
  //           "contractorNumber": null,
  //           "centages": null,
  //           "contractOrganization": null,
  //           "oaDate": null,
  //           "scheduleQty": "3.00",
  //           "expType": "M-0201106",
  //           "cpyProvFlag": null,
  //           "contractNumber": null,
  //           "purchaseOrder": null,
  //           "scheduleUom": "Number",
  //           "longName": " Estimate for External Electrification of newly developed residental colony Maa Narmda Dream Colony Mr. Bheru Singh S/o Bhai Ram At location word no. 15 behand subhas nagar ashta under Ashta town D/c of O&M Division Ashta.",
  //           "remarks": ". ",
  //           "techViability": "Mr. Kalan Chakrey - AE(T&D)",

  //           "itemQty": 9,

  //           "projectDesc": ". ",
  //           "projectId": 2679949,
  //           "consumerApplicationNo": "SV1234",
  //           "erpNo": "100301",
  //           "itemCodeFlag": 1,
  //           "active": true,
  //           "deleted": false
  //       }


  

}
