/*
  Warnings:

  - You are about to drop the column `bulkPrice` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "bulkPrice";

-- CreateTable
CREATE TABLE "BulkProduct" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "bulkPrice" DOUBLE PRECISION NOT NULL,
    "minQuantity" INTEGER NOT NULL,
    "discount" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BulkProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BulkProduct_productId_key" ON "BulkProduct"("productId");

-- AddForeignKey
ALTER TABLE "BulkProduct" ADD CONSTRAINT "BulkProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
