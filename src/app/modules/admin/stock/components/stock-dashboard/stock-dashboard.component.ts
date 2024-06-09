import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { StockService } from 'src/app/core/services/stock.service';
import { ProductID_Name } from 'src/app/models/product';
import { ProductWithStock, Stock } from 'src/app/models/stock';

@Component({
  selector: 'app-stock-dashboard',
  templateUrl: './stock-dashboard.component.html',
})
export class StockDashboardComponent implements OnInit {
  products: ProductWithStock[] = [];
  selectedProduct: ProductWithStock = {
    name: '',
    description: '',
    image: '',
    user: '',
    price: 0,
    id: '',
  };

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.getStocks();
  }

  getStocks() {
    this.stockService.getAllStocks().subscribe(
      (data: ProductWithStock[]) => {
        this.products = data;
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
    );
  }

  onSelectProduct(product: any): void {
    this.selectedProduct = product;
  }
}
