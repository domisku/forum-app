import { Component, OnInit } from '@angular/core';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import Question from '../core/recources/models/question.model';
import User from '../core/recources/models/user.model';
import { QuestionsService } from '../core/recources/services/questions.service';
import { UsersService } from '../core/recources/services/users.service';
import { ScrollService } from '../core/recources/services/scroll.service';
import Filters from '../core/recources/models/filters.model';
import { reset, updateLimit } from '../store/filters/filters.actions';
import Db from '../core/recources/models/db.model';
import { QuestionWithAuthor } from '../core/recources/models/question-with-author.model';
import { getQuestionsWithAuthors } from '../store/db/db.actions';

@UntilDestroy()
@Component({
  selector: 'app-new-questions',
  templateUrl: './new-questions.component.html',
  styleUrls: ['./new-questions.component.scss'],
})
export class NewQuestionsComponent implements OnInit {
  questions?: Observable<QuestionWithAuthor[] | null>;

  constructor(
    private scrollService: ScrollService,
    private store: Store<{ filters: Filters; db: Db }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(reset());
    this.store.dispatch(updateLimit({ limit: 2 }));
    this.questions = this.store.select(
      (store) => store.db.questionsWithAuthors
    );
    this.store.dispatch(getQuestionsWithAuthors());
  }

  pageChanged() {
    this.scrollService.scrollToPageTop();
    this.store.dispatch(getQuestionsWithAuthors());
  }
}
