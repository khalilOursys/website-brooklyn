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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOrderDto) {
        const user = await this.prisma.user.findUnique({
            where: { id: createOrderDto.userId },
        });
        if (!user) {
            throw new common_1.BadRequestException(`User with id ${createOrderDto.userId} does not exist.`);
        }
        return await this.prisma.$transaction(async (prisma) => {
            for (const item of createOrderDto.orderItems) {
                if (item.variantId) {
                    const variant = await prisma.productVariant.findUnique({
                        where: { id: item.variantId },
                        include: { product: true },
                    });
                    if (!variant || variant.stock < item.quantity) {
                        throw new common_1.BadRequestException(`Stock insuffisant pour cette variante ${variant?.name || item.variantId}`);
                    }
                }
                else if (item.productId) {
                    const product = await prisma.product.findUnique({
                        where: { id: item.productId },
                        include: { variants: true },
                    });
                    if (!product) {
                        throw new common_1.BadRequestException(`Product with id ${item.productId} not found`);
                    }
                    if (product.stock < item.quantity && item.bulkId === null) {
                        throw new common_1.BadRequestException(`Stock insuffisant pour cette produit ${product.name}`);
                    }
                }
                if (item.bundleId) {
                    const bundle = await prisma.productBundle.findUnique({
                        where: { id: item.bundleId },
                    });
                    if (!bundle) {
                        throw new common_1.BadRequestException(`Bundle with id ${item.bundleId} not found`);
                    }
                    if (bundle.stock < item.quantity) {
                        throw new common_1.BadRequestException(`Stock insuffisant pour cette pack ${bundle.name}`);
                    }
                }
                if (item.bulkId) {
                    const bulk = await prisma.bulkProduct.findUnique({
                        where: { id: item.bulkId },
                    });
                    if (!bulk) {
                        throw new common_1.BadRequestException(`Bundle with id ${item.bundleId} not found`);
                    }
                    if (bulk.minQuantity < item.quantity) {
                        throw new common_1.BadRequestException(`Stock insuffisant pour cette produit en gros ${bulk.name}`);
                    }
                }
            }
            const order = await prisma.order.create({
                data: {
                    userId: createOrderDto.userId,
                    address: createOrderDto.address,
                    phoneNumber: createOrderDto.phoneNumber,
                    discountCodeId: createOrderDto.discountCodeId,
                    total: createOrderDto.total,
                    isBulk: createOrderDto.isBulk,
                    orderItems: {
                        create: createOrderDto.orderItems.map((item) => ({
                            productId: item.productId,
                            variantId: item.variantId,
                            bundleId: item.bundleId,
                            bulkId: item.bulkId,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                    },
                },
                include: { orderItems: true },
            });
            for (const item of createOrderDto.orderItems) {
                if (item.variantId) {
                    await prisma.productVariant.update({
                        where: { id: item.variantId },
                        data: { stock: { decrement: item.quantity } },
                    });
                }
                else if (item.productId) {
                    const product = await prisma.product.findUnique({
                        where: { id: item.productId },
                        include: { variants: true },
                    });
                    await prisma.product.update({
                        where: { id: item.productId },
                        data: { stock: { decrement: item.quantity } },
                    });
                }
                if (item.bundleId) {
                    const bundle = await prisma.productBundle.findUnique({
                        where: { id: item.bundleId },
                    });
                    await prisma.productBundle.update({
                        where: { id: item.bundleId },
                        data: { stock: { decrement: item.quantity } },
                    });
                }
                if (item.bulkId) {
                    await prisma.bulkProduct.update({
                        where: { id: item.bulkId },
                        data: { minQuantity: { decrement: item.quantity } },
                    });
                }
            }
            const cart = await prisma.cart.findUnique({
                where: { userId: createOrderDto.userId },
            });
            if (cart) {
                await prisma.cartItem.deleteMany({
                    where: { cartId: cart.id },
                });
            }
            return order;
        });
    }
    async findAll(isBulk) {
        return await this.prisma.order.findMany({
            where: { isBulk },
            orderBy: { createdAt: 'desc' },
            include: { orderItems: true, user: true },
        });
    }
    async findOne(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                orderItems: {
                    include: {
                        product: {
                            include: {
                                images: true,
                            },
                        },
                        variant: {
                            include: {
                                images: true,
                            },
                        },
                        bulk: true,
                        bundle: true,
                    },
                },
                user: true,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${id} not found.`);
        }
        return order;
    }
    async update(id, updateOrderDto) {
        return await this.prisma.$transaction(async (prisma) => {
            const existingOrder = await prisma.order.findUnique({
                where: { id },
                include: {
                    orderItems: true,
                },
            });
            if (!existingOrder) {
                throw new common_1.NotFoundException(`Order with id ${id} not found`);
            }
            if (updateOrderDto.status === 'Annuler' &&
                existingOrder.status !== 'Annuler') {
                console.log(existingOrder.orderItems);
                for (const item of existingOrder.orderItems) {
                    if (item.variantId) {
                        await prisma.productVariant.update({
                            where: { id: item.variantId },
                            data: { stock: { increment: item.quantity } },
                        });
                    }
                    else if (item.bulkId) {
                        await prisma.bulkProduct.update({
                            where: { id: item.bulkId },
                            data: { minQuantity: { increment: item.quantity } },
                        });
                    }
                    else if (item.productId) {
                        await prisma.product.update({
                            where: { id: item.productId },
                            data: { stock: { increment: item.quantity } },
                        });
                    }
                    else if (item.bundleId) {
                        await prisma.productBundle.update({
                            where: { id: item.bundleId },
                            data: { stock: { increment: item.quantity } },
                        });
                    }
                }
            }
            else if (updateOrderDto.status === 'en attente' &&
                existingOrder.status !== 'en attente') {
                for (const item of existingOrder.orderItems) {
                    if (item.variantId) {
                        await prisma.productVariant.update({
                            where: { id: item.variantId },
                            data: { stock: { decrement: item.quantity } },
                        });
                    }
                    else if (item.bulkId) {
                        await prisma.bulkProduct.update({
                            where: { id: item.bulkId },
                            data: { minQuantity: { decrement: item.quantity } },
                        });
                    }
                    else if (item.productId) {
                        await prisma.product.update({
                            where: { id: item.productId },
                            data: { stock: { decrement: item.quantity } },
                        });
                    }
                    else if (item.bundleId) {
                        await prisma.productBundle.update({
                            where: { id: item.bundleId },
                            data: { stock: { decrement: item.quantity } },
                        });
                    }
                }
            }
            return await this.prisma.order.update({
                where: { id },
                data: updateOrderDto,
            });
        });
    }
    async remove(id) {
        await this.findOne(id);
        return await this.prisma.order.delete({
            where: { id },
        });
    }
    async getOrdersByUserId(userId) {
        const orders = await this.prisma.order.findMany({
            where: { userId },
            include: {
                orderItems: {
                    include: {
                        product: true,
                        variant: true,
                    },
                },
                user: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        if (!orders || orders.length === 0) {
            throw new common_1.NotFoundException(`No orders found for user with ID ${userId}.`);
        }
        return orders;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map