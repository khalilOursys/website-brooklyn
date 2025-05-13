import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCartItemDto {
  @IsString()
  @IsNotEmpty()
  cartId: string; // The cart to which the item is added

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsOptional()
  @IsString()
  bulkId?: string; // Optional, for  bulk products

  @IsOptional()
  @IsString()
  variantId?: string; // Optional, for products with variants

  @IsNumber()
  quantity: number;
}
