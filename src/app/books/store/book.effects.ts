import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, map, mergeMap, catchError, debounceTime } from 'rxjs/operators';
import { Effect, Actions, ofType } from '@ngrx/effects';

import {
    BookActionTypes,
    AddBook, AddBookSuccess,
    AddBookFailure,
    DeleteBook,
    DeleteBookSuccess,
    DeleteBookFailure,
    Search,
    SearchSuccess,
    SearchFailure
} from './book.actions';
import { Book } from '../book.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookEffects {

    @Effect()
    loadBooks$ = this.actions$.pipe(
        ofType(BookActionTypes.LOAD_BOOKS),
        switchMap(() => {
            return this.httpClient.get<Book[]>(environment.apiUrl);
        }),
        map(books => {
            return {
                type: BookActionTypes.LOAD_BOOKS_SUCCESS,
                payload: books
            };
        })
    );

    @Effect()
    addBook$ = this.actions$.pipe(
        ofType<AddBook>(BookActionTypes.ADD_BOOK),
        map(action => action.payload),
        mergeMap(book => {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            };
            return this.httpClient.post<Book>(environment.apiUrl, book, httpOptions).pipe(
                map(newBook => {
                    this.router.navigate(['/']);
                    return new AddBookSuccess(newBook);
                }),
                catchError(error => {
                    this.router.navigate(['/error', { status: error.status }]);
                    return of(new AddBookFailure());
                })
            );
        })
    );

    @Effect()
    deleteBook$ = this.actions$.pipe(
        ofType<DeleteBook>(BookActionTypes.DELETE_BOOK),
        map(action => action.payload),
        mergeMap(id => {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            };
            return this.httpClient.delete<Book>(`${environment.apiUrl}/${id}`, httpOptions).pipe(
                map(() => {
                    this.router.navigate(['/']);
                    return new DeleteBookSuccess(id);
                }),
                catchError(error => {
                    this.router.navigate(['/error', { status: error.status }]);
                    return of(new DeleteBookFailure());
                })
            );
        })
    );

    @Effect()
    search$ = this.actions$.pipe(
        ofType<Search>(BookActionTypes.SEARCH),
        debounceTime(400),
        map(action => action.payload),
        switchMap(query => {
            return this.httpClient.get<Book>(`${environment.apiUrl}?q=${query}`).pipe(
                map((books: Book[]) => new SearchSuccess(books)),
                catchError(error => {
                    this.router.navigate(['/error', { status: error.status }]);
                    return of(new SearchFailure());
                })
            );
        })
    );

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private router: Router) {
    }
}
