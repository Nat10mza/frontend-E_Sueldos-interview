import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  private token: string = '';
  constructor(
    private logoutService: AuthService,
    public router: Router,
    private userService: UserService,
  ) {}
  onLogout() {
    this.token = this.logoutService.getRefreshToken();
    this.logoutService.logout(this.token).subscribe(() => {
      this.userService.logoutUser();
      this.logoutService.deleteCookies();
      this.router.navigateByUrl('');
    });
  }
}
