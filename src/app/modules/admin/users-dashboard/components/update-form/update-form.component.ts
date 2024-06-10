import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/core/services/crud.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
})
export class UpdateFormComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { id: string; name: string; email: string },
    public dialogRef: MatDialogRef<UpdateFormComponent>,
    public crudService: CrudService,
    private toastr: ToastrService,
  ) {}

  onSubmit(f: NgForm) {
    const user = {
      name: f.value.Username,
      email: f.value.Email,
      password: f.value.Password,
    };
    if (!f.value.Username) user.name = this.data.name;
    if (!f.value.Email) user.email = this.data.email;

    if (!f.value.Password) {
      this.toastr.info('Complete the form.');
      return;
    }

    this.crudService.updateUser(this.data.id, user).subscribe(
      (response) => {
        this.toastr.success('Usuario actualizado', 'Exito!');
        f.reset();
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error('Mala actualización', 'Oops!');
        console.log(error);
      },
    );
  }
}
