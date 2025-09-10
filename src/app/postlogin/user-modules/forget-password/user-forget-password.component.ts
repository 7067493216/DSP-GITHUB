import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { otpPattern, mobPattern } from "src/app/utils/app-validators";

import { takeUntil, finalize } from "rxjs/operators";
import { Subject } from "rxjs";
import { NotificationService } from "src/app/shared-services/notification.service";
import { SpinnerService } from "src/app/shared-services/spinner.service";
import { UserLoginService } from "../services/user-login.service";
import { OtpLoginModel } from "../models/otp-login-models";
// import { OtpLoginModel } from "../models/otp-login-model";

@Component({
  selector: "app-user-forget-password",
  templateUrl: "./user-forget-password.component.html",
  styleUrls: ["./user-forget-password.component.css"],
})
export class UserForgetPasswordComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject();
  forgotPasswordForm: FormGroup;
  invalidUser: boolean = false;
  enabledOTP: boolean = false;
  enableOtpbutton: boolean = true;
  enableotpfield: boolean = false;
  showForm: boolean = false;
  otpmodel: OtpLoginModel = new OtpLoginModel();
  userMobilNo: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userLoginService: UserLoginService,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    if (this.userLoginService.currentUserName != null) {
      this.router.navigate(["/user/dashboard"]);
      sessionStorage.removeItem("SearchKey");
      this.showForm = false;
    } else {
      this.showForm = true;
      this.forgotPasswordForm = this.formBuilder.group({
        // mobileNo: ['', Validators.compose([Validators.required, mobPattern])],
        userId: ["", Validators.compose([Validators.required])],
        otp: ["", Validators.compose([Validators.required])],
      });
    }
  }
  // getOtp() {
  //   const spinnerRef = this.spinnerService.start();
  //   this.userLoginService.getOtp(this.forgotPasswordForm.value).pipe(takeUntil(this.unsubscribe$), finalize(() => this.spinnerService.stop(spinnerRef))).subscribe(
  //     (response) => {

  //       if (response['code'] === '200') {
  //         this.invalidUser = false;
  //         this.enabledOTP = true;
  //         this.forgotPasswordForm.controls["otp"].markAsUntouched();
  //         this.notificationService.success('OTP has been sent to your mobile');
  //       } else if (response['code'] === '100') {
  //         this.invalidUser = true;
  //         this.enabledOTP = false;
  //         this.notificationService.warn(response['message']);
  //       } else {
  //         this.notificationService.warn(response['message']);
  //         this.enabledOTP = false;
  //       }
  //     },
  //   );
  // }
  //===================new getotp===================
  enableOtpButton() {
    this.enableOtpbutton = false;
  }
  getOtp2() {
    const spinnerRef = this.spinnerService.start();
    this.userLoginService
      .getUserByuserId(this.forgotPasswordForm.value.userId)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => this.spinnerService.stop(spinnerRef))
      )
      .subscribe((response) => {

        console.log(response,"bawalkar sirrrrrrrrrrrrrrrrrrrrrrr");
        
        if (response["code"] === "200") {
          this.enabledOTP = false;

          console.log(
            this.forgotPasswordForm,
            "this.forgotPasswordForm........ppppppppppppppp"
          );

          //if valid user then send otp to registered mobile no
          if (response.list.length !== 0) {
            this.notificationService.success(
              "OTP has been sent to your mobile" + response.list[0].mobileNo
            );
            this.userMobilNo = response.list[0].mobileNo;
            this.enableotpfield = true;
            this.otpmodel.mobileNo = response.list[0].mobileNo;
            this.otpmodel.source = "DSP ForgotPassword";
            // call new otp method=======================================
            this.userLoginService.getUserLoginOtp(this.otpmodel).subscribe(
              (res) => {
                if (res.code == "200") {
                  // enable otp field
                  this.enableotpfield = true;
                  this.enabledOTP = true;

                  console.log(this.enabledOTP, "showotpppppppppppppppp");
                } else {
                  this.enableotpfield = false;
                  this.enabledOTP = false;
                  this.notificationService.warn("Problem in sending otp");
                }
              },
              (error) => {
                this.enableotpfield = false;

                this.notificationService.warn("Problem in sending otp");
              }
            );
            //==============================================================
          } else {
            //otherwise show that  user id is invalid
            this.invalidUser = true;
          }

          //use  newotp method to get otp
          //if  sent then
          // this.notificationService.success('OTP has been sent to your mobile');
          // then verify otp by new method

          // this.router.navigate(["/user/change-password"]);
        } else {
          this.notificationService.warn(response["message"]);
        }
      });
  }

  //==================== old method=============================
  // onSubmit() {
  //   const spinnerRef = this.spinnerService.start();
  //   this.userLoginService
  //     .forgotPassword(this.forgotPasswordForm.value)
  //     .pipe(
  //       takeUntil(this.unsubscribe$),
  //       finalize(() => this.spinnerService.stop(spinnerRef))
  //     )
  //     .subscribe((response) => {
  //       if (response["code"] === "200") {
  //         this.enabledOTP = false;
  //         this.notificationService.success(response["message"]);
  //         this.router.navigate(["/user/login"]);
  //       } else {
  //         this.notificationService.warn(response["message"]);
  //       }
  //     });
  // }
  //=============================================================
  //======== new method==============================
  onSubmit2() {
    this.otpmodel.mobileNo = this.userMobilNo;
    this.otpmodel.otp = this.forgotPasswordForm.value.otp;
    this.otpmodel.source = "DSP ForgotPassword";

    console.log(this.otpmodel, "tosubmitttttttttttt");

    // verifyOtp
    if (this.forgotPasswordForm.valid) {
      this.userLoginService.verifyOtp(this.otpmodel).subscribe(
        (res) => {
          if (res.code == "200") {
            console.log(this.forgotPasswordForm.value.userId, "userid");

            this.router.navigate(["/user/reset-password"], {
              state: { userid: this.forgotPasswordForm.value.userId },
            });
          } else {
            this.notificationService.warn("Invalid OTP");
            return;
          }
        },
        (error) => {
          this.notificationService.warn("Invalid OTP");
          return;
        }
      );
    } else {
      return;
    }
  }
  //=====================================================

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  // public noWhitespaceValidator(control: FormControl) {
  //   const isWhitespace = control.value.trim().length === 0;
  //   const isValid = !isWhitespace;
  //   return isValid ? null : { whitespace: true };
  // }
}