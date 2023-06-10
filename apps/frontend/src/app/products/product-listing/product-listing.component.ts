import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsService } from "../products.service";
import { Router } from "@angular/router";

@Component({
  selector: 'fullstack-app-product-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-listing.component.html',
})
export class ProductListingComponent {
  products$ = inject(ProductsService).getProducts();
  router = inject(Router);
  async gotoCreateProduct() {
    await this.router.navigateByUrl('/products/create');
  }
}
