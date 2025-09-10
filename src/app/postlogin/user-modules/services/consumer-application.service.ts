import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { NewApplicationModel } from '../models/new-application.model';
// import { timeout } from 'rxjs/internal/operators/timeout';
import { catchError, finalize, takeUntil, timeout } from 'rxjs/operators';
import { SpinnerService } from 'src/app/shared-services/spinner.service';


@Injectable({
    providedIn: 'root'
})
export class ConsumerApplicationService {
    constructor(
        private http: HttpClient,
        private url: GenerateUrl,
        private spinnerService: SpinnerService
    ) { }
    initialBasUrl: string = this.url.initialBasUrl;
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
    bBaseUrl: string = this.url.bBaseUrl;
    unsubscribe$: Subject<void> = new Subject();


    addNewApplication(reg: any) {
        return this.http.post(this.userApplicationUrl + '/add', reg);
    }

    updateNewApplication(consumerApplicationId: number, reg: any): Observable<any> {
        return this.http.put(this.userApplicationUrl + '/update/' + consumerApplicationId, reg);
    }

    getNewApplicationById(consumerApplicationId: number): Observable<ListResponse[]> {
        return this.http.get<ListResponse[]>(this.userApplicationUrl + '/get/' + consumerApplicationId);
    }

    async getAsyncNewApplicationById(consumerApplicationId: number): Promise<any> {
        let respone = await this.http.get(this.userApplicationUrl + '/get/' + consumerApplicationId).toPromise();
        return Response;
    }

    getNewApplicationList(): Observable<ListResponse[]> {
        return this.http.get<ListResponse[]>(this.userApplicationUrl + '/getAll');
    }

    getSchemeTypeList(): Observable<ListResponse[]> {
        return this.http.get<ListResponse[]>(this.mastersUrl + '/getAllSchemeType');
    }

    getWorkypeList(): Observable<ListResponse[]> {
        return this.http.get<ListResponse[]>(this.mastersUrl + '/getAllWorkType');
    }

    getContractorList(): Observable<ListResponse[]> {
        return this.http.get<ListResponse[]>(this.contextPath + '/qc-portal/getAllContractor');
    }

    getDocumentTypeList(): Observable<ListResponse[]> {
        return this.http.get<ListResponse[]>(this.mastersUrl + '/getAllDocumentType');
    }

    getDcList(): Observable<ListResponse[]> {
        return this.http.get<ListResponse[]>(this.mastersUrl + '/getAllDistributionCenter');
    }

    getSubstationByDc(dcId: number): Observable<any> {
        return this.http.get(this.mastersUrl + '/getAllSubstationByDC/' + dcId);
    }

    getFeederBySubstation(subStationId: number): Observable<any> {
        console.log('dcId :-', subStationId);
        return this.http.get(this.mastersUrl + '/getAllFeederBySubstation/' + subStationId);
    }

    getAllNewApplicationPaginate(param): Observable<ListResponse[]> {

        return this.http.get<ListResponse[]>(this.userApplicationUrl + '/getAllPaginate/?' + param);
    }

    getFile(id): Observable<HttpResponse<Blob>> {
        return this.http.get(this.mastersUrl + '/getFile/' + id, { responseType: 'blob', observe: 'response' });
    }


    saveSurveyData(reg: any) {
        return this.http.post(this.userSurveyUrl + '/submitSurvey', reg);
    }

    updateSurveyData(reg: any, id: any) {
        return this.http.put(this.userSurveyUrl + '/updateSurvey/' + id, reg);
    }

    saveDemandData(reg: any) {
        return this.http.post(this.userDemandUrl + '/add', reg);
    }

    updateDemandData(reg: any, id: any) {
        return this.http.put(this.userDemandUrl + '/updateDemand/' + id, reg);
    }

    saveBackToPreviousStage(reg: any) {
        return this.http.post(this.userPreviousStageUrl + '/saveBackToPreviousStage', reg);

    }

    saveDcAcceptanceData(reg: any) {
        return this.http.post(this.dcAcceptanceUrl + '/add', reg);
    }

    saveDemandApprovalData(reg: any) {
        return this.http.post(this.demandApproavlUrl + '/add', reg);
    }

    erpStatusData(erpNomber: any, consumerId: any) {
        return this.http.get<ListResponse[]>(this.erp + '/getErpEstimate' + "/" + erpNomber + "/" + consumerId);

    }

    getErpEstimateAmount(erpNomber: any, consumerId: any, no: any) {
        return this.http.get<ListResponse[]>(this.erp + '/getErpEstimateAmount' + "/" + erpNomber + "/" + consumerId + '/' + no);
    }

    getErpEstimatemountForMkmy(erpNomber: any) {
        //  return this.http.get(this.baseUrL+'/newerp/XXPA_PROJECTS_KMY_V/'+erpNomber);
        return this.http.get('https://dsp.mpcz.in:8888/newerp/XXPA_PROJECTS_KMY_V/' + erpNomber);
    }

    ///https://dsp.mpcz.in:8888/newerp/XXPA_PROJECTS_KMY_V/52303    //baseUrL

    updateConsumerApplicationStatus(consumerId: any, currentDate: any, currentTime: any, surveyorName: any, surveyorMobile: any, body: any) {
        return this.http.put(this.erp+'/update/'+consumerId+"/"+currentDate+"/"+currentTime+"/"+surveyorName+"/"+surveyorMobile, body);
    }

    getErpEstimatePDF(consumerErpWorkFlowNumber: any) {
        console.log('consumerErpWorkFlowNumber', consumerErpWorkFlowNumber)

        window.open(
            this.userContextPath + '/jasper-pdf/download/' + consumerErpWorkFlowNumber

        );
        // return this.http.get(this.userContextPath + '/jasper-pdf/download/' + consumerErpWorkFlowNumber);
    }


    saveWorkOrder(reg: any) {

        console.log('saveWorkOrder');
        return this.http.post(this.userContextPath + '/save-work-order/save', reg);

    }


    // this.userContextPath + '/work-status/get/'

    getworkcompletionData(consumerApplicationNo: any) {
        console.log('saveWorkOrder');
        return this.http.get(this.userContextPath + '/work-status/get/' + consumerApplicationNo);
    }

    saveWorkCompletionDateByDGTSTC(reg: any) {
        console.log(reg);
        return this.http.put(this.userContextPath + '/work-status/updatee', reg);
    }

    saceDgmStc(DgmOAndName: any) {
        // return this.http.get<ListResponse[]>(this.userContextPath + '/handoverToDgmHtc/add'+""consumerId);
        return this.http.post(this.userContextPath + '/handoverToDgmHtc/add', DgmOAndName);
    }


    submitDtrList(body: any) {
        return this.http.post(this.userContextPath + '/dtr/add', body);
    }

    GetDtrSubmitList(id: any) {
        return this.http.get(this.userContextPath + "/dtr/get/" + id);
    }

    submitHt33KvList(body: any) {
        return this.http.post(this.userContextPath + '/ht/add', body);
    }

    GetHt33KvSubmitList(id: any) {
        return this.http.get(this.userContextPath + "/ht/get/" + id);
    }


    submitItList(body: any) {
        return this.http.post(this.userContextPath + '/lt/add', body);
    }

    GetItSubmitList(id: any) {
        return this.http.get(this.userContextPath + "/lt/get/" + id);
    }


    submitIt11KvList(body: any) {
        return this.http.post(this.userContextPath + '/lt_11/add', body);
    }

