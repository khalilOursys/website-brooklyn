import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  // Get the cart for a user. Each user has a unique cart.
  async getCartByUser(userId: string) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
            bulk: true,
          },
        },
      },
    });
    // Optionally, if a cart doesn't exist, create one automatically.
    /* if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: { items: true },
      });
    } */
    return cart;
  }

  // Add an item to the cart.
  async addCartItem(createCartItemDto: CreateCartItemDto) {
    // Check if the cart exists
    const cart = await this.prisma.cart.findUnique({
      where: { id: createCartItemDto.cartId },
    });
    if (!cart) {
      throw new NotFoundException(
        `Cart with id ${createCartItemDto.cartId} not found.`,
      );
    }

    // Optionally: Validate the product exists here

    // Check if an item with the same product and variant already exists in the cart
    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: createCartItemDto.cartId,
        productId: createCartItemDto.productId,
        variantId: createCartItemDto.variantId || null,
        bulkId: createCartItemDto.bulkId,
      },
    });

    if (existingItem) {
      // If the item exists, update the quantity instead
      return await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        /* data: { quantity: createCartItemDto.quantity }, */
        data: { quantity: existingItem.quantity + createCartItemDto.quantity },
      });
    }

    return await this.prisma.cartItem.create({
      data: {
        cartId: createCartItemDto.cartId,
        productId: createCartItemDto.productId,
        bulkId: createCartItemDto.bulkId,
        variantId: createCartItemDto.variantId
          ? createCartItemDto.variantId
          : null,
        quantity: createCartItemDto.quantity,
      },
    });
  }

  // Update a cart item (e.g., change quantity)
  async updateCartItem(id: string, updateCartItemDto: UpdateCartItemDto) {
    const cartItem = await this.prisma.cartItem.findUnique({ where: { id } });
    if (!cartItem) {
      throw new NotFoundException(`Cart item with id ${id} not found.`);
    }

    return await this.prisma.cartItem.update({
      where: { id },
      data: updateCartItemDto,
    });
  }

  // Remove a cart item
  async removeCartItem(id: string) {
    const cartItem = await this.prisma.cartItem.findUnique({ where: { id } });
    if (!cartItem) {
      throw new NotFoundException(`Cart item with id ${id} not found.`);
    }
    return await this.prisma.cartItem.delete({ where: { id } });
  }
}
