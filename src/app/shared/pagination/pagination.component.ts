import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
  faAngleLeft,
  faAnglesLeft,
  faAngleRight,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';
import { StoreService } from 'src/app/core/recources/services/store.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  currentPage?: number;
  resultsFrom?: number;
  resultsTo?: number;

  faAngleLeft = faAngleLeft;
  faAnglesLeft = faAnglesLeft;
  faAngleRight = faAngleRight;
  faAnglesRight = faAnglesRight;

  @Input('resultsCount') resultsCount!: number;
  @Output() onPageChange = new EventEmitter();

  constructor(public storeService: StoreService) {}

  ngOnInit(): void {
    this.currentPage = this.storeService.filters.page;
    this.storeService.setLastPage();
    this.calculateResultsIndexes();
  }

  resetPagination() {
    this.storeService.filters.page = 1;
    this.updatePageNum();
    this.storeService.setLastPage();
  }

  updatePageNum() {
    this.currentPage = this.storeService.filters.page;
  }

  onNavigateFirst() {
    this.storeService.filters.page = 1;
    this.updatePageNum();
    this.onPageChange.emit();
  }

  onNavigatePrev() {
    this.storeService.filters.page--;
    this.updatePageNum();
    this.onPageChange.emit();
  }

  onNavigateNext() {
    this.storeService.filters.page++;
    this.updatePageNum();
    this.onPageChange.emit();
  }

  onNavigateLast() {
    this.storeService.filters.page = this.storeService.filters.lastPage;
    this.updatePageNum();
    this.onPageChange.emit();
  }

  calculateResultsIndexes() {
    const limit = this.storeService.filters.limit;
    const currentPage = this.storeService.filters.page;

    this.resultsFrom = currentPage * limit - limit + 1;
    this.resultsTo = this.resultsFrom + this.resultsCount - 1;
  }
}
