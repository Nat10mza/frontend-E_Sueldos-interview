import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StockService } from 'src/app/core/services/stock.service';
import { Product } from 'src/app/models/product';
import { createdStock } from 'src/app/models/stock';

@Component({
  selector: 'app-buy-form',
  templateUrl: './buy-form.component.html',
})
export class BuyFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    public dialogRef: MatDialogRef<BuyFormComponent>,
    private stockService: StockService,
    private toastr: ToastrService,
  ) {
    // Initialize the form with validators
    this.form = this.formBuilder.group({
      quantity: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(data.stocks?.quantity ?? 0),
        ],
      ],
    });
  }

  ngOnInit(): void {
    // Reset the form with default values if needed
    this.form.reset({
      quantity: '',
    });
  }

  refreshPage() {
    window.location.reload();
  }

  onSubmit() {
    const quantity = this.form.value.quantity;
    const totalStock = this.data.stocks?.quantity;
    const idStock = this.data.stocks?._id;
    const newStock: createdStock = {
      product: '',
      quantity: 0,
    };

    if (this.form.invalid) {
      this.toastr.warning('Formulario inválido.');
      return;
    }

    if (totalStock !== undefined && totalStock !== null) {
      let newStockQuantity = totalStock - quantity;
      if (newStockQuantity < 0 || newStockQuantity > totalStock) {
        this.toastr.info('No puedes comprar esa cantidad.');
        return;
      } else {
        newStock.product = this.data._id;
        newStock.quantity = newStockQuantity;
        this.stockService.updateStock(idStock, newStock).subscribe(
          (response) => {
            this.toastr.success('Compra exitosa');
            this.dialogRef.close({ quantity });
            this.refreshPage();
          },
          (error) => {
            this.toastr.error('Failed', 'Oops!');
            console.log(error);
          },
        );
      }
    }
  }

  get quantity() {
    return this.form.get('quantity');
  }
}
