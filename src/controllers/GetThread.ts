import { Response, Request } from "express";
import { prisma } from "../prisma/prisma";

export async function Thread(req: Request, res: Response) {
  try {
    const userId = (req as any).user;
    const loggedID = userId.id;

    const following = await prisma.follow.findMany({
      where: {
        followerId: loggedID,
      },
      select: {
        followingId: true,
      },
    });

    const Followed = following
      .map((item) => item.followingId)
      .filter((id): id is number => id !== null); //

    const targetAuthorID = [...Followed, loggedID];

    const getPostUser = await prisma.post.findMany({
      orderBy: {
        createAt: "desc",
      },
      where: {
        authorID: {
          in: targetAuthorID,
        },
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

    res.json(getPostUser);
  } catch (error) {}
}
