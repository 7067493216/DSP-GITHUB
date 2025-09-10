import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { PasswordChangeService } from "../services/password-change.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { NotificationService } from "src/app/shared-services/notification.service";
import { ConsumerLoginService } from "../services/consumer-login.service";
import { matchingPasswords, pwdPattern } from "src/app/utils/app-validators";
import { takeUntil } from "rxjs/operators";
// import { ConsumerResetPasswordRequest } from "../models/consumer-reset-password-request.model";
import { SpinnerService } from "src/app/shared-services/spinner.service";
import { ConsumerResetPasswordRequestModel } from "../models/consumer-reset-password-request.model";
// import { ConsumerResetPasswordRequest } from "../models/consumer-reset-password-request.model";
// import { ConsumerResetPasswordRequest } from "../models/consumer-reset-password-request.model";

@Component({
  selector: "app-consumer-reset-password",
  templateUrl: "./consumer-reset-password.component.html",
  styleUrls: ["./consumer-reset-password.component.css"],
})
export class ConsumerResetPasswordComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  changepasswodFg: FormGroup;
  loginId: string;
  hide = true;
  hide1 = true;
  hide2 = true;
  resetPasswordrequestmodel: ConsumerResetPasswordRequestModel =new ConsumerResetPasswordRequestModel();
  receivedConsumermobileno: any;
  mobNo:any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    private passwordChangeService: PasswordChangeService,
    private jwtHelperService: JwtHelperService,
    private consumerLoginService: ConsumerLoginService,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService
  ) {
    let x = sessionStorage.getItem('consumerDetailsForResetPassword');
    this.mobNo = JSON.parse(x);
    console.log(this.mobNo,"this.mobNo");
    

  }

  ngOnInit() {
    console.log(history.state.consumermobileno, "received hereeeeeeeeeee");

    this.receivedConsumermobileno = history.state.consumermobileno;

    this.titleService.setTitle("Change Password");
    this.changepasswodFg = this.fb.group(
      {
        // oldpassword: ["", Validators.required],
        password: ["", Validators.compose([Validators.required, pwdPattern])],
        confirmPassword: ["", Validators.required],
      },
      { validator: matchingPasswords("password", "confirmPassword") }
    );
    const token = sessionStorage.getItem("consumertoken")
      ? JSON.parse(sessionStorage.getItem("consumertoken"))
      : null;
    // this.loginId = this.jwtHelperService.decodeToken(token)["sub"];
  }
  // onSubmit() {
  //   const formData: any = {};
  //   formData.loginId = this.loginId;
  //   formData.newPassword = this.changepasswodFg.get("password").value;
  //   formData.oldPassword = this.changepasswodFg.get("oldpassword").value;
  //   this.passwordChangeService
  //     .changePwd(formData)
  //     .pipe(takeUntil(this.unsubscribe$))
  //     .subscribe((data) => {
  //       console.log(data);
  //       if (data["code"] === "200") {
  //         this.notificationService.success(data["message"]);

  //         this.logout();
  //       } else {
  //         this.notificationService.warn(data["message"]);
  //       }
  //     });
  // }
  updatePassword() {
    const spinnerRef = this.spinnerService.start();
    this.resetPasswordrequestmodel.consumerMobileNo =
    this.mobNo;
    this.resetPasswordrequestmodel.password =
      this.changepasswodFg.get("password").value;
    this.resetPasswordrequestmodel.confirmPassword =
      this.changepasswodFg.get("confirmPassword").value;
    console.log(
      "request<><>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
      this.resetPasswordrequestmodel
    );
    if (!this.changepasswodFg.valid) {
      return;
    } else {
      this.passwordChangeService
        .resetPwd(this.resetPasswordrequestmodel)
        .subscribe(
          (res: any) => {
            if (res.code == "200") {
              this.spinnerService.stop(spinnerRef);
              this.notificationService.success(res.message);
              this.router.navigate(["/consumer/login"]);
            } else if (res.code == "100") {
              this.spinnerService.stop(spinnerRef);
              this.notificationService.warn(res.message);
            } else if (res.code == "500") {
              this.spinnerService.stop(spinnerRef);
              this.notificationService.error(
                "Problem on server..!Please try after some time"
              );
            } else {
              this.spinnerService.stop(spinnerRef);
              this.notificationService.warn(res.message);
            }
          },
          (error) => {
            this.spinnerService.stop(spinnerRef);
            this.notificationService.error(
              "Problem on server..!Please try after some time.."
            );
          }
        );
    }
  }

  logout() {
    this.consumerLoginService.logout();
    sessionStorage.removeItem("SearchKey");
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
