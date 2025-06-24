import { Response, Request } from "express";
import { prisma } from "../../prisma/prisma";

export async function getMEdiaUSer(req: Request, res: Response) {
  const userId = (req as any).user;
  const loggedID = userId.id;
  const getPostUser = await prisma.post.findMany({
    orderBy: {
      createAt: "desc",
    },
    where: {
      authorID: loggedID,
    },
    select: {
      img: true,
    },
  });

  res.json(getPostUser);
  return;
}
