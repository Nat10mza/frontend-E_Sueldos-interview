import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockPageComponent } from './stock-page/stock-page.component';
import { StockDashboardComponent } from './components/stock-dashboard/stock-dashboard.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [StockPageComponent, StockDashboardComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class StockModule {}
