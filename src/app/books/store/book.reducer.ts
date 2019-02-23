import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { BookActionTypes, BookActionsUnion } from './book.actions';
import { Book } from '../book.model';

export interface BookState extends EntityState<Book> {
    booksLoaded: boolean;
    serverDown: boolean;
    search: Book[];
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();

const initialState: BookState = adapter.getInitialState({
    booksLoaded: false,
    serverDown: false,
    search: []
});

export function bookReducer(state = initialState, action: BookActionsUnion): BookState {
    switch (action.type) {
        case BookActionTypes.RESET_SERVER_STATUS: {
            return {
                ...state,
                serverDown: false
            };
        }
        case BookActionTypes.LOAD_BOOKS_SUCCESS: {
            return adapter.addAll(
                action.payload, {
                    ...state,
                    booksLoaded: true
                }
            );
        }
        case BookActionTypes.LOAD_BOOKS_FAILURE: {
            return {
                ...state,
                serverDown: true
            };
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

export const getSearchResults = (state: BookState) => state.search;

export const selectAllEntities = (state: BookState) => state.entities;
