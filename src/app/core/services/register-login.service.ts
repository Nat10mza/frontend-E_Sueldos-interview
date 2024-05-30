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

  login(user: any): Observable<any> {
    return this.http.post('http://localhost:3000/v1/auth/login', user);
  }

  register(user: any): Observable<any> {
    return this.http.post('http://localhost:3000/v1/auth/register', user);
  }
  setToken(tokens: string) {
    this.cookies.set('token', tokens);
  }
  getToken() {
    return this.cookies.get('token');
  }
  getUser() {
    return this.http.get('https://reqres.in/api/users/2');
  }
  getUserLogged() {
    const token = this.getToken();
    // Aquí iría el endpoint para devolver el usuario para un token
  }
}
