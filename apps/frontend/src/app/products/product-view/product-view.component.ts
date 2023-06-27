import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Data, RouterLink } from "@angular/router";
import { ProductDto } from "@fullstack-app/api-model";
import { DefaultImgDirective } from '../../utils/directives/default-img.directive';

@Component({
  selector: 'fullstack-app-product-view',
  standalone: true,
  imports: [CommonModule, DefaultImgDirective, RouterLink],
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductViewComponent implements OnInit {
  public title = inject(Title);
  public activatedRoute = inject(ActivatedRoute);
  public product: ProductDto;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: Data) => {
      this.title.setTitle(response['title']);
      this.product = response['product'];
    });
  }
}
