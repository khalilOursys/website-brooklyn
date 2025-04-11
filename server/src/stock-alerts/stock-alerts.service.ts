import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateStockAlertDto } from './dto/create-stock-alert.dto';
import { UpdateStockAlertDto } from './dto/update-stock-alert.dto';

@Injectable()
export class StockAlertsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStockAlertDto: CreateStockAlertDto) {
    // Check if the user exists
    const user = await this.prisma.user.findUnique({
      where: { id: createStockAlertDto.userId },
    });
    if (!user) {
      throw new BadRequestException(`User with id ${createStockAlertDto.userId} does not exist.`);
    }
    
    // Check if the product exists
    const product = await this.prisma.product.findUnique({
      where: { id: createStockAlertDto.productId },
    });
    if (!product) {
      throw new BadRequestException(`Product with id ${createStockAlertDto.productId} does not exist.`);
    }
    
    // Optionally, if variantId is provided, verify its existence
    if (createStockAlertDto.variantId) {
      const variant = await this.prisma.productVariant.findUnique({
        where: { id: createStockAlertDto.variantId },
      });
      if (!variant) {
        throw new BadRequestException(`Variant with id ${createStockAlertDto.variantId} does not exist.`);
      }
    }
    
    // Create the stock alert
    return await this.prisma.stockAlert.create({
      data: {
        userId: createStockAlertDto.userId,
        productId: createStockAlertDto.productId,
        variantId: createStockAlertDto.variantId,
      },
    });
  }

  async findAll() {
    return await this.prisma.stockAlert.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByUser(userId: string) {
    return await this.prisma.stockAlert.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const alert = await this.prisma.stockAlert.findUnique({
      where: { id },
    });
    if (!alert) {
      throw new NotFoundException(`Stock alert with id ${id} not found.`);
    }
    return alert;
  }

  async update(id: string, updateStockAlertDto: UpdateStockAlertDto) {
    await this.findOne(id);
    return await this.prisma.stockAlert.update({
      where: { id },
      data: updateStockAlertDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.stockAlert.delete({
      where: { id },
    });
  }
}
