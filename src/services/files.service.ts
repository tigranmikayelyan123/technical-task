import * as fs from 'fs';
import * as path from 'path';
import { ReplaceFileDto } from './../dtos/replaceFile.dto';
import { DeleteFileDto } from '../dtos/deleteFile.dto';
import { File } from '../entities/file.entity';
import { User } from '../entities/user.entity';
import { fileRepository } from '../repositories/files.repository';
import { FileDetailsDto } from './../dtos/fileDetails.dto';
import { OneFileDto } from '../dtos/oneFile.dto';
class FileService {
  async createFile(fileDetailsDto: FileDetailsDto): Promise<void> {
    await fileRepository.saveFileDetails(fileDetailsDto);
  }

  async listFiles(
    list_size: number,
    page: number,
    user: User
  ): Promise<File[]> {
    const files = await fileRepository.listFilesWithPagination(
      list_size,
      page,
      user
    );
    return files;
  }

  async deleteFile(deleteFileDto: DeleteFileDto): Promise<void> {
    const fullFillName = await fileRepository.removeFileById(deleteFileDto);
    const filePath = path.resolve(__dirname, `../../uploads/${fullFillName}`);

    fs.unlinkSync(filePath);
  }

  async getOneFile(oneFileDto: OneFileDto): Promise<File> {
    const file = await fileRepository.findOne(oneFileDto);
    return file;
  }

  async updateFile(replaceFileDto: ReplaceFileDto): Promise<void> {
    const { user, fileId, filename, extension, mime_type, size } =
      replaceFileDto;
    await fileRepository.removeFileById({ user, fileId });
    await fileRepository.saveFileDetails({
      filename,
      extension,
      mime_type,
      size,
      user,
    });
  }
}

export const filesService = new FileService();
