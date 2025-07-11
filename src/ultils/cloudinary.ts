import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

interface UploadOptions {
  folder?: string;
  format?: string;
  transformation?: any[];
}

export function uploadToCloudinary(
  buffer: Buffer,
  options: UploadOptions = {}
): Promise<{ url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || "image",
        format: options.format,
        transformation: options.transformation,
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("No result returned from Cloudinary"));
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    // Buat stream dari Buffer dan pipe ke Cloudinary
    Readable.from(buffer).pipe(uploadStream);
  });
}
