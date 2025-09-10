import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewApplicationService } from '../../services/new-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';

@Component({
  selector: 'app-applicant-complain',
  templateUrl: './applicant-complain.component.html',
  styleUrls: ['./applicant-complain.component.css']
})
export class ApplicantComplainComponent implements OnInit {
  complainForm: FormGroup;
  complainList:any;
  chat:Array<any>=[
    {"id":1, "consumerType":"consumer","text":"hii" },
    {"id":2, "consumerType":"user","text":"hii" },
    {"id":3, "consumerType":"consumer","text":"how are you" },
    {"id":4, "consumerType":"user","text":"fine" },
    {"id":5, "consumerType":"user","text":"n u" },
    {"id":6, "consumerType":"consumer","text":"also fine" },

    {"id":7, "consumerType":"consumer","text":"hii" },
    {"id":8, "consumerType":"user","text":"hii" },
    {"id":3, "consumerType":"consumer","text":"how are you" },
    {"id":9, "consumerType":"user","text":"fine" },
    {"id":10, "consumerType":"user","text":"n u" },
    {"id":11, "consumerType":"consumer","text":"also fine jdhudhueduhued suduyuyduyduyduyudufudyfudyfudufduyfudfudufud" },

    {"id":12, "consumerType":"consumer","text":"hii" },
    {"id":13, "consumerType":"user","text":"hii" },
    {"id":14, "consumerType":"consumer","text":"how are you" },
    {"id":15, "consumerType":"user","text":"fine" },
    {"id":16, "consumerType":"user","text":"n u" },
    {"id":17, "consumerType":"consumer","text":"also fine" },

    {"id":18, "consumerType":"consumer","text":"hii" },
    {"id":19, "consumerType":"user","text":"hii" },
    {"id":20, "consumerType":"consumer","text":"how are you" },
    {"id":21, "consumerType":"user","text":"fine" },
    {"id":22, "consumerType":"user","text":"n u" },
    {"id":23, "consumerType":"consumer","text":"also fine" },
   
  ];
  messageArrayLength:any;


  constructor(
    private newApplicationService: NewApplicationService,
    private notification: NotificationService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ApplicantComplainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {


  }

  buildForm() {
    this.complainForm = this.fb.group({
      feedback: ["", Validators.required],
      consumerApplicationNo: [this.data.consumerApplicationNo, Validators.required],
      typeOfUser:["consumer"]
    })
  }


  getAllComplainOfConsumer(){
    this.newApplicationService.getAllComplainByConsumer(this.data.consumerApplicationNo).subscribe((resp:any)=>{
      if(resp.code=="200"){
        this.complainList = resp.list;
        if(this.messageArrayLength!=undefined && this.complainList>this.messageArrayLength){
          setTimeout(() => {
            this.getAllComplainOfConsumer();
          }, 30000);
          }else
        console.log(this.complainList ,"this.complainList ");
        
      }else{
       // return
      }
    })
  }


  getAllComplainOfConsumerAfterTyping(){
    this.newApplicationService.getAllComplainByConsumer(this.data.consumerApplicationNo).subscribe((resp:any)=>{
      if(resp.code=="200"){
        this.complainList = resp.list;
        this.messageArrayLength = this.complainList?.length;
        setTimeout(() => {
          this.getAllComplainOfConsumer();
        }, 30000);
        console.log(this.complainList ,"this.complainList ");
        
      }else{
       // return
      }
    })
  }

  ngOnInit(): void {
    this.getAllComplainOfConsumer();
    this.buildForm();
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {

    if (this.complainForm.invalid) {
      this.notification.error("Invalid Form !");
      return;
    } else {
      this.newApplicationService.ComplainCreatedByConsumer(this.complainForm.value).subscribe((data: any) => {
        console.log(data, "dddaaaatattatatataaaa................................");
        if (data.code == "201") {
          this.getAllComplainOfConsumerAfterTyping();
          this.complainForm.get('feedback').reset();
         // this.notification.success("Complain Generated Successfully");
         // this.onClose();
        } else {
          this.notification.warn(data.message);
          return;
        }

      })
    }

    // this.ComplainCreatedByConsumer
  }

}
