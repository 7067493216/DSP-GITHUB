import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenerateUrl } from 'src/environments/generate-url.model';


@Injectable({
  providedIn: 'root'
})
export class PasswordChangeService {
  baseUrl: string = this.url.authUrl;

  constructor(private http: HttpClient, private url: GenerateUrl) { }

  changePwd(data) {
    console.log(this.baseUrl + '/changePassword');
    console.log(data);
    return this.http.post(this.baseUrl + '/changePassword', data);
  }
  forgatePwd(data) {
    return this.http.post(this.baseUrl + '/updateConsumerGroup', data);

  }
}
