import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksCategoryComponent } from './books-category/books-category.component';
import { BooksListComponent } from './books-list/books-list.component';

const routes: Routes = [
  {
    path:"",
    component: BooksCategoryComponent
  },
  {
    path: "list/:categoryName",
    component: BooksListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
