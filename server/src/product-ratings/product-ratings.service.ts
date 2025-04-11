import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductRatingDto } from './dto/create-product-rating.dto';
import { UpdateProductRatingDto } from './dto/update-product-rating.dto';

@Injectable()
export class ProductRatingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductRatingDto: CreateProductRatingDto) {
    // Validate that both product and user exist
    const product = await this.prisma.product.findUnique({
      where: { id: createProductRatingDto.productId },
    });
    if (!product) {
      throw new BadRequestException(`Product with id ${createProductRatingDto.productId} does not exist.`);
    }

    const user = await this.prisma.user.findUnique({
      where: { id: createProductRatingDto.userId },
    });
    if (!user) {
      throw new BadRequestException(`User with id ${createProductRatingDto.userId} does not exist.`);
    }

    // Ensure one review per product per user (if that's your requirement)
    const existingRating = await this.prisma.productRating.findUnique({
      where: {
        productId_userId: {
          productId: createProductRatingDto.productId,
          userId: createProductRatingDto.userId,
        },
      },
    });
    if (existingRating) {
      throw new BadRequestException(`User has already rated this product.`);
    }

    return await this.prisma.productRating.create({
      data: {
        productId: createProductRatingDto.productId,
        userId: createProductRatingDto.userId,
        rating: createProductRatingDto.rating,
        comment: createProductRatingDto.comment,
      },
    });
  }

  async findAll(productId?: string) {
    const filter = productId ? { productId } : {};
    return await this.prisma.productRating.findMany({
      where: filter,
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    });
  }

  async findOne(id: string) {
    const rating = await this.prisma.productRating.findUnique({ where: { id } });
    if (!rating) {
      throw new NotFoundException(`Product rating with id ${id} not found.`);
    }
    return rating;
  }

  async update(id: string, updateProductRatingDto: UpdateProductRatingDto) {
    // Ensure the rating exists first
    await this.findOne(id);
    return await this.prisma.productRating.update({
      where: { id },
      data: updateProductRatingDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.productRating.delete({
      where: { id },
    });
  }
}
