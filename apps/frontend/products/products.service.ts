import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '@prisma/client';
import { environment } from '../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get<Product[]>(
      `${environment.backend_url}/products`
    );
  }
}
