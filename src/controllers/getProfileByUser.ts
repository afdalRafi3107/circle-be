import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";

export async function UserById(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  try {
    const userByid = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    });
    res.json(userByid);
  } catch (error) {
    res.status(401);
  }
}
