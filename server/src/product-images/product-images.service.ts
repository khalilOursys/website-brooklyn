import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';

@Injectable()
export class ProductImagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductImageDto: CreateProductImageDto) {
    // Optionally, you could check if the product exists here
    return await this.prisma.productImage.create({
      data: {
        ...createProductImageDto,
        isPrimary: createProductImageDto.isPrimary ?? false,
      },
    });
  }

  async findAll(productId?: string) {
    const filter = productId ? { productId } : {};
    return await this.prisma.productImage.findMany({
      where: filter,
      orderBy: { isPrimary: 'desc' }, // Primary image first
    });
  }

  async findOne(id: string) {
    const image = await this.prisma.productImage.findUnique({ where: { id } });
    if (!image) {
      throw new NotFoundException(`Product image with id ${id} not found`);
    }
    return image;
  }

  async update(id: string, updateProductImageDto: UpdateProductImageDto) {
    // Ensure the image exists first
    await this.findOne(id);
    return await this.prisma.productImage.update({
      where: { id },
      data: updateProductImageDto,
    });
  }

  async remove(id: string) {
    // Ensure the image exists first
    await this.findOne(id);
    return await this.prisma.productImage.delete({
      where: { id },
    });
  }
}
