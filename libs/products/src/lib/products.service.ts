import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { ProductDto } from '@fullstack-app/api-model';
import { TagDto } from '@fullstack-app/tags';

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

  private async getOrCreateTagsReference(
    transaction: PrismaClient,
    tags: Array<TagDto>
  ) {
    const tagReferences: Array<{ id: string }> = [];
    for (const tag of tags) {
      const existingTag = await transaction.tag.findUnique({
        where: { name: tag.name },
      });
      if (existingTag) {
        tagReferences.push({ id: existingTag.id });
      } else {
        const newTag = await transaction.tag.create({
          data: { name: tag.name },
        });
        tagReferences.push({ id: newTag.id });
      }
    }

    return tagReferences;
  }

  async createProduct(productDto: ProductDto) {
    if (!productDto.name.trim() || productDto.tags.length === 0) {
      throw new BadRequestException(
        'Invalid product name or no tags provided.'
      );
    }
    try {
      await prisma.$transaction(async (tx) => {
        const tagReferences = await this.getOrCreateTagsReference(
          tx as PrismaClient,
          productDto.tags
        );
        return await tx.product.create({
          data: {
            ...productDto,
            tags: {
              connect: tagReferences,
            },
          },
        });
      });
    } catch (err) {
      throw new InternalServerErrorException(
        `Someting went wrong to create this product. More ${err}`
      );
    }
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
