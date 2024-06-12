import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/models/product';
import { CreateProductFormComponent } from '../create-product-form/create-product-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
})
export class ProductsDashboardComponent {
  displayedColumns: string[] = [
    'name',
    // 'id',
    'price',
    'description',
    'image',
    'actions',
  ];
  dataSource: Product[] = [];

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _ac: ActivatedRoute,
  ) {
    this.dataSource = this._ac.snapshot.data['products_d'];
    console.log(this._ac.snapshot.data['products_d']);
  }

  // ngOnInit(): void {
  //   this.getProducts();
  // }
  getProducts() {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.dataSource = data;
        console.log(this.dataSource);
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.message, 'Oops!');
      },
    );
  }

  onCreateProductDialogOnClick() {
    const dialogRef = this.dialog.open(CreateProductFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.getProducts();
    });
  }

  deleteOnClick(id: string) {
    this.productService.deleteProduct(id).subscribe(
      (response) => {
        this.toastr.info('El producto se elimino con éxito', 'Info');
        this.getProducts();
      },
      (error) => {
        this.toastr.error('Error al eliminar producto', 'Oops!');
        console.error(error);
      },
    );
  }
}
