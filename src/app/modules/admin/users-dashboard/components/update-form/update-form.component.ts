import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/core/services/crud.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
})
export class UpdateFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: string; name: string; email: string },
    public dialogRef: MatDialogRef<UpdateFormComponent>,
    public crudService: CrudService,
    private toastr: ToastrService,
  ) {
    // Initialize the form with validators
    this.form = this.fb.group({
      username: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
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
      username: this.data.name,
      email: this.data.email,
      password: '',
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toastr.info('Complete the form.');
      return;
    }

    const user = {
      name: this.form.value.username || this.data.name,
      email: this.form.value.email || this.data.email,
      password: this.form.value.password,
    };

    this.crudService.updateUser(this.data.id, user).subscribe(
      (response) => {
        this.toastr.success('Usuario actualizado', 'Exito!');
        this.form.reset();
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error('Mala actualización', 'Oops!');
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
