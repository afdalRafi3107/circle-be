import { Response, Request } from "express";
import { prisma } from "../../prisma/prisma";

export async function getPostUser(req: Request, res: Response) {
  try {
    const userId = (req as any).user;
    const loggedID = userId.id;
    const getPostUser = await prisma.post.findMany({
      orderBy: {
        createAt: "desc",
      },
      where: {
        authorID: loggedID,
      },
      include: {
        _count: {
          select: {
            like: true,
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

    res.json(getPostUser);
  } catch (error) {}
}
