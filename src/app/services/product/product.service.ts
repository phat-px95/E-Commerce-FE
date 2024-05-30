import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from 'src/app/models/product.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categorySearchUri = '/search/findByCategoryId';
  constructor(
    private httpClient: HttpClient
  ) { }

  getProductList(categoryId: number): Observable<Product[]> {
    const params = new HttpParams()
    .set('size', 100)
    .set('id', categoryId)
    const url = `${this.baseUrl}${this.categorySearchUri}`;
    return this.httpClient.get<GetResponse>(url, {params: params}).pipe(
      map(res => res._embedded.products)
    );
  }
}

interface GetResponse {
  _embedded: {
    products: Product[]
  }
}
