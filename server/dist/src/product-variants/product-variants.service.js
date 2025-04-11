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
        const product = await this.prisma.product.findUnique({
            where: { id: createProductVariantDto.productId },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${createProductVariantDto.productId} not found`);
        }
        return await this.prisma.productVariant.create({
            data: {
                ...createProductVariantDto,
            },
        });
    }
    async findAll(productId) {
        const filter = productId ? { productId } : {};
        return await this.prisma.productVariant.findMany({
            where: filter,
            orderBy: { id: 'asc' },
        });
    }
    async findOne(id) {
        const variant = await this.prisma.productVariant.findUnique({ where: { id } });
        if (!variant) {
            throw new common_1.NotFoundException(`Product variant with id ${id} not found`);
        }
        return variant;
    }
    async update(id, updateProductVariantDto) {
        await this.findOne(id);
        return await this.prisma.productVariant.update({
            where: { id },
            data: updateProductVariantDto,
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