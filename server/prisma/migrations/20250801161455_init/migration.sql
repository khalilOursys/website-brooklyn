-- DropIndex
DROP INDEX "HeroBanner_name_key";

-- AlterTable
ALTER TABLE "HeroBanner" ALTER COLUMN "name" DROP NOT NULL;
