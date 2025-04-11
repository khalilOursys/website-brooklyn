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
exports.ProductAttributesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductAttributesService = class ProductAttributesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductAttributeDto) {
        const product = await this.prisma.product.findUnique({
            where: { id: createProductAttributeDto.productId },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${createProductAttributeDto.productId} not found`);
        }
        return await this.prisma.productAttribute.create({
            data: {
                ...createProductAttributeDto,
            },
        });
    }
    async findAll(productId) {
        const filter = productId ? { productId } : {};
        return await this.prisma.productAttribute.findMany({
            where: filter,
        });
    }
    async findOne(id) {
        const attribute = await this.prisma.productAttribute.findUnique({ where: { id } });
        if (!attribute) {
            throw new common_1.NotFoundException(`Product attribute with id ${id} not found`);
        }
        return attribute;
    }
    async update(id, updateProductAttributeDto) {
        await this.findOne(id);
        return await this.prisma.productAttribute.update({
            where: { id },
            data: updateProductAttributeDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return await this.prisma.productAttribute.delete({
            where: { id },
        });
    }
};
exports.ProductAttributesService = ProductAttributesService;
exports.ProductAttributesService = ProductAttributesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductAttributesService);
//# sourceMappingURL=product-attributes.service.js.map