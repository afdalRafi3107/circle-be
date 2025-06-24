import { log } from "console";
import { prisma } from "../../prisma/prisma";
import { Request, Response } from "express";

export async function EditProfile(req: Request, res: Response) {
  const { name, username, bio } = req.body;
  try {
    const userId = (req as any).user;
    const loggedId = userId?.id;
    if (!loggedId) {
      res.status(401).json({ message: "Unauthorized: User not found" });
      return;
    }
    console.log("userId yang mau di edit : ", loggedId);
    const user = await prisma.user.update({
      where: {
        id: loggedId,
      },
      data: {
        username: username,
      },
    });
    const EditProfile = await prisma.profile.updateMany({
      where: { userId: loggedId },
      data: {
        name,
        bio,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(400);
  }
}
