import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[minNumber][formControlName],[minNumber][formControl],[minNumber][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinNumberDirective, multi: true}]
})
export class MinNumberDirective implements Validator {
  @Input()
  minNumber: number;
  validate(c: FormControl): {[key: string]: any} {
    let v = parseFloat(c.value);
      return ( v < this.minNumber)? {"minNumber": true} : null;
  }
} 