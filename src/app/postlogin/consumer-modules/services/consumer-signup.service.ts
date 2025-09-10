import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenerateUrl } from 'src/environments/generate-url.model';

@Injectable({
    providedIn: 'root'
})

export class ConsumerSignupService {
    constructor(
        private http: HttpClient,
        private url: GenerateUrl
    ) { }
    consumerSignupUrl: string = this.url.consumerSignupUrl;
    addNewConsumer(reg: any) {
        console.log("addNewConsumer + reg : ", reg);
        console.log("this.consumerSignupUrl + '/signup', reg", this.consumerSignupUrl, reg);
        return this.http.post(this.consumerSignupUrl, reg);
    }
}
