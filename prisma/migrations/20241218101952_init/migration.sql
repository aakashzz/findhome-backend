-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Customer', 'Owner', 'Admin');

-- CreateEnum
CREATE TYPE "Property" AS ENUM ('Apartment', 'Villa', 'Townhouse', 'Bungalow', 'Farmhouse', 'Condo', 'Studio');

-- CreateEnum
CREATE TYPE "HomeStatus" AS ENUM ('Available', 'Rented');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('Pending', 'Accepted', 'Rejected');

-- CreateEnum
CREATE TYPE "Payment_Status" AS ENUM ('Success', 'Unsuccess', 'Cancel', 'Pending');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "isVerified" BOOLEAN,
    "profession" TEXT,
    "role" "UserRole" NOT NULL,
    "profilePicture" TEXT,
    "mobileNumber" TEXT,
    "address" TEXT,
    "verifyToken" TEXT,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Home" (
    "id" UUID NOT NULL,
    "thumbnail" TEXT,
    "imagesOfHome" TEXT[],
    "status" "HomeStatus" NOT NULL,
    "rent_price" TEXT NOT NULL,
    "discounted_rent_price" TEXT NOT NULL,
    "discount_rate" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "pinCode" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "depositAmount" VARCHAR(255) NOT NULL,
    "bedrooms" TEXT NOT NULL,
    "bathrooms" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "propertyType" "Property" NOT NULL,
    "availableFrom" TIMESTAMP(3) NOT NULL,
    "lessDurationMonths" TEXT NOT NULL,
    "furnitureAvailable" BOOLEAN NOT NULL,
    "petsPermission" BOOLEAN NOT NULL,
    "parkingAvailable" BOOLEAN NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Home_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" UUID NOT NULL,
    "homeId" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "booking_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bookingStatus" "BookingStatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" UUID NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "payment_status" "Payment_Status" NOT NULL DEFAULT 'Pending',
    "payment_amount" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "payment_mode" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "details" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "DateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Home" ADD CONSTRAINT "Home_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Home"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
