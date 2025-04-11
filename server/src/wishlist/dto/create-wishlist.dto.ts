import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;
}
