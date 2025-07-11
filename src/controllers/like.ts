import { Request, Response } from "express";

import { prisma } from "../prisma/prisma";
import e from "cors";

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
      res.json({ liked: true });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function LikeStatus(req: Request, res: Response) {
  try {
    const idPost = parseInt(req.params.id);

    const stautsLike = await prisma.like.findFirst({
      where: {
        posId: idPost,
      },
    });

    res.json({ isLiked: !!stautsLike });
  } catch (error) {
    res.status(500).json(error);
  }
}

//-------------------like reply------------------------

export async function LikeReply(req: Request, res: Response) {
  const userLoginId = (req as any).user.id;
  const replyId = parseInt(req.params.id);

  try {
    const existingLike = await prisma.likeReply.findFirst({
      where: {
        authorID: userLoginId,
        replyId: replyId,
      },
    });
    console.log(existingLike);

    let like;

    if (existingLike) {
      await prisma.likeReply.delete({
        where: {
          id: existingLike.id,
        },
      });
      res.json({ like: false });
    } else {
      await prisma.likeReply.create({
        data: {
          authorID: userLoginId,
          replyId: replyId,
        },
      });
      res.json({ like: true });
    }
  } catch (error) {}
}

export async function LikeReplyStatus(req: Request, res: Response) {
  const idReply = parseInt(req.params.id);

  try {
    const likeReplyStatus = await prisma.likeReply.findFirst({
      where: {
        replyId: idReply,
      },
    });
    res.json({ isLiked: !!likeReplyStatus });
  } catch (error) {
    res.status(500).json(error);
  }
}
