import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterLoginService } from 'src/app/core/services/register-login.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/models/user';
import { LoginFormComponent } from '../../navbar/navbar/login/login-form/login-form.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  user: User | null = null;
  constructor(
    private router: Router,
    public userService: UserService,
    public getToken: RegisterLoginService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    if (!this.user) {
      this.getToken.getUserLogged()?.subscribe((data) => {
        if (data) {
          this.userService.setUser(data);
        }
      });
    }
    this.userService.user$.subscribe((user) => {
      this.user = user;
      console.log('User', user);
    });
  }

  goToUsersDashboard() {
    if (!this.user) return this.dialog.open(LoginFormComponent);
    return this.router.navigate(['/users-dashboard']);
  }
}
