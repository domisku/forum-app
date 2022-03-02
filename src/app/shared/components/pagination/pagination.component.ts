import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
  faAngleLeft,
  faAnglesLeft,
  faAngleRight,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import Filters from 'src/app/core/recources/models/filters.model';
import { StoreService } from 'src/app/core/recources/services/store.service';
import {
  decrementPage,
  getLastPage,
  incrementPage,
  setCurrentPageAsLastPage,
  updatePage,
} from 'src/app/store/filters/filters.actions';
import { getQuestionsWithAuthors } from 'src/app/store/db/db.actions';
import Db from 'src/app/core/recources/models/db.model';

@UntilDestroy()
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  currentPage?: Observable<number>;
  lastPage?: Observable<number>;
  resultsFrom?: Observable<number>;
  resultsTo?: Observable<number>;

  faAngleLeft = faAngleLeft;
  faAnglesLeft = faAnglesLeft;
  faAngleRight = faAngleRight;
  faAnglesRight = faAnglesRight;

  @Input('resultsCount') resultsCount?: number | null;
  @Output() onPageChange = new EventEmitter();

  constructor(
    public storeService: StoreService,
    private store: Store<{ filters: Filters; db: Db }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getLastPage());
    this.currentPage = this.store.select((state) => state.filters.page);
    this.lastPage = this.store.select((state) => state.filters.lastPage);
    this.calculateResultsIndexes();
  }

  resetPagination() {
    this.store.dispatch(getLastPage());
    this.store.dispatch(updatePage({ page: 1 }));
  }

  onNavigateFirst() {
    this.store.dispatch(updatePage({ page: 1 }));
    this.onPageChange.emit();
  }

  onNavigatePrev() {
    this.store.dispatch(decrementPage());
    this.onPageChange.emit();
  }

  onNavigateNext() {
    this.store.dispatch(incrementPage());
    this.onPageChange.emit();
  }

  onNavigateLast() {
    this.store.dispatch(setCurrentPageAsLastPage());
    this.onPageChange.emit();
  }

  private calculateResultsIndexes() {
    this.resultsFrom = this.store.select((store) => {
      const limit = store.filters.limit;
      const currentPage = store.filters.page;

      return currentPage * limit - limit + 1;
    });

    this.resultsTo = this.store.select((store) => {
      const limit = store.filters.limit;
      const currentPage = store.filters.page;
      const results = store.db.questionsWithAuthors;

      let resultsCount;
      if (results === null) {
        resultsCount = 12;
      } else {
        resultsCount = results.length;
      }

      const resultsFrom = currentPage * limit - limit + 1;

      return resultsFrom + resultsCount - 1;
    });
  }
}
