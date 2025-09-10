import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { LoadChangeModel } from '../models/load-change.model';
import { GenerateUrl } from 'src/environments/generate-url.model';

@Injectable({
  providedIn: 'root'
})
export class LoadChangeService {
  baseUrl: string = this.url.mastersUrl;
  loadChangeUrl: string = this.url.loadChangeUrl;
  // purposeUrl: string = this.url.purposeCategoryUrl;
  constructor(private http: HttpClient, private url: GenerateUrl) { }

  getConsumerDetails(consumerId: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.loadChangeUrl + '/getConsumerLoadDetails/' + consumerId);
  }
  loadChangeDetails(consumerId: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.loadChangeUrl + '/getConsumerRecordDetails/' + consumerId);
  }
/*   getAllpurpose(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.purposeUrl + '/getAll');
  } */
/*   getGmcByPurposId(purposeId: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.purposeUrl + '/get/' + purposeId);
  } */
  getContractQuantity(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllQuantityContractType/');
  }
  // Save Load Change Submission
  saveUpdatedLoad(loadChange: LoadChangeModel) {
    return this.http.post(this.loadChangeUrl + '/updateConsumerLoadDetails', loadChange);
  }
}
