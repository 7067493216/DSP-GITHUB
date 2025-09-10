import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
@Component({
  selector: 'app-lt11-kv-list',
  templateUrl: './lt11-kv-list.component.html',
  styleUrls: ['./lt11-kv-list.component.css']
})
export class Lt11KvListComponent implements OnInit {
  it11KvListForm:FormGroup;
  submitted: boolean = false;
  it11KvListArray:any;
  constructor(private fb: FormBuilder,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<Lt11KvListComponent>,
    private consumerApplicationService:ConsumerApplicationService
  ) { }
  ngOnInit(): void {
    this.dtrListFormGroup()
    this.getAllIt11KvList()
  }


  dtrListFormGroup() {
    this.it11KvListForm = this.fb.group({
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
    return this.it11KvListForm.controls;
      }
  onClose(){
    this.dialogRef.close();
  }

  onSubmit(){
    this.it11KvListForm.value.consumerApplicationId = this.data.consumerApplicationId;
    this.submitted = true;
    console.log( this.it11KvListForm)
    if(this.it11KvListForm.invalid){
      return
    }

    this.consumerApplicationService.submitIt11KvList(this.it11KvListForm.value).subscribe((data:any)=>{
      console.log(data,"iiitttttt11kkkvvvlllliiiisssstttttt44444444444444444444444444");
      if(data?.code  == '200' ){
        this.notificationService.success("Submit Successfully");
        this.getAllIt11KvList();
        this.onClose();
      }else{
        this.notificationService.warn(data?.message);
        return
      }
    })
  }

  getAllIt11KvList(){
    this.consumerApplicationService.GetIt11KvSubmitList(this.data.consumerApplicationId).subscribe((data:any)=>{
      console.log(data,"dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd111@@@@@@@@@@");
      this.it11KvListArray = data.list[0];
    })
  }

}