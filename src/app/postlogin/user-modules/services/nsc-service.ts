import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { NewApplicationModel } from '../models/new-application.model';


@Injectable({
    providedIn: 'root'
})
export class NscService {
    constructor(
        private http: HttpClient,
        private url: GenerateUrl
    ) { }

    consumerApplicationUrl: string = this.url.consumerApplicationUrl;
    userApplicationUrl: string = this.url.userApplicationUrl;
    userSurveyUrl: string = this.url.userSurveyUrl;
    dcAcceptanceUrl: string = this.url.dcAcceptanceUrl;

    mastersUrl: string = this.url.mastersUrl;
    qcportalUrl: string = this.url.qcportalUrl;
    contextPath: string = this.url.contextPath;
    userDemandUrl: string = this.url.userDemandUrl;
    userPreviousStageUrl: string = this.url.userPreviousStageUrl;
    demandApproavlUrl: string = this.url.demandApproavlUrl;
    erp:string=this.url.erp;
    userContextPath=this.url.userContextPath;
   

    


}




