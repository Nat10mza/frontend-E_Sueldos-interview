import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterLoginService } from 'src/app/core/services/register-login.service';

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
    public loginService: RegisterLoginService,
    public router: Router,
  ) {}

  onSubmit(f: NgForm) {
    const user = {
      email: f.value.Email,
      password: f.value.Password,
    };

    if (!f.value.Email || !f.value.Password) return alert('complete the form');

    this.loginService.login(user).subscribe(
      (data) => {
        this.loginService.setToken(data.tokens);
        console.log(data);
        this.submitted = true;
        f.reset();
        this.submitted = false;
        this.dialogRef.close();
        this.router.navigateByUrl('/users-dashboard');
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
