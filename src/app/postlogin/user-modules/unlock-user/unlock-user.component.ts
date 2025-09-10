import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserLoginService } from '../services/user-login.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NotificationService } from 'src/app/shared-services/notification.service';

@Component({
  selector: 'app-unlock-user',
  templateUrl: './unlock-user.component.html',
  styleUrls: ['./unlock-user.component.css']
})
export class UnlockUserComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();

  userUnlockForm:FormGroup;
useridFieldShouldbeHidden:boolean=false;
invalidUser: boolean = false;
  enabledOTP: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<UnlockUserComponent>,
  private fb:FormBuilder,
  private userLoginService: UserLoginService,
  private spinnerService: SpinnerService,
  private notificationService: NotificationService,

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
// const spinnerRef = this.spinnerService.start();
// this.userLoginService.getOtp(this.userUnlockForm.value).pipe(takeUntil(this.unsubscribe$), finalize(() => this.spinnerService.stop(spinnerRef))).subscribe(
//   (response) => {

//     if (response['code'] === '200') {
//       this.invalidUser = false;
//       this.enabledOTP = true;
//       this.userUnlockForm.controls["otp"].markAsUntouched();
//       this.notificationService.success('OTP has been sent to your mobile');
//     } else if (response['code'] === '100') {
//       this.invalidUser = true;
//       this.enabledOTP = false;
//       this.notificationService.warn(response['message']);
//     } else {
//       this.notificationService.warn(response['message']);
//       this.enabledOTP = false;
//     }
//   },
// );
}


  onClose(){
    this.dialogRef.close();
  }

}
