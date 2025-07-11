import { Response, Request } from "express";
import { prisma } from "../../../prisma/prisma";

export async function getMediaByUserProfile(req: Request, res: Response) {
  const userId = parseInt(req.params.id);
  const getPostUser = await prisma.post.findMany({
    orderBy: {
      createAt: "desc",
    },
    where: {
      authorID: userId,
    },
    select: {
      img: true,
    },
  });

  res.json(getPostUser);
  return;
}
