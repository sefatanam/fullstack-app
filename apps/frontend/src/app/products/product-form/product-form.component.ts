import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { InputComponent } from "../../components/input/input.component";
import { FormBuilder, FormControl, ReactiveFormsModule } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ProductsService } from "../products.service";
import { ProductDto } from "@fullstack-app/api-model";

@Component({
  selector: 'fullstack-app-product-form',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private title = inject(Title);
  private service = inject(ProductsService);
  async goToProductListing() {
    await this.router.navigateByUrl('products');
  }

  productForm = this.formBuilder.group({
    name: new FormControl(''),
    price: new FormControl(0),
    description: new FormControl(''),
    image: new FormControl(''),
    videoUrl: new FormControl(''),
  });

  ngOnInit(): void {
    this.title.setTitle('Create Product');
  }

  submit() {
    if (this.productForm.invalid) {
      this.productForm.markAsTouched();
      return;
    }
    let value: ProductDto = this.productForm.value as unknown as ProductDto;
    value = { ...value, price: +value.price };
    this.service.createProduct(value).subscribe(async (response) => {
      await this.router.navigateByUrl('/products');
    });
  }
}
