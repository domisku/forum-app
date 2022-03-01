import { createReducer, on } from '@ngrx/store';
import {
  updateCategory,
  updateSorting,
  updateOrder,
  updateLimit,
  updatePage,
  updateLastPage,
  reset,
  incrementPage,
  decrementPage,
  setCurrentPageAsLastPage,
  updateOrderAndSorting,
} from './filters.actions';
import Filters from 'src/app/core/recources/models/filters.model';

export const initialState: Filters = {
  category: '',
  sorting: 'dateCreated',
  order: 'desc',
  limit: 12,
  page: 1,
  lastPage: 1,
};

export const filtersReducer = createReducer(
  initialState,
  on(updateCategory, (state, action) => {
    return { ...state, category: action.category };
  }),
  on(updateOrderAndSorting, (state, action) => {
    return { ...state, sorting: action.sorting, order: action.order };
  }),
  on(updateLimit, (state, action) => {
    return { ...state, limit: action.limit };
  }),
  on(updatePage, (state, action) => {
    return { ...state, page: action.page };
  }),
  on(updateLastPage, (state, action) => {
    return { ...state, lastPage: action.lastPage };
  }),
  on(setCurrentPageAsLastPage, (state) => {
    return { ...state, page: state.lastPage };
  }),
  on(incrementPage, (state) => {
    return { ...state, page: state.page + 1 };
  }),
  on(decrementPage, (state) => {
    return { ...state, page: state.page - 1 };
  }),
  on(reset, () => {
    return { ...initialState };
  })
);
