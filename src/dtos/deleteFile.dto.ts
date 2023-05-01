import { User } from "../entities/user.entity";

export class DeleteFileDto {
  fileId: string;
  user: User;
}
