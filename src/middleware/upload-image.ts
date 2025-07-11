import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";

// Konfigurasi penyimpanan
// const storage = multer.diskStorage({
//   destination: (_req, _file, cb) => {
//     cb(null, "./uploads"); // Pastikan folder "uploads" sudah dibuat
//   },
//   filename: (_req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     );
//   },
// });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    console.log("req file : ", req.file);
    console.log("file upload :", file.filename);

    return {
      folder: "image",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    };
    // transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

// Inisialisasi middleware upload
export const uploadIMG = multer({ storage });
