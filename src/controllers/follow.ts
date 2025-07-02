import { log } from "util";
import { prisma } from "../prisma/prisma";
import { Request, Response } from "express";

export async function Follow(req: Request, res: Response) {
  const userId = (req as any).user.id;

  const { followingId } = req.body;

  console.log("user yang login : ", userId);
  console.log("useryang mau di follow : ", followingId);

  try {
    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: userId,
        followingId: followingId,
      },
    });
    let follow;
    if (existingFollow) {
      await prisma.follow.delete({
        where: { id: existingFollow.id },
      });
      res.json(follow);
    } else {
      await prisma.follow.create({
        data: {
          followerId: userId,
          followingId: followingId,
        },
      });
    }
    res.json(follow);
  } catch (error) {
    res.status(500).json({ message: "somethong Went wrong" });
  }
}

export async function followStatus(req: Request, res: Response) {
  const logInnedUser = (req as any).user.id;
  const followingId = parseInt(req.params.id);
  console.log("fololow stauts :", followingId);
  console.log("user yang login 2", logInnedUser);

  try {
    const statusFollows = await prisma.follow.findFirst({
      where: {
        followerId: logInnedUser,
        followingId: followingId,
      },
    });
    res.json({ isFollowing: !!statusFollows });
  } catch (error) {
    res.status(401);
  }
}

// yang memfollow

export async function followers(req: Request, res: Response) {
  const loginedUser = (req as any).user.id;

  try {
    const followers = await prisma.follow.findMany({
      where: {
        followingId: loginedUser, // siapa yang follow saya
      },
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                name: true,
                photoProfile: true,
                id: true,
              },
            },
          },
        },
      },
    });
    res.json(followers);
  } catch (error) {
    res.status(401);
  }
}

export async function following(req: Request, res: Response) {
  const loginedUser = (req as any).user.id;
  console.log("user yang login ");

  // const Following = await prisma.user.findUnique({
  //   where: {
  //     id: loginedUser,
  //   },
  //   omit: {
  //     password: true,
  //     email: true,
  //   },
  //   include: {
  //     follow: {
  //       select: {
  //         following: true,
  //         profile: true,
  //       },
  //     },
  //   },
  // });

  try {
    const FOllowing = await prisma.user.findUnique({
      where: {
        id: loginedUser,
      },
      // omit: {
      //   password: true,
      //   email: true,
      // },
      select: {
        username: true,
        follow: {
          select: {
            followerId: true,
            following: {
              select: {
                username: true,
                profile: {
                  select: {
                    name: true,
                    photoProfile: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    res.json(FOllowing);
  } catch (error) {
    res.status(500).json(error);
  }

  // res.json(Following);
}
