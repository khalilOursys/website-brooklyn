import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Role } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    let userId = createOrderDto.userId;

    // If no user ID provided, handle guest user
    if (!userId) {
      if (!createOrderDto.guestUser) {
        throw new BadRequestException('Guest user information is required');
      }

      // Get email from guest user or fallback to environment variable
      const guestEmail =
        createOrderDto.guestUser.email || process.env.EMAIL_USER;

      if (!guestEmail) {
        throw new BadRequestException('Email is required for guest user');
      }

      // Check if guest user already exists with the same email
      const existingGuestUser = await this.prisma.user.findFirst({
        where: {
          email: guestEmail,
          role: Role.GUEST,
        },
      });

      if (existingGuestUser) {
        // Use existing guest user
        userId = existingGuestUser.id;

        // Update the existing guest user's information if needed
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            firstName: createOrderDto.guestUser.firstName,
            lastName: createOrderDto.guestUser.lastName,
            telephone: createOrderDto.guestUser.phoneNumber,
            email: guestEmail, // Use the determined email
          },
        });
      } else {
        // Create new guest user with the determined email
        const hashedPassword = await bcryptjs.hash(
          `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          10,
        );
        const guestUser = await this.prisma.user.create({
          data: {
            email: guestEmail,
            password: `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            role: Role.GUEST,
            firstName: createOrderDto.guestUser.firstName,
            lastName: createOrderDto.guestUser.lastName,
            telephone: createOrderDto.guestUser.phoneNumber,
            isActive: false,
          },
        });
        userId = guestUser.id;
      }
    } else {
      // Validate user exists if ID was provided
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new BadRequestException(`User with id ${userId} does not exist.`);
      }
    }

    return await this.prisma.$transaction(async (prisma) => {
      // First, verify stock availability for all items
      for (const item of createOrderDto.orderItems) {
        if (item.variantId) {
          const variant = await prisma.productVariant.findUnique({
            where: { id: item.variantId },
            include: { product: true },
          });

          if (!variant || variant.stock < item.quantity) {
            throw new BadRequestException(
              `Stock insuffisant pour cette variante ${variant?.name || item.variantId}`,
            );
          }
        } else if (item.bulkId) {
          const bulk = await prisma.bulkProduct.findUnique({
            where: { id: item.bulkId },
          });
          if (!bulk) {
            throw new BadRequestException(
              `Bundle with id ${item.bulkId} not found`,
            );
          }

          if (bulk.minQuantity < item.quantity) {
            throw new BadRequestException(
              `Stock insuffisant pour cette produit en gros ${bulk.name}`,
            );
          }
        } else if (item.productId) {
          const product = await prisma.product.findUnique({
            where: { id: item.productId },
            include: { variants: true },
          });

          if (!product) {
            throw new BadRequestException(
              `Product with id ${item.productId} not found`,
            );
          }

          if (product.stock < item.quantity) {
            throw new BadRequestException(
              `Stock insuffisant pour cette produit ${product.name}`,
            );
          }
        }

        if (item.bundleId) {
          const bundle = await prisma.productBundle.findUnique({
            where: { id: item.bundleId },
          });
          if (!bundle) {
            throw new BadRequestException(
              `Bundle with id ${item.bundleId} not found`,
            );
          }

          if (bundle.stock < item.quantity) {
            throw new BadRequestException(
              `Stock insuffisant pour cette pack ${bundle.name}`,
            );
          }
        }
      }

      // Create the order with the user ID (either provided or guest)
      const order = await prisma.order.create({
        data: {
          userId: userId,
          address: createOrderDto.address,
          phoneNumber: createOrderDto.phoneNumber,
          discountCodeId: createOrderDto.discountCodeId,
          total: createOrderDto.total,
          isBulk: createOrderDto.isBulk,
          orderItems: {
            create: createOrderDto.orderItems.map((item) => ({
              productId: item.productId,
              variantId: item.variantId,
              bundleId: item.bundleId,
              bulkId: item.bulkId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: { orderItems: true },
      });

      // Update stock levels
      for (const item of createOrderDto.orderItems) {
        if (item.variantId) {
          await prisma.productVariant.update({
            where: { id: item.variantId },
            data: { stock: { decrement: item.quantity } },
          });
        } else if (item.bulkId) {
          await prisma.bulkProduct.update({
            where: { id: item.bulkId },
            data: { minQuantity: { decrement: item.quantity } },
          });
        } else if (item.productId) {
          await prisma.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
          });
        }

        if (item.bundleId) {
          await prisma.productBundle.update({
            where: { id: item.bundleId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }

      // Only clear cart if it's a registered user (not guest)
      if (createOrderDto.userId) {
        const cart = await prisma.cart.findUnique({
          where: { userId: createOrderDto.userId },
        });

        if (cart) {
          await prisma.cartItem.deleteMany({
            where: { cartId: cart.id },
          });
        }
      }

      return order;
    });
  }
  async findAll(isBulk: number) {
    return await this.prisma.order.findMany({
      where: { isBulk },
      orderBy: { createdAt: 'desc' },
      include: { orderItems: true, user: true },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
            variant: {
              include: {
                images: true,
              },
            },
            bulk: true, // Include bulk if needed
            bundle: true, // Include variant if needed
          },
        },
        user: true,
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found.`);
    }
    return order;
  }

  /* async update(id: string, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);
    return await this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });
  } */
  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.prisma.$transaction(async (prisma) => {
      // Get the existing order with all items
      const existingOrder = await prisma.order.findUnique({
        where: { id },
        include: {
          orderItems: true,
        },
      });
      if (!existingOrder) {
        throw new NotFoundException(`Order with id ${id} not found`);
      }

      if (
        updateOrderDto.status === 'Annuler' &&
        existingOrder.status !== 'Annuler'
      ) {
        console.log(existingOrder.orderItems);
        // Restore stock for all items in the order
        for (const item of existingOrder.orderItems) {
          if (item.variantId) {
            // Restore variant stock
            await prisma.productVariant.update({
              where: { id: item.variantId },
              data: { stock: { increment: item.quantity } },
            });
          } else if (item.bulkId) {
            await prisma.bulkProduct.update({
              where: { id: item.bulkId },
              data: { minQuantity: { increment: item.quantity } },
            });
          } else if (item.productId) {
            await prisma.product.update({
              where: { id: item.productId },
              data: { stock: { increment: item.quantity } },
            });
          } else if (item.bundleId) {
            // Restore stock for bundle components
            await prisma.productBundle.update({
              where: { id: item.bundleId },
              data: { stock: { increment: item.quantity } },
            });
          }
        }
      } else if (
        updateOrderDto.status === 'en attente' &&
        existingOrder.status !== 'en attente'
      ) {
        // Restore stock for all items in the order
        for (const item of existingOrder.orderItems) {
          if (item.variantId) {
            // Restore variant stock
            await prisma.productVariant.update({
              where: { id: item.variantId },
              data: { stock: { decrement: item.quantity } },
            });
          } else if (item.bulkId) {
            await prisma.bulkProduct.update({
              where: { id: item.bulkId },
              data: { minQuantity: { decrement: item.quantity } },
            });
          } else if (item.productId) {
            await prisma.product.update({
              where: { id: item.productId },
              data: { stock: { decrement: item.quantity } },
            });
          } else if (item.bundleId) {
            // Restore stock for bundle components
            await prisma.productBundle.update({
              where: { id: item.bundleId },
              data: { stock: { decrement: item.quantity } },
            });
          }
        }
      }

      // Update the order (only status and other non-item fields)
      return await this.prisma.order.update({
        where: { id },
        data: updateOrderDto,
      });
    });
  }
  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.order.delete({
      where: { id },
    });
  }

  async getOrdersByUserId(userId: string) {
    const orders = await this.prisma.order.findMany({
      // Use `findMany` since a user can have multiple orders
      where: { userId }, // Filter by userId
      include: {
        orderItems: {
          include: {
            product: true, // Include product details
            variant: true, // Include variant if needed
          },
        },
        user: true, // Include user details (optional)
      },
      orderBy: {
        createdAt: 'desc', // Optional: Sort by newest first
      },
    });

    if (!orders || orders.length === 0) {
      throw new NotFoundException(
        `No orders found for user with ID ${userId}.`,
      );
    }

    return orders;
  }
}
