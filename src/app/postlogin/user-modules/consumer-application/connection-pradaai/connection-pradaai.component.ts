import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectionPradayModel } from '../../models/connectionPradayModel';


@Component({
  selector: 'app-connection-pradaai',
  templateUrl: './connection-pradaai.component.html',
  styleUrls: ['./connection-pradaai.component.css']
})
export class ConnectionPradaaiComponent implements OnInit {
  consumerApplicationDetail: any;
  supplyVoltageString: string = '';
  supplyVolageName: Array<any> = [];
  panelOpenState = false;
  ivrsForm: FormGroup
  IvrsData: any
  showTable: boolean = false
  checkboxCheck:boolean=false;
  payload: ConnectionPradayModel = new ConnectionPradayModel()

  constructor(
    private spinnerService: SpinnerService,
    private url: GenerateUrl,
    private http: HttpClient,
    private consumerApplicationService: ConsumerApplicationService,
    private notificationService: NotificationService,
    private fb: FormBuilder,


    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConnectionPradaaiComponent>,
  ) {
    console.log(this.data.row, "ttttttttttttyyyyyyyyyyuuuuuuuuuuu");
    this.consumerApplicationDetail = this.data.row

  }

  ngOnInit(): void {

    // if(this.consumerApplicationDetail!=undefined || this.consumerApplicationDetail!=null){
    //   console.log('**********************************************',this.consumerApplicationDetail) //this.consumerApplicationDetail.consumers.consumerLoginId
    //   if(this.consumerApplicationDetail.dtr !==null){
    //       this.supplyVolageName.push("DTR");
    //   }
    //   if(this.consumerApplicationDetail.ptr !==null){
    //       this.supplyVolageName.push("PTR");
    //   }
    //   if(this.consumerApplicationDetail.lt !==null){
    //       this.supplyVolageName.push("LT");
    //   }
    //   if(this.consumerApplicationDetail.ht11Kv !==null){
    //       this.supplyVolageName.push("HT 11 KV");
    //   }
    //   if(this.consumerApplicationDetail.ht33Kv!==null){
    //       this.supplyVolageName.push("ht33Kv");
    //   }
    //   if(this.consumerApplicationDetail.ht132Kv !==null){
    //       this.supplyVolageName.push("HT 132 KV");
    //   }
    //   console.log(this.supplyVolageName); 
    //   for (let i = 0; i < this.supplyVolageName.length; i++) {
    //       this.supplyVoltageString += this.supplyVolageName[i] + " , ";
    //     }
    //     this.supplyVoltageString =   this.supplyVoltageString.slice(0,-1);

    //     this.supplyVoltageString =  this.supplyVoltageString.substring(0,  this.supplyVoltageString.length - 1);
    //   console.log('supply voltage String:::::::::-',this.supplyVoltageString);
    // } 

    this.ivrsForm = this.fb.group({
      ivrs: ['', Validators.compose([Validators.required, Validators.maxLength(11), Validators.pattern("^[NH][0-9_-]{10,10}$")])]
    })

  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {

    if (this.ivrsForm.invalid) {
      this.notificationService.warn('Invalid Form !');
      return
    } else {
      // N2388006237
      this.consumerApplicationService.getDetailsByIvrsNo(this.ivrsForm.value.ivrs).subscribe((data: any) => {
        console.log(data, "data................................");

        if (data.status == 200) {
          this.notificationService.success('Data Retrieve Successfully');
          this.IvrsData = data.object[0]
          this.showTable = true;
        } else {
          this.notificationService.error('कृप्या सही IVRS नंबर दर्ज करे।')
          this.showTable = false;
          return
        }
      })

    }


  }


  onCheckboxCheck(e:any){
console.log(e,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

this.checkboxCheck = e.target.checked
  }


  onDataSubmit() {
    if(this.checkboxCheck==false){
      this.notificationService.error('कृप्या check box का चयन करें।');
      return
    }else{
      console.log(this.IvrsData, "IvrsData..................IvrsData.   ");
      this.payload.connectionDate = this.IvrsData?.connection_date
      this.payload.primaryMobileNo = this.IvrsData?.primary_mobile_no
      this.payload.locationCode = this.IvrsData?.location_code
      this.payload.tariffCategory = this.IvrsData?.tariff_category
      this.payload.createdOn = this.IvrsData?.created_on
      this.payload.premiseType = this.IvrsData?.premise_type
      this.payload.contractDemand = this.IvrsData?.contract_demand
      this.payload.sanctionedLoadUnit = this.IvrsData?.sanctioned_load_unit
      this.payload.contractDemandUnit = this.IvrsData?.contract_demand_unit
      this.payload.consumerName = this.IvrsData?.consumer_name
      this.payload.readingDiaryNo = this.IvrsData?.reading_diary_no
      this.payload.sanctionedLoad = this.IvrsData?.sanctioned_load
      this.payload.tariffCode = this.IvrsData?.tariff_code
      this.payload.feederName = this.IvrsData?.feeder_name
      this.payload.groupNo = this.IvrsData?.group_no
      this.payload.address = this.IvrsData?.address
      this.payload.purposeOfInstallation = this.IvrsData?.purpose_of_installation
      this.payload.meteringStatus = this.IvrsData?.metering_status
      this.payload.connectionType = this.IvrsData?.connection_type
      this.payload.dtrName = this.IvrsData?.dtr_name
      this.payload.ivrs = this.IvrsData?.ivrs
      this.payload.phase = this.IvrsData?.phase
      this.payload.consumerApplicationNo = this.consumerApplicationDetail.consumerApplicationNo
  
      this.consumerApplicationService.submitIvrsDetails(this.payload).subscribe((resp: any) => {
        console.log(resp, "rrrrrreeeeesssssppppppppppppppppppppppppp..................................................");
        if(resp.code=="200"){
          this.notificationService.success("Data Submitted Successfully !");
          this.onClose();
        }else{
          this.notificationService.warn(resp.message);
          return;
        }
  
      })
    }
   


  }


}
