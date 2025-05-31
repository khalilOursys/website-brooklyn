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
      include: {
        images: true,
        attributes: true,
        category: true,
        brand: true,
      },
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
      // Add promotion filter if promotions > 0
      ...(promotions !== undefined &&
        promotions > -1 && {
          discount: {
            gt: 0, // This will filter products where promotions > 0
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
          attributes: true,
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
    // Get distinct brands (including those with bulk products)
    const brands = await this.prisma.brand.findMany({
      where: {
        OR: [
          {
            products: {
              some: {
                category: {
                  slug: categorySlug,
                },
              },
            },
          },
          {
            products: {
              some: {
                bulkProduct: {
                  isNot: null,
                },
              },
            },
          },
        ],
      },
      include: {
        _count: {
          select: {
            products: {
              where: {
                OR: [
                  {
                    category: {
                      slug: categorySlug,
                    },
                  },
                  {
                    bulkProduct: {
                      isNot: null,
                    },
                  },
                ],
              },
            },
          },
        },
      },
    });

    // Get price range (including bulk prices)
    if (categorySlug === 'bulkproduct') {
      const priceAggregates = await this.prisma.$queryRaw<
        {
          minprice: number;
          maxprice: number;
        }[]
      >`
        SELECT 
          MIN(LEAST(COALESCE(bp."bulkPrice"))) as minPrice,
          MAX(GREATEST(COALESCE(bp."bulkPrice"))) as maxPrice
        FROM "Product" p
        LEFT JOIN "BulkProduct" bp ON p.id = bp."productId"
        JOIN "Category" c ON p."categoryId" = c.id
      `;

      return {
        brands: brands.map((brand) => ({
          id: brand.id,
          name: brand.name,
          productCount: brand._count.products,
        })),
        priceRange: {
          minPrice: priceAggregates[0].minprice || 0,
          maxPrice: priceAggregates[0].maxprice || 10000,
        },
      };
    }
    const priceAggregates = await this.prisma.$queryRaw<
      {
        minprice: number;
        maxprice: number;
      }[]
    >`
    SELECT 
      MIN(LEAST(p.price, COALESCE(bp."bulkPrice", p.price))) as minPrice,
      MAX(GREATEST(p.price, COALESCE(bp."bulkPrice", p.price))) as maxPrice
    FROM "Product" p
    LEFT JOIN "BulkProduct" bp ON p.id = bp."productId"
    JOIN "Category" c ON p."categoryId" = c.id
    WHERE c.slug = ${categorySlug}
  `;

    return {
      brands: brands.map((brand) => ({
        id: brand.id,
        name: brand.name,
        productCount: brand._count.products,
      })),
      priceRange: {
        minPrice: priceAggregates[0].minprice || 0,
        maxPrice: priceAggregates[0].maxprice || 10000,
      },
    };
  }

  async getFilterOptionsPromotion() {
    // Get distinct brands that have products with discount > 0
    const brands = await this.prisma.brand.findMany({
      where: {
        products: {
          some: {
            discount: { gt: 0 }, // Only products with actual discounts
          },
        },
      },
      include: {
        _count: {
          select: {
            products: {
              where: {
                discount: { gt: 0 }, // Count only discounted products
              },
            },
          },
        },
      },
    });

    // Get price range for discounted products only
    const priceAggregates = await this.prisma.product.aggregate({
      where: {
        discount: { gt: 0 }, // Only consider products with discount > 0
      },
      _min: {
        price: true,
        discount: true,
      },
      _max: {
        price: true,
        discount: true,
      },
      _avg: {
        discount: true,
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
      discountInfo: {
        minDiscount: priceAggregates._min.discount || 0,
        maxDiscount: priceAggregates._max.discount || 0,
        avgDiscount: priceAggregates._avg.discount || 0,
      },
    };
  }
}
