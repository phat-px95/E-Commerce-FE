import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product/product.service';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    ProductsComponent,
    HttpClientModule
  ],
  providers: [
    ProductService
  ],
  selector: 'fe-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'fe';
}
