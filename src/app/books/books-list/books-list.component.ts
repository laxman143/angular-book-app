import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import {  debounceTime, distinctUntilChanged, takeUntil} from "rxjs/operators";

import { BooksService } from '../service/books.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})

export class BooksListComponent implements OnInit {
  @ViewChild("search", { static: true }) search: ElementRef;
  public bookList: any[];
  public bookCategoryName: string;
  public searchString: string;
  public throttle: number;
  public scrollDistance: number;
  public scrollUpDistance:number;
  private pageNo: number;
 /** Obserbable for stop subscribing subscriptions */
 private destroy: Subject<boolean>;

  constructor(private bookService: BooksService,private loaderService:LoaderService,private router: Router, public activateRouter: ActivatedRoute) {
    this.bookCategoryName = "";
    this.bookList = [];
    this.pageNo = 1;
    this.searchString = "";
    this.throttle = 150;
    this.scrollDistance = 1;
    this.scrollUpDistance = 3;
    this.destroy = new Subject<boolean>();
  }

  ngOnInit(): void {
    this.bookCategoryName =  this.activateRouter.snapshot.params.categoryName;
    this.bookCategoryName = this.bookCategoryName.charAt(0).toUpperCase() + this.bookCategoryName.slice(1);
    this.getBooks(this.pageNo);

    /**Below code use for the filter on search text  */
      fromEvent(this.search.nativeElement, 'keyup').pipe(
        debounceTime(1000),
        distinctUntilChanged()
      ).pipe(takeUntil(this.destroy)).subscribe((search: any) => {
        this.bookList = [];
        this.pageNo = 1;
        this.searchString = search.target.value
        this.getBooks(this.pageNo);
      })
  }

  /** This method used for get books from the api with filter and based on the topic */
  public getBooks(pageNo: number): void {
    this.loaderService.showLoader();
    this.bookService.getBooks(pageNo, this.bookCategoryName,this.searchString).pipe(takeUntil(this.destroy)).subscribe((response: any) => {
      this.bookList = [...this.bookList,...response.results]
      this.loaderService.hideLoader();
    },(error)=> {
      console.log("something went wrong")
    })
  }


 /** This method will on scroll down */
  public onScrollDown(): void {
    this.pageNo = this.pageNo + 1;
    this.getBooks(this.pageNo)
  }

  /** This method for clear search box on close icon */
  public clearSearchBox(): void {
    this.search.nativeElement.value="";
    this.bookList = [];
    this.searchString = "";
    this.pageNo =  1;
    this.getBooks(this.pageNo)
  }


  /** This method used for navigate to book category page */
  public onClickBackBookCategory(): void {
    this.router.navigate([`./books`]);
  }

/** This method used for open document */
  public onClickDocumentOpen(book: any): void {
    var bookFormat = book.formats;
    if ("text/plain; charset=utf-8" in bookFormat) {
      window.open(bookFormat["text/plain; charset=utf-8"], "_blank");
    } else if ("application/pdf" in bookFormat) {
      window.open(bookFormat["application/pdf"], "_blank");
    } else if ("text/html; charset=utf-8" in bookFormat) {
      window.open(bookFormat["text/plain; charset=utf-8"], "_blank");
    } else {
      alert("No viewable version available")
    }
  }

  /** This Method is used for destory memory while page is destroy */
  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
}
  
}
