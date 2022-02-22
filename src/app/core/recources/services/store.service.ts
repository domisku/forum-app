import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  initialFilters = {
    category: '',
    sorting: 'dateCreated',
    order: 'desc',
    limit: 12,
    page: 1,
    lastPage: 1,
  };
  filters = this.initialFilters;

  constructor() {}

  resetFilters() {
    this.filters = this.initialFilters;
  }

  getParams() {
    const category = this.filters.category;
    const sorting = this.filters.sorting;
    const order = this.filters.order;
    const page = this.filters.page;
    const limit = this.filters.limit;

    return { category, sorting, order, page, limit };
  }
}
