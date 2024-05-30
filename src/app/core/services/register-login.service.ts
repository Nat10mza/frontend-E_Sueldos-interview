import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class RegisterLoginService {
  constructor(
    private http: HttpClient,
    private cookies: CookieService,
  ) {}

  login(user: any): Observable<any> {
    return this.http.post('http://localhost:3000/v1/auth/login', user);
  }

  register(user: any): Observable<any> {
    return this.http.post('http://localhost:3000/v1/auth/register', user);
  }
  setToken(token: string, id: string) {
    this.cookies.set('token', token);
    this.cookies.set('id', id);
  }
  getToken() {
    return this.cookies.get('token');
  }

  getId() {
    return this.cookies.get('id');
  }

  getUserLogged() {
    const token = this.getToken();
    const id = this.getId();

    if (token) {
      console.log('token service', id);
      return this.http
        .get<User>(`http://localhost:3000/v1/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .pipe(
          catchError(async (err) => console.log(err)), // Handle error and return null if token is invalid
        );
    } else {
      return null; // Return null if no token found
    }
  }
}
