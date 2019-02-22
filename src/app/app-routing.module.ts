import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './books/books.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookNewComponent } from './books/book-new/book-new.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookResolverService } from './books/guards/book-resolver.service';
import { BooksResolverService } from './books/guards/books-resolver.service';
import { ErrorPageComponent } from './error-page/error-page.component';

const appRoutes: Routes = [
  {
    path: 'books', component: BooksComponent, children: [
      {
        path: '',
        component: BookListComponent,
        resolve: {
          books: BooksResolverService
        }
      },
      {
        path: 'new',
        component: BookNewComponent
      },
      {
        path: ':id',
        component: BookDetailComponent,
        resolve: { book: BookResolverService }
      }
    ]
  },
  { path: 'error', component: ErrorPageComponent },
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
