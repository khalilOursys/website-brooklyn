import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';

@Injectable()
export class ProductAttributesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductAttributeDto: CreateProductAttributeDto) {
    // Optionally, check if the product exists
    const product = await this.prisma.product.findUnique({
      where: { id: createProductAttributeDto.productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${createProductAttributeDto.productId} not found`);
    }
    return await this.prisma.productAttribute.create({
      data: {
        ...createProductAttributeDto,
      },
    });
  }

  async findAll(productId?: string) {
    const filter = productId ? { productId } : {};
    return await this.prisma.productAttribute.findMany({
      where: filter,
    });
  }

  async findOne(id: string) {
    const attribute = await this.prisma.productAttribute.findUnique({ where: { id } });
    if (!attribute) {
      throw new NotFoundException(`Product attribute with id ${id} not found`);
    }
    return attribute;
  }

  async update(id: string, updateProductAttributeDto: UpdateProductAttributeDto) {
    await this.findOne(id);
    return await this.prisma.productAttribute.update({
      where: { id },
      data: updateProductAttributeDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.productAttribute.delete({
      where: { id },
    });
  }
}
