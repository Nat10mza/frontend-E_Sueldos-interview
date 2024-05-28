import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(public dialogRef: MatDialogRef<LoginFormComponent>) {}

  onSubmit(f: NgForm) {
    console.log(f.value);
    this.submitted = true;
    f.reset();
    console.log(this.submitted);
    this.submitted = false;
    console.log(this.submitted);
    this.dialogRef.close();
  }
}
