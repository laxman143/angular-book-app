import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObservableLike, Observable } from 'rxjs';

@Injectable({
  providedIn: "any"
})
export class BooksService {

  constructor(private httpService: HttpClient) { }

  /** This method use for retriving books */
  public getBooks(pageNo:number,topic:string,search:string): Observable<any> {
    let URL: string = `http://skunkworks.ignitesol.com:8000/books?page=${pageNo}&topic=${topic}`;
    if(search) {
      URL = URL + `&search=${search}`
    } 
    return this.httpService.get(URL)   
  }
}
