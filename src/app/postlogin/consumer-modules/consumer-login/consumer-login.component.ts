import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NotificationService } from "src/app/shared-services/notification.service";
import { SpinnerService } from "src/app/shared-services/spinner.service";
import { Subject } from "rxjs";
import { takeUntil, finalize } from "rxjs/operators";
import { CryptoService } from "src/app/shared-services/crypto.service";
import { DomSanitizer } from "@angular/platform-browser";
import { ConsumerLoginService } from "../services/consumer-login.service";
import { ConsumerLoginModel } from "../models/consumer-login-model";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { UnlockConsumerComponent } from "../unlock-consumer/unlock-consumer.component";
import { OtpLoginModel } from "../models/otp-login-model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { GenerateUrl } from "src/environments/generate-url.model";


@Component({
  selector: "app-consumer-login",
  templateUrl: "./consumer-login.component.html",
  styleUrls: ["./consumer-login.component.css"],
})
export class ConsumerLoginComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject();
  consumerLoginForm: FormGroup;
  otpVerificationFg: FormGroup;
  submitted = false;
  consumerLoginModel: ConsumerLoginModel = new ConsumerLoginModel();
  error: string = "";
  showForm: boolean = false;
  showOtpField: boolean = false;
  showOtpFieldNew: boolean = false
  hide = true;
  captcha: any;
  token: any;
  captchaCode: any;
  captchaMatch: boolean = false;
  captchaNotMatch: boolean = false;
  isFormSubmit: any = false;
  captchaId: string;
  modalTitle: string;
  btnTitle: string;
  otpmodel: OtpLoginModel = new OtpLoginModel();
  private isFirstLogin: boolean = false;
  currentConsumerName: string = null;

  newTokenForLogin: any;
  consumersObjDetailsNew: any
  consumername: any;


  constructor(
    private consumerLoginService: ConsumerLoginService,
    private router: Router,
    private url: GenerateUrl,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private crypto: CryptoService,
    private spinnerService: SpinnerService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private jwtHelperService: JwtHelperService,
  ) { }

  ngOnInit() {
    if (this.consumerLoginService.currentConsumerName != null) {
      // this.router.navigate(["/consumer/dashboard"]);
      sessionStorage.removeItem("SearchKey");
      this.showForm = false;
    } else {
      this.showForm = true;
      this.consumerLoginForm = this.fb.group({
        consumerLoginId: [
          "",
          [
            Validators.required,
            Validators.pattern("^[0-9]*$"),
            Validators.maxLength(10),
          ],
        ],
        consumerLoginPwd: ["", [Validators.required]],
        // captcha: ["", Validators.required],
        // captchaId: [""],
      });
      //old code ============================
      // this.otpVerificationFg = this.fb.group({
      //   consumerLoginId: ["", [Validators.required]],
      //   tokenId: ["", [Validators.required]],
      //   otp: ["", Validators.required],
      // });
      this.otpVerificationFg = this.fb.group({
        //  consumerLoginId: ["", [Validators.required]],

        otp: ["", Validators.required],
      });
    }
    //  this.getCaptcha();
    //  this.generateCaptcha();
  }
  //old method=======================================
  // getCaptcha() {
  //   this.consumerLoginService
  //     .getCaptcha()
  //     .pipe(takeUntil(this.unsubscribe$))
  //     .subscribe((responce) => {
  //       this.captcha = this.sanitizer.bypassSecurityTrustResourceUrl(
  //         "data:image/png;base64," + responce["list"][0].captchaImgStr
  //       );
  //       this.captchaId = responce["list"][0].captchaId;
  //       console.log(responce['list'][0].captchaImgStr);
  //     });
  // }
  //new code =======================================================
  // generateCaptcha() {
  //   const characters =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   const length = 6; // Set the length of the CAPTCHA code as needed

  //   let captcha = "";
  //   for (let i = 0; i < length; i++) {
  //     captcha += characters.charAt(
  //       Math.floor(Math.random() * characters.length)
  //     );
  //   }

  //   this.captchaCode = captcha;
  // }
  //==================================================================

  // captchaReload() {
  //   //this.generateCaptcha();
  // }
  // verifyCaptcha() {
  //   // console.log(this.consumerLoginForm.value.captcha, "capchaaaaaaaaaaaaaaa");
  //   let capchaEntered = this.consumerLoginForm.value.captcha;

  //   if (capchaEntered === this.captchaCode) {
  //     this.captchaMatch = true;
  //     this.captchaNotMatch = false;
  //     // alert('CAPTCHA verified successfully!',);

  //     // this.generateCaptcha();
  //   } else {
  //     this.captchaMatch = false;
  //     this.captchaNotMatch = true;
  //     //   alert(this.captchaNotMatch)
  //     // alert('CAPTCHA verification failed. Please try again.');
  //   }
  // }

  // getOtp() {
  //   this.submitted = true;
  //   const loginData = this.consumerLoginForm.value;
  //   //verify otp payload
  //   this.otpmodel.mobileNo = this.consumerLoginForm.value.consumerLoginId;
  //   this.otpmodel.source = "DSP";
  //   //login payload
  //   this.consumerLoginModel.consumerLoginId =
  //     this.consumerLoginForm.value.consumerLoginId;
  //   this.consumerLoginModel.consumerLoginPwd =
  //     this.consumerLoginForm.value.consumerLoginPwd;

  //   // sendOTPToConsumerLogin

  //   if (this.consumerLoginForm.valid) {
  //     const spinnerRef = this.spinnerService.start();
  //     loginData.captchaId = this.captchaId;
  //     //old code===============================================================================
  //     this.consumerLoginService
  //       .sendOtpToConsumer(this.consumerLoginForm.value)
  //       .pipe(
  //         takeUntil(this.unsubscribe$),
  //         finalize(() => this.spinnerService.stop(spinnerRef))
  //       )
  //       .subscribe(
  //         (response) => {
  //           if (response["code"] === "200") {
  //             this.otpVerificationFg.controls["tokenId"].setValue(
  //               response["list"][0].tokenId
  //             );
  //             this.otpVerificationFg.controls["consumerLoginId"].setValue(
  //               response["list"][0].consumerLoginId
  //             );
  //             this.showOtpField = true;
  //             this.notificationService.success(
  //               "OTP has been Sent to your registered mobile number " +
  //                 response["list"][0].consumerMobileNo
  //             );
  //             this.error = "";
  //             this.consumerLoginForm.reset();
  //           } else {
  //             this.error = response["message"];
  //             // this.getCaptcha();
  //             //this.generateCaptcha();
  //             this.consumerLoginForm.controls["captcha"].reset();
  //           }
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //     //new code==============================================================================
  //     this.consumerLoginService
  //       .sendOTPToConsumerLogin(this.otpmodel)
  //       .pipe(
  //         takeUntil(this.unsubscribe$),
  //         finalize(() => this.spinnerService.stop(spinnerRef))
  //       )
  //       .subscribe(
  //         (response) => {
  //           if (
  //             response["code"] === "200" &&
  //             response["message"] == "Success"
  //           ) {
  //             // this.otpVerificationFg.controls["tokenId"].setValue(
  //             //   response["list"][0].tokenId
  //             // );
  //             this.spinnerService.stop(spinnerRef);
  //             this.otpVerificationFg.controls["consumerLoginId"].setValue(
  //               response["list"][0].mobile
  //             );
  //             // payload for otp verification
  //             this.otpmodel.mobileNo = response["list"][0].mobile;

  //             this.otpmodel.source = "DSP";
  //             //payload for login in new api
  //             this.consumerLoginModel.consumerLoginId =
  //               response["list"][0].mobile;
  //             this.consumerLoginModel.consumerLoginPwd =
  //               this.consumerLoginForm.value.consumerLoginPwd;

  //             this.showOtpField = true;
  //             this.notificationService.success(
  //               "OTP has been Sent to your registered mobile number " +
  //                 response["list"][0].mobile
  //             );
  //             this.error = "";
  //             // this.consumerLoginForm.reset();
  //           } else {
  //             this.error = response["message"];
  //             // this.getCaptcha();
  //             //this.generateCaptcha();
  //             this.consumerLoginForm.controls["captcha"].reset();
  //           }
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //   } else {
  //     return;
  //   }
  // }



  trialLogin() {
    if (!this.consumerLoginForm.valid) {
      this.notificationService.warn('something went wrong during login !');
      return
    } else {
      this.consumerLoginModel.consumerLoginId =
        this.consumerLoginForm.value.consumerLoginId;
      this.consumerLoginModel.consumerLoginPwd =
        this.consumerLoginForm.value.consumerLoginPwd;

      this.consumerLoginService.getConsumerLoginNewApi(this.consumerLoginModel).subscribe((response: any) => {
        console.log(response, "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyeeeeeesssssssssssssssssssssssssss");

        // if (response.code == "200") {
        if (response.code === "200") {
          this.otpmodel.mobileNo = response.list[0]?.consumerLoginId;
           let mob: any = "7067493216"
          
          this.newTokenForLogin = JSON.stringify(response.token);
          this.otpmodel.mobileNo = response.list[0]?.consumerMobileNo;
          // this.otpmodel.mobileNo = mob;
          // sessionStorage.setItem('consumersObjDetails',JSON.stringify(response.list[0]));
          this.consumersObjDetailsNew = JSON.stringify(response?.list[0]);
          this.otpmodel.source = "DSP";


          // **************************************************************

          // sessionStorage.consumertoken = this.newTokenForLogin;
          // sessionStorage.objecOfConsumers = this.consumersObjDetailsNew;
          // let abcd = sessionStorage.getItem("objecOfConsumers")
          // let test = JSON.parse(abcd);
          // console.log(test, "uuuuuuuuuuuuuuuuuuuuuuuueeeeeeeeeeeeerrrrrrrrrrrrrrrrrrrrrr");

          // this.consumername = test?.consumerName;
          // this.notificationService.success(
          //   this.consumername + "You have successfully logged in!"
          // );
          // sessionStorage.setItem('consumertoken', this.newTokenForLogin);


          // this.router.navigate(["/consumer/dashboard"]);
          // return

          // ******************************************************************


          this.consumerLoginService
            .sendOTPToConsumerLogin(this.otpmodel)
            .subscribe(
              (res) => {
                if (res.code == "200" && res.message == "Success") {
                  this.notificationService.success(
                    "OTP has been resend to your registered mobile number" +
                    this.otpmodel.mobileNo
                  )


                  this.showOtpFieldNew = true;
                  //validate otpVerificationFg
                  // this.otpVerificationFg.controls.consumerLoginId.=this.otpmodel.mobileNo;
                  // this.otpVerificationFg.controls[
                  //   "consumerLoginId"
                  // ].setValue(this.otpmodel.mobileNo);
                  return
                }
                else {
                  this.notificationService.warn(
                    "something went wrong please tryafter some time"
                  );
                }
              },
              (error) => {
                this.notificationService.error(
                  "something went wrong please tryafter some time"
                );
              }
            );


        } else if (response.code === "404") {
          this.notificationService.error(response?.message);
          return
        } else {
          this.notificationService.warn(response?.message);
        }

      })

    }
    //getConsumerLoginNewApi
  }

  // getOtp() {
  //   if (!this.consumerLoginForm.valid) {
  //     return;
  //   } else {
  //     this.consumerLoginModel.consumerLoginId =
  //       this.consumerLoginForm.value.consumerLoginId;
  //     this.consumerLoginModel.consumerLoginPwd =
  //       this.consumerLoginForm.value.consumerLoginPwd;
  //     this.consumerLoginService
  //       .Aplicant_Login(this.consumerLoginModel)
  //       .subscribe(
  //         (res) => {
  //           if (res.code == "200") {
  //             console.log(res, "here in applicantloginnnnnnnnnnnnnnnnnnnnnnnn");

  //             // sessionStorage.consumertoken = JSON.stringify(res.token);
  //             this.token = JSON.stringify(res.token);

  //             this.otpmodel.mobileNo = res.list[0].consumerMobileNo;
  //             this.otpmodel.source = "DSP";

  //             console.log(res.list[0].consumerMobileNo, "after verification");
  //             this.consumerLoginService
  //               .sendOTPToConsumerLogin(this.otpmodel)
  //               .subscribe(
  //                 (res) => {
  //                   if (res.code == "200" && res.message == "Success") {
  //                     this.notificationService.success(
  //                       "OTP has been resend to your registered mobile number" +
  //                         this.otpmodel.mobileNo
  //                     );
  //                     this.showOtpField = true;
  //                     //validate otpVerificationFg
  //                     // this.otpVerificationFg.controls.consumerLoginId.=this.otpmodel.mobileNo;
  //                     this.otpVerificationFg.controls[
  //                       "consumerLoginId"
  //                     ].setValue(this.otpmodel.mobileNo);
  //                   } else {
  //                     this.notificationService.warn(
  //                       "something went wrong please tryafter some time"
  //                     );
  //                   }
  //                 },
  //                 (error) => {
  //                   this.notificationService.error(
  //                     "something went wrong please tryafter some time"
  //                   );
  //                 }
  //               );
  //           }
  //         },
  //         (error) => {}
  //       );
  //   }
  // }

  resendOtp() {
    this.otpVerificationFg.controls["otp"].reset();
    const otpObj = {} as any;
    const spinnerRef = this.spinnerService.start();
    // otpObj.userId = this.otpVerificationFg.controls["consumerLoginId"].value;
    // otpObj.tokenId = this.otpVerificationFg.controls["tokenId"].value;
    //old code =================================================================================
    // this.consumerLoginService
    //   .resendOtp(this.otpmodel)
    //   .pipe(
    //     takeUntil(this.unsubscribe$),
    //     finalize(() => this.spinnerService.stop(spinnerRef))
    //   )
    //   .subscribe((response) => {
    //     if (response["code"] === "200") {
    //       this.notificationService.success(
    //         "OTP has been resend to your registered mobile number " +
    //           response["list"][0].mobile
    //       );
    //     } else {
    //       this.error = response["message"];
    //       if (response["code"] === "703") {
    //         this.otpVerificationFg.reset();
    //         this.showOtpField = false;
    //         setTimeout(() => {
    //           this.error = "";
    //         }, 1000);
    //       }
    //     }
    //   });
    //==============new code ============================================================
    this.consumerLoginService
      .sendOTPToConsumerLogin(this.otpmodel)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => this.spinnerService.stop(spinnerRef))
      )
      .subscribe(
        (response) => {
          if (response["code"] === "200" && response["message"] == "Success") {
            // this.otpVerificationFg.controls["tokenId"].setValue(
            //   response["list"][0].tokenId
            // );
            this.spinnerService.stop(spinnerRef);
            this.otpVerificationFg.controls["consumerLoginId"].setValue(
              response["list"][0].mobile
            );
            // payload for otp verification
            this.otpmodel.mobileNo = response["list"][0].mobile;

            this.otpmodel.source = "DSP";
            //payload for login in new api
            this.consumerLoginModel.consumerLoginId =
              response["list"][0].mobile;
            this.consumerLoginModel.consumerLoginPwd =
              this.consumerLoginForm.value.consumerLoginPwd;

            this.showOtpField = true;
            this.notificationService.success(
              "OTP has been Sent to your registered mobile number " +
              response["list"][0].mobile
            );
            this.error = "";
            // this.consumerLoginForm.reset();
          } else {
            this.error = response["message"];
            // this.getCaptcha();
            //  this.generateCaptcha();
            this.consumerLoginForm.controls["captcha"].reset();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    //===================================================================================
  }

  
  otpVerification() {
    this.otpmodel.otp = this.otpVerificationFg.value.otp;
    this.otpmodel.source = "DSP";
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

            this.spinnerService.stop(spinnerRef);
            sessionStorage.consumertoken = this.newTokenForLogin;
            sessionStorage.objecOfConsumers = this.consumersObjDetailsNew;
            let abcd = sessionStorage.getItem("objecOfConsumers")
            let test = JSON.parse(abcd);
            console.log(test, "uuuuuuuuuuuuuuuuuuuuuuuueeeeeeeeeeeeerrrrrrrrrrrrrrrrrrrrrr");

            this.consumername = test?.consumerName;
            this.notificationService.success(
              this.consumername + "You have successfully logged in!"
            );
            // sessionStorage.setItem('consumertoken', this.newTokenForLogin);


            this.router.navigate(["/consumer/dashboard"]);

            console.log(this.consumerLoginModel, "ooooooooooooooooooooooo");

            console.log("logged innnnnnnnnnnnnnnnn");
          } else {
            this.spinnerService.stop(spinnerRef);
            this.notificationService.warn("! Invalid otp")
            // this.error = response["message"];
            sessionStorage.removeItem("token");
            if (response["code"] === "609") {
              this.otpVerificationFg.controls["otp"].reset();
            } else if (response["code"] === "703") {
              this.otpVerificationFg.reset();
              this.showOtpField = false;
              setTimeout(() => {
                this.error = "";
              }, 2000);
            }
          }
        });
    }
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  unlockId() {
    console.log("unlockId");
    this.modalTitle = "Unlock User ";
    this.btnTitle = "Unlock User";

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "90%";
    dialogConfig.data = {
      modalTitle: this.modalTitle,
      btnTitle: this.btnTitle,
    };
    const dialogRef = this.dialog.open(UnlockConsumerComponent, dialogConfig);
  }


  onSopDownload(){
// SSP_Integration_with_DSP
  }


}
