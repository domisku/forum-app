import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllQuestionsComponent } from './all-questions/all-questions.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { NewQuestionsComponent } from './new-questions/new-questions.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/all', pathMatch: 'full' },
  { path: 'all', component: AllQuestionsComponent },
  { path: 'new', component: NewQuestionsComponent },
  { path: 'ask', component: AskQuestionComponent },
  { path: 'edit/:id', component: EditQuestionComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
