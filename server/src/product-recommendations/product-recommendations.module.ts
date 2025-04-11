import { Module } from '@nestjs/common';
import { ProductRecommendationsController } from './product-recommendations.controller';
import { ProductRecommendationsService } from './product-recommendations.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProductRecommendationsController],
  providers: [ProductRecommendationsService, PrismaService],
})
export class ProductRecommendationsModule {}
