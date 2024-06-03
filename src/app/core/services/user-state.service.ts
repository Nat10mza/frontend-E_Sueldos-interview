import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: User): void {
    return this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  logoutUser() {
    return this.userSubject.next(null);
  }
}
