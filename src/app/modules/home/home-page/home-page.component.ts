import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/models/user';

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
  ) {}

  ngOnInit() {
    this.getUserLogged();
  }
  getUserLogged(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
      console.log('User', user);
    });
  }

  goToUsersDashboard() {
    this.router.navigate(['/users-dashboard']);
  }
}
