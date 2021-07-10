import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  public isLoading = new BehaviorSubject(false);

  constructor() { }
  /** This method used for showing loader */
  public showLoader() {
    this.isLoading.next(true);
  }

  /** This method use for hide loader */
  public hideLoader() {
    this.isLoading.next(false);
  }
}
