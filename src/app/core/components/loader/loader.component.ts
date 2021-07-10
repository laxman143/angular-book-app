import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  public loading: any;

  /** Obserbable for stop subscribing subscriptions */
  public destroy: Subject<boolean>;
  constructor(private loaderService: LoaderService) {
    this.destroy = new Subject<boolean>();
    this.loaderService.isLoading.pipe(takeUntil(this.destroy)).subscribe((loading) => {
      this.loading = loading;
    });
  }
  /** on destroy */
  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

}
