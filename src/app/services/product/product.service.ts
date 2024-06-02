import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductCategory } from 'src/app/models/product-category.type';
import { Product } from 'src/app/models/product.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api';
  private categorySearchUri = '/products/search/findByCategoryId';
  private productCategoryUri = '/product-category'
  constructor(
    private httpClient: HttpClient
  ) { }

  getProductList(categoryId: number): Observable<Product[]> {
    const params = new HttpParams()
    .set('size', 100)
    .set('id', categoryId)
    const url = `${this.baseUrl}${this.categorySearchUri}`;
    return this.httpClient.get<GetProductResponse>(url, {params: params}).pipe(
      map(res => res._embedded.products)
    );
  }

  getProductCategories() {
    const url = `${this.baseUrl}${this.productCategoryUri}`;
    return this.httpClient.get<GetProductCategoryResponse>(url).pipe(
      map(res => res._embedded.productCategory)
    );
  }
}

interface GetProductResponse {
  _embedded: {
    products: Product[]
  }
}

interface GetProductCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[]
  }
}
