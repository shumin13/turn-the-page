import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { Book } from '../book.model';
import { State, getBookEntityById } from '../../reducers';

@Injectable({
    providedIn: 'root'
})
export class BookResolverService implements Resolve<Book> {

    constructor(
        private store: Store<State>,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.store.pipe(
            select(getBookEntityById, { id: route.params['id'] }),
            take(1),
            map(book => {
                if (book) {
                    return book;
                } else {
                    this.router.navigate(['/']);
                    return EMPTY;
                }
            })
        );
    }
}
