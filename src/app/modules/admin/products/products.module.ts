import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductsDashboardComponent } from './components/products-dashboard/products-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ProductsPageComponent, ProductsDashboardComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatIconModule,
    MatTableModule,
    MatSidenavModule,
    MatButtonModule,
  ],
})
export class ProductsModule {}
