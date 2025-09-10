import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NotificationService } from "src/app/shared-services/notification.service";
import { SpinnerService } from "src/app/shared-services/spinner.service";
import { Subject } from "rxjs";
import { takeUntil, finalize } from "rxjs/operators";
import { CryptoService } from "src/app/shared-services/crypto.service";
import { DomSanitizer } from "@angular/platform-browser";
import { UserLoginService } from "../services/user-login.service";
import { UserLoginViewModel } from "../models/user-login-view-model";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { UnlockUserComponent } from "../unlock-user/unlock-user.component";
// import { OtpLoginModel } from "../models/otp-login-model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { OtpLoginModel } from "../models/otp-login-models";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"],
})
export class userLoginComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject();
  userLoginForm: FormGroup;
  otpVerificationFg: FormGroup;
  submitted = false;
  // userLoginViewModel: UserLoginViewModel = new UserLoginViewModel();
  userLoginmodel: UserLoginViewModel = new UserLoginViewModel();
  otpmodel: OtpLoginModel = new OtpLoginModel();
  currentUserName: string = null;
  private isFirstLogin: boolean = false;
  error: string = "";
  showForm: boolean = false;
  showOtpField: boolean = false;
  hide = true;
  captcha: any;
  captchaId: string;
  loginIdUser: any;
  modalTitle: string;
  btnTitle: string;
  usermobileToLogin: number;
  token: any;
  userDeatil: any[] = [];
  currentRoleOfUser: any = [];
  distribustionCenterList:any;
  constructor(
    private userLoginService: UserLoginService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private jwtHelperService: JwtHelperService,
    private crypto: CryptoService,
    private spinnerService: SpinnerService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    if (this.userLoginService.currentUserName != null && !this.isFirstLogin) {
      this.router.navigate(["/user/dashboard"]);
      sessionStorage.removeItem("SearchKey");
      this.showForm = false;
    } else {
      this.showForm = true;
      this.userLoginForm = this.fb.group({
        userLoginId: ["", [Validators.required]],
        userLoginPwd: ["", [Validators.required]],
        // captcha: ["", Validators.required],
        // captchaId: [""],
      });
      this.otpVerificationFg = this.fb.group({
        // userLoginId: ["", [Validators.required]],
        // tokenId: ["", [Validators.required]],
        otp: ["", Validators.required],
      });
    }
    //this.getCaptcha();


let minDate = new Date();
 console.log(minDate.setMonth(minDate.getMonth() - 2));
  
   
  }

  //==============================new  getotp method==============================
  getOtp() {
    this.submitted = true;
    if (this.userLoginForm.valid) {
      const spinnerRef = this.spinnerService.start();
      this.userLoginmodel.userLoginId = this.userLoginForm.value.userLoginId;
      this.userLoginmodel.userPwd = this.userLoginForm.value.userLoginPwd;
      this.userLoginService
        .userLogin(this.userLoginmodel)

        .subscribe(
          (response: any) => {
            console.log("response for login", response);

            if (response.code == "200") {
              console.log("response for login", response.token);
              this.token = response.token;
              this.currentRoleOfUser = response.list[0].userRoles[0];
              this.userDeatil = response.list[0];

              // ***********************************************
              // this.spinnerService.stop(spinnerRef);
              // sessionStorage.usertoken = JSON.stringify(this.token);
              // let val = JSON.stringify(this.userDeatil);
              // sessionStorage.setItem(
              //   "accessLeveOfUser",
              //   val
              // );
              // this.router.navigate(["/user/dashboard"]);
              // return
              // **************************************************8
              console.log(this.userDeatil, "shammmmmmmmmmmmmmmmmmmmmmmmm");
              let mob = '7067493216'
              this.spinnerService.stop(spinnerRef);
              this.usermobileToLogin = response.list[0].mobileNo;
              this.otpmodel.mobileNo = response.list[0].mobileNo;
              this.otpmodel.mobileNo = mob;
              this.otpmodel.source = "DSP";
              this.distribustionCenterList = response.list[0]?.distribustionCenter;
              //call get otp method
              this.userLoginService.getUserLoginOtp(this.otpmodel).subscribe(
                (res) => {
                  if (res.code == "200" && res.message == "Success") {
                    this.notificationService.success(
                      "OTP has been Sent to your registered mobile number" +
                      this.otpmodel.mobileNo
                    );
                    this.showOtpField = true;
                  } else {

                  }
                },
                (error) => {
                  this.spinnerService.stop(spinnerRef);
                  this.notificationService.error(
                    "Problem in otp generation Please try Again after some time.."
                  );
                  return;
                }
              );
            } else {
              this.spinnerService.stop(spinnerRef);
              this.notificationService.warn(response?.message);
              return;
            }
          },
          (error) => {
            this.spinnerService.stop(spinnerRef);
            this.notificationService.warn(
             error?.message
            );
          }
        );
    } else {
      return;
    }
  }
  //==============================================================================

  resendOtp() {
    //======code updated with new otp method==============
    this.otpVerificationFg.controls["otp"].reset();
    let mob = '7067493216'
    const spinnerRef = this.spinnerService.start();
    this.otpmodel.mobileNo = this.usermobileToLogin;
    // this.otpmodel.mobileNo = mob;
    this.otpmodel.source = "DSP";
    //call get otp method==========================================
    this.userLoginService.getUserLoginOtp(this.otpmodel).subscribe(
      (res) => {
        if (res.code == "200" && res.message == "Success") {
          this.notificationService.success(
            "OTP has been Sent to your registered mobile number" +
            this.otpmodel.mobileNo
          );
          this.showOtpField = true;
        }
      },
      (error) => {
        this.spinnerService.stop(spinnerRef);
        this.notificationService.error(
          "Problem in otp generation Please try Again after some time.."
        );
        return;
      }
    );

    //=================================================================
    console.log(this.otpmodel, "in resend otp");
    this.userLoginService
      .getUserLoginOtp(this.otpmodel)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => this.spinnerService.stop(spinnerRef))
      )
      .subscribe(
        (res) => {
          if (res.code == "200" && res.message == "Success") {
            this.notificationService.success(
              "OTP has been Sent to your registered mobile number" +
              this.otpmodel.mobileNo
            );
            this.showOtpField = true;
          }
        },
        (error) => {
          this.spinnerService.stop(spinnerRef);
          this.notificationService.error(
            "Problem in otp generation Please try Again after some time.."
          );
          return;
        }
      );

    //========================================================

    //=== ===old method=== ===  
    // this.userLoginService
    //   .resendOtp(this.otpmodel)
    //   .pipe(
    //     takeUntil(this.unsubscribe$),
    //     finalize(() => this.spinnerService.stop(spinnerRef))
    //   )
    //   .subscribe((response) => {
    //     if (response["code"] === "200") {
    //       console.log("response", response["list"][0]);
    //       this.notificationService.success(
    //         "OTP has been resend to your registered mobile number " +
    //           response["list"][0].mobileNo
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
    //======================================================================
  }



  otpVerification() {
    console.log(this.otpVerificationFg.value);
    if (this.otpVerificationFg.valid) {
      const spinnerRef = this.spinnerService.start();
      let mob = '7067493216'
      this.otpmodel.mobileNo = this.usermobileToLogin;
      this.otpmodel.mobileNo = mob;
      this.otpmodel.source = "DSP";
      this.otpmodel.otp = this.otpVerificationFg.value.otp;
      // call new verify otp service 
      this.userLoginService.verifyOtp(this.otpmodel).subscribe(
        (res) => {
          if (res.code == "200" && res.message == "Success") {
            this.spinnerService.stop(spinnerRef);
            sessionStorage.usertoken = JSON.stringify(this.token);
            let userRole = JSON.stringify(this.currentRoleOfUser);
            sessionStorage.setItem("currentRoleOfUser", userRole);
            sessionStorage.setItem("distribustionCenterList",this.distribustionCenterList)
            let val = JSON.stringify(this.userDeatil);
            sessionStorage.setItem(
              "accessLeveOfUser",
              val
            );

            //if true redirect to dashboard
            if (this.token !== null) {
              this.spinnerService.stop(spinnerRef);
              this.notificationService.success("User is verified successfully");
              if (this.currentRoleOfUser?.roleCode == "AO Finance & DGM Fianance") {
                this.router.navigate(["/user/finance-dashboard"]);
              } else {
                this.router.navigate(["/user/dashboard"]);
              }
            } else {
              this.spinnerService.stop(spinnerRef);
              this.notificationService.warn(
                "Problem in logging in Please try Again after some time"
              );
            }
          }
          else {
            this.spinnerService.stop(spinnerRef);
            this.notificationService.error(" ! Invalid otp");
            return
          }
        },
        (error) => {
          this.spinnerService.stop(spinnerRef);
          this.notificationService.warn("Please try Again After some time");
        }
      );
      //======================================================================
    } else {
      return;
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
    const dialogRef = this.dialog.open(UnlockUserComponent, dialogConfig);
  }
}
