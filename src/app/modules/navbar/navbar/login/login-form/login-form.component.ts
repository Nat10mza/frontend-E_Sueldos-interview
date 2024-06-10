import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserStateService } from 'src/app/core/services/user-state.service';
import { RegisterFormComponent } from '../../register/register-form/register-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public dialogRegister: MatDialog,
    public loginService: AuthService,
    private UserStateService: UserStateService,
    private toastr: ToastrService,
  ) {}

  openRegisterDialog() {
    this.dialogRef.close();
    this.dialogRegister.open(RegisterFormComponent);
  }

  onSubmit(f: NgForm) {
    const user = {
      email: f.value.Email,
      password: f.value.Password,
    };

    if (!f.value.Email || !f.value.Password) {
      this.toastr.info('Complete the form.');
      return;
    }

    this.loginService.login(user).subscribe(
      (data) => {
        this.loginService.setToken(
          data.tokens.access.token,
          data.tokens.refresh.token,
          data.user.id,
        );
        this.UserStateService.setUser(data.user);

        this.submitted = true;
        f.reset();
        this.submitted = false;
        this.dialogRef.close();
        this.toastr.success('Bienvenido!', 'Exito!');
      },
      (error) => {
        //TODO error handle
        this.toastr.error('Error en el login', 'Oops!');
        console.log(error);
      },
    );
  }
}
