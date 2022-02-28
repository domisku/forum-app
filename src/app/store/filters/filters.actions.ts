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

export const setCurrentPageAsLastPage = createAction(
  '[Filters] Set current page as last page'
);

export const incrementPage = createAction('[Filters] Increment page');

export const decrementPage = createAction('[Filters] Decrement page');

export const reset = createAction('[Filters] Reset');