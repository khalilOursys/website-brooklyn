import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string; // This will be hashed before saving

  @IsOptional()
  @IsString()
  name?: string;
}
