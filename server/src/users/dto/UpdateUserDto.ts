import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';
import { Role } from '@prisma/client'; // Assuming Role is an enum defined in Prisma

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  password?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
