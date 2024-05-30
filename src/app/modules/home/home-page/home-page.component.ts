import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterLoginService } from 'src/app/core/services/register-login.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  user: User | null = null;
  constructor(
    private router: Router,
    public userService: UserService,
    public getToken: RegisterLoginService,
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.getToken.getUserLogged()?.subscribe((data) => {
      if (data) {
        console.log('Returned data', data);
        this.userService.setUser(data);
      }
    });
    this.userService.user$.subscribe((user) => {
      this.user = user;
      console.log('User', user);
    });
  }

  goToUsersDashboard() {
    this.router.navigate(['/users-dashboard']);
  }
}
