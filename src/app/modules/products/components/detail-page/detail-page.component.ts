import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
})
export class DetailPageComponent {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private _ac: ActivatedRoute,
  ) {
    this.product = this._ac.snapshot.data['product'];
  }
}
