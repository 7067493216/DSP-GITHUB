import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { DivisionData } from '../models/division.model';
import { GenerateUrl } from 'src/environments/generate-url.model';



@Injectable({
  providedIn: 'root'
})
export class ManageDivisionService {
  baseUrl: string = this.url.divisionUrl;
  constructor(
    private http: HttpClient,
    private url: GenerateUrl
  ) { }

  getDivisionList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAll');
  }

  addDivision(reg: DivisionData) {
    return this.http.post(this.baseUrl + '/add', reg);
  }

  deleteDivision(divisionId: number) {
    return this.http.delete(this.baseUrl + '/delete/' + divisionId);
  }

  getDivisionById(divisionId: number): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/get/' + divisionId);
  }

  updateDivision(divisionId: number, reg: DivisionData): Observable<any> {
    return this.http.put(this.baseUrl + '/update/' + divisionId, reg);
  }

  getAllDivisionByCircleId(circleId: number): Observable<any> {
    return this.http.get(this.baseUrl + '/getAllDivisionByCircle/' + circleId);
  }

}
