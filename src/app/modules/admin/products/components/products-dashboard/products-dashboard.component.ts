import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
})
export class ProductsDashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    // 'id',
    'price',
    'description',
    'image',
    'actions',
  ];
  dataSource: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.dataSource = data;
        console.log(this.dataSource);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
    );
  }
}
