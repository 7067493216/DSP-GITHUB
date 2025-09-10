import { Injectable } from "@angular/core";
import { HttpClient, HttpBackend } from "@angular/common/http";
import { Observable, BehaviorSubject, Subject } from "rxjs";

import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { NotificationService } from "src/app/shared-services/notification.service";
import { SearchKeyStatusService } from "src/app/shared-services/search-key-status.service";

import { GenerateUrl } from "src/environments/generate-url.model";
import { ListResponse } from "src/app/shared-models/list.response.model";
import { OtpViewModel } from "src/app/auth/authmodels/otp-view.model";
import { UserLoginViewModel } from "../models/user-login-view-model";

@Injectable({
  providedIn: "root",
})
export class UserLoginService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private isFirstLogin: boolean = false;
  private httpClient: HttpClient;
  newUrl: string = "";
  contextPath: string = this.url.contextPath;

switchDc = new Subject<any>();
switchDivision = new Subject<any>();

  constructor(
    private router: Router,
    private url: GenerateUrl,
    private httpBackend: HttpBackend,
    private jwtHelperService: JwtHelperService,
    private baseUrl: GenerateUrl,
    private notificationService: NotificationService,
    private sharedData: SearchKeyStatusService,
    private http: HttpClient,
  ) {}
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  currentUserName: string = null;
  //===========old method==============================================
  public Login(userLoginViewModel: UserLoginViewModel): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
    let headers = new Headers();

    console.log("this.baseUrl: ------------------" + this.baseUrl);

    console.log(
      "this.baseUrl.userOtpUrl: ------------------" + this.baseUrl.userOtpUrl
    );

    return this.httpClient
      .post<any>(
        this.baseUrl.userOtpUrl + "/verifyLoginOtp",
        userLoginViewModel,
        { responseType: "json", observe: "response" }
      )
      .pipe(
        map((response) => {
          if (response.body.code == "200") {
            this.loggedIn.next(true);
            const token = response.headers.get("Authorization");
            // const decodedToket = this.jwtHelperService.decodeToken(token);
            // sessionStorage.usertoken = JSON.stringify(token);
            // this.currentUserName = decodedToket["userfullname"];
            // this.isFirstLogin = decodedToket["isFirstLogin"];
            //  if (response.body.code == "200" && !this.isFirstLogin) {
            //  this.router.navigate(["/user/dashboard"]);
            //  }
            return response.body;
          } else {
            return response.body;
          }
        })
      );
  }
  //=================================================================
  //========== new login api on 25 sep 2023==============================
  //deposit_scheme/api/user/login/user_login
  public userLogin(userLoginViewModel: UserLoginViewModel): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
    let headers = new Headers();

    return this.httpClient
      .post<any>(
        this.baseUrl.baseUrl + "/deposit_scheme/api/user/login/user_login",
        userLoginViewModel,
        { responseType: "json", observe: "response" }
      )
      .pipe(
        map((response: any) => {
          if (response.body.code == "200") {
            this.loggedIn.next(true);
            const token = response.headers.get("Authorization");
            const decodedToket = this.jwtHelperService.decodeToken(token);
            // sessionStorage.usertoken = JSON.stringify(token);
            //this.currentUserName = decodedToket["userfullname"];
            this.isFirstLogin = decodedToket["isFirstLogin"];
            //if (response.body.code == "200" && !this.isFirstLogin) {
            //   //this.router.navigate(["/user/dashboard"]);

            // }
            return response.body;
          } else {
            return response.body;
          }
        })
      );
  }
  //===============new getotp method========================================
  public getUserLoginOtp(data: any): Observable<any> {
    //console.log('this.baseUrl: -------**-----------' + this.baseUrl);
    this.httpClient = new HttpClient(this.httpBackend);
    this.newUrl = "https://resourceutils.mpcz.in:8888/MPCZ_OTP/api/otp/getOtp";
    return this.httpClient.post<any>(this.newUrl, data);
  }

  //=================================================================
  //==========new verifyotp method====================================
  public verifyOtp(data: any) {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(
      "https://resourceutils.mpcz.in:8888/MPCZ_OTP/api/otp/verifyOtpAll",
      data
    );
  }
  //===========================================================================
  public getOtp(otpViewModel: OtpViewModel): Observable<any> {
    console.log("this.baseUrl: -------**-----------" + this.baseUrl);
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(
      this.baseUrl.userOtpUrl + "/getOtp",
      otpViewModel
    );
  }

  public resendOtp(data): Observable<any> {
    console.log("this.baseUrl: -------***--*88**---------" + this.baseUrl);
    console.log(this.baseUrl);
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(
      this.baseUrl.userOtpUrl + "/getLoginOtp",
      data
    );
  }

  public sendOtpToUser(data): Observable<any> {
    console.log("this.baseUrl.userAuthUrl" + this.baseUrl.userAuthUrl);

    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(
      this.baseUrl.userAuthUrl + "/verificationCaptcha",
      data
    );
  }
  public forgotPassword(otpViewModel: OtpViewModel): Observable<any> {
    console.log(this.baseUrl);
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(
      this.baseUrl.userAuthUrl + "/forgotPassword",
      otpViewModel
    );
  }

  //=========== new method to get data by userid
  public getUserByuserId(userid: any): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.get<any>(
      this.baseUrl.userAuthUrl + "/getUserById/" + userid
    );
  }
  getCaptcha(): Observable<ListResponse[]> {
    console.log("this.baseUrl: -------***-----------" + this.baseUrl);
    console.log(this.baseUrl);

    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.get<ListResponse[]>(
      this.baseUrl.userAuthUrl + "/getCaptcha"
    );
  }
  public logout() {
    this.loggedIn.next(false);
    sessionStorage.removeItem("usertoken");
    sessionStorage.removeItem("holidays");
    this.currentUserName = null;
    this.router.navigate(["/user/login"]);
    this.notificationService.success("::you have successfully logged out");
    this.sharedData.pushData(null);
    
  }

  public isAuthenticated(): boolean {
    let token = sessionStorage.getItem("usertoken")
      ? JSON.parse(sessionStorage.getItem("usertoken"))
      : null;
    if (this.jwtHelperService.isTokenExpired(token)) {
      return false;
    } else {
      this.currentUserName = this.jwtHelperService.decodeToken(
        sessionStorage.getItem("usertoken")
      )["userfullname"];
      /******************vivek 16-10-2022 */
      this.loggedIn.next(true);
      /******************vivek 16-10-2022 */
      return true;
    }
  }

  roleMatch(allowedRoles): boolean {
    const userRoles = this.jwtHelperService.decodeToken(
      sessionStorage.getItem("usertoken")
    ).roles as Array<string>;
    if (this.isFirstLogin) {
      this.router.navigate(["/user/change-password"]);
    }
    return allowedRoles.some((a) => userRoles.some((m) => a === m));
    return true;
  }

  getUserDetails(loginId:any){
return this.http.get(this.contextPath+'/adminChangable/user/getConsumerByLoginId/'+loginId);

//  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/adminChangable/user/getConsumerByLoginId/{loginId}
    //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/adminChangable/getConsumerByLoginId/{loginId}
  }
}
