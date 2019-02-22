import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { BookActionTypes, BookActionsUnion } from './book.actions';
import { Book } from '../book.model';

export interface BookState extends EntityState<Book> {
    booksLoaded: boolean;
    search: Book[];
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();

const initialState: BookState = adapter.getInitialState({
    booksLoaded: false,
    search: []
});

export function bookReducer(state = initialState, action: BookActionsUnion): BookState {
    switch (action.type) {
        case BookActionTypes.LOAD_BOOKS_SUCCESS: {
            return adapter.addAll(
                action.payload, {
                    ...state,
                    booksLoaded: true
                }
            );
        }
        case BookActionTypes.ADD_BOOK_SUCCESS: {
            return adapter.addOne(action.payload, state);
        }
        case BookActionTypes.DELETE_BOOK_SUCCESS: {
            return adapter.removeOne(action.payload, state);
        }
        case BookActionTypes.SEARCH_SUCCESS: {
            return {
                ...state,
                search: action.payload
            };
        }
        default:
            return state;
    }
}

export const getBooksLoaded = (state: BookState) => state.booksLoaded;

export const getSearchResults = (state: BookState) => state.search;

export const selectAllEntities = (state: BookState) => state.entities;

export const selectAllBooks = (state: BookState) => Object.values(state.entities);
