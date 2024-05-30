import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterLoginService } from 'src/app/core/services/register-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<RegisterFormComponent>,
    public registerService: RegisterLoginService,
    public router: Router,
  ) {}

  onSubmit(f: NgForm) {
    const user = {
      name: f.value.Username,
      email: f.value.Email,
      password: f.value.Password,
    };

    if (!f.value.Username || !f.value.Email || !f.value.Password)
      return alert('complete the form');

    this.registerService.register(user).subscribe(
      (data) => {
        console.log(data);
        this.registerService.setToken(data.tokens);
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
