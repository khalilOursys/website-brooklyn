"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto) {
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
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                images: true,
                attributes: true,
                category: true,
                brand: true,
                variants: true,
            },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }
    async update(id, updateProductDto) {
        await this.findOne(id);
        const { images, attributes, ...productData } = updateProductDto;
        return this.prisma.$transaction(async (prisma) => {
            await Promise.all([
                prisma.productImage.deleteMany({ where: { productId: id } }),
                prisma.productAttribute.deleteMany({ where: { productId: id } }),
            ]);
            await prisma.product.update({
                where: { id },
                data: productData,
            });
            if (images && images.length > 0) {
                await prisma.productImage.createMany({
                    data: images.map((img) => ({
                        productId: id,
                        url: img.url,
                        isPrimary: img.isPrimary || false,
                    })),
                });
            }
            if (attributes && attributes.length > 0) {
                await prisma.productAttribute.createMany({
                    data: attributes.map((attr) => ({
                        productId: id,
                        key: attr.key,
                        value: attr.value,
                    })),
                });
            }
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
    async remove(id) {
        await this.findOne(id);
        return await this.prisma.product.delete({
            where: { id },
        });
    }
    async findByDiscountAndFeatured(options) {
        const { page = 0, limit = 10 } = options;
        const offset = page * limit;
        const [featuredProducts, discountedProducts] = await this.prisma.$transaction([
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
                        gt: 0,
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
            featuredProducts,
            discountedProducts,
        };
    }
    async findByCategory(options) {
        const { categorySlug, page = 0, limit = 10, brandNames, promotions, minPrice, maxPrice, } = options;
        const offset = page * limit;
        const where = {
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
                    {
                        discount: {
                            gt: 0,
                            ...(minPrice !== undefined && { gte: minPrice }),
                            ...(maxPrice !== undefined && { lte: maxPrice }),
                        },
                    },
                    {
                        discount: 0,
                        price: {
                            ...(minPrice !== undefined && { gte: minPrice }),
                            ...(maxPrice !== undefined && { lte: maxPrice }),
                        },
                    },
                ],
            }),
            ...(promotions !== undefined &&
                promotions > -1 && {
                discount: {
                    gt: 0,
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
    async getFilterOptions(categorySlug) {
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
                                ],
                            },
                        },
                    },
                },
            },
        });
        if (categorySlug === 'bulkproduct') {
            const priceAggregates = await this.prisma.$queryRaw `
    SELECT 
      MIN(LEAST(COALESCE(bp."bulkPrice"))) as minPrice,
      MAX(GREATEST(COALESCE(bp."bulkPrice"))) as maxPrice
    FROM "Product" p
    LEFT JOIN "BulkProduct" bp ON p.id = bp."productId"
    JOIN "Category" c ON p."categoryId" = c.id
  `;
            const brandAggregates = await this.prisma.$queryRaw `
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
                    productCount: Number(brand.productCount),
                })),
                priceRange: {
                    minPrice: priceAggregates[0].minprice || 0,
                    maxPrice: priceAggregates[0].maxprice || 10000,
                },
            };
        }
        const priceAggregates = await this.prisma.$queryRaw `
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
    async getFilterOptionsParent(categorySlug) {
        const categoryWithParent = await this.prisma.category.findFirst({
            where: { slug: categorySlug },
            include: {
                parent: true,
            },
        });
        const filterCategoryId = categoryWithParent?.parent?.id || categoryWithParent?.id;
        if (!filterCategoryId) {
            return {
                brands: [],
                priceRange: { minPrice: 0, maxPrice: 10000 },
            };
        }
        const brands = await this.prisma.brand.findMany({
            where: {
                OR: [
                    {
                        products: {
                            some: {
                                isActive: true,
                                category: {
                                    OR: [
                                        { id: filterCategoryId },
                                        { parentId: filterCategoryId },
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
                                        { id: filterCategoryId },
                                        { parentId: filterCategoryId },
                                    ],
                                },
                            },
                        },
                    },
                },
            },
        });
        const priceAggregates = await this.prisma.$queryRaw `
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
        const brands = await this.prisma.brand.findMany({
            where: {
                products: {
                    some: {
                        isActive: true,
                        discount: { gt: 0 },
                    },
                },
            },
            include: {
                _count: {
                    select: {
                        products: {
                            where: {
                                isActive: true,
                                discount: { gt: 0 },
                            },
                        },
                    },
                },
            },
        });
        const priceAggregates = await this.prisma.product.aggregate({
            where: {
                isActive: true,
                discount: { gt: 0 },
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
    async findByCategoryParent(options) {
        const { parentCategorySlug, page = 0, limit = 10, brandNames, minPrice, maxPrice, } = options;
        const offset = page * limit;
        const where = {
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
    async toggleStatus(id) {
        try {
            const product = await this.prisma.product.findUnique({ where: { id } });
            if (!product) {
                return { success: false, status: common_1.HttpStatus.NOT_FOUND };
            }
            const updatedProduct = await this.prisma.product.update({
                where: { id },
                data: { isActive: !product.isActive },
            });
            return {
                success: true,
                status: common_1.HttpStatus.OK,
                isActive: updatedProduct.isActive,
            };
        }
        catch (error) {
            return { success: false, status: common_1.HttpStatus.FORBIDDEN };
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map