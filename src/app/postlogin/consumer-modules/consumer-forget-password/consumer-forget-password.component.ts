import { Component, OnInit, OnDestroy } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { otpPattern, mobPattern } from "src/app/utils/app-validators";

import { takeUntil, finalize } from "rxjs/operators";
import { Subject } from "rxjs";
import { NotificationService } from "src/app/shared-services/notification.service";
import { SpinnerService } from "src/app/shared-services/spinner.service";
import { ConsumerLoginService } from "../services/consumer-login.service";
import { OtpViewModel } from "src/app/auth/authmodels/otp-view.model";

@Component({
  selector: "app-forget-password",
  templateUrl: "./consumer-forget-password.component.html",
  styleUrls: ["./consumer-forget-password.component.css"],
})
export class ConsumerForgetPasswordComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject();
  forgotPasswordForm: FormGroup;
  invalidUser: boolean = false;
  enabledOTP: boolean = false;
  showForm: boolean = false;
  consumer_mobileNo: any;
  otprequestmodel: OtpViewModel = new OtpViewModel();
  consumerDetailsForResetPassword:any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private consumerLoginService: ConsumerLoginService,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    if (this.consumerLoginService.currentConsumerName != null) {
      this.router.navigate(["/consumer-dashboard"]);
      sessionStorage.removeItem("SearchKey");
      this.showForm = false;
    } else {
      this.showForm = true;
      this.forgotPasswordForm = this.formBuilder.group({
        mobileNo: ["", Validators.compose([Validators.required, mobPattern])],
        otp: ["", Validators.compose([Validators.required])],
        // source: ["Forgot Password"],
      });
    }
  }
  // =========== old getotp metod========================================
  // getOtp() {
  //   const spinnerRef = this.spinnerService.start();
  //   this.consumerLoginService.getOtp(this.forgotPasswordForm.value).pipe(takeUntil(this.unsubscribe$), finalize(() => this.spinnerService.stop(spinnerRef))).subscribe(
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
  //=======================================================================
  //=====================new getotp========================================
  getOtp() {
    const spinnerRef = this.spinnerService.start();
    this.otprequestmodel.mobileNo = this.forgotPasswordForm.value.mobileNo;
    this.otprequestmodel.source = "DSP otpfor forgotpassword";
    //first verify user exist

    this.consumerLoginService
      .getConsumerByMobileNo(this.forgotPasswordForm.value.mobileNo)
      .subscribe(
        (res: any) => {
          console.log(res,"rrrrrrrrrrrrrrrrrrrrreeeeeeeeeeeeeeesssssssssssssssssssssssssssssssssssssss");
          
          if (res.code == "200") {
            this.spinnerService.stop(spinnerRef);
            this.consumerDetailsForResetPassword = res?.list[0]?.consumerLoginId;
            // if yes then call getotp method
            if (res.list !== null) {
              //start  if user exist
              // call get otp method
              this.consumerLoginService
                .getOtpforForgotPassword(this.otprequestmodel)
                .pipe(
                  takeUntil(this.unsubscribe$),
                  finalize(() => this.spinnerService.stop(spinnerRef))
                )
                .subscribe(
                  (res: any) => {
                    if (res.code == "200") {
                      this.invalidUser = false;
                      this.enabledOTP = true;
                      this.forgotPasswordForm.controls["otp"].markAsUntouched();
                      console.log(
                        res.list[0],
                        "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
                      );

                      this.notificationService.noDurationSuccess(
                        "OTP has been sent to your mobile" + res.list[0].mobile
                      );

                      this.consumer_mobileNo = res.list[0].mobile;
                    } else if (res.code === "100") {
                      this.invalidUser = true;
                      this.enabledOTP = false;
                      this.notificationService.warn(res.message);
                    } else if (res.code === "500") {
                      this.invalidUser = true;
                      this.enabledOTP = false;
                      this.notificationService.warn(
                        "please try after some time..!"
                      );
                    } else {
                      this.notificationService.warn(res.message);
                      this.enabledOTP = false;
                    }
                  },
                  (error) => {
                    this.notificationService.error(
                      "Problem!please try after some time..!"
                    );
                  }
                );
            } // end
            else if (res.code == "100") {
              //  If Consumer Mobile No. will not match with database
              this.notificationService.warn(res.message);
            } else if (res.code == "500") {
              //  If Consumer Mobile No. will not match with database
              this.notificationService.error(
                "Problem!Please try after some time"
              );
            } else {
              this.notificationService.warn(res.message);
            }
          } else {
            //else return warning user does not exist

            this.spinnerService.stop(spinnerRef);
            this.notificationService.warn("usernotFound");
          }
        },
        (error) => {
          this.spinnerService.stop(spinnerRef);
          this.notificationService.error("Problem!Please try after some time");
        }
      );
  }
  //=======================================================================
  //====================old submit method========================
  // onSubmit() {
  //   const spinnerRef = this.spinnerService.start();
  //   this.consumerLoginService
  //     .forgotPassword(this.forgotPasswordForm.value)
  //     .pipe(
  //       takeUntil(this.unsubscribe$),
  //       finalize(() => this.spinnerService.stop(spinnerRef))
  //     )
  //     .subscribe((response) => {
  //       if (response["code"] === "200") {
  //         this.enabledOTP = false;
  //         this.notificationService.success(response["message"]);
  //         this.router.navigate(["/consumer/login"]);
  //       } else {
  //         this.notificationService.warn(response["message"]);
  //       }
  //     });
  // }
  //==============================================================
  //===================new submit method==========================
  verifyOtp() {
    if (!this.forgotPasswordForm.valid) {
      return;
    } else {
      /////////////////////////////////////////////////////////////////////////////
      // first verify otp then redirect it to rest-password compo
      this.otprequestmodel.mobileNo = this.forgotPasswordForm.value.mobileNo;
      this.otprequestmodel.otp = this.forgotPasswordForm.value.otp;
      this.otprequestmodel.source = "DSP otpfor forgotpassword";
      console.log(
        this.otprequestmodel,
        "<<<<<<<<>>>>>>>>>>otp verification requestttttttttttttttttttttttt <<<<<<<<>>>>>>>>>>"
      );
      const spinnerRef = this.spinnerService.start();
      this.consumerLoginService
        .verifyOtpforForgotPassword(this.otprequestmodel)
        .pipe(
          takeUntil(this.unsubscribe$),
          finalize(() => this.spinnerService.stop(spinnerRef))
        )
        .subscribe(
          (response: any) => {
            console.log(
              response,
              "in verificationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"
            );
            if (response.code == "200") {
              //if verified then redirect it to reset password;
              sessionStorage.setItem("consumerDetailsForResetPassword",this.consumerDetailsForResetPassword);
              this.notificationService.info("OTP Verified Successfully");
              this.router.navigate(["/consumer/reset-password"], {
                state: { consumermobileno: this.consumer_mobileNo },
              });
            } else if (response.code == "500") {
              //stop spinner
              this.spinnerService.stop(spinnerRef);
              //warn user
              this.notificationService.warn(
                "Problem in user verification! Please try again after some time.."
              );
            } else {
              //stop spinner
              this.spinnerService.stop(spinnerRef);
              // //else show message
              this.notificationService.warn(response.message);
              return;
            }
          },
          (error) => {
            this.notificationService.warn(
              "Problem in user verification! Please try again after some time.."
            );
            return;
          }
        );
      ///////////////////////////////////////////////////
    }
  }
  //------------------------------------
  resendOtp() {
    const spinnerRef = this.spinnerService.start();
    this.consumerLoginService
      .getOtpforForgotPassword(this.otprequestmodel)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => this.spinnerService.stop(spinnerRef))
      )
      .subscribe(
        (res: any) => {
          if (res.code == "200") {
            this.invalidUser = false;
            this.enabledOTP = true;
            this.forgotPasswordForm.controls["otp"].markAsUntouched();
            console.log(
              res.list[0],
              "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
            );

            this.notificationService.noDurationSuccess(
              "OTP has been sent to your mobile" + res.list[0].mobile
            );

            this.consumer_mobileNo = res.list[0].mobile;
          } else if (res.code === "100") {
            this.invalidUser = true;
            this.enabledOTP = false;
            this.notificationService.warn(res.message);
          } else if (res.code === "500") {
            this.invalidUser = true;
            this.enabledOTP = false;
            this.notificationService.warn("please try after some time..!");
          } else {
            this.notificationService.warn(res.message);
            this.enabledOTP = false;
          }
        },
        (error) => {
          this.notificationService.error(
            "Problem!please try after some time..!"
          );
        }
      );
  }
  //-------------------------------------

  //==============================================================new submit end here==================
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
