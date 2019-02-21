import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { BookActionTypes, BookActionsUnion } from './book.actions';
import { Book } from '../book.model';

export interface BookState extends EntityState<Book> {
    booksLoaded: boolean;
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();

const initialState: BookState = adapter.getInitialState({
    booksLoaded: false
});

export function bookReducer(state = initialState, action: BookActionsUnion): BookState {
    switch (action.type) {
        case BookActionTypes.LOAD_BOOKS_SUCCESS: {
            return adapter.addAll(
                action.payload.books, {
                    ...state,
                    booksLoaded: true
                }
            );
        }
        case BookActionTypes.ADD_BOOK: {
            return adapter.addOne(action.payload.book, state);
        }
        case BookActionTypes.DELETE_BOOK: {
            return adapter.removeOne(action.payload.id, state);
        }
        default:
            return state;
    }
}

export const getBooksLoaded = (state: BookState) => state.booksLoaded;

export const selectAllEntities = (state: BookState) => state.entities;

export const selectAllBooks = (state: BookState) => Object.values(state.entities);
