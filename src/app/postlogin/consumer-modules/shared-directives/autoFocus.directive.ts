/* import { OnInit, ElementRef, Input, Directive, Renderer2 } from '@angular/core';

@Directive({ selector: '[focuMe]' })
export class AutoFocusDirective implements OnInit {

    @Input('focuMe') isFocused: boolean;

    constructor(private hostElement: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        if (this.isFocused) {
            this.renderer.selectRootElement(this.hostElement["nativeElement"]).focus();
        }
    }
} */
