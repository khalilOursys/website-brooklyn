import { IsString, IsNotEmpty, IsInt, Min, Max, IsOptional } from 'class-validator';

export class CreateProductRatingDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  // You might derive userId from the authenticated request; for now, include it in the DTO.
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
