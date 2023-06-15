import { Route } from "@angular/router";
import { productResolver } from "./products/product.resolver";

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
        path:'update/:id',
        loadComponent:()=>import('./products/product-form/product-form.component').then(m=>m.ProductFormComponent),
        data:{
          title:'Update Product',
        },
        resolve:{
          product: productResolver
        }
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./products/product-form/product-form.component').then(
            (c) => c.ProductFormComponent
          ),
        data:{
          title: 'Create Product',
        }
      },
      {
        path:'view/:id',
        loadComponent:()=>import('./products/product-view/product-view.component').then((c)=>c.ProductViewComponent),
        data:{
          title: 'View Product'
        },
        resolve:{
          product: productResolver
        }
      },
      {
        path: 'list',
        loadComponent: () =>
          import(
            './products/product-listing/product-listing.component'
          ).then((c) => c.ProductListingComponent),
        data:{
          title: 'Product Listing'
        }
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];
