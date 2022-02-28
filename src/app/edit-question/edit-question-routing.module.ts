import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditQuestionComponent } from './edit-question.component';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: EditQuestionComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditQuestionRoutingModule {}
