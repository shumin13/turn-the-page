import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, map, mergeMap, catchError } from 'rxjs/operators';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { BookActionTypes, AddBook, AddBookSuccess, AddBookFailure } from './book.actions';
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

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private router: Router) {
    }
}
