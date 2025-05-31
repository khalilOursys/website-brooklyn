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
exports.ProductSearchService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let ProductSearchService = class ProductSearchService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async searchProducts(query) {
        const where = {};
        if (query.searchTerm) {
            where.OR = [
                { name: { contains: query.searchTerm, mode: 'insensitive' } },
                { description: { contains: query.searchTerm, mode: 'insensitive' } },
            ];
        }
        if (query.categoryId) {
            where.categoryId = query.categoryId;
        }
        if (query.brandId) {
            where.brandId = query.brandId;
        }
        if (query.minPrice !== undefined || query.maxPrice !== undefined) {
            where.price = {};
            if (query.minPrice !== undefined) {
                where.price.gte = query.minPrice;
            }
            if (query.maxPrice !== undefined) {
                where.price.lte = query.maxPrice;
            }
        }
        if (query.isFeatured !== undefined) {
            where.isFeatured = query.isFeatured;
        }
        return await this.prisma.product.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                images: true,
                attributes: true,
                category: true,
                brand: true,
            },
        });
    }
};
exports.ProductSearchService = ProductSearchService;
exports.ProductSearchService = ProductSearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductSearchService);
//# sourceMappingURL=product-search.service.js.map