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
exports.ProductRecommendationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductRecommendationsService = class ProductRecommendationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getRecommendations(productId) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: { similar: true },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${productId} not found`);
        }
        return product.similar;
    }
};
exports.ProductRecommendationsService = ProductRecommendationsService;
exports.ProductRecommendationsService = ProductRecommendationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductRecommendationsService);
//# sourceMappingURL=product-recommendations.service.js.map