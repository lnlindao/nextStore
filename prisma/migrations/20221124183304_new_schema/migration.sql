/*
  Warnings:

  - The primary key for the `Stock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Stock` table. All the data in the column will be lost.
  - Added the required column `assignedBy` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizeId` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_size_fkey";

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_pkey",
DROP COLUMN "id",
DROP COLUMN "size",
ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "assignedBy" TEXT NOT NULL,
ADD COLUMN     "sizeId" TEXT NOT NULL,
ADD CONSTRAINT "Stock_pkey" PRIMARY KEY ("productId", "sizeId");

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
