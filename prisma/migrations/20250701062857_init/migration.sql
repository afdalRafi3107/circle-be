/*
  Warnings:

  - You are about to drop the column `Follwer` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `following` on the `Follow` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_Follwer_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_following_fkey";

-- AlterTable
ALTER TABLE "Follow" DROP COLUMN "Follwer",
DROP COLUMN "following",
ADD COLUMN     "followerId" INTEGER,
ADD COLUMN     "followingId" INTEGER;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
