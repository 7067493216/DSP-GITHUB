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



getMkmyOidAndAuthToken(body:any){
  return this.http.post(this.consumerContextPath +'/bill-desk/billPaymentProcess',body);
  //  https://rooftop-uat.mpcz.in:8888/deposit_schemeee/api/consumer/bill-desk/billPaymentProcess
  //  https://rooftop-uat.mpcz.in:8888/deposit_schemeee/api/consumer/bill-desk/billPaymentProcess
}

tdsSubmitPostApi(consumerAppNo:any,section194j:any,section194C:any,section51:any,tds10:any,tds2:any){
// return this.http.post(this.contextPath+"/tds/save",body)
 // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/tds/save
 return this.http.post(this.contextPath+'/tds/save?consumerAppNo='+consumerAppNo+'&section194='+section194j+'&section194C='+section194C+'&section51='+section51+'&tds10='+tds10+'&tds2='+tds2,null)

 // http://localhost:8083/deposit_scheme/api/tds/save?consumerAppNo=DS1755083749383&section194=true&section194C=true&section51=null&tds10=null&tds2=true
}

paymentDetailsAfterTds(consumerAppNo:any){
  return this.http.get(this.contextPath+'/tds/tdsDemandCalculation/'+consumerAppNo);

  //  https://rooftop-uat.mpcz.in:8888/deposit_schemeee/api/tds/tdsDemandCalculation/{consumerAppNo}
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

getMkmyAmountByConsumerApplicationNumber(consumerAppNo:any){
  return this.http.get(this.mkmyContextPath+'/getMkmyAmountByConsumerApplicationNo/'+consumerAppNo);
//   https://rooftop-uat.mpcz.in:8888/deposit_schemeee/api/mmky/getMkmyAmountByConsumerApplicationNo/{consumerAppNo}  
}



getErpDetailsByErpNumber(erpNumber:any,consumerApplicationNumber:any){
  return this.http.get(this.mkmyContextPath+'/erpMkmypApi/'+erpNumber+'/'+consumerApplicationNumber);
         //https://dsp.mpcz.in:8888/deposit_schemeee/api/mmky/erpMkmypApi/60173/DS2023092061
       }


}
