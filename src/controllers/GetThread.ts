import { Response, Request } from "express";
import { prisma } from "../prisma/prisma";

export async function Thread(req: Request, res: Response) {
  try {
    const thread = await prisma.post.findMany({
      orderBy: {
        createAt: "desc",
      },
      include: {
        author: {
          include: {
            profile: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    res.json(thread);
  } catch (error) {
    res.status(401);
  }
}
