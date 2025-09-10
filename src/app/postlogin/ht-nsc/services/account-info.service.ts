import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { GenerateUrl } from 'src/environments/generate-url.model';

@Injectable({
  providedIn: 'root'
})
export class AccountInfoService {
  connectionDate:Date;
  purposeOfGmc: {}
  connectionTypeId:number;
  sanctionLoad:number;
  baseUrl: string = this.url.mastersUrl;
  nscUrl: string = this.url.nscUrl;
  tariffScheduleUrl: string = this.url.tariffScheduleUrl;
  tariffSubCategoryUrl: string = this.url.tariffSubCategoryUrl;
  purposeOfGmcUrl: string = this.url.purposeOfGmcUrl;
  revenueCategoryUrl: string = this.url.revenueCategory;
  departmentUrl: string = this.url.departmentAllUrl;
  governmentTypeUrl: string = this.url.governmentTypeUrl;
  purposeOfInstallationUrl: string = this.url.purposeOfInstallationUrl;
  connectionTypeUrl: string = this.url.connectionTypeUrl;
  constructor(private http: HttpClient, private url: GenerateUrl) { }

  getConnectionType(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.connectionTypeUrl + '/getAll');
  }
  getCustomerClass(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.tariffScheduleUrl + '/getAll');
  }
  getAllPurposeInst(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllPurposeInst');
  }
  getAllTariffCategoryByTariffCode(tariffCode: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllTariffCategoryByTariffCode/' + tariffCode);
  }
  getAllTariffSubCategoryByTariffCode(tariffCode: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.tariffSubCategoryUrl + '/getAllTariffSubCategoryByTariffCode/' + tariffCode);
  }
  getGmcByPurpose(id: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.purposeOfInstallationUrl + '/get/' + id);
  }
  getGmcByPurposeOfGmcId(purposeOfGmcId: string): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.purposeOfGmcUrl + '/get/' + purposeOfGmcId);
  }
  getAllGovernmentType(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.governmentTypeUrl + '/getAll/');
  }
  getDepartmentByGovtId(govtId: string): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.departmentUrl + '/getAllDepartmentByGovt/' + govtId);
  }
  getPurposeBySubCategoryAndSupplyVoltage(subCategoryCode: any, supplyVolatage: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.purposeOfInstallationUrl + '/getAllPurposeAndRevanueBySubCategoryTariffCodeAndSupplyVoltage/' + subCategoryCode + '/' + supplyVolatage);
  }
  getRevenueCategoryByTariffSubCategoryCode(subCategoryCode: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.revenueCategoryUrl + '/getAllRevenueCategoryByTariffSubCategoryCode/' + subCategoryCode);
  }
  getAllPurposeBySupplyVoltage(supplyVoltageId: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.purposeOfInstallationUrl + '/getAllPurposeOfInstBySupplyVoltage/' + supplyVoltageId);
  }
  getAllTariffByPurposeId(purposeId: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.purposeOfInstallationUrl + '/getAllTariffByPurposeOfInstId/' + purposeId);
  }
  getAllEdutyPercentage(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllEdutyPercentage');
  }
  getAllSupplyVoltages(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllSupplyVoltages');
  }
  getConsumerAccInfoByConsumerId(Id: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.nscUrl + '/getConsumerAccountInformationByConsumerId/' + Id);
  }
}
