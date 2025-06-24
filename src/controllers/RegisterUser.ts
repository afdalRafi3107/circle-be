import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";
import bcrypt from "bcrypt";

export async function RegisterUser(req: Request, res: Response) {
  const { email, username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  try {
    const register = await prisma.user.create({
      data: {
        username,
        email,
        password: hashed,
        profile: {
          create: {
            photoProfile: "./defaultIMG/defaultP.jpg",
            banner: "./defaultIMG/defaultB.jpg",
            bio: "",
          },
        },
      },

      //ambil id user
    });

    res.json(register);
  } catch (error) {
    res.status(401);
  }
}
