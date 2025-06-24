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
