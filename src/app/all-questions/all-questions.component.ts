import { Component, OnInit, ViewChild } from '@angular/core';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

import Question from '../core/recources/models/question.model';
import User from '../core/recources/models/user.model';
import { QuestionsService } from '../core/recources/services/questions.service';
import { StoreService } from '../core/recources/services/store.service';
import { UsersService } from '../core/recources/services/users.service';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { ScrollService } from '../core/recources/services/scroll.service';

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
    public storeService: StoreService,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    this.storeService.resetFilters();
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
      });
  }
}
