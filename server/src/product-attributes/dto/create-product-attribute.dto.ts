import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProductAttributeDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  key: string; // e.g., "RAM"

  @IsString()
  @IsNotEmpty()
  value: string; // e.g., "16GB"
}
