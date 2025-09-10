import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaveNscData } from '../models/save-nsc.model';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NscCoreService {
  baseUrl: string = this.url.nscUrl;
  public nscData: SaveNscData;

  constructor(private http: HttpClient, private url: GenerateUrl) { }

  // Save NSC Form
  addnsc(saveNscData: SaveNscData) {
    return this.http.post(this.baseUrl + '/add', saveNscData);
  }
  consumerRecordExistence(id): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/checkConsumerRecordExist/' + id);
  }
  advanceSearch(param): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getByParam?' + param);
  }
}
