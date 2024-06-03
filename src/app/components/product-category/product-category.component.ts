import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategory } from 'src/app/models/product-category.type';
import { ProductService } from 'src/app/services/product/product.service';
import { RouterModule } from '@angular/router';
import { ReplaySubject, catchError, of, takeUntil } from 'rxjs';

@Component({
  selector: 'fe-product-category',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css',
})
export class ProductCategoryComponent implements OnInit, OnDestroy {

  productCategories: ProductCategory[] = [];
  destroyed$ = new ReplaySubject<void>(1);
  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.listProductCategories();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  listProductCategories() {
    this.productService.getProductCategories().pipe(
      catchError(error => of([] as ProductCategory[])),
      takeUntil(this.destroyed$)
    ).subscribe(res => {
      this.productCategories = res as ProductCategory[];
    });
  }

  trackById(index: number, item: ProductCategory) {
    return item.id;
  }
}
