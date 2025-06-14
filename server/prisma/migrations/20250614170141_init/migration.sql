-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "bundleId" TEXT;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_bundleId_fkey" FOREIGN KEY ("bundleId") REFERENCES "ProductBundle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
