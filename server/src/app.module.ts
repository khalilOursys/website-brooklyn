import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ProductVariantsModule } from './product-variants/product-variants.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { ProductAttributesModule } from './product-attributes/product-attributes.module';
import { ProductTranslationsModule } from './product-translations/product-translations.module';
import { ProductBundlesModule } from './product-bundles/product-bundles.module';
import { ProductRatingsModule } from './product-ratings/product-ratings.module';
import { StockAlertsModule } from './stock-alerts/stock-alerts.module';
import { ProductRecommendationsModule } from './product-recommendations/product-recommendations.module';
import { ProductSearchModule } from './products/product-search/product-search.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { PaymentsModule } from './payment/payments.module';
import { BulkProductsModule } from './bulk-products/bulk-products.module';
import { BulkClientRequestsModule } from './bulk-client-requests/bulk-client-requests.module';
import { NotificationsModule } from './notifications/notifications.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { HeroBannerModule } from './hero-banner/hero-banner.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProductsModule,
    ProductVariantsModule,
    ProductImagesModule,
    ProductAttributesModule,
    ProductTranslationsModule,
    ProductBundlesModule,
    ProductRatingsModule,
    StockAlertsModule,
    ProductRecommendationsModule,
    ProductSearchModule,
    CategoriesModule,
    BrandsModule,
    OrdersModule,
    CartModule,
    PaymentsModule,
    BulkProductsModule,
    BulkClientRequestsModule,
    NotificationsModule,
    WishlistModule,
    HeroBannerModule
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
