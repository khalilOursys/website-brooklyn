import { PartialType } from '@nestjs/mapped-types';
import { CreateBulkProductDto } from './create-bulk-product.dto';

export class UpdateBulkProductDto extends PartialType(CreateBulkProductDto) {}
