-- DropForeignKey
ALTER TABLE "BulkProduct" DROP CONSTRAINT "BulkProduct_productId_fkey";

-- DropIndex
DROP INDEX "BulkProduct_productId_key";

-- AlterTable
ALTER TABLE "BulkProduct" ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BulkProduct" ADD CONSTRAINT "BulkProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
