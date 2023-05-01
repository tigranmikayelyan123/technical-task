import path = require("path");

import { NextFunction, Response } from "express";
import { CustomRequest } from "../middlewares/authenticateToken";
import { filesService } from "../services/files.service";

export class FileController {
  async upload(
    request: CustomRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const file: Express.Multer.File = request.file;
    const filename = file.filename.split(".")[0];
    const extension = file.filename.split(".")[1];
    const { user } = request.user;

    await filesService.createFile({
      filename,
      extension,
      size: file.size,
      mime_type: file.mimetype,
      user,
    });

    if (request.fileValidationError) {
      response.status(500).send({ message: request.fileValidationError });
    } else {
      response.status(200).send({ message: "Success" });
    }
  }

  async listFiles(
    request: CustomRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const { list_size, page } = request.body;
    const { user } = request.user;
    const files = await filesService.listFiles(list_size, page, user);
    if (files.length) {
      response.status(200).send({ files });
    } else {
      response.status(404).send({ message: "not found" });
    }
  }

  async deleteFile(
    request: CustomRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const fileId = request.params.id;
    const { user } = request.user;
    await filesService.deleteFile({ fileId, user });
  }

  async oneFile(
    request: CustomRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const fileId = request.params.id;
    const { user } = request.user;
    const file = await filesService.getOneFile({ fileId, user });

    if (!file) {
      response.status(404).send({ message: "not found" });
    } else {
      response.status(200).send({ file });
    }
  }

  async download(
    request: CustomRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const fileId = request.params.id;
    const { user } = request.user;

    const file = await filesService.getOneFile({ fileId, user });
    const fullFillName = `${file.filename}.${file.extension}`;
    const filePath = path.resolve(__dirname, `../../uploads/${fullFillName}`);
    response.download(filePath, (err) => {
      if (err) {
        response.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  }

  async replaceFile(
    request: CustomRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const file: Express.Multer.File = request.file;
    const filename = file.filename.split(".")[0];
    const extension = file.filename.split(".")[1];
    const fileId = request.params.id;
    const { user } = request.user;

    try {
      await filesService.updateFile({
        fileId,
        user,
        filename,
        extension,
        size: file.size,
        mime_type: file.mimetype,
      });
      response.status(200).send({ message: "Success" });
    } catch (err) {
      response.status(500).send({
        message: "something went wrong",
      });
    }
  }
}

export const filesController = new FileController();
