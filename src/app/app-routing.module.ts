import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },

  {
    path: 'users-dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/users-dashboard/users-dashboard.module').then(
        (m) => m.UsersDashboardModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
