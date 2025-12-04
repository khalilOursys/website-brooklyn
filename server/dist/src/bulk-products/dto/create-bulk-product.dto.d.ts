declare class BulkProductCityDto {
    cityId: string;
}
export declare class CreateBulkProductDto {
    name: string;
    productId: string;
    bulkPrice: number;
    minQuantity: number;
    discount?: number;
    bulkProductCities: BulkProductCityDto[];
}
export {};
