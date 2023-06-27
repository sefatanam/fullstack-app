import { Injectable } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { ProductDto } from "@fullstack-app/api-model";

const prisma = new PrismaClient();
@Injectable()
export class ProductsService {
  async getProducts() {
    return prisma.product.findMany({
      where: {
        isDisable: false,
      },
      select: {
        id: true,
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
    return prisma.product.findFirst({
      where: {
        id: id,
        isDisable: false,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        image: true,
        videoUrl: true,
        tags: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async createProduct(productDto: ProductDto) {
    const { tags, ...product } = productDto;
    const productTags = tags ? { create: tags } : undefined;
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        tags: productTags,
      },
      include: {
        tags: true,
      },
    });
    return createdProduct;
  }

  async deleteProduct(id: string) {
    return prisma.product.delete({
      where: {
        id: id,
      },
    });
  }

  /**
   * [PATCH] Supported
   * @param id
   * @param product
   * @returns Promise<Product & {tags: Tag[]}>
   */
  async updateProduct(id: string, product: ProductDto) {
    const { tags, ...updateData } = product;
    const updateInput: Prisma.ProductUpdateInput = { ...updateData };
    if (tags) {
      updateInput.tags = {
        deleteMany: {}, // Delete all existing tags associated with the product
        create: tags.map((tag) => ({
          name: tag.name,
        })),
      };
    }
    return prisma.product.update({
      where: {
        id: id,
      },
      data: updateInput,
      include: {
        tags: true,
      },
    });
  }
}
