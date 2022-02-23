import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewQuestionsRoutingModule } from './new-questions-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NewQuestionsComponent } from './new-questions.component';

@NgModule({
  declarations: [NewQuestionsComponent],
  imports: [CommonModule, NewQuestionsRoutingModule, SharedModule],
})
export class NewQuestionsModule {}
