import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map } from 'rxjs';
import { ApiResponse } from 'src/app/models/apiResponse';

interface reqBody {
  name: string;
  email: string;
  password: string;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private apiUrl = 'http://localhost:3000/v1';

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
  ) {}

  // Duplicated code from other service
  getAccessToken() {
    return this.cookies.get('access-token');
  }

  getAllUsers() {
    let get_apiUrl = `${this.apiUrl}/users?limit=50&page=1`;
    const accessToken = this.getAccessToken();
    return this.http
      .get<ApiResponse>(get_apiUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .pipe(map((response) => response.results));
  }

  createUser(body: reqBody) {
    let create_apiUrl = `${this.apiUrl}/users`;
    const accessToken = this.getAccessToken();
    return this.http.post(create_apiUrl, body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  updateUser(id: string, body: reqBody) {
    let update_apiUrl = `${this.apiUrl}/users/${id}`;
    const accessToken = this.getAccessToken();
    return this.http.patch(update_apiUrl, body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  deleteUser(id: string) {
    let delete_apiUrl = `${this.apiUrl}/users/${id}`;
    const accessToken = this.getAccessToken();
    return this.http.delete(delete_apiUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
}
