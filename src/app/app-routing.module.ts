import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },

  {
    path: 'users-dashboard',
    pathMatch: 'full',
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
