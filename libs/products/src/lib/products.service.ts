import { Injectable } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class ProductsService {
  getProducts(): Promise<Product[]> {
    return prisma.product.findMany();
  }
}
