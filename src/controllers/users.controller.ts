import { NextFunction, Request, Response } from "express";
import { usersService } from "../services/users.service";
import { CustomRequest } from "../middlewares/authenticateToken";

export class UserController {
  async save(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const { username, password, email, phoneNumber } = request.body;
    try {
      const tokens = await usersService.signUp({
        username,
        password,
        email,
        phoneNumber,
      });

      response.status(200).send({ tokens });
    } catch (error) {
      response.status(500).send({ message: error.message });
    }
  }

  async signin(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const { email, password } = request.body;
    try {
      const accessToken = await usersService.signin({ id: email, password });
      response.json({ accessToken });
    } catch (error) {
      response.status(404).send({ message: error.message });
    }
  }

  async createNewToken(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>>> {
    const { refreshToken } = request.body;
    if (refreshToken == null) return response.sendStatus(401);
    try {
      const accessToken = await usersService.createNewToken(refreshToken);
      response.json({ accessToken });
    } catch (error) {
      response.sendStatus(403).send({ message: error.message });
    }
  }

  async logout(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const { refreshToken } = request.body;
    const newRefreshToken = await usersService.logout(refreshToken);
    response.status(200).send({ refreshToken: newRefreshToken });
  }

  async getUserId(
    request: CustomRequest,
    response: Response,
    next: NextFunction
  ) {
    const { user } = request.user;
    response.status(200).send({ userId: user.id });
  }
}

export const usersController = new UserController();
