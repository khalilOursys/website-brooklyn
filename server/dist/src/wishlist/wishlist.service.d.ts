import { PrismaService } from '../prisma.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
export declare class WishlistService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    addWishlist(createWishlistDto: CreateWishlistDto): Promise<{
        id: string;
        productId: string;
        userId: string;
        addedAt: Date;
    }>;
    findByUser(userId: string): Promise<({
        product: {
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
        };
    } & {
        id: string;
        productId: string;
        userId: string;
        addedAt: Date;
    })[]>;
    removeWishlist(id: string): Promise<{
        id: string;
        productId: string;
        userId: string;
        addedAt: Date;
    }>;
    removeByUserAndProduct(userId: string, productId: string): Promise<{
        id: string;
        productId: string;
        userId: string;
        addedAt: Date;
    }>;
}
