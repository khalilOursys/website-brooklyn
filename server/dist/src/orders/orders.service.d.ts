import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<{
        orderItems: {
            id: string;
            price: number;
            variantId: string | null;
            productId: string | null;
            quantity: number;
            bulkId: string | null;
            bundleId: string | null;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isBulk: number;
        userId: string;
        status: string;
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
            isActive: boolean;
            oauthProvider: string | null;
            oauthId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        orderItems: {
            id: string;
            price: number;
            variantId: string | null;
            productId: string | null;
            quantity: number;
            bulkId: string | null;
            bundleId: string | null;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isBulk: number;
        userId: string;
        status: string;
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
            isActive: boolean;
            oauthProvider: string | null;
            oauthId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        orderItems: ({
            product: ({
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
                stock: number;
                isBulk: boolean;
                discount: number | null;
                isFeatured: boolean;
                specs: import("@prisma/client/runtime/library").JsonValue | null;
                categoryId: string;
                brandId: string;
                averageRating: number | null;
                ratingCount: number;
            }) | null;
            variant: ({
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
                color: string | null;
                stock: number;
                productId: string;
            }) | null;
            bundle: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                img: string | null;
                stock: number;
                discount: number;
                expiresAt: Date | null;
            } | null;
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
            price: number;
            variantId: string | null;
            productId: string | null;
            quantity: number;
            bulkId: string | null;
            bundleId: string | null;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isBulk: number;
        userId: string;
        status: string;
        total: number;
        address: string;
        phoneNumber: string;
        discountCodeId: string | null;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isBulk: number;
        userId: string;
        status: string;
        total: number;
        address: string;
        phoneNumber: string;
        discountCodeId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isBulk: number;
        userId: string;
        status: string;
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
            isActive: boolean;
            oauthProvider: string | null;
            oauthId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        orderItems: ({
            product: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                color: string | null;
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
            } | null;
            variant: {
                id: string;
                name: string;
                isActive: boolean;
                color: string | null;
                stock: number;
                productId: string;
            } | null;
        } & {
            id: string;
            price: number;
            variantId: string | null;
            productId: string | null;
            quantity: number;
            bulkId: string | null;
            bundleId: string | null;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isBulk: number;
        userId: string;
        status: string;
        total: number;
        address: string;
        phoneNumber: string;
        discountCodeId: string | null;
    })[]>;
}
