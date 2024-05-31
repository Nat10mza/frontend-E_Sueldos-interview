import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterLoginService } from 'src/app/core/services/register-login.service';
import { UserService } from 'src/app/core/services/user.service';
import { RegisterFormComponent } from '../../register/register-form/register-form.component';

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
    public loginService: RegisterLoginService,
    private userService: UserService,
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

    if (!f.value.Email || !f.value.Password) return alert('complete the form');

    this.loginService.login(user).subscribe(
      (data) => {
        this.loginService.setToken(
          data.tokens.access.token,
          data.tokens.refresh.token,
          data.user.id,
        );
        this.userService.setUser(data.user);

        this.submitted = true;
        f.reset();
        this.submitted = false;
        this.dialogRef.close();
      },
      (error) => {
        //TODO error handle
        console.log(error);
      },
    );
  }
}
