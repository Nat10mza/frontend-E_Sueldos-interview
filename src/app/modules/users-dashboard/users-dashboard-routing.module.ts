import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersDashboardPageComponent } from './users-dashboard-page/users-dashboard-page.component';

const routes: Routes = [
  {
    path: '',
    component: UsersDashboardPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersDashboardRoutingModule {}
