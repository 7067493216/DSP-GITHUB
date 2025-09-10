import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[maxNumber][formControlName],[maxNumber][formControl],[maxNumber][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxNumberDirective, multi: true}]
})
export class MaxNumberDirective implements Validator {
  @Input()
  maxNumber: number; 
  validate(c: FormControl): {[key: string]: any} {
    let v:number = parseFloat(c.value);
      return ( v > this.maxNumber)? {"maxNumber": true} : null;
  }
} 