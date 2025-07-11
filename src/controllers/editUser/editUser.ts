import { prisma } from "../../prisma/prisma";
import { Request, Response } from "express";
import { uploadToCloudinary } from "../../ultils/cloudinary";

async function editProfile(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { name, username, bio, photoProfile, banner } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const photoFile = files?.photoProfile?.[0];
    const bannerFile = files?.banner?.[0];

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
      },
    });

    if (!user || !user.profile[0]) {
      res.status(404).json({ message: "User tidak ditemukan" });
      return;
    }

    // Upload photoProfile baru jika ada
    let newPhoto = user.profile[0].photoProfile;
    if (photoFile) {
      const uploadResult = await uploadToCloudinary(photoFile.buffer, {
        folder: "photoProfile",
      });
      newPhoto = uploadResult.url;
    } else if (photoProfile === "") {
      newPhoto = null; // user ingin menghapus
    }

    // Upload banner baru jika ada
    let newBanner = user.profile[0].banner;
    if (bannerFile) {
      const uploadResult = await uploadToCloudinary(bannerFile.buffer, {
        folder: "banner",
      });
      newBanner = uploadResult.url;
    } else if (banner === "") {
      newBanner = null; // user ingin menghapus
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
        userId,
      },
      data: {
        name,
        bio,
        photoProfile: newPhoto,
        banner: newBanner,
      },
    });

    res.json({ message: "Profil berhasil diupdate" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengupdate profil" });
  }
}

export { editProfile };
