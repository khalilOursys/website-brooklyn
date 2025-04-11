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
exports.ProductRatingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductRatingsService = class ProductRatingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductRatingDto) {
        const product = await this.prisma.product.findUnique({
            where: { id: createProductRatingDto.productId },
        });
        if (!product) {
            throw new common_1.BadRequestException(`Product with id ${createProductRatingDto.productId} does not exist.`);
        }
        const user = await this.prisma.user.findUnique({
            where: { id: createProductRatingDto.userId },
        });
        if (!user) {
            throw new common_1.BadRequestException(`User with id ${createProductRatingDto.userId} does not exist.`);
        }
        const existingRating = await this.prisma.productRating.findUnique({
            where: {
                productId_userId: {
                    productId: createProductRatingDto.productId,
                    userId: createProductRatingDto.userId,
                },
            },
        });
        if (existingRating) {
            throw new common_1.BadRequestException(`User has already rated this product.`);
        }
        return await this.prisma.productRating.create({
            data: {
                productId: createProductRatingDto.productId,
                userId: createProductRatingDto.userId,
                rating: createProductRatingDto.rating,
                comment: createProductRatingDto.comment,
            },
        });
    }
    async findAll(productId) {
        const filter = productId ? { productId } : {};
        return await this.prisma.productRating.findMany({
            where: filter,
            orderBy: { createdAt: 'desc' },
            include: { user: true },
        });
    }
    async findOne(id) {
        const rating = await this.prisma.productRating.findUnique({ where: { id } });
        if (!rating) {
            throw new common_1.NotFoundException(`Product rating with id ${id} not found.`);
        }
        return rating;
    }
    async update(id, updateProductRatingDto) {
        await this.findOne(id);
        return await this.prisma.productRating.update({
            where: { id },
            data: updateProductRatingDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return await this.prisma.productRating.delete({
            where: { id },
        });
    }
};
exports.ProductRatingsService = ProductRatingsService;
exports.ProductRatingsService = ProductRatingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductRatingsService);
//# sourceMappingURL=product-ratings.service.js.map