import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region, RegionData } from '../models/region.model';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { GenerateUrl } from 'src/environments/generate-url.model';

@Injectable({
  providedIn: 'root'
})
export class ManageRegionService {
  formData: Region;
  baseUrl: string = this.url.regionUrl;
  masterUrl: string = this.url.mastersUrl;
  constructor(
    private http: HttpClient,
    private url: GenerateUrl
  ) { }


  getDiscomList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.masterUrl + '/getAllDiscom');
  }

  getRegionList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.masterUrl + '/getAllRegion');
  }

  addRegion(reg: RegionData) {
    return this.http.post(this.baseUrl + '/add', reg);
  }

  deleteRegion(regionId: number) {
    return this.http.delete(this.baseUrl + '/delete/' + regionId);
  }

  getRegionById(regionId: number): Observable<Region[]> {
    return this.http.get<Region[]>(this.baseUrl + '/get/' + regionId);
  }

  updateRegion(regionId: number, reg: RegionData): Observable<any> {
    return this.http.put(this.baseUrl + '/update/' + regionId, reg);
  }

  getRegionByDiscom(discomId: number): Observable<any> {
    return this.http.get(this.baseUrl + '/getAllRegionByDiscom/' + discomId);
  }
}
