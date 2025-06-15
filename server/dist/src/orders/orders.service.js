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
        console.log(createOrderDto.orderItems);
        return await this.prisma.$transaction(async (prisma) => {
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
                        bulk: true,
                        variant: true,
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
        await this.findOne(id);
        return await this.prisma.order.update({
            where: { id },
            data: updateOrderDto,
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