    GetIt11KvSubmitList(id: any) {
        return this.http.get(this.userContextPath + "/lt_11/get/" + id);
    }


    submitPtrList(body: any) {
        return this.http.post(this.userContextPath + '/ptr/add', body);
    }

    GetPtrSubmitList(id: any) {
        return this.http.get(this.userContextPath + "/ptr/get/" + id);
    }


    submitWorkCompletionStatusChange(body: any) {
        return this.http.post(this.userContextPath + "/change-status/add", body);
    }


    forGetOtpSendOnNumber(body: any) {
        return this.http.post("https://resourceutils.mpcz.in:8888/MPCZ_OTP/api/otp/getOtp", body);
    }

    forVerifyOtp(body: any) {
        return this.http.post("https://resourceutils.mpcz.in:8888/MPCZ_OTP/api/otp/verifyOtpAll", body);
    }

    getConsumerAplicationDetails(consumerApplicationId: any) {
        return this.http.get(this.userApplicationUrl + '/get/' + consumerApplicationId);
    }

    getworkComplicationDataAllDate(consumerApplicationNo: any) {
        return this.http.get(this.userContextPath + '/work-status/get/' + consumerApplicationNo);
    }

    getContractorDetails(consumerApplicationNo: any) {
        return this.http.get(this.consumerContextPath + '/qc-portal/conforbid/' + consumerApplicationNo);
    }


    getConsumerApplicationData(consumerApplicationId: any) {
        return this.http.get(this.userApplicationUrl + '/get/' + consumerApplicationId);
    }

    // getContractorData(consumerApplicationNo:any){
    //     return this.http.get(this.consumerContextPath + '/qc-portal/conforbid/' + consumerApplicationNo)
    // }

    getWorkOrderDetailsData(consumerApplicationNo: any) {
        return this.http.get(this.userContextPath + '/save-work-order/workorders/' + consumerApplicationNo);
    }

    ///// this.http.get(this.userContextPath+'/work-order/generateWorkOderNo')

    getByGenerateWorkOderNo() {
        return this.http.get(this.userContextPath + '/work-order/generateWorkOderNo');
    }

    //localhost:8083/deposit_scheme/api/user/estimatedependOonthischeckBox/savedataerpEstimateTable

    CheckBoxSelectionForDtrPtrSelectOrNot(body: any) {
        return this.http.post(this.userContextPath + '/estimatedependOonthischeckBox/savedataerpEstimateTable', body)
    }

    //      https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/consumerApplicationDetailsBasedOnCityCricleBhopalAndGwalior
    //consumerContextPath


    consumerApplicationListforUserDgmHtmViewByConditionallyForDgmHtm(circleid: number) {
        //http://localhost:8888/deposit_scheme/api/consumer/consumer-application/consumerApplicationDetailsBasedOnCityCricleBhopalAndGwaliorBasedONLtNullValueHTM/10
        //http://localhost:8888/deposit_scheme/api/consumer/consumer-application/consumerApplicationDetailsBasedOnCityCricleBhopalAndGwaliorBasedONLtNullValueHTM/10

        return this.http.get(this.consumerContextPath + '/consumer-application/consumerApplicationDetailsBasedOnCityCricleBhopalAndGwaliorBasedONLtNullValueHTM/' + circleid);
    }

    // consumerApplicationListforUserDgmOrendumViewByConditionallyForOrendum(){  //https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/consumerApplicationDetailsBasedOnCityCricleBhopalAndGwaliorBasedONLtNullValue
    // // return this.http.get(this.consumerContextPath + '/consumer-application/consumerApplicationDetailsBasedOnCityCricleBhopalAndGwaliorBasedONLtNullValue');

    // return this.http.get(this.consumerContextPath + '/consumer-application/consumerApplicationDetailsBasedOnCityCricleBhopalAndGwalior');
    // }

    getDemandPaymentDetails(id: number) {
        return this.http.get(this.userContextPath + '/erp/getamount/' + id)
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/erp/getamount/1315
    }

    getDemandPaymentDetailsWithoutMKMY(ApplicationNumber: any) {
        return this.http.get(this.mkmyContextPath + '/getMkmyAmountByConsumerApplicationNo/' + ApplicationNumber);
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/mmky/getMkmyAmountByConsumerApplicationNo/DS1702661536835

    }

    getDataOfConsumerForUserOnTheBasisOfAccessLevel(a: any, b: any, c: any, d: any) {
        return this.http.get(this.url.baseUrl + '/deposit_scheme/mis_details/mis?regionCode=' + a + '&&circleCode=' + b + '&&divisionCode=' + c + '&&dcCode=' + d)
        //https://rooftop-uat.mpcz.in:8888/deposit_scheme/mis_details/mis?regionCode=2&&circleCode=&&divisionCode=20302
    }
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/mis_details/mis?regionCode=2

    //https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/consumerApplicationDetailsBasedOnCityCricleBhopalAndGwaliorBasedOnNullValue
    //https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/consumerApplicationDetailsBasedOnCityCricleBhopalAndGwaliorBasedONLtNullValue

    getOrendumOfBhopalandGwaliorOnly(circleid: number) {
        //http://localhost:8888/deposit_scheme/api/consumer/consumer-application/consumerApplicationDetailsBasedOnCityCricleBhopalAndGwaliorOANDM/10
        return this.http.get(this.consumerContextPath + '/consumer-application/consumerApplicationDetailsBasedOnCityCricleBhopalAndGwaliorOANDM/' + circleid);
    }

    LoadConfirmationSurveySubmit(consumerApplicationNumber: any, jeLoad: any, jeLoadUnit: any, goodMaterialOrNot: any) {
        return this.http.put(this.consumerContextPath + '/consumer-application/jeLoad?consumerApplicationNumber=' + consumerApplicationNumber + '&jeLoad=' + jeLoad + '&jeLoadUnitKwYaKva=' + jeLoadUnit + '&goodMaterialOrNot=' + goodMaterialOrNot, null)

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/jeLoad?consumerApplicationNumber=SV1747481933658&jeLoad=40&jeLoadUnitKwYaKva=KW&goodMaterialOrNot=0

    }

    //https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getConsumerApplicationDetailsByConsumerApplicationNo/DS2023092006

    getConsumerApplicationDetailsByConsumerApplicationNumber(consumerApplicationNumber: any) {
        return this.http.get(this.consumerContextPath + '/consumer-application/getConsumerApplicationDetailsByConsumerApplicationNo/' + consumerApplicationNumber);
    }

    // getdateOfDgmOandM(consumerApplicationNumber:any){
    // return this.http.get(this.userContextPath+'/work-status/get/'+consumerApplicationNumber);
    // }


    rejectionPerposalAcceptOrRejectByGM(body: any) {
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/rejectApplication
        return this.http.put(this.consumerContextPath + '/consumer-application/rejectApplicationByGM', body);
    }
    rejectionPerposalGenerateByDgmOandMorDgmHtm(body: any) {
        //https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/rejectProposalApplication
        return this.http.put(this.consumerContextPath + '/consumer-application/rejectProposalApplication', body);
    }

    rejectionApplicationFileDownload(path: any) {
        return this.http.get(this.userContextPath + '/erp/downloadpdf?path=C://UploadDocs/' + path);
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/erp/downloadpdf?path=C://UploadDocs\"REJECTION_PROPOSAL\202310\anonymousUser_REJECTION_PROPOSAL_1697626670672.pdf"
    }

