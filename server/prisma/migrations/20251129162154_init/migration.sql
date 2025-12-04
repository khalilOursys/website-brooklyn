-- DropIndex
DROP INDEX "City_country_idx";

-- DropIndex
DROP INDEX "City_name_country_key";

-- DropIndex
DROP INDEX "City_name_idx";

-- AlterTable
ALTER TABLE "City" ALTER COLUMN "state" DROP NOT NULL;
