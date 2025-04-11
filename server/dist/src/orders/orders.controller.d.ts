import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<{
        orderItems: {
            id: string;
            price: number;
            productId: string;
            quantity: number;
            variantId: string | null;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string;
        total: number;
        address: string;
        phoneNumber: string;
        discountCodeId: string | null;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            email: string;
            password: string | null;
            name: string | null;
            role: import(".prisma/client").$Enums.Role;
            oauthProvider: string | null;
            oauthId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        orderItems: {
            id: string;
            price: number;
            productId: string;
            quantity: number;
            variantId: string | null;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
            password: string | null;
            name: string | null;
            role: import(".prisma/client").$Enums.Role;
            oauthProvider: string | null;
            oauthId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        orderItems: {
            id: string;
            price: number;
            productId: string;
            quantity: number;
            variantId: string | null;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
        userId: string;
        status: string;
        total: number;
        address: string;
        phoneNumber: string;
        discountCodeId: string | null;
    }>;
}
