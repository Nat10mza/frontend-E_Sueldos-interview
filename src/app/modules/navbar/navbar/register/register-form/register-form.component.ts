import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserStateService } from 'src/app/core/services/user-state.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegisterFormComponent>,
    public registerService: AuthService,
    private UserStateService: UserStateService,
    private toastr: ToastrService,
  ) {
    // Initialize the form with validators
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Za-z]).+$/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    // Optionally, reset the form to initial data on init
    this.form.reset({
      username: '',
      email: '',
      password: '',
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toastr.info('Complete the form.');
      return;
    }

    const user = {
      name: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.registerService.register(user).subscribe(
      (data) => {
        this.registerService.setToken(
          data.tokens.access.token,
          data.tokens.refresh.token,
          data.user.id,
        );

        this.submitted = true;
        this.form.reset();

        this.submitted = false;

        this.dialogRef.close();
        this.UserStateService.setUser(data.user);
      },

      (error) => {
        this.toastr.error('Error in registration', 'Oops!');
        console.log(error);
      },
    );
  }

  get username() {
    return this.form.get('username');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
