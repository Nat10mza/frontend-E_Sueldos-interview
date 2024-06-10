import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  ) {
    this.form = this.formBuilder.group({
      quantity: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(data.stocks?.quantity ?? 0),
        ],
      ],
    });
  }

  ngOnInit(): void {}

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
      alert('Formulario inválido');
      return;
    }

    if (totalStock) {
      let newStockQuantity = totalStock - quantity;
      if (newStockQuantity < 0 || newStockQuantity > totalStock) {
        alert('No puedes comprar esa cantidad');
      } else {
        newStock.product = this.data._id;
        newStock.quantity = newStockQuantity;
        this.stockService.updateStock(idStock, newStock).subscribe(
          (response) => {
            alert('Compra exitosa');
            this.dialogRef.close({ quantity });
            this.refreshPage();
          },
          (error) => {
            alert('Failed');
            console.log(error);
          },
        );
      }
    }
  }
}
