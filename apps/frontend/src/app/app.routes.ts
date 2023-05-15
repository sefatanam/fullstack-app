import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'products',
    loadComponent: () =>
      import('../../products/products.component').then(
        (c) => c.ProductsComponent
      ),
  },
];
