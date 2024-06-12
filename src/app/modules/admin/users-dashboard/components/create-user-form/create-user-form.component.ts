import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/core/services/crud.service';
import { atLeastOneLetterValidator } from 'src/app/core/validators/custom.validators';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
})
export class CreateUserFormComponent implements OnInit {
  roles: Role[] = [
    { value: 'user', viewValue: 'User' },
    { value: 'admin', viewValue: 'Admin' },
  ];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateUserFormComponent>,
    public crudService: CrudService,
    private toastr: ToastrService,
  ) {
    this.form = this.fb.group({
      Username: ['', [Validators.required, Validators.minLength(3)]],
      Email: ['', [Validators.required, Validators.email]],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          atLeastOneLetterValidator(),
        ],
      ],
      Role: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.form.reset({
      Username: '',
      Email: '',
      Password: '',
      Role: '',
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toastr.info('Complete the form correctly');
      return;
    }

    const user = {
      name: this.form.value.Username,
      email: this.form.value.Email,
      password: this.form.value.Password,
      role: this.form.value.Role,
    };

    this.crudService.createUser(user).subscribe(
      (response) => {
        this.toastr.success('User created successfully', 'Success!');
        this.form.reset();
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error('Failed to create user', 'Error!');
        console.log(error);
      },
    );
  }

  get username() {
    return this.form.get('Username');
  }

  get email() {
    return this.form.get('Email');
  }

  get password() {
    return this.form.get('Password');
  }

  get role() {
    return this.form.get('Role');
  }
}
