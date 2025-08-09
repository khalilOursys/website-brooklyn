import { PrismaService } from '../prisma.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
export declare class CartService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCartByUser(userId: string): Promise<({
        items: ({
            product: {
                images: {
                    id: string;
                    url: string;
                    isPrimary: boolean;
                    variantId: string | null;
                    productId: string | null;
                }[];
            } & {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                color: string | null;
                price: number;
                purchasePrice: number | null;
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
            bulk: {
                id: string;
                name: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                discount: number | null;
                productId: string;
                bulkPrice: number;
                minQuantity: number;
            } | null;
        } & {
            id: string;
            variantId: string | null;
            productId: string;
            quantity: number;
            bulkId: string | null;
            cartId: string;
        })[];
    } & {
        id: string;
        updatedAt: Date;
        userId: string;
    }) | null>;
    addCartItem(createCartItemDto: CreateCartItemDto): Promise<{
        id: string;
        variantId: string | null;
        productId: string;
        quantity: number;
        bulkId: string | null;
        cartId: string;
    }>;
    updateCartItem(id: string, updateCartItemDto: UpdateCartItemDto): Promise<{
        id: string;
        variantId: string | null;
        productId: string;
        quantity: number;
        bulkId: string | null;
        cartId: string;
    }>;
    removeCartItem(id: string): Promise<{
        id: string;
        variantId: string | null;
        productId: string;
        quantity: number;
        bulkId: string | null;
        cartId: string;
    }>;
}
