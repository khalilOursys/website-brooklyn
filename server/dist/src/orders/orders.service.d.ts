import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<{
        orderItems: {
            id: string;
            productId: string | null;
            variantId: string | null;
            bulkId: string | null;
            quantity: number;
            price: number;
            bundleId: string | null;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string;
        isBulk: number;
        total: number;
        address: string;
        phoneNumber: string;
        discountCodeId: string | null;
    }>;
    findAll(isBulk: number): Promise<({
        user: {
            id: string;
            email: string;
            password: string;
            telephone: string | null;
            name: string | null;
            firstName: string | null;
            lastName: string | null;
            role: import(".prisma/client").$Enums.Role;
            oauthProvider: string | null;
            oauthId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        orderItems: {
            id: string;
            productId: string | null;
            variantId: string | null;
            bulkId: string | null;
            quantity: number;
            price: number;
            bundleId: string | null;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string;
        isBulk: number;
        total: number;
        address: string;
        phoneNumber: string;
        discountCodeId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            email: string;
            password: string;
            telephone: string | null;
            name: string | null;
            firstName: string | null;
            lastName: string | null;
            role: import(".prisma/client").$Enums.Role;
            oauthProvider: string | null;
            oauthId: string | null;
            createdAt: Date;
            updatedAt: Date;
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
                name: string;
                createdAt: Date;
                updatedAt: Date;
                isBulk: boolean;
                price: number;
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
                name: string;
                productId: string;
                price: number | null;
                stock: number;
            } | null;
            bulk: {
                id: string;
                name: string | null;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                description: string | null;
                discount: number | null;
                bulkPrice: number;
                minQuantity: number;
            } | null;
            bundle: {
                id: string;
                name: string;
                createdAt: Date;
                discount: number;
                expiresAt: Date | null;
                img: string | null;
            } | null;
        } & {
            id: string;
            productId: string | null;
            variantId: string | null;
            bulkId: string | null;
            quantity: number;
            price: number;
            bundleId: string | null;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string;
        isBulk: number;
        total: number;
        address: string;
        phoneNumber: string;
        discountCodeId: string | null;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string;
        isBulk: number;
        total: number;
        address: string;
        phoneNumber: string;
        discountCodeId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string;
        isBulk: number;
        total: number;
        address: string;
        phoneNumber: string;
        discountCodeId: string | null;
    }>;
    getOrdersByUserId(userId: string): Promise<({
        user: {
            id: string;
            email: string;
            password: string;
            telephone: string | null;
            name: string | null;
            firstName: string | null;
            lastName: string | null;
            role: import(".prisma/client").$Enums.Role;
            oauthProvider: string | null;
            oauthId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        orderItems: ({
            product: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                isBulk: boolean;
                price: number;
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
                name: string;
                productId: string;
                price: number | null;
                stock: number;
            } | null;
        } & {
            id: string;
            productId: string | null;
            variantId: string | null;
            bulkId: string | null;
            quantity: number;
            price: number;
            bundleId: string | null;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string;
        isBulk: number;
        total: number;
        address: string;
        phoneNumber: string;
        discountCodeId: string | null;
    })[]>;
}
