import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditQuestionRoutingModule } from './edit-question-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EditQuestionComponent } from './edit-question.component';

@NgModule({
  declarations: [EditQuestionComponent],
  imports: [CommonModule, EditQuestionRoutingModule, SharedModule],
})
export class EditQuestionModule {}
