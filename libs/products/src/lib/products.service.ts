import { Injectable } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class ProductsService {
  async getProducts() {
    return await prisma.product.findMany({
      where: {
        isDisable: false,
      },
      select: {
        name: true,
        price: true,
        description: true,
        image: true,
        tags: {
          select: {
            id: false,
            name: true,
          },
        },
      },
    });
  }

  async getProduct(id: string) {
    return await prisma.product.findFirst({
      where: {
        id: id,
        isDisable: false,
      },
      select: {
        name: true,
        price: true,
        description: true,
        image: true,
        tags: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async updateProduct(id: string, product: Partial<Product>) {
    return await prisma.product.update({
      where: {
        id: id,
      },
      data: product,
    });
  }

  async createProduct(product: Product) {
    return await prisma.product.create({
      data: product,
    });
  }

  async deleteProduct(id: string) {
    return await prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
}
