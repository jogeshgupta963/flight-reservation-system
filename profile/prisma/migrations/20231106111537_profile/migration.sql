-- CreateTable
CREATE TABLE "profile" (
    "ProfileId" SERIAL NOT NULL,
    "Image" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "pincode" INTEGER NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("ProfileId")
);
