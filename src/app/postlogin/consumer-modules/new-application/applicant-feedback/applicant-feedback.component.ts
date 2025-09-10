import { Component, Inject, OnInit } from '@angular/core';
import { NewApplicationService } from '../../services/new-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-applicant-feedback',
  templateUrl: './applicant-feedback.component.html',
  styleUrls: ['./applicant-feedback.component.css']
})
export class ApplicantFeedbackComponent implements OnInit {

  feedbackForm:FormGroup
  submitted :boolean=false;
  // for star rating code start here.
 maxRating: number = 5 ;
 initialRating: number =4;
 optionBoolean:boolean = false;
  stars:any;
  currentRating: number =0;
  chooseRating:boolean = false;
  feedbackOptionArray:Array<any> = [
    {"id": 5, "value":"Excellent","name":"Excellent"},
    {"id": 4, "value":"Good","name":"Good"},
    {"id": 3, "value":"Average","name":"Average"},
    {"id": 2, "value":"Bad","name":"Bad"},
    {"id": 1, "value":"VeryBad","name":"Very Bad"},
  ]
  
  constructor(
    private newApplicationService: NewApplicationService,
    private notification: NotificationService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ApplicantFeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.stars = Array(this.maxRating).fill(0).map((_, i) => i + 1);
    this.currentRating = this.initialRating || 0;

   }


   //////////////////////////////////////////////////////////////////

 
   onfeedbackOptionSelect(e:any){
    this.chooseRating = true;
    this.optionBoolean = true;
    console.log(e.target.value,"eeeeeeee");
    if(e.target.value=="Excellent"){
      this.rate(5);
    }else if(e.target.value=="Good"){
      this.rate(4);
    }else if(e.target.value=="Average"){
      this.rate(3);
    }else if(e.target.value=="Bad"){
      this.rate(2);
    }else if(e.target.value=="VeryBad"){
      this.rate(1);
    }else{

    }
    
    //this.rate(1);
   }
 

  rate(rating: number) {
   this.currentRating = rating;
   console.log(rating,"rating....................");
   this.feedbackForm.value.ratings=rating;
   this.chooseRating = true;

   if(rating==1){
    this.feedbackForm.get("feedbackOption").setValue("VeryBad");
    this.feedbackForm.get("ratings").setValue(1);
   }else if(rating==2){
    this.feedbackForm.get("feedbackOption").setValue("Bad");
    this.feedbackForm.get("ratings").setValue(2);

   }else if(rating==3){
    this.feedbackForm.get("feedbackOption").setValue("Average");
    this.feedbackForm.get("ratings").setValue(3);

   }else if(rating==4){
    this.feedbackForm.get("feedbackOption").setValue(4);
    this.feedbackForm.get("ratings").setValue("Good");

   }else if(rating==5){
    this.feedbackForm.get("feedbackOption").setValue("Excellent");
    this.feedbackForm.get("ratings").setValue(5);

   }else{

   } 
 }
       // for star rating code end here.



   ///////////////////////////////////////////////////////////////////////////

   buildForm(){
  this.feedbackForm =  this.fb.group({
      consumerApplicationNo: [this.data?.consumerApplicationNo,Validators.required],
      feedback: ["",Validators.required],
      ratings: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      feedbackOption:["",Validators.required]
    })
   }

  ngOnInit(): void {
this.buildForm();
  }

  get FeedbackControls() {
    return this.feedbackForm.controls;
  }

  onClose() {
    this.dialogRef.close();
  }


  onSubmit(){
    this.submitted  = true

    if(this.feedbackForm.invalid){
      this.notification.error("Invalid Form !")
      return
    }else{
      console.log(this.chooseRating ,"this.chooseRating ",this.feedbackForm.value.ratings,"this.feedbackForm.value.ratings");
      
      if(this.chooseRating ==false || this.feedbackForm.value.ratings==0){
        this.notification.warn("Please ! give rating first");
        return;
      }
      // this.newApplicationService.getConsumerApplicationDetailsByConsumerApplicationNumber.


      this.newApplicationService.feedbackByConsumer(this.feedbackForm.value).subscribe((resp:any)=>{
        console.log(resp,"rrrrrreeeeeeessssssspppppppppp......................");
        if(resp?.code=="201"){
          this.notification.success("Feedback Submitted Successfully");
          this.onClose();
        }else{
          this.notification.warn(resp?.message);
          return
        }
        
      },(error:any)=>{
        this.notification.error(error);
        return
      }
    )
    }

    // this.newApplicationService.feedbackByConsumer
  }

}
