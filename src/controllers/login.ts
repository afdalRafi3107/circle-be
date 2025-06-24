import { prisma } from "../prisma/prisma";
import { Request, Response } from "express";
import { signToken } from "../ultils/jwt";
// import { user } from "./user";
import bcrypt from "bcrypt";

export async function Post(req: Request, res: Response) {
  const AllPost = await prisma.post.findMany();

  try {
    res.json(AllPost);
  } catch (error) {
    res.json(error);
  }
}

//fungsi Login
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = signToken({ id: user.id, email: user.email });

    res.json({
      token,
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// fungsi create account
// export async function CreateAccount(req: Request, res: Response) {
//   const image = "https://picsum.photos/id/1/300";
//   const { username, email, password } = req.body;
//   try {
//     const newUser = await prisma.user.create({
//       data: {
//         username,
//         email,
//         password,
//       },
//     });
//     res.json(newUser);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// }
