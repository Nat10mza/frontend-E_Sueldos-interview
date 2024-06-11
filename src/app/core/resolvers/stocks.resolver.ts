import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { StockService } from '../services/stock.service';

@Injectable({
  providedIn: 'root',
})
export class StocksResolver implements Resolve<Observable<any>> {
  constructor(private stockService: StockService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
    return this.stockService.getAllStocks();

    // .subscribe(
    //   (data: Product[]) => {
    //     this.products = data;
    //     console.log(this.products);
    //   },
    //   (error) => {
    //     console.log(error);
    //     alert(error.message);
    //   },
    // );
  }
}
