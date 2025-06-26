import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../prisma/prisma";
import { Like } from "./like";

export async function detailThread(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const userId = (req as any).user?.id;

  try {
    const Detailthread = await prisma.post.findUnique({
      where: { id },
      include: {
        _count: {
          select: { reply: true, like: true },
        },
        like: {
          select: { authorID: true },
        },
        author: {
          select: {
            id: true,
            email: true,
            username: true,
            profile: true, // karena ini relasi, bisa langsung ambil
            // jangan sertakan password di sini
          },
        },
      },
    });

    if (!Detailthread) {
      res.status(404).json({ message: "post not fount" });
      return;
    }

    const isLike = Detailthread.like.some((like) => like.authorID === userId);

    res.json({
      ...Detailthread,
      isLike,
    });
    console.log("detail thread : ", Detailthread);
  } catch (error) {
    res.status(401);
  }
}

export async function Replythread(req: Request, res: Response) {
  const idThread = parseInt(req.params.id);
  const userId = (req as any).user;
  const loggedId = userId.id;
  const { comment } = req.body;

  if (!loggedId) {
    res.status(401).json({ message: "Unauthorized: User not found" });
    return;
  }

  try {
    const replyUSer = await prisma.reply.create({
      data: {
        comment,
        authorId: loggedId,
        posId: idThread,
      },
    });
    res.json(replyUSer);
  } catch (error) {}
}
