import { ProductRecommendationsService } from './product-recommendations.service';
export declare class ProductRecommendationsController {
    private readonly recommendationsService;
    constructor(recommendationsService: ProductRecommendationsService);
    getRecommendations(productId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: number;
        stock: number;
        isBulk: boolean;
        discount: number | null;
        isFeatured: boolean;
        specs: import("@prisma/client/runtime/library").JsonValue | null;
        categoryId: string;
        brandId: string;
        averageRating: number | null;
        ratingCount: number;
    }[]>;
}
