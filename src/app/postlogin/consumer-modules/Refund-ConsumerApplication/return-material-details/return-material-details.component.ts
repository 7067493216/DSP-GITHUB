import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { NewApplicationService } from '../../services/new-application.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-return-material-details',
  templateUrl: './return-material-details.component.html',
  styleUrls: ['./return-material-details.component.css']
})
export class ReturnMaterialDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'PROJECT_NUMBER',
    'ITEM_CODE',
    'DESCRIPTION',
    'INV_UOM_CODE',
    'PROJECT_QTY',
    'RETURN_QTY',
    'BAL_QTY'
  ];
  rowList: Array<any> = [];
  findIndixOfBalanceQuantityIsZero = -1;
  submitButtonDisableBoolean: boolean = false;;


  constructor(
    private url: GenerateUrl,
    private fb: FormBuilder,
    private http: HttpClient,
    private notification: NotificationService,
    private newApplicationService: NewApplicationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ReturnMaterialDetailsComponent>
  ) {
    console.log(this.data, "ddaaattttaaaa");
    this.rowList = data.rowList;

    this.findIndixOfBalanceQuantityIsZero = this.rowList.findIndex(x => x.BAL_QTY != 0);
    if (this.findIndixOfBalanceQuantityIsZero == -1) {
      this.submitButtonDisableBoolean = false;
    } else {
      this.submitButtonDisableBoolean = true;;
    }
  }

  ngOnInit(): void {
  }

  onClose() {
    

    if(this.submitButtonDisableBoolean == false){
this.dialogRef.close("nothing");
    }else{
this.dialogRef.close("abc");
    }
  }

  onCloseNew(){
    

    if(this.submitButtonDisableBoolean == false){
this.dialogRef.close("nothing");
    }else{
this.dialogRef.close("abc");
    }
  }


  onSubmit() {
console.log("hiii");

this.newApplicationService.checkReturnMaterialTotalRowsBalanceAmountZeroOrNotPostApi(this.rowList).subscribe((resp:any)=>{
  if(resp?.code=="200" || resp?.code=="201"){
    this.dialogRef.close("done")
  }
  
})

  }

}
