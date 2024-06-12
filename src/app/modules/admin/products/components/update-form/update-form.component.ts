import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-update-product-form',
  templateUrl: './update-form.component.html',
})
export class UpdateProductFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
      name: string;
      description: string;
      image: string;
      user: string;
      price: number;
    },
    public dialogRef: MatDialogRef<UpdateProductFormComponent>,
    public productService: ProductService,
    private toastr: ToastrService,
  ) {
    // Initialize the form with validators
    this.form = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      image: [data.image, Validators.required],
      price: [data.price, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    // Optionally, reset the form to initial data on init
    this.form.reset({
      name: this.data.name,
      description: this.data.description,
      image: this.data.image,
      price: this.data.price,
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toastr.info('Complete the form.');
      return;
    }

    const product = {
      id: this.data.id,
      name: this.form.value.name || this.data.name,
      description: this.form.value.description || this.data.description,
      image: this.form.value.image || this.data.image,
      user: this.data.user, // Assuming user is not changing
      price: this.form.value.price || this.data.price,
    };

    this.productService.updateProduct(this.data.id, product).subscribe(
      (response) => {
        this.toastr.success('Producto actualizado', 'Exito!');
        this.form.reset();
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error('Mala actualización', 'Oops!');
        console.log(error);
      },
    );
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  get image() {
    return this.form.get('image');
  }

  get price() {
    return this.form.get('price');
  }
}
