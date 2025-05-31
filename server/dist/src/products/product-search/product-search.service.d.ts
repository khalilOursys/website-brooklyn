import { PrismaService } from '../../prisma.service';
import { SearchProductDto } from './dto/search-product.dto';
export declare class ProductSearchService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    searchProducts(query: SearchProductDto): Promise<({
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string | null;
            description: string | null;
            bgUrl: string | null;
            iconUrl: string | null;
            bannerColor: string;
            bannerText: string;
            parentId: string | null;
        };
        brand: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            img: string | null;
        };
        images: {
            id: string;
            url: string;
            isPrimary: boolean;
            productId: string;
        }[];
        attributes: {
            id: string;
            key: string;
            value: string;
            productId: string;
        }[];
    } & {
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
    })[]>;
}
