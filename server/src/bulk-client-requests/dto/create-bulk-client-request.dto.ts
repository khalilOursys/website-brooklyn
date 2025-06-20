import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class CreateBulkClientRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsString()
  rib?: string;

  @IsOptional()
  @IsString()
  taxNumber?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsString()
  storeName: string;

  @IsString()
  legalDocs: string;
}
