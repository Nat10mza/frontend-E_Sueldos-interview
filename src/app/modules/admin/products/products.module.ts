import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsPageComponent } from './products-page/products-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CreateProductFormComponent } from './components/create-product-form/create-product-form.component';
import { ProductsDashboardComponent } from './components/products-dashboard/products-dashboard.component';

@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductsDashboardComponent,
    CreateProductFormComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatIconModule,
    MatTableModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class ProductsModule {}
