import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { CrudService } from 'src/app/core/services/crud.service';
import { User } from 'src/app/models/user';
import { UpdateFormComponent } from '../update-form/update-form.component';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import { UserStateService } from 'src/app/core/services/user-state.service';

export interface UsersList {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface reqBody {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-creation',
  templateUrl: './users-dashboard.component.html',
})
export class UsersDashboardComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  loggedUser: User | null = null;
  user: reqBody = {
    id: '',
    name: '',
    email: '',
  };
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  dataSource = this.users;

  constructor(
    private crudService: CrudService,
    public UserStateService: UserStateService,
    public dialog: MatDialog,
  ) {}

  getUsers() {
    this.crudService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.dataSource = this.users;
      },
      (error) => {
        console.log('Error', error);
      },
    );
  }

  ngOnInit(): void {
    // ELEMENT_DATA = this.crudService.getAllUsers();
    this.getUsers();
    this.UserStateService.user$.subscribe((user) => {
      this.loggedUser = user;
    });
  }

  @ViewChild('drawer') drawer!: MatDrawer;

  ngAfterViewInit(): void {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }

  oneCreateUserDialogOnClick() {
    const dialogRef = this.dialog.open(CreateUserFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

  openEditDialogOnClick(user: reqBody) {
    const dialogRef = this.dialog.open(UpdateFormComponent, {
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }
  deleteOnClick(id: string) {
    if (this.loggedUser?.id === id) return alert('You cant remove yourself');

    this.crudService.deleteUser(id).subscribe(
      (response) => {
        console.log('User deleted successfully:', response);
        this.getUsers(); // Llamar a getUsers después de que deleteUser haya terminado
      },
      (error) => {
        console.error('Failed to delete user:', error);
        alert('Failed to delete user');
      },
    );
  }
}
