import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OtpLoginModel } from '../models/otp-login-model';
import { ConsumerLoginService } from '../services/consumer-login.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from "rxjs/operators";

@Component({
  selector: 'app-ssp-login',
  templateUrl: './ssp-login.component.html',
  styleUrls: ['./ssp-login.component.css']
})
export class SspLoginComponent implements OnInit {
  consumerLoginForm: FormGroup;
  otpVerificationFg: FormGroup;
  otpmodel: OtpLoginModel = new OtpLoginModel();
  showOtpFieldNew: boolean = false;
  unsubscribe$: Subject<void> = new Subject();
  consumername: any;
  sspMobileNumber:any;

  constructor(
    private consumerLoginService: ConsumerLoginService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService,
  ) {


  }

  ngOnInit(): void {
this.trialLoginNew();

    this.buildLoginForm();
    this.BuildOtpVerificationForm();
  }


  buildLoginForm() {
    this.consumerLoginForm = this.fb.group({
      consumerLoginId: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(10), Validators.minLength(10)]]
    })
  }


  BuildOtpVerificationForm() {
    this.otpVerificationFg = this.fb.group({
      otp: ["", Validators.required]
    })
  }


  trialLoginNew() {
    let currentUrl = this.router.url;
    console.log(currentUrl,"currentUrl...............");
    let urlSplitArray = currentUrl.split("/");
    console.log(urlSplitArray[3],"urlSplitArray.....");
    this.sspMobileNumber = urlSplitArray[3];

    this.otpmodel.mobileNo = this.sspMobileNumber;
    this.otpmodel.otp = null;
    this.otpmodel.source = "SSP";
    const spinnerRef = this.spinnerService.start();
    this.consumerLoginService
      .sendOTPToConsumerLogin(this.otpmodel)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => this.spinnerService.stop(spinnerRef))
      )
      .subscribe(
        (res) => {
          if (res.code == "200" && res.message == "Success") {
            this.spinnerService.stop(spinnerRef);
            this.notificationService.success(
              "OTP has been resend to your registered mobile number" +
              this.otpmodel.mobileNo
            )
            this.showOtpFieldNew = true;
            return
          }
          else {
            this.showOtpFieldNew = false;
            this.notificationService.warn(
              "something went wrong please tryafter some time"
            );
          }
        },
        (error) => {
          this.notificationService.error(
            "something went wrong please tryafter some time"
          );
          this.showOtpFieldNew = false;
        }
      );
  }




  trialLogin() {
    if (this.consumerLoginForm.invalid) {
      this.notificationService.error("Please Enter Mobile Number !");
      return
    }

    this.otpmodel.mobileNo = this.consumerLoginForm.value.consumerLoginId;
    this.otpmodel.otp = null;
    this.otpmodel.source = "SSP";
    const spinnerRef = this.spinnerService.start();
    this.consumerLoginService
      .sendOTPToConsumerLogin(this.otpmodel)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => this.spinnerService.stop(spinnerRef))
      )
      .subscribe(
        (res) => {
          if (res.code == "200" && res.message == "Success") {
            this.spinnerService.stop(spinnerRef);
            this.notificationService.success(
              "OTP has been resend to your registered mobile number" +
              this.otpmodel.mobileNo
            )
            this.showOtpFieldNew = true;
            return
          }
          else {
            this.showOtpFieldNew = false;
            this.notificationService.warn(
              "something went wrong please tryafter some time"
            );
          }
        },
        (error) => {
          this.notificationService.error(
            "something went wrong please tryafter some time"
          );
          this.showOtpFieldNew = false;
        }
      );

  }

  otpVerification() {
    this.otpmodel.mobileNo = this.sspMobileNumber;
    this.otpmodel.otp = this.otpVerificationFg.value.otp;
    this.otpmodel.source = "SSP";
    console.log(this.otpmodel);

    if (this.otpVerificationFg.valid) {
      console.log("here===========", this.otpmodel);


      const spinnerRef = this.spinnerService.start();
      this.consumerLoginService
        .VerifyOtp(this.otpmodel)
        .pipe(
          takeUntil(this.unsubscribe$),
          finalize(() => this.spinnerService.stop(spinnerRef))
        )
        .subscribe((response) => {
          if (response["code"] === "200" && response["message"] == "Success") {
            console.log("hhhhhhaaaaaaaaaaa.................");

            this.consumerLoginService.getConsumerByMobileNo(this.otpmodel.mobileNo).subscribe((resp: any) => {
              console.log(resp, "resp...................................");
              if (resp.code == "200") {
                this.spinnerService.stop(spinnerRef);
                // sessionStorage.consumertoken = resp?.token;
                // sessionStorage.objecOfConsumers = resp?.list[0];
                
                sessionStorage.setItem("consumertoken",JSON.stringify(resp?.token));
                sessionStorage.setItem("objecOfConsumers",JSON.stringify(resp?.list[0]));
                let abcd = sessionStorage.getItem("objecOfConsumers")
                let test = JSON.parse(abcd);
                console.log(test, "uuuuuuuuuuuuuuuuuuuuuuuueeeeeeeeeeeeerrrrrrrrrrrrrrrrrrrrrr");

                this.consumername = test?.consumerName;
                this.notificationService.success(
                  this.consumername + "You have successfully logged in!");
                  this.router.navigate(["/consumer/dashboard"]);
              } else {
                this.notificationService.warn(resp?.message);
                return
              }

            })

           
          } else {
            this.spinnerService.stop(spinnerRef);
            this.notificationService.warn("! Invalid otp")
            if (response["code"] === "609") {
              this.otpVerificationFg.controls["otp"].reset();
            } else if (response["code"] === "703") {
              this.otpVerificationFg.reset();
            } else {

            }
          }
        });
    }

  }

  resendOtp() {
    this.consumerLoginService
      .sendOTPToConsumerLogin(this.otpmodel)
      .subscribe(
        (res) => {
          if (res.code == "200" && res.message == "Success") {
            this.notificationService.success(
              "OTP has been resend to your registered mobile number" +
              this.otpmodel.mobileNo
            )
            return
          }
          else {
            this.showOtpFieldNew = false;
            this.notificationService.warn(
              "something went wrong please tryafter some time"
            );
          }
        },
        (error) => {
          this.notificationService.error(
            "something went wrong please tryafter some time"
          );
          this.showOtpFieldNew = false;
        }
      );
  }









}
