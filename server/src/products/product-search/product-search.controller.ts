import { Controller, Get, Query } from '@nestjs/common';
import { ProductSearchService } from './product-search.service';
import { SearchProductDto } from './dto/search-product.dto';

@Controller('product-search')
export class ProductSearchController {
  constructor(private readonly productSearchService: ProductSearchService) {}

  @Get()
  async search(@Query() query: SearchProductDto) {
    return await this.productSearchService.searchProducts(query);
  }
}
