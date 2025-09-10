import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NscApiService {
   apiUrl:string = "http://localhost:8083/deposit_schemeee/api/user/nsc-data/save/nscdata";

  constructor(
    private http:HttpClient
  ) { }

AddNscDataToDsp(body:any){
return this.http.post(this.apiUrl,body);
}

}
