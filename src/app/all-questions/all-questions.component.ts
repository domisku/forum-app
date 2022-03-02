import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { ScrollService } from '../core/recources/services/scroll.service';
import { QuestionWithAuthor } from '../core/recources/models/question-with-author.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as FiltersActions from 'src/app/store/filters/filters.actions';
import * as DbActions from 'src/app/store/db/db.actions';

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
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(FiltersActions.reset());
    this.store.dispatch(DbActions.getQuestionsWithAuthors());
    this.questions = this.store.select((store) => {
      return store.db.questionsWithAuthors;
    });
  }

  filterChanged() {
    this.resetPagination();
    this.store.dispatch(DbActions.getQuestionsWithAuthors());
    this.store.dispatch(FiltersActions.getLastPage());
  }

  pageChanged() {
    this.scrollService.scrollToPageTop();
    this.store.dispatch(DbActions.getQuestionsWithAuthors());
  }

  private resetPagination() {
    this.paginationComponent?.resetPagination();
  }
}
