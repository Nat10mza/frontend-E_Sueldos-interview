import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
})
export class DetailPageComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    // Obtener el ID del producto de los parámetros de la ruta
    const expectedId = this.route.snapshot.paramMap.get('id');

    // Llamar al servicio ProductService para obtener el producto por su ID
    if (expectedId) {
      this.productService.getProductID(expectedId).subscribe(
        (product: Product) => {
          this.product = product;
          console.log(this.product);
        },
        (error) => {
          console.error('Error al recuperar el producto:', error);
        },
      );
    }
  }
}
