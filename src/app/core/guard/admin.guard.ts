import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserStateService } from '../services/user-state.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  user: User | null = null;

  constructor(
    private UserStateService: UserStateService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    this.UserStateService.user$.subscribe((user) => {
      this.user = user;
      console.log('Guard Check User', user);
    });

    if (this.user?.role === 'admin') {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
