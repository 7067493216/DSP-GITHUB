import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { TariffChangeData } from '../models/tariff-change.model';
import { GenerateUrl } from 'src/environments/generate-url.model';

@Injectable({
  providedIn: 'root'
})
export class TariffChangeService {
  // baseUrl: string = this.url.mastersUrl;
  // tariffScheduleUrl: string = this.url.tariffScheduleUrl;
  tariffChangeUrl: string = this.url.tariffChangeUrl;
  constructor(private http: HttpClient, private url: GenerateUrl) { }
  
/*   getMeterRentTypes( ): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllMeterRentTypes');
  } */
  /*   getAllSupplyVoltages(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllSupplyVoltages');
  } */
        getConsumerTariffDetails(id: string): Observable<ListResponse[]> {
          return this.http.get<ListResponse[]>(this.tariffChangeUrl + '/getConsumerTariffDetails/' +id);
        }
  saveChangedTariff(tariffChangeData: TariffChangeData) {
    return this.http.post(this.tariffChangeUrl + '/updateConsumerTariffDetails', tariffChangeData);
  }
}
