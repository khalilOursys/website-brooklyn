import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsOptional()
  productId?: string | null;

  @IsOptional() // Allow variantId to be optional
  variantId?: string | null;

  @IsOptional() // Allow variantId to be optional
  bulkId?: string | null;

  @IsOptional() // Allow variantId to be optional
  bundleId?: string | null;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number; // Price at the time of order
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsNumber()
  isBulk: number;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsOptional() // Mark discountCodeId as optional
  @IsString()
  discountCodeId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];

  @IsNumber()
  total: number;
}
