import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { images, attributes, ...productData } = createProductDto;

    return this.prisma.product.create({
      data: {
        ...productData,
        images: images
          ? {
              createMany: {
                data: images,
              },
            }
          : undefined,
        attributes: attributes
          ? {
              createMany: {
                data: attributes,
              },
            }
          : undefined,
      },
      include: {
        images: true,
        attributes: true,
        category: true,
        brand: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        attributes: true,
        category: true,
        brand: true,
      },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    // Verify product exists
    await this.findOne(id);

    const { images, attributes, ...productData } = updateProductDto;

    return this.prisma.$transaction(async (prisma) => {
      // 1. First delete all existing images and attributes
      await Promise.all([
        prisma.productImage.deleteMany({ where: { productId: id } }),
        prisma.productAttribute.deleteMany({ where: { productId: id } }),
      ]);

      // 2. Update the product basic info
      await prisma.product.update({
        where: { id },
        data: productData,
      });

      // 3. Create new images if provided
      if (images && images.length > 0) {
        await prisma.productImage.createMany({
          data: images.map((img) => ({
            productId: id,
            url: img.url,
            isPrimary: img.isPrimary || false,
          })),
        });
      }

      // 4. Create new attributes if provided
      if (attributes && attributes.length > 0) {
        await prisma.productAttribute.createMany({
          data: attributes.map((attr) => ({
            productId: id,
            key: attr.key,
            value: attr.value,
          })),
        });
      }

      // 5. Return the full updated product with relations
      return prisma.product.findUnique({
        where: { id },
        include: {
          images: true,
          attributes: true,
          category: true,
          brand: true,
        },
      });
    });
  }

  async remove(id: string) {
    // Check existence before deletion
    await this.findOne(id);
    return await this.prisma.product.delete({
      where: { id },
    });
  }
  async findByDiscountAndFeatured(options: { page?: number; limit?: number }) {
    const { page = 0, limit = 10 } = options;
    const offset = page * limit;

    const [featuredProducts, discountedProducts] =
      await this.prisma.$transaction([
        this.prisma.product.findMany({
          where: {
            isFeatured: true,
          },
          skip: offset,
          take: limit,
          include: {
            category: true,
            brand: true,
            images: true,
          },
        }),
        this.prisma.product.findMany({
          where: {
            discount: {
              gt: 0, // greater than 0
            },
          },
          skip: offset,
          take: limit,
          include: {
            category: true,
            brand: true,
            images: true,
          },
        }),
      ]);

    return {
      featuredProducts, // Return featured products
      discountedProducts, // Return discounted products
    };
  }

  // Find products by category name with pagination, optional brand name, and price range filters
  async findByCategory(options: {
    categorySlug?: string;
    page?: number;
    limit?: number;
    brandNames?: string[];
    minPrice?: number;
    maxPrice?: number;
  }) {
    const {
      categorySlug,
      page = 0,
      limit = 10,
      brandNames,
      minPrice,
      maxPrice,
    } = options;
    const offset = page * limit;

    const where: Prisma.ProductWhereInput = {
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
      ...((minPrice !== undefined || maxPrice !== undefined) && {
        price: {
          ...(minPrice !== undefined && { gte: minPrice }),
          ...(maxPrice !== undefined && { lte: maxPrice }),
        },
      }),
    };

    const [products, totalCount] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip: offset,
        take: limit,
        include: {
          category: true,
          brand: true,
          images: true,
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      products,
      totalCount,
    };
  }
  /* async getFilterOptions(categorySlug: string) {
    const [brands, priceAggregates] = await Promise.all([
      this.prisma.product.findMany({
        where: {
          category: {
            slug: categorySlug,
          },
        },
        include: {
          brand: true,
        },
      }),
      this.prisma.product.aggregate({
        where: {
          category: {
            slug: categorySlug,
          },
        },
        _min: {
          price: true,
        },
        _max: {
          price: true,
        },
      }),
    ]);

    return {
      brands: brands.map((item) => item.brand),
      priceRange: {
        minPrice: priceAggregates._min.price || 0,
        maxPrice: priceAggregates._max.price || 10000,
      },
    };
  } */
  async getFilterOptions(categorySlug: string) {
    // Get distinct brands first
    const brands = await this.prisma.brand.findMany({
      where: {
        products: {
          some: {
            category: {
              slug: categorySlug,
            },
          },
        },
      },
      include: {
        _count: {
          select: {
            products: {
              where: {
                category: {
                  slug: categorySlug,
                },
              },
            },
          },
        },
      },
    });

    // Get price range
    const priceAggregates = await this.prisma.product.aggregate({
      where: {
        category: {
          slug: categorySlug,
        },
      },
      _min: {
        price: true,
      },
      _max: {
        price: true,
      },
    });

    return {
      brands: brands.map((brand) => ({
        id: brand.id,
        name: brand.name,
        productCount: brand._count.products,
      })),
      priceRange: {
        minPrice: priceAggregates._min.price || 0,
        maxPrice: priceAggregates._max.price || 10000,
      },
    };
  }
}
