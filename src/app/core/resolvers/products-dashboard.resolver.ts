import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsDashboardResolver implements Resolve<Observable<any>> {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
    return this.productService.getAllProducts();

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
