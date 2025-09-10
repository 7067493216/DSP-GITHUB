import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { SubStationData } from '../models/substation.model';
import { GenerateUrl } from 'src/environments/generate-url.model';



@Injectable({
  providedIn: 'root'
})
export class ManageSubStationService {
  baseUrl: string = this.url.subStationUrl;
  substationurlUser : string =this.url.substationurlUser;
  constructor(
    private http: HttpClient,
    private url: GenerateUrl
  ) { }

  getSubStationList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAll');
  }
  addSubStation(reg: SubStationData) {
    return this.http.post(this.baseUrl + '/add', reg);

  }

  deleteSubStation(subStationId: number) {
    return this.http.delete(this.baseUrl + '/delete/' + subStationId);
  }
  getSubStationById(subStationId: number): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/get/' + subStationId);
  }

  updateSubStation(subStationId: number, reg: SubStationData): Observable<any> {
    return this.http.put(this.baseUrl + '/update/' + subStationId, reg);
  }
  getAllSubstationByDC(dcId: number): Observable<any> {
    return this.http.get(this.substationurlUser + '/getAllSubstaionByDc/' + dcId);
  }


}
