import { NgControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[disableControl]'
})
export class DisableControlDirective {

  
    @Input('disableControl') set disableControl( condition : boolean ) {
    const action = condition ? 'disable' : 'enable';
    const markAs = condition ? 'reset' : 'markAsUntouched';

    setTimeout(()=>{
      this.ngControl.control[action]();
      this.ngControl.control[markAs]();
      
    },10);
  }

  constructor( private ngControl: NgControl ) {
  }
}