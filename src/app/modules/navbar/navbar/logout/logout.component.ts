import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterLoginService } from 'src/app/core/services/register-login.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  private token: string = '';
  constructor(
    private logoutService: RegisterLoginService,
    public router: Router,
    private userService: UserService,
  ) {}
  onLogout() {
    this.token = this.logoutService.getRefreshToken();
    console.log(this.token);
    this.logoutService.logout(this.token).subscribe(() => {
      this.userService.logoutUser();
      this.logoutService.deleteCookies();
      this.router.navigateByUrl('');
    });
  }
}
