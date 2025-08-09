import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpStatus,
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
        variants: {
          include: {
            images: true, // Include images for each variant
            product: true,
          },
        },
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
            isActive: true,
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
            isActive: true,
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
      isActive: true,
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
        OR: [
          // Case 1: Products with discount > 0 - filter on discount amount
          {
            discount: {
              gt: 0,
              ...(minPrice !== undefined && { gte: minPrice }),
              ...(maxPrice !== undefined && { lte: maxPrice }),
            },
          },
          // Case 2: Products with no discount - filter on regular price
          {
            discount: 0,
            price: {
              ...(minPrice !== undefined && { gte: minPrice }),
              ...(maxPrice !== undefined && { lte: maxPrice }),
            },
          },
        ],
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
                isActive: true,
                category: {
                  slug: categorySlug,
                },
              },
            },
          },
          /* {
            products: {
              some: {
                bulkProduct: {
                  isNot: null,
                },
              },
            },
          }, */
        ],
      },
      include: {
        _count: {
          select: {
            products: {
              where: {
                isActive: true,
                OR: [
                  {
                    category: {
                      slug: categorySlug,
                    },
                  },
                  /* {
                    bulkProduct: {
                      isNot: null,
                    },
                  }, */
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

      // Get brand aggregates with counts
      const brandAggregates = await this.prisma.$queryRaw<
        {
          brandId: string;
          brandName: string;
          productCount: number;
        }[]
      >`
    SELECT 
      b.id as "brandId",
      b.name as "brandName",
      COUNT(bp.id) as "productCount"
    FROM "Product" p
    JOIN "BulkProduct" bp ON p.id = bp."productId"
    JOIN "Brand" b ON p."brandId" = b.id
    GROUP BY b.id, b.name
  `;

      const products = await this.prisma.product.findMany({
        where: {
          bulkProduct: {
            some: {},
          },
        },
        include: {
          _count: {
            select: {
              bulkProduct: true,
            },
          },
          category: true,
          brand: true,
        },
      });

      return {
        brands: brandAggregates.map((brand) => ({
          id: brand.brandId,
          name: brand.brandName,
          productCount: Number(brand.productCount), // Convert BigInt to Number if needed
        })),
        priceRange: {
          minPrice: priceAggregates[0].minprice || 0,
          maxPrice: priceAggregates[0].maxprice || 10000,
        },
      };
    }

    /* const priceAggregates = await this.prisma.$queryRaw<
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
  `; */
    const priceAggregates = await this.prisma.$queryRaw<
      {
        minprice: number;
        maxprice: number;
      }[]
    >`
    SELECT 
    MIN(LEAST(COALESCE(p.price))) as minPrice,
    MAX(GREATEST(COALESCE(p.price))) as maxPrice
    FROM "Product" p
    JOIN "Category" c ON p."categoryId" = c.id
    WHERE c.slug = ${categorySlug} and p."isActive"= true
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

  async getFilterOptionsParent(categorySlug: string) {
    // First, find the parent category of the specified category
    const categoryWithParent = await this.prisma.category.findFirst({
      where: { slug: categorySlug },
      include: {
        parent: true,
      },
    });

    // Determine which category to filter by
    const filterCategoryId =
      categoryWithParent?.parent?.id || categoryWithParent?.id;

    if (!filterCategoryId) {
      return {
        brands: [],
        priceRange: { minPrice: 0, maxPrice: 10000 },
      };
    }

    // Get distinct brands (including those with bulk products)
    const brands = await this.prisma.brand.findMany({
      where: {
        OR: [
          {
            products: {
              some: {
                isActive: true,
                category: {
                  OR: [
                    { id: filterCategoryId }, // Parent category
                    { parentId: filterCategoryId }, // Direct children of parent
                  ],
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
                isActive: true,
                category: {
                  OR: [
                    { id: filterCategoryId }, // Parent category
                    { parentId: filterCategoryId }, // Direct children of parent
                  ],
                },
              },
            },
          },
        },
      },
    });

    const priceAggregates = await this.prisma.$queryRaw<
      {
        minprice: number;
        maxprice: number;
      }[]
    >`
      SELECT 
        MIN(LEAST(COALESCE(p.price))) as minPrice,
        MAX(GREATEST(COALESCE(p.price))) as maxPrice
      FROM "Product" p
      JOIN "Category" c ON p."categoryId" = c.id
      WHERE (c.id = ${filterCategoryId} OR c."parentId" = ${filterCategoryId})
        AND p."isActive" = true
    `;

    return {
      brands: brands.map((brand) => ({
        id: brand.id,
        name: brand.name,
        productCount: brand._count.products,
      })),
      priceRange: {
        minPrice: priceAggregates[0]?.minprice || 0,
        maxPrice: priceAggregates[0]?.maxprice || 10000,
      },
    };
  }
  async getFilterOptionsPromotion() {
    // Get distinct brands that have products with discount > 0
    const brands = await this.prisma.brand.findMany({
      where: {
        products: {
          some: {
            isActive: true,
            discount: { gt: 0 }, // Only products with actual discounts
          },
        },
      },
      include: {
        _count: {
          select: {
            products: {
              where: {
                isActive: true,
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
        isActive: true,
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
  async findByCategoryParent(options: {
    parentCategorySlug?: string; // Add new parameter for parent category slug
    page?: number;
    limit?: number;
    brandNames?: string[];
    minPrice?: number;
    maxPrice?: number;
  }) {
    const {
      parentCategorySlug, // Destructure the new parameter
      page = 0,
      limit = 10,
      brandNames,
      minPrice,
      maxPrice,
    } = options;
    const offset = page * limit;

    const where: Prisma.ProductWhereInput = {
      // Add parent category filter
      ...(parentCategorySlug && {
        category: {
          parent: {
            slug: parentCategorySlug,
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

  async toggleStatus(id: string) {
    try {
      const product = await this.prisma.product.findUnique({ where: { id } });

      if (!product) {
        return { success: false, status: HttpStatus.NOT_FOUND };
      }

      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: { isActive: !product.isActive },
      });

      return {
        success: true,
        status: HttpStatus.OK,
        isActive: updatedProduct.isActive, // Return new status
      };
    } catch (error) {
      return { success: false, status: HttpStatus.FORBIDDEN };
    }
  }
}
