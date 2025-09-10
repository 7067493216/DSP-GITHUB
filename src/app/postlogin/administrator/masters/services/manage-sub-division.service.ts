import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';

import { SubDivisionData } from '../models/subdivision.model';
import { GenerateUrl } from 'src/environments/generate-url.model';



@Injectable({
  providedIn: 'root'
})
export class ManageSubDivisionService {
  baseUrl: string = this.url.subDivisionUrl;
  constructor(
    private http: HttpClient,
    private url: GenerateUrl
  ) { }

  getSubDivisionList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAll');
  }

  addSubDivision(reg: SubDivisionData) {
    return this.http.post(this.baseUrl + '/add', reg);
  }

  deleteSubDivision(subDivisionId: number) {
    return this.http.delete(this.baseUrl + '/delete/' + subDivisionId);
  }

  getSubDivisionById(subDivisionId: number): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/get/' + subDivisionId);
  }

  updateSubDivision(subDivisionId: number, reg: SubDivisionData): Observable<any> {
    return this.http.put(this.baseUrl + '/update/' + subDivisionId, reg);
  }

  // sandeep, start
  // getAllSubDivisionByDivisionId(circleId: number): Observable<any> {
  //   return this.http.get(this.baseUrl + '/getAllSubDivisionByDivision/' + circleId);
  // }
  getAllSubDivisionByDivisionId(divisionId: number): Observable<any> {
    return this.http.get(this.baseUrl + '/getAllSubDivisionByDivision/' + divisionId);
  }
  // sandeep, end
}
