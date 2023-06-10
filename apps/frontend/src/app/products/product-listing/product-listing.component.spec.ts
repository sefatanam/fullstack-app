import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductListingComponent } from "./product-listing.component";

describe('ProductListingComponent', () => {
  let component: ProductListingComponent;
  let fixture: ComponentFixture<ProductListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductListingComponent]
    });
    fixture = TestBed.createComponent(ProductListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
