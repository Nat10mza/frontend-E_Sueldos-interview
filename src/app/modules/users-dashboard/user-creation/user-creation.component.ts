import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

export interface PeriodicElement {
  id: number;
  name: string;
  email: string;
  role: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Hydrogen', email: 'example@example.com', role: 'H' },
  { id: 2, name: 'Helium', email: 'example@example.com', role: 'He' },
  { id: 3, name: 'Lithium', email: 'example@example.com', role: 'Li' },
  { id: 4, name: 'Beryllium', email: 'example@example.com', role: 'Be' },
  { id: 5, name: 'Boron', email: 'example@example.com', role: 'B' },
  { id: 6, name: 'Carbon', email: 'example@example.com', role: 'C' },
  { id: 7, name: 'Nitrogen', email: 'example@example.com', role: 'N' },
  { id: 8, name: 'Oxygen', email: 'example@example.com', role: 'O' },
  { id: 9, name: 'Fluorine', email: 'example@example.com', role: 'F' },
  { id: 10, name: 'Neon', email: 'example@example.com', role: 'Ne' },
];

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
})
export class UserCreationComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  dataSource = ELEMENT_DATA;
  @ViewChild('drawer') drawer!: MatDrawer;

  ngAfterViewInit(): void {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }
}
