import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DownloadFeestypeReciept } from '../postlogin/user-modules/models/downloadFeestypeReciept';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { NewApplicationService } from '../postlogin/consumer-modules/services/new-application.service';
import { NotificationService } from '../shared-services/notification.service';

@Component({
  selector: 'app-registration-reciept',
  templateUrl: './registration-reciept.component.html',
  styleUrls: ['./registration-reciept.component.css']
})
export class RegistrationRecieptComponent implements OnInit {

  registrationForm:FormGroup
  downloadFeestypeReciept: DownloadFeestypeReciept = new DownloadFeestypeReciept() ;
  constructor(
    private fb:FormBuilder,
    private url: GenerateUrl,
    private newApplicationService: NewApplicationService,
    private notification: NotificationService
  ) { 
    this.registrationForm = this.fb.group({
      applicationNumber:["",Validators.required]
    })
  }

  onSubmit(){
    if(this.registrationForm.invalid){
      this.notification.error("Please Enter Application Number");
      return
    }else{
      this.downloadFeestypeReciept.consumerApplicationNumber = this.registrationForm.value.applicationNumber;
      let id = 1;
      this.downloadFeestypeReciept.slipGenretatedId = JSON.stringify(id);
      window.open(this.url.consumerContextPath + '/bill-desk/fees_genreted_recipt/'+ this.downloadFeestypeReciept.consumerApplicationNumber + '/' + this.downloadFeestypeReciept.slipGenretatedId);
    }
 }



  ngOnInit(): void {
  }

}
