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
exports.ProductTranslationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductTranslationsService = class ProductTranslationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductTranslationDto) {
        const product = await this.prisma.product.findUnique({
            where: { id: createProductTranslationDto.productId },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${createProductTranslationDto.productId} not found`);
        }
        return await this.prisma.productTranslation.create({
            data: {
                ...createProductTranslationDto,
            },
        });
    }
    async findAll(productId) {
        const filter = productId ? { productId } : {};
        return await this.prisma.productTranslation.findMany({
            where: filter,
        });
    }
    async findOne(id) {
        const translation = await this.prisma.productTranslation.findUnique({ where: { id } });
        if (!translation) {
            throw new common_1.NotFoundException(`Product translation with id ${id} not found`);
        }
        return translation;
    }
    async update(id, updateProductTranslationDto) {
        await this.findOne(id);
        return await this.prisma.productTranslation.update({
            where: { id },
            data: updateProductTranslationDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return await this.prisma.productTranslation.delete({
            where: { id },
        });
    }
};
exports.ProductTranslationsService = ProductTranslationsService;
exports.ProductTranslationsService = ProductTranslationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductTranslationsService);
//# sourceMappingURL=product-translations.service.js.map