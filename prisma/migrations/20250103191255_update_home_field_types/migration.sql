/*
  Warnings:

  - Changed the type of `rent_price` on the `Home` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rating` on the `Home` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `BHK` on the `Home` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Home" DROP COLUMN "rent_price",
ADD COLUMN     "rent_price" INTEGER NOT NULL,
DROP COLUMN "rating",
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL,
DROP COLUMN "BHK",
ADD COLUMN     "BHK" INTEGER NOT NULL;
