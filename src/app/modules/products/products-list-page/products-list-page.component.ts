import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/core/services/product.service';
import { StockService } from 'src/app/core/services/stock.service';
import { Product } from 'src/app/models/product';
import { BuyFormComponent } from '../components/buy-form/buy-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-list-page',
  templateUrl: './products-list-page.component.html',
})
export class ProductsListPageComponent {
  products: Product[] = [];

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private _ac: ActivatedRoute,
  ) {
    this.products = this._ac.snapshot.data['products'];
  }

  buyProduct(product: Product) {
    const dialogRef = this.dialog.open(BuyFormComponent, {
      data: product,
    });

    // dialogRef.afterClosed().subscribe(() => {
    //   this.getUsers();
    // });
  }
}
