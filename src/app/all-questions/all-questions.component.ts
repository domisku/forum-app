import { Component, OnInit, ViewChild } from '@angular/core';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';

import Question from '../core/recources/models/question.model';
import User from '../core/recources/models/user.model';
import { QuestionsService } from '../core/recources/services/questions.service';
import { UsersService } from '../core/recources/services/users.service';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { ScrollService } from '../core/recources/services/scroll.service';
import Filters from '../core/recources/models/filters.model';
import { reset } from '../store/filters/filters.actions';

@UntilDestroy()
@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss'],
})
export class AllQuestionsComponent implements OnInit {
  questions: Question[] | null = null;
  authors: User[] | null = null;

  @ViewChild(PaginationComponent, { static: false })
  private paginationComponent?: PaginationComponent;

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

  filterChanged() {
    this.clearCurrentData();
    this.resetPagination();
    this.setQuestions();
  }

  pageChanged() {
    this.clearCurrentData();
    this.scrollService.scrollToPageTop();
    this.setQuestions();
  }

  private clearCurrentData() {
    this.questions = null;
    this.authors = null;
  }

  private resetPagination() {
    this.paginationComponent?.resetPagination();
  }

  private setQuestions() {
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
