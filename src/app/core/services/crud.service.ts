import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map } from 'rxjs';
import { ApiResponse } from 'src/app/models/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private apiUrl = 'http://localhost:3000/v1/users?limit=50&page=1';

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
  ) {}

  // Duplicated code from other service
  getAccessToken() {
    return this.cookies.get('access-token');
  }

  getAllUsers() {
    const accessToken = this.getAccessToken();
    return this.http
      .get<ApiResponse>(this.apiUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .pipe(map((response) => response.results));
  }
}
