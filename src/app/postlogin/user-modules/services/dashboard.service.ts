import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenerateUrl } from 'src/environments/generate-url.model';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
    // dashboard: string = this.url.dashboard;
    dashboard: any;
   
  
    constructor(
      private http: HttpClient,
      private url: GenerateUrl
    ) { }

    //https://rooftop-uat.mpcz.in:8443/htngb_backend/api/Dashboard/getAllHtActiveConsumers
    getHTActiveConsumers() {
        return this.http.get(this.dashboard+'/getAllHtActiveConsumers')
    }
    //https://rooftop-uat.mpcz.in:8443/htngb_backend/api/Dashboard/getBillDeterminantOfCurrentBillMonth
    getAllBillDeterminant() {
        return this.http.get(this.dashboard+'/getBillDeterminantOfCurrentBillMonth');
    }
    //https://rooftop-uat.mpcz.in:8443/htngb_backend/api/Dashboard/getBillGenerationStatusOfCurrentBillMonth
    getAllBillGeneration() {
        return this.http.get(this.dashboard+'/getBillGenerationStatusOfCurrentBillMonth');
    }
    //https://rooftop-uat.mpcz.in:8443/htngb_backend/api/Dashboard/getHtPdcCountsOfLastThreeBillMonth
    getHTPermanentDisconnection(){
        return this.http.get(this.dashboard+'/getHtPdcCountsOfLastThreeBillMonth');
    }
    //https://rooftop-uat.mpcz.in:8443/htngb_backend/api/Dashboard/getR15StatusOfCurruntBillMonth
    getAllR15(){
        return this.http.get(this.dashboard+'/getR15StatusOfCurruntBillMonth');        
    }

    //https://rooftop-uat.mpcz.in:8443/htngb_backend/api/Dashboard/getHtNscCountsOfLastThreeBillMonth
    getAllNSC(){
        return this.http.get(this.dashboard+'/getHtNscCountsOfLastThreeBillMonth');
    }

    //https://rooftop-uat.mpcz.in:8443/htngb_backend/api/Dashboard/getAmrReadingStatusOfBillMonth
    getAllAMR(){
        return this.http.get(this.dashboard+'/getAmrReadingStatusOfBillMonth');
    }

     //https://rooftop-uat.mpcz.in:8443/htngb_backend/api/Dashboard/getCurrentMonthDemand
     getCurrentMonthDemand(){
        return this.http.get(this.dashboard+'/getCurrentMonthDemand');
    }

   // https://rooftop-uat.mpcz.in:8443/htngb_backend/api/Dashboard/getCollectionAgainstCurrentBillMonth
    getAllcollectioncurrentbill(){
        return this.http.get(this.dashboard+'/getCollectionAgainstCurrentBillMonth');
    }

    // https://rooftop-uat.mpcz.in:8443/htngb_backend/api/Dashboard/getDailyCollectionAsPerPunchingDate
    getAllDailyCollection(){
        return this.http.get(this.dashboard+'/getDailyCollectionAsPerPunchingDate');
    }

    // https://rooftop-uat.mpcz.in:8443/htngb_backend/api/Dashboard/getMonthlyCollectionAsPerPunchingDate
    getAllMonthlyCollection(){
        return this.http.get(this.dashboard+'/getMonthlyCollectionAsPerPunchingDate');
    }

    // https://rooftop-uat.mpcz.in:8443/htngb_backend/api/Dashboard/getArrearAboveRs5kCurrentBillMonth
    getAllArrears(){
        return this.http.get(this.dashboard+'/getArrearAboveRs5kCurrentBillMonth');
    }
    
}