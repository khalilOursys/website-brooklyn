import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Injectable()
export class ProductVariantsService {
  constructor(private readonly prisma: PrismaService) {}

  /* async create(createProductVariantDto: CreateProductVariantDto) {
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
  } */
  async create(createProductVariantDto: CreateProductVariantDto) {
    const { images, productId, ...variantData } = createProductVariantDto;

    // Verify product exists
    const productExists = await this.prisma.product.count({
      where: { id: productId },
    });

    if (!productExists) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    return this.prisma.productVariant.create({
      data: {
        ...variantData,
        productId, // Directly assign productId instead of using connect
        images: images
          ? {
              createMany: {
                data: images.map((img) => ({
                  url: img.url,
                  isPrimary: img.isPrimary || false,
                })),
              },
            }
          : undefined,
      },
      include: {
        images: true,
        product: {
          include: {
            category: true,
            brand: true,
          },
        },
      },
    });
  }
  async findAll(productId?: string) {
    // Optionally filter variants by productId
    return await this.prisma.productVariant.findMany({
      include: {
        images: true,
        product: {
          include: {
            category: true,
            brand: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: string) {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id },
      include: {
        images: true,
        product: {
          include: {
            category: true,
            brand: true,
          },
        },
      },
    });
    if (!variant) {
      throw new NotFoundException(`Product variant with id ${id} not found`);
    }
    return variant;
  }

  async update(id: string, updateProductVariantDto: UpdateProductVariantDto) {
    // Verify product exists

    const { images, ...variantData } = updateProductVariantDto;

    return this.prisma.$transaction(async (prisma) => {
      // 1. First delete all existing images and attributes
      await Promise.all([
        prisma.productImage.deleteMany({ where: { variantId: id } }),
      ]);

      // 2. Update the product basic info
      await prisma.productVariant.update({
        where: { id },
        data: variantData,
      });

      // 3. Create new images if provided
      if (images && images.length > 0) {
        await prisma.productImage.createMany({
          data: images.map((img) => ({
            variantId: id,
            url: img.url,
            isPrimary: img.isPrimary || false,
          })),
        });
      }

      // 5. Return the full updated product with relations
      return prisma.productVariant.findUnique({
        where: { id },
        include: {
          images: true,
          product: {
            include: {
              category: true,
              brand: true,
            },
          },
        },
      });
    });
  }

  async remove(id: string) {
    // Ensure variant exists before deletion
    await this.findOne(id);
    return await this.prisma.productVariant.delete({
      where: { id },
    });
  }
  async getVariantWithProduct(id: string) {
    return this.prisma.productVariant.findUnique({
      where: { id },
      include: {
        images: true,
        product: {
          include: {
            images: true,
            attributes: true,
            category: true,
            brand: true,
            variants: {
              include: { images: true },
            },
          },
        },
      },
    });
  }
}
