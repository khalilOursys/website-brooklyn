import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  // Add a product to a user's wishlist
  async addWishlist(createWishlistDto: CreateWishlistDto) {
    // Check if the wishlist entry already exists
    const existing = await this.prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId: createWishlistDto.userId,
          productId: createWishlistDto.productId,
        },
      },
    });
    if (existing) {
      throw new BadRequestException('This product is already in the wishlist.');
    }
    return await this.prisma.wishlist.create({
      data: {
        userId: createWishlistDto.userId,
        productId: createWishlistDto.productId,
      },
    });
  }

  // Retrieve all wishlist items for a user
  async findByUser(userId: string) {
    return await this.prisma.wishlist.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { addedAt: 'desc' },
    });
  }

  // Remove a wishlist item by its ID
  async removeWishlist(id: string) {
    const wishlistItem = await this.prisma.wishlist.findUnique({ where: { id } });
    if (!wishlistItem) {
      throw new NotFoundException(`Wishlist item with id ${id} not found.`);
    }
    return await this.prisma.wishlist.delete({ where: { id } });
  }

  // Optionally, remove a wishlist item by userId and productId
  async removeByUserAndProduct(userId: string, productId: string) {
    const wishlistItem = await this.prisma.wishlist.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });
    if (!wishlistItem) {
      throw new NotFoundException(`Wishlist item for user ${userId} and product ${productId} not found.`);
    }
    return await this.prisma.wishlist.delete({ where: { id: wishlistItem.id } });
  }
}
