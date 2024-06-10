import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/core/services/product.service';
import { StockService } from 'src/app/core/services/stock.service';
import { Product } from 'src/app/models/product';
import { BuyFormComponent } from '../components/buy-form/buy-form.component';

@Component({
  selector: 'app-products-list-page',
  templateUrl: './products-list-page.component.html',
})
export class ProductsListPageComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private stockService: StockService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.stockService.getAllStocks().subscribe(
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
  buyProduct(product: Product) {
    const dialogRef = this.dialog.open(BuyFormComponent, {
      data: product,
    });

    // dialogRef.afterClosed().subscribe(() => {
    //   this.getUsers();
    // });
  }
  checkButton() {
    alert(`Card!`);
  }
}
