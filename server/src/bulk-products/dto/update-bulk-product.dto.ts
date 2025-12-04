import { PartialType } from '@nestjs/mapped-types';
import { CreateBulkProductDto } from './create-bulk-product.dto';
import {
  IsArray,
  ValidateNested,
  IsOptional,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class BulkProductCityDto {
  @IsString()
  @IsNotEmpty()
  cityId: string;
}

export class UpdateBulkProductDto extends PartialType(CreateBulkProductDto) {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BulkProductCityDto)
  @IsOptional()
  bulkProductCities?: BulkProductCityDto[];
}
