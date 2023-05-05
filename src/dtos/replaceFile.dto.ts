import { User } from '../entities/user.entity';

export class ReplaceFileDto {
  fileId: string;
  user: User;
  filename: string;
  extension: string;
  size: number;
  mime_type: string;
}
