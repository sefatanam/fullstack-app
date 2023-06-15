import { ResolveFn } from '@angular/router';
import { ProductDto } from "@fullstack-app/api-model";
import { inject } from "@angular/core";
import { ProductsService } from "./products.service";

export const productResolver: ResolveFn<ProductDto> = (route, state) => {
  return inject(ProductsService).getProduct(route.params['id']);
};
