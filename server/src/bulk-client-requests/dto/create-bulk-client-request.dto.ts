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

  @IsString()
  storeName: string;

  @IsString()
  legalDocs: string;
}
