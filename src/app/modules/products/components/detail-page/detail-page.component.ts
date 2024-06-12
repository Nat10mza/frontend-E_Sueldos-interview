import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/models/product';
import { BuyFormComponent } from '../buy-form/buy-form.component';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
})
export class DetailPageComponent {
  product: Product | undefined;

  constructor(
    private _ac: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.product = this._ac.snapshot.data['product'];
  }

  buyProduct(product: Product) {
    const dialogRef = this.dialog.open(BuyFormComponent, {
      data: product,
    });
  }
}
