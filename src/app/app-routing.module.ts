import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  // Rutas sin guardian
  {
    path: '',
    component: HomePageComponent,
  },

  // Rutas con guardian
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users-dashboard',
        pathMatch: 'full',
        loadChildren: () =>
          import('./modules/admin/users-dashboard/users-dashboard.module').then(
            (m) => m.UsersDashboardModule,
          ),
      },
      {
        path: 'products-dashboard',
        pathMatch: 'full',
        loadChildren: () =>
          import('./modules/admin/products/products.module').then(
            (m) => m.ProductsModule,
          ),
      },
      {
        path: 'stock-dashboard',
        pathMatch: 'full',
        loadChildren: () =>
          import('./modules/admin/stock/stock.module').then(
            (m) => m.StockModule,
          ),
      },
      {
        path: 'products',
        pathMatch: 'full',
        loadChildren: () =>
          import('./modules/products/products.module').then(
            (m) => m.ProductsModule,
          ),
      },
    ],
  },

  // Redirección por defecto
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
