import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpStatus,
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

    // Validate cities exist
    if (
      createBulkProductDto.bulkProductCities &&
      createBulkProductDto.bulkProductCities.length > 0
    ) {
      const cityIds = createBulkProductDto.bulkProductCities.map(
        (city) => city.cityId,
      );
      const cities = await this.prisma.city.findMany({
        where: { id: { in: cityIds } },
      });

      if (cities.length !== cityIds.length) {
        const foundCityIds = cities.map((city) => city.id);
        const missingCityIds = cityIds.filter(
          (id) => !foundCityIds.includes(id),
        );
        throw new BadRequestException(
          `Cities with ids ${missingCityIds.join(', ')} do not exist.`,
        );
      }
    }

    // Check if a bulk product record already exists for this product
    const existingBulkProduct = await this.prisma.bulkProduct.findFirst({
      where: { productId: createBulkProductDto.productId },
    });

    if (existingBulkProduct) {
      throw new BadRequestException(
        `Bulk product for product id ${createBulkProductDto.productId} already exists.`,
      );
    }

    // Create bulk product with cities
    return await this.prisma.bulkProduct.create({
      data: {
        name: createBulkProductDto.name,
        productId: createBulkProductDto.productId,
        bulkPrice: createBulkProductDto.bulkPrice,
        minQuantity: createBulkProductDto.minQuantity,
        discount: createBulkProductDto.discount || 0,
        bulkProductCities: {
          create: createBulkProductDto.bulkProductCities.map((city) => ({
            cityId: city.cityId,
          })),
        },
      },
      include: {
        product: true,
        bulkProductCities: {
          include: {
            city: true,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.bulkProduct.findMany({
      include: {
        product: true,
        bulkProductCities: {
          include: {
            city: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const bulkProduct = await this.prisma.bulkProduct.findUnique({
      where: { id },
      include: {
        product: {
          include: {
            images: true,
            attributes: true,
            category: true,
            brand: true,
          },
        },
        bulkProductCities: {
          include: {
            city: true,
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

    // Validate cities if provided
    if (
      updateBulkProductDto.bulkProductCities &&
      updateBulkProductDto.bulkProductCities.length > 0
    ) {
      const cityIds = updateBulkProductDto.bulkProductCities.map(
        (city) => city.cityId,
      );
      const cities = await this.prisma.city.findMany({
        where: { id: { in: cityIds } },
      });

      if (cities.length !== cityIds.length) {
        const foundCityIds = cities.map((city) => city.id);
        const missingCityIds = cityIds.filter(
          (id) => !foundCityIds.includes(id),
        );
        throw new BadRequestException(
          `Cities with ids ${missingCityIds.join(', ')} do not exist.`,
        );
      }
    }

    // Start a transaction to update bulk product and its cities
    return await this.prisma.$transaction(async (prisma) => {
      // Update bulk product
      const updatedBulkProduct = await prisma.bulkProduct.update({
        where: { id },
        data: {
          name: updateBulkProductDto.name,
          productId: updateBulkProductDto.productId,
          bulkPrice: updateBulkProductDto.bulkPrice,
          minQuantity: updateBulkProductDto.minQuantity,
          discount: updateBulkProductDto.discount,
        },
      });

      // If cities are provided, update the relations
      if (updateBulkProductDto.bulkProductCities) {
        // Delete existing city relations
        await prisma.bulkProductCity.deleteMany({
          where: { productId: id },
        });

        // Create new city relations
        if (updateBulkProductDto.bulkProductCities.length > 0) {
          await prisma.bulkProductCity.createMany({
            data: updateBulkProductDto.bulkProductCities.map((city) => ({
              productId: id,
              cityId: city.cityId,
            })),
          });
        }
      }

      // Return the updated bulk product with its cities
      return await prisma.bulkProduct.findUnique({
        where: { id },
        include: {
          product: true,
          bulkProductCities: {
            include: {
              city: true,
            },
          },
        },
      });
    });
  }

  async remove(id: string) {
    // Start a transaction to delete bulk product and its cities
    return await this.prisma.$transaction(async (prisma) => {
      // Delete related cities first
      await prisma.bulkProductCity.deleteMany({
        where: { productId: id },
      });

      // Delete the bulk product
      return await prisma.bulkProduct.delete({
        where: { id },
      });
    });
  }

  async findBulkProductsByCategory(options: {
    categorySlug?: string[];
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
      isActive: true,
      product: {
        ...(categorySlug &&
          categorySlug.length > 0 && {
            category: {
              slug: {
                in: categorySlug,
              },
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
          bulkProductCities: {
            include: {
              city: true,
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

  async toggleStatus(id: string) {
    try {
      const bulkProduct = await this.prisma.bulkProduct.findUnique({
        where: { id },
      });

      if (!bulkProduct) {
        return { success: false, status: HttpStatus.NOT_FOUND };
      }

      const updatedBulkProduct = await this.prisma.bulkProduct.update({
        where: { id },
        data: { isActive: !bulkProduct.isActive },
      });

      return {
        success: true,
        status: HttpStatus.OK,
        isActive: updatedBulkProduct.isActive,
      };
    } catch (error) {
      return { success: false, status: HttpStatus.FORBIDDEN };
    }
  }
}
