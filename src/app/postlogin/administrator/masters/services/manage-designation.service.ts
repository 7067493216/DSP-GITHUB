import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { Designationdata } from '../models/designationdata.model';
import { GenerateUrl } from 'src/environments/generate-url.model';

@Injectable({
  providedIn: 'root'
})
export class ManageDesignationService {
  baseUrl: string = this.url.designationUrl;
  constructor(
    private http: HttpClient,
    private url: GenerateUrl
  ) { }


  getDesignationList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAll');
  }

  addDesignation(reg: Designationdata) {
    return this.http.post(this.baseUrl + '/add', reg);

  }

  deleteDesignation(designationId: number) {
    return this.http.delete(this.baseUrl + '/delete/' + designationId);
  }

  getDesignationById(designationId: number): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/get/' + designationId);
  }

updateDesignation(designationId: number, reg: Designationdata): Observable < any > {
  return this.http.put(this.baseUrl + '/update/' + designationId, reg);
}

}
