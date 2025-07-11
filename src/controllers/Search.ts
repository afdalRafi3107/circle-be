import { prisma } from "../prisma/prisma";
import { Request, Response } from "express";

export async function Search(req: Request, res: Response) {
  try {
    const keyword = req.query.q as string;
    if (!keyword) res.status(400).json({ message: "Missing search query" });

    const searchUSer = await prisma.user.findMany({
      where: {
        AND: [
          {
            username: {
              contains: keyword,
              mode: "insensitive",
            },
          },
          {
            profile: {
              some: {
                name: {
                  contains: keyword,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
      select: {
        id: true,
        username: true,
        profile: {
          select: {
            name: true,
            photoProfile: true,
          },
        },
      },
    });
    res.json(searchUSer);
  } catch (error) {
    res.status(500).json(error);
  }
}
