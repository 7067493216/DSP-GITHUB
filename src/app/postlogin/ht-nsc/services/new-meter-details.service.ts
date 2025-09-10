import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { HttpClient } from '@angular/common/http';
import { GenerateUrl } from 'src/environments/generate-url.model';

@Injectable({
  providedIn: 'root'
})
export class NewMeterDetailsService {
  isNetMeterSelected:boolean = false;
  meterReplacement:boolean= false;
  previousMtrReadDate:Date;
  // previousMtrReadDetails:Array<any> = [];;
  meterPtr;
  meterCtr;
  existingMeterCTR;
  existingMeterPTR;
  contractDemand;
  baseUrl: string = this.url.mastersUrl;
  meterUrl: string = this.url.meterUrl;
  divisionUrl: string = this.url.divisionUrl;

  constructor(private http: HttpClient, private url: GenerateUrl) { }

  meterType(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.meterUrl + '/getAll');
  }
  getConfigurationClass( ): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllConfigurations');
  }
  getAllSupplyVoltages( ): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllSupplyVoltages');
  }
  getMeterRentTypes( ): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllMeterRentTypes');
  }
  getAllManufacturesTypes( ): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllManufactures');
  }
  getMeterCapacities( ): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllMeterCapacities');
  }
  getAllCTRatiosTypes( ): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllCTRatios');
  }
  getAllPTRatiosTypes( ): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllPTRatios');
  }
  getGroupsByLocationCode(divisionId: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.divisionUrl + '/getAllGroupsByDivision/' + divisionId);
  }
  getAllMeterTypesByMeterReplacementId(id: any): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.meterUrl + '/getAllMeterTypesByMeterReplacementId/' + id);
  }
  getAllModelsByMeterManufacturer(meterMakeDetailId: any ): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllModelsByMeterManufacturer/' + meterMakeDetailId);
  }
  getMeterReplacementReasons(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllMeterReplacementReasons');
  }

}
