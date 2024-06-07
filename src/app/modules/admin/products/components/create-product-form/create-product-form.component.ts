import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/core/services/product.service';
import { createdProduct } from 'src/app/models/product';

@Component({
  selector: 'app-create-product-form',
  templateUrl: './create-product-form.component.html',
})
export class CreateProductFormComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
    price: new FormControl(''),
    user: new FormControl(''),
  });
  constructor(
    public dialogRef: MatDialogRef<CreateProductFormComponent>,
    public productService: ProductService,
  ) {}

  onSubmit(f: NgForm) {
    const product: createdProduct = {
      name: f.value.name,
      description: f.value.description,
      image: f.value.image,
      price: f.value.price,
      user: f.value.user,
    };
    product.user = '665d80a0c40f034ead4b2317';
    if (
      !f.value.name ||
      !f.value.description ||
      !f.value.image ||
      !f.value.price
    )
      return alert('complete the form');

    // TODO add IDUSER -----------------------------------------

    this.productService.createProduct(product).subscribe(
      (response) => {
        alert('Producto creado');
        console.log(response);
        f.reset();
        this.dialogRef.close();
      },
      (error) => {
        alert('Mala creacion');
        console.log(error);
      },
    );
  }
}
