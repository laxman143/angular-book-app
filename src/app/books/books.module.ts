import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { BooksRoutingModule } from './books-routing.module';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksCategoryComponent } from './books-category/books-category.component';


@NgModule({
  declarations: [
    BooksListComponent,
    BooksCategoryComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    InfiniteScrollModule 
  ]
})
export class BooksModule { }
