import { Injectable } from "@angular/core";
import { environment } from "./environment.uat";


@Injectable({
  providedIn: "root",
})

export class GenerateUrl {
  envName = environment.envName;
  discom: string = "";
  backendPort: string = "";
  baseUrl: string = "";
  transUrl: string = "";
  consumerContextPath = "";
  mkmyContextPath = "";
  userContextPath = "";
  contextPath = "";
  consumerDashboard: string;
  authUrl: string = "";
  userAuthUrl: string = "";
  otpUrl: string = "";
  userOtpUrl: string = "";
  roleUrl: string = "";
  mastersUrl: string = "";
  districtUrl: string = "";
  tehsilUrl: string = "";
  cityUrl: string = "";
  circleUrl: string = "";
  dcUrl: string = "";
  designationUrl: string = "";
  divisionUrl: string = "";
  feederUrl: string = "";
  regionUrl: string = "";
  subDivisionUrl: string = "";
  subStationUrl: string = "";
  nscUrl: string = "";
  consumerApplicationUrl: string = "";
  userApplicationUrl: string = "";
  userSurveyUrl: string = "";
  userDemandUrl: string = "";
  userPreviousStageUrl: string = "";
  applicationTypeUrl: string = "";
  documentTypeUrl: string = "";
  qcportalUrl: string = "";
  consumerSignupUrl: string = "";
  consumerAccContextPath = "";
  consumerPaymentUrl = "";
  paymentServiceForPayu = "";
  payuUrl = "";
  dcAcceptanceUrl = "";
  demandApproavlUrl = "";
  erp = "";
  contractor = "";
  loadRequestedurl = "";
  substationurlUser = "";
  feederUrlUser = "";
  bBaseUrl = "";
  initialBasUrl: string = ''
  constructor() {
    console.log("this.envName::", this.envName);

    if (this.envName === "prod") {
      // this.baseUrl = 'https://dsp.mpcz.in:8888';
      this.baseUrl = "https://dsp.mpcz.in:8888";
      this.payuUrl = "";
    } else if (this.envName === "uat") {
      // this.baseUrl= "https://poscollection.mpcz.in:8888"
      this.baseUrl = "https://rooftop-uat.mpcz.in:8888";
      this.payuUrl = "https://test.payu.in/_payment";
    } else if (this.envName === "local") {
      // this.baseUrl = 'http://localhost:8083';
      // this.payuUrl = 'https://test.payu.in/_payment';
    }

    this.initialBasUrl = this.baseUrl;
    this.consumerContextPath = this.baseUrl + "/deposit_scheme/api/consumer";
    this.mkmyContextPath = this.baseUrl + "/deposit_scheme/api/mmky";
    // this.consumerAccContextPath = this.baseUrl + '/deposit_scheme/api/consumer-acc';
    this.userContextPath = this.baseUrl + "/deposit_scheme/api/user";
    this.contextPath = this.baseUrl + "/deposit_scheme/api";
    this.bBaseUrl = this.baseUrl + '/deposit_scheme';


    this.consumerDashboard = this.consumerContextPath + "/consumer-dashboard";

    this.authUrl = this.consumerContextPath + "/login";
    this.otpUrl = this.consumerContextPath + "/otp";

    this.userAuthUrl = this.userContextPath + "/login";
    this.userOtpUrl = this.userContextPath + "/otp";

    this.roleUrl = this.consumerContextPath + "/role";
    this.mastersUrl = this.contextPath + "/master";
    this.districtUrl = this.consumerContextPath + "/district";
    this.tehsilUrl = this.consumerContextPath + "/tehsil";
    this.cityUrl = this.consumerContextPath + "/city";
    this.circleUrl = this.userContextPath + "/circle";
    this.dcUrl = this.consumerContextPath + "/dc";
    this.designationUrl = this.consumerContextPath + "/designation";
    this.divisionUrl = this.userContextPath + "/division";
    this.feederUrl = this.consumerContextPath + "/feeder";
    this.regionUrl = this.userContextPath + "/region";
    this.subDivisionUrl = this.userContextPath + "/subdivision";
    this.subStationUrl = this.consumerContextPath + "/substation";
    this.nscUrl = this.consumerContextPath + "/nsc";
    this.consumerApplicationUrl =
      this.consumerContextPath + "/consumer-application";
    this.applicationTypeUrl = this.userContextPath + "/application-type";
    this.documentTypeUrl = this.userContextPath + "/document-type";
    // this.qcportalUrl = 'https://qcportal.mpcz.in';
    this.consumerSignupUrl = this.consumerContextPath + "/signup";
    // this.consumerSignupUrl = this.consumerAccContextPath + '/signup';
    this.userApplicationUrl = this.userContextPath + "/consumer-application";
    this.userSurveyUrl = this.userContextPath + "/application-survey";
    this.userDemandUrl = this.userContextPath + "/demand";
    this.userPreviousStageUrl = this.userContextPath + "/previous-stage";
    this.consumerPaymentUrl = this.consumerContextPath + "/payment";
    this.dcAcceptanceUrl = this.userContextPath + "/application-dc-change";
    this.demandApproavlUrl = this.userContextPath + "/demand-approval";
    this.erp = this.userContextPath + "/erp";
    this.contractor = this.consumerContextPath + "/qc-portal";
    this.loadRequestedurl = this.consumerContextPath + "/load-requested";
    this.substationurlUser = this.userContextPath + "/substation";
    this.feederUrlUser = this.userContextPath + "/feeder";
  }
  translateUrl = this.transUrl + "/processWordJSON";
}







