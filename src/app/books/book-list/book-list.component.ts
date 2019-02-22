import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { State, getSearchResults } from './../../reducers/index';
import { Search } from './../store/book.actions';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[] = [];
  searchSub: Subscription;
  searching = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { books: Book[] }) => {
        this.books = data.books;
      });
    this.searchSub = this.store.pipe(select(getSearchResults))
      .subscribe((searchResults) => {
        if (this.searching) {
          this.books = searchResults;
        }
      });
  }

  search(query: string) {
    this.searching = true;
    this.store.dispatch(new Search(query));
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
  }

}
