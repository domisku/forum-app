import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/all', pathMatch: 'full' },
  {
    path: 'all',
    loadChildren: () =>
      import('./all-questions/all-questions.module').then(
        (m) => m.AllQuestionsModule
      ),
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./new-questions/new-questions.module').then(
        (m) => m.NewQuestionsModule
      ),
  },
  {
    path: 'ask',
    loadChildren: () =>
      import('./ask-question/ask-question.module').then(
        (m) => m.AskQuestionModule
      ),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./edit-question/edit-question.module').then(
        (m) => m.EditQuestionModule
      ),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
