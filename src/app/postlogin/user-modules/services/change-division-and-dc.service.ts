import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeDivisionAndDcService {

  private selectedDCSource = new BehaviorSubject<string | null>(null);

  selectedDC$ = this.selectedDCSource.asObservable();

  private selectedDivisionSource = new BehaviorSubject<string | null>(null);

  selectedDivision$ = this.selectedDivisionSource.asObservable();


}
