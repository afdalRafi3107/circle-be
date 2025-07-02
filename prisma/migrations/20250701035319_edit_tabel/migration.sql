/*
  Warnings:

  - You are about to drop the column `userId` on the `Follow` table. All the data in the column will be lost.
  - Added the required column `Follwer` to the `Follow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_userId_fkey";

-- AlterTable
ALTER TABLE "Follow" DROP COLUMN "userId",
ADD COLUMN     "Follwer" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_Follwer_fkey" FOREIGN KEY ("Follwer") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
