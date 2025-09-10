import { Directive } from '@angular/core';
import { monthPickerProviders } from '../shared-modules/month-picker-provider';



@Directive({
  selector: '[dateFormat]',
  providers: [monthPickerProviders]
})
export class DateFormate {

  constructor() {
  }
}


