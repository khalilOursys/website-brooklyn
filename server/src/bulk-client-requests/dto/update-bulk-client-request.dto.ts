import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateBulkClientRequestDto {
  @IsOptional()
  @IsString()
  status?: string; // e.g., "pending", "approved", "rejected"

  @IsOptional()
  @IsString()
  reviewedById?: string; // The ID of the manager/admin who reviewed the request

  @IsOptional()
  @IsDateString()
  reviewedAt?: string; // Date when the request was reviewed
}
