import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.scss']
})
export class BookNewComponent implements OnInit {

  bookForm = this.fb.group({
    title: ['', Validators.required],
    isbn: ['', Validators.required],
    authors: ['', Validators.required],
    imageUrl: ['', [Validators.required, Validators.pattern(/\.(?:jpg|gif|png)$/)]],
    description: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() { }

  get title() {
    return this.bookForm.get('title');
  }

  get isbn() {
    return this.bookForm.get('isbn');
  }

  get authors() {
    return this.bookForm.get('authors');
  }

  get imageUrl() {
    return this.bookForm.get('imageUrl');
  }

  get description() {
    return this.bookForm.get('description');
  }

  onSubmit() {
    console.log(this.bookForm.value);
  }
}
