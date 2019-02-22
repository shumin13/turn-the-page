import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { State } from './../../reducers/index';
import { AddBook } from './../store/book.actions';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.scss']
})
export class BookNewComponent implements OnInit {

  form = this.fb.group({
    title: ['', Validators.required],
    isbn: ['', Validators.required],
    authors: ['', Validators.required],
    imageUrl: ['', [Validators.required, Validators.pattern(/\.(?:jpg|gif|png)$/)]],
    description: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<State>
  ) { }

  ngOnInit() { }

  get title() {
    return this.form.get('title');
  }

  get isbn() {
    return this.form.get('isbn');
  }

  get authors() {
    return this.form.get('authors');
  }

  get imageUrl() {
    return this.form.get('imageUrl');
  }

  get description() {
    return this.form.get('description');
  }

  onSubmit() {
    this.store.dispatch(new AddBook(this.form.value));
  }
}
