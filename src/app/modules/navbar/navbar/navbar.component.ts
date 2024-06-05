import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserStateService } from 'src/app/core/services/user-state.service';
import { User } from 'src/app/models/user';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user$: Observable<User | null>;
  user: User | null = null;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(
    private router: Router,
    private UserStateService: UserStateService,
    public getToken: AuthService,
    public dialog: MatDialog,
  ) {
    this.user$ = this.UserStateService.user$;
  }
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    if (!this.user) {
      this.getToken.getUserLogged()?.subscribe((data) => {
        if (data) {
          this.UserStateService.setUser(data);
        }
      });
    }
    this.UserStateService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  goToHome() {
    this.router.navigate(['/']);
    console.log(this.user$);
  }
  goToUsersDashboard() {
    if (!this.user) return this.dialog.open(LoginFormComponent);
    return this.router.navigate(['/users-dashboard']);
  }
  goToProductsDashboard() {
    if (!this.user) return this.dialog.open(LoginFormComponent);
    return this.router.navigate(['/products-dashboard']);
  }
}
