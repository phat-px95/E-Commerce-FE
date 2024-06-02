import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product.type';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, catchError, of, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'fe-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {

  products!: Product[];
  currentCategoryId = 1;
  destroyed$ = new ReplaySubject<void>(1);

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      catchError(error => of(null)),
      switchMap(res => {
        if (res && this.route.snapshot.paramMap.has('id') && typeof this.route.snapshot.paramMap.get('id') == 'string') {
          this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
        }
        return this.listProducts(this.currentCategoryId);
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
  }

  listProducts(categoryId: number) {
    return this.productService.getProductList(categoryId).pipe(
      tap(res => {
        this.products = res;
    }));
  }
}
