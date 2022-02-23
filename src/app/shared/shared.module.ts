import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ContentHeaderComponent } from './content-header/content-header.component';
import { FormComponent } from './form/form.component';
import { PaginationComponent } from './pagination/pagination.component';
import { QuestionComponent } from './question/question.component';
import { AlertComponent } from './UI/alert/alert.component';
import { LoadingSpinnerComponent } from './UI/loading-spinner/loading-spinner.component';
import { OverlayComponent } from './UI/overlay/overlay.component';
import { ScrollButtonsComponent } from './UI/scroll-buttons/scroll-buttons.component';

@NgModule({
  declarations: [
    ContentHeaderComponent,
    FormComponent,
    PaginationComponent,
    QuestionComponent,
    AlertComponent,
    LoadingSpinnerComponent,
    OverlayComponent,
    ScrollButtonsComponent,
  ],
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  exports: [
    ContentHeaderComponent,
    FormComponent,
    PaginationComponent,
    QuestionComponent,
    AlertComponent,
    LoadingSpinnerComponent,
    OverlayComponent,
    ScrollButtonsComponent,
  ],
})
export class SharedModule {}
