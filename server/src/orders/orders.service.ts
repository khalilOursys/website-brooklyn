import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  /* async create(createOrderDto: CreateOrderDto) {
    // Validate user exists
    const user = await this.prisma.user.findUnique({
      where: { id: createOrderDto.userId },
    });
    if (!user) {
      throw new BadRequestException(
        `User with id ${createOrderDto.userId} does not exist.`,
      );
    }
    // Optionally, validate each product, variant, etc. if needed

    // Create the order and nested order items in one transaction
    return await this.prisma.order.create({
      data: {
        userId: createOrderDto.userId,
        address: createOrderDto.address,
        phoneNumber: createOrderDto.phoneNumber,
        discountCodeId: createOrderDto.discountCodeId,
        total: createOrderDto.total,
        orderItems: {
          create: createOrderDto.orderItems.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { orderItems: true },
    });
  } */
  async create(createOrderDto: CreateOrderDto) {
    // Validate user exists
    const user = await this.prisma.user.findUnique({
      where: { id: createOrderDto.userId },
    });
    if (!user) {
      throw new BadRequestException(
        `User with id ${createOrderDto.userId} does not exist.`,
      );
    }

    // Create the order, nested order items, and clear cart in one transaction
    return await this.prisma.$transaction(async (prisma) => {
      // Create the order
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
              bulkId: item.bulkId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: { orderItems: true },
      });

      // Find the user's cart
      const cart = await prisma.cart.findUnique({
        where: { userId: createOrderDto.userId },
      });

      if (cart) {
        // Delete all cart items for this user's cart
        await prisma.cartItem.deleteMany({
          where: { cartId: cart.id },
        });
      }

      return order;
    });
  }

  async findAll(isBulk: number) {
    return await this.prisma.order.findMany({
      where: { isBulk },
      orderBy: { createdAt: 'desc' },
      include: { orderItems: true, user: true },
    });
  }

  async findOne(id: string) {
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
            bulk: true, // Include bulk if needed
            variant: true, // Include variant if needed
          },
        },
        user: true,
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found.`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    // Ensure the order exists first
    await this.findOne(id);
    return await this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.order.delete({
      where: { id },
    });
  }

  async getOrdersByUserId(userId: string) {
    const orders = await this.prisma.order.findMany({
      // Use `findMany` since a user can have multiple orders
      where: { userId }, // Filter by userId
      include: {
        orderItems: {
          include: {
            product: true, // Include product details
            variant: true, // Include variant if needed
          },
        },
        user: true, // Include user details (optional)
      },
      orderBy: {
        createdAt: 'desc', // Optional: Sort by newest first
      },
    });

    if (!orders || orders.length === 0) {
      throw new NotFoundException(
        `No orders found for user with ID ${userId}.`,
      );
    }

    return orders;
  }
}
