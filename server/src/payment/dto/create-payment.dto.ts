import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  method: string; // e.g., "stripe", "paypal"

  @IsString()
  @IsNotEmpty()
  status: string; // e.g., "pending", "completed", "failed"

  @IsOptional()
  @IsString()
  paymentId?: string; // External payment identifier (if any)
}
