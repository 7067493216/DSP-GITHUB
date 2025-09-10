import { Injectable } from "@angular/core";
import { HttpClient, HttpBackend, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { NotificationService } from "src/app/shared-services/notification.service";
import { SearchKeyStatusService } from "src/app/shared-services/search-key-status.service";

import { GenerateUrl } from "src/environments/generate-url.model";
import { ListResponse } from "src/app/shared-models/list.response.model";
import { OtpViewModel } from "src/app/auth/authmodels/otp-view.model";
import { ConsumerLoginModel } from "../models/consumer-login-model";
// import { type } from "os";

@Injectable({
  providedIn: "root",
})
export class ConsumerLoginService {
  newUrl: string = "";
  private loggedIn = new BehaviorSubject<boolean>(false);
  private isFirstLogin: boolean = false;
  private httpClient: HttpClient;
  constructor(
    private router: Router,
    private httpBackend: HttpBackend,
    private http: HttpClient,

    private jwtHelperService: JwtHelperService,
    private baseUrl: GenerateUrl,
    private notificationService: NotificationService,
    private sharedData: SearchKeyStatusService
  ) {}
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  currentConsumerName: string = null;
  //old method============================================
  // public Login(data: any): Observable<any> {
  //   this.httpClient = new HttpClient(this.httpBackend);
  //   let headers = new Headers();

  //   return this.httpClient
  //     .post<any>(this.baseUrl.otpUrl + "/verifyLoginOtp", ConsumerLoginModel, {
  //       responseType: "json",
  //       observe: "response",
  //     })
  //     .pipe(
  //       map((response) => {
  //         if (response.body.code == "200") {
  //           this.loggedIn.next(true);
  //           const token = response.headers.get("authorization");
  //           const decodedToket = this.jwtHelperService.decodeToken(token);
  //           sessionStorage.consumertoken = JSON.stringify(token);
  //           this.currentConsumerName = decodedToket["consumerfullname"];
  //           // this.isFirstLogin = decodedToket["isFirstLogin"];
  //           // if (response.body.code == "200" && !this.isFirstLogin) {
  //           //   this.router.navigate(["/consumer/dashboard"]);
  //           // }
  //           return response.body;
  //         } else {
  //           return response.body;
  //         }
  //       })
  //     );
  // }
  //======= new login api=====================================
  // public Aplicant_Login(data: any): Observable<any> {
  //   this.httpClient = new HttpClient(this.httpBackend);
  //   // let headers = new Headers();

  //   return this.httpClient
  //     .post<any>(
  //       this.baseUrl.baseUrl +
  //         "/deposit_scheme/api/consumer/login/consumer_login",
  //       data,
  //       { responseType: "json", observe: "response" }
  //     )
  //     .pipe(
  //       map((response) => {
  //         if (response.body.code == "200") {
  //           // this.loggedIn.next(true);
  //           const token = response.headers.get("Authorization");

  //           //    const decodedToket = this.jwtHelperService.decodeToken(token);
  //           // sessionStorage.consumertoken = JSON.stringify(token);
  //           //  this.currentConsumerName = decodedToket["consumerfullname"];
  //           // this.isFirstLogin = decodedToket["isFirstLogin"];
  //           // if (response.body.code == "200" && !this.isFirstLogin) {
  //           //   this.router.navigate(["/consumer/dashboard"]);
  //           // }
  //           return response.body;
  //         } else {
  //           return response.body;
  //         }
  //       })
  //     );
  // }

  //==========================================================
  //============================================================
  //new method used for verifying otp for all newgetotp for otp-verification =============================
  //verify otp
  public VerifyOtp(data: any): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
    let headers = new Headers();

    return this.httpClient
      .post<any>(
        "https://resourceutils.mpcz.in:8888/MPCZ_OTP/api/otp/verifyOtpAll",
        data,
        {
          responseType: "json",
          observe: "response",
        }
      )
      .pipe(
        map((response) => {
          if (response.body.code == "200") {
            this.loggedIn.next(true);
            const token = response.headers.get("Authorization");
            const decodedToket = this.jwtHelperService.decodeToken(token);
            sessionStorage.consumertoken = JSON.stringify(token);
            // this.currentConsumerName = decodedToket["consumerfullname"];
            // this.isFirstLogin = decodedToket["isFirstLogin"];
            if (response.body.code == "200") {
              // this.router.navigate(["/consumer/dashboard"]);
            }
            return response.body;
          } else {
            return response.body;
          }
        })
      );
  }

  //============new verify otp method to verify animesh sir api otp========
  public verifyOtpforForgotPassword(data: any): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
    let headers = new Headers();
    return this.httpClient.post<any>(
      "https://resourceutils.mpcz.in:8888/MPCZ_OTP/api/otp/verifyOtpAll",
      data
    );
  }
  //========================================================================

  public getOtp(otpViewModel: OtpViewModel): Observable<any> {
    console.log("this.baseUrl: -------**-----------" + this.baseUrl);
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(
      this.baseUrl.otpUrl + "/getOtp",
      otpViewModel
    );
  }
  public resendOtp(data): Observable<any> {
    console.log("this.baseUrl: -------***--*88**---------" + this.baseUrl);

    console.log("data.consumerLoginId", data.mobileNo);
    console.log("", data.source);
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(
      this.baseUrl.otpUrl + "/getLoginOtp",
      data
    );
  }
  public sendOtpToConsumer(data): Observable<any> {
    console.log(
      "this.baseUrl: -------verificationCaptcha----------" + this.baseUrl
    );
    console.log("this.baseUrl.authUrl" + this.baseUrl.authUrl);

    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(
      this.baseUrl.authUrl + "/verificationCaptcha",
      data
    );
  }
  //=======new api  used in login to getOtp ======================================
  public sendOTPToConsumerLogin(data: any): Observable<any> {
    // newget otp
    // https://resourceutils.mpcz.in:8888/MPCZ_OTP/api/otp/getOtp
    this.httpClient = new HttpClient(this.httpBackend);
    this.newUrl = "https://resourceutils.mpcz.in:8888/MPCZ_OTP/api/otp/getOtp";

                // https://resourceutils.mpcz.in:8888/MPCZ_OTP/api/otp/getOtp


    return this.httpClient.post<any>(this.newUrl, data);
  }
  //================ new getOtp used in forgot password=========================
  public getOtpforForgotPassword(data: OtpViewModel): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
    this.newUrl = "https://resourceutils.mpcz.in:8888/MPCZ_OTP/api/otp/getOtp";
    return this.httpClient.post<any>(this.newUrl, data);
  }
  //========================================================================
  public forgotPassword(otpViewModel: OtpViewModel): Observable<any> {
    console.log("this.baseUrl: -------***-----------" + this.baseUrl);
    console.log(this.baseUrl);

    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(
      this.baseUrl.authUrl + "/forgotPassword",
      otpViewModel
    );
  }
  getCaptcha(): Observable<ListResponse[]> {
    console.log("this.baseUrl: -------***-----------" + this.baseUrl);
    console.log(this.baseUrl);

    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.get<ListResponse[]>(
      this.baseUrl.authUrl + "/getCaptcha"
    );
  }
  public logout() {
    console.log(
      "here in logout***************************************************************************************************************************************************************************"
    );
    localStorage.clear();
    localStorage.removeItem("user");
    this.loggedIn.next(false);
    sessionStorage.removeItem("consumertoken");
    sessionStorage.removeItem("holidays");

    this.currentConsumerName = null;
    this.router.navigate(["/consumer/login"]);
    this.notificationService.success("::you have successfully logged out");
    this.sharedData.pushData(null);
  }

  public isAuthenticated(): boolean {
    let token = sessionStorage.getItem("consumertoken")
      ? JSON.parse(sessionStorage.getItem("consumertoken"))
      : null;
    console.log(
      "this.jwtHelperService.isTokenExpired()",
      this.jwtHelperService.isTokenExpired()
    );
    if (this.jwtHelperService.isTokenExpired(token)) {
      return false;
    } else {
      this.currentConsumerName = this.jwtHelperService.decodeToken(
        sessionStorage.getItem("consumertoken")
      )["consumerfullname"];
      /******************vivek 16-10-2022 */
      //this.loggedIn.next(true);
      /******************vivek 16-10-2022 */
      return true;
    }
  }

  roleMatch(allowedRoles): boolean {
    const userRoles = this.jwtHelperService.decodeToken(
      sessionStorage.getItem("consumertoken")
    ).roles as Array<string>;
    if (this.isFirstLogin) {
      this.router.navigate(["/consumer/change-password"]);
    }
    // return allowedRoles.some(a => userRoles.some(m => a === m));
    return true;
  }

  getConsumerLoginNewApi(body: any) {
    this.httpClient = new HttpClient(this.httpBackend);
    let headers = new Headers();
    return this.http
      .post(this.baseUrl.consumerContextPath + "/login/consumer_login", body, {
        responseType: "json",
        observe: "response",
      })
      .pipe(
        map((response: any) => {
          if (response.body.code == "200") {
            // this.loggedIn.next(true);
            const token = response.headers.get("authorization");
            const decodedToket = this.jwtHelperService.decodeToken(token);
            // this.currentConsumerName = decodedToket["consumerfullname"];
            response.body.token = token;
            return response.body;
          } else {
            return response.body;
          }
        })
      );
  }
  getConsumerByMobileNo(mobileNo: any) {
    this.httpClient = new HttpClient(this.httpBackend);
    let headers = new Headers();
    return this.http.get(
      this.baseUrl.consumerContextPath +
        "/login/getConsumerByMobileNo/" +
        mobileNo
    );
  }
}
