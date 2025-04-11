import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStockAlertDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  // Optional: Some products have variants and users might want alerts for a specific variant.
  @IsOptional()
  @IsString()
  variantId?: string;
}
