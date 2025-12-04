import { CreateBulkProductDto } from './create-bulk-product.dto';
declare class BulkProductCityDto {
    cityId: string;
}
declare const UpdateBulkProductDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBulkProductDto>>;
export declare class UpdateBulkProductDto extends UpdateBulkProductDto_base {
    bulkProductCities?: BulkProductCityDto[];
}
export {};
