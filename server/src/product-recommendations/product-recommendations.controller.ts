import { Controller, Get, Param } from '@nestjs/common';
import { ProductRecommendationsService } from './product-recommendations.service';

@Controller('product-recommendations')
export class ProductRecommendationsController {
  constructor(private readonly recommendationsService: ProductRecommendationsService) {}

  @Get(':productId')
  async getRecommendations(@Param('productId') productId: string) {
    return await this.recommendationsService.getRecommendations(productId);
  }
}
