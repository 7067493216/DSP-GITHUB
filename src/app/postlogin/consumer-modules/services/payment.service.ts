import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SpinnerService } from "src/app/shared-services/spinner.service";
import { GenerateUrl } from "src/environments/generate-url.model";







@Injectable({
    providedIn: "root",
})
export class BillPaymentService {
    mode: string;
    msg: string;

    constructor(
        private http: HttpClient,
        private spinner: SpinnerService,
        private url: GenerateUrl
    ) { }
    masterUrl = this.url.mastersUrl;
    PayuBaseUrl: string = this.url.paymentServiceForPayu;
    consumerApplicationUrl: string = this.url.consumerApplicationUrl;
    userApplicationUrl: string = this.url.userApplicationUrl;
    userSurveyUrl: string = this.url.userSurveyUrl;
    dcAcceptanceUrl: string = this.url.dcAcceptanceUrl;
    consumerContextPath: string = this.url.consumerContextPath;
    //mastersUrl: string = this.url.mastersUrl;
    qcportalUrl: string = this.url.qcportalUrl;
    contextPath: string = this.url.contextPath;
    userDemandUrl: string = this.url.userDemandUrl;
    userPreviousStageUrl: string = this.url.userPreviousStageUrl;
    demandApproavlUrl: string = this.url.demandApproavlUrl;
    erp: string = this.url.erp;
    userContextPath = this.url.userContextPath;


    // let consumerApplicationDetail = await this.http.get(this.masterUrl + '/getApplicationdDetailByNumber/' + this.consumerApplicationNo).toPromise();

    GetApplicationdDetailByNumber(consumerApplicationNo: any) {
        return this.http.get(this.masterUrl + '/getApplicationdDetailByNumber/' + consumerApplicationNo);
    }

    getbillPaymentProcess(body: any) {
        return this.http.post(this.consumerContextPath + '/bill-desk/billPaymentProcess', body);
    }

    getErpEstimateCalculations(consumerApplicationId:number) {
     return   this.http.get(this.erp + '/erpEstimateCalculations/' + consumerApplicationId);
    }

    downloadPymentReciept(consumerApplicationNo:string,id:string){
     return   this.http.get(this.consumerContextPath + '/bill-desk/fess_genreted_recipt/'+ consumerApplicationNo + '/' + id);
    }

consumerPaymentDataDetails(billdeskPaymentRequestId:any){
    return this.http.get(this.consumerContextPath + '/bill-desk/billPaymentsProcess/' +billdeskPaymentRequestId);
}

getOIDtOKENforMkmy(billdeskPaymentRequestId:any){
    return this.http.get(this.consumerContextPath + "/bill-desk/billPaymentsProcess/" + billdeskPaymentRequestId);
}

getErpRevisedData(erpNo:any,ApplicationNumber:any,Num:any){
   return this.http.get( this.url.baseUrl+"/deposit_scheme/ErpRev/RevErpDataNew/"+erpNo+"/"+ApplicationNumber+'/'+Num);
}

// localhost:8083/deposit_scheme/ErpRev/RevErpDataNew/60173/DS2023092061  

// getErpRevisedData(erpNo:any,ApplicationNumber:any,Num:any){
//     return this.http.get( this.url.baseUrl+"/deposit_scheme/ErpRev/RevErpDataNew/"+erpNo+"/"+ApplicationNumber+'/'+Num);
//  }







}