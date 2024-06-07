import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListPageComponent } from './products-list-page/products-list-page.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ProductsListPageComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class ProductsModule {}
