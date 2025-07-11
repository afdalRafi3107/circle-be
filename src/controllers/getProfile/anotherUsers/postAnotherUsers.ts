import { Response, Request } from "express";
import { prisma } from "../../../prisma/prisma";

export async function getPostAnotherUSers(req: Request, res: Response) {
  const userId = parseInt(req.params.id);

  const userPost = await prisma.post.findMany({
    orderBy: {
      createAt: "desc",
    },
    where: {
      authorID: userId,
    },
    include: {
      _count: {
        select: {
          like: true,
          reply: true,
        },
      },
      author: {
        select: {
          username: true,
          profile: {
            select: {
              name: true,
              photoProfile: true,
            },
          },
        },
      },
    },
  });
  res.json(userPost);
}
