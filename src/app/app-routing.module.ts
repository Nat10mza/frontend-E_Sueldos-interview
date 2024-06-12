import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AdminGuard } from './core/guard/admin.guard';
import { NotAuthorizedPageComponent } from './modules/home/not-authorized-page/not-authorized-page.component';
import { ProductsResolver } from './core/resolvers/products.resolver';
import { UsersResolver } from './core/resolvers/users.resolver';
import { ProductsDashboardResolver } from './core/resolvers/products-dashboard.resolver';
import { StocksResolver } from './core/resolvers/stocks.resolver';

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
    resolve: {
      products: ProductsResolver,
    },
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
        resolve: {
          users: UsersResolver,
        },
        loadChildren: () =>
          import('./modules/admin/users-dashboard/users-dashboard.module').then(
            (m) => m.UsersDashboardModule,
          ),
      },
      {
        path: 'products-dashboard',
        resolve: {
          products_d: ProductsDashboardResolver,
        },
        loadChildren: () =>
          import('./modules/admin/products/products.module').then(
            (m) => m.ProductsModule,
          ),
      },
      {
        path: 'stock-dashboard',
        resolve: {
          products: StocksResolver,
        },
        loadChildren: () =>
          import('./modules/admin/stock/stock.module').then(
            (m) => m.StockModule,
          ),
      },
    ],
  },

  // Redirección no autorizado

  {
    path: 'not-authorized',
    component: NotAuthorizedPageComponent,
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
