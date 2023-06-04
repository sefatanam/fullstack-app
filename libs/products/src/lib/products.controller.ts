import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dtos/product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  public async getProducts() {
    return await this.productsService.getProducts();
  }

  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  public async getProduct(@Param('id') id: string) {
    return await this.productsService.getProduct(id);
  }

  @ApiBody({ type: ProductDto })
  @Post()
  public async createProduct(@Body() product: ProductDto) {
    return this.productsService.createProduct(product);
  }

  @ApiBody({ type: ProductDto })
  @Patch(':id')
  public async updateProduct(
    @Param('id') id: string,
    @Body() product: ProductDto
  ) {
    return this.productsService.updateProduct(id, product);
  }

  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  public async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
