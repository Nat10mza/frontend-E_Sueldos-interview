import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products-list-page',
  templateUrl: './products-list-page.component.html',
  styleUrls: ['./products-list-page.component.css'],
})
export class ProductsListPageComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        console.log(this.products);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
    );
  }
  buyProduct(name: string) {
    alert(`Compra ${name}!`);
  }
  checkButton() {
    alert('Card');
  }
}