    getAllNewPaginate_Search(page: any, size: number, filterType: string, filterValue: string, token: any): Observable<ListResponse[]> {
        // const headers = new HttpHeaders({ Authorization: "Bearer " + token });
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.get<ListResponse[]>(this.userApplicationUrl + "/getAllNewPaginate?page=" + page + "&" + "size=" + size + "&filterType=" + filterType + "&filterValue=" + filterValue, { headers });
    }


    //new method for application status on 27 oct 2023=====================================
    getAll_Application_Status(): Observable<any> {
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/application-status/getAll
        return this.http.get<any>(
            this.url.userContextPath + "/application-status/getAll"
        );
    }


    //this.mastersUrl + '/getAllApplicationDocument/' + this.consumerApplicationDetail.consumerApplicationId
    getAllApplicationDocumentFile(consumerApplicationId: any) {
        return this.http.get(this.mastersUrl + '/getAllApplicationDocument/' + consumerApplicationId);
    }

    FormArrayPostForOytSurvey(body: any) {
        return this.http.post(this.consumerContextPath + '/consumer-application/oytSamgraDataApplication', body)
        //https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/oytSamgraDataApplication
    }



    updateOfReturnAmountOfSurvey(body: any) {
        return this.http.put(this.consumerContextPath + '/consumer-application/jeReturnAmount', body)
        //https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/jeReturnAmount
    }

    getDgmHtcNameByCircleId(circleId: any) {
        return this.http.get(this.url.userContextPath + '/login/getUserRoleByCricleId/' + circleId);
        ////// https://dsp.mpcz.in:8888//deposit_scheme/api/user/login/getUserRoleByCricleId/1
        /////  https://dsp.mpcz.in:8888/deposit_scheme/api/user/login/getUserRoleByCricleId/1
    }


    getConsumerApplicationDetailsByApplicationNumber(ApllicationNumber: any) {
        //  return this.http.get(this.consumerContextPath + '/consumer-application/getConsumerApplicationDetailsByConsumerApplicationNo/' + ApllicationNumber)
        return this.http.get(this.consumerContextPath + '/consumer-application/getConsumerApplicationDetailsByConsumerApplicationNo/' + ApllicationNumber)
        //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getConsumerApplicationDetailsByConsumerApplicationNo/DS1698323331645
    }

    SubmitMkmySurvey(body: any) {
        return this.http.post(this.contextPath + '/mmky/saveMMKYParentChild', body);
        //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/mmky/saveMMKYParentChild
    }

    getMkmyApplicationDetails(ApplicationNo: any) {
        return this.http.get(this.consumerContextPath + '/consumer-application/getMkmyConsumerDetailsByApplicationNo/' + ApplicationNo);
    }

    //https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getMkmyConsumerDetailsByApplicationNo/DS1701689517498

    getDistrictList(): Observable<ListResponse[]> {
        return this.http.get<ListResponse[]>(this.mastersUrl + "/getAllDistrict");
    }


    SubmitMkmyUpdate(body: any) {
        return this.http.put(this.consumerContextPath + '/consumer-application/updateMkmyConsumerDetails', body)
        //   https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/updateMkmyConsumerDetails
    }

    getErpDetailsByErpNumber(erpNumber: any, consumerApplicationNumber: any) {
        return this.http.get(this.mkmyContextPath + '/erpMkmypApi/' + erpNumber + '/' + consumerApplicationNumber);
        //https://dsp.mpcz.in:8888/deposit_scheme/api/mmky/erpMkmypApi/60173/DS2023092061
    }


    ///  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/mmky/getMkmyAmountByConsumerApplicationNo/{consumerAppNo}       

    addContractor(reg: any) {
        return this.http.post(this.contractor + "/saveForQcPortal", reg);
    }

    getMkmyChildDataofFormArray(consumerApplicationNo: any) {
        return this.http.get(this.consumerContextPath + '/consumer-application/getMkmySamagraListDataByApplicationNo/' + consumerApplicationNo);
    }


    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getMkmySamagraListDataByApplicationNo/{consumerApplicationNo}

    getErpRevisedData(erpNo: any, ApplicationNumber: any, Num: any) {
        return this.http.get(this.url.baseUrl + "/deposit_scheme/ErpRev/RevErpDataNew/" + erpNo + "/" + ApplicationNumber + '/' + Num);
    }


    getErpCalculationsForOldData(consumerApplicationId: any) {
        return this.http.get(this.erp + "/erpEstimateCalculations/" + consumerApplicationId)
    }

    stcRemarkSubmit(payLoad: any) {
        return this.http.post(this.contextPath + '/dgm_stc_remark/saveDgmStcRemark', payLoad)

        //   https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/dgm_stc_remark/saveDgmStcRemark
    }


    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/dgm_stc_remark/saveDgmStcRemark

    getAllPaymentDetails(applicationNo: any) {
        return this.http.get(this.consumerContextPath + '/bill-desk/getPaymentDetailsByApplicationNo/' + applicationNo);

        //  localhost:8083/deposit_scheme/api/consumer/bill-desk/getPaymentDetailsByApplicationNo/SV2023091030
    }

    getDetailsByIvrsNo(Ivrs: any) {
        return this.http.get('https://rimsmis.mpcz.in:8100/connection_pradhayen/ngb/getDetailByIvrs/' + Ivrs);
        //   https://rimsmis.mpcz.in:8100/connection_pradhayen/ngb/getDetailByIvrs/2388006237
    }


    submitIvrsDetails(body: any) {
        return this.http.post(this.contextPath + '/connection_praday/saveConnectionPraday', body);
        //    https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/connection_praday/saveConnectionPraday
    }

    getFilePathForContractorDocuments(applicationNo: any, ContractorId: any) {
        return this.http.get(this.consumerContextPath + '/qc-portal/getQcPortalData?consumerApp=' + applicationNo + '&userId=' + ContractorId);
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/qc-portal/getQcPortalData?consumerApp=SV1707125529920&userId=4322
    }


    getContracterRemark(applicationNo: any) {

        return this.http.get(this.contextPath + '/contractor_remark/getAllConRemark/' + applicationNo);
        //   https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/contractor_remark/getAllConRemark/{consumerAppNo}
    }

    uploadFieForReviseEstimate(body: any) {

        return this.http.post(this.bBaseUrl + '/ErpRev/erpReviseFileSave', body)

        //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/ErpRev/erpReviseFileSave
    }







    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getConsumerSurveyData(consumerApplicationId: any) {
        return this.http.get(this.userSurveyUrl + '/get/' + consumerApplicationId);
    }

    //     let consumerSurveyData = await this.http.get(this.userSurveyUrl + '/get/' + this.consumerApplicationId).toPromise();
    // console.log('consumerSurveyData', consumerSurveyData);
    // if (consumerSurveyData['code'] == "200") {
    //     this.consumerSurveyData = consumerSurveyData['list'][0];
    // }

    getConsumerDemandData(consumerApplicationId: any) {
        return this.http.get(this.userDemandUrl + '/get/' + consumerApplicationId)
    }

    getGeoLocationData(consumerApplicationNo: any) {
        return this.http.get(this.mastersUrl + '/getGeolocationDetails/' + consumerApplicationNo)
    }


    getApplicationDocumentData(consumerApplicationId: any) {
        return this.http.get(this.mastersUrl + '/getAllApplicationDocument/' + consumerApplicationId)
    }



    getNatureOfWorkTypeList(): Observable<ListResponse[]> {
        return this.http.get<ListResponse[]>(
            this.mastersUrl + "/getAllNatureOfWork"
        );
    }

