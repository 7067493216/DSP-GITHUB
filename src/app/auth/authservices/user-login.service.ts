import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserLoginViewModel } from '../authmodels/user-login-view-model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SearchKeyStatusService } from 'src/app/shared-services/search-key-status.service';
import { OtpViewModel } from '../authmodels/otp-view.model';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ListResponse } from 'src/app/shared-models/list.response.model';


@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private isFirstLogin: boolean = false;
  private httpClient: HttpClient;
  constructor(
    private router: Router,
    private httpBackend: HttpBackend,
    private jwtHelperService: JwtHelperService,
    private baseUrl: GenerateUrl,
    private notificationService: NotificationService,
    private sharedData: SearchKeyStatusService,
  ) {
  }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  currentUserName: string = null;

  public Login(userLoginViewModel: UserLoginViewModel): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
    let headers = new Headers();

    console.log('this.baseUrl: ------------------' + this.baseUrl);

    console.log('this.baseUrl.userOtpUrl: ------------------' + this.baseUrl.userOtpUrl);

    return this.httpClient.post<any>(this.baseUrl.userOtpUrl + '/verifyLoginOtp', userLoginViewModel, { responseType: "json", observe: "response" })
      .pipe(map(response => {
        if (response.body.code == '200') {
         
          this.loggedIn.next(true);
          const token = response.headers.get('Authorization');
          const decodedToket = this.jwtHelperService.decodeToken(token);
          sessionStorage.token = JSON.stringify(token);
          this.currentUserName = decodedToket['userfullname'];
          this.isFirstLogin = decodedToket['isFirstLogin'];
          if (response.body.code == '200' && !this.isFirstLogin) {
            this.router.navigate(['/user-dashboard']);
          }
          return response.body;
        } else {
          return response.body;
        }
      }));
  }
  public getOtp(otpViewModel: OtpViewModel): Observable<any> {

    console.log('this.baseUrl: -------**-----------' + this.baseUrl);
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(this.baseUrl.userOtpUrl + '/getOtp', otpViewModel);
  }
  public resendOtp(data): Observable<any> {

    console.log('this.baseUrl: -------***--*88**---------' + this.baseUrl);
    console.log(this.baseUrl);

    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(this.baseUrl.userOtpUrl + '/getLoginOtp', data);
  }
  public sendOtpToUser(data): Observable<any> {

    console.log('this.baseUrl: -------***-**----------' + this.baseUrl);
    console.log('this.baseUrl.userAuthUrl' + this.baseUrl.userAuthUrl);

    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(this.baseUrl.userAuthUrl + '/verificationCaptcha', data);
  }
  public forgotPassword(otpViewModel: OtpViewModel): Observable<any> {
    console.log('this.baseUrl: -------***-----------' + this.baseUrl);
    console.log(this.baseUrl);

    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(this.baseUrl.userAuthUrl + '/forgotPassword', otpViewModel);
  }
  getCaptcha(): Observable<ListResponse[]> {
    console.log('this.baseUrl: -------***-----------' + this.baseUrl);
    console.log(this.baseUrl);

    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.get<ListResponse[]>(this.baseUrl.userAuthUrl + '/getCaptcha');
  }
  public logout() {
  
    this.loggedIn.next(false);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('holidays');
    this.currentUserName = null;
    this.router.navigate(['user-login']);
    this.notificationService.success('::you have successfully logged out');
    this.sharedData.pushData(null);
  }

  public isAuthenticated(): boolean {
    let token = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')) : null;
    if (this.jwtHelperService.isTokenExpired()) {
      return false;
    }
    else {
      this.currentUserName = this.jwtHelperService.decodeToken(sessionStorage.getItem('token'))['userfullname'];
      return true;
    }
  }

  roleMatch(allowedRoles): boolean {
    const userRoles = this.jwtHelperService.decodeToken(sessionStorage.getItem('token')).roles as Array<string>
    if (this.isFirstLogin) {
      this.router.navigate(['/change-password']);
    };
    return allowedRoles.some(a => userRoles.some(m => a === m));
    return true;
  }
}
