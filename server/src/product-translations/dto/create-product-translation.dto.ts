import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProductTranslationDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  language: string; // e.g., "en", "es", "fr"

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  // Description can be optional in some cases
  description?: string;
}
