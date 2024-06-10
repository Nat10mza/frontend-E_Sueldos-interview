import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserStateService } from 'src/app/core/services/user-state.service';
import { User } from 'src/app/models/user';
import { LoginFormComponent } from '../../navbar/navbar/login/login-form/login-form.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  user: User | null = null;
  constructor(
    private router: Router,
    public UserStateService: UserStateService,
    public getToken: AuthService,
    public dialog: MatDialog,
  ) {}

  // ngOnInit() {
  //   this.getUser();
  // }

  // getUser(): void {
  //   if (!this.user) {
  //     this.getToken.getUserLogged()?.subscribe((data) => {
  //       if (data) {
  //         this.UserStateService.setUser(data);
  //       }
  //     });
  //   }
  //   this.UserStateService.user$.subscribe((user) => {
  //     this.user = user;
  //   });
  // }
}
