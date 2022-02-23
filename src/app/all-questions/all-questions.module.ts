import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllQuestionsRoutingModule } from './all-questions-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AllQuestionsComponent } from './all-questions.component';
import { AllQuestionsHeaderComponent } from './all-questions-header/all-questions-header.component';

@NgModule({
  declarations: [AllQuestionsComponent, AllQuestionsHeaderComponent],
  imports: [CommonModule, AllQuestionsRoutingModule, SharedModule],
})
export class AllQuestionsModule {}
