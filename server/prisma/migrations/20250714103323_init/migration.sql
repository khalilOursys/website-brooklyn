/*
  Warnings:

  - You are about to drop the column `quantity` on the `ProductBundle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductBundle" DROP COLUMN "quantity",
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;
