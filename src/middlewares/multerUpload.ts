import * as multer from 'multer';
import { CustomRequest } from './authenticateToken';

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
  destination: (
    request: CustomRequest,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    cb(null, 'uploads/');
  },
  filename: (requset: CustomRequest, file: Express.Multer.File, cb: FileNameCallback) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (
  request: CustomRequest,
  file: Express.Multer.File,
  cb: any
) => {
  const acceptedFiles = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'docx',
    'js',
    'ts',
    'html',
    'css',
    'jsx',
  ];
  const fileExtension = file.originalname.split('.').pop();
  if (!acceptedFiles.includes(fileExtension)) {
    request.fileValidationError =
      `You can upload only on of these type of files ${acceptedFiles.join(', ')}`;
    return cb(null, false, request.fileValidationError);
  }
  cb(null, true);
};

export const upload = multer({ storage, fileFilter });
