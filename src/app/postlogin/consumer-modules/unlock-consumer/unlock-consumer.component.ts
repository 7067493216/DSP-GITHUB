
import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unlock-consumer',
  templateUrl: './unlock-consumer.component.html',
  styleUrls: ['./unlock-consumer.component.css']
})
export class UnlockConsumerComponent implements OnInit {

  userUnlockForm:FormGroup;
useridFieldShouldbeHidden:boolean=false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<UnlockConsumerComponent>,
  private fb:FormBuilder,

  ) { }

  ngOnInit(): void {
    this.unlockTheForm()
  }

unlockTheForm(){
  this.userUnlockForm = this.fb.group({
    userId:["",Validators.required],
    otp:["",Validators.required]
  })
}

getOtp(){
this.useridFieldShouldbeHidden = true;
}


  onClose(){
    this.dialogRef.close();
  }
}


