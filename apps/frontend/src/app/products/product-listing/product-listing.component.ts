import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsService } from "../products.service";
import { Router, RouterLink } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { debounceTime, switchMap } from "rxjs";
import { DefaultImgDirective } from '../../utils/directives/default-img.directive';

@Component({
  selector: 'fullstack-app-product-listing',
  standalone: true,
  imports: [CommonModule, RouterLink, DefaultImgDirective],
  templateUrl: './product-listing.component.html',
})
export class ProductListingComponent implements OnInit {
  products$ = inject(ProductsService).getProducts();
  router = inject(Router);
  private title = inject(Title);
  private service = inject(ProductsService);
  async gotoCreateProduct() {
    await this.router.navigateByUrl('/products/create');
  }

  ngOnInit(): void {
    this.title.setTitle('Product Listing');
  }

  productDeleteHandler(id: string) {
    this.products$ = this.service.deleteProduct(id).pipe(
      debounceTime(100),
      switchMap((_) => {
        return this.service.getProducts();
      })
    );
  }
}
