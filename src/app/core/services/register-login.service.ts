import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterLoginService {
  constructor(
    private http: HttpClient,
    private cookies: CookieService,
  ) {}

  // login(user: any): Observable<any> {
  //   return this.http.post('hhttp://localhost:3000/v1/auth/login', user);
  // }

  register(user: any): Observable<any> {
    return this.http.post('http://localhost:3000/v1/auth/register', user);
  }
  setToken(token: string) {
    this.cookies.set('token', token);
  }
  getToken() {
    return this.cookies.get('token');
  }
}
