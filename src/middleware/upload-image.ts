import multer, { FileFilterCallback } from "multer";
import path from "path";

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "./uploads"); // Pastikan folder "uploads" sudah dibuat
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Inisialisasi middleware upload
export const uploadIMG = multer({ storage: storage });
