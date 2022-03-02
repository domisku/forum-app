import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
  faAngleLeft,
  faAnglesLeft,
  faAngleRight,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { StoreService } from 'src/app/core/recources/services/store.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as FiltersActions from 'src/app/store/filters/filters.actions';

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
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(FiltersActions.getLastPage());
    this.currentPage = this.store.select((state) => state.filters.page);
    this.lastPage = this.store.select((state) => state.filters.lastPage);
    this.calculateResultsIndexes();
  }

  resetPagination() {
    this.store.dispatch(FiltersActions.getLastPage());
    this.store.dispatch(FiltersActions.updatePage({ page: 1 }));
  }

  onNavigateFirst() {
    this.store.dispatch(FiltersActions.updatePage({ page: 1 }));
    this.onPageChange.emit();
  }

  onNavigatePrev() {
    this.store.dispatch(FiltersActions.decrementPage());
    this.onPageChange.emit();
  }

  onNavigateNext() {
    this.store.dispatch(FiltersActions.incrementPage());
    this.onPageChange.emit();
  }

  onNavigateLast() {
    this.store.dispatch(FiltersActions.setCurrentPageAsLastPage());
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
