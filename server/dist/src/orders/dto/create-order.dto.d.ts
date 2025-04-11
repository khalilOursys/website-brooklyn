declare class OrderItemDto {
    productId: string;
    variantId?: string;
    quantity: number;
    price: number;
}
export declare class CreateOrderDto {
    userId: string;
    address: string;
    phoneNumber: string;
    discountCodeId?: string;
    orderItems: OrderItemDto[];
    total: number;
}
export {};
