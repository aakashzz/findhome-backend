/*
  Warnings:

  - You are about to alter the column `rating` on the `Home` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Home" ALTER COLUMN "rating" SET DATA TYPE INTEGER;
