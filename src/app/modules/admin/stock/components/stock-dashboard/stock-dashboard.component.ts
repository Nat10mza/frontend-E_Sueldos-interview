import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router,
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

  onSelectProduct(product: ProductWithStock) {
    this.selectedProduct = product;
  }

  refreshPage() {
    window.location.reload();
  }

  onSubmit() {
    if (this.form.invalid) {
      alert('Formulario inválido');
      return;
    }

    const formValue = this.form.value;
    const product = formValue.product;

    if (!product) {
      alert('Producto no seleccionado');
      return;
    }

    const stocks = product.stocks;

    if (!stocks) {
      this.stockService.createStock(formValue).subscribe(
        (response) => {
          alert('Stock creado');
          console.log('Response:', response);
          this.form.reset();
          this.refreshPage();
        },
        (error) => {
          alert('Falló la creación del stock');
          console.log(error);
        },
      );
      return;
    }

    const productId = stocks._id;

    if (!productId) {
      alert('Falta el ID del stock');
      return;
    }

    this.stockService.updateStock(productId, formValue).subscribe(
      (response) => {
        alert('Stock actualizado');
        console.log('Response:', response);
        this.form.reset();
        this.refreshPage();
      },
      (error) => {
        alert('Falló la actualización del stock');
        console.log(error);
      },
    );
  }
}
