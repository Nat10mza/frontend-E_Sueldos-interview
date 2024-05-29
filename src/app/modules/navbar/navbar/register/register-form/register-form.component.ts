import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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

  constructor(public dialogRef: MatDialogRef<RegisterFormComponent>) {}

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
