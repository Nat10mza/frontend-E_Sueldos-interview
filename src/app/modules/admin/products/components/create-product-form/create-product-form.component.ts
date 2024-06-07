import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/core/services/product.service';
import { UserStateService } from 'src/app/core/services/user-state.service';
import { createdProduct } from 'src/app/models/product';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-create-product-form',
  templateUrl: './create-product-form.component.html',
})
export class CreateProductFormComponent {
  user: User | null = null;

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
    private UserStateService: UserStateService,
  ) {}

  onSubmit(f: NgForm) {
    const product: createdProduct = {
      name: f.value.name,
      description: f.value.description,
      image: f.value.image,
      price: f.value.price,
      user: f.value.user,
    };

    this.UserStateService.user$.subscribe((user) => {
      this.user = user;
    });

    if (this.user === null) return alert('Error en la creación de producto');
    product.user = this.user.id;

    if (
      !f.value.name ||
      !f.value.description ||
      !f.value.image ||
      !f.value.price
    )
      return alert('complete the form');

    this.productService.createProduct(product).subscribe(
      (response) => {
        alert('Producto creado');
        console.log(response);
        f.reset();
        this.dialogRef.close();
      },
      (error) => {
        alert('Mala creación');
        console.log(error);
      },
    );
  }
}
