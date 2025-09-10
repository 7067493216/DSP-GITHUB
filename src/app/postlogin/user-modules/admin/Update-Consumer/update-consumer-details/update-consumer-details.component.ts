import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLoginService } from '../../../services/user-login.service';
import { NotificationService } from 'src/app/shared-services/notification.service';

@Component({
  selector: 'app-update-consumer-details',
  templateUrl: './update-consumer-details.component.html',
  styleUrls: ['./update-consumer-details.component.css']
})
export class UpdateConsumerDetailsComponent implements OnInit {
  searchForm:FormGroup;
  submitForm:FormGroup;
  consumerDetails:any;

  constructor(
    private fb:FormBuilder,
    private userLoginService:UserLoginService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.serchForm();
    this.builtSubmitForm()
  }

  serchForm(){
    this.searchForm = this.fb.group({
      userId:['',Validators.required]
    })
  }

  onSearch(){
    this.userLoginService.getUserDetails(this.searchForm.value.userId).subscribe((data:any)=>{
      console.log(data,"dddaaaattatattaa......................................");
      if(data.code=="200"){
        this.notificationService.success('Data Retrieve Successfully !');
        this.consumerDetails = data.list[0];
        this.submitForm.get('name').setValue(data.list[0].consumerName);
        this.submitForm.get('address').setValue(data.list[0].address);
        this.submitForm.get('mobileNo').setValue(data.list[0].consumerMobileNo);
      }else{
        this.notificationService.warn(data.message);
        return
      }
    },
  (error:any)=>{
    console.log(error,"errorrrr......");
    
  }
  )
  }

  builtSubmitForm(){
    this.submitForm = this.fb.group({
      name:['',Validators.required],
      address:['',Validators.required],
      mobileNo:['',Validators.required]
    })
  }

  onSubmit(){
    
  }

}
