import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProductVariantDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  name: string; // e.g., "Red" or "Large"

  @IsNumber()
  stock: number;

  @IsOptional()
  @IsNumber()
  price?: number; // Override price, if any
}
