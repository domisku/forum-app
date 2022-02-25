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
  isError = false;
  timeoutId?: NodeJS.Timeout;
  formActionSubject = new Subject<void>();

  constructor(private questionsService: QuestionsService) {}

  showAlert(message: string, isError?: boolean) {
    this.handleOldAlert();

    this.alertMessage = message;
    this.alertIsShown = true;

    if (isError) {
      this.isError = true;
    } else {
      this.isError = false;
      this.timeoutId = setTimeout(() => (this.alertIsShown = false), 4000);
    }
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

  private handleOldAlert() {
    if (this.alertIsShown) {
      this.alertIsShown = false;
      clearTimeout(this.timeoutId!);
    }
  }
}
