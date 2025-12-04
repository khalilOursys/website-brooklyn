import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class BulkProductCityDto {
  @IsString()
  @IsNotEmpty()
  cityId: string;
}

export class CreateBulkProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @Min(0)
  bulkPrice: number;

  @IsNumber()
  @Min(1)
  minQuantity: number;

  @IsNumber()
  @IsOptional()
  discount?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BulkProductCityDto)
  bulkProductCities: BulkProductCityDto[];
}
