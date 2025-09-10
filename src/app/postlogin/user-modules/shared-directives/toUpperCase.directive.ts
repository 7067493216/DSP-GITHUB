import { Directive, ElementRef, HostListener  } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[upperCase]'
})
export class ToUpperCaseDirective {

  constructor(private el: ElementRef, private control: NgControl) {
  }

  @HostListener('input', ['$event']) onEvent($event) {
    const str: string = this.control.value;
    this.control.control.setValue(str.toUpperCase());
  }
}

