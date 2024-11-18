/*
  Warnings:

  - The primary key for the `Sales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `totalamount` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `unitprice` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Sales` table. All the data in the column will be lost.
  - Added the required column `saleId` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_pkey",
DROP COLUMN "totalamount",
DROP COLUMN "unitprice",
DROP COLUMN "userId",
ADD COLUMN     "saleId" TEXT NOT NULL,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "unitPrice" DOUBLE PRECISION NOT NULL,
ADD CONSTRAINT "Sales_pkey" PRIMARY KEY ("saleId");
