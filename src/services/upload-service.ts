export const handleUploadService = (file: Express.Multer.File) => {
  return {
    message: "File Upload Succesfully!",
    originalName: file.originalname,
    fileName: file.filename,
    path: file.path,
    size: file.size,
  };
};
