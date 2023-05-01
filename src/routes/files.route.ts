import { Router } from "express";
import { filesController } from "../controllers/files.controller";
import { upload } from "../middlewares/multerUpload";
import { authenticateToken } from "../middlewares/authenticateToken";

export const fileRoute = Router();

fileRoute.post(
  "/upload",
  authenticateToken,
  upload.single("file"),
  filesController.upload
);
fileRoute.get("/list", authenticateToken, filesController.listFiles);
fileRoute.delete("/delete/:id", authenticateToken, filesController.deleteFile);
fileRoute.get("/:id", authenticateToken, filesController.oneFile);
fileRoute.get("/download/:id", authenticateToken, filesController.download);
fileRoute.put(
  "/update/:id",
  authenticateToken,
  upload.single("file"),
  filesController.replaceFile
);
