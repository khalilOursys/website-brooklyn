import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateBulkClientRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  storeName: string;

  @IsUrl()
  @IsNotEmpty()
  legalDocs: string; // URL to the uploaded legal documents
}
