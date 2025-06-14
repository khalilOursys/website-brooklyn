declare class OrderItemDto {
    productId?: string | null;
    variantId?: string | null;
    bulkId?: string | null;
    bundleId?: string | null;
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
