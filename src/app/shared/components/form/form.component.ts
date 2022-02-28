import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import FormData from 'src/app/core/recources/models/form-data.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form!: FormGroup;

  @Input('primaryBtnText') primaryBtnText?: string;
  @Input('secondaryBtnText') secondaryBtnText?: string;
  @Input('initialFormData') init?: FormData;

  @Output() onFormSubmit = new EventEmitter<FormData>();
  @Output() onSecondaryBtnAction = new EventEmitter<FormGroup>();

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.init?.name || '', [
        Validators.required,
        Validators.maxLength(40),
      ]),
      title: new FormControl(this.init?.title || '', [
        Validators.required,
        Validators.maxLength(140),
      ]),
      description: new FormControl(this.init?.description || '', [
        Validators.required,
        Validators.maxLength(4000),
      ]),
      date: new FormGroup({
        year: new FormControl(this.init?.date.year || '', [
          Validators.required,
          Validators.min(1970),
          Validators.max(new Date().getFullYear()),
        ]),
        month: new FormControl(this.init?.date.month || '', [
          Validators.required,
          Validators.min(1),
          Validators.max(12),
        ]),
        day: new FormControl(this.init?.date.day || '', [
          Validators.required,
          Validators.min(1),
          Validators.max(31),
        ]),
      }),
      category: new FormControl(this.init?.category || '', [
        Validators.required,
        Validators.maxLength(40),
      ]),
      tags: new FormControl(
        this.init?.tags || '',
        Validators.pattern(/^[\w\s,]*$/)
      ),
    });
  }

  onSubmit() {
    this.onFormSubmit.emit(this.form.value);
  }

  onSecondaryBtnClick() {
    this.onSecondaryBtnAction.emit(this.form);
  }
}
