import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersDashboardRoutingModule } from './users-dashboard-routing.module';
import { UsersDashboardPageComponent } from './users-dashboard-page/users-dashboard-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsersDashboardComponent } from './components/users-dashboard/users-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateUserFormComponent } from './components/create-user-form/create-user-form.component';

@NgModule({
  declarations: [
    UsersDashboardPageComponent,
    UsersDashboardComponent,
    UpdateFormComponent,
    CreateUserFormComponent,
  ],
  imports: [
    CommonModule,
    UsersDashboardRoutingModule,
    MatSidenavModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
})
export class UsersDashboardModule {}
