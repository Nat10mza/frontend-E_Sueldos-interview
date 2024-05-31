import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersDashboardRoutingModule } from './users-dashboard-routing.module';
import { UsersDashboardPageComponent } from './users-dashboard-page/users-dashboard-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [UsersDashboardPageComponent, UserCreationComponent],
  imports: [
    CommonModule,
    UsersDashboardRoutingModule,
    MatSidenavModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
  ],
})
export class UsersDashboardModule {}
