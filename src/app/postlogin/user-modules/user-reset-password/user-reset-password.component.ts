import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { UserPasswordChangeService } from "../services/user-password-change.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserLoginService } from "../services/user-login.service";
import { NotificationService } from "src/app/shared-services/notification.service";
import { matchingPasswords, pwdPattern } from "src/app/utils/app-validators";
import { UserNewResetPasswordRequest } from "../models/user-reset-password-request.model";
// import { UserResetPasswordRequest } from "../models/user-reset-password-request.model";
// import { UserResetPasswordRequest } from "../models/user-reset-password-request.model";

@Component({
  selector: "app-user-reset-password",
  templateUrl: "./user-reset-password.component.html",
  styleUrls: ["./user-reset-password.component.css"],
})
export class UserResetPasswordComponent implements OnInit {
  resetpasswordForm: FormGroup;
  showForm: boolean = false;
  receivedUserId: any;
  // userPasswordresetRequestModel: UserNewResetPasswordRequest = new UserNewResetPasswordRequest();
  userPasswordresetRequestModel: UserNewResetPasswordRequest = new UserNewResetPasswordRequest();
  hide1=true;
  hide2=true;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    private userPasswordChangeService: UserPasswordChangeService,
    private jwtHelperService: JwtHelperService,
    private userLoginService: UserLoginService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    console.log(
      "received userid>>>>>>>>>>>>>>>>>>>>>>>>>",
      history.state.userid
    );
    this.receivedUserId = history.state.userid;
    this.titleService.setTitle("Change Password");
    if (this.userLoginService.currentUserName != null) {
      this.router.navigate(["/user/dashboard"]);
      sessionStorage.removeItem("SearchKey");
      this.showForm = false;
    } else {
      this.showForm = true;
      this.resetpasswordForm = this.fb.group(
        {
          // oldpassword: ["", Validators.required],
          password: ["", Validators.compose([Validators.required, pwdPattern])],
          confirmPassword: ["", Validators.required],
        },
        { validator: matchingPasswords("password", "confirmPassword") }
      );
    }
  }
  //========== new method to update password by userid by charitra on 06 oct 2023=======
  onSubmit() {
    this.userPasswordresetRequestModel.userid = this.receivedUserId;
    this.userPasswordresetRequestModel.password = this.resetpasswordForm.value.password;
    this.userPasswordresetRequestModel.confirmPassword = this.resetpasswordForm.value.confirmPassword;

    console.log(
      "payloadddddddddddd>>>>>>>>>>>>>>>",
      this.userPasswordresetRequestModel
    );
    if (this.resetpasswordForm.valid) {
      this.userPasswordChangeService
        .resetPwd(this.userPasswordresetRequestModel)
        .subscribe(
          (res: any) => {
            // if user id matchecd and password and confirmPassword matched too
            if (res.code == "200") {
              this.notificationService.success(res.message);
            } else if (res.code == "500") {
              this.notificationService.warn("Problem in verifying user. Please try after some time !")
            }
            else {
              this.notificationService.warn(res.message);
            }
          },
          (error) => {
            this.notificationService.error(
              "Problem in updating Password Please try after some time.."
            );
          }
        );
    } else {
      return;
    }
  }
  //===================================================================================
}
