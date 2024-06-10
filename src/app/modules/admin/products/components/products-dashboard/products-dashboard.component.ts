import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/models/product';
import { CreateProductFormComponent } from '../create-product-form/create-product-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
})
export class ProductsDashboardComponent implements OnInit {
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
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.dataSource = data;
        console.log(this.dataSource);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
    );
  }
  onCreateProductDialogOnClick() {
    const dialogRef = this.dialog.open(CreateProductFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.getProducts();
    });
  }
}
