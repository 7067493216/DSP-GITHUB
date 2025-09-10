import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GenerateUrl } from "src/environments/generate-url.model";
import { ConsumerResetPasswordRequestModel } from "../models/consumer-reset-password-request.model";
// import { ConsumerResetPasswordRequest } from "../models/consumer-reset-password-request.model";

@Injectable({
  providedIn: "root",
})
export class PasswordChangeService {
  baseUrl: string = this.url.authUrl;

  constructor(private http: HttpClient, private url: GenerateUrl) {}

  changePwd(data) {
    console.log(this.baseUrl + "/changePassword");
    console.log(data);
    return this.http.post(this.baseUrl + "/changePassword", data);
  }
  forgatePwd(data) {
    return this.http.post(this.baseUrl + "/updateConsumerGroup", data);
  }
  //new method to reset password added on 11 oct 2023 by sourabh and monica/charitra
  resetPwd(request: ConsumerResetPasswordRequestModel) {
    return this.http.post(
      this.url.contextPath + "/updateConsumer/password",
      request
    );
  }
}
