import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class SharedDataService {

  private messageSource = new BehaviorSubject<any>('');
  getData = this.messageSource.asObservable();

  constructor() { }

  pushData(message: any) {
    this.messageSource.next(message);
  }

}

