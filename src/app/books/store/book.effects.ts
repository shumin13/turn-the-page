import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { BookActionTypes } from './book.actions';
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
                payload: { books: books }
            };
        })
    );

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient) {
    }
}
