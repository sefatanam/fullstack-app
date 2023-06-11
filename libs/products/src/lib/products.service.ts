import { Injectable } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { ProductDto } from "@fullstack-app/api-model";

const prisma = new PrismaClient();
@Injectable()
export class ProductsService {
  async getProducts() {
    return await prisma.product.findMany({
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

  async createProduct(product: ProductDto) {
    // return await prisma.product.create({
    //   data: {
    //     ...product,
    //     tags: {
    //       create: product.tags.map((tagDto) => ({
    //         name: tagDto.name,
    //       })),
    //     },
    //   },
    //   include: {
    //     tags: true,
    //   },
    // });

    const createData: any = {
      ...product,
    };

    if (product.tags) {
      createData.tags = {
        create: product.tags.map((tagDto) => ({
          name: tagDto.name,
        })),
      };
    }

    return await prisma.product.create({
      data: createData,
      include: {
        tags: true,
      },
    });
  }

  async deleteProduct(id: string) {
    return await prisma.product.delete({
      where: {
        id: id,
      },
    });
  }

  /**
   * Support PATCH Update also
   * @param id
   * @param product
   * @returns
   */
  async updateProduct(id: string, product: ProductDto) {
    const updateData: Prisma.ProductUpdateInput =
      product as Prisma.ProductUpdateInput;

    if (product.tags) {
      updateData.tags = {
        create: product.tags.map((tag) => ({
          name: tag.name,
        })),
      };
    }
    return prisma.product.update({
      where: {
        id: id,
      },
      data: updateData,
      include: {
        tags: true,
      },
    });
  }
}
