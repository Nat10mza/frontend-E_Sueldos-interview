import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListPageComponent } from './products-list-page/products-list-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailPageComponent } from './components/detail-page/detail-page.component';
import { BuyFormComponent } from './components/buy-form/buy-form.component';

@NgModule({
  declarations: [
    ProductsListPageComponent,
    BuyFormComponent,
    DetailPageComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class ProductsModule {}
