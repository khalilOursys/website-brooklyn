import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHeroBannerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional() // Allow variantId to be optional
  description?: string;

  @IsOptional() // Allow variantId to be optional
  img?: string;
}
