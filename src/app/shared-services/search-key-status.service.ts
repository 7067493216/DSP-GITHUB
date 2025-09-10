import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class SearchKeyStatusService {

  private messageSource = new BehaviorSubject<string>(null);
  getData = this.messageSource.asObservable();

  constructor() { }

  pushData(message: string) {
    this.messageSource.next(message);
  }

}

