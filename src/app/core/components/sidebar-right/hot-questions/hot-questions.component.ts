import { Component, OnInit } from '@angular/core';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import Db from 'src/app/core/recources/models/db.model';
import { Store } from '@ngrx/store';

import { QuestionWithAuthor } from 'src/app/core/recources/models/question-with-author.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hot-questions',
  templateUrl: './hot-questions.component.html',
  styleUrls: ['./hot-questions.component.scss'],
})
export class HotQuestionsComponent implements OnInit {
  hotQuestions?: Observable<QuestionWithAuthor[] | null> | null = null;

  constructor(private store: Store<{ db: Db }>) {}

  ngOnInit(): void {
    this.hotQuestions = this.store.select((store) => store.db.hotQuestions);
  }
}
