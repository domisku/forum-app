import { Component, OnInit, ViewChild } from '@angular/core';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import Question from '../core/recources/models/question.model';
import User from '../core/recources/models/user.model';
import { QuestionsService } from '../core/recources/services/questions.service';
import { UsersService } from '../core/recources/services/users.service';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { ScrollService } from '../core/recources/services/scroll.service';
import Filters from '../core/recources/models/filters.model';
import { getLastPage, reset } from '../store/filters/filters.actions';
import Db from '../core/recources/models/db.model';
import { QuestionWithAuthor } from '../core/recources/models/question-with-author.model';
import { getQuestionsWithAuthors } from '../store/db/db.actions';

@UntilDestroy()
@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss'],
})
export class AllQuestionsComponent implements OnInit {
  questions?: Observable<QuestionWithAuthor[] | null>;

  @ViewChild(PaginationComponent, { static: false })
  private paginationComponent?: PaginationComponent;

  constructor(
    private scrollService: ScrollService,
    private store: Store<{ filters: Filters; db: Db }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(reset());
    this.store.dispatch(getQuestionsWithAuthors());
    this.questions = this.store.select((store) => {
      return store.db.questionsWithAuthors;
    });
  }

  filterChanged() {
    this.resetPagination();
    this.store.dispatch(getQuestionsWithAuthors());
    this.store.dispatch(getLastPage());
  }

  pageChanged() {
    this.scrollService.scrollToPageTop();
    this.store.dispatch(getQuestionsWithAuthors());
  }

  private resetPagination() {
    this.paginationComponent?.resetPagination();
  }
}
