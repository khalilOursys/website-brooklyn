// server/products/product-translations.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductTranslationDto } from './dto/create-product-translation.dto';
import { UpdateProductTranslationDto } from './dto/update-product-translation.dto';

@Injectable()
export class ProductTranslationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductTranslationDto: CreateProductTranslationDto) {
    // Optional: Check if the product exists before creating translation
    const product = await this.prisma.product.findUnique({
      where: { id: createProductTranslationDto.productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${createProductTranslationDto.productId} not found`);
    }
    return await this.prisma.productTranslation.create({
      data: {
        ...createProductTranslationDto,
      },
    });
  }

  async findAll(productId?: string) {
    const filter = productId ? { productId } : {};
    return await this.prisma.productTranslation.findMany({
      where: filter,
    });
  }

  async findOne(id: string) {
    const translation = await this.prisma.productTranslation.findUnique({ where: { id } });
    if (!translation) {
      throw new NotFoundException(`Product translation with id ${id} not found`);
    }
    return translation;
  }

  async update(id: string, updateProductTranslationDto: UpdateProductTranslationDto) {
    // Ensure translation exists before updating
    await this.findOne(id);
    return await this.prisma.productTranslation.update({
      where: { id },
      data: updateProductTranslationDto,
    });
  }

  async remove(id: string) {
    // Ensure translation exists before deletion
    await this.findOne(id);
    return await this.prisma.productTranslation.delete({
      where: { id },
    });
  }
}
