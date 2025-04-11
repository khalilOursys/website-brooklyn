import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Injectable()
export class ProductVariantsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductVariantDto: CreateProductVariantDto) {
    // Optionally, check if product exists before creating variant
    const product = await this.prisma.product.findUnique({
      where: { id: createProductVariantDto.productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${createProductVariantDto.productId} not found`);
    }
    return await this.prisma.productVariant.create({
      data: {
        ...createProductVariantDto,
      },
    });
  }

  async findAll(productId?: string) {
    // Optionally filter variants by productId
    const filter = productId ? { productId } : {};
    return await this.prisma.productVariant.findMany({
      where: filter,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: string) {
    const variant = await this.prisma.productVariant.findUnique({ where: { id } });
    if (!variant) {
      throw new NotFoundException(`Product variant with id ${id} not found`);
    }
    return variant;
  }

  async update(id: string, updateProductVariantDto: UpdateProductVariantDto) {
    // Ensure variant exists before updating
    await this.findOne(id);
    return await this.prisma.productVariant.update({
      where: { id },
      data: updateProductVariantDto,
    });
  }

  async remove(id: string) {
    // Ensure variant exists before deletion
    await this.findOne(id);
    return await this.prisma.productVariant.delete({
      where: { id },
    });
  }
}
