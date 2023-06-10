import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { InputComponent } from "../../components/input/input.component";

@Component({
  selector: 'fullstack-app-product-form',
  standalone: true,
  imports: [CommonModule, InputComponent],
  templateUrl: './product-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent {

  private router = inject(Router)
  async goToProductListing() {
    await this.router.navigateByUrl('products')
  }
}
