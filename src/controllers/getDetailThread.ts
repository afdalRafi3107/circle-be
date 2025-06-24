import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../prisma/prisma";

export async function detailThread(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  try {
    const Detailthread = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          omit: {
            password: true,
          },
          include: {
            profile: true,
          },
        },
      },
    });

    res.json(Detailthread);
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
