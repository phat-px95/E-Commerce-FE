import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategory } from 'src/app/models/product-category.type';
import { ProductService } from 'src/app/services/product/product.service';
import { RouterModule } from '@angular/router';

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
export class ProductCategoryComponent implements OnInit {

  productCategories: ProductCategory[] = [];
  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(res => {
      this.productCategories = res;
    });
  }
}
