import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
@Component({
  selector: 'app-ht33-kv-list',
  templateUrl: './ht33-kv-list.component.html',
  styleUrls: ['./ht33-kv-list.component.css']
})
export class HT33KvListComponent implements OnInit {

  ht33kvListForm:FormGroup;
  submitted: boolean = false;
  htListArray:any;
  disableSubmitBoolean:boolean = false; 
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<HT33KvListComponent>,
    private consumerApplicationService:ConsumerApplicationService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.dtrListFormGroup();
    this.getAllHtList();
  }



  dtrListFormGroup() {
    this.ht33kvListForm = this.fb.group({
      checkBox1: ['', Validators.required],
      checkBox2: ['', Validators.required],
      checkBox3: ['', Validators.required],
      checkBox4: ['', Validators.required],
      checkBox5: ['', Validators.required],
      checkBox6: ['', Validators.required],
      checkBox7: ['', Validators.required],
      checkBox8: ['', Validators.required],
      checkBox9: ['', Validators.required],
      checkBox10: ['', Validators.required],
      checkBox11: ['', Validators.required],
      checkBox12: ['', Validators.required],
      checkBox13: ['', Validators.required],
      checkBox14: ['', Validators.required],
      checkBox15: ['', Validators.required],
      checkBox16: ['', Validators.required],
      checkBox17: ['', Validators.required],
      checkBox18: ['', Validators.required],
      checkBox19: ['', Validators.required],
      checkBox20: ['', Validators.required],
      checkBox21: ['', Validators.required],
      checkBox22: ['', Validators.required],
      checkBox23: ['', Validators.required],
      
    })
  }


  get formControl(){
    return this.ht33kvListForm.controls;
      }

  onClose(){
    this.dialogRef.close();
}

onSubmit(){
  this.ht33kvListForm.value.consumerApplicationId = this.data.consumerApplicationId;
  this.submitted = true;
  if(this.ht33kvListForm.invalid){
    return
  }

  this.consumerApplicationService.submitHt33KvList(this.ht33kvListForm.value).subscribe((data:any)=>{
    console.log(data,"hhttt333kkvvvvlllliisssstttttt22222222222222222");
    if(data.code  == '200' ){
      this.notificationService.success("Submit Successfully");
      this.getAllHtList();
      this.onClose();
    }else{
      this.notificationService.warn(data?.message);
      return
    }
  })
}



getAllHtList() {
  this.consumerApplicationService.GetHt33KvSubmitList(this.data.consumerApplicationId).subscribe((data: any) => {
    console.log(data, "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd111@@@@@@@@@@");

    if (data.code == "200") {
      this.htListArray = data?.list[0];
      console.log(this.htListArray, "this.htListArray************************************");
      if( this.htListArray!=null){
        this.disableSubmitBoolean = true; 
      }else{
        this.disableSubmitBoolean = false; 
      }
    }
  })
}

}