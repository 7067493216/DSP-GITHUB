import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { HttpClient } from '@angular/common/http';
import { DialMf } from '../models/dialMfCalculation.model';
import { GenerateUrl } from 'src/environments/generate-url.model';

@Injectable({
  providedIn: 'root'
})
export class NewEquipmentDetailsService {
  ctIsEditable = false;
  ptIsEditable = false;
  modemIsEditable = false;
  simIsEditable = false;
  meCtr;
  mePtr;
  mtrCtPtRatio:{};
  baseUrl: string = this.url.mastersUrl;
  divisionId: string = this.url.divisionUrl;
  nscUrl: string = this.url.nscUrl;

  constructor(private http: HttpClient, private url: GenerateUrl) { }

  getAllCTParameter( ): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllCTParameter');
  }
  getCTValueByCTParameter(ctParameterId: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllCTParameterValueByCTParameter/' + ctParameterId);
  }
  getCTManufacturer(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllCTManufacturer/');
  }
  getCtModelByCTManufacturer(manufacturer: string): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllCTModelByCTManufacturer/' + manufacturer);
  }
  getAllPTParameter(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllPTParameter');
  }
  getPTParameterValueByPTParameter(parameter: string): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllPTParameterValueByPTParameter/' + parameter);
  }
  getPTManufacturer(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllPTManufacturer/');
  }
  getPTModelByManufacturer(manufacturer: string): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllPTModelByPTManufacturer/' + manufacturer);
  }
  getModemManufacturer(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllModemManufacturer/');
  }
  getModemModelByManufacturer(manufacturer: string): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllModemModelByModemManufacturer/' + manufacturer);
  }
  getSimServiceProvider(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllSIMServiceProvider/');
  }
  calculateDialMf(dialMf: DialMf) {
    return this.http.post(this.nscUrl + '/getMF', dialMf);
  }
  getMeReplacementReasons(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllMeReplacementReasons');
  }

}