    getPaymentDetailsDuringView(applicationNo: any) {
        return this.http.get(this.consumerContextPath + '/consumer-application/getConsumerDetailsfullDetailsByApplicationNo/' + applicationNo)
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getConsumerDetailsfullDetailsByApplicationNo/SV1707913593712
    }


    mkmyIndivSubmit(body: any) {
        return this.http.post(this.consumerContextPath + '/consumer-application/saveMkmyDtrForIndividual', body)
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/saveMkmyDtrForIndividual
    }


    revertToDemandPayment(consumerAppNo: any) {
        return this.http.get(this.consumerContextPath + '/consumer-application/revertAppToDemandNote/' + consumerAppNo)

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/revertAppToDemandNote/{consumerAppNo}
    }


    getPaymentReciptData(billRefNo: any) {
        return this.http.get(this.contextPath + '/manualpayments/getManualPaymentByBillRefNo/' + billRefNo)

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/manualpayments/getManualPaymentByBillRefNo/{billRefNo}
    }


    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getConsumerDetailsfullDetailsByApplicationNo/SV1707913593712

    ReviseLoadSubmit(body: any) {
        return this.http.put(this.consumerContextPath + '/consumer-application/saveOAndMLoadDetailsForRevise', body)

        ///   https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/saveOAndMLoadDetailsForRevise
    }

    returnMaterialSubmit(body: any) {
        return this.http.post(this.bBaseUrl + '/ReturnMaterialDataController/save', body)

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/ReturnMaterialDataController/save

    }

    submitJeSurveyBrerak(applicationNo: any, erpNo: any) {
        return this.http.get(this.consumerContextPath + '/consumer-application/jePutErpNumberAndChangeApplicationStatus/' + applicationNo + '/' + erpNo)

        // localhost:8083/deposit_scheme/api/consumer/consumer-application/jePutErpNumberAndChangeApplicationStatus/DS2023092061/123456
    }

    getErpDetailsForSurveyBreakFirst(erpNo: any) {
        return this.http.get('https://dsp.mpcz.in:8888/urjas/XXPA_PROJECTS_DSP_V_ALLDATA/' + erpNo)
        // https://dsp.mpcz.in:8888/urjas/XXPA_PROJECTS_DSP_V_ALLDATA/914151
        // https://rooftop-uat.mpcz.in:8888/urjas/XXPA_PROJECTS_DSP_V_ALLDATA/914151
    }

    getErpDetailsForSurveyBreakSecond(erpNo: any) {
        return this.http.get(' https://dsp.mpcz.in:8888/newerp/XXPA_PROJECTS_DSP_V_ALLDATA/' + erpNo)
        // https://dsp.mpcz.in:8888/newerp/XXPA_PROJECTS_DSP_V_ALLDATA/914151
    }

    getErpSerchForSurveyBreak(erpNo: any) {
        return this.http.get(this.bBaseUrl + '/api/user/erp/newErpResponse/' + erpNo)

        // https://dsp.mpcz.in:8888/deposit_scheme/api/user/erp/newErpResponse/99917
        // http://localhost:8888/deposit_scheme/api/user/erp/newErpResponse/99917
    }

    // for group No
    getGroupNo(locationCode: any) {
        return this.http.post('https://survey.mpcz.in:8080/ssp-web/ngb/getGroupNo?locationCode=' + locationCode, null);
        // return this.http.get(this.bBaseUrl+'/NgbStagingData/fetchDataByLocationCode/'+locationCode);

        // https://survey.mpcz.in:8080/ssp-web/ngb/getGroupNo?locationCode=2304402
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/NgbStagingData/fetchDataByLocationCode/{locationCode}

    }

    getFinalConnectionPradaaiDetailsForApplicationView(consumerAppNo: any) {
        return this.http.get(this.bBaseUrl + '/NgbStagingData/getNgbDataByApplicationNo/' + consumerAppNo)
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/NgbStagingData/getNgbDataByApplicationNo/{consumerAppNo}
    }

    getGroupNoForConnectionPradaai(locationCode: any): Observable<any> {

        return this.http.get(this.bBaseUrl + '/NgbStagingData/getGroupNoByLocationCode/' + locationCode);
        //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/NgbStagingData/getGroupNoByLocationCode/2304402

        //  return this.http.get(this.bBaseUrl+'/NgbStagingData/fetchDataByLocationCode/'+locationCode);
        // const headers = new HttpHeaders({ Authorization: token });
        //  return this.http.get<Response>(this.bBaseUrl + '/NgbStagingData/getDataWithFeederCode/' + locationCode);

        //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/NgbStagingData/getDataWithFeederCode/2030205010101

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/NgbStagingData/fetchDataByLocationCode/2334346

        //  https://ngb.mpcz.in/mppkvvcl/nextgenbilling/backend/api/v1/group//location-code/2334346/is-deleted/false

        // https://<HOST_URL>/mppkvvcl/nextgenbilling/backend/api/v1/group//location-code/{locationCode}/is-deleted/{isDeleted}
    }
    //Feeder
    getRdNoListForConnectionPradaai(groupNo: any): Observable<any> {
        // const headers = new HttpHeaders({ Authorization: "Bearer " + token });

        return this.http.get<Response>(this.bBaseUrl + '/NgbStagingData/getDiaryNoByGroupNo/' + groupNo);
        //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/NgbStagingData/getDiaryNoByGroupNo/ANN23

        // return this.http.get<Response>(this.bBaseUrl + '/NgbStagingData/fetchDataWithGRNo/' + groupNo);
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/NgbStagingData/fetchDataWithGRNo/GUN99

        // https://ngb.mpcz.in/mppkvvcl/nextgenbilling/backend/api/v1/reading/diary/group/no/GUN99
        // https://<HOST_URL>/mppkvvcl/nextgenbilling/backend/api/v1/reading/diary/group/no/RMP21
    }

    getAllNgbData(applicationNo: any) {
        return this.http.get(this.bBaseUrl + '/NgbStagingData/getNgbData/' + applicationNo);

        // URL: https://rooftop-uat.mpcz.in:8888/deposit_scheme/NgbStagingData/getNgbDataForSSP/{consumerAppNo}

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/NgbStagingData/getNgbData/DS1711972289223
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/getNgbData/DS1708580385386
    }

    SubmitToNgbPost(body: any) {

        return this.http.post(this.bBaseUrl + '/NgbStagingData/saveDataToSsp', body)


        //   https://rooftop-uat.mpcz.in:8888/deposit_scheme/NgbStagingData/saveDataToSsp

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/NgbStagingData/saveNgbStagingData
    }


    getfeederCodeFromIsampark(iSamparkLocationCode: any) {
        return this.http.get(this.bBaseUrl + '/NgbStagingData/getFeederDataWithIsamparkCode/' + iSamparkLocationCode)
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/NgbStagingData/getFeederDataWithIsamparkCode/203020501
        // "http://isampark.mpcz.in/UrjasApi/UrjasApi.aspx?api=1&var=" + locationId;
    }

    getDtrList(feedercode: any) {
        return this.http.get(this.bBaseUrl + "/NgbStagingData/getDataWithFeederCode/" + feedercode)

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/NgbStagingData/getDataWithFeederCode/2030205010101
        // "http://isampark.mpcz.in/UrjasApi/UrjasApi.aspx?api=1&var=" + locationId;
    }

    getDistributionByID(dcId: number): Observable<any> {/////////////////////////////

        return this.http.get(this.consumerContextPath + '/consumer-application/getDcByDistrictId/' + dcId);

        //  https://dsp.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getDcByDistrictId/7
    }

