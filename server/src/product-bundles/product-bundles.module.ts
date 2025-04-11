import { Module } from '@nestjs/common';
import { ProductBundlesController } from './product-bundles.controller';
import { ProductBundlesService } from './product-bundles.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProductBundlesController],
  providers: [ProductBundlesService, PrismaService],
})
export class ProductBundlesModule {}
