import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { GenerateUrl } from 'src/environments/generate-url.model';


@Injectable({
  providedIn: 'root'
})

export class TranslateService implements OnDestroy {
  baseUrl: string = this.url.translateUrl;
  unsubscribe$: Subject<void> = new Subject();
  translatedWordsArray = <any>[];
  constructor(
    private http: HttpClient, private url: GenerateUrl) { }

  public engTohindiInput(wordToTranslate: string): Observable<any> {
    let params = new HttpParams().set('inString', wordToTranslate).set('lang', 'hindi');
    return this.http.get<any>(this.baseUrl, { params }).pipe(map(res => res.twords[0]['options']));;
  }

  engTohindiTrans(wordToTranslate) {
    let input = wordToTranslate.trim(); 
    let isTranstated = /[_\W0-9]/.test(input)  
    let words = input.replace(/[^a-zA-Z ]/g, "").trim(); 
    if (words.length > 0) {
      let wordToTranslate = words.split(" ").slice(-1)[0];   
      this.engTohindiInput(wordToTranslate).pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          let words = data.map((val, index) => {
            return { key: index, value: val };
          })
          if (isTranstated) {
            let translatedInput = input;
            translatedInput = translatedInput.substring(0, translatedInput.lastIndexOf(" "));  
            this.translatedWordsArray = words.map((obj) => { return Object.assign(obj, { translatedWords: translatedInput }); })  
          } else {
            this.translatedWordsArray = words

          }
        });
    }
  }

  AutoCompleteDisplay(words) {
    
    if (words.value == undefined) {
      return
    } else if (words.hasOwnProperty('translatedWords')) {
      return words.translatedWords + ' ' + words.value + ' ';
    } else if (words.value !== "") {
      return words.value + ' ';
    }
  }
  translatedWordselected() {
    
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

