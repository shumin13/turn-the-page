import { Action } from '@ngrx/store';
import { Book } from '../book.model';

export enum BookActionTypes {
    LOAD_BOOKS = '[Books Page] Load Books',
    LOAD_BOOKS_SUCCESS = '[Books API] Load Books Success',
    ADD_BOOK = '[Create Book Page] Add Book',
    ADD_BOOK_SUCCESS = '[Books API] Add Book Success',
    ADD_BOOK_FAILURE = '[Books API] Add Book Failure',
    DELETE_BOOK = '[Book Page] Delete Book',
    DELETE_BOOK_SUCCESS = '[Books API] Delete Book Success',
    DELETE_BOOK_FAILURE = '[Books API] Delete Book Failure',
    SEARCH = '[Books Page] Search',
    SEARCH_SUCCESS = '[Books API] Search Success',
    SEARCH_FAILURE = '[Books API] Search Failure'
}

export class LoadBooks implements Action {
    readonly type = BookActionTypes.LOAD_BOOKS;
}

export class LoadBooksSuccess implements Action {
    readonly type = BookActionTypes.LOAD_BOOKS_SUCCESS;

    constructor(public payload: Book[]) { }
}

export class AddBook implements Action {
    readonly type = BookActionTypes.ADD_BOOK;

    constructor(public payload: { title: string, authors: string, isbn: string, description: string, imageUrl: string }) { }
}

export class AddBookSuccess implements Action {
    readonly type = BookActionTypes.ADD_BOOK_SUCCESS;

    constructor(public payload: Book) { }
}

export class AddBookFailure implements Action {
    readonly type = BookActionTypes.ADD_BOOK_FAILURE;
}

export class DeleteBook implements Action {
    readonly type = BookActionTypes.DELETE_BOOK;

    constructor(public payload: number) { }
}

export class DeleteBookSuccess implements Action {
    readonly type = BookActionTypes.DELETE_BOOK_SUCCESS;

    constructor(public payload: number) { }
}

export class DeleteBookFailure implements Action {
    readonly type = BookActionTypes.DELETE_BOOK_FAILURE;
}

export class Search implements Action {
    readonly type = BookActionTypes.SEARCH;

    constructor(public payload: string) { }
}

export class SearchSuccess implements Action {
    readonly type = BookActionTypes.SEARCH_SUCCESS;

    constructor(public payload: Book[]) { }
}

export class SearchFailure implements Action {
    readonly type = BookActionTypes.SEARCH_FAILURE;
}

export type BookActionsUnion =
    LoadBooks |
    LoadBooksSuccess |
    AddBook |
    AddBookSuccess |
    AddBookFailure |
    DeleteBook |
    DeleteBookSuccess |
    DeleteBookFailure |
    Search |
    SearchSuccess |
    SearchFailure;
