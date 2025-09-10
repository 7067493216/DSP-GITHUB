import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StcRemark } from '../../models/stcRemarkModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stc-remark',
  templateUrl: './stc-remark.component.html',
  styleUrls: ['./stc-remark.component.css']
})
export class StcRemarkComponent implements OnInit {
  consumerApplicationDetail:any;
  supplyVoltageString:string ='';
  supplyVolageName :Array<any>=[];
  natureOfWorkTypeId:any
  stcRemark:StcRemark = new StcRemark()
  remarkForm:FormGroup;
  accessLevelofStc:any

  constructor(
    private spinnerService: SpinnerService,
    private url: GenerateUrl,
    private fb:FormBuilder,
    private http: HttpClient,
    private consumerApplicationService: ConsumerApplicationService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<StcRemarkComponent>,
  ) { 
    this.consumerApplicationDetail = this.data.row;
console.log(this.consumerApplicationDetail,"consumerApplicationDetail...consumerApplicationDetail....consumerApplicationDetail......consumerApplicationDetail");

    this.natureOfWorkTypeId = this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId;

    let accessLeveOfUser = sessionStorage.getItem('accessLeveOfUser');
    console.log(JSON.parse(accessLeveOfUser),".......................fffffffff............"); 
    this.accessLevelofStc = JSON.parse(accessLeveOfUser)
  }

  ngOnInit(): void {
    if(this.consumerApplicationDetail!=undefined || this.consumerApplicationDetail!=null){
      console.log('**********************************************',this.consumerApplicationDetail) //this.consumerApplicationDetail.consumers.consumerLoginId
      if(this.consumerApplicationDetail.dtr !==null){
          this.supplyVolageName.push("DTR");
      }
      if(this.consumerApplicationDetail.ptr !==null){
          this.supplyVolageName.push("PTR");
      }
      if(this.consumerApplicationDetail.lt !==null){
          this.supplyVolageName.push("LT");
      }
      if(this.consumerApplicationDetail.ht11Kv !==null){
          this.supplyVolageName.push("HT 11 KV");
      }
      if(this.consumerApplicationDetail.ht33Kv!==null){
          this.supplyVolageName.push("ht33Kv");
      }
      if(this.consumerApplicationDetail.ht132Kv !==null){
          this.supplyVolageName.push("HT 132 KV");
      }
      console.log(this.supplyVolageName); 
      for (let i = 0; i < this.supplyVolageName.length; i++) {
          this.supplyVoltageString += this.supplyVolageName[i] + " , ";
        }
        this.supplyVoltageString =   this.supplyVoltageString.slice(0,-1);
        
        this.supplyVoltageString =  this.supplyVoltageString.substring(0,  this.supplyVoltageString.length - 1);
      console.log('supply voltage String:::::::::-',this.supplyVoltageString);
    } 

    this.remarkForm= this.fb.group({
      remark:['',Validators.required]
    })
    console.log(this.remarkForm,"this.remarkForm................................................");
    

  }
  

  onClose() {
    this.dialogRef.close();
}


  onSubmit(){

    console.log(this.remarkForm.value,"eeeeeeeeeeeeeeeeeeeeeeeee");
    
    this.stcRemark.consumerAppNo = this.consumerApplicationDetail.consumerApplicationNo;
    this.stcRemark.remark = this.remarkForm.value.remark;
    this.stcRemark.stcId = this.accessLevelofStc.userId;
    this.stcRemark.stcName = this.accessLevelofStc.userName;

    console.log( this.stcRemark," this.stcRemark.......");

  //   "consumerAppNo": "SV1704708217777",
  // "remark": "This is a sample remark",
  // "stcName": "SampleSTC",
  // "stcId": 12345
    

this.consumerApplicationService.stcRemarkSubmit(this.stcRemark).subscribe((data:any)=>{
  console.log(data,"ddddaattttttaaaaaaaaaaa...................");
  if(data.code=="200"){
    this.notificationService.success("Submitted Successfully")
  }else{
    this.notificationService.error("Something went wrong !");
    return
  }
})



  }

  onStcRemarkChange(x:any){
console.log(x,"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

  }


  

}
