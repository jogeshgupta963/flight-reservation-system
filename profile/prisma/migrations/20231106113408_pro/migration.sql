/*
  Warnings:

  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "profile";

-- CreateTable
CREATE TABLE "Profile" (
    "ProfileId" SERIAL NOT NULL,
    "Image" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "pincode" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("ProfileId")
);
