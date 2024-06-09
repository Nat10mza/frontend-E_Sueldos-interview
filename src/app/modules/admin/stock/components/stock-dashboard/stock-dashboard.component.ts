import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from 'src/app/core/services/stock.service';
import { ProductWithStock } from 'src/app/models/stock';

@Component({
  selector: 'app-stock-dashboard',
  templateUrl: './stock-dashboard.component.html',
})
export class StockDashboardComponent implements OnInit {
  products: ProductWithStock[] = [];
  selectedProduct: ProductWithStock | undefined;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private stockService: StockService,
  ) {
    this.form = this.formBuilder.group({
      product: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

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

  onSubmit() {
    if (this.form.invalid) {
      alert('invalid form');
      return;
    }

    const productId = this.form.value.product.stocks._id;
    const quantity = this.form.value;

    console.log(productId, quantity);

    this.stockService.updateStock(productId, quantity).subscribe(
      (response) => {
        alert('Updated Stock');
        console.log(response);
        this.form.reset();
        this.getStocks;
      },
      (error) => {
        alert('Failed to update stock');
        console.log(error);
      },
    );
  }

  onSelectProduct(product: ProductWithStock) {
    this.selectedProduct = product;
  }
}
