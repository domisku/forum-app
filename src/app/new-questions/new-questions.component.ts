import { Component, OnInit } from '@angular/core';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';

import Question from '../core/recources/models/question.model';
import User from '../core/recources/models/user.model';
import { QuestionsService } from '../core/recources/services/questions.service';
import { UsersService } from '../core/recources/services/users.service';
import { ScrollService } from '../core/recources/services/scroll.service';
import Filters from '../core/recources/models/filters.model';
import { reset, updateLimit } from '../store/filters/filters.actions';

@UntilDestroy()
@Component({
  selector: 'app-new-questions',
  templateUrl: './new-questions.component.html',
  styleUrls: ['./new-questions.component.scss'],
})
export class NewQuestionsComponent implements OnInit {
  questions?: Question[];
  authors?: User[];

  constructor(
    private questionsService: QuestionsService,
    private usersService: UsersService,
    private scrollService: ScrollService,
    private store: Store<{ filters: Filters }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(reset());
    this.setQuestions();
  }

  pageChanged() {
    this.scrollService.scrollToPageTop();
    this.authors = undefined;
    this.setQuestions();
  }

  private setQuestions() {
    this.store.dispatch(updateLimit({ limit: 2 }));
    this.store
      .select('filters')
      .pipe(untilDestroyed(this))
      .subscribe((filters) => {
        this.questionsService
          .get(filters)
          .pipe(untilDestroyed(this))
          .subscribe((questions) => {
            this.questions = questions;
            this.setAuthors();
          });
      });
  }

  private setAuthors() {
    this.usersService
      .get()
      .pipe(untilDestroyed(this))
      .subscribe((users) => {
        this.authors = this.questions!.map((question) => {
          return users.find((user) => user.id === question.userId) as User;
        });
      });
  }
}
