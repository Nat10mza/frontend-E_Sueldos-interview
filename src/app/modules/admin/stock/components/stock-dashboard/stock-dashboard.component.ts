import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StockService } from 'src/app/core/services/stock.service';
import { ProductWithStock } from 'src/app/models/stock';

@Component({
  selector: 'app-stock-dashboard',
  templateUrl: './stock-dashboard.component.html',
})
export class StockDashboardComponent {
  products: ProductWithStock[] = [];
  selectedProduct: ProductWithStock | undefined;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private stockService: StockService,
    private toastr: ToastrService,
    private _ac: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      product: ['', Validators.required],
      quantity: ['', Validators.required],
    });

    this.products = this._ac.snapshot.data['products'];
  }

  // ngOnInit(): void {
  //   this.getStocks();
  // }

  // getStocks() {
  //   this.stockService.getAllStocks().subscribe(
  //     (data: ProductWithStock[]) => {
  //       this.products = data;
  //     },
  //     (error) => {
  //       console.log(error);
  //       this.toastr.error(error.message, 'Oops!');
  //     },
  //   );
  // }

  onSelectProduct(product: ProductWithStock) {
    this.selectedProduct = product;
  }

  refreshPage() {
    window.location.reload();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toastr.error('Formulario inválido', 'Oops!');

      return;
    }

    const formValue = this.form.value;
    const product = formValue.product;

    if (!product) {
      this.toastr.error('Producto no seleccionado', 'Oops!');
      return;
    }

    const stocks = product.stocks;

    if (!stocks) {
      this.stockService.createStock(formValue).subscribe(
        (response) => {
          this.toastr.success('Stock creado', 'Exito!');
          this.form.reset();
          this.refreshPage();
        },
        (error) => {
          this.toastr.error('Falló la creación del stock', 'Oops!');
          console.log(error);
        },
      );
      return;
    }

    const productId = stocks._id;

    if (!productId) {
      this.toastr.info('Falta el ID del stock');
      return;
    }

    this.stockService.updateStock(productId, formValue).subscribe(
      (response) => {
        this.toastr.success('Stock actualizado', 'Exito!');
        console.log('Response:', response);
        this.form.reset();
        this.refreshPage();
      },
      (error) => {
        this.toastr.error('Falló la actualización del stock', 'Oops!');
        console.log(error);
      },
    );
  }
}
