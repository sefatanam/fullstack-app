import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { InputComponent } from '../../components/input/input.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule, Validators
} from "@angular/forms";
import { Title } from '@angular/platform-browser';
import { ProductsService } from '../products.service';
import { ProductDto } from '@fullstack-app/api-model';
import { Validator } from "class-validator";

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
  public title = inject(Title);
  private service = inject(ProductsService);
  private activatedRoute = inject(ActivatedRoute);
  async goToProductListing() {
    await this.router.navigateByUrl('products');
  }
  productForm: FormGroup;
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: Data) => {
      this.title.setTitle(response['title']);
      if (response['product']) {
        this.productForm = this.makeForm(response['product']);
      } else {
        this.productForm = this.makeForm({
          name: '',
          image: '',
          description: '',
          price: 0,
          videoUrl: '',
          tags: [],
          isDisable: false,
          id: '',
        });
      }
    });
  }
  submit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched() ;
      return;
    }
    let value: ProductDto = this.productForm.value as unknown as ProductDto;
    value = { ...value, price: +value.price };
    this.service.addOrUpdate(value).subscribe(async () => {
      await this.router.navigateByUrl('/products');
    });
  }

  makeForm(product: ProductDto) {
    return this.formBuilder.group({
      id: product.id,
      name: new FormControl(product.name,[Validators.required]),
      price: new FormControl(product.price,[Validators.required, Validators.min(10)]),
      description: new FormControl(product.description,[Validators.required]),
      image: new FormControl(product.image,[Validators.required]),
      videoUrl: new FormControl(product.videoUrl,[Validators.required]),
    });
  }
}
