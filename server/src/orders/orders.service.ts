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
  }

  async findAll() {
    return await this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: { orderItems: true, user: true },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { orderItems: true, user: true },
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
}
