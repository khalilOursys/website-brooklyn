import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateProductImageDto {
  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}
