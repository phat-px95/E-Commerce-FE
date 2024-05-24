import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product/product.service';
import { Product } from '../models/product.type';

@Component({
  selector: 'fe-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {

  products!: Product[];
  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
      this.listProducts();
  }

  listProducts() {
    this.productService.getProductList().subscribe(res => {
      this.products = res;
    });
  }
}
