import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-category',
  templateUrl: './books-category.component.html',
  styleUrls: ['./books-category.component.css']
})
export class BooksCategoryComponent {
  constructor(private router: Router) {
 }
 
 /** This method call while click on book category button */
  public onClickOfCategory(booksCategory: string): void {
    this.router.navigate([`/books/list/${booksCategory}`]);
  }
}
