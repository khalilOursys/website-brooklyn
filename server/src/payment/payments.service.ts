import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    // Validate that the order exists
    const order = await this.prisma.order.findUnique({
      where: { id: createPaymentDto.orderId },
    });
    if (!order) {
      throw new BadRequestException(`Order with id ${createPaymentDto.orderId} does not exist.`);
    }

    // Create the payment record
    return await this.prisma.payment.create({
      data: {
        orderId: createPaymentDto.orderId,
        amount: createPaymentDto.amount,
        method: createPaymentDto.method,
        status: createPaymentDto.status,
        paymentId: createPaymentDto.paymentId,
      },
    });
  }

  async findAll() {
    return await this.prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });
    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found.`);
    }
    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    await this.findOne(id);
    return await this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.payment.delete({
      where: { id },
    });
  }
}
