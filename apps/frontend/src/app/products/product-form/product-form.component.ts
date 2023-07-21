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
import { ChipsInputComponent } from '../../components/chips-input/chips-input.component';
import { ToChipTransform } from '../../utils/transforms/to-chip.transform';

@Component({
  selector: 'fullstack-app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    ReactiveFormsModule,
    ChipsInputComponent,
  ],
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
      this.productForm.markAllAsTouched();
      alert('Invalid form');
      return;
    }
    let formValue = this.productForm.value as ProductDto;
    const tags = formValue.tags.map((el) => ({ name: el.name ?? el }));
    formValue = { ...formValue, price: +formValue.price, tags: tags };
    this.service.addOrUpdate(formValue).subscribe(async (response) => {
      if (response.id) await this.router.navigateByUrl('/products');
    });
  }

  makeForm(product: ProductDto) {
    return this.formBuilder.group({
      id: product.id,
      name: new FormControl(product.name, [Validators.required]),
      price: new FormControl(product.price, [
        Validators.required,
        Validators.min(0),
      ]),
      description: new FormControl(product.description, [Validators.required]),
      image: new FormControl(product.image, [Validators.required]),
      videoUrl: new FormControl(product.videoUrl, [Validators.required]),
      tags: new FormControl(ToChipTransform(product.tags), [
        Validators.required,
      ]),
    });
  }
}
