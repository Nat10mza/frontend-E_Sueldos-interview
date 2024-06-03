import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersDashboardRoutingModule } from './users-dashboard-routing.module';
import { UsersDashboardPageComponent } from './users-dashboard-page/users-dashboard-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsersDashboardComponent } from './users-dashboard/users-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { UpdateFormComponent } from './update-form/update-form.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';

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
    FormsModule,
    MatInputModule,
  ],
})
export class UsersDashboardModule {}
