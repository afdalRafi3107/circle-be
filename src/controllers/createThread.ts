import { prisma } from "../prisma/prisma";
import { Request, Response } from "express";

export async function createThread(req: Request, res: Response) {
  const userId = (req as any).user;
  const loggedID = userId.id;
  const img = req.file?.filename;
  const { content } = req.body;
  if (!loggedID) {
    res.status(401).json({ message: "Unauthorized: User not found" });
    return;
  }
  if (!img) {
    res.status(400).json({ message: "File gambar tidak ditemukan" });
    return;
  }
  const createThread = await prisma.post.create({
    data: {
      content,
      img,
      authorID: loggedID,
    },
  });
  res.json(createThread);
}
