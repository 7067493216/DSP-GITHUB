import { Directive, ElementRef, HostListener  } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[lowerCase]'
})
export class ToLowerCaseDirective {

  constructor(private el: ElementRef, private control: NgControl) {
  }

  @HostListener('input', ['$event']) onEvent($event) {
    const str: string = this.control.value;
    this.control.control.setValue(str.toLowerCase());
  }
}

