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
        const { categorySlug, page = 0, limit = 10, brandNames, minPrice, maxPrice, } = options;
        const offset = page * limit;
        const where = {
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
    async getFilterOptions(categorySlug) {
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
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map