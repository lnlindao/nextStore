/*
  Warnings:

  - You are about to drop the `Sizes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stock` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rating` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_productId_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_sizeId_fkey";

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "rating" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT;

-- DropTable
DROP TABLE "Sizes";

-- DropTable
DROP TABLE "Stock";

-- CreateTable
CREATE TABLE "Variations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "classColor" TEXT,
    "selectedClass" TEXT,
    "optionName" TEXT NOT NULL,

    CONSTRAINT "Variations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Options" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariationsByProduct" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "optionsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "VariationsByProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesByProduct" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "categorieId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CategoriesByProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Variations_name_key" ON "Variations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Options_name_key" ON "Options"("name");

-- CreateIndex
CREATE UNIQUE INDEX "VariationsByProduct_productId_optionsId_key" ON "VariationsByProduct"("productId", "optionsId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoriesByProduct_productId_categorieId_key" ON "CategoriesByProduct"("productId", "categorieId");

-- AddForeignKey
ALTER TABLE "Variations" ADD CONSTRAINT "Variations_optionName_fkey" FOREIGN KEY ("optionName") REFERENCES "Options"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariationsByProduct" ADD CONSTRAINT "VariationsByProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariationsByProduct" ADD CONSTRAINT "VariationsByProduct_optionsId_fkey" FOREIGN KEY ("optionsId") REFERENCES "Variations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesByProduct" ADD CONSTRAINT "CategoriesByProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesByProduct" ADD CONSTRAINT "CategoriesByProduct_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
