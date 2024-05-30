import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  user$: Observable<User | null>;
  constructor(
    private router: Router,
    private userService: UserService,
  ) {
    this.user$ = this.userService.user$;
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
