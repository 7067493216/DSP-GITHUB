import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { InputData } from '../shared-models/check-duplicate.model';
import { GenerateUrl } from 'src/environments/generate-url.model';

@Injectable({
    providedIn: 'root'
})
export class AsyncValidatorService {
    baseUrl: string = this.url.mastersUrl;
    constructor(private http: HttpClient, private url: GenerateUrl) { }

    public AsyncValidator(master, crudType, rowId, fieldName?, consumerId?): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            const data = {} as InputData;
            const inputValue = control.value;
            const validation = fieldName;
            if (master === 'user') {
                data.master = master;
                data.crudType = crudType;
                if (validation === 'mobile') {
                    data.mobile = inputValue;
                    data.email = null;
                    data.aadharNumber = null;
                } else if (validation === 'email') {
                    data.mobile = null;
                    data.email = inputValue;
                    data.aadharNumber = null;
                } else if (validation === 'userId') {
                    data.userId = inputValue;
                    data.mobile = null;
                    data.email = null;
                    data.aadharNumber = null;
                } else if (validation === 'aadhar') {
                    data.mobile = null;
                    data.email = null;
                    data.aadharNumber = inputValue;
                } else {
                    data.mobile = null;
                    data.email = null;
                    data.aadharNumber = inputValue;
                }
            } else if (master === 'meter') {
                data.master = master;
                data.crudType = crudType * 1;
                data.dataName = inputValue;
                data.consumerId = consumerId;
            } else if (master === 'submeter') {
                data.master = master;
                data.crudType = crudType * 1;
                data.dataName = inputValue;
                data.consumerId = consumerId;
            }



            else if (master === 'nsc') {
                data.master = master;
                data.crudType = crudType * 1;
                data.idProofNumber = inputValue;
            }

            // *********************sandeep, 26-08-2022, starts*************************
            else if (master === 'consumer') {
                data.master = master;
                data.crudType = crudType;

                if (validation === 'consumerMobileNo') {
                    data.consumerMobileNo = inputValue;
                    data.consumerEmailId = null;
                    data.aadharNo = null;
                    data.panNo = null;
                } else if (validation === 'consumerEmailId') {
                    data.consumerMobileNo = null;
                    data.consumerEmailId = inputValue;
                    data.aadharNo = null;
                    data.panNo = null;
                } else if (validation === 'aadharNo') {
                    data.consumerMobileNo = null;
                    data.consumerEmailId = null;
                    data.aadharNo = inputValue;
                    data.panNo = null;
                } else if (validation === 'panNo') {
                    data.consumerMobileNo = null;
                    data.consumerEmailId = null;
                    data.aadharNo = null;
                    data.panNo = inputValue;
                }
            }
            // *********************sandeep, 26-08-2022, ends***************************
            else {
                data.recordId = 0;
                data.master = master;
                data.crudType = crudType;
                data.mobile = null;
                data.email = null;
                data.userId = null;
                data.idProofNumber = null;
                data.aadharNumber = null;
                if (validation === 'code') {
                    data.dataCode = inputValue;
                    data.dataName = null;

                } else {
                    data.dataName = inputValue;
                }
            }
            if (crudType === 2) {
                data.recordId = rowId;
            } else {
                data.recordId = 0;
            }

            return this.validatorService(data).pipe(map((responce: any) => {
                const code = responce.code * 1;
                if (code === 409) {
                    return { uniqueValue: { valid: false } };
                }
                // *********************sandeep, 26-08-2022, starts*************************
                else if (code === 198) {
                    return { uniqueValue: { valid: true } };
                }
                // *********************sandeep, 26-08-2022, ends***************************
                else {
                    return null;
                }
            }));
        };
    }

    validatorService(data: InputData) {
        return this.http.post(this.baseUrl + '/isDataAlreadyExists', data);
    }


}




