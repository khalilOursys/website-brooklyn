import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateBulkProductDto {
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
  // Optional discount percentage for bulk orders
  discount?: number;
}
