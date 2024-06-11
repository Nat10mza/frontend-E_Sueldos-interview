import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserStateService } from 'src/app/core/services/user-state.service';

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
    public registerService: AuthService,
    private UserStateService: UserStateService,
    private toastr: ToastrService,
  ) {}

  onSubmit(f: NgForm) {
    const user = {
      name: f.value.Username,
      email: f.value.Email,
      password: f.value.Password,
    };

    if (!f.value.Username || !f.value.Email || !f.value.Password) {
      this.toastr.info('Just some information for you.');
      return;
    }

    this.registerService.register(user).subscribe(
      (data) => {
        this.registerService.setToken(
          data.tokens.access.token,
          data.tokens.refresh.token,
          data.user.id,
        );

        this.submitted = true;
        f.reset();

        this.submitted = false;

        this.dialogRef.close();
        this.UserStateService.setUser(data.user);
      },

      (error) => {
        console.log(error);
      },
    );
  }
}
