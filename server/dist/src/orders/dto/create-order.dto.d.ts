declare class OrderItemDto {
    productId: string;
    variantId?: string;
    bulkId?: string;
    quantity: number;
    price: number;
}
export declare class CreateOrderDto {
    userId: string;
    address: string;
    isBulk: number;
    phoneNumber: string;
    discountCodeId?: string;
    orderItems: OrderItemDto[];
    total: number;
}
export {};
