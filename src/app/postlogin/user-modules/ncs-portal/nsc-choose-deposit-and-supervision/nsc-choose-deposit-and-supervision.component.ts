import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewApplicationService } from 'src/app/postlogin/consumer-modules/services/new-application.service';
import { RedirectGatewayService } from 'src/app/postlogin/consumer-modules/services/redirect-gateway.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { NscApiService } from '../../services/nsc-api.service';

@Component({
  selector: 'app-nsc-choose-deposit-and-supervision',
  templateUrl: './nsc-choose-deposit-and-supervision.component.html',
  styleUrls: ['./nsc-choose-deposit-and-supervision.component.css']
})
export class NscChooseDepositAndSupervisionComponent implements OnInit {

  nscChooseDepositAndSupervision:FormGroup;
dropDownVlue:any;
userContextPath =this.url.userContextPath;
nscDataa:any;

recievedNSCID:any;

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<NscChooseDepositAndSupervisionComponent>,
  private fb:FormBuilder,
  private redirectGateway: RedirectGatewayService,
        private spinnerService: SpinnerService,
        private url: GenerateUrl,
        private http: HttpClient,
        private newApplicationService: NewApplicationService,
        private notificationService: NotificationService,
        private nscApiService:NscApiService
  ) { 
    console.log(data,"ffffffffffffffffffffffffffffffffffff");
    this.recievedNSCID = data.nscId;
  }

  ngOnInit(): void {
    
    
  this.nscChooseDepositAndSupervision = this.fb.group({
    nscId:["",Validators.required],
    schemaTypeId:["",Validators.required]
    

  })
this.getData();

  }

  async getData(){
 let nscDAta:any =   await this.http.get(this.userContextPath + '/nsc-data/nscdata/' + this.recievedNSCID).toPromise();
 console.log('consumerApplicationDaetail*************************************', nscDAta);

        console.log('consumerApplicationDaetail*************************************', nscDAta.code);
        
        if (nscDAta['code'] == "200") {
            this.nscDataa = nscDAta.list[0];
            console.log('consumerApplicationDetail----????????????????????????????????????????????', this.nscDataa);
        }
      }

    onChangeSelectedSchemeType(e:any){
    console.log(e,"rrrrrrrrrrrrrrrr");
    this.dropDownVlue = e;

    this.nscChooseDepositAndSupervision.controls['nscId'].setValue(this.recievedNSCID);
  }


  



  onClose(){
    this.dialogRef.close();

  }

  OnSubmit(nscApplicationId:any){
    console.log(this.nscChooseDepositAndSupervision.value);
    
    console.log(nscApplicationId,"JJJJJJJJJJJJJJJJJJJJJJJJJJJ");
    
if(this.nscChooseDepositAndSupervision.invalid){
  return;
}

this.nscApiService.AddNscDataToDsp(this.nscChooseDepositAndSupervision.value).subscribe((data:any)=>{
  console.log(data,"ddddatattatattatattaattat");
  if(data.code == "201"){

    this.notificationService.success(data['message']);
    this.dialogRef.close();
  }
  
})


  }

}
