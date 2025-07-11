import { log, profile } from "console";
import { prisma } from "../../prisma/prisma";
import { Request, Response } from "express";
import path from "path";
import fs from "fs";

export async function editProfile(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;

    const { name, username, bio } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const photoFile = files?.photoProfile?.[0];
    const bannerFile = files?.banner?.[0];

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User tidak ditemukan" });
      return;
    }

    // Hapus file lama jika user ingin hapus
    const newPhoto = photoFile
      ? `${photoFile.path}`
      : req.body.photoProfile === "" // user ingin hapus gambar
      ? null
      : user.profile[0].photoProfile;

    const newBanner = bannerFile
      ? `${bannerFile.path}`
      : req.body.banner === ""
      ? null
      : user.profile[0].banner;

    // Optional: Hapus file lama dari disk
    if (req.body.photoProfile === "" && user.profile[0].photoProfile) {
      fs.unlink(path.join("public", user.profile[0].photoProfile), () => {});
    }
    if (req.body.banner === "" && user.profile[0].banner) {
      fs.unlink(path.join("public", user.profile[0].banner), () => {});
    }

    // Update user dan profile
    await prisma.user.update({
      where: { id: userId },
      data: {
        username,
      },
    });
    await prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        name,
        bio,
        photoProfile: newPhoto,
        banner: newBanner,
      },
    });

    // const { name, username, bio } = req.body;
    // const photoProfile = req.file?.filename;
    // const banner = req.file?.filename;

    // const data: any = {};
    // if (banner !== undefined) data.banner = banner;
    // if (photoProfile !== undefined) data.photoProfile = photoProfile;
    // if (bio !== undefined) data.bio = bio;
    // if (name !== undefined) data.name = name;

    // await prisma.user.update({
    //   where: { id: userId },
    //   data: {
    //     username: username,
    //   },
    // });
    // await prisma.profile.update({
    //   where: {
    //     userId: userId,
    //   },
    //   data,
    // });

    res.json({ message: "Profil berhasil diupdate" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengupdate profil" });
  }
}
