import { AppDataSource } from "../data-source";
import { DeleteFileDto } from "../dtos/deleteFile.dto";
import { OneFileDto } from "../dtos/oneFile.dto";
import { File } from "../entities/file.entity";
import { User } from "../entities/user.entity";
import { FileDetailsDto } from "./../dtos/fileDetails.dto";

export class FileRepository {
  async saveFileDetails(fileDetailsDto: FileDetailsDto): Promise<void> {
    const { filename, extension, mime_type, size, user } = fileDetailsDto;

    const file = AppDataSource.getRepository(File).create({
      filename,
      extension,
      mime_type,
      size,
      user,
    });
    await AppDataSource.getRepository(File).save(file);
  }

  async listFilesWithPagination(
    list_size: number = 3,
    page: number = 1,
    user: User
  ): Promise<File[]> {
    const [result, total] = await AppDataSource.getRepository(
      File
    ).findAndCount({
      where: { user },
      take: list_size,
      skip: (page - 1) * list_size,
    });

    return result;
  }

  async removeFileById(deleteFileDto: DeleteFileDto): Promise<string> {
    const { user, fileId } = deleteFileDto;
    const file = await AppDataSource.getRepository(File).findOne({
      where: { user, id: fileId },
    });

    await AppDataSource.getRepository(File).remove(file);

    return `${file.filename}.${file.extension}`;
  }

  async findOne(oneFileDto: OneFileDto): Promise<File> {
    const { user, fileId } = oneFileDto;
    const file = await AppDataSource.getRepository(File).findOne({
      where: { user, id: fileId },
    });

    return file;
  }
}

export const fileRepository = new FileRepository();
