-- CreateTable
CREATE TABLE "LikeReply" (
    "id" SERIAL NOT NULL,
    "replyId" INTEGER NOT NULL,
    "authorID" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LikeReply_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LikeReply" ADD CONSTRAINT "LikeReply_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeReply" ADD CONSTRAINT "LikeReply_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
