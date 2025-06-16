"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const prisma_service_1 = require("./prisma.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const products_module_1 = require("./products/products.module");
const product_variants_module_1 = require("./product-variants/product-variants.module");
const product_images_module_1 = require("./product-images/product-images.module");
const product_attributes_module_1 = require("./product-attributes/product-attributes.module");
const product_translations_module_1 = require("./product-translations/product-translations.module");
const product_bundles_module_1 = require("./product-bundles/product-bundles.module");
const product_ratings_module_1 = require("./product-ratings/product-ratings.module");
const stock_alerts_module_1 = require("./stock-alerts/stock-alerts.module");
const product_recommendations_module_1 = require("./product-recommendations/product-recommendations.module");
const product_search_module_1 = require("./products/product-search/product-search.module");
const categories_module_1 = require("./categories/categories.module");
const brands_module_1 = require("./brands/brands.module");
const orders_module_1 = require("./orders/orders.module");
const cart_module_1 = require("./cart/cart.module");
const payments_module_1 = require("./payment/payments.module");
const bulk_products_module_1 = require("./bulk-products/bulk-products.module");
const bulk_client_requests_module_1 = require("./bulk-client-requests/bulk-client-requests.module");
const notifications_module_1 = require("./notifications/notifications.module");
const wishlist_module_1 = require("./wishlist/wishlist.module");
const hero_banner_module_1 = require("./hero-banner/hero-banner.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            product_variants_module_1.ProductVariantsModule,
            product_images_module_1.ProductImagesModule,
            product_attributes_module_1.ProductAttributesModule,
            product_translations_module_1.ProductTranslationsModule,
            product_bundles_module_1.ProductBundlesModule,
            product_ratings_module_1.ProductRatingsModule,
            stock_alerts_module_1.StockAlertsModule,
            product_recommendations_module_1.ProductRecommendationsModule,
            product_search_module_1.ProductSearchModule,
            categories_module_1.CategoriesModule,
            brands_module_1.BrandsModule,
            orders_module_1.OrdersModule,
            cart_module_1.CartModule,
            payments_module_1.PaymentsModule,
            bulk_products_module_1.BulkProductsModule,
            bulk_client_requests_module_1.BulkClientRequestsModule,
            notifications_module_1.NotificationsModule,
            wishlist_module_1.WishlistModule,
            hero_banner_module_1.HeroBannerModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map