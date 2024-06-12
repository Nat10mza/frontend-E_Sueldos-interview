import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/core/services/product.service';
import { UserStateService } from 'src/app/core/services/user-state.service';
import { createdProduct } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product-form',
  templateUrl: './create-product-form.component.html',
})
export class CreateProductFormComponent implements OnInit {
  user: User | null = null;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateProductFormComponent>,
    public productService: ProductService,
    private UserStateService: UserStateService,
    private toastr: ToastrService,
  ) {
    // Initialize the form with validators
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      user: [''],
    });
  }

  ngOnInit(): void {
    // Optionally, reset the form to initial data on init
    this.form.reset({
      name: '',
      description: '',
      image: '',
      price: '',
      user: '',
    });

    this.UserStateService.user$.subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.form.patchValue({ user: this.user.id });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toastr.info('Complete the form.');
      return;
    }

    const product: createdProduct = {
      name: this.form.value.name,
      description: this.form.value.description,
      image: this.form.value.image,
      price: this.form.value.price,
      user: this.form.value.user,
    };

    if (this.user === null) {
      this.toastr.error('Error en la creación de producto', 'Oops!');
      return;
    }

    this.productService.createProduct(product).subscribe(
      (response) => {
        this.toastr.success('Producto Creado', 'Exito!');
        console.log(response);
        this.form.reset();
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error('Error al crear!', 'Oops!');
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
