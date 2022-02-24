import { Component, OnInit } from '@angular/core';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

import Question from '../core/recources/models/question.model';
import User from '../core/recources/models/user.model';
import { QuestionsService } from '../core/recources/services/questions.service';
import { StoreService } from '../core/recources/services/store.service';
import { UsersService } from '../core/recources/services/users.service';
import scrollTo from '../core/utils/scroll-to';

@UntilDestroy()
@Component({
  selector: 'app-new-questions',
  templateUrl: './new-questions.component.html',
  styleUrls: ['./new-questions.component.scss'],
})
export class NewQuestionsComponent implements OnInit {
  questions?: Question[];
  authors?: User[];
  loading = false;

  constructor(
    private questionsService: QuestionsService,
    private usersService: UsersService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.storeService.resetFilters();
    this.setQuestions();
  }

  pageChanged() {
    this.loading = true;
    scrollTo(0);
    this.authors = undefined;
    this.setQuestions();
  }

  private setQuestions() {
    this.storeService.filters.limit = 2;
    let params = this.storeService.getParams();

    this.questionsService
      .get(params)
      .pipe(untilDestroyed(this))
      .subscribe((questions) => {
        this.questions = questions;
        this.setAuthors();
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
        this.loading = false;
      });
  }
}
