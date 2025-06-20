import { Role } from '@prisma/client';
import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string; // This will be hashed before saving

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
