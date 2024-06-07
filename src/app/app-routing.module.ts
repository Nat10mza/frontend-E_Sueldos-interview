import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AdminGuard } from './core/guard/admin.guard';

const routes: Routes = [
  // Rutas sin guardian
  {
    path: '',
    component: HomePageComponent,
  },

  // Rutas con guardian
  {
    path: 'products',
    canActivate: [AuthGuard],
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/products/products.module').then(
        (m) => m.ProductsModule,
      ),
  },
  {
    path: '',
    canActivate: [AdminGuard],
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
