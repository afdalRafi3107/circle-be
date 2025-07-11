import { prisma } from "../prisma/prisma";
import { Request, Response } from "express";

export async function userProfile(req: Request, res: Response) {
  try {
    const userId = (req as any).user;
    const loggedId = userId?.id;
    if (!loggedId) {
      res.status(401).json({ message: "Unauthorized: User not found" });
      return;
    }
    const user = await prisma.user.findFirst({
      where: {
        id: loggedId,
      },
      include: {
        profile: {
          select: {
            photoProfile: true,
            banner: true,
            bio: true,
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            follow: true,
            followers: true,
          },
        },
      },
    });
    res.json(user);
  } catch (error) {
    res.status(400);
  }
}
