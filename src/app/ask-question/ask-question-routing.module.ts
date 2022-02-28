import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate.guard';
import { AskQuestionComponent } from './ask-question.component';

const routes: Routes = [
  {
    path: '',
    component: AskQuestionComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AskQuestionRoutingModule {}
