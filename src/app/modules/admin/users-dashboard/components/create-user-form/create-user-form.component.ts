import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CrudService } from 'src/app/core/services/crud.service';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
})
export class CreateUserFormComponent {
  roles: Role[] = [
    { value: 'user', viewValue: 'User' },
    { value: 'admin', viewValue: 'Admin' },
  ];
  form: FormGroup = new FormGroup({
    Username: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(''),
    Role: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<CreateUserFormComponent>,
    public crudService: CrudService,
  ) {}

  onSubmit(f: NgForm) {
    const user = {
      name: f.value.username,
      email: f.value.email,
      password: f.value.password,
      role: f.value.role,
    };

    if (
      !f.value.username ||
      !f.value.email ||
      !f.value.password ||
      !f.value.role
    )
      return alert('complete the form');

    this.crudService.createUser(user).subscribe(
      (response) => {
        alert('Usuario actualizado');
        console.log(response);
        f.reset();
        this.dialogRef.close();
      },
      (error) => {
        alert('Mala actualización');
        console.log(error);
      },
    );
  }
}
