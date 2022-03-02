import { ActionReducerMap } from '@ngrx/store';

import * as fromFilters from './filters/filters.reducer';
import * as fromDb from './db/db.reducer';

export interface AppState {
  filters: fromFilters.State;
  db: fromDb.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  filters: fromFilters.filtersReducer,
  db: fromDb.dbReducer,
};
