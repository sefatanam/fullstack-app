import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsService } from "../products.service";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'fullstack-app-product-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-listing.component.html',
})
export class ProductListingComponent implements OnInit{
  products$ = inject(ProductsService).getProducts();
  router = inject(Router);
  private title = inject(Title);

  async gotoCreateProduct() {
    await this.router.navigateByUrl('/products/create');
  }

  ngOnInit(): void {
    this.title.setTitle('Product Listing');
  }
}
