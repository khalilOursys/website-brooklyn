import { PrismaService } from '../prisma.service';
export declare class ProductRecommendationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
