import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DownloadFeestypeReciept } from '../postlogin/user-modules/models/downloadFeestypeReciept';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { NotificationService } from '../shared-services/notification.service';
import { NewApplicationService } from '../postlogin/consumer-modules/services/new-application.service';

@Component({
  selector: 'app-demaand-reciept',
  templateUrl: './demaand-reciept.component.html',
  styleUrls: ['./demaand-reciept.component.css']
})
export class DemaandRecieptComponent implements OnInit {
  demandForm:FormGroup;
  downloadFeestypeReciept: DownloadFeestypeReciept = new DownloadFeestypeReciept() ;

  constructor(
    private fb:FormBuilder,
    private url: GenerateUrl,
    private newApplicationService: NewApplicationService,
    private notification: NotificationService
  ) { 
    this.demandForm = this.fb.group({
      applicationNumber:["",Validators.required]
    })
  }

  onSubmit(){
    if(this.demandForm.invalid){
      this.notification.error("Please Enter Application Number");
      return
    }else{
      this.downloadFeestypeReciept.consumerApplicationNumber = this.demandForm.value.applicationNumber;
      let id = 2;
      this.downloadFeestypeReciept.slipGenretatedId = JSON.stringify(id);
      window.open(this.url.consumerContextPath + '/bill-desk/fees_genreted_recipt/'+ this.downloadFeestypeReciept.consumerApplicationNumber + '/' + this.downloadFeestypeReciept.slipGenretatedId);
    }

   
    // console.log(consumerApplicationNo, "consumerApplicationNo1111111111111111111111111111111111",this.url.consumerContextPath + '/bill-desk/fees_genreted_recipt/'+ this.downloadFeestypeReciept.consumerApplicationNumber + '/' + this.downloadFeestypeReciept.slipGenretatedId);
  }

  ngOnInit(): void {
  }

}
