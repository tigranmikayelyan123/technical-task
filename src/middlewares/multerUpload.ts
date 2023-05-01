import * as multer from "multer";
import { CustomRequest } from "./authenticateToken";

const storage = multer.diskStorage({
  destination: (
    request: CustomRequest,
    file: Express.Multer.File,
    cb: Function
  ) => {
    cb(null, "uploads/");
  },
  filename: (requset: CustomRequest, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (
  request: CustomRequest,
  file: Express.Multer.File,
  cb: Function
) => {
  const acceptedFiles = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "docx",
    "js",
    "ts",
    "html",
    "css",
    "jsx",
  ];
  const fileExtension = file.originalname.split(".").pop();
  if (!acceptedFiles.includes(fileExtension)) {
    request.fileValidationError =
      `You can upload only on of these type of files ${acceptedFiles.join(', ')}`;
    return cb(null, false, request.fileValidationError);
  }
  cb(null, true);
};

export const upload = multer({ storage, fileFilter });
