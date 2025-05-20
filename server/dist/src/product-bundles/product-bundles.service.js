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
exports.ProductBundlesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductBundlesService = class ProductBundlesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductBundleDto) {
        for (const item of createProductBundleDto.products) {
            const productExists = await this.prisma.product.findUnique({
                where: { id: item.productId },
            });
            if (!productExists) {
                throw new common_1.BadRequestException(`Product with id ${item.productId} does not exist.`);
            }
        }
        try {
            return await this.prisma.productBundle.create({
                data: {
                    name: createProductBundleDto.name,
                    discount: createProductBundleDto.discount,
                    img: createProductBundleDto.img,
                    expiresAt: createProductBundleDto.expiresAt
                        ? new Date(createProductBundleDto.expiresAt)
                        : null,
                    products: {
                        create: createProductBundleDto.products.map((item) => ({
                            product: { connect: { id: item.productId } },
                            quantity: item.quantity,
                        })),
                    },
                },
                include: { products: true },
            });
        }
        catch (error) {
            if (error.code === 'P2003') {
                throw new common_1.BadRequestException('Foreign key constraint violated. Ensure all product IDs are valid.');
            }
            throw error;
        }
    }
    async findAll() {
        return await this.prisma.productBundle.findMany({
            orderBy: { createdAt: 'desc' },
            include: { products: true },
        });
    }
    async findOne(id) {
        const bundle = await this.prisma.productBundle.findUnique({
            where: { id },
            include: { products: true },
        });
        if (!bundle) {
            throw new common_1.NotFoundException(`Product bundle with id ${id} not found`);
        }
        return bundle;
    }
    async update(id, updateProductBundleDto) {
        await this.findOne(id);
        return await this.prisma.productBundle.update({
            where: { id },
            data: {
                name: updateProductBundleDto.name,
                discount: updateProductBundleDto.discount,
                expiresAt: updateProductBundleDto.expiresAt
                    ? new Date(updateProductBundleDto.expiresAt)
                    : undefined,
            },
            include: { products: true },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return await this.prisma.productBundle.delete({
            where: { id },
        });
    }
};
exports.ProductBundlesService = ProductBundlesService;
exports.ProductBundlesService = ProductBundlesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductBundlesService);
//# sourceMappingURL=product-bundles.service.js.map