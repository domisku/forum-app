import { Injectable } from '@angular/core';
import { Subject, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import Filters from '../models/filters.model';
import { QuestionsService } from './questions.service';
import { updateLastPage } from 'src/app/store/filters/filters.actions';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  alertIsShown = false;
  alertMessage = '';
  isError = false;
  timeoutId?: NodeJS.Timeout;
  formActionSubject = new Subject<void>();

  constructor(
    private questionsService: QuestionsService,
    private store: Store<{ filters: Filters }>
  ) {}

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

  setLastPage() {
    this.store
      .select('filters')
      .pipe(take(1), untilDestroyed(this))
      .subscribe((filters) => {
        this.getLastPage(filters);
      });
  }

  private getLastPage(filters: Filters) {
    const regex = /.+rel="next".*page=(.+)&/;
    let linkHeader: string | null;

    this.questionsService
      .getWithHeaders(filters)
      .pipe(untilDestroyed(this))
      .subscribe((response) => {
        linkHeader = response.headers.get('Link');
        const lastPageMatch = linkHeader?.match(regex);

        let lastPage: number;
        if (lastPageMatch) {
          lastPage = +lastPageMatch[1];
        } else {
          lastPage = 1;
        }

        this.store.dispatch(updateLastPage({ lastPage }));
      });
  }

  private handleOldAlert() {
    if (this.alertIsShown) {
      this.alertIsShown = false;
      clearTimeout(this.timeoutId!);
    }
  }
}
