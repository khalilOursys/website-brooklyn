import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsOptional()
  productId?: string | null;

  @IsOptional()
  variantId?: string | null;

  @IsOptional()
  bulkId?: string | null;

  @IsOptional()
  bundleId?: string | null;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}

class GuestUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  email?: string;
}

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsNumber()
  isBulk: number;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  discountCodeId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];

  @IsNumber()
  total: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => GuestUserDto)
  guestUser?: GuestUserDto;
}
