import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<Observable<any>> {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
    const expectedId = route.paramMap.get('id');

    if (expectedId) {
      return this.productService.getProductID(expectedId);
    }

    return of('Error');
  }
}
