import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { SearchProductDto } from './dto/search-product.dto';

@Injectable()
export class ProductSearchService {
  constructor(private readonly prisma: PrismaService) {}

  async searchProducts(query: SearchProductDto) {
    // Build the dynamic where filter
    const where: any = {};

    if (query.searchTerm) {
      // Search in product name and description
      where.OR = [
        { name: { contains: query.searchTerm, mode: 'insensitive' } },
        { description: { contains: query.searchTerm, mode: 'insensitive' } },
      ];
    }

    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }

    if (query.brandId) {
      where.brandId = query.brandId;
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      where.price = {};
      if (query.minPrice !== undefined) {
        where.price.gte = query.minPrice;
      }
      if (query.maxPrice !== undefined) {
        where.price.lte = query.maxPrice;
      }
    }

    if (query.isFeatured !== undefined) {
      where.isFeatured = query.isFeatured;
    }

    // You can add ordering or pagination here as needed.
    return await this.prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        images: true,
        attributes: true,
        category: true,
        brand: true,
      },
    });
  }
}
