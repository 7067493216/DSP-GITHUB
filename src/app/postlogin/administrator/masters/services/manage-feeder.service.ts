import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { DcData } from '../models/dc.model';
import { FeederData } from '../models/feeder.model';
import { GenerateUrl } from 'src/environments/generate-url.model';



@Injectable({
  providedIn: 'root'
})
export class ManageFeederService {
  baseUrl: string = this.url.feederUrl;
  feederUrlUser :string =this.url.feederUrlUser;
  constructor(
    private http: HttpClient,
    private url: GenerateUrl
  ) { }

  getFeederList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAll');
  }
  addFeeder(reg: FeederData) {
    return this.http.post(this.baseUrl + '/add', reg);

  }

  deleteFeeder(feederId: number) {
    return this.http.delete(this.baseUrl + '/delete/' + feederId);
  }

  getFeederById(feederId: number): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/get/' + feederId);
  }

  updateFeeder(feederId: number, reg: DcData): Observable<any> {
    return this.http.put(this.baseUrl + '/update/' + feederId, reg);
  }
  getAllFeederBySubstation(subStationId: number): Observable<any> {
    return this.http.get(this.feederUrlUser + '/getAllFeederBySubstation/' + subStationId);
  }

}
