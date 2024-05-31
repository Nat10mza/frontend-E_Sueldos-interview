import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { CrudService } from 'src/app/core/services/crud.service';
import { User } from 'src/app/models/user';

export interface UsersList {
  id: number;
  name: string;
  email: string;
  role: string;
}

let ELEMENT_DATA: UsersList[] = [
  // { id: 1, name: 'Hydrogen', email: 'example@example.com', role: 'H' },
  // { id: 2, name: 'Helium', email: 'example@example.com', role: 'He' },
  // { id: 3, name: 'Lithium', email: 'example@example.com', role: 'Li' },
  // { id: 4, name: 'Beryllium', email: 'example@example.com', role: 'Be' },
  // { id: 5, name: 'Boron', email: 'example@example.com', role: 'B' },
  // { id: 6, name: 'Carbon', email: 'example@example.com', role: 'C' },
  // { id: 7, name: 'Nitrogen', email: 'example@example.com', role: 'N' },
  // { id: 8, name: 'Oxygen', email: 'example@example.com', role: 'O' },
  // { id: 9, name: 'Fluorine', email: 'example@example.com', role: 'F' },
  // { id: 10, name: 'Neon', email: 'example@example.com', role: 'Ne' },
];

@Component({
  selector: 'app-user-creation',
  templateUrl: './users-dashboard.component.html',
})
export class UsersDashboardComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  dataSource = this.users;

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    // ELEMENT_DATA = this.crudService.getAllUsers();
    this.crudService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log('Results api', this.users);
        this.dataSource = this.users;
      },
      (error) => {
        console.log('Error', error);
      },
    );
  }

  @ViewChild('drawer') drawer!: MatDrawer;

  ngAfterViewInit(): void {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }
}
