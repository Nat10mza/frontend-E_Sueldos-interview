import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, createdProduct } from 'src/app/models/product';

interface reqBody {
  name: string;
  email: string;
  password: string;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/v1/products';
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductID(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(body: createdProduct) {
    return this.http.post(this.apiUrl, body);
  }

  updateProduct(id: string, body: Partial<Product>) {
    let update_apiUrl = `${this.apiUrl}/${id}`;
    return this.http.patch(update_apiUrl, body);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
