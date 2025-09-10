import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';

@Component({
  selector: 'app-dtr-list',
  templateUrl: './dtr-list.component.html',
  styleUrls: ['./dtr-list.component.css']
})
export class DtrListComponent implements OnInit {

  dtrListForm: FormGroup;
  submitted: boolean = false;
  drtListArray:any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DtrListComponent>,
    private consumerApplicationService:ConsumerApplicationService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getDtrAllList();
    console.log(this.data,"oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo");
    
    this.dtrListFormGroup()
  }


  dtrListFormGroup() {
    this.dtrListForm = this.fb.group({
      consumerApplicationId: [''],
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
    return this.dtrListForm.controls;
      }

 

  onSubmit(){
    this.dtrListForm.value.consumerApplicationId = this.data.consumerApplicationId;

    console.log(this.data.consumerApplicationId,'1111111111111111111111111111111111')
    console.log( this.dtrListForm.value.consumerApplicationId,'2222222222222222222222222')

    this.submitted = true;
    if(this.dtrListForm.invalid){
      return
    }

    this.consumerApplicationService.submitDtrList(this.dtrListForm.value).subscribe((data:any)=>{
      console.log(data,"dttttrrrrrrllliiisstttt11111111111111");
      if(data.code  == '200' ){
        this.notificationService.success("Submit Successfully");
        this.getDtrAllList();
        this.onClose();
      }else{
        this.notificationService.warn(data?.message);
        return
      }
    })
  }

  getDtrAllList(){
    console.log(this.data.consumerApplicationId,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    this.consumerApplicationService.GetDtrSubmitList(this.data.consumerApplicationId).subscribe((data:any)=>{
console.log(data,"llllllllllllllllllllllllllllllllllllllllllllllllllljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
this.drtListArray = data.list[0];

    })
  }

  onClose() {
    this.dialogRef.close(this.drtListArray);
  }

}