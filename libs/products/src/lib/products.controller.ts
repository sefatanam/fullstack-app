import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  public async getProducts() {
    return await this.productsService.getProducts();
  }

  @Get('/:id')
  public async getProduct() {
    return await this.productsService.getProduct('');
  }
}
