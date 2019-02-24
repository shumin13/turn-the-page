import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  querySub: Subscription;
  loading = false;
  query = '';
  form = this.fb.group({
    query: ''
  });

  constructor(
    private fb: FormBuilder,
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
        if (this.loading) {
          this.loading = false;
          this.books = searchResults;
        }
      });
    this.querySub = this.form.get('query').valueChanges.subscribe(query => {
      this.loading = true;
      this.query = query;
      this.store.dispatch(new Search(query));
    });
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
    this.querySub.unsubscribe();
  }

}
