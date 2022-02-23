import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AskQuestionRoutingModule } from './ask-question-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AskQuestionComponent } from './ask-question.component';

@NgModule({
  declarations: [AskQuestionComponent],
  imports: [CommonModule, AskQuestionRoutingModule, SharedModule],
})
export class AskQuestionModule {}
