import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'fullstack-app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {

}
