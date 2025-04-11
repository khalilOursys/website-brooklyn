import { PrismaService } from '../../prisma.service';
import { SearchProductDto } from './dto/search-product.dto';
export declare class ProductSearchService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    searchProducts(query: SearchProductDto): Promise<{
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
