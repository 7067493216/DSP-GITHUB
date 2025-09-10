import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { DistrictData } from '../models/district.model';
import { TehsilData } from '../models/tehsil.model';
import { CityData } from '../models/city.model';
import { GenerateUrl } from 'src/environments/generate-url.model';


@Injectable({
  providedIn: 'root'
})
export class LocationMasterService {
  baseUrl: string = this.url.districtUrl;
  mastersUrl1: string = this.url.mastersUrl;
  tehsilUrl: string = this.url.tehsilUrl;
  cityUrl: string = this.url.cityUrl;
  constructor(
    private http: HttpClient,
    private url: GenerateUrl
  ) { }
 

  getAllStatesByCountry(){
    return this.http.get<ListResponse[]>(this.mastersUrl1 +'/getAllStatesByCountry/' +1);

  }
  getDistrictList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAll');
  }
  addDistrict(reg: DistrictData) {
    return this.http.post(this.baseUrl + '/add', reg);

  }

  deleteDistrict(districtId: number) {
    return this.http.delete(this.baseUrl + '/delete/' + districtId);
  }

  getDistrictById(stateId: number): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/get/' + stateId);

  }

  updateDistrict(districtId: number, reg: DistrictData): Observable<any> {
    return this.http.put(this.baseUrl + '/update/' + districtId, reg);
  }
  getAllByState(stateId: number): Observable<any> {
    return this.http.get(this.baseUrl + '/getAllDistrictByState/' + stateId);
  }
  
  getTehsilList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.tehsilUrl + '/getAll');
  }
  addTehsil(reg: TehsilData) {
    return this.http.post(this.tehsilUrl + '/add', reg);

  }

  deleteTehsil(tehsilId: number) {
    return this.http.delete(this.tehsilUrl + '/delete/' + tehsilId);
  }

  getTehsiltById(DistrictId: number): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.tehsilUrl + '/get/' + DistrictId);

  }

  updateTehsil(tehsilId: number, reg: TehsilData): Observable<any> {
    return this.http.put(this.tehsilUrl + '/update/' + tehsilId, reg);
  }

  getAllByDistrict(tehsilId: number): Observable<any> {
    return this.http.get(this.tehsilUrl + '/getAllTehsilByDistrict/' + tehsilId);
  }
  
  getCityList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.cityUrl + '/getAll');
  }
  addCity(reg: CityData) {
    return this.http.post(this.cityUrl + '/add', reg);

  }

  deleteCity(cityId: number) {
    return this.http.delete(this.cityUrl + '/delete/' + cityId);
  }

  getCityById(cityId: number): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.cityUrl + '/get/' + cityId);

  }

  updateCity(cityId: number, reg: CityData): Observable<any> {
    return this.http.put(this.cityUrl + '/update/' + cityId, reg);
  }
}
