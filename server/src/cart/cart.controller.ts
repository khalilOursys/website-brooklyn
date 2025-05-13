import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Get the cart for a specific user (e.g., GET /cart?userId=...)
  @Get()
  async getCart(@Query('userId') userId: string) {
    return await this.cartService.getCartByUser(userId);
  }

  // Add a new cart item
  @Post('items')
  async addCartItem(@Body() createCartItemDto: CreateCartItemDto) {
    return await this.cartService.addCartItem(createCartItemDto);
  }

  // Update a specific cart item
  @Put('items/:id')
  async updateCartItem(
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return await this.cartService.updateCartItem(id, updateCartItemDto);
  }

  // Delete a specific cart item
  @Delete('items/:id')
  async removeCartItem(@Param('id') id: string) {
    return await this.cartService.removeCartItem(id);
  }
}
