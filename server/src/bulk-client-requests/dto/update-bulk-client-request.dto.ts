import { IsOptional, IsString, IsDateString, IsEmail } from 'class-validator';

export class UpdateUserBulkRequestDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsString()
  @IsOptional()
  storeName?: string;

  @IsString()
  @IsOptional()
  legalDocs?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
