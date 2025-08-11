import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getStatisticsByProductAndBulk(startDate: Date, endDate: Date) {
    const orderItems = await this.prisma.orderItem.findMany({
      where: {
        order: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
      include: {
        product: true,
        bulk: {
          include: {
            product: true,
          },
        },
      },
    });

    const productStatsMap = new Map<string, any>();
    const bulkStatsMap = new Map<string, any>();

    for (const item of orderItems) {
      const quantity = item.quantity;
      const price = item.price;

      // Normal product sale
      if (item.product && !item.bulkId) {
        const id = item.product.id;
        const name = item.product.name;
        const purchasePrice = item.product.purchasePrice ?? 0;

        if (!productStatsMap.has(id)) {
          productStatsMap.set(id, {
            productId: id,
            productName: name,
            quantitySold: 0,
            revenue: 0,
            cost: 0,
            profit: 0,
          });
        }

        const stat = productStatsMap.get(id);
        stat.quantitySold += quantity;
        stat.revenue += price;
        stat.cost += purchasePrice * quantity;
        stat.profit += price - purchasePrice * quantity;
      } else if (item.bulk) {
        // Bulk product sale
        const bulkId = item.bulk.id;
        const bulkName = item.bulk.name ?? 'Unnamed Bulk';
        const product = item.bulk.product;
        const productId = product?.id;
        const productName = product?.name ?? 'Unknown';
        const purchasePrice = product?.purchasePrice ?? 0;

        if (!bulkStatsMap.has(bulkId)) {
          bulkStatsMap.set(bulkId, {
            bulkId,
            bulkName,
            productId,
            productName,
            quantitySold: 0,
            revenue: 0,
            cost: 0,
            profit: 0,
          });
        }

        const stat = bulkStatsMap.get(bulkId);
        stat.quantitySold += quantity;
        stat.revenue += price;
        stat.cost += purchasePrice * quantity;
        stat.profit += price - purchasePrice * quantity;
      }
    }

    return {
      products: Array.from(productStatsMap.values()),
      bulks: Array.from(bulkStatsMap.values()),
    };
  }
}