    changeNatureOfWorkTypeOfConsumer(consumerApplicationNo: any, newNatureOfWorkId: any, schemeTypeId: any, token: any): Observable<ListResponse> {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.put<ListResponse>(this.contextPath + '/adminChangable/user/changeNatureOfWorkOfLegalAndIllegal/' + consumerApplicationNo + '/' + newNatureOfWorkId + '/' + schemeTypeId, null, { headers });

        //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/adminChangable/user/changeNatureOfWorkOfLegalAndIllegal/{consumerApplicationNo}/{newNatureOfWorkId}/{schemeTypeId}
    }

    getAllTheDetailsOfConsumerByLoginId(loginId: any, token: any): Observable<ListResponse> {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.get<ListResponse>(this.contextPath + '/adminChangable/user/getConsumerByLoginId/' + loginId, { headers })

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/adminChangable/user/getConsumerByLoginId/{loginId}
    }

    changeConsumerApplicationStatus(consumerApplicationNo: any, applicationStatusNo: any, token: any): Observable<ListResponse> {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.put<ListResponse>(this.contextPath + '/adminChangable/user/changeApplicationStatus/' + consumerApplicationNo + '/' + applicationStatusNo, null, { headers })

        //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/adminChangable/user/changeApplicationStatus/{consumerApplicationNo}/{applicationStatusNo}
    }

    changeApplicationIndividualOrGroup(body: any, consumerApplicationNo: any, individualOrGroupId: any, token: any): Observable<ListResponse> {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.put<ListResponse>(this.contextPath + '/adminChangable/user/changeIndividualOrGroup/' + consumerApplicationNo + '/' + individualOrGroupId, body, { headers });

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/adminChangable/user/changeIndividualOrGroup/{consumerApplicationNo}/{individualOrGroupId}
    }

    changeConsumerNameAndAddress(consumerApplicationNo: any, newConsumerName: any, newAddress: any, token: any): Observable<ListResponse> {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.put<ListResponse>(this.contextPath + '/adminChangable/user/changeConsumerNameAndAddress/' + consumerApplicationNo + '/' + newConsumerName + '/' + newAddress, null, { headers })

        //   https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/adminChangable/user/changeConsumerNameAndAddress/{consumerApplicationNo}/{newConsumerName}/{newAddress}
    }


    changeConsumerNameAndAddressByConsumerMobileNo(consumerMobileNo: any, newConsumerName: any, newAddress: any, token: any): Observable<ListResponse> {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.put<ListResponse>(this.contextPath + '/adminChangable/user/changeConsumerNameAndAddressByConsumerMobileNo/' + consumerMobileNo + '/' + newConsumerName + '/' + newAddress, null, { headers })

        //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/adminChangable/user/changeConsumerNameAndAddressByConsumerMobileNo/{consumerMobileNo}/{newConsumerName}/{newAddress}
    }

    changeConsumerSchemeType(ApplicationNo: any, schemeTypeId: any) {
        return this.http.put(this.contextPath + '/adminChangable/user/changeSchemeType/' + ApplicationNo + '/' + schemeTypeId, null);
        //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/adminChangable/user/changeSchemeType/SV1715927957216/2
    }

    changeStatusForConsumerUpdate(consumerApplicationNo: any, token: any) {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.put(this.contextPath + '/adminChangable/user/revertApplcaicationForNatureOfWork/' + consumerApplicationNo + '/' + true, null, { headers });

        //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/adminChangable/user/revertApplcaicationForNatureOfWork/{consumerApplicationNo}/{natrueOfWorkChange}

        //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/revertApplcaicationForNatureOfWork/{consumerApplicationNo}/{natrueOfWorkChange}
    }

    saveJeRemarkForConsumerApplicationUpdate(body: any) {
        return this.http.post(this.contextPath + '/adminChangable/user/saveJeRemarkForApplicationUpdation', body)

        //  https://rooftop-uat.mpcz.in:8888//deposit_scheme/api/adminChangable/user/saveJeRemarkForApplicationUpdation
    }




    getAllApplicantFeedback(consumerApplicationNo: any) {
        return this.http.get(this.consumerContextPath + '/consumer-application/getAllApplicantFeedback/' + consumerApplicationNo)

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getAllApplicantFeedback/{consumerApplicationNo}
    }


    ReplyOfConsumerComplaintByUserDiscom(body: any) {
        return this.http.post(this.consumerContextPath + '/consumer-application/saveApplicantWorkIssues', body);

        //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/saveApplicantWorkIssues
    }

    getAllComplainByConsumerAndUser(applicationNo: any) {
        return this.http.get(this.consumerContextPath + "/consumer-application/getAllApplicantWorkIssues/" + applicationNo);

        //   https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getAllApplicantWorkIssues/{consumerApplicationNo}
    }


    refundPayableAmountTable(consumerApplicationNo: any, value: any) {
        return this.http.get(this.contextPath + "/refundAmount/getPaymentRefundDetails/" + consumerApplicationNo + "/" + value);
        //  return this.http.get(this.userContextPath + '/erp/getErpData/' + consumerApplicationNo + '/' + value)

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/erp/getErpData/{consumerApplicationNo}/{value}
    }

    RequestGeneratedByDgmForRefundPaymentToGm(body: any, token: any) {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.post(this.userContextPath + '/refund_process/saveRefundProcessData', body, { headers });

        //   https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/refund_process/saveRefundProcessData
    }


    getPaymentRefundConfirmationDetailsAtGm(consumerApplicationNo: any, token: any) {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.get(this.userContextPath + '/refund_process/getRefundProcessDataByApplicationNo/' + consumerApplicationNo, { headers });

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/refund_process/getRefundProcessDataByApplicationNo/{consumerApplicationNo}
    }

    confirmPaymentRefundByGM(body: any, token: any) {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.put(this.userContextPath + '/refund_process/refundApplicationByGM', body, { headers });

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/refund_process/refundApplicationByGM
    }

    getPaymentDataOfReviseForNegitive(consumerApplicationNo: any) {
        return this.http.get(this.userContextPath + '/erp/getErpRevDataForRefund/' + consumerApplicationNo)

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/erp/getErpRevDataForRefund/{consumerApplicationNo}
    }


    ContractorChangeRequestByDgm(body: any, token: any) {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.put(this.consumerContextPath + '/consumer-application/user/reselectionOfContractor', body, { headers })

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/user/reselectionOfContractor
    }


    checkNoOfPayment(consumerApplicationNo: any) {
        return this.http.get(this.userContextPath + '/erp/checkDemandOrReviseDemandRefund/' + consumerApplicationNo);

        //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/erp/checkDemandOrReviseDemandRefund/{consumerApplicationNo}
    }

    // getAllUserApplication(){
    //     // var headers = new HttpHeaders();
    //     // headers.append("Authorization", token);
    //     const spinnerRef = this.spinnerService.start();
    // return this.http.get(this.userContextPath+'/pagination/getAllApplicationByStatusCount').pipe(
    //     // takeUntil(this.unsubscribe$),
    //     // finalize(() => this.spinnerService.stop(spinnerRef))
    //     timeout(900000),
    //         catchError((err) => {
    //           this.spinnerService.stop(spinnerRef)
    //           if (err.name == "TimeoutError") {
    //             alert("Request Timeout, Please try again.");
    //             return Observable.throw("Timeout has occurred");
    //           }
    //            return Observable.throw(err);
    //         })
    //   )
    // }


