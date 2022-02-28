import { createAction, props } from '@ngrx/store';

export const updateCategory = createAction(
  '[Filters] Update category',
  props<{ category: string }>()
);

export const updateSorting = createAction(
  '[Filters] Update sorting',
  props<{ sorting: string }>()
);

export const updateOrder = createAction(
  '[Filters] Update order',
  props<{ order: string }>()
);

export const updateLimit = createAction(
  '[Filters] Update limit',
  props<{ limit: number }>()
);

export const updatePage = createAction(
  '[Filters] Update page',
  props<{ page: number }>()
);

export const updateLastPage = createAction(
  '[Filters] Update last page',
  props<{ lastPage: number }>()
);
