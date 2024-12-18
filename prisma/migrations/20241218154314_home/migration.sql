/*
  Warnings:

  - Changed the type of `furnitureAvailable` on the `Home` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `petsPermission` on the `Home` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `parkingAvailable` on the `Home` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('Yes', 'No');

-- AlterTable
ALTER TABLE "Home" DROP COLUMN "furnitureAvailable",
ADD COLUMN     "furnitureAvailable" "Permission" NOT NULL,
DROP COLUMN "petsPermission",
ADD COLUMN     "petsPermission" "Permission" NOT NULL,
DROP COLUMN "parkingAvailable",
ADD COLUMN     "parkingAvailable" "Permission" NOT NULL;
