import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@prisma/client';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from './products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'fullstack-app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <p class="underline">Fetch from API: 🎉<br /></p>
    <code> Backend Made With: NestJs & SqLite </code>
    <br />
    <pre>
      {{ products$ | async | json }}
    </pre
    >
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  products$: Observable<Product[]> = inject(ProductsService).getProducts();
}
