import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenerateUrl } from 'src/environments/generate-url.model';

@Injectable({
  providedIn: 'root'
})
export class MkmyPaymentService {

  consumerApplicationUrl: string = this.url.consumerApplicationUrl;
  userApplicationUrl: string = this.url.userApplicationUrl;
  userSurveyUrl: string = this.url.userSurveyUrl;
  dcAcceptanceUrl: string = this.url.dcAcceptanceUrl;
  consumerContextPath: string = this.url.consumerContextPath;
  mastersUrl: string = this.url.mastersUrl;
  qcportalUrl: string = this.url.qcportalUrl;
  contextPath: string = this.url.contextPath;
  userDemandUrl: string = this.url.userDemandUrl;
  userPreviousStageUrl: string = this.url.userPreviousStageUrl;
  demandApproavlUrl: string = this.url.demandApproavlUrl;
  erp: string = this.url.erp;
  userContextPath = this.url.userContextPath;
  baseUrL:string = this.url.baseUrl;
  mkmyContextPath:string = this.url.mkmyContextPath;

  constructor(
    private http: HttpClient,
    private url: GenerateUrl
  ) { }

getMkmyAmountByConsumerApplicationNumber(consumerAppNo:any){
  return this.http.get(this.mkmyContextPath+'/getMkmyAmountByConsumerApplicationNo/'+consumerAppNo);
//   https://rooftop-uat.mpcz.in:8888/deposit_schemeee/api/mmky/getMkmyAmountByConsumerApplicationNo/{consumerAppNo}  
}

getMkmyOidAndAuthToken(body:any){
  return this.http.post(this.consumerContextPath +'/bill-desk/billPaymentProcess',body);
  //  https://rooftop-uat.mpcz.in:8888/deposit_schemeee/api/consumer/bill-desk/billPaymentProcess
}

getErpDetailsByErpNumber(erpNumber:any,consumerApplicationNumber:any){
  return this.http.get(this.mkmyContextPath+'/erpMkmypApi/'+erpNumber+'/'+consumerApplicationNumber);
         //https://dsp.mpcz.in:8888/deposit_schemeee/api/mmky/erpMkmypApi/60173/DS2023092061
       }


}
