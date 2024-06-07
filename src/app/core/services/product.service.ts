import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, createdProduct } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/v1/products';
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(body: createdProduct) {
    return this.http.post(this.apiUrl, body);
  }
}
