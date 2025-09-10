import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { GenerateUrl } from 'src/environments/generate-url.model';

@Injectable({
  providedIn: 'root'
})
export class PremiseInfoService {
   baseUrl: string = this.url.mastersUrl;
   locationUrl: string = this.url.locationUrl;
   blockUrl: string = this.url.blockUrl;
   cityUrl: string = this.url.cityUrl;
   tehsilUrl: string = this.url.tehsilUrl;
   districtUrl: string = this.url.districtUrl;
   nscUrl: string = this.url.nscUrl;
  constructor(private http: HttpClient, private url: GenerateUrl) { }

  getAreaTown(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllAreaTowns');
  }
  getAreaType(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllAreaTypes');
  }
  getLocationCode( ): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.locationUrl + '/getAll');
  }
  getBlockCode( ): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.blockUrl + '/getAll');
  }

  getCityCode( ): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.cityUrl + '/getAll');
  }
  getTehsilCode( ): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.tehsilUrl + '/getAll');
  }
  getDistrictList( ): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.districtUrl + '/getAll');
  }
  getAlllocationById(locationCode: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.locationUrl + '/get/' + locationCode);
  }
  getAllStatesByCountry(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllStatesByCountry/1');

  }
  getAllByState(stateId: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.districtUrl + '/getAllDistrictByState/' + stateId);
  }
  getAllByDistrict(districtId: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.tehsilUrl + '/getAllTehsilByDistrict/' + districtId);
  }
  getAllByTehsil(tehsilId: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.cityUrl + '/getAllCityByTehsil/' + tehsilId);
  }
  getConsumerAddInfoByConsumerId(Id: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.nscUrl + '/getConsumerAdressInformationByConsumerId/' + Id);
  }

}
