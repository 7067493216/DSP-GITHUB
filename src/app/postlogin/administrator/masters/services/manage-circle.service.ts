import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { CircleData } from '../models/circle.model';
import { GenerateUrl } from 'src/environments/generate-url.model';



@Injectable({
  providedIn: 'root'
})
export class ManageCircleService {
  baseUrl: string = this.url.circleUrl;
  masterUrl: string = this.url.mastersUrl;
  constructor(
    private http: HttpClient,
    private url: GenerateUrl
  ) { }

  getCircleList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAll');
  }

  addCircle(reg: CircleData) {
    return this.http.post(this.baseUrl + '/add', reg);
  }

  deleteCircle(circleId: number) {
    return this.http.delete(this.baseUrl + '/delete/' + circleId);
  }

  getCircleById(circleId: number): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/get/' + circleId);
  }

  updateCircle(circleId: number, reg: CircleData): Observable<any> {
    return this.http.put(this.baseUrl + '/update/' + circleId, reg);
  }

  getCircleByRegionId(regionId: number): Observable<any> {
    return this.http.get(this.baseUrl + '/getAllCircleByRegion/' + regionId);
  }

}
