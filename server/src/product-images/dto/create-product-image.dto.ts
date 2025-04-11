import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateProductImageDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  url: string; // URL of the image (e.g., S3 or static server link)

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean; // Defaults can be handled in the service/model
}
