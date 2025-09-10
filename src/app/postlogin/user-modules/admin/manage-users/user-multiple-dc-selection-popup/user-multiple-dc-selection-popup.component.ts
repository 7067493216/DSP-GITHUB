import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { ConsumerApplicationService } from '../../../services/consumer-application.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-multiple-dc-selection-popup',
  templateUrl: './user-multiple-dc-selection-popup.component.html',
  styleUrls: ['./user-multiple-dc-selection-popup.component.css']
})
export class UserMultipleDcSelectionPopupComponent implements OnInit {
  multipleDcSelectionForm: FormGroup;
  multipleSelectedDcList: Array<any> = []
  multipleSelectedDivisionList:Array<any> = [];
  dcList: Array<any> = [];
  divisionList: Array<any> = []
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<UserMultipleDcSelectionPopupComponent>,
    private consumerApplicationService: ConsumerApplicationService,
  ) {
    console.log(this.data, "..............................................................................");

    if (this.data?.accessLevel == 5 || this.data?.accessLevel == 6) {
      this.dcList = this.data.dcObject
    } else if (this.data?.accessLevel == 3 || this.data?.accessLevel == 4) {
      this.divisionList = this.data.divisionObject
    } else {

    }


  }

  onDcsSelect(e: any) {
    console.log(e, "e,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
    this.multipleSelectedDcList = e
  }

  onDivisionsSelect(e: any) {
    console.log(e, "e,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
    this.multipleSelectedDivisionList = e
  }


  ngOnInit(): void {
    this.multipleDcSelectionForm = this.fb.group({
      dcSelectionCheck: ["", Validators.required]
    })
  }

  checkBoxCredit(e: any) {
    console.log(e, "eeeeeeeeeeeeeeeeee");

  }

  onClose() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    let x = [];

if(this.data?.accessLevel == 5 || this.data?.accessLevel == 6){
  for (let i = 0; i < this.multipleSelectedDcList.length; i++) {
    x.push({
      // "id": i+1,
      "distributionCenterId": this.multipleSelectedDcList[i].dcId,
      "distributionCenterName": this.multipleSelectedDcList[i].dcName,
      "userId": this.data.formUserId

    })
  }
  let length = x.length;
  if(this.data.formDcId!=undefined){
  x.push({
    // "id":length+1,
    "distributionCenterId": this.data.originaldcList.filter(y => y.dcId === this.data.formDcId)[0]?.dcId,
    "distributionCenterName": this.data.originaldcList.filter(y => y.dcId === this.data.formDcId)[0].dcName,
    "userId": this.data.formUserId
  })
  }

  this.dialogRef.close(x);
}else if(this.data?.accessLevel == 3 || this.data?.accessLevel == 4){


  for (let i = 0; i < this.multipleSelectedDivisionList.length; i++) {
    x.push({
      // "id": i+1,
      "divisionId": this.multipleSelectedDivisionList[i].divisionId,
      "divisionName": this.multipleSelectedDivisionList[i].division,
      "userId": this.data.formUserId

    })
  }
  let length = x.length;
  x.push({
    // "id":length+1,
    "divisionId":this.data.formDivisionId,
    "divisionName": this.data.formDivisionName,
    "userId": this.data.formUserId
  })
  this.dialogRef.close(x);
}else{

}

    
  }

}
