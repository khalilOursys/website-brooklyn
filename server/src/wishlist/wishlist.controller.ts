import { Controller, Post, Get, Delete, Query, Body, Param } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  // Add an item to the wishlist
  @Post()
  async add(@Body() createWishlistDto: CreateWishlistDto) {
    return await this.wishlistService.addWishlist(createWishlistDto);
  }

  // Get all wishlist items for a user (e.g., GET /wishlist?userId=xxx)
  @Get()
  async findByUser(@Query('userId') userId: string) {
    return await this.wishlistService.findByUser(userId);
  }

  // Delete a wishlist item by its ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.wishlistService.removeWishlist(id);
  }

  // Optionally, delete by user and product IDs
  // @Delete()
  // async removeByUserAndProduct(@Query('userId') userId: string, @Query('productId') productId: string) {
  //   return await this.wishlistService.removeByUserAndProduct(userId, productId);
  // }
}
