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
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let WishlistService = class WishlistService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addWishlist(createWishlistDto) {
        const existing = await this.prisma.wishlist.findUnique({
            where: {
                userId_productId: {
                    userId: createWishlistDto.userId,
                    productId: createWishlistDto.productId,
                },
            },
        });
        if (existing) {
            throw new common_1.BadRequestException('This product is already in the wishlist.');
        }
        return await this.prisma.wishlist.create({
            data: {
                userId: createWishlistDto.userId,
                productId: createWishlistDto.productId,
            },
        });
    }
    async findByUser(userId) {
        return await this.prisma.wishlist.findMany({
            where: { userId },
            include: { product: true },
            orderBy: { addedAt: 'desc' },
        });
    }
    async removeWishlist(id) {
        const wishlistItem = await this.prisma.wishlist.findUnique({ where: { id } });
        if (!wishlistItem) {
            throw new common_1.NotFoundException(`Wishlist item with id ${id} not found.`);
        }
        return await this.prisma.wishlist.delete({ where: { id } });
    }
    async removeByUserAndProduct(userId, productId) {
        const wishlistItem = await this.prisma.wishlist.findUnique({
            where: {
                userId_productId: { userId, productId },
            },
        });
        if (!wishlistItem) {
            throw new common_1.NotFoundException(`Wishlist item for user ${userId} and product ${productId} not found.`);
        }
        return await this.prisma.wishlist.delete({ where: { id: wishlistItem.id } });
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map