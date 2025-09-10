import { HttpBackend, HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { ListResponse } from "src/app/shared-models/list.response.model";
import { GenerateUrl } from "src/environments/generate-url.model";
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Injectable({
  providedIn: "root",
})
export class NewApplicationService {
  constructor(private http: HttpClient, private url: GenerateUrl, private httpBackend: HttpBackend, private jwtHelperService: JwtHelperService,) { }

  consumerApplicationUrl: string = this.url.consumerApplicationUrl;
  mastersUrl: string = this.url.mastersUrl;
  qcportalUrl: string = this.url.qcportalUrl;
  contextPath: string = this.url.contextPath;
  userContextPath: string = this.url.userContextPath;
  dcUrl: string = this.url.dcUrl;
  contractor: String = this.url.contractor;
  mkmyContextPath: string = this.url.mkmyContextPath;
  consumerContextPath: string = this.url.consumerContextPath;
  bBaseUrl: string = this.url.bBaseUrl;
  userSurveyUrl: string = this.url.userSurveyUrl;
  userDemandUrl: string = this.url.userDemandUrl;
  // userContextPath = this.url.userContextPath;


  initialBasUrl: string = this.url.initialBasUrl;

  userApplicationUrl: string = this.url.userApplicationUrl;

  dcAcceptanceUrl: string = this.url.dcAcceptanceUrl;

  userPreviousStageUrl: string = this.url.userPreviousStageUrl;
  demandApproavlUrl: string = this.url.demandApproavlUrl;
  erp: string = this.url.erp;
  baseUrL: string = this.url.baseUrl;

  unsubscribe$: Subject<void> = new Subject();

  addNewApplication(reg: any) {
    return this.http.post(this.consumerApplicationUrl + "/add", reg);
  }

  updateNewApplication(
    consumerApplicationId: number,
    reg: any
  ): Observable<any> {
    return this.http.put(
      this.consumerApplicationUrl + "/update/" + consumerApplicationId,
      reg
    );
  }

  getNewApplicationById(
    consumerApplicationId: number
  ): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(
      this.consumerApplicationUrl + "/get/" + consumerApplicationId
    );
  }

  getNewApplicationList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(
      this.consumerApplicationUrl + "/getAll"
    );
  }

  getApplicationTypeList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(
      this.mastersUrl + "/getAllApplicationType"
    );
  }

  getLandAreaUnit(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(
      this.mastersUrl + "/getAllLandAeraUnit"
    );
  }
  // charitra prajapati start 16-01-2023
  getNatureOfWorkTypeList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(
      this.mastersUrl + "/getAllNatureOfWork"
    );
  }
  getDistrictList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.mastersUrl + "/getAllDistrict");
  }

  getloadRequested(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(
      this.mastersUrl + "/getAllLoadRequested"
    );
  }

  getLandAreaUnitOne(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(
      this.mastersUrl + "/getAllLandAeraUnitHe"
    );
  }
  getIndividualOrGroup(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(
      this.mastersUrl + "/getAllIndividualOrGroup"
    );
  }

  getTariffCategoryList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(
      this.mastersUrl + "/getAllTariffCategory"
    );
  }

  getSupplyVoltageList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(
      this.mastersUrl + "/getAllSupplyVoltage"
    );
  }

  getSchemeTypeList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.mastersUrl + "/getAllSchemeType");
  }

  getWorkypeList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.mastersUrl + "/getAllWorkType");
  }

  getTaskypeList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.mastersUrl + "/getAllTaskType");
  }

  getContractorList(supplyVoltageId: number): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(
      this.contextPath + "/qc-portal/getAllContractor/" + supplyVoltageId
    );
  }

  getDocumentTypeList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(
      this.mastersUrl + "/getAllDocumentType"
    );
  }

  getDcList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(
      this.mastersUrl + "/getAllDistributionCenter"
    );
  }

  getSubstationByDc(dcId: number): Observable<any> {
    return this.http.get(this.mastersUrl + "/getAllSubstationByDC/" + dcId);
  }

  getFeederBySubstation(substationId: number): Observable<any> {
    console.log("substationId :-", substationId);
    return this.http.get(
      this.mastersUrl + "/getAllFeederBySubstation/" + substationId
    );
  }

  getAllNewApplicationPaginate(param): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(
      this.consumerApplicationUrl + "/getAllPaginate/?" + param
    );
  }


  getDistributionByID(dcId: number): Observable<any> {/////////////////////////////

    return this.http.get(this.consumerContextPath + '/consumer-application/getDcByDistrictId/' + dcId);

    //  https://dsp.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getDcByDistrictId/7
  }
  getLoadRequestedById(loadrequestedId: number): Observable<any> {
    return this.http.get(
      this.dcUrl + "/getRequestedByLongId/" + loadrequestedId
    );
  }

  addContractor(reg: any) {
    return this.http.post(this.contractor + "/saveForQcPortal", reg);
  }
  addDGMSTC(reg: any) {
    return this.http.post(this.userContextPath + "/saveDgmStc", reg);
  }

  getLoginAccountDetails(consumerLoginId: any): Observable<any> {
    return this.http.get<any>(
      this.consumerApplicationUrl + "/getLoginAccountDetail/" + consumerLoginId
    );
  }

  getConsumrApplicationData(consumerApplicationId: any): Observable<any> {
    return this.http.get(
      this.consumerApplicationUrl + "/get/" + consumerApplicationId
    );
  }

  getDistributionDatas(dcId: any): Observable<any> {
    return this.http.get<any>(this.dcUrl + "/get/" + dcId);
  }

  getMukhyaMantriYojnaConsumerApplicationDetails(body: any) {
    const headers = new HttpHeaders()
    return this.http.post(
      this.url.baseUrl + "/deposit_scheme/samagra/SamgraDataBySamgraId",
      body
    );
    //https://rooftop-uat.mpcz.in:8888/deposit_scheme/samagra/SamgraDataBySamgraId
  }

  SubmitMkmy(body: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data', // Replace with the expected content type
    });

    return this.http.post(
      //  this.consumerApplicationUrl + "/consumerApplicationUpdateByMKMY",
      this.consumerApplicationUrl + '/consumerApplicationUpdateByMKMY',
      // "https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/consumerApplicationUpdateByMKMY",
      body
    );
  }

  getErpDetailsByErpNumber(erpNumber: any, consumerApplicationNumber: any) {
    return this.http.get(this.mkmyContextPath + '/erpMkmypApi/' + erpNumber + '/' + consumerApplicationNumber);
    //https://dsp.mpcz.in:8888/deposit_scheme/api/mmky/erpMkmypApi/60173/DS2023092061
  }

  getDcByDistrictId(districtId: any) {
    return this.http.get(this.consumerContextPath + '/consumer-application/getDcByDistrictId/' + districtId)
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getDcByDistrictId/{districtId}
  }

  getDemandPaymentDetails(id: number) {
    return this.http.get(this.userContextPath + '/erp/getamount/' + id)
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/erp/getamount/1315
  }

  getDemandPaymentDetailsWithoutMKMY(ApplicationNumber: any) {
    return this.http.get(this.mkmyContextPath + '/getMkmyAmountByConsumerApplicationNo/' + ApplicationNumber);
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/mmky/getMkmyAmountByConsumerApplicationNo/DS1702661536835

  }

  getPaymentReciptData(consumerAppNo: any) {

    return this.http.get(this.contextPath + '/manualpayments/getPaymentByApplication/' + consumerAppNo)
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/manualpayments/getPaymentByApplication/{consumerAppNo}

    // return this.http.get(this.contextPath + '/manualpayments/getManualPaymentByBillRefNo/' + billRefNo)
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/manualpayments/getManualPaymentByBillRefNo/{billRefNo}
  }

  getAllPaymentDetails(applicationNo: any) {
    return this.http.get(this.consumerContextPath + '/bill-desk/getPaymentDetailsByApplicationNo/' + applicationNo);

    //  localhost:8083/deposit_scheme/api/consumer/bill-desk/getPaymentDetailsByApplicationNo/SV2023091030
  }

  newFileAgainSubmit(body: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.put<any>(this.consumerContextPath + '/consumer-application/updateJERejectedDocument', body, { headers })
    //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/updateJERejectedDocument
  }

  getApplicationDocumentData(consumerApplicationId: any) {
    // this.http = new HttpClient(this.httpBackend);
    // let headers = new Headers();
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`
    // });
    return this.http.get(this.mastersUrl + '/getAllApplicationDocument/' + consumerApplicationId)
  }
  getDgmHtcNameByCircleId(circleId: any) {
    return this.http.get(this.url.userContextPath + '/login/getUserRoleByCricleId/' + circleId);
    ////// https://dsp.mpcz.in:8888//deposit_scheme/api/user/login/getUserRoleByCricleId/1
    /////  https://dsp.mpcz.in:8888/deposit_scheme/api/user/login/getUserRoleByCricleId/1
  }

  getWorkOrderDetailsData(consumerApplicationNo: any) {
    return this.http.get(this.userContextPath + '/save-work-order/workorders/' + consumerApplicationNo);
  }

  getContractorDetails(consumerApplicationNo: any) {
    return this.http.get(this.consumerContextPath + '/qc-portal/conforbid/' + consumerApplicationNo);
  }

  // getAllPaymentDetails(applicationNo: any) {
  //   return this.http.get(this.consumerContextPath + '/bill-desk/getPaymentDetailsByApplicationNo/' + applicationNo);

  //   //  localhost:8083/deposit_scheme/api/consumer/bill-desk/getPaymentDetailsByApplicationNo/SV2023091030
  // }

  updateConsumerApplicationDetailsAgain(consumerApplicatioId: any, body: any) {
    return this.http.put(this.consumerContextPath + '/consumer-application/updateConsumerApplicationDetailToChangeScheme/' + consumerApplicatioId, body)

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/updateConsumerApplicationDetailToChangeScheme/{id}
  }

  getJeRemarkList(consumerAppNo: any) {
    return this.http.get(this.consumerContextPath + '/consumer-application/getAllJeRemarkForUpdation/' + consumerAppNo);

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getAllJeRemarkForUpdation/{consumerAppNo}
  }

  getFinalConnectionPradaaiDetailsForApplicationView(consumerAppNo: any) {
    return this.http.get(this.bBaseUrl + '/NgbStagingData/getNgbDataByApplicationNo/' + consumerAppNo)
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/NgbStagingData/getNgbDataByApplicationNo/{consumerAppNo}
  }


  ComplainCreatedByConsumer(body: any) {
    return this.http.post(this.consumerContextPath + '/consumer-application/saveApplicantWorkIssues', body);

    //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/saveApplicantWorkIssues
  }

  feedbackByConsumer(body: any) {
    return this.http.post(this.consumerContextPath + '/consumer-application/saveApplicantFeedback', body);

    //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/saveApplicantFeedback
  }

  getConsumerApplicationDetailsByConsumerApplicationNumber(consumerApplicationNumber: any) {
    return this.http.get(this.consumerContextPath + '/consumer-application/getConsumerApplicationDetailsByConsumerApplicationNo/' + consumerApplicationNumber);
  }

  getAllComplainByConsumer(applicationNo: any) {
    return this.http.get(this.consumerContextPath + "/consumer-application/getAllApplicantWorkIssues/" + applicationNo);

    //   https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getAllApplicantWorkIssues/{consumerApplicationNo}
  }




  getAllApplicationListForRefundOfReturnMaterials(consumerId: any) {
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer ' + token
    // });
    return this.http.get(this.contextPath + "/refundAmount/getAllJeReturnAmountApp/" + consumerId);
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/refundAmount/getAllJeReturnAmountApp/{consumerId} 

  }

  getConsumerDetails() {
    const cunsumerDetails = JSON.parse(sessionStorage.getItem("objecOfConsumers"));
    return cunsumerDetails;
  }

  getToken() {
    const consumerToken = sessionStorage.getItem("consumertoken");
    return consumerToken;
  }


  getAllApplicationListForConsumer(consumerId: any) {
    return this.http.get(this.contextPath + '/refundAmount/getAllApplicationByConsumerId/' + consumerId);

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/refundAmount/getAllApplicationByConsumerId/{consumerId}
  }



  refundRequestSubmitOfCancellationApplicationByConsumer(body: any, token: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.post(this.contextPath + '/refundAmount/consumer/saveApplicationCancelletion', body, { headers })

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/refundAmount/consumer/saveApplicationCancelletion
    // 
  }

  refundRequestSubmitOfReviseApplicationByConsumer(body:any,token:any){
 const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.post(this.contextPath+'/refundAmount/user/saveRefundDetails',body, { headers });

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/refundAmount/user/saveRefundDetails
  }

  refundRequestSubmitOfReturnMaterialsApplicationByConsumer(body: any, token: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.post(this.contextPath + "/refundAmount/consumer/saveReturnAmntApplication", body, { headers });
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/refundAmount/consumer/saveReturnAmntApplication
  }

  checkNoOfPayment(consumerApplicationNo: any) {
    return this.http.get(this.userContextPath + '/erp/checkDemandOrReviseDemandRefund/' + consumerApplicationNo);

    //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/erp/checkDemandOrReviseDemandRefund/{consumerApplicationNo}
  }

  getErpRevisedData(erpNo: any, ApplicationNumber: any, Num: any) {
    return this.http.get(this.url.baseUrl + "/deposit_scheme/ErpRev/RevErpDataNew/" + erpNo + "/" + ApplicationNumber + '/' + Num);
  }

  getPaymentDataOfReviseForNegitive(consumerApplicationNo: any) {
    return this.http.get(this.userContextPath + '/erp/getErpRevDataForRefund/' + consumerApplicationNo)

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/erp/getErpRevDataForRefund/{consumerApplicationNo}
  }

  refundPayableAmountTable(consumerApplicationNo: any, value: any) {

    return this.http.get(this.contextPath + "/refundAmount/getPaymentRefundDetails/" + consumerApplicationNo + "/" + value);
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/refundAmount/getPaymentRefundDetails/{consumerApplicationNo}/{value}

    // return this.http.get(this.userContextPath + '/erp/getErpData/' + consumerApplicationNo + '/' + value)

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/erp/getErpData/{consumerApplicationNo}/{value}
  }



  apiForReturnMaterials(unknownKey: any) {
    return this.http.get("https://dsp.mpcz.in:8888/newerp/xxpa_retun_bal_qty_message_v/" + unknownKey)
    // https://dsp.mpcz.in:8888/newerp/xxpa_retun_bal_qty_message_v/161386
  }

  getAllPaymentDetailsNew(applicationNo: any) {
    return this.http.get(this.consumerContextPath + '/bill-desk/getPaymentDetailsByApplicationNo/' + applicationNo);

    //  localhost:8083/deposit_scheme/api/consumer/bill-desk/getPaymentDetailsByApplicationNo/SV2023091030
  }


  getApplicationListByConsumerSearch(body: any) {

    return this.http.post(this.consumerContextPath + "/consumer-application/consumerApplicationSearch", body);

    //   https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/consumerApplicationSearch
  }

  getAllComplainByConsumerAndUser(applicationNo: any) {
    return this.http.get(this.consumerContextPath + "/consumer-application/getAllApplicantWorkIssues/" + applicationNo);

    //   https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getAllApplicantWorkIssues/{consumerApplicationNo}
  }

  getAllApplicantFeedback(consumerApplicationNo: any) {
    return this.http.get(this.consumerContextPath + '/consumer-application/getAllApplicantFeedback/' + consumerApplicationNo)

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getAllApplicantFeedback/{consumerApplicationNo}
  }

  getPaymentDetailsDuringView(applicationNo: any) {
    return this.http.get(this.consumerContextPath + '/consumer-application/getConsumerDetailsfullDetailsByApplicationNo/' + applicationNo)
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getConsumerDetailsfullDetailsByApplicationNo/SV1707913593712
  }


  getConsumerDemandData(consumerApplicationId: any) {
    return this.http.get(this.userDemandUrl + '/get/' + consumerApplicationId)
  }

  getGeoLocationData(consumerApplicationNo: any) {
    return this.http.get(this.mastersUrl + '/getGeolocationDetails/' + consumerApplicationNo)
  }

  getFile(id): Observable<HttpResponse<Blob>> {
    return this.http.get(this.mastersUrl + '/getFile/' + id, { responseType: 'blob', observe: 'response' });
  }

  generatePdf(elementId: string, filename: string): void {
    const element = document.getElementById(elementId);

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${filename}.pdf`);
    });
  }

  getConsumerSurveyData(consumerApplicationId: any) {
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer ' + token
    // });
    return this.http.get(this.userSurveyUrl + '/get/' + consumerApplicationId);
  }

  getDemandPaymentDetailsNew(id: number) {
    return this.http.get(this.userContextPath + '/erp/getamount/' + id)
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/erp/getamount/1315
  }

  getDemandPaymentDetailsNewForMkmy(consumerAppNo: any) {
    return this.http.get(this.mkmyContextPath + '/getMkmyAmountByConsumerApplicationNo/' + consumerAppNo);
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/mmky/getMkmyAmountByConsumerApplicationNo/{consumerAppNo}
  }

  uploadDemand(body: any, token: any) {
    var headers = new HttpHeaders();
    headers.append("Authorization", token);
    return this.http.post(this.contextPath + '/user/save-work-order/uploadDemandNoteFile', body, { headers });

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/save-work-order/uploadDemandNoteFile
  }


  getUserByUserId(userId: any) {

    return this.http.get(this.userContextPath + "/login/getUserById/" + userId);

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/login/getUserById/{userId}
  }

  // getWorkOrderDetailsData(consumerApplicationNo: any) {
  //   return this.http.get(this.userContextPath + '/save-work-order/workorders/' + consumerApplicationNo);
  // }

  contractorSelectionatDgmend(consumerApplicationNo: any, discomUserId: any, userType: any, contractorUserId: any) {
    return this.http.put(this.consumerContextPath + '/qc-portal/oytContractorSelectionByDGM/' + consumerApplicationNo + '/' + discomUserId + '/' + userType + '/' + contractorUserId, null);
    // https://dsp.mpcz.in:8888/deposit_scheme/api/consumer/qc-portal/oytContractorSelectionByDGM/{consumerApplicationNo}/{userId}
  }


  consumerBankDetailSubmit(body: any) {
    return this.http.post(this.contextPath + '/consumer_account_deatils/saveConsumerAccountDetails', body)

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer_account_deatils/saveConsumerAccountDetails
  }

  getConsumerAccountDetails(applicationNo: any) {
    return this.http.get(this.contextPath + '/consumer_account_deatils/getConsumerAccountDetails/' + applicationNo);

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer_account_deatils/getConsumerAccountDetails/SV2023094168
  }


  getDuplicateRefundList(consumerApplicationNo: any) {
    return this.http.get(this.contextPath + '/consumer_account_deatils/consumer/getConsumerApplicationDuplicateRefundDetails/' + consumerApplicationNo);

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer_account_deatils/consumer/getConsumerApplicationDuplicateRefundDetails/{consumerApplicationNo}
  }

  submitDuplicateRefundRequest(body: any, token: any) {
    let headers = new HttpHeaders();
    headers.append("Authorization", token);
    return this.http.post(this.contextPath + '/consumer_account_deatils/consumer/saveDuplicateRefundDetails', body, { headers })
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer_account_deatils/consumer/saveDuplicateRefundDetails
  }

  getRefundApplicationDetails(appNo: any) {

    return this.http.get(this.contextPath + '/refundAmount/user/getRefundApplication/' + appNo)

    // http://localhost:8083/deposit_scheme/api/refundAmount/user/getRefundApplication/DS1730182063109
  }


  panVerificationRequest(body: any) {
    return this.http.post("https://resourceutils.mpcz.in:8888/MPCZ-PAN/api/pan/validatePan", body)
    // https://resourceutils.mpcz.in:8888/MPCZ-PAN/api/pan/validatePan

    //   {
    //     "source": "TEST", //Application Name
    //     "pan": "CSPPP6820G",
    //     "name": "Animesh Panwar",
    //     "fathername": "", 
    //     "dob": "15/10/1996" //format = dd/MM/yyyy
    // }
  }

  saveAddressProofData(body: any) {
    return this.http.patch(this.contextPath + "/refundAmount/consumer/saveAddressProofData", body);
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/refundAmount/consumer/saveAddressProofData

    // Payload: form data
    // Key: value
    // consumerApplicationNo: DS2023092026
    // idProofNo: 3242543
    // docAddressProof: File Key


  }


  sanchaiPortalPaymentRequestSubmit(body: any) {
    return this.http.post('https://resources.mpcz.in:8888/EasyTap/api/dsp/syncPayment', body);

    // https://resources.mpcz.in:8888/EasyTap/api/dsp/syncPayment
  }

  sanchayPaymentDataForDspPortal(body: any) {
    return this.http.post(this.url.baseUrl + '/deposit_scheme/poseMachine/sanchayPaymentData', body)
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/poseMachine/sanchayPaymentData
  }


  getFormDataForSanchaiPortalApplicationForm(applicationNo: any) {

    return this.http.get(this.userContextPath + '/erp/getconsumerApplicatioNo/' + applicationNo);

  }


  checkReturnMaterialTotalRowsBalanceAmountZeroOrNotGetApi(erp: any) {
    return this.http.get('https://dsp.mpcz.in:8888/newerp/xxpa_mat_rec_qty_bal/' + erp);
    // https://dsp.mpcz.in:8888/newerp/xxpa_mat_rec_qty_bal/12257
  }

  checkReturnMaterialTotalRowsBalanceAmountZeroOrNotPostApi(body:any){
    return this.http.post(this.url.baseUrl+'/deposit_scheme/ReturnMaterialDataController/saveReturnMaterialData1',body);

    // https://dsp.mpcz.in:8888/deposit_scheme/ReturnMaterialDataController/saveReturnMaterialData1
  }


  getOytMetarialDetailsWithCgstAndSgst(application_no:any){

    return this.http.get(this.userContextPath+'/erp/getoytMaterialdataByConsumerapplicationNumber/'+application_no);

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/erp/getoytMaterialdataByConsumerapplicationNumber/{application_no}
  }


  getPurPoseOfAavedakKaPrakar(){
return this.http.get(this.consumerContextPath+'/consumer-application/getAllPurposeType');

    //   https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getAllPurposeType
  }


  applicationRejectionForLoadEnhancement(consumerApplicationNo:any){
return this.http.patch(this.consumerContextPath+'/consumer-application/rejectLoadChangeApplication/'+consumerApplicationNo,null)

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/rejectLoadChangeApplication/{consumerApplicationNo}
  }


}