    getAllUserApplication() {
        const spinnerRef = this.spinnerService.start();
        return this.http.get(this.userContextPath + '/pagination/getAllApplicationByStatusCount').pipe(
            timeout(900000),
            catchError((err) => {
                this.spinnerService.stop(spinnerRef);
                if (err.name === "TimeoutError") {
                    alert("Request Timeout, Please try again.");
                    return throwError("Timeout has occurred");
                }
                return throwError(err);
            }),
            finalize(() => this.spinnerService.stop(spinnerRef)) // Ensure spinner stops on success or error
        );
    }


    // getAllUserApplication(token:any):Observable<any> {
    //     var headers = new HttpHeaders();
    //     headers.append("Authorization", token);
    // return this.http.get<any>(this.userContextPath+'/pagination/getAllApplicationByStatusCount',{headers})
    //   .pipe(
    //     timeout(300000),
    //     catchError((err) => {
    //      // this.spinner.hide();
    //       if (err.name == "TimeoutError") {
    //         alert("Request Timeout, Please try again.");
    //         return Observable.throw("Timeout has occurred");
    //       }
    //        return Observable.throw(err);
    //     })
    //   );

    //     //  localhost:8083/deposit_scheme/api/user/pagination/getAllApplicationByStatusCount
    // }



    checkingDemandPaymentExistInBilldeskPaymentTableOrNot(consumerApplicationNo: any) {
        return this.http.get(this.consumerContextPath + '/consumer-application/getBilldeskDemandPaymentExistOrNot/' + consumerApplicationNo);

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getBilldeskDemandPaymentExistOrNot/{consumerApplicationNo}
    }


    payemntRecievedInPoseMachineAndManualPayment(consumerApplicationNo: any) {
        return this.http.get(this.bBaseUrl + '/poseMachine/getDemandFeesPaymentDetails/' + consumerApplicationNo);

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/poseMachine/getDemandFeesPaymentDetails/{consumerApplicationNo}
    }

    getApplicationListByApplicationStatusGroup(applicationStatusId: any, userId: any) {
        // var headers = new HttpHeaders();
        // headers.append("Authorization", token);
        return this.http.get(this.userContextPath + '/pagination/getAllApplicationByApplicationStatusByUserId/' + applicationStatusId + "/" + userId)

        //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/pagination/getAllApplicationByApplicationStatusByUserId/{applicationStatusId}/{userId}
    }

    getApplicationDetails(applicationNo: any) {
        return this.http.get(this.consumerContextPath + '/consumer-application/getConsumerDetailsfullDetailsByApplicationNo/' + applicationNo)

        //// https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/getConsumerDetailsfullDetailsByApplicationNo/{consumerApplicationNo}
    }

    getCountOfApplicationByStatusId(userId: any) {
        return this.http.get(this.userContextPath + "/pagination/getAllDataFromViewViaAccessLevel/" + userId);
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/pagination/getAllDataFromViewViaAccessLevel/{userId}
    }


    uploadMkmyDocuments(body: any, token: any) {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.put(this.contextPath + '/adminChangable/user/updateMKMYDocument', body, { headers });
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/adminChangable/user/updateMKMYDocument
    }


    erpEstimateNegitiveAmountRefundConfirmation(body: any, token: any) {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.post(this.contextPath + '/refundAmount/user/saveRefundDetails', body, { headers });

        //   https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/refundAmount/user/saveRefundDetails

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/refundAmount/saveRefundDetails
    }


    dgmStcApprovalForRefundApplication(body: any) {
        return this.http.put(this.contextPath + '/refundAmount/user/dgmStcRefundApproval', body)

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/refundAmount/user/dgmStcRefundApproval
    }

    dgmApprovalForRefundApplication(body: any) {

        return this.http.put(this.contextPath + '/refundAmount/user/dgmApprovalForRefund', body);
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/refundAmount/user/dgmApprovalForRefund
    }

    gmApprovalForRefundAppliacation(body: any) {
        return this.http.put(this.contextPath + '/refundAmount/user/gmApprovalForRefund', body);
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/refundAmount/user/gmApprovalForRefund

    }


    paymentRefundRequestByFinanceToBuildesk(consumerApplicaitonNo: any, userId: any, token: any) {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.post(this.contextPath + '/user/finance_refund/refundDemandAmount/' + consumerApplicaitonNo + "/" + userId, null, { headers });
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/finance_refund/refundDemandAmount/{consumerApplicaitonNo}
    }

    getAllRefundApplicationForFinmance(token: any) {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.get(this.contextPath + "/refundAmount/user/getAllData", { headers });
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/refundAmount/user/getAllData

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/refundAmount/getAllData
    }

    getNatureOfWorkTypeAndSchemeTpe(consumerApplicationNo: any) {
        return this.http.get(this.contextPath + '/refundAmount/getSchemeAndNatureByApplicationNo/' + consumerApplicationNo);

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/refundAmount/getSchemeAndNatureByApplicationNo/{consumerApplicationNo}
    }

    getGeneralDetailsForUser(consumerApplicationNo: any) {
        return this.http.get(this.contextPath + '/refundAmount/getSchemeAndNatureByApplicationNo/' + consumerApplicationNo)

        //   http://localhost:8083/deposit_scheme/api/refundAmount/getSchemeAndNatureByApplicationNo/SV202307417
    }


    changeStatusOfConsumerApplicationByAdmin(body: any) {
        return this.http.put(this.contextPath + '/adminChangable/user/changeApplicationStatus', body)
        //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/adminChangable/user/changeApplicationStatus
    }

    getUserByUserId(userId: any) {

        return this.http.get(this.userContextPath + "/login/getUserById/" + userId);

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/login/getUserById/{userId}
    }


    ivrsConfirmationByJe(body: any) {
        return this.http.post(this.contextPath + "/connection_praday/saveIvrsConnectionByJE", body);
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/connection_praday/saveIvrsConnectionByJE
    }

    uploadWorkOrder(body: any, token: any) {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.post(this.contextPath + '/user/save-work-order/uploadWorkOrderFile', body, { headers });

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/save-work-order/uploadWorkOrderFile
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/save-work-order/uploadWorkOrderFile
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/save-work-order/uploadWorkOrderFile?docWorkOrder&consumerApplicationNo
    }

    uploadDemand(body: any, token: any) {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.post(this.contextPath + '/user/save-work-order/uploadDemandNoteFile', body, { headers });

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/save-work-order/uploadDemandNoteFile
    }

    contractorSelectionatDgmend(consumerApplicationNo: any, discomUserId: any, userType: any, contractorUserId: any) {
        return this.http.put(this.consumerContextPath + '/qc-portal/oytContractorSelectionByDGM/' + consumerApplicationNo + '/' + discomUserId + '/' + userType + '/' + contractorUserId, null);
        // https://dsp.mpcz.in:8888/deposit_scheme/api/consumer/qc-portal/oytContractorSelectionByDGM/{consumerApplicationNo}/{userId}
    }


    consumerBankDetailSubmit(body: any) {
        return this.http.post(this.contextPath + '/consumer_account_deatils/saveConsumerAccountDetails', body)

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer_account_deatils/saveConsumerAccountDetails
    }


    transferApplicationToSspPortalForIvrsSubmission(consumerApplicationNo: any, applicationStatusId: any) {
        return this.http.post(this.contextPath + '/ssp/sendDataToSspAfterWorkOrder/' + consumerApplicationNo + '/' + applicationStatusId, null)

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/ssp/sendDataToSspAfterWorkOrder/{consumerApplicationNo}/{applicationStatusId}
    }

