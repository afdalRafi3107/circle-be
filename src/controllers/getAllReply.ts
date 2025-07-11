import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";

export async function AllReplay(req: Request, res: Response) {
  const idThread = parseInt(req.params.id);
  try {
    const replys = await prisma.reply.findMany({
      where: {
        posId: idThread,
      },
      orderBy: {
        id: "desc",
      },
      include: {
        _count: {
          select: {
            likeReply: true,
          },
        },
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
    res.json(replys);
  } catch (error) {}
}

export async function deleteReplay(req: Request, res: Response) {
  const idreply = parseInt(req.params.id);

  try {
    const DeleteReplay = await prisma.reply.delete({
      where: {
        id: idreply,
      },
    });

    res.json(DeleteReplay);
  } catch (error) {
    res.json(error);
  }
}
