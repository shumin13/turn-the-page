import { ActionReducer, ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { Dictionary } from '@ngrx/entity';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as fromBook from '../books/store/book.reducer';
import { Book } from '../books/book.model';

export interface State {
  books: fromBook.BookState;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  books: fromBook.bookReducer,
  router: routerReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<State>): ActionReducer<State> {
  return localStorageSync({
    keys: ['books'],
    rehydrate: true
  })(reducer);
}

export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer];

export const selectBooksState = createFeatureSelector<fromBook.BookState>('books');

export const getBooksLoaded = createSelector(
  selectBooksState,
  fromBook.getBooksLoaded
);

export const selectAllEntities = createSelector(
  selectBooksState,
  fromBook.selectAllEntities
);

export const selectAllBooks = createSelector(
  selectBooksState,
  fromBook.selectAllBooks
);

export const getBookEntityById = createSelector(
  selectAllEntities,
  (entities: Dictionary<Book>, props: Dictionary<any>) => entities[props.id]
);
