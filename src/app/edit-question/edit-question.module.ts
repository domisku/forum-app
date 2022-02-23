import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditQuestionRoutingModule } from './edit-question-routing.module';
import { EditQuestionComponent } from './edit-question.component';

@NgModule({
  declarations: [EditQuestionComponent],
  imports: [CommonModule, EditQuestionRoutingModule],
})
export class EditQuestionModule {}
