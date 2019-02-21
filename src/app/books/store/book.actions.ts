import { Action } from '@ngrx/store';
import { Book } from '../book.model';

export enum BookActionTypes {
    LOAD_BOOKS = '[Books Page] Load Books',
    LOAD_BOOKS_SUCCESS = '[Books API] Load Books Success',
    ADD_BOOK = '[Create Book Page] Add Book',
    DELETE_BOOK = '[Book Page] Delete Book'
}

export class LoadBooks implements Action {
    readonly type = BookActionTypes.LOAD_BOOKS;
}

export class LoadBooksSuccess implements Action {
    readonly type = BookActionTypes.LOAD_BOOKS_SUCCESS;

    constructor(public payload: { books: Book[] }) { }
}

export class AddBook implements Action {
    readonly type = BookActionTypes.ADD_BOOK;

    constructor(public payload: { book: Book }) { }
}

export class DeleteBook implements Action {
    readonly type = BookActionTypes.DELETE_BOOK;

    constructor(public payload: { id: string }) { }
}

export type BookActionsUnion =
    LoadBooks |
    LoadBooksSuccess |
    AddBook |
    DeleteBook;
