import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

class BundleItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  quantity: number;
}

export class CreateProductBundleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  discount: number; // Bundle discount percentage

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BundleItemDto)
  products: BundleItemDto[];
}
