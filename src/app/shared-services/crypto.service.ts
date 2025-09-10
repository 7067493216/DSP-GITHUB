import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})

export class CryptoService {
    constructor() { }
    secret = 'HtNgb56$#@$^@5Pn';

    objEncrypt(value) {
        if (value) {
            const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), this.secret,
                {
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
            return encrypted.toString();
        }
    }

    objDecrypt(value) {
        if (value) {
            const bytes = CryptoJS.AES.decrypt(value.toString(), this.secret, {
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return decryptedData;
        }
    }

    textEncrypt(value) {

        const encrypted = CryptoJS.AES.encrypt(value, this.secret);
        return encrypted;
    }

    textDecrypt(value) {
        if (value !== "" && value != null) {
            const bytes = CryptoJS.AES.decrypt(value.toString(), this.secret);
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            return decryptedData;
        } else {
            sessionStorage.removeItem('SearchKey');
        }

    }
}
