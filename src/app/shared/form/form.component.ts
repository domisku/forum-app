import {
  Component,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import FormData from 'src/app/core/recources/models/form-data.model';

@Directive({
  selector: '[appInput]',
})
export class InputDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('focus') onFocus() {
    const inputLabel = this.el.nativeElement.nextSibling;
    this.renderer.addClass(inputLabel, 'question-form__label--was-focused');
  }
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input('primaryBtnText') primaryBtnText?: string;
  @Input('secondaryBtnText') secondaryBtnText?: string;
  @Output() onFormSubmit = new EventEmitter<FormData>();
  @Output() onSecondaryBtnAction = new EventEmitter<FormGroup>();

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(140),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(4000),
    ]),
    date: new FormGroup({
      year: new FormControl('', [
        Validators.required,
        Validators.min(1970),
        Validators.max(new Date().getFullYear()),
      ]),
      month: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(12),
      ]),
      day: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(31),
      ]),
    }),
    category: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
    ]),
    tags: new FormControl('', Validators.pattern(/^[\w\s,]*$/)),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.onFormSubmit.emit(this.form.value);
  }

  onSecondaryBtnClick() {
    this.onSecondaryBtnAction.emit(this.form);
  }
}
