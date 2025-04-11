"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.$transaction([
        prisma.notification.deleteMany(),
        prisma.stockAlert.deleteMany(),
        prisma.wishlist.deleteMany(),
        prisma.cartItem.deleteMany(),
        prisma.cart.deleteMany(),
        prisma.payment.deleteMany(),
        prisma.orderItem.deleteMany(),
        prisma.order.deleteMany(),
        prisma.discountCode.deleteMany(),
        prisma.productRating.deleteMany(),
        prisma.productAttribute.deleteMany(),
        prisma.productVariant.deleteMany(),
        prisma.productImage.deleteMany(),
        prisma.productTranslation.deleteMany(),
        prisma.bulkClientRequest.deleteMany(),
        prisma.bulkProduct.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany(),
        prisma.brand.deleteMany(),
        prisma.user.deleteMany(),
    ]);
    const users = await Promise.all([
        prisma.user.create({ data: { email: 'admin@techstore.com', password: 'hashedpassword123', name: 'Admin User', role: client_1.Role.ADMIN } }),
        prisma.user.create({ data: { email: 'client@techstore.com', password: 'hashedpassword123', name: 'John Doe', role: client_1.Role.CLIENT } }),
        prisma.user.create({ data: { email: 'bulk@techstore.com', password: 'hashedpassword123', name: 'Bulk Buyer', role: client_1.Role.BULK_CLIENT } }),
    ]);
    const categories = await Promise.all([
        prisma.category.create({ data: { name: 'Laptops', bannerColor: '#FF6B6B', bannerText: 'Latest Laptops' } }),
        prisma.category.create({ data: { name: 'Smartphones', bannerColor: '#4ECDC4', bannerText: 'New Smartphones' } }),
    ]);
    const brands = await Promise.all([
        prisma.brand.create({ data: { name: 'TechTrend' } }),
        prisma.brand.create({ data: { name: 'InnovaTech' } }),
    ]);
    const laptop = await prisma.product.create({
        data: {
            name: 'TechTrend Laptop Pro',
            description: 'High-performance laptop',
            price: 1299.99,
            stock: 50,
            isBulk: true,
            discount: 10,
            isFeatured: true,
            specs: { ram: '16GB', cpu: 'i7', storage: '1TB SSD' },
            categoryId: categories[0].id,
            brandId: brands[0].id,
            images: { create: [{ url: 'https://example.com/laptop-pro.jpg', isPrimary: true }] },
            variants: { create: [{ name: 'Silver', stock: 30, price: 1299.99 }, { name: 'Black', stock: 20, price: 1349.99 }] },
            attributes: { create: [{ key: 'RAM', value: '16GB' }, { key: 'Storage', value: '1TB SSD' }] },
        },
        include: { variants: true },
    });
    await prisma.bulkProduct.create({
        data: {
            productId: laptop.id,
            bulkPrice: 1099.99,
            minQuantity: 10,
            discount: 5,
        },
    });
    const smartphone = await prisma.product.create({
        data: {
            name: 'InnovaTech Smartphone X',
            description: 'Latest smartphone technology',
            price: 799.99,
            stock: 100,
            isBulk: false,
            categoryId: categories[1].id,
            brandId: brands[1].id,
            images: { create: [{ url: 'https://example.com/smartphone-x.jpg', isPrimary: true }] },
        },
    });
    await prisma.discountCode.create({
        data: { code: 'WELCOME10', discount: 10, expiresAt: new Date('2025-12-31') },
    });
    await prisma.bulkClientRequest.create({
        data: { userId: users[2].id, storeName: 'Bulk Tech Shop', legalDocs: 'https://example.com/docs.pdf', status: 'pending' },
    });
    const order = await prisma.order.create({
        data: {
            userId: users[1].id,
            total: 1299.99,
            status: 'pending',
            address: '123 Tech Street',
            phoneNumber: '+1234567890',
            orderItems: {
                create: [
                    {
                        productId: laptop.id,
                        variantId: laptop.variants[0].id,
                        quantity: 1,
                        price: 1299.99,
                    },
                ],
            },
        },
    });
    await prisma.cart.create({
        data: {
            userId: users[1].id,
            items: { create: [{ productId: smartphone.id, quantity: 1 }] },
        },
    });
    await prisma.wishlist.create({
        data: { userId: users[1].id, productId: laptop.id },
    });
    await prisma.productRating.create({
        data: {
            productId: laptop.id,
            userId: users[1].id,
            rating: 4,
            comment: 'Great laptop!',
            images: { create: [{ url: 'https://example.com/review-image.jpg' }] },
        },
    });
    console.log('Database seeded successfully!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map