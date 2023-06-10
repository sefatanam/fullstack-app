import { Route } from "@angular/router";

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./products/products.component').then(
        (c) => c.ProductsComponent
      ),
    children: [
      {
        path: 'create',
        loadComponent: () =>
          import('./products/product-form/product-form.component').then(
            (c) => c.ProductFormComponent
          ),
      },
      {
        path: 'list',
        loadComponent: () =>
          import(
            './products/product-listing/product-listing.component'
          ).then((c) => c.ProductListingComponent),
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];
