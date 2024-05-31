import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user: User | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    this.userService.user$.subscribe((user) => {
      this.user = user;
      console.log('Guard Check User', user);
    });

    if (this.user) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
