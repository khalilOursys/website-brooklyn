import { IsOptional, IsNumber } from 'class-validator';

export class UpdateCartItemDto {
  @IsOptional()
  @IsNumber()
  quantity?: number;
}
