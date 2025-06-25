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
exports.ProductVariantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductVariantsService = class ProductVariantsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductVariantDto) {
        const { images, productId, ...variantData } = createProductVariantDto;
        const productExists = await this.prisma.product.count({
            where: { id: productId },
        });
        if (!productExists) {
            throw new common_1.NotFoundException(`Product with id ${productId} not found`);
        }
        return this.prisma.productVariant.create({
            data: {
                ...variantData,
                productId,
                images: images
                    ? {
                        createMany: {
                            data: images.map((img) => ({
                                url: img.url,
                                isPrimary: img.isPrimary || false,
                            })),
                        },
                    }
                    : undefined,
            },
            include: {
                images: true,
                product: {
                    include: {
                        category: true,
                        brand: true,
                    },
                },
            },
        });
    }
    async findAll(productId) {
        return await this.prisma.productVariant.findMany({
            include: {
                images: true,
                product: {
                    include: {
                        category: true,
                        brand: true,
                    },
                },
            },
            orderBy: { id: 'asc' },
        });
    }
    async findOne(id) {
        const variant = await this.prisma.productVariant.findUnique({
            where: { id },
            include: {
                images: true,
                product: {
                    include: {
                        category: true,
                        brand: true,
                    },
                },
            },
        });
        if (!variant) {
            throw new common_1.NotFoundException(`Product variant with id ${id} not found`);
        }
        return variant;
    }
    async update(id, updateProductVariantDto) {
        const { images, productId, ...variantData } = updateProductVariantDto;
        return this.prisma.$transaction(async (prisma) => {
            await Promise.all([
                prisma.productImage.deleteMany({ where: { variantId: id } }),
            ]);
            await prisma.productVariant.update({
                where: { id },
                data: variantData,
            });
            if (images && images.length > 0) {
                await prisma.productImage.createMany({
                    data: images.map((img) => ({
                        variantId: id,
                        url: img.url,
                        isPrimary: img.isPrimary || false,
                    })),
                });
            }
            return prisma.productVariant.findUnique({
                where: { id },
                include: {
                    images: true,
                    product: {
                        include: {
                            category: true,
                            brand: true,
                        },
                    },
                },
            });
        });
    }
    async remove(id) {
        await this.findOne(id);
        return await this.prisma.productVariant.delete({
            where: { id },
        });
    }
};
exports.ProductVariantsService = ProductVariantsService;
exports.ProductVariantsService = ProductVariantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductVariantsService);
//# sourceMappingURL=product-variants.service.js.map