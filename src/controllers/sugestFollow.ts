import { Request, Response } from "express";

import { prisma } from "../prisma/prisma";

export async function sugestFollow(req: Request, res: Response) {
  try {
    const loginedUser = (req as any).user?.id;
    const followingList = await prisma.follow.findMany({
      where: {
        followerId: loginedUser,
      },
      select: {
        following: true,
      },
    });

    const followingListIds = followingList.map(
      (follow) => follow.following?.id
    );

    console.log(followingListIds);
    console.log(loginedUser);

    const sugestFollow = await prisma.profile.findMany({
      where: {
        userId: {
          // not: loginedUser,
          notIn: [loginedUser, ...followingListIds],
        },
      },
      take: 4,
      include: {
        userProfile: {
          omit: {
            password: true,
          },
        },
      },
    });
    res.json(sugestFollow);
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error?.message || "Unknown error",
    });
  }
}
