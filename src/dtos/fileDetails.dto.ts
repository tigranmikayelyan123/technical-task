import { User } from '../entities/user.entity';

export class FileDetailsDto {
  filename: string;
  extension: string;
  size: number;
  mime_type: string;
  user: User;
}
