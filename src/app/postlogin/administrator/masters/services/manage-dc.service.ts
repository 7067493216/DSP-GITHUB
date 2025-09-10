import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';


import { DcData } from '../models/dc.model';
import { GenerateUrl } from 'src/environments/generate-url.model';



@Injectable({
  providedIn: 'root'
})
export class ManageDcService {
  baseUrl: string = this.url.dcUrl;

  masterUrl: string = this.url.mastersUrl;

  constructor(
    private http: HttpClient,
    private url: GenerateUrl,

  ) { }

  getDcList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAll');
  }
  addDc(reg: DcData) {
    return this.http.post(this.baseUrl + '/add', reg);
  }

  deleteDc(dcId: number) {
    return this.http.delete(this.baseUrl + '/delete/' + dcId);
  }

  getDcById(dcId: number): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/get/' + dcId);
  }

  updateDc(dcId: number, reg: DcData): Observable<any> {
    return this.http.put(this.baseUrl + '/update/' + dcId, reg);
  }

  getAllBySubdivision(subDivisionId: number): Observable<any> {
    return this.http.get(this.masterUrl + '/getAllDcBySubdivision/' + subDivisionId);
  }     
  
  // getAllBySubStation(subStationId: number): Observable<any> {
  //   return this.http.get(this.masterUrl + '/getAllDcBySubdivision/' + subStationId);
  // }  
  // getAllByFeeder(feederId: number): Observable<any> {
  //   return this.http.get(this.masterUrl + '/getAllDcBySubdivision/' + feederId);
  // }  

}
