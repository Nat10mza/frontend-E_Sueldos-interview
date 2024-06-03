import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStateService } from 'src/app/core/services/user-state.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  user$: Observable<User | null>;
  constructor(
    private router: Router,
    private UserStateService: UserStateService,
  ) {
    this.user$ = this.UserStateService.user$;
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
