import { Router } from "express";
import { usersController } from "../controllers/users.controller";
import { authenticateToken } from "../middlewares/authenticateToken";

export const userRoute = Router();

userRoute.post("/signup", usersController.save);
userRoute.post("/signin", usersController.signin);
userRoute.post("/signin/new_token", usersController.createNewToken);
userRoute.post("/logout", authenticateToken, usersController.logout);
userRoute.get("/info", authenticateToken, usersController.getUserId);
