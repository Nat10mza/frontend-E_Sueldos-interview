import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
})
export class DetailPageComponent implements OnInit {
  product: Product | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Recuperar el producto del estado de la ruta
    this.product = history.state.product;
    console.log(this.product);
  }
}
