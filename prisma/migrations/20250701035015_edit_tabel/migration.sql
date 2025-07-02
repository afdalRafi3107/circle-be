-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_following_fkey" FOREIGN KEY ("following") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
