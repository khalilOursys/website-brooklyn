declare class OrderItemDto {
    productId?: string | null;
    variantId?: string | null;
    bulkId?: string | null;
    bundleId?: string | null;
    quantity: number;
    price: number;
}
declare class GuestUserDto {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email?: string;
}
export declare class CreateOrderDto {
    userId?: string;
    address: string;
    isBulk: number;
    phoneNumber: string;
    discountCodeId?: string;
    orderItems: OrderItemDto[];
    total: number;
    guestUser?: GuestUserDto;
}
export {};
