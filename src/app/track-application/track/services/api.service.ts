import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenerateUrl } from 'src/environments/generate-url.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private url: GenerateUrl
  ) {

  }


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
  baseUrL: string = this.url.baseUrl;
  mkmyContextPath: string = this.url.mkmyContextPath;
  contractor: String = this.url.contractor;





  getApplications(applicationNo: any, mobileNo: any, sspApplicationNo: any) {
    return this.http.get(this.consumerContextPath + '/consumer-application/getConsumerDetailsForTrackApplication?mobileNo=' + mobileNo + '&consumerAppNo=' + applicationNo + '&nscApplicationNo=' + sspApplicationNo)
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getConsumerDetailsForTrackApplication?mobileNo=8770672335&consumerAppNo=SV1702879161477

    //      https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getConsumerDetailsForTrackApplication?mobileNo=&consumerAppNo=&nscApplicationNo=SSP12345
  }

  getApplicationDetails(applicationNo: any) {
    return this.http.get(this.consumerContextPath + '/consumer-application/getConsumerDetailsfullDetailsByApplicationNo/' + applicationNo)

    //// https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getConsumerDetailsfullDetailsByApplicationNo/{consumerApplicationNo}
  }

  getAllDocumentPath(consumerApplicationId: any) {
    return this.http.get(this.mastersUrl + '/getAllApplicationDocument/' + consumerApplicationId)
  }

  forGetOtpSendOnNumber(body: any) {
    return this.http.post("https://resourceutils.mpcz.in:8888/MPCZ_OTP/api/otp/getOtp", body);
  }

  forVerifyOtp(body: any) {
    return this.http.post("https://resourceutils.mpcz.in:8888/MPCZ_OTP/api/otp/verifyOtpAll", body);
  }

  getAllPaymentDetails(applicationNo: any) {
    return this.http.get(this.consumerContextPath + '/bill-desk/getPaymentDetailsByApplicationNo/' + applicationNo)

    //  localhost:8083/deposit_scheme/api/consumer/bill-desk/getPaymentDetailsByApplicationNo/SV2023091030
  }

  getAllPymentDetailsNew(applicationNo: any) {

    //return this.http.get(this.consumerContextPath+)

    // https://dsp.mpcz.in:8888/deposit_scheme/api/consumer/bill-desk/getPaymentDetailsByApplicationNo/SV1702813892491
  }




}
