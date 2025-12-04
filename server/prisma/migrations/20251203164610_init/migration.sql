/*
  Warnings:

  - You are about to drop the column `discount` on the `BulkProductCity` table. All the data in the column will be lost.
  - You are about to drop the column `isSelected` on the `BulkProductCity` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `BulkProductCity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BulkProductCity" DROP COLUMN "discount",
DROP COLUMN "isSelected",
DROP COLUMN "quantity";
