declare class ProductImageDto {
    url: string;
    isPrimary?: boolean;
}
export declare class CreateProductVariantDto {
    productId: string;
    name: string;
    stock: number;
    color?: string;
    images?: ProductImageDto[];
}
export {};
