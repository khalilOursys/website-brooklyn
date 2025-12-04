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
exports.BulkProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let BulkProductsService = class BulkProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBulkProductDto) {
        const product = await this.prisma.product.findUnique({
            where: { id: createBulkProductDto.productId },
        });
        if (!product) {
            throw new common_1.BadRequestException(`Product with id ${createBulkProductDto.productId} does not exist.`);
        }
        if (createBulkProductDto.bulkProductCities &&
            createBulkProductDto.bulkProductCities.length > 0) {
            const cityIds = createBulkProductDto.bulkProductCities.map((city) => city.cityId);
            const cities = await this.prisma.city.findMany({
                where: { id: { in: cityIds } },
            });
            if (cities.length !== cityIds.length) {
                const foundCityIds = cities.map((city) => city.id);
                const missingCityIds = cityIds.filter((id) => !foundCityIds.includes(id));
                throw new common_1.BadRequestException(`Cities with ids ${missingCityIds.join(', ')} do not exist.`);
            }
        }
        const existingBulkProduct = await this.prisma.bulkProduct.findFirst({
            where: { productId: createBulkProductDto.productId },
        });
        if (existingBulkProduct) {
            throw new common_1.BadRequestException(`Bulk product for product id ${createBulkProductDto.productId} already exists.`);
        }
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
    async findOne(id) {
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
            throw new common_1.NotFoundException(`Bulk product with id ${id} not found.`);
        }
        return bulkProduct;
    }
    async update(id, updateBulkProductDto) {
        await this.findOne(id);
        if (updateBulkProductDto.bulkProductCities &&
            updateBulkProductDto.bulkProductCities.length > 0) {
            const cityIds = updateBulkProductDto.bulkProductCities.map((city) => city.cityId);
            const cities = await this.prisma.city.findMany({
                where: { id: { in: cityIds } },
            });
            if (cities.length !== cityIds.length) {
                const foundCityIds = cities.map((city) => city.id);
                const missingCityIds = cityIds.filter((id) => !foundCityIds.includes(id));
                throw new common_1.BadRequestException(`Cities with ids ${missingCityIds.join(', ')} do not exist.`);
            }
        }
        return await this.prisma.$transaction(async (prisma) => {
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
            if (updateBulkProductDto.bulkProductCities) {
                await prisma.bulkProductCity.deleteMany({
                    where: { productId: id },
                });
                if (updateBulkProductDto.bulkProductCities.length > 0) {
                    await prisma.bulkProductCity.createMany({
                        data: updateBulkProductDto.bulkProductCities.map((city) => ({
                            productId: id,
                            cityId: city.cityId,
                        })),
                    });
                }
            }
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
    async remove(id) {
        return await this.prisma.$transaction(async (prisma) => {
            await prisma.bulkProductCity.deleteMany({
                where: { productId: id },
            });
            return await prisma.bulkProduct.delete({
                where: { id },
            });
        });
    }
    async findBulkProductsByCategory(options) {
        const { categorySlug, page = 0, limit = 10, brandNames, promotions, minPrice, maxPrice, } = options;
        const offset = page * limit;
        const where = {
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
    async toggleStatus(id) {
        try {
            const bulkProduct = await this.prisma.bulkProduct.findUnique({
                where: { id },
            });
            if (!bulkProduct) {
                return { success: false, status: common_1.HttpStatus.NOT_FOUND };
            }
            const updatedBulkProduct = await this.prisma.bulkProduct.update({
                where: { id },
                data: { isActive: !bulkProduct.isActive },
            });
            return {
                success: true,
                status: common_1.HttpStatus.OK,
                isActive: updatedBulkProduct.isActive,
            };
        }
        catch (error) {
            return { success: false, status: common_1.HttpStatus.FORBIDDEN };
        }
    }
};
exports.BulkProductsService = BulkProductsService;
exports.BulkProductsService = BulkProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BulkProductsService);
//# sourceMappingURL=bulk-products.service.js.map