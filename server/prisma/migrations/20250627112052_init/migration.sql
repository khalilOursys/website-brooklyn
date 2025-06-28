/*
  Warnings:

  - Made the column `productId` on table `BulkProduct` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BulkProduct" DROP CONSTRAINT "BulkProduct_productId_fkey";

-- AlterTable
ALTER TABLE "BulkProduct" ALTER COLUMN "productId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "BulkProduct" ADD CONSTRAINT "BulkProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
