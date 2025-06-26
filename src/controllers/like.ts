import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../prisma/prisma";

export async function Like(req: Request, res: Response) {
  const posId = parseInt(req.params.id);
  const userId = (req as any).user?.id;
  if (!userId) {
    res.status(401).json({ message: "Unautorized" });
  }

  try {
    const existinglike = await prisma.like.findFirst({
      where: {
        posId,
        authorID: userId,
      },
    });
    let liked;

    if (existinglike) {
      await prisma.like.delete({
        where: { id: existinglike.id },
      });
      res.json({ liked: false });
    } else {
      await prisma.like.create({
        data: {
          posId,
          authorID: userId,
        },
      });
      res.json({ liked });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
