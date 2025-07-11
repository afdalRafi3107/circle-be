import { prisma } from "../prisma/prisma";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { uploadToCloudinary } from "../ultils/cloudinary";

export async function createThread(req: Request, res: Response) {
  const userId = (req as any).user;
  const loggedID = userId.id;
  const img = req.file || null;
  const { content } = req.body;
  let imgUrl = null;
  if (img) {
    const uploadResult = await uploadToCloudinary(img.buffer, {
      folder: "photoProfile",
    });
    imgUrl = uploadResult.url;
  }
  // console.log(process.env.CLOUD_NAME);
  // console.log(process.env.API_KEY);
  // console.log(process.env.API_SECRET);
  // console.log("req.file : ", req.file);

  try {
    if (!loggedID) {
      res.status(401).json({ message: "Unauthorized: User not found" });
      return;
    }
    const createThread = await prisma.post.create({
      data: {
        content,
        img: imgUrl,
        authorID: loggedID,
      },
    });
    res
      .status(201)
      .json({ message: `Create thread successfully`, createThread });
  } catch (error: any) {
    console.log("failed ");
    res.status(400).json({ message: error.message });
  }
}

export async function DeleteThread(req: Request, res: Response) {
  const idThread = parseInt(req.params.id);
  console.log("id yang masuk: ", idThread);

  try {
    const existingThread = await prisma.post.findFirst({
      where: { id: idThread },
    });

    if (!existingThread) {
      res.status(404).json({ message: "thread tidak ditemukan" });
    }

    const deleteThread = await prisma.post.delete({
      where: { id: idThread },
    });
    res.json(deleteThread);
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
}

export async function EditThread(req: Request, res: Response) {
  try {
    const idThread = parseInt(req.params.id);
    const { content, deleteImg } = req.body;
    const file = req.files as { [fieldname: string]: Express.Multer.File[] };
    const image = file?.Image?.[0];

    const existingThread = await prisma.post.findUnique({
      where: {
        id: idThread,
      },
    });

    if (!existingThread) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    let img: string | null = existingThread.img ?? null;

    if (deleteImg === "true" && existingThread?.img) {
      const imgPath = path.join(__dirname, existingThread.img);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
      img = null;
    }

    if (req.file) {
      if (existingThread?.img) {
        const oldPath = path.join(__dirname, existingThread.img);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      img = req.file.filename;
    }

    const updateThread = await prisma.post.update({
      where: {
        id: idThread,
      },
      data: {
        content,
        img,
      },
    });
    res.json(updateThread);
  } catch (error) {
    res.json(error);
  }
}
