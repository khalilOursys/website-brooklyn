import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  bannerColor: string;

  @IsString()
  @IsNotEmpty()
  bannerText: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsOptional()
  parentId?: string;

  @IsOptional()
  iconUrl?: string;

  @IsOptional()
  bgUrl?: string;
}
