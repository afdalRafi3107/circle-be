/*
  Warnings:

  - You are about to drop the column `replyerID` on the `Reply` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posId` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_replyerID_fkey";

-- AlterTable
ALTER TABLE "Reply" DROP COLUMN "replyerID",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "posId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_posId_fkey" FOREIGN KEY ("posId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
