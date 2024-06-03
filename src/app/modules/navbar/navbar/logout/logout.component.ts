import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserStateService } from 'src/app/core/services/user-state.service';

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
    private UserStateService: UserStateService,
  ) {}
  onLogout() {
    this.token = this.logoutService.getRefreshToken();
    this.logoutService.logout(this.token).subscribe(() => {
      this.UserStateService.logoutUser();
      this.logoutService.deleteCookies();
      this.router.navigateByUrl('');
    });
  }
}
