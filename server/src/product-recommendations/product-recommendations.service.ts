import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductRecommendationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getRecommendations(productId: string) {
    // Fetch the product along with its "similar" products relation
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: { similar: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    // Return the list of similar products
    return product.similar;
  }
}
