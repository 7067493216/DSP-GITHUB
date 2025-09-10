import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
@Component({
  selector: 'app-lt-list',
  templateUrl: './lt-list.component.html',
  styleUrls: ['./lt-list.component.css']
})
export class LtListComponent implements OnInit {
  itListForm:FormGroup;
  submitted: boolean = false;
  itListArray:any;
  constructor(
    private notificationService: NotificationService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<LtListComponent>,
    private consumerApplicationService:ConsumerApplicationService
  ) { }

  ngOnInit(): void {
    this.dtrListFormGroup();
    this.getAllItList();
  }

  dtrListFormGroup() {
    this.itListForm = this.fb.group({
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
    return this.itListForm.controls;
      }

  onClose(){
    this.dialogRef.close();
  }

  onSubmit(){
    this.itListForm.value.consumerApplicationId = this.data.consumerApplicationId;
    this.submitted = true;
    console.log(this.itListForm)
    if(this.itListForm.invalid){
      return
    }

    this.consumerApplicationService.submitItList(this.itListForm.value).subscribe((data:any)=>{
      console.log(data,"iiittttllliiisstttttttt3333333333333333333333333333");
      if(data?.code  == '200' ){
        this.notificationService.success("Submit Successfully");
        this.getAllItList();
        this.onClose();
      }else{
        this.notificationService.warn(data?.message);
        return
      }
      
    })
  }

  getAllItList(){
    this.consumerApplicationService.GetItSubmitList(this.data.consumerApplicationId).subscribe((data:any)=>{
      console.log(data,"dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd111@@@@@@@@@@");
      this.itListArray = data.list[0];
    })
  }

}