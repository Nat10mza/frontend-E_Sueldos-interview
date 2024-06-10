import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AdminGuard } from './core/guard/admin.guard';
import { NotAuthorizedPageComponent } from './modules/home/not-authorized-page/not-authorized-page.component';

const NoAuthGuardRoutes: Routes = [
  // Rutas sin guardian
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedPageComponent,
  },
];

const AuthGuardRoutes: Routes = [
  // Rutas con guardian
  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/products/products.module').then(
        (m) => m.ProductsModule,
      ),
  },
  // Rutas con admin guardian
  {
    path: '',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'users-dashboard',
        loadChildren: () =>
          import('./modules/admin/users-dashboard/users-dashboard.module').then(
            (m) => m.UsersDashboardModule,
          ),
      },
      {
        path: 'products-dashboard',
        loadChildren: () =>
          import('./modules/admin/products/products.module').then(
            (m) => m.ProductsModule,
          ),
      },
      {
        path: 'stock-dashboard',
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

const routes = NoAuthGuardRoutes.concat(AuthGuardRoutes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
