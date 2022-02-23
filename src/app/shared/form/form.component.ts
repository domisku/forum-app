import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  authorNameFocused = false;
  @ViewChild('form') form?: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form);
  }
}
