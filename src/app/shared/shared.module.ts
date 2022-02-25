import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ContentHeaderComponent } from './components/content-header/content-header.component';
import { FormComponent } from './components/form/form.component';
import { InputDirective } from './directives/input.directive';
import { ErrorLabelDirective } from './directives/error-label.directive';
import { PaginationComponent } from './components/pagination/pagination.component';
import { QuestionComponent } from './components/question/question.component';
import { AlertComponent } from './components/UI/alert/alert.component';
import { LoadingSpinnerComponent } from './components/UI/loading-spinner/loading-spinner.component';
import { ScrollButtonsComponent } from './components/UI/scroll-buttons/scroll-buttons.component';

@NgModule({
  declarations: [
    ContentHeaderComponent,
    FormComponent,
    PaginationComponent,
    QuestionComponent,
    AlertComponent,
    LoadingSpinnerComponent,
    ScrollButtonsComponent,
    InputDirective,
    ErrorLabelDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [
    ContentHeaderComponent,
    FormComponent,
    PaginationComponent,
    QuestionComponent,
    AlertComponent,
    LoadingSpinnerComponent,
    ScrollButtonsComponent,
    InputDirective,
    ErrorLabelDirective,
  ],
})
export class SharedModule {}
