import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { QuestionWithAuthor } from 'src/app/core/recources/models/question-with-author.model';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-hot-questions',
  templateUrl: './hot-questions.component.html',
  styleUrls: ['./hot-questions.component.scss'],
})
export class HotQuestionsComponent implements OnInit {
  hotQuestions?: Observable<QuestionWithAuthor[] | null> | null = null;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.hotQuestions = this.store.select((store) => store.db.hotQuestions);
  }
}
