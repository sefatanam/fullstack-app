import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ProductDto } from "../../../api-models/src/lib/dtos/product.dto";

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ description: 'Get all product which are not disable.' })
  @ApiResponse({
    description: `Get all product which are not disable.`,
    status: HttpStatus.OK,
    type: ProductDto,
  })
  @Get()
  public async getProducts() {
    return await this.productsService.getProducts();
  }

  @ApiOperation({ description: 'Get a product which is not disable.' })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  public async getProduct(@Param('id') id: string) {
    const result = await this.productsService.getProduct(id);
    if(result===null){
      throw new NotFoundException(`Product ${id} not found`);
    }
    return result;
  }

  @ApiOperation({ description: 'Create product' })
  @ApiResponse({
    description: `Create product`,
    status: HttpStatus.OK,
    type: ProductDto,
  })
  @ApiBody({ type: ProductDto })
  @Post()
  public async createProduct(@Body() product: ProductDto) {
    return this.productsService.createProduct(product);
  }

  @ApiOperation({ description: 'Update product by uuid' })
  @ApiResponse({
    description: `Update product`,
    status: HttpStatus.OK,
    type: ProductDto,
  })
  @ApiBody({ type: ProductDto })
  @Patch(':id')
  public async updateProduct(
    @Param('id') id: string,
    @Body() product: ProductDto
  ) {
    return this.productsService.updateProduct(id, product);
  }

  @ApiOperation({ description: 'Delete product by product uuid' })
  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  public async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
