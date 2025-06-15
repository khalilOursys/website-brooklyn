import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<{
        orderItems: {
            id: string;
            quantity: number;
            price: number;
            productId: string | null;
            variantId: string | null;
            bulkId: string | null;
            bundleId: string | null;
            orderId: string;
        }[];
    } & {
        id: string;
        userId: string;
        isBulk: number;
        total: number;
        status: string;
        address: string;
        phoneNumber: string;
        discountCodeId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(type: number): Promise<({
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            role: import(".prisma/client").$Enums.Role;
            oauthProvider: string | null;
            oauthId: string | null;
        };
        orderItems: {
            id: string;
            quantity: number;
            price: number;
            productId: string | null;
            variantId: string | null;
            bulkId: string | null;
            bundleId: string | null;
            orderId: string;
        }[];
    } & {
        id: string;
        userId: string;
        isBulk: number;
        total: number;
        status: string;
        address: string;
        phoneNumber: string;
        discountCodeId: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            role: import(".prisma/client").$Enums.Role;
            oauthProvider: string | null;
            oauthId: string | null;
        };
        orderItems: ({
            product: ({
                images: {
                    id: string;
                    productId: string;
                    url: string;
                    isPrimary: boolean;
                }[];
            } & {
                id: string;
                isBulk: boolean;
                createdAt: Date;
                updatedAt: Date;
                price: number;
                name: string;
                description: string | null;
                stock: number;
                discount: number | null;
                isFeatured: boolean;
                specs: import("@prisma/client/runtime/library").JsonValue | null;
                categoryId: string;
                brandId: string;
                averageRating: number | null;
                ratingCount: number;
            }) | null;
            variant: {
                id: string;
                price: number | null;
                productId: string;
                name: string;
                stock: number;
            } | null;
            bundle: {
                id: string;
                createdAt: Date;
                name: string;
                discount: number;
                expiresAt: Date | null;
                img: string | null;
            } | null;
            bulk: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                name: string | null;
                description: string | null;
                discount: number | null;
                bulkPrice: number;
                minQuantity: number;
            } | null;
        } & {
            id: string;
            quantity: number;
            price: number;
            productId: string | null;
            variantId: string | null;
            bulkId: string | null;
            bundleId: string | null;
            orderId: string;
        })[];
    } & {
        id: string;
        userId: string;
        isBulk: number;
        total: number;
        status: string;
        address: string;
        phoneNumber: string;
        discountCodeId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getOrderByIdUser(userId: string): Promise<({
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            role: import(".prisma/client").$Enums.Role;
            oauthProvider: string | null;
            oauthId: string | null;
        };
        orderItems: ({
            product: {
                id: string;
                isBulk: boolean;
                createdAt: Date;
                updatedAt: Date;
                price: number;
                name: string;
                description: string | null;
                stock: number;
                discount: number | null;
                isFeatured: boolean;
                specs: import("@prisma/client/runtime/library").JsonValue | null;
                categoryId: string;
                brandId: string;
                averageRating: number | null;
                ratingCount: number;
            } | null;
            variant: {
                id: string;
                price: number | null;
                productId: string;
                name: string;
                stock: number;
            } | null;
        } & {
            id: string;
            quantity: number;
            price: number;
            productId: string | null;
            variantId: string | null;
            bulkId: string | null;
            bundleId: string | null;
            orderId: string;
        })[];
    } & {
        id: string;
        userId: string;
        isBulk: number;
        total: number;
        status: string;
        address: string;
        phoneNumber: string;
        discountCodeId: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        id: string;
        userId: string;
        isBulk: number;
        total: number;
        status: string;
        address: string;
        phoneNumber: string;
        discountCodeId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        userId: string;
        isBulk: number;
        total: number;
        status: string;
        address: string;
        phoneNumber: string;
        discountCodeId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
