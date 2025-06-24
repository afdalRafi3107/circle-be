-- CreateTable
CREATE TABLE "Reply" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "replyerID" INTEGER NOT NULL,
    "idThread" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_replyerID_fkey" FOREIGN KEY ("replyerID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
