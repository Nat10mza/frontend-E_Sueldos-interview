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
  private apiUrl = 'http://localhost:3000/v1/users';

  constructor(private http: HttpClient) {}

  getAllUsers() {
    let get_apiUrl = `${this.apiUrl}?limit=50&page=1`;
    return this.http
      .get<ApiResponse>(get_apiUrl)
      .pipe(map((response) => response.results));
  }

  createUser(body: reqBody) {
    let create_apiUrl = `${this.apiUrl}`;
    return this.http.post(create_apiUrl, body);
  }

  updateUser(id: string, body: reqBody) {
    let update_apiUrl = `${this.apiUrl}/${id}`;
    return this.http.patch(update_apiUrl, body);
  }

  deleteUser(id: string) {
    let delete_apiUrl = `${this.apiUrl}/${id}`;
    return this.http.delete(delete_apiUrl);
  }
}
