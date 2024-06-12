import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserStateService } from 'src/app/core/services/user-state.service';
import { RegisterFormComponent } from '../../register/register-form/register-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public dialogRegister: MatDialog,
    public loginService: AuthService,
    private userStateService: UserStateService,
    private toastr: ToastrService,
  ) {
    // Initialize the form with validators
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Optionally, reset the form to ensure it's empty on init
    this.form.reset({
      email: '',
      password: '',
    });
  }

  openRegisterDialog() {
    this.dialogRef.close();
    this.dialogRegister.open(RegisterFormComponent);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toastr.info('Complete the form.');
      return;
    }

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.loginService.login(user).subscribe(
      (data) => {
        this.loginService.setToken(
          data.tokens.access.token,
          data.tokens.refresh.token,
          data.user.id,
        );
        this.userStateService.setUser(data.user);

        this.submitted = true;
        this.form.reset();
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

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
