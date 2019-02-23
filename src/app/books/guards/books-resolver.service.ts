import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, take, filter, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Book } from '../book.model';
import { State } from '../../reducers';
import { LoadBooks, ResetServerStatus } from '../store/book.actions';

@Injectable({
  providedIn: 'root'
})
export class BooksResolverService implements Resolve<Book[]> {

  constructor(private store: Store<State>) { }

  getFromStoreOrAPI(): Observable<any> {
    return this.store.select('books').pipe(
      tap((books: any) => {
        if (books.serverDown) {
          this.store.dispatch(new ResetServerStatus());
        } else if (!books.booksLoaded) {
          this.store.dispatch(new LoadBooks());
        }
      }),
      filter((books: any) => books.serverDown || books.booksLoaded),
      take(1)
    );
  }

  resolve(): Observable<any[]> {
    return this.getFromStoreOrAPI().pipe(
      switchMap((books: any) => {
        if (books.ids.length !== 0) {
          return of(Object.values(books.entities));
        } else {
          return of([]);
        }
      })
    );
  }
}
