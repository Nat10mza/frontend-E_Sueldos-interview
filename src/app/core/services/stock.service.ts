import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createdProduct } from 'src/app/models/product';
import { ProductWithStock } from 'src/app/models/stock';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private apiUrl = 'http://localhost:3000/v1/stock';

  constructor(private http: HttpClient) {}

  getAllStocks() {
    return this.http.get<ProductWithStock[]>(this.apiUrl);
  }
  createStock(body: createdProduct) {
    return this.http.post(this.apiUrl, body);
  }
}
