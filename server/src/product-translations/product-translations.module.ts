import { Module } from '@nestjs/common';
import { ProductTranslationsController } from './product-translations.controller';
import { ProductTranslationsService } from './product-translations.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProductTranslationsController],
  providers: [ProductTranslationsService, PrismaService],
})
export class ProductTranslationsModule {}