    getConsumerAccountDetails(applicationNo: any) {
        return this.http.get(this.contextPath + '/consumer_account_deatils/getConsumerAccountDetails/' + applicationNo);

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer_account_deatils/getConsumerAccountDetails/SV2023094168
    }


    changeStatusAfterFinanceSubmission(consumerApplicationNo: any, token: any) {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.put(this.contextPath + '/refundAmount/user/changeRefundApplicationStatusToFinalStage/' + consumerApplicationNo, null, { headers })
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/refundAmount/user/changeRefundApplicationStatusToFinalStage/{consumerApplicationNo}
    }

    getUserDcsAccessList(userId: any) {
        return this.http.get(this.url.contextPath + '/adminChangable/user/getUserDcAndDivion/' + userId)
        // localhost:8083/deposit_scheme/api/adminChangable/user/getUserDcAndDivion/user123
    }

    // getApplicationListByDcId(dcId:any){
    //     return this.http.get(this.consumerContextPath+'/consumer-application/getByDcId/'+dcId);
    //     // localhost:8888/deposit_scheme/api/consumer/consumer-application/getByDcId/201
    // }


    getApplicationCountListByStatusIdGroup(userId: any, dcId: any) {
        return this.http.get(this.userContextPath + '/pagination/getAllDataFromViewViaAccessLevelAndDc/' + userId + '/' + dcId)
        // localhost:8888/deposit_scheme/api/user/pagination/getAllDataFromViewViaAccessLevelAndDc/{userId}/{dcId}
    }

    getAllApplicationListByStatusGroupId(applicationStatusId: any, userId: any, dcId: any) {
        return this.http.get(this.userContextPath + '/pagination/getAllApplicationByApplicationStatusByUserIdAndDC/' + applicationStatusId + '/' + userId + '/' + dcId)
        // localhost:8888/deposit_scheme/api/user/pagination/getAllApplicationByApplicationStatusByUserIdAndDC/{applicationStatusId}/{userId}/{dcId}
    }


    aavedakKaPrakarConfirmationByDgm(body: any) {
        return this.http.patch(this.consumerContextPath + '/consumer-application/isAvedakReallyGovernment', body)

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer/consumer-application/isAvedakReallyGovernment
    }


    getDuplicateRefundList(consumerApplicationNo: any) {
        return this.http.get(this.contextPath + '/consumer_account_deatils/consumer/getConsumerApplicationDuplicateRefundDetails/' + consumerApplicationNo);

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer_account_deatils/consumer/getConsumerApplicationDuplicateRefundDetails/{consumerApplicationNo}
    }

    submitDuplicateRefundRequest(body: any) {
        return this.http.post(this.contextPath + '/consumer_account_deatils/consumer/saveDuplicateRefundDetails', body)
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer_account_deatils/consumer/saveDuplicateRefundDetails
    }


    getApplicationListCountByStatusForDiscomUser(userId: any, dcId: any, divisionId: any) {
        return this.http.get(this.userContextPath + "/pagination/getAllDataFromViewViaAccessLevelAndDc/" + userId + "/" + dcId + "/" + divisionId);

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/user/pagination/getAllDataFromViewViaAccessLevelAndDc/112233/}{dcId]/{divisionId}
    }

    ConsumerApplicationListByStatusIds(statusIds: any, userId: any, dcId: any, divisionId: any) {
        return this.http.get(this.userContextPath + "/pagination/getAllApplicationByApplicationStatusByUserIdAndDC/" + statusIds + "/" + userId + "/" + dcId + "/" + divisionId)

        // https://dsp.mpcz.in:8888/deposit_scheme/api/user/pagination/getAllApplicationByApplicationStatusByUserIdAndDC/6,7,9,12,20,21,22,23,24,25,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44/112233/{dcId}/{divisionId}
    }



    refundRequestconfirmationByFinance(consumerApplicationNo: any, financeAoId: any, financeAoRefundReject: any, financeName: any, financeRemark: any) {

        return this.http.put(this.contextPath + '/refundAmount/user/financeAoRefundReject?consumerApplicationNo=' + consumerApplicationNo + '&financeAoId=' + financeAoId + '&financeAoRefundReject=' + financeAoRefundReject + '&financeName=' + financeName + '&financeRemark=' + financeRemark, null);

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/refundAmount/user/financeAoRefundReject?consumerApplicationNo=7ffyy7775&financeAoId=65666&financeAoRefundReject=true&financeName=md&financeRemark=gdhffhgfgg
    }


    getRefundApplicationDetails(appNo: any) {

        return this.http.get(this.contextPath + '/refundAmount/user/getRefundApplication/' + appNo)

        // http://localhost:8083/deposit_scheme/api/refundAmount/user/getRefundApplication/DS1730182063109
    }


    updateDuplicateRefundPaymentByDgm(consumerApplicationNo: any, approval: any, id: any, name: any, token: any) {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.put(this.contextPath + '/consumer_account_deatils/user/dgmApprovalForDuplicateRefund?consumerApplicationNo=' + consumerApplicationNo + '&dgmApproval=' + approval + '&dgmId=' + id + '&dgmName=' + name, null, { headers })

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer_account_deatils/user/dgmApprovalForDuplicateRefund?consumerApplicationNo=hdiuew&dgmApproval=true&dgmId=34343434343434&dgmName=dfddkkdkfkdfkdfk
    }

    updateDuplicateRefundPaymentByGm(consumerApplicationNo: any, approval: any, id: any, name: any, token: any) {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.put(this.contextPath + '/consumer_account_deatils/user/gmApprovalForDuplicateRefund?consumerApplicationNo=' + consumerApplicationNo + '&gmApproval=' + approval + '&gmId=' + id + '&gmName=' + name, null, { headers })

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer_account_deatils/user/gmApprovalForDuplicateRefund?consumerApplicationNo=ssdsd6767776&gmApproval=true&gmId=344343&gmName=dddggdg
    }


    updateDuplicateRefundPaymentByFinance(consumerApplicationNo: any, approval: any, id: any, name: any, token: any) {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.put(this.contextPath + '/consumer_account_deatils/user/financeAoDuplicateRefund?consumerApplicationNo=' + consumerApplicationNo + '&financeAoId=' + id + '&financeApproval=' + approval + '&financeName=' + name, null, { headers })

        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer_account_deatils/user/financeAoDuplicateRefund?consumerApplicationNo=sdudsdsdsd&financeAoId=sdsdsdsd&financeApproval=true&financeName=ssdsdsd
    }

    getDemandPaymentDetailsNewForMkmy(consumerAppNo: any) {
        return this.http.get(this.mkmyContextPath + '/getMkmyAmountByConsumerApplicationNo/' + consumerAppNo);
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/mmky/getMkmyAmountByConsumerApplicationNo/{consumerAppNo}
    }



    // getAllDuplicateRefundApplicationByApplicationNo(consumerApplicationNumber: any, token: any) {
    //     var headers = new HttpHeaders();
    //     headers.append("Authorization", token);
    //     return this.http.get(this.contextPath + '/consumer_account_deatils/getAllDuplicateRefundApplicationByApplicationNo/' + consumerApplicationNumber, { headers });

    //     // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer_account_deatils/getAllDuplicateRefundApplicationByApplicationNo/sdsdsdsdsd
    // }


    getDuplicateRefundListForFinance(token: any) {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.get(this.contextPath + '/consumer_account_deatils/getAllDuplicateRefundApplication', { headers });

        //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/consumer_account_deatils/getAllDuplicateRefundApplication
    }

    saveAddressProofData(body: any) {
        return this.http.patch(this.contextPath + "/refundAmount/consumer/saveAddressProofData", body);
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/refundAmount/consumer/saveAddressProofData

    }


    changeConsumerMobileNumberByAdmin(oldMobileNo: any, newMobileNo: any, token: any) {
        var headers = new HttpHeaders();
        headers.append("Authorization", token);
        return this.http.put(this.contextPath + '/adminChangable/user/changeConsumerMobileNo/' + oldMobileNo + '/' + newMobileNo, null, { headers })
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/adminChangable/user/changeConsumerMobileNo/765575776775/656464464
    }

    getContractorPendency(authenticationId: any) {
        return this.http.get(this.contextPath + '/consumer/qc-portal/oytContractorPendency/' + authenticationId);

        // https://dsp.mpcz.in:8888/deposit_scheme/api/consumer/qc-portal/oytContractorPendency/{authenticationId}
    }

    getAllReSamplingData(flagNo:any){
        return this.http.get(this.url.baseUrl+'/deposit_scheme/ReSampling/getSampleData/'+flagNo);
        // https://rooftop-uat.mpcz.in:8888/deposit_scheme/ReSampling/getSampleData/{flagNo}
    }

    resamplingDataSubmit(body:any){
return this.http.post(this.url.baseUrl+'/deposit_scheme/ReSampling/post-resample-data1',body)
        //  https://dsp.mpcz.in:8888/deposit_scheme/ReSampling/post-resample-data
    }

     getSufflingData(auticationId:any){
return this.http.get(this.url.baseUrl+'/deposit_scheme/ReSampling/safling-data-by-autenotication-ID1/'+auticationId)

//  https://dsp.mpcz.in:8888/deposit_scheme/ReSampling/safling-data-by-Vendor-table-autenotication-ID1/20160707611
     }

    getVenderList(){
// return this.http.get("https://qcportal.mpcz.in/api/get_vendor/");
return this.http.get("https://qcportal.mpcz.in/api/get_vendor_data_wite_material/");

        // https://qcportal.mpcz.in/tkc/send_vendor_details_to_dsp_portal/%3CCAN%3E
    }

    checkReturnMaterialTotalRowsBalanceAmountZeroOrNotGetApi(erp: any) {
    return this.http.get('https://dsp.mpcz.in:8888/newerp/xxpa_mat_rec_qty_bal/' + erp);
    // https://dsp.mpcz.in:8888/newerp/xxpa_mat_rec_qty_bal/12257
  }


  gettingAllTheDataOfVendorMaterial(consumerApplicaitonNo:any){
return this.http.get(this.url.baseUrl+'/deposit_scheme/vendor_add_materials/getAllVendorMaterial/'+consumerApplicaitonNo);

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/vendor_add_materials/getAllVendorMaterial/SV2023081151
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/vendor_add_materials/getAllVendorMaterial/{consAppNo}
  }

  updateTheVendorMaterialData(body:any){
return this.http.patch(this.url.baseUrl+'/deposit_scheme/vendor_add_materials/consumer/updateVendorMaterialData',body);

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/vendor_add_materials/consumer/updateVendorMaterialData
  }

  resamplingGettingPtrValue(consumerApplicationNumber:any){
return this.http.get(this.url.baseUrl+'/deposit_scheme/ReSampling/getPtrValue/'+consumerApplicationNumber);
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/ReSampling/getPtrValue/{consumerApplicationNo}
  }

