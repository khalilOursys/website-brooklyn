import { PrismaService } from '../prisma.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
export declare class CartService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCartByUser(userId: string): Promise<{
        items: {
            id: string;
            productId: string;
            quantity: number;
            variantId: string | null;
            cartId: string;
        }[];
    } & {
        id: string;
        updatedAt: Date;
        userId: string;
    }>;
    addCartItem(createCartItemDto: CreateCartItemDto): Promise<{
        id: string;
        productId: string;
        quantity: number;
        variantId: string | null;
        cartId: string;
    }>;
    updateCartItem(id: string, updateCartItemDto: UpdateCartItemDto): Promise<{
        id: string;
        productId: string;
        quantity: number;
        variantId: string | null;
        cartId: string;
    }>;
    removeCartItem(id: string): Promise<{
        id: string;
        productId: string;
        quantity: number;
        variantId: string | null;
        cartId: string;
    }>;
}
