import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, take, filter, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Book } from './book.model';
import { State } from '../reducers';
import { LoadBooks } from './store/book.actions';

@Injectable({
  providedIn: 'root'
})
export class BookResolverService implements Resolve<Book[]> {

  constructor(private store: Store<State>) { }

  getFromStoreOrAPI(): Observable<any> {
    return this.store.select('books').pipe(
      tap((books: any) => {
        if (!books.booksLoaded) {
          this.store.dispatch(new LoadBooks());
        }
      }),
      filter((books: any) => books.ids.length),
      take(1)
    );
  }

  resolve(): Observable<any[]> {
    return this.getFromStoreOrAPI().pipe(
      switchMap((books: any) => {
        return of(Object.values(books.entities));
      }),
      catchError(() => of([]))
    );
  }
}
