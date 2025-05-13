declare class BundleItemDto {
    productId: string;
    quantity: number;
}
export declare class CreateProductBundleDto {
    name: string;
    discount: number;
    expiresAt?: string;
    img?: string;
    products: BundleItemDto[];
}
export {};
