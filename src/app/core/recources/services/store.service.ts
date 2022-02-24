import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { QuestionsService } from './questions.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  filters = {
    category: '',
    sorting: 'dateCreated',
    order: 'desc',
    limit: 12,
    page: 1,
    lastPage: 1,
  };
  alertIsShown = false;
  alertMessage = '';
  timeoutId?: NodeJS.Timeout;
  formActionSubject = new Subject<void>();

  constructor(private questionsService: QuestionsService) {}

  showAlert(message: string) {
    if (this.alertIsShown) {
      this.alertIsShown = false;
      clearTimeout(this.timeoutId!);
    }

    this.alertMessage = message;
    this.alertIsShown = true;
    this.timeoutId = setTimeout(() => (this.alertIsShown = false), 3000);
  }

  resetFilters() {
    this.filters = {
      category: '',
      sorting: 'dateCreated',
      order: 'desc',
      limit: 12,
      page: 1,
      lastPage: 1,
    };
  }

  getParams() {
    const category = this.filters.category;
    const sorting = this.filters.sorting;
    const order = this.filters.order;
    const page = this.filters.page;
    const limit = this.filters.limit;

    return { category, sorting, order, page, limit };
  }

  setLastPage() {
    const regex = /.+rel="next".*page=(.+)&/;
    let linkHeader: string | null;

    this.questionsService
      .getWithHeaders(this.getParams())
      .subscribe((response) => {
        linkHeader = response.headers.get('Link');
        const lastPageMatch = linkHeader?.match(regex);

        if (lastPageMatch) {
          this.filters.lastPage = +lastPageMatch[1];
        } else {
          this.filters.lastPage = 1;
        }
      });
  }
}
