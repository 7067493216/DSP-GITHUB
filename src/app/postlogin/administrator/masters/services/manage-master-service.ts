import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { GenerateUrl } from 'src/environments/generate-url.model';


@Injectable({
    providedIn: 'root'
})
export class ManageMasterService {
    constructor(
        private http: HttpClient,
        private url: GenerateUrl
    ) { }

    mastersUrl: string = this.url.mastersUrl;


    getDiscomList(): Observable<ListResponse[]> {
        return this.http.get<ListResponse[]>(this.mastersUrl + '/getAllDiscom');
    }

    getRegionByDiscom(discomId: number): Observable<any> {
        return this.http.get(this.mastersUrl + '/getAllRegionByDiscom/' + discomId);
    }
}
