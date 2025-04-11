declare class ProductImageDto {
    url: string;
    isPrimary?: boolean;
}
declare class ProductAttributeDto {
    key: string;
    value: string;
}
export declare class CreateProductDto {
    name: string;
    description?: string;
    price: number;
    stock: number;
    isBulk?: boolean;
    discount?: number;
    isFeatured?: boolean;
    specs?: Record<string, any>;
    categoryId: string;
    brandId: string;
    images?: ProductImageDto[];
    attributes?: ProductAttributeDto[];
}
export {};
