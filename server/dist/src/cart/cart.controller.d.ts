import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(userId: string): Promise<({
        items: ({
            product: {
                images: {
                    id: string;
                    url: string;
                    isPrimary: boolean;
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
            };
            bulk: {
                id: string;
                name: string | null;
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
            productId: string;
            quantity: number;
            variantId: string | null;
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
        productId: string;
        quantity: number;
        variantId: string | null;
        bulkId: string | null;
        cartId: string;
    }>;
    updateCartItem(id: string, updateCartItemDto: UpdateCartItemDto): Promise<{
        id: string;
        productId: string;
        quantity: number;
        variantId: string | null;
        bulkId: string | null;
        cartId: string;
    }>;
    removeCartItem(id: string): Promise<{
        id: string;
        productId: string;
        quantity: number;
        variantId: string | null;
        bulkId: string | null;
        cartId: string;
    }>;
}
