import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from 'src/app/models/product.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products'
  constructor(
    private httpClient: HttpClient
  ) { }

  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(res => res._embedded.products)
    );
  }
}

interface GetResponse {
  _embedded: {
    products: Product[]
  }
}
