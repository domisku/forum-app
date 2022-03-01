import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { withLatestFrom } from 'rxjs';
import { QuestionsService } from 'src/app/core/recources/services/questions.service';
import * as fromActions from './filters.actions';
import Filters from 'src/app/core/recources/models/filters.model';
import { Store } from '@ngrx/store';

@Injectable()
export class FiltersEffects {
  getLastPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getLastPage.type),
      withLatestFrom(this.store.select('filters')),
      mergeMap((filters) =>
        this.questionsService.getWithHeaders(filters[1]).pipe(
          map((response) => {
            const regex = /.+rel="next".*page=(.+)&/;
            let linkHeader: string | null;

            linkHeader = response.headers.get('Link');
            const lastPageMatch = linkHeader?.match(regex);

            let lastPage: number;
            if (lastPageMatch) {
              lastPage = +lastPageMatch[1];
            } else {
              lastPage = 1;
            }

            return {
              type: fromActions.getLastPageComplete.type,
              lastPage: lastPage,
            };
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<{ filters: Filters }>,
    private questionsService: QuestionsService
  ) {}
}
