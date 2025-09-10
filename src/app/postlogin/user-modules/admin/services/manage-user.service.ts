import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { SignUpModel } from '../models/signUp.model';
import { UserStatus } from '../models/user-status.model';
import { GenerateUrl } from 'src/environments/generate-url.model';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {
  baseUrl: string = this.url.mastersUrl;
  userAuthUrl: string = this.url.userAuthUrl;
   consumerContextPath: string = this.url.consumerContextPath;
   mastersUrl: string = this.url.mastersUrl;
    initialBasUrl: string = this.url.initialBasUrl;
    consumerApplicationUrl: string = this.url.consumerApplicationUrl;
    userApplicationUrl: string = this.url.userApplicationUrl;
    userSurveyUrl: string = this.url.userSurveyUrl;
    dcAcceptanceUrl: string = this.url.dcAcceptanceUrl;
    qcportalUrl: string = this.url.qcportalUrl;
    contextPath: string = this.url.contextPath;
    userDemandUrl: string = this.url.userDemandUrl;
    userPreviousStageUrl: string = this.url.userPreviousStageUrl;
    demandApproavlUrl: string = this.url.demandApproavlUrl;
    erp: string = this.url.erp;
    userContextPath = this.url.userContextPath;
    baseUrL: string = this.url.baseUrl;
    mkmyContextPath: string = this.url.mkmyContextPath;
    contractor: String = this.url.contractor;
    bBaseUrl: string = this.url.bBaseUrl;

  constructor(
    private http: HttpClient,
    private url: GenerateUrl
  ) { }

  addUser(reg: SignUpModel) {
    return this.http.post(this.userAuthUrl + '/signup', reg);
  }

  updateUser(userId: number, reg: SignUpModel): Observable<any> {
    return this.http.put(this.userAuthUrl + '/updateUser/' + userId, reg);
  }
  getUserById(userId: number): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.userAuthUrl + '/get/' + userId);
  }
  viewUserById(userId: number): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.userAuthUrl + '/getUser/' + userId);
  }
  getUserList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.userAuthUrl + '/getAll');
  }
  getDesignationList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllDesignation');
  }
  getAccessLevel(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllAccessLevel');
  }

  getRoleList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllRole');
  }

  // changeUserStatus(userId: number,status: UserStatus) : Observable<any>{
  //   console.log('chal ja urrrrrrrrrrrrrrrrrrrrrrrrrrrrr',userId,status)
  //   return this.http.put(this.userAuthUrl + '/changeUserStatus/'+userId, status);
  // }

  changeUserStatus(userId: number, status: UserStatus): Observable<any> {
    return this.http.put(this.userAuthUrl + '/changeUserStatus/' + userId, status);
  }

  // sandeep, start
  getUsersByCircle(circleId: number): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.userAuthUrl + '/getUsersByCircleId/' + circleId);
  }

  getUserByLoginId(loginId: number): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.userAuthUrl + '/getUserByLoginId/' + loginId);
  }
  // sandeep, end


  multipleDcAccessForUser(body:any){
    
    return this.http.put(this.url.contextPath+'/adminChangable/user/updataAddUserTable',body)
    // localhost:8083/deposit_scheme/api/adminChangable/user/updataAddUserTable
  }

  getDcByDivisionId(divId:any){
return this.http.get(this.consumerContextPath+'/dc/findAllDistributionCentersBydcIdAnddcSubdivision_subDivisionIdAndSubdivisionDivision_divisionId/'+divId)

    // https://dsp.mpcz.in:8888/deposit_scheme/api/consumer/dc/findAllDistributionCentersBydcIdAnddcSubdivision_subDivisionIdAndSubdivisionDivision_divisionId/9
  }

  getMisRefund(){
    return this.http.get(this.url.baseUrl+'/deposit_scheme/mis_details/refundAmountMIS');
    // https://dsp.mpcz.in:8888/deposit_scheme/mis_details/refundAmountMIS
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/ReSampling/getSampleData/{flagNo}

  }

   getApplicationDocumentData(consumerApplicationId: any) {
   
    return this.http.get(this.mastersUrl + '/getAllApplicationDocument/' + consumerApplicationId)
  }

   getConsumerAccountDetails(applicationNo: any) {
        return this.http.get(this.contextPath + '/consumer_account_deatils/getConsumerAccountDetails/' + applicationNo);

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer_account_deatils/getConsumerAccountDetails/SV2023094168
    }


}
