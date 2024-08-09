/*
  Warnings:

  - You are about to drop the column `productsId` on the `OrderProducts` table. All the data in the column will be lost.
  - Added the required column `productId` to the `OrderProducts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderProducts" DROP CONSTRAINT "OrderProducts_productsId_fkey";

-- AlterTable
ALTER TABLE "OrderProducts" DROP COLUMN "productsId",
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderProducts" ADD CONSTRAINT "OrderProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
