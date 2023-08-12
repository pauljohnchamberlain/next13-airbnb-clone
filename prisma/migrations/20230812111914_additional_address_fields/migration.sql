-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "country" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "openingHours" JSONB,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "postcode" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "street" TEXT,
ADD COLUMN     "suburb" TEXT,
ADD COLUMN     "video" TEXT,
ADD COLUMN     "website" TEXT;