oytMaterialChargesSubmit(erpNumber:any,consumerApplicationNumber:any){
return this.http.get(this.userContextPath+'/erp/oytMaterialCharges1/'+erpNumber+'/'+consumerApplicationNumber).pipe(timeout(200000));

// https://dsp.mpcz.in:8888/deposit_scheme/api/user/erp/oytMaterialCharges1/100301/SV1234
}


getAllSuffledData(){
return this.http.get(this.url.baseUrl+'/deposit_scheme/ReSampling/getsempleSelectedAndTestingDoneData');

    //   https://dsp.mpcz.in:8888/deposit_scheme/ReSampling/getsempleSelectedAndTestingDoneData
}


getAllSufflingDataWhichIsSelectedForTesting(){
return this.http.get(this.url.baseUrl+'/deposit_scheme/ReSampling/getselectTestingData');

    //   https://dsp.mpcz.in:8888/deposit_scheme/ReSampling/getselectTestingData
}


getReSamplingListForSingleDtrList(){
return this.http.get(this.url.baseUrl+'/deposit_scheme/ReSampling/getSampleDataForConsuemrAppliationDetailTable/0')

    //   https://rooftop-uat.mpcz.in:8888/deposit_scheme/ReSampling/getSampleDataForConsuemrAppliationDetailTable/0
}


getSampleDataForReSamplingTable(flag:any){
return this.http.get(this.url.baseUrl+'/deposit_scheme/ReSampling/getSampleDataForReSamplingTable/'+flag)

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/ReSampling/getSampleDataForReSamplingTable/{flag value}
}


gatePassCreate(body:any){
return this.http.post(this.url.baseUrl+'/deposit_scheme/GatePassChallan/save',body)

    //   https://rooftop-uat.mpcz.in:8888/deposit_scheme/GatePassChallan/save
}


getGetPassDetails(consumer_applicaion_no:any){
return this.http.get(this.url.baseUrl+'/deposit_scheme/ReSampling/getSampleDataForConsuemrAppliationDetailTableByConsumerApplicaionNo/'+consumer_applicaion_no)

    //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/ReSampling/getSampleDataForConsuemrAppliationDetailTableByConsumerApplicaionNo/{consumer_applicaion_no}
}
  
trfAndGatePassUpload(body:any,token:any){
     var headers = new HttpHeaders();
        headers.append("Authorization", token);
    return this.http.post(this.url.baseUrl+'/deposit_scheme/GatePassChallan/saveGetPassPdfaAndtrfUploadFile',body, { headers });
    

//  https://rooftop-uat.mpcz.in:8888/deposit_scheme/GatePassChallan/saveGetPassPdfaAndtrfUploadFile
}


createDtrTestingReport(body:any){
return this.http.post(this.url.baseUrl+'/deposit_scheme/nistha-lab/testing-report-upload',body)

    //  https://rooftop-uat.mpcz.in:8888/deposit_scheme//nistha-lab//testing-report-upload
}
    

refundPaymentDetailsUploadByDiscomUser(body:any){
return this.http.post(this.url.baseUrl+'/api/refundAmount/upload-pdf-for-refund-data',body)
    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/api/refundAmount/upload-pdf-for-refund-data
}


getApiForDtrDetails(conAppNo:any){
return this.http.get(this.url.baseUrl+'/deposit_scheme/ReSampling/getReSampleData/'+conAppNo);

    //  https://rooftop-uat.mpcz.in:8888/deposit_scheme/ReSampling/getReSampleData/SV202309133412
}


NisthaLabMaterialConfirmationDuringRecieve(body:any){
return this.http.post(this.url.baseUrl+'/deposit_scheme/GatePassChallan/nistha-lab-TA-submit-data',body)

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/GatePassChallan/nistha-lab-TA-submit-data
}


reviseGatePassUpload(body:any){
    return this.http.post(this.url.baseUrl+'/deposit_scheme/GatePassChallan/saveReversiveGetPassPdfaAndtrfUploadFile',body)

    // https://rooftop-uat.mpcz.in:8888/deposit_scheme/GatePassChallan/saveReversiveGetPassPdfaAndtrfUploadFile
}


}
