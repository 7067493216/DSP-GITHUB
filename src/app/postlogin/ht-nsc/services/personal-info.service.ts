import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { GenerateUrl } from 'src/environments/generate-url.model';

@Injectable({
  providedIn: 'root'
})
export class PersonamInfoService {
  baseUrl: string = this.url.mastersUrl;
  nscUrl: string = this.url.nscUrl;
  departmentUrl: string = this.url.departmentAllUrl;
  governmentTypeUrl: string = this.url.governmentTypeUrl;
  subStationUrl: string = this.url.subStationUrl;
  feederUrl: string = this.url.feederUrl;

  constructor(private http: HttpClient, private url: GenerateUrl) { }

  getNameType(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllNameTypes');
  }
  getUserType(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllUserTypes');
  }
  getDocType(): Observable<any> {
    return this.http.get<ListResponse>(this.baseUrl + '/getAllPersonalIdDocTypes');
  }
  getRelationType(id): Observable<any> {
    return this.http.get<ListResponse>(this.baseUrl + '/getAllRelationTypes/' + id);
  }
  getAllGovernmentType(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.governmentTypeUrl + '/getAll/');
  }
  getDepartmentByGovtId(govtId: string): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.departmentUrl + '/getAllDepartmentByGovt/' + govtId);
  }
  getAllDepartmentNames(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.departmentUrl + '/getAll/');
  }
  getPersonalInfoByConsumerId(Id: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.nscUrl + '/getConsumerPersonalInformationByConsumerId/' + Id);
  }
  getConsumerBasicInfo(Id: string): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.nscUrl + '/getConsumerBasicInfo/' + Id);
  }
  updateConsumerBasicInfo(formData) {
    return this.http.put(this.nscUrl + '/updateConsumerBasicInfo', formData);
  }

  //			******************sandeep, 17-08-2022, starts*****************************
  getAllSubstationList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.subStationUrl + '/getAll/');
  }

  getFeederBySubstation(subStationId: number): Observable<any> {
    return this.http.get(this.feederUrl + '/getAllFeederBySubstation/' + subStationId);
  }
  Feeder
  getAllFeederList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.feederUrl + '/getAll/');
  }
  //			******************sandeep, 17-08-2022, ends*******************************

}
