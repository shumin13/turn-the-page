import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { Book } from '../book.model';
import { State, getBookEntityById } from '../../reducers';

@Injectable({
    providedIn: 'root'
})
export class BookResolverService implements Resolve<Book> {

    constructor(private store: Store<State>) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.store.pipe(
            select(getBookEntityById, { id: route.params['id'] }),
            take(1)
        );
    }
}
