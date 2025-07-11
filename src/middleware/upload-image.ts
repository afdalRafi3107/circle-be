import multer from "multer";
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

const storage = multer.memoryStorage();

// Inisialisasi middleware upload
export const uploadIMG = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

// Inisialisasi middleware upload
// export const uploadIMG = multer({ storage });
