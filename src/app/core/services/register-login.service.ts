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

  logout(refreshToken: string) {
    return this.http.post('http://localhost:3000/v1/auth/logout', {
      refreshToken: refreshToken,
    });
  }

  setToken(accessToken: string, refreshToken: string, id: string) {
    this.cookies.set('access-token', accessToken);
    this.cookies.set('refresh-token', refreshToken);
    this.cookies.set('id', id);
  }

  getAccessToken() {
    return this.cookies.get('access-token');
  }

  getRefreshToken() {
    return this.cookies.get('refresh-token');
  }
  getId() {
    return this.cookies.get('id');
  }

  getUserLogged() {
    const accessToken = this.getAccessToken();
    const id = this.getId();

    if (accessToken) {
      return this.http
        .get<User>(`http://localhost:3000/v1/users/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .pipe(
          catchError(async (err) => console.log(err)), // Handle error and return null if token is invalid
        );
    } else {
      return null; // Return null if no token found
    }
  }
  deleteCookies() {
    this.cookies.delete('access-token');
    this.cookies.delete('refresh-token');
    this.cookies.delete('id');
  }
}
