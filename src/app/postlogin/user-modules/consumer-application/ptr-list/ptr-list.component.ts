import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
@Component({
  selector: 'app-ptr-list',
  templateUrl: './ptr-list.component.html',
  styleUrls: ['./ptr-list.component.css']
})
export class PtrListComponent implements OnInit {
  ptrListForm: FormGroup;
  submitted: boolean = false;
  ptrListArray:any;
  constructor(  private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<PtrListComponent>,
    private consumerApplicationService:ConsumerApplicationService
  ) { }

  ngOnInit(): void {
    this.dtrListFormGroup()
    this.getAllPtrList()
  }


  dtrListFormGroup() {
    this.ptrListForm = this.fb.group({
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
      checkBox24: ['', Validators.required],
      checkBox25: ['', Validators.required],
      checkBox26: ['', Validators.required],
      checkBox27: ['', Validators.required],
      checkBox28: ['', Validators.required],
      checkBox29: ['', Validators.required],
      checkBox30: ['', Validators.required]
    })
  }


  get formControl(){
    return this.ptrListForm.controls;
      }


  onClose(){
    this.dialogRef.close();
}

onSubmit(){
  this.ptrListForm.value.consumerApplicationId = this.data.consumerApplicationId;
  this.submitted = true;
  if(this.ptrListForm.invalid){
    return
  }

  this.consumerApplicationService.submitPtrList(this.ptrListForm.value).subscribe((data:any)=>{
    console.log(data,"pppptttrrrrllliiiissttttttttt55555555555555");
    if(data?.code  == '200' ){
      this.notificationService.success("Submit Successfully");
      this.getAllPtrList();
      this.onClose();
    }else{
      this.notificationService.warn(data?.message);
    }
  })
}

getAllPtrList(){
  this.consumerApplicationService.GetPtrSubmitList(this.data.consumerApplicationId).subscribe((data:any)=>{
    console.log(data,"dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd111@@@@@@@@@@");
    this.ptrListArray = data.list[0];
  })
}

}