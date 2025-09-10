import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GenerateUrl } from "src/environments/generate-url.model";
import { UserNewResetPasswordRequest } from "../models/user-reset-password-request.model";
// import { UserResetPasswordRequest } from "../models/user-reset-password-request.model";

@Injectable({
  providedIn: "root",
})
export class UserPasswordChangeService {
  baseUrl: string = this.url.userAuthUrl;

  constructor(private http: HttpClient, private url: GenerateUrl) {}

  changePwd(data) {
    console.log(this.baseUrl + "/changePassword");
    console.log(data);
    return this.http.post(this.baseUrl + "/changePassword", data);
  }
  forgatePwd(data) {
    return this.http.post(this.baseUrl + "/updateConsumerGroup", data);
  }
  // new method to change password from outside by sourabh charitra on 06 oct 2023 ===================
  resetPwd(request: any) {
    return this.http.put(
      this.url.contextPath + "/updateUser/password",
      request
    );
  }

  //================================================
}
