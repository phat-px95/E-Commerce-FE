import { Route } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';

export const appRoutes: Route[] = [
	{
		path: 'category/:id',
		component: ProductsComponent,
	  },
	  {
		path: 'category',
		component: ProductsComponent,
	  },
	  {
		path: 'products',
		component: ProductsComponent,
	  },
	  {
		path: '',
		redirectTo: '/products',
		pathMatch: 'full',
		// component: ProductsComponent,
	  },
	  {
		path: '**',
		redirectTo: '/products',
		pathMatch: 'full',
		// component: ProductsComponent,
	  }
];
