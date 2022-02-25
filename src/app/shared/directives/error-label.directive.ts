import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appErrorLabel]',
})
export class ErrorLabelDirective {
  @Input('appErrorLabel') inputType?: string;
  @Input('message') message?: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (!this.inputType || !this.message) {
      throw new Error('You forgot to pass a message and/or input type');
    }

    const label = this.el.nativeElement;
    this.renderer.addClass(label, 'question-form__error-label');
    this.renderer.setAttribute(label, 'for', this.inputType);
    let text = this.renderer.createText(this.message);
    this.renderer.appendChild(label, text);
  }
}
