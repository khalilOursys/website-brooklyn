import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBulkProductDto } from './dto/create-bulk-product.dto';
import { UpdateBulkProductDto } from './dto/update-bulk-product.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BulkProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBulkProductDto: CreateBulkProductDto) {
    // Validate that the related product exists
    const product = await this.prisma.product.findUnique({
      where: { id: createBulkProductDto.productId },
    });
    if (!product) {
      throw new BadRequestException(
        `Product with id ${createBulkProductDto.productId} does not exist.`,
      );
    }
    // Check if a bulk product record already exists for this product
    const existingBulkProduct = await this.prisma.bulkProduct.findUnique({
      where: { productId: createBulkProductDto.productId },
    });
    if (existingBulkProduct) {
      throw new BadRequestException(
        `Bulk product for product id ${createBulkProductDto.productId} already exists.`,
      );
    }
    return await this.prisma.bulkProduct.create({
      data: createBulkProductDto,
    });
  }

  async findAll() {
    return await this.prisma.bulkProduct.findMany({
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const bulkProduct = await this.prisma.bulkProduct.findUnique({
      where: { id },
      include: {
        product: {
          include: {
            category: true,
            brand: true,
            images: true,
          },
        },
      },
    });
    if (!bulkProduct) {
      throw new NotFoundException(`Bulk product with id ${id} not found.`);
    }
    return bulkProduct;
  }

  async update(id: string, updateBulkProductDto: UpdateBulkProductDto) {
    // Ensure the bulk product exists
    await this.findOne(id);
    return await this.prisma.bulkProduct.update({
      where: { id },
      data: updateBulkProductDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.bulkProduct.delete({
      where: { id },
    });
  }

  async findBulkProductsByCategory(options: {
    categorySlug?: string;
    page?: number;
    limit?: number;
    promotions?: number;
    brandNames?: string[];
    minPrice?: number;
    maxPrice?: number;
  }) {
    const {
      categorySlug,
      page = 0,
      limit = 10,
      brandNames,
      promotions,
      minPrice,
      maxPrice,
    } = options;
    const offset = page * limit;

    const where: Prisma.BulkProductWhereInput = {
      product: {
        ...(categorySlug && {
          category: {
            slug: categorySlug,
          },
        }),
        ...(brandNames &&
          brandNames.length > 0 && {
            brand: {
              name: {
                in: brandNames,
              },
            },
          }),
      },
      ...((minPrice !== undefined || maxPrice !== undefined) && {
        bulkPrice: {
          ...(minPrice !== undefined && { gte: minPrice }),
          ...(maxPrice !== undefined && { lte: maxPrice }),
        },
      }),
      ...(promotions !== undefined &&
        promotions > -1 && {
          discount: {
            gt: 0,
          },
        }),
    };

    const [bulkProducts, totalCount] = await this.prisma.$transaction([
      this.prisma.bulkProduct.findMany({
        where,
        skip: offset,
        take: limit,
        include: {
          product: {
            include: {
              category: true,
              brand: true,
              images: true,
            },
          },
        },
      }),
      this.prisma.bulkProduct.count({ where }),
    ]);

    return {
      bulkProducts,
      totalCount,
    };
  }
}
