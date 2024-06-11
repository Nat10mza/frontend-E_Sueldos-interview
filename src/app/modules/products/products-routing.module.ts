import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListPageComponent } from './products-list-page/products-list-page.component';
import { DetailPageComponent } from './components/detail-page/detail-page.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { ProductResolver } from 'src/app/core/resolvers/product.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductsListPageComponent,
  },
  {
    path: 'detail/:id',
    canActivate: [AuthGuard],
    component: DetailPageComponent,
    resolve: {
      product: ProductResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
