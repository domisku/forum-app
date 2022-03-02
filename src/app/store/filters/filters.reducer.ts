import { createReducer, on } from '@ngrx/store';
import * as FiltersActions from './filters.actions';
import Filters from 'src/app/core/recources/models/filters.model';

export type State = Filters;

export const initialState: State = {
  category: '',
  sorting: 'dateCreated',
  order: 'desc',
  limit: 12,
  page: 1,
  lastPage: 1,
};

export const filtersReducer = createReducer(
  initialState,
  on(FiltersActions.updateCategory, (state, action) => {
    return { ...state, category: action.category };
  }),
  on(FiltersActions.updateOrderAndSorting, (state, action) => {
    return { ...state, sorting: action.sorting, order: action.order };
  }),
  on(FiltersActions.updateLimit, (state, action) => {
    return { ...state, limit: action.limit };
  }),
  on(FiltersActions.updatePage, (state, action) => {
    return { ...state, page: action.page };
  }),
  on(FiltersActions.setCurrentPageAsLastPage, (state) => {
    return { ...state, page: state.lastPage };
  }),
  on(FiltersActions.incrementPage, (state) => {
    return { ...state, page: state.page + 1 };
  }),
  on(FiltersActions.decrementPage, (state) => {
    return { ...state, page: state.page - 1 };
  }),
  on(FiltersActions.reset, () => {
    return { ...initialState };
  }),
  on(FiltersActions.getLastPage, (state) => {
    return { ...state };
  }),
  on(FiltersActions.getLastPageComplete, (state, action) => {
    return { ...state, lastPage: action.lastPage };
  })
);
