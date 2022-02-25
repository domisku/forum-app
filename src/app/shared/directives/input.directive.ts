import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';

import FormData from 'src/app/core/recources/models/form-data.model';

@Directive({
  selector: '[appInput]',
})
export class InputDirective {
  @Input('appInput') initialFormData?: FormData;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.initialFormData) {
      this.moveLabelOut();
    }
  }

  @HostListener('focus') onFocus() {
    this.moveLabelOut();
  }

  private moveLabelOut() {
    const inputLabel = this.el.nativeElement.nextSibling;
    this.renderer.addClass(inputLabel, 'question-form__label--was-focused');
  }
}
