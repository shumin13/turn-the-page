import { ActionReducer, ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as fromBook from '../books/store/book.reducer';

export interface State {
  books: fromBook.BookState;
}

export const reducers: ActionReducerMap<State> = {
  books: fromBook.bookReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<State>): ActionReducer<State> {
  return localStorageSync({
    keys: ['books']
  })(reducer);
}

export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer];

export const selectBooksState = createFeatureSelector<fromBook.BookState>('books');

export const getBooksLoaded = createSelector(
  selectBooksState,
  fromBook.getBooksLoaded
);

export const selectAllBooks = createSelector(
  selectBooksState,
  fromBook.selectAllBooks
);
