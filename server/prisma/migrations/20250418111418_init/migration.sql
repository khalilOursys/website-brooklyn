-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "bulkId" TEXT;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_bulkId_fkey" FOREIGN KEY ("bulkId") REFERENCES "BulkProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;
