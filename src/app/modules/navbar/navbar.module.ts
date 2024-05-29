import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from 'src/app/modules/navbar/navbar/register/register.component';
import { LoginComponent } from 'src/app/modules/navbar/navbar/login/login.component';
import { LoginFormComponent } from 'src/app/modules/navbar/navbar/login/login-form/login-form.component';
import { RegisterFormComponent } from 'src/app/modules/navbar/navbar/register/register-form/register-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [NavbarComponent],
})
export class NavbarModule {}
