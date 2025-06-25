import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  IsBoolean,
} from 'class-validator';

class ProductImageDto {
  @IsString()
  url: string;

  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean = false;
}
export class CreateProductVariantDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  name: string; // e.g., "Red" or "Large"

  @IsNumber()
  stock: number;

  @IsString()
  @IsOptional()
  color?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  @IsOptional()
  images?: ProductImageDto[];
}
