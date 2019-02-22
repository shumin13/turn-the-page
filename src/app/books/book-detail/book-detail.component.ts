import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from './../../reducers/index';
import { DeleteBook } from './../store/book.actions';
import { Book } from './../book.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  book: Book;

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { book: Book }) => {
        this.book = data.book;
      });
  }

  deleteBook() {
    this.store.dispatch(new DeleteBook(this.book.id));
  }

}
