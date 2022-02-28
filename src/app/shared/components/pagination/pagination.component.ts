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
  incrementPage,
  setCurrentPageAsLastPage,
  updatePage,
} from 'src/app/store/filters/filters.actions';

@UntilDestroy()
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  currentPage?: Observable<number>;
  lastPage?: Observable<number>;
  resultsFrom?: number;
  resultsTo?: number;

  faAngleLeft = faAngleLeft;
  faAnglesLeft = faAnglesLeft;
  faAngleRight = faAngleRight;
  faAnglesRight = faAnglesRight;

  @Input('resultsCount') resultsCount!: number;
  @Output() onPageChange = new EventEmitter();

  constructor(
    public storeService: StoreService,
    private store: Store<{ filters: Filters }>
  ) {}

  ngOnInit(): void {
    this.currentPage = this.store.select((state) => state.filters.page);
    this.lastPage = this.store.select((state) => state.filters.lastPage);
    this.storeService.setLastPage();
    this.calculateResultsIndexes();
  }

  resetPagination() {
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
    this.store
      .select('filters')
      .pipe(untilDestroyed(this))
      .subscribe((filters) => {
        const limit = filters.limit;
        const currentPage = filters.page;

        this.resultsFrom = currentPage * limit - limit + 1;
        this.resultsTo = this.resultsFrom + this.resultsCount - 1;
      });
  }
}
