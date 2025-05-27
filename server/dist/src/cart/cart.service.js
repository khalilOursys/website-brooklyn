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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let CartService = class CartService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCartByUser(userId) {
        let cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                images: true,
                            },
                        },
                        bulk: true,
                    },
                },
            },
        });
        return cart;
    }
    async addCartItem(createCartItemDto) {
        const cart = await this.prisma.cart.findUnique({
            where: { id: createCartItemDto.cartId },
        });
        if (!cart) {
            throw new common_1.NotFoundException(`Cart with id ${createCartItemDto.cartId} not found.`);
        }
        const existingItem = await this.prisma.cartItem.findFirst({
            where: {
                cartId: createCartItemDto.cartId,
                productId: createCartItemDto.productId,
                variantId: createCartItemDto.variantId || null,
                bulkId: createCartItemDto.bulkId,
            },
        });
        if (existingItem) {
            return await this.prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + createCartItemDto.quantity },
            });
        }
        return await this.prisma.cartItem.create({
            data: {
                cartId: createCartItemDto.cartId,
                productId: createCartItemDto.productId,
                bulkId: createCartItemDto.bulkId,
                variantId: createCartItemDto.variantId
                    ? createCartItemDto.variantId
                    : null,
                quantity: createCartItemDto.quantity,
            },
        });
    }
    async updateCartItem(id, updateCartItemDto) {
        const cartItem = await this.prisma.cartItem.findUnique({ where: { id } });
        if (!cartItem) {
            throw new common_1.NotFoundException(`Cart item with id ${id} not found.`);
        }
        return await this.prisma.cartItem.update({
            where: { id },
            data: updateCartItemDto,
        });
    }
    async removeCartItem(id) {
        const cartItem = await this.prisma.cartItem.findUnique({ where: { id } });
        if (!cartItem) {
            throw new common_1.NotFoundException(`Cart item with id ${id} not found.`);
        }
        return await this.prisma.cartItem.delete({ where: { id } });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map