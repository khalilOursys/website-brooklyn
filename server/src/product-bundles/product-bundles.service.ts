import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductBundleDto } from './dto/create-product-bundle.dto';
import { UpdateProductBundleDto } from './dto/update-product-bundle.dto';

@Injectable()
export class ProductBundlesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductBundleDto: CreateProductBundleDto) {
    // Validate each productId exists
    for (const item of createProductBundleDto.products) {
      const productExists = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (!productExists) {
        throw new BadRequestException(`Product with id ${item.productId} does not exist.`);
      }
    }

    try {
      // Create the bundle with associated products in a single transaction
      return await this.prisma.productBundle.create({
        data: {
          name: createProductBundleDto.name,
          discount: createProductBundleDto.discount,
          expiresAt: createProductBundleDto.expiresAt ? new Date(createProductBundleDto.expiresAt) : null,
          products: {
            create: createProductBundleDto.products.map(item => ({
              product: { connect: { id: item.productId } },
              quantity: item.quantity,
            })),
          },
        },
        include: { products: true },
      });
    } catch (error: any) {
      if (error.code === 'P2003') {
        throw new BadRequestException('Foreign key constraint violated. Ensure all product IDs are valid.');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.productBundle.findMany({
      orderBy: { createdAt: 'desc' },
      include: { products: true },
    });
  }

  async findOne(id: string) {
    const bundle = await this.prisma.productBundle.findUnique({
      where: { id },
      include: { products: true },
    });
    if (!bundle) {
      throw new NotFoundException(`Product bundle with id ${id} not found`);
    }
    return bundle;
  }

  async update(id: string, updateProductBundleDto: UpdateProductBundleDto) {
    // Ensure the bundle exists first
    await this.findOne(id);
    return await this.prisma.productBundle.update({
      where: { id },
      data: {
        name: updateProductBundleDto.name,
        discount: updateProductBundleDto.discount,
        expiresAt: updateProductBundleDto.expiresAt ? new Date(updateProductBundleDto.expiresAt) : undefined,
        // Note: Updating bundle items is more complex and not handled here.
      },
      include: { products: true },
    });
  }

  async remove(id: string) {
    // Ensure the bundle exists first
    await this.findOne(id);
    return await this.prisma.productBundle.delete({
      where: { id },
    });
  }
}